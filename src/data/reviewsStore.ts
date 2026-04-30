// Client-side review store. Persists to localStorage today — the API
// below is deliberately narrow (`load`, `createReview`, `toggleLike`,
// `addComment`) so a future backend swap only changes this module.
//
// Caveat: localStorage is per-browser. To show reviews across all
// visitors you'd wire these functions to Firestore / Supabase / a
// custom API — same function signatures, remote reads/writes.

import { reviews as seedReviews } from './services'

const REVIEWS_KEY = 'pga-reviews-v1'
const LIKES_KEY = 'pga-review-likes-v1'
const COMMENTS_KEY = 'pga-review-comments-v1'

export interface ReviewComment {
  id: string
  name: string
  body: string
  date: string
}

export interface Review {
  id: string
  name: string
  suburb: string | null
  service: string | null
  rating: number
  body: string
  date: string
  likes: number
  likedByMe: boolean
  comments: ReviewComment[]
}

export interface ReviewForm {
  name: string
  suburb?: string
  service?: string
  rating: number | string
  body: string
}

export interface CommentForm {
  name: string
  body: string
}

function isBrowser() {
  return typeof window !== 'undefined' && !!window.localStorage
}

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: any) {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or disabled — silently fail; the UI stays in-memory.
  }
}

function randId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

// Merge seed (static) reviews with any user-submitted ones in storage,
// then hydrate each with its likes/comments overlay.
export function loadReviews(): Review[] {
  const local = read<any[]>(REVIEWS_KEY, [])
  const likes = read<Record<string, { count: number; liked: boolean }>>(LIKES_KEY, {})
  const comments = read<Record<string, ReviewComment[]>>(COMMENTS_KEY, {})
  const combined = [...local, ...seedReviews]
  return combined.map((r) => {
    const likeEntry = likes[r.id]
    return {
      ...r,
      likes: likeEntry?.count ?? r.likes ?? 0,
      likedByMe: likeEntry?.liked ?? false,
      comments: comments[r.id] ?? r.comments ?? [],
    }
  })
}

export function createReview({ name, suburb, service, rating, body }: ReviewForm): Review {
  const cleanName = (name || '').trim()
  const cleanBody = (body || '').trim()
  if (!cleanName || !cleanBody) {
    throw new Error('Please enter your name and a short review.')
  }
  const numericRating = Number(rating) || 5
  const review: Review = {
    id: randId('rv'),
    name: cleanName,
    suburb: (suburb || '').trim() || null,
    service: (service || '').trim() || null,
    rating: Math.max(1, Math.min(5, numericRating)),
    body: cleanBody,
    date: today(),
    likes: 0,
    likedByMe: false,
    comments: [],
  }
  const existing = read<Review[]>(REVIEWS_KEY, [])
  write(REVIEWS_KEY, [review, ...existing])
  return review
}

export function toggleLike(reviewId: string) {
  const likes = read<Record<string, { count: number; liked: boolean }>>(LIKES_KEY, {})
  const current = likes[reviewId] ?? { count: 0, liked: false }
  const next = current.liked
    ? { count: Math.max(0, current.count - 1), liked: false }
    : { count: current.count + 1, liked: true }
  likes[reviewId] = next
  write(LIKES_KEY, likes)
  return next
}

export function addComment(reviewId: string, { name, body }: CommentForm): ReviewComment {
  const cleanName = (name || '').trim()
  const cleanBody = (body || '').trim()
  if (!cleanName || !cleanBody) {
    throw new Error('Please enter a name and a comment.')
  }
  const comment: ReviewComment = {
    id: randId('c'),
    name: cleanName,
    body: cleanBody,
    date: today(),
  }
  const all = read<Record<string, ReviewComment[]>>(COMMENTS_KEY, {})
  all[reviewId] = [...(all[reviewId] || []), comment]
  write(COMMENTS_KEY, all)
  return comment
}

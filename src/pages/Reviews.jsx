import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/PageHero'
import { categories, pageHeroPhotos } from '../data/services'
import {
  loadReviews,
  createReview,
  toggleLike,
  addComment,
} from '../data/reviewsStore'
import './Reviews.css'

interface ReviewComment {
  id: string
  name: string
  body: string
  date: string
}

interface Review {
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

interface ReviewForm {
  name: string
  suburb: string
  service: string
  rating: number
  body: string
}

interface CommentForm {
  name: string
  body: string
}

function Stars({ n }: { n: number }) {
  const full = Math.round(n)
  return (
    <span className="stars" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < full ? 'star star-on' : 'star'}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </span>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <path
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z"
      />
    </svg>
  )
}

const initialForm: ReviewForm = {
  name: '',
  suburb: '',
  service: '',
  rating: 5,
  body: '',
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(() => loadReviews())
  const [form, setForm] = useState<ReviewForm>(initialForm)
  const [submitError, setSubmitError] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')
  const [openComments, setOpenComments] = useState<string | null>(null) // review id or null
  const [commentForm, setCommentForm] = useState<CommentForm>({ name: '', body: '' })
  const [commentError, setCommentError] = useState('')

  const serviceNames = categories.flatMap((c) =>
    c.services.map((s) => s.name)
  )

  const update = (field: keyof ReviewForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    try {
      createReview(form)
      setReviews(loadReviews())
      setForm(initialForm)
      setSubmitMessage('Thanks — your review is live below.')
      // Scroll to the top of the review list after posting.
      setTimeout(() => {
        document
          .getElementById('reviews-list')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong — please retry.')
    }
  }

  const handleLike = (reviewId: string) => {
    toggleLike(reviewId)
    setReviews(loadReviews())
  }

  const handleOpenComments = (reviewId: string) => {
    setOpenComments(openComments === reviewId ? null : reviewId)
    setCommentForm({ name: '', body: '' })
    setCommentError('')
  }

  const handleCommentSubmit = (reviewId: string) => (e: React.FormEvent) => {
    e.preventDefault()
    setCommentError('')
    try {
      addComment(reviewId, commentForm)
      setReviews(loadReviews())
      setCommentForm({ name: '', body: '' })
    } catch (err: any) {
      setCommentError(err.message || 'Could not post comment.')
    }
  }

  const avg = reviews.length
    ? (
        reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length
      ).toFixed(1)
    : null

  return (
    <>
      <Helmet>
        <title>Client Reviews | Purely Graced Aesthetics</title>
        <meta 
          name="description" 
          content="Read honest feedback from our clients about their mobile beauty and aesthetic treatments in Johannesburg. Leave your own review and join our community." 
        />
      </Helmet>

      <PageHero
        photoId={pageHeroPhotos.reviews}
        eyebrow="Client love"
        title="Words from our regulars."
        subtitle="Real words, real faces. Leave your own review below — it posts instantly."
      />

      <section className="section reviews-body">
        <div className="container">
          {reviews.length === 0 ? (
            <div className="reviews-empty">
              <span className="eyebrow">Be the first</span>
              <h2>No reviews yet.</h2>
              <p>
                The review wall is open — if you've been a client, share a
                few words below and you'll see your review go live on this
                page.
              </p>
              <a href="#leave-review" className="btn btn-primary">
                Leave the first review
              </a>
            </div>
          ) : (
            <>
              <div className="reviews-summary">
                <div>
                  <span className="reviews-summary-avg">{avg}</span>
                  <Stars n={Number(avg)} />
                  <span className="reviews-summary-count">
                    from {reviews.length}{' '}
                    {reviews.length === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
              </div>
              <ul id="reviews-list" className="reviews-grid">
                {reviews.map((r) => {
                  const isOpen = openComments === r.id
                  return (
                    <li key={r.id} className="review-card">
                      <div className="review-head">
                        <Stars n={r.rating} />
                        <time
                          className="review-date"
                          dateTime={r.date}
                        >
                          {r.date}
                        </time>
                      </div>
                      <p className="review-body">{r.body}</p>
                      <footer className="review-foot">
                        <div className="review-author">
                          <strong>{r.name}</strong>
                          <span>
                            {[r.service, r.suburb]
                              .filter(Boolean)
                              .join(' · ')}
                          </span>
                        </div>
                        <div className="review-actions">
                          <button
                            type="button"
                            className={`review-like ${
                              r.likedByMe ? 'review-like-on' : ''
                            }`}
                            onClick={() => handleLike(r.id)}
                            aria-pressed={!!r.likedByMe}
                            aria-label={
                              r.likedByMe ? 'Unlike review' : 'Like review'
                            }
                          >
                            <HeartIcon filled={!!r.likedByMe} />
                            <span>{r.likes || 0}</span>
                          </button>
                          <button
                            type="button"
                            className={`review-comment-toggle ${
                              isOpen ? 'review-comment-toggle-open' : ''
                            }`}
                            onClick={() => handleOpenComments(r.id)}
                            aria-expanded={isOpen}
                          >
                            {(r.comments?.length || 0) > 0
                              ? `${r.comments.length} ${
                                  r.comments.length === 1
                                    ? 'comment'
                                    : 'comments'
                                }`
                              : 'Comment'}
                          </button>
                        </div>
                      </footer>

                      {isOpen && (
                        <div className="review-comments">
                          {r.comments?.length > 0 && (
                            <ul className="review-comment-list">
                              {r.comments.map((c) => (
                                <li key={c.id}>
                                  <div className="review-comment-head">
                                    <strong>{c.name}</strong>
                                    <time dateTime={c.date}>{c.date}</time>
                                  </div>
                                  <p>{c.body}</p>
                                </li>
                              ))}
                            </ul>
                          )}
                          <form
                            className="review-comment-form"
                            onSubmit={handleCommentSubmit(r.id)}
                          >
                            <input
                              type="text"
                              placeholder="Your name"
                              value={commentForm.name}
                              onChange={(e) =>
                                setCommentForm((f) => ({
                                  ...f,
                                  name: e.target.value,
                                }))
                              }
                              required
                            />
                            <textarea
                              rows={2}
                              placeholder="Add a comment…"
                              value={commentForm.body}
                              onChange={(e) =>
                                setCommentForm((f) => ({
                                  ...f,
                                  body: e.target.value,
                                }))
                              }
                              required
                            />
                            <button type="submit" className="btn btn-primary">
                              Post comment
                            </button>
                            {commentError && (
                              <p className="review-comment-error" role="alert">
                                {commentError}
                              </p>
                            )}
                          </form>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </div>
      </section>

      <section
        id="leave-review"
        className="section section-alt reviews-form-wrap"
      >
        <div className="container reviews-form-grid">
          <div>
            <span className="eyebrow">Leave a review</span>
            <h2>Tell us how it went.</h2>
            <p>
              Post your review and it goes live on this page right away.
              We never publish your phone number — only the name and
              suburb you enter here.
            </p>
          </div>

          <form className="reviews-form" onSubmit={handleSubmit}>
            <div className="reviews-form-row">
              <label>
                <span>First name</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                />
              </label>
              <label>
                <span>Suburb (optional)</span>
                <input
                  type="text"
                  value={form.suburb}
                  onChange={update('suburb')}
                  placeholder="e.g. Randburg"
                />
              </label>
            </div>

            <label>
              <span>Service received</span>
              <select value={form.service} onChange={update('service')}>
                <option value="">Choose a service…</option>
                {serviceNames.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Rating</span>
              <div className="reviews-rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`rating-star ${
                      form.rating >= n ? 'rating-star-on' : ''
                    }`}
                    onClick={() => setForm((f) => ({ ...f, rating: n }))}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  >
                    ★
                  </button>
                ))}
                <span className="reviews-rating-n">{form.rating}/5</span>
              </div>
            </label>

            <label>
              <span>Your review</span>
              <textarea
                rows={5}
                required
                value={form.body}
                onChange={update('body')}
                placeholder="Tell us about your experience…"
              />
            </label>

            <button type="submit" className="btn btn-primary">
              Post review
            </button>
            {submitError && (
              <p className="reviews-error" role="alert">
                {submitError}
              </p>
            )}
            {submitMessage && (
              <p className="reviews-sent" role="status">
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="section reviews-external">
        <div className="container reviews-external-inner">
          <h2>Find us elsewhere.</h2>
          <p>
            You can also share your experience on Google, Facebook, or
            Instagram — they help us grow.
          </p>
          <div className="reviews-external-links">
            <a
              href="https://facebook.com/profile.php?id=61572665586943"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Review on Facebook
            </a>
            <a
              href="https://instagram.com/purely_graced_aesthetics"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Share on Instagram
            </a>
            <Link to="/booking" className="btn btn-ghost">
              Book another visit →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

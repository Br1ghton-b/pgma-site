import { motion } from 'framer-motion'
import { img } from '../data/services'
import './PageHero.css'

interface PageHeroProps {
  photoId: string | number
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
}

export default function PageHero({
  photoId,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  size = 'md',
}: PageHeroProps) {
  return (
    <section
      className={`page-hero page-hero-${size} page-hero-${align}`}
      style={{ backgroundImage: `url('${img(photoId, { w: 2000 })}')` }}
    >
      <div className="page-hero-overlay" aria-hidden="true" />
      <div className="container page-hero-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {eyebrow && <span className="page-hero-eyebrow">{eyebrow}</span>}
          <h1 className="page-hero-title">{title}</h1>
          {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  )
}

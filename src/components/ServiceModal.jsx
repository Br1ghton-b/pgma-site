import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  formatPrice,
  formatDuration,
  img,
  Service
} from '../data/services'
import './ServiceModal.css'

interface ServiceModalProps {
  service: Service | null
  onClose: () => void
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!service) return undefined

    previousFocusRef.current = document.activeElement as HTMLElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const t = setTimeout(() => closeRef.current?.focus(), 0)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus?.()
    }
  }, [service, onClose])

  if (!service) return null

  const svc = service as any;

  return (
    <div
      className="service-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="service-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="service-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="service-modal-media">
          <img
            src={img(service.photoId, { w: 900 })}
            alt={service.name}
            loading="eager"
            decoding="async"
          />
          <span className="service-modal-cat">{svc.categoryName || 'Service'}</span>
          {service.durationMin ? (
            <span className="service-modal-duration">
              {formatDuration(service.durationMin)}
            </span>
          ) : null}
        </div>

        <div className="service-modal-body">
          <h2 id="service-modal-title">{service.name}</h2>
          {service.note && (
            <p className="service-modal-note">{service.note}</p>
          )}
          <p className="service-modal-description">
            {service.description ||
              'A bespoke treatment — chat to us for full details and suitability.'}
          </p>

          {service.preCare && service.preCare.length > 0 && (
            <div className="service-modal-precare">
              <h3>Pre-care instructions</h3>
              <ul>
                {service.preCare.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
              <Link to={`/education/${service.name.toLowerCase().replace(/\s+/g, '-')}`} className="btn btn-ghost">
                Read full aftercare guide →
              </Link>
            </div>
          )}

          <dl className="service-modal-meta">
            <div>
              <dt>Price</dt>
              <dd>{formatPrice(service.price)}</dd>
            </div>
            {service.durationMin ? (
              <div>
                <dt>Duration</dt>
                <dd>~{formatDuration(service.durationMin)}</dd>
              </div>
            ) : null}
            <div>
              <dt>Category</dt>
              <dd>{svc.categoryName || 'General'}</dd>
            </div>
          </dl>

          {service.addOns && service.addOns.length > 0 && (
            <div className="service-modal-addons">
              <h3>Optional add-ons</h3>
              <ul>
                {service.addOns.map((a) => (
                  <li key={a.id}>
                    <span className="service-modal-addon-label">
                      {a.label}
                    </span>
                    <span className="service-modal-addon-meta">
                      +{formatPrice(a.price)}
                      {a.durationMin
                        ? ` · +${formatDuration(a.durationMin)}`
                        : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="service-modal-actions">
            <Link
              to={`/booking?service=${encodeURIComponent(
                service.name
              )}&category=${encodeURIComponent(svc.categoryId || 'general')}`}
              className="btn btn-primary"
              onClick={onClose}
            >
              Book this treatment
            </Link>
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Keep browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

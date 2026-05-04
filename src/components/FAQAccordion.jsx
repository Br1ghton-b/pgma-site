import { useState } from 'react'
import './FAQAccordion.css'

export default function FAQAccordion({ items, idPrefix = 'faq' }) {
  const [open, setOpen] = useState(null)

  if (!items || items.length === 0) return null

  return (
    <ul className="faq-accordion">
      {items.map((item, i) => {
        const id = `${idPrefix}-${i}`
        const isOpen = open === i
        return (
          <li key={id} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
            <button
              type="button"
              className="faq-trigger"
              aria-expanded={isOpen}
              aria-controls={`${id}-body`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="faq-q">{item.q}</span>
              <span className="faq-icon" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              id={`${id}-body`}
              className="faq-body"
              role="region"
              hidden={!isOpen}
            >
              <p>{item.a}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/PageHero'
import FAQAccordion from '../components/FAQAccordion'
import ServiceModal from '../components/ServiceModal'
import {
  categories,
  allServices,
  categoryFaqs,
  rebookWeeksByCategory,
  formatPrice,
  formatDuration,
  img,
  pageHeroPhotos,
} from '../data/services'
import './Services.css'

export default function Services() {
  const [active, setActive] = useState('all')
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState(1000)
  const [modalService, setModalService] = useState(null)

  const services = useMemo(() => {
    const list = allServices() || []
    return list.filter((s) => {
      const categoryMatch = active === 'all' || s.categoryId === active
      const searchLower = (search || '').toLowerCase()
      const nameLower = (s.name || '').toLowerCase()
      const descLower = (s.description || '').toLowerCase()
      const searchMatch = nameLower.includes(searchLower) || descLower.includes(searchLower)
      const priceMatch = (s.price || 0) <= maxPrice
      return categoryMatch && searchMatch && priceMatch
    })
  }, [active, search, maxPrice])

  return (
    <>
      <Helmet>
        <title>Services & Pricing | Mobile Beauty in Johannesburg | PGA</title>
        <meta
          name="description"
          content="Full menu of mobile facials, microneedling, peels, massages, waxing, nails and make-up — with transparent ZAR pricing. Booked to your door across Roodepoort, Randburg and Greater Johannesburg."
        />
        <link rel="canonical" href="https://pgma.co.za/services" />
        <meta property="og:title" content="Services & Pricing | Purely Graced Aesthetics" />
        <meta property="og:description" content="Mobile facials, aesthetics, massage, waxing, nails and make-up — transparent pricing, booked to your door." />
        <meta property="og:url" content="https://pgma.co.za/services" />
      </Helmet>

      <PageHero
        photoId={pageHeroPhotos.services}
        eyebrow="The menu"
        title="Every treatment, on one page."
        subtitle="Salon-grade aesthetics delivered at your door. Filter by category, search for a treatment, or set your budget."
      />

      <section className="section services-shop">
        <div className="container">
          <div className="shop-filters-wrap">
            <div className="shop-head">
              <h2>Find your treatment</h2>
              <p>Filter by category, search by name, or adjust the price slider.</p>
            </div>

            <div className="shop-controls">
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Search treatments..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="price-filter">
                <label>
                  <span>Max Price: {formatPrice(maxPrice)}</span>
                  <input 
                    type="range" 
                    min="50" 
                    max="1000" 
                    step="50" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                </label>
              </div>
            </div>
          </div>

          <div
            className="shop-category-tiles"
            aria-label="Service category gallery"
          >
            {categories.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`cat-tile ${
                  active === c.id ? 'cat-tile-active' : ''
                }`}
                onClick={() => setActive(c.id)}
              >
                <span className="cat-tile-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="cat-tile-name">{c.name}</h3>
                <span className="cat-tile-rule" aria-hidden="true" />
                <span className="cat-tile-count">
                  {c.services.length} treatments
                </span>
              </button>
            ))}
          </div>

          <div className="shop-summary">
            <span className="shop-summary-count">
              {services.length} treatment{services.length === 1 ? '' : 's'} found
            </span>
            {(active !== 'all' || search || maxPrice < 1000) && (
              <button
                type="button"
                className="shop-summary-clear"
                onClick={() => {
                  setActive('all')
                  setSearch('')
                  setMaxPrice(1000)
                }}
              >
                Reset all filters ×
              </button>
            )}
          </div>

          <ul className="shop-grid">
            {services.map((s) => (
              <li
                key={`${s.categoryId}-${s.name}`}
                className="shop-card"
                onClick={() => setModalService(s)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${s.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setModalService(s)
                  }
                }}
              >
                <div className="shop-card-media">
                  <img
                    src={img(s.photoId, { w: 500 })}
                    alt={s.name}
                    loading="lazy"
                  />
                  <span className="shop-card-cat">{s.categoryName}</span>
                  {s.durationMin && (
                    <span className="shop-card-duration">
                      {formatDuration(s.durationMin)}
                    </span>
                  )}
                  <span className="shop-card-overlay" aria-hidden="true">
                    View details
                  </span>
                </div>
                <div className="shop-card-body">
                  <h3 className="shop-card-name">{s.name}</h3>
                  {s.note && <p className="shop-card-note">{s.note}</p>}
                  <div className="shop-card-foot">
                    <span className="shop-card-price">
                      {formatPrice(s.price)}
                    </span>
                    <Link
                      to={`/booking?service=${encodeURIComponent(
                        s.name
                      )}&category=${encodeURIComponent(s.categoryId || '')}`}
                      className="shop-card-book"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Book →
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          {services.length === 0 && (
            <div className="shop-empty">
              <p>No treatments match your search or price filter.</p>
              <button 
                className="btn btn-outline"
                onClick={() => {
                  setActive('all')
                  setSearch('')
                  setMaxPrice(1000)
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt services-faq">
        <div className="container">
          <div className="services-faq-head">
            <span className="eyebrow">Good to know</span>
            <h2>Questions by category.</h2>
            <p>Tap a category to see what clients ask most.</p>
          </div>

          <div className="services-faq-tabs">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip ${active === c.id ? 'chip-active' : ''}`}
                onClick={() => setActive(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>

          {categories.map((c) =>
            active === c.id ? (
              <div key={c.id} className="services-faq-panel">
                {rebookWeeksByCategory[c.id] && (
                  <div className="services-rebook-chip">
                    <strong>
                      {c.name} clients return every{' '}
                      {rebookWeeksByCategory[c.id]} weeks
                    </strong>
                  </div>
                )}
                <FAQAccordion
                  items={categoryFaqs[c.id] || []}
                  idPrefix={`faq-${c.id}`}
                />
              </div>
            ) : null
          )}
        </div>
      </section>

      <ServiceModal
        service={modalService}
        onClose={() => setModalService(null)}
      />
    </>
  )
}

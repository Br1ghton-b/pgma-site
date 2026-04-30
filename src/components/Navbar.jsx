import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/gifting', label: 'Gifts' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const BOOK_CTA = { to: '/booking', label: 'Book Now' }

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="PGA home">
          <Logo compact />
        </Link>

        <nav className="navbar-links" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to={BOOK_CTA.to} className="btn btn-primary nav-cta">
            {BOOK_CTA.label}
          </Link>
        </nav>

        <button
          type="button"
          className={`navbar-toggle ${open ? 'navbar-toggle-open' : ''}`}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`navbar-drawer ${open ? 'navbar-drawer-open' : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="navbar-drawer-inner">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={close}
              className={({ isActive }) =>
                `drawer-link ${isActive ? 'drawer-link-active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to={BOOK_CTA.to}
            onClick={close}
            className="btn btn-primary drawer-cta"
          >
            {BOOK_CTA.label}
          </Link>
        </div>
      </div>
    </header>
  )
}

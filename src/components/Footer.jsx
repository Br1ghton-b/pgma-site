import { Link } from 'react-router-dom'
import Logo from './Logo'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo variant="light" />
          <p className="footer-tagline">
            Refreshed • Relaxed • Rejuvenated
          </p>
          <p className="footer-blurb">
            Salon-grade aesthetics brought to your door across
            Roodepoort, Randburg and Greater Johannesburg.
          </p>
        </div>

        <div className="footer-col">
          <h4>Browse</h4>
          <ul>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/concerns">Find by concern</Link></li>
            <li><Link to="/gifting">Gifts &amp; vouchers</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/visit">What to expect</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Reach us</h4>
          <ul>
            <li>
              <a href="tel:+27635149482">+27 63 514 9482</a>
            </li>
            <li>
              <a
                href="https://wa.me/27635149482"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/purely_graced_aesthetics"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/profile.php?id=61572665586943"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a href="mailto:purelygraced1@gmail.com">Email</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Studio</h4>
          <address>
            63 Copenhagen Cres<br />
            Roodepoort, 2188<br />
            South Africa
          </address>
        </div>
      </div>

      <div className="footer-base">
        <div className="container footer-base-inner">
          <span>© {year} Purely Graced Aesthetics</span>
          <span>Crafted with care in Gauteng</span>
        </div>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/PageHero'
import {
  categories,
  img,
  aboutPhotoId,
  pageHeroPhotos,
} from '../data/services'
import './About.css'

const stats = [
  { value: 'Mobile', label: 'From your home' },
  {
    value: categories.length,
    label: `Treatment categor${categories.length === 1 ? 'y' : 'ies'}`,
  },
  {
    value: categories.reduce((n, c) => n + c.services.length, 0),
    label: 'Services on the menu',
  },
  { value: '< 1h', label: 'Average reply time' },
]

const values = [
  {
    title: 'Grace in every detail',
    body: 'From setup to signature, each session is curated — not rushed. Quiet hands, calm presence, careful craft.',
  },
  {
    title: 'Skin-first approach',
    body: 'Treatments are chosen for your skin type and goals, not the other way around. Nothing one-size-fits-all.',
  },
  {
    title: 'Your space, your pace',
    body: 'No parking, no waiting rooms, no traffic. We arrive with everything needed and leave you glowing.',
  },
]

const standards = [
  {
    heading: 'Single-use, sterile',
    body: 'Needling cartridges, peel applicators, and wax sticks are single-use. All reusable tools are sterilised between bookings.',
  },
  {
    heading: 'Professional products',
    body: 'Pharmaceutical-grade peels, medical-grade serums, and trusted aesthetic brands — never supermarket skincare.',
  },
  {
    heading: 'Trained, insured, private',
    body: 'Qualified aesthetician with professional liability cover. Your home, your privacy — treated with absolute discretion.',
  },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Purely Graced Aesthetics</title>
        <meta 
          name="description" 
          content="Learn about Purely Graced Aesthetics, our mission, and the professional standards we bring to mobile beauty and aesthetic treatments in Johannesburg." 
        />
      </Helmet>

      <PageHero
        photoId={pageHeroPhotos.about}
        eyebrow="About us"
        title="A private spa, wherever you are."
        subtitle="Purely Graced Aesthetics was built for the hours you spend looking after everyone else. We hand them back to you — at home, with expert care."
      />

      {/* Manifesto */}
      <section className="about-manifesto">
        <div className="container">
          <span className="about-manifesto-rule" aria-hidden="true" />
          <p className="about-manifesto-text">
            The studio, the ritual, the calm —
            <em> brought quietly to your door.</em>
          </p>
          <span className="about-manifesto-attribution">
            Purely Graced Aesthetics
          </span>
        </div>
      </section>

      {/* Editorial story split */}
      <section className="section about-story">
        <div className="container about-story-grid">
          <div className="about-story-media">
            <img
              src={img(aboutPhotoId, { w: 900 })}
              alt="Our professional aesthetician preparing for a treatment"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-story-text">
            <span className="eyebrow">Our story</span>
            <h2>
              The studio
              <span className="hero-italic"> that travels.</span>
            </h2>
            <p>
              Rooted in Roodepoort and serving clients across Greater
              Johannesburg, PGA was founded on a simple belief: that
              salon-quality aesthetics should meet you where you are.
            </p>
            <p>
              Whether it's a facial before a long week, microneedling
              between meetings, or bridal make-up on your big day — we
              bring the full studio to your door, set it up with care, and
              leave no trace but the glow.
            </p>
            <p className="about-story-signoff">
              — Refreshed. Relaxed. Rejuvenated.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section section-alt about-founder">
        <div className="container about-founder-grid">
          <div className="about-founder-media">
            <img
              src="/assets/founder-marcia.jpg"
              alt="Marcia Bila-Babuyile, Founder of Purely Graced Aesthetics"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-founder-text">
            <span className="eyebrow">Meet the founder</span>
            <h2>
              Marcia
              <span className="hero-italic"> Bila-Babuyile.</span>
            </h2>
            <p className="about-founder-role">
              Somatologist &amp; Aesthetician · 8+ years clinical experience
            </p>
            <p>
              Marcia founded Purely Graced Aesthetics to deliver
              personalised, science-backed treatments that enhance natural
              beauty and promote long-term skin health — without the
              pressure of a salon waiting room.
            </p>
            <p>
              She also leads at <strong>W.ink Beauty Salon &amp; Spa</strong>,
              the in-house practice at Madge Wallace International College
              of Skincare &amp; Body Therapy, where she oversees premium
              services from bespoke facials and chemical peels to holistic
              aromatherapy and body treatments.
            </p>
            <p>
              Trained in health sciences at the Tshwane University of
              Technology and aligned with ITEC and CIDESCO global standards,
              her practice pairs clinical precision with the calm of a
              private spa.
            </p>
            <ul className="about-founder-credentials">
              <li>ITEC certified</li>
              <li>CIDESCO accredited</li>
              <li>Somatology — TUT</li>
              <li>Lead Aesthetician, W.ink Beauty Salon &amp; Spa</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="about-stats">
        <div className="container about-stats-inner">
          {stats.map((s, i) => (
            <div key={i} className="about-stat">
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section section-alt about-values">
        <div className="container">
          <div className="about-values-head">
            <span className="eyebrow">What we believe</span>
            <h2>The care behind every booking.</h2>
          </div>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <div key={v.title} className="about-value">
                <span className="about-value-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="about-value-rule" aria-hidden="true" />
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards — editorial list */}
      <section className="section about-standards">
        <div className="container about-standards-grid">
          <div className="about-standards-head">
            <span className="eyebrow">Our standards</span>
            <h2>Clinical care, at home.</h2>
            <p>
              In-home does not mean less careful. Every visit meets the
              hygiene and professional protocols of a clinic.
            </p>
            <Link to="/visit" className="about-standards-link">
              Read the full protocol →
            </Link>
          </div>
          <ul className="about-standards-list">
            {standards.map((s) => (
              <li key={s.heading}>
                <h3>{s.heading}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-band about-cta">
        <div className="container cta-band-inner">
          <div>
            <h2>Curious what would suit you best?</h2>
            <p>
              Tell us about your skin or the occasion — we'll recommend a
              treatment that fits.
            </p>
          </div>
          <div className="cta-band-actions">
            <Link to="/booking" className="btn btn-primary">
              Book an appointment
            </Link>
            <Link to="/services" className="btn btn-ghost">
              Browse the menu →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

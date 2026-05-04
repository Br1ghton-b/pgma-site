import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import HowItWorks from '../components/HowItWorks'
import {
  categories,
  occasionPresets,
  formatPrice,
  formatDuration,
  img,
  heroPhotoId,
} from '../data/services'
import './Home.css'

const SIGNATURE_NAMES = [
  'Brightening Facial',
  'Microneedling',
  'Swedish',
]

const experienceSteps = [
  {
    n: '01',
    title: 'Book',
    body: 'Request your slot online or over WhatsApp. We confirm within the hour.',
  },
  {
    n: '02',
    title: 'Arrive',
    body: 'We arrive on time with the full mobile studio — linens, products, bed, music.',
  },
  {
    n: '03',
    title: 'Relax',
    body: 'In your space, at your pace. Our only job is to let the treatment do the work.',
  },
  {
    n: '04',
    title: 'Glow',
    body: 'Studio breaks down, linens bag, every surface wiped. Only the glow remains.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Home() {
  const flatServices = categories.flatMap((c) =>
    c.services.map((s) => ({
      ...s,
      categoryId: c.id,
      categoryName: c.name,
    }))
  )
  const signatureServices = SIGNATURE_NAMES.map((n) =>
    flatServices.find((s) => s.name === n)
  ).filter(Boolean)

  return (
    <>
      <Helmet>
        <title>Purely Graced Aesthetics | Mobile Beauty & Aesthetics Johannesburg</title>
        <meta name="description" content="Professional facials, microneedling, massages, and makeup delivered to your door in Roodepoort, Randburg, and Greater Johannesburg." />
        <link rel="canonical" href="https://pgma.co.za/" />
        <meta property="og:title" content="Purely Graced Aesthetics | Mobile Beauty in Johannesburg" />
        <meta property="og:description" content="Professional facials, microneedling, massages, and make-up delivered to your door in Greater Johannesburg." />
        <meta property="og:url" content="https://pgma.co.za/" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HealthAndBeautyBusiness',
            name: 'Purely Graced Aesthetics',
            alternateName: 'PGA',
            url: 'https://pgma.co.za/',
            telephone: '+27635149482',
            image: 'https://pgma.co.za/assets/home-hero.png',
            priceRange: 'R50–R600',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '63 Copenhagen Cres',
              addressLocality: 'Roodepoort',
              addressRegion: 'Gauteng',
              postalCode: '2188',
              addressCountry: 'ZA',
            },
            areaServed: [
              'Roodepoort',
              'Randburg',
              'Northcliff',
              'Florida',
              'Honeydew',
              'Krugersdorp',
              'Greater Johannesburg',
            ],
            sameAs: [
              'https://www.instagram.com/purely_graced_aesthetics/',
              'https://www.facebook.com/profile.php?id=61572665586943',
              'https://take.app/pgma',
            ],
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '09:00',
                closes: '18:00',
              },
            ],
            slogan: 'Refreshed • Relaxed • Rejuvenated',
          })}
        </script>
      </Helmet>

      {/* Hero — full-bleed, editorial */}
      <section className="home-hero">
        <div
          className="home-hero-bg"
          style={{
            backgroundImage: `url('${img(heroPhotoId, { w: 2400 })}')`,
          }}
          aria-hidden="true"
        />
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="container home-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="home-hero-eyebrow">
              Purely Graced Aesthetics
            </span>
            <h1 className="home-hero-title">
              The salon,
              <span className="hero-italic"> quietly delivered.</span>
            </h1>
            <p className="home-hero-lede">
              Professional facials, aesthetic treatments, massages, waxing,
              nails and make-up — brought to your door across Greater
              Johannesburg.
            </p>
            <div className="home-hero-cta">
              <Link to="/services" className="btn btn-primary">
                Explore Offerings
              </Link>
              <Link to="/booking" className="btn btn-outline-light">
                Schedule Appointment
              </Link>
            </div>
            <p className="home-hero-tagline">
              Refreshed <span>•</span> Relaxed <span>•</span> Rejuvenated
            </p>
          </motion.div>
        </div>
        <span className="home-hero-scroll" aria-hidden="true">
          <span className="home-hero-scroll-label">Scroll</span>
          <span className="home-hero-scroll-line" />
        </span>
      </section>

      {/* Manifesto */}
      <section className="home-manifesto">
        <motion.div 
          className="container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="home-manifesto-rule" aria-hidden="true" />
          <p className="home-manifesto-text">
            A private ritual for the hours you spend looking after
            everyone else —
            <em> handed back to you, at home.</em>
          </p>
          <span className="home-manifesto-attribution">
            The PGA way
          </span>
        </motion.div>
      </section>

      <HowItWorks />

      {/* Signature Treatments */}
      <section className="section home-signature">
        <div className="container">
          <div className="home-signature-head">
            <span className="eyebrow">Signature treatments</span>
            <h2>Three treatments we're known for.</h2>
            <Link to="/services" className="home-signature-all">
              View full menu →
            </Link>
          </div>

          <motion.div 
            className="home-signature-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {signatureServices.map((s, i) => (
              <motion.div key={s.name} variants={itemVariants}>
                <Link
                  to={`/booking?service=${encodeURIComponent(
                    s.name
                  )}&category=${encodeURIComponent(s.categoryId)}`}
                  className="signature-card"
                >
                  <span className="signature-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="signature-media">
                    <img
                      src={img(s.photoId, { w: 700 })}
                      alt={`${s.name} treatment`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="signature-body">
                    <span className="signature-cat">{s.categoryName}</span>
                    <h3>{s.name}</h3>
                    <p>{s.description}</p>
                    <div className="signature-meta">
                      <span>{formatPrice(s.price)}</span>
                      {s.durationMin && (
                        <span>· {formatDuration(s.durationMin)}</span>
                      )}
                    </div>
                    <span className="signature-cta">
                      Book this treatment →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Experience */}
      <section className="section section-alt home-experience">
        <div className="container">
          <div className="home-experience-head">
            <span className="eyebrow">The experience</span>
            <h2>
              Four calm steps
              <span className="hero-italic">, door to glow.</span>
            </h2>
          </div>
          <motion.ol 
            className="home-experience-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {experienceSteps.map((step) => (
              <motion.li key={step.n} className="experience-step" variants={itemVariants}>
                <span className="experience-index">{step.n}</span>
                <span className="experience-rule" aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.li>
            ))}
          </motion.ol>
          <div className="home-experience-foot">
            <Link to="/visit" className="btn btn-outline">
              More on what to expect
            </Link>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="section home-occasions">
        <div className="container">
          <div className="home-occasions-head">
            <span className="eyebrow">For the moment</span>
            <h2>Occasion-ready bundles.</h2>
            <p>
              One-click collections curated for the events that matter.
              Each drops straight into your booking cart.
            </p>
          </div>
          <div className="home-occasion-grid">
            {occasionPresets.map((p) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  to={`/booking?preset=${p.id}`}
                  className="home-occasion-card"
                >
                  <div className="home-occasion-media">
                    <img
                      src={img(p.photoId, { w: 500 })}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="home-occasion-body">
                    <h3>{p.name}</h3>
                    <p>{p.blurb}</p>
                    <ul className="home-occasion-services">
                      {p.services.map((s) => (
                        <li key={s.name}>+ {s.name}</li>
                      ))}
                    </ul>
                    <span className="home-occasion-cta">
                      Load this into booking →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial quote band */}
      <section className="home-quote" aria-label="Our philosophy">
        <div className="container home-quote-inner">
          <span className="home-quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <p className="home-quote-body">
            Every session is a quiet reset — for the skin, and for the
            hour you give yourself.
          </p>
          <span className="home-quote-rule" aria-hidden="true" />
          <span className="home-quote-attribution">Our philosophy</span>
        </div>
      </section>

      {/* CTA band */}
      <section className="section cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Ready to be pampered?</h2>
            <p>
              Book your in-home session today — usually confirmed within
              the hour on WhatsApp.
            </p>
          </div>
          <div className="cta-band-actions">
            <Link to="/booking" className="btn btn-primary">
              Book an appointment
            </Link>
            <Link to="/gifting" className="btn btn-ghost">
              Give the glow as a gift →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

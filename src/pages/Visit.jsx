import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/PageHero'
import HowItWorks from '../components/HowItWorks'
import TravelMap from '../components/TravelMap'
import { pageHeroPhotos } from '../data/services'
import './Visit.css'

const prep = [
  {
    title: 'A clean, well-lit space',
    body: "About 2 m × 2 m of space. Any quiet room works — we're not precious about setup.",
  },
  {
    title: 'A power outlet nearby',
    body: 'For devices used in some treatments (microdermabrasion, high-frequency, steam).',
  },
  {
    title: 'Comfortable clothing',
    body: 'Whatever lets you relax. For massage, most clients undress to their comfort level beneath the sheet.',
  },
  {
    title: 'Clean skin if possible',
    body: "If you're short on time, don't stress — we cleanse fully anyway.",
  },
]

const hygiene = [
  'Hands sanitised on arrival and between treatments.',
  'Single-use needling cartridges, peel applicators, and wax sticks.',
  'Fresh linens per client — washed with hypoallergenic detergent.',
  'All tools sterilised between bookings, sharps disposed per protocol.',
]

const faq = [
  {
    q: 'Do I need to provide anything?',
    body: 'No — we bring the complete studio: bed, linens, towels, products, music, warm blankets.',
  },
  {
    q: 'Are there travel fees?',
    body: 'House calls within Roodepoort and Randburg are billed at Uber-equivalent rates from our base. For visits beyond a 10 km radius — or where the treatment total is below R550 — the travel fee is doubled. We always confirm the exact figure on WhatsApp before your booking is set.',
  },
  {
    q: 'How do payments work?',
    body: 'We accept EFT, SnapScan, and cash. Payment is taken after treatment unless it is a gift voucher (pre-paid).',
  },
  {
    q: 'What if I need to cancel?',
    body: '24 hours notice, please — we do not charge a cancellation fee but prompt notice lets us offer the slot to someone else.',
  },
]

export default function Visit() {
  return (
    <>
      <Helmet>
        <title>What to Expect | Purely Graced Aesthetics</title>
        <meta 
          name="description" 
          content="Wondering how a mobile beauty treatment works? Read our guide on what to expect during our visit, how to prepare, and our clinical hygiene standards." 
        />
      </Helmet>

      <PageHero
        photoId={pageHeroPhotos.visit}
        eyebrow="What to expect"
        title="Your first home visit."
        subtitle="A calm, professional treatment in your own space. Here is exactly how it unfolds so you can book with total confidence."
      />

      <HowItWorks />

      <section className="section section-alt visit-prep">
        <div className="container visit-prep-grid">
          <div>
            <span className="eyebrow">What we'll need</span>
            <h2>A short prep list.</h2>
            <p className="visit-prep-lede">
              Nothing fancy — most clients have everything they need. Here
              is the short list:
            </p>
          </div>
          <ul className="visit-prep-list">
            {prep.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section visit-hygiene">
        <div className="container visit-hygiene-inner">
          <div>
            <span className="eyebrow">Hygiene &amp; safety</span>
            <h2>Clinical standards, at home.</h2>
            <p>
              In-home does not mean less careful. Every visit meets the
              same hygiene protocols you would find in a clinic.
            </p>
          </div>
          <ul className="visit-hygiene-list">
            {hygiene.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </section>

      <TravelMap />

      <section className="section section-alt visit-faq">
        <div className="container visit-faq-inner">
          <span className="eyebrow">Common questions</span>
          <h2>Things clients ask.</h2>
          <dl>
            {faq.map((f) => (
              <div key={f.q} className="visit-faq-item">
                <dt>{f.q}</dt>
                <dd>{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section visit-cta">
        <div className="container visit-cta-inner">
          <h2>Ready when you are.</h2>
          <p>
            Book your in-home session — we will confirm within the hour
            and send a prep list for your chosen treatments.
          </p>
          <div className="visit-cta-actions">
            <Link to="/booking" className="btn btn-primary">
              Book an appointment
            </Link>
            <Link to="/services" className="btn btn-outline">
              View the menu
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/PageHero'
import { pageHeroPhotos } from '../data/services'
import './NotFound.css'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Purely Graced Aesthetics</title>
        <meta 
          name="description" 
          content="We couldn't find the page you were looking for. Return to Purely Graced Aesthetics to browse our mobile beauty and aesthetic services." 
        />
      </Helmet>

      <PageHero
        photoId={pageHeroPhotos.notFound}
        eyebrow="404"
        title="That page slipped away."
        subtitle="We couldn't find what you were looking for. Let's get you back to somewhere calm."
      />

      <section className="section notfound-actions-wrap">
        <div className="container notfound-inner">
          <div className="notfound-actions">
            <Link to="/" className="btn btn-primary">
              Back home
            </Link>
            <Link to="/services" className="btn btn-outline">
              Browse services
            </Link>
            <Link to="/booking" className="btn btn-ghost">
              Book an appointment →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

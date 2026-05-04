import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/PageHero'
import { img, contactPhotoId, pageHeroPhotos } from '../data/services'
import './Contact.css'

const channels = [
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    subtitle: 'Fastest replies',
    detail: '+27 63 514 9482',
    href: 'https://wa.me/27635149482',
    cta: 'Open chat',
    external: true,
  },
  {
    id: 'phone',
    title: 'Phone',
    subtitle: 'Mon–Sat, 9am – 6pm',
    detail: '+27 63 514 9482',
    href: 'tel:+27635149482',
    cta: 'Call now',
  },
  {
    id: 'instagram',
    title: 'Instagram',
    subtitle: 'Latest looks & results',
    detail: '@purely_graced_aesthetics',
    href: 'https://instagram.com/purely_graced_aesthetics',
    cta: 'Follow',
    external: true,
  },
  {
    id: 'facebook',
    title: 'Facebook',
    subtitle: 'Reviews & updates',
    detail: 'Purely Graced Aesthetics',
    href: 'https://facebook.com/profile.php?id=61572665586943',
    cta: 'Visit page',
    external: true,
  },
  {
    id: 'email',
    title: 'Email',
    subtitle: 'General enquiries',
    detail: 'purelygraced1@gmail.com',
    href: 'mailto:purelygraced1@gmail.com',
    cta: 'Send mail',
  },
]

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Purely Graced Aesthetics</title>
        <meta 
          name="description" 
          content="Get in touch with Purely Graced Aesthetics. Message us on WhatsApp, call us, or follow us on social media to book your mobile beauty treatment." 
        />
      </Helmet>

      <PageHero
        photoId={pageHeroPhotos.contact}
        eyebrow="Get in touch"
        title="Let's find a time that suits you."
        subtitle="Book online for a guided request, or message us directly on any channel below."
      />

      <section className="section contact-body">
        <div className="container contact-grid">
          <div className="contact-primary">
            <div className="contact-booking-cta">
              <span className="eyebrow">Ready to book?</span>
              <h2>Skip the back-and-forth.</h2>
              <p>
                Pick your treatment, date and time in one go — we'll
                confirm on WhatsApp within the hour.
              </p>
              <Link to="/booking" className="btn btn-primary">
                Book an appointment
              </Link>
            </div>

            <div className="contact-photo">
              <img
                src={img(contactPhotoId, { w: 900 })}
                alt="Close-up of professional aesthetic treatment tools and products"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <aside className="contact-side">
            <h3>Other ways to reach us</h3>
            <ul className="channels">
              {channels.map((c) => (
                <li key={c.id} className="channel">
                  <div>
                    <span className="channel-title">{c.title}</span>
                    <span className="channel-sub">{c.subtitle}</span>
                    <span className="channel-detail">{c.detail}</span>
                  </div>
                  <a
                    href={c.href}
                    className="btn btn-outline channel-btn"
                    {...(c.external
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    {c.cta}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}

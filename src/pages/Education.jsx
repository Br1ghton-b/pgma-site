import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { educationGuides } from '../data/education'
import PageHero from '../components/PageHero'
import './Education.css'

export default function Education() {
  const { id } = useParams()
  // Ensure ID matching handles URL slug and data key
  const guide = id ? educationGuides[id] : null

  if (!guide) {
    return (
      <div className="container section">
        <h2>Guide not found.</h2>
        <Link to="/services">Back to services</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{guide.title} | Purely Graced Aesthetics</title>
        <meta name="description" content={guide.seoDescription} />
      </Helmet>

      <PageHero
        title={guide.title}
        subtitle={guide.intro}
        align="center"
        photoId="photo-1596755094514-f87e34083b2c"
      />

      <section className="section education-guide">
        <div className="container">
          <div className="guide-content">
            {guide.steps.map((step, i) => (
              <div key={i} className="guide-step">
                <span className="step-num">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
          
          <div className="guide-dos-donts">
            <div className="do">
              <h3>Do</h3>
              <ul>{guide.doDonts.do.map(d => <li key={d}>✓ {d}</li>)}</ul>
            </div>
            <div className="dont">
              <h3>Don't</h3>
              <ul>{guide.doDonts.dont.map(d => <li key={d}>× {d}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

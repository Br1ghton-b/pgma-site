import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import { generateSkinRecommendationPDF } from '../utils/pdfGenerator'
import {
  skinConcerns,
  categories,
  formatPrice,
  formatDuration,
  img,
  pageHeroPhotos,
} from '../data/services'
import './Concerns.css'

const steps = [
  {
    id: 'goal',
    question: 'What is your primary skin goal?',
    options: [
      { label: 'Clear breakouts', value: 'acne' },
      { label: 'Even out dark spots', value: 'pigmentation' },
      { label: 'Firm & plump', value: 'ageing' },
      { label: 'Get a healthy glow', value: 'dull' },
      { label: 'Deeply hydrate', value: 'dehydration' },
      { label: 'Smooth texture', value: 'texture' },
    ]
  },
  {
    id: 'type',
    question: 'How does your skin feel most of the time?',
    options: [
      { label: 'Oily or congested', value: 'oily' },
      { label: 'Tight or flaky', value: 'dry' },
      { label: 'Oily T-zone, dry cheeks', value: 'combination' },
      { label: 'Easily irritated', value: 'sensitive' },
      { label: 'Balanced & steady', value: 'normal' },
    ]
  }
]

export default function Concerns() {
  const [activeStep, setActiveStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [quizFinished, setQuizFinished] = useState(false)

  const flatServices = useMemo(
    () =>
      categories.flatMap((c) =>
        c.services.map((s) => ({
          ...s,
          categoryId: c.id,
          categoryName: c.name,
        }))
      ),
    []
  )

  const handleAnswer = (stepId, value) => {
    setAnswers(prev => ({ ...prev, [stepId]: value }))
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1)
    } else {
      setQuizFinished(true)
    }
  }

  const recommendations = useMemo(() => {
    if (!quizFinished) return []
    const mainConcern = skinConcerns.find(c => c.id === answers.goal)
    if (!mainConcern) return []
    
    return mainConcern.services
      .map(name => flatServices.find(s => s.name === name))
      .filter(Boolean)
  }, [quizFinished, answers, flatServices])

  const resetQuiz = () => {
    setActiveStep(0)
    setAnswers({})
    setQuizFinished(false)
  }

  return (
    <>
      <Helmet>
        <title>Skin Concern Navigator | Purely Graced Aesthetics</title>
        <meta name="description" content="Not sure what to book? Take our quick skin quiz to find the perfect treatment for your goals and skin type." />
      </Helmet>

      <PageHero
        photoId={pageHeroPhotos.concerns}
        eyebrow="Not sure what to book?"
        title="The Skin Navigator."
        subtitle="Answer two quick questions and we'll match you with the treatments that move the needle for your skin."
      />

      <section className="section concerns-quiz-wrap">
        <div className="container concerns-quiz-container-max">
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div 
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="quiz-container"
              >
                <div className="quiz-progress">
                  <span className="quiz-counter">Question {activeStep + 1} of {steps.length}</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
                
                <h2 className="quiz-question">{steps[activeStep].question}</h2>
                <div className="quiz-options">
                  {steps[activeStep].options.map(opt => (
                    <button
                      key={opt.value}
                      className="btn btn-outline quiz-option"
                      onClick={() => handleAnswer(steps[activeStep].id, opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {activeStep > 0 && (
                  <button 
                    className="quiz-back" 
                    onClick={() => setActiveStep(prev => prev - 1)}
                  >
                    ← Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="results-container"
              >
                <div className="results-head">
                  <span className="eyebrow">Your results</span>
                  <h2>Here's your perfect match.</h2>
                  <p>Based on your goals, we recommend starting with these treatments:</p>
                </div>

                <div className="concerns-results-list">
                  {recommendations.map((s, i) => (
                    <motion.div 
                      key={s.name} 
                      className="concerns-result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="concerns-result-media">
                        <img
                          src={img(s.photoId, { w: 400 })}
                          alt={s.name}
                          loading="lazy"
                        />
                      </div>
                      <div className="concerns-result-body">
                        <span className="concerns-result-cat">
                          {s.categoryName}
                        </span>
                        <h4>{s.name}</h4>
                        <div className="concerns-result-meta">
                          <span>{formatPrice(s.price)}</span>
                          {s.durationMin && (
                            <span>· {formatDuration(s.durationMin)}</span>
                          )}
                        </div>
                      </div>
                      <Link
                        to={`/booking?service=${encodeURIComponent(
                          s.name
                        )}&category=${encodeURIComponent(s.categoryId)}`}
                        className="concerns-result-book"
                      >
                        Book →
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="results-actions">
                  <button className="btn btn-ghost" onClick={resetQuiz}>
                    Start over
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={() => generateSkinRecommendationPDF({ 
                      goal: steps[0].options.find(o => o.value === answers.goal)?.label, 
                      recommendations 
                    })}
                  >
                    Download Plan (PDF) ↓
                  </button>
                  <Link to="/services" className="btn btn-primary">
                    View full menu
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="section concerns-help">
        <div className="container concerns-help-inner">
          <h2>Still unsure?</h2>
          <p>
            Send us a close-up photo of your skin on WhatsApp — we'll
            recommend a treatment plan free of charge.
          </p>
          <div className="concerns-help-actions">
            <a
              href="https://wa.me/27635149482"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Send a photo on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section concerns-guide">
        <div className="container">
          <div className="concerns-guide-intro">
            <h2>Understanding Your Skin</h2>
            <p>Different skin concerns require different approaches. Learn about what each concern means and how our treatments address them.</p>
          </div>

          <div className="concerns-guide-grid">
            <div className="guide-card">
              <div className="guide-card-icon">🤏</div>
              <h3>Acne & Breakouts</h3>
              <p>Congested, inflamed skin with excess sebum production. Our facials and targeted treatments help clear breakouts without over-drying.</p>
              <ul className="guide-treatments">
                <li>Chemical peels (salicylic acid)</li>
                <li>HydraFacial with extractions</li>
                <li>LED light therapy</li>
              </ul>
            </div>

            <div className="guide-card">
              <div className="guide-card-icon">🌙</div>
              <h3>Pigmentation & Dark Spots</h3>
              <p>Sun damage, hyperpigmentation, and uneven skin tone. We use advanced treatments to break down melanin and promote cell renewal.</p>
              <ul className="guide-treatments">
                <li>Laser treatments</li>
                <li>Chemical peels (glycolic acid)</li>
                <li>Microdermabrasion</li>
              </ul>
            </div>

            <div className="guide-card">
              <div className="guide-card-icon">✨</div>
              <h3>Dull Skin & Loss of Glow</h3>
              <p>Tired, lackluster skin from dead cell buildup and dehydration. Our resurfacing treatments reveal fresh, radiant skin underneath.</p>
              <ul className="guide-treatments">
                <li>Brightening facials</li>
                <li>Enzymatic exfoliants</li>
                <li>Hydrating serums & masks</li>
              </ul>
            </div>

            <div className="guide-card">
              <div className="guide-card-icon">💧</div>
              <h3>Dehydration & Dryness</h3>
              <p>Flaky, tight skin lacking moisture. Hydration treatments deliver intense moisture and repair the skin barrier.</p>
              <ul className="guide-treatments">
                <li>Hydrating facials</li>
                <li>Hyaluronic acid treatments</li>
                <li>Moisture masks</li>
              </ul>
            </div>

            <div className="guide-card">
              <div className="guide-card-icon">🌳</div>
              <h3>Texture & Roughness</h3>
              <p>Uneven skin surface, enlarged pores, or scarring. Resurfacing and collagen-boosting treatments smooth and refine texture.</p>
              <ul className="guide-treatments">
                <li>Microneedling</li>
                <li>Dermaplaning</li>
                <li>Fine peel treatments</li>
              </ul>
            </div>

            <div className="guide-card">
              <div className="guide-card-icon">👑</div>
              <h3>Ageing & Loss of Firmness</h3>
              <p>Fine lines, loss of elasticity, and sagging. Collagen-induction and firming treatments restore structure and bounce.</p>
              <ul className="guide-treatments">
                <li>Microneedling & RF</li>
                <li>Peptide treatments</li>
                <li>Lifting facials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt concerns-faq">
        <div className="container">
          <h2>Common Questions</h2>
          <div className="concerns-faq-grid">
            <div className="faq-item">
              <h4>How often should I get a treatment?</h4>
              <p>It depends on your skin concern and the treatment. Most clients start with treatments 2-4 weeks apart, then space them out as they see results. We'll recommend a schedule based on your goals.</p>
            </div>

            <div className="faq-item">
              <h4>What's the difference between a facial and an aesthetic?</h4>
              <p>Facials cleanse and nourish the skin's surface, while aesthetic treatments use advanced technology to stimulate deeper changes like collagen production and skin renewal.</p>
            </div>

            <div className="faq-item">
              <h4>Can I combine multiple treatments?</h4>
              <p>Yes! Many treatments pair beautifully. For example, a peel followed by microneedling, or a facial with LED therapy. We'll design a combination that suits your skin.</p>
            </div>

            <div className="faq-item">
              <h4>How long before I see results?</h4>
              <p>Some treatments show immediate results (glow, hydration), while others build over 4-8 weeks as collagen regenerates. Most clients see noticeable improvement within 3-6 treatments.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

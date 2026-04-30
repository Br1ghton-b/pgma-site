import { motion } from 'framer-motion'
import './HowItWorks.css'

const steps = [
  {
    title: 'Consultation & Prep',
    body: 'Select your treatments online. We confirm via WhatsApp and send a tailored pre-care checklist.',
    number: '01'
  },
  {
    title: 'The Setup',
    body: 'We arrive with a professional portable bed, clinical-grade tools, and premium products. Your space, transformed.',
    number: '02'
  },
  {
    title: 'Aftercare & Glow',
    body: 'Enjoy your treatment. We leave you with a digital aftercare card and a visible, lasting glow.',
    number: '03'
  }
]

export default function HowItWorks() {
  return (
    <section className="section how-it-works">
      <div className="container">
        <div className="how-it-works-head">
          <span className="eyebrow">Seamless Experience</span>
          <h2>How it works</h2>
          <p>Luxurious aesthetic care, delivered with clinical precision in the comfort of your home.</p>
        </div>

        <div className="how-it-works-grid">
          {steps.map((step, i) => (
            <motion.div 
              key={step.title}
              className="how-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="how-step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {i < steps.length - 1 && <div className="how-step-arrow">→</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

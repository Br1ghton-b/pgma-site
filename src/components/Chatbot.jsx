import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { categories, categoryFaqs, giftBundles, travelAreas } from '../data/services'
import { educationGuides } from '../data/education'
import './Chatbot.css'

// The Knowledge Base
const FULL_KNOWLEDGE = {
  services: categories.flatMap(c => c.services.map(s => `${s.name}: ${s.description}`)),
  faqs: Object.entries(categoryFaqs).flatMap(([cat, items]) => items.map(i => `${i.q}: ${i.a}`)),
  bundles: giftBundles.map(b => `${b.name}: ${b.blurb}`),
  travel: `Included areas: ${travelAreas.included.join(', ')}. Extended areas: ${travelAreas.askFirst.join(', ')}.`,
  about: "Purely Graced Aesthetics is a mobile studio rooted in Roodepoort, serving Greater Johannesburg. We focus on grace, clinical hygiene, and a skin-first approach.",
  aftercare: Object.values(educationGuides).map(g => `${g.title}: ${g.intro}`)
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! I am Grace. I know everything about Purely Graced Aesthetics. Ask me anything!' }])
  const [input, setInput] = useState('')

  const getResponse = (query: string) => {
    const q = query.toLowerCase()
    
    // Social Intelligence
    if (q.match(/^(hi|hello|hey|greetings)/)) return "Hello! I am Grace, your assistant at Purely Graced Aesthetics. How can I help you feel refreshed today?"
    if (q.match(/^(bye|goodbye|cya)/)) return "Goodbye! Have a graceful day, and we hope to see you for a treatment soon."
    if (q.includes('how are you')) return "I'm doing wonderfully, thank you for asking! I'm ready to help you plan your next beauty session."
    if (q.includes('thanks') || q.includes('thank you')) return "You're so welcome! It's a pleasure to help."

    // Core Knowledge Base
    if (q.includes('service') || q.includes('menu')) return "Here are our main offerings: " + categories.map(c => c.name).join(', ') + ". Ask about a specific one for details!"
    if (q.includes('microneedling')) return FULL_KNOWLEDGE.services.find(s => s.includes('Microneedling')) || "It is a collagen-induction treatment."
    if (q.includes('facial')) return "We offer Brightening, Purifying, and Anti-Ageing facials. Which one interests you?"
    if (q.includes('travel') || q.includes('area') || q.includes('where')) return FULL_KNOWLEDGE.travel
    if (q.includes('gift') || q.includes('bundle')) return "We have great bundles like: " + FULL_KNOWLEDGE.bundles.join('; ')
    if (q.includes('faq') || q.includes('question')) return "Common questions: " + FULL_KNOWLEDGE.faqs.join('; ')
    if (q.includes('aftercare')) return "Aftercare guides: " + FULL_KNOWLEDGE.aftercare.join('; ')
    
    return "I'm not exactly sure about that, but I'd be happy to connect you with our team via WhatsApp at +27 63 514 9482 for a personalized answer!"
  }

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMsg as any])
    setInput('')
    
    setTimeout(() => {
      const botResponse = { sender: 'bot', text: getResponse(input) }
      setMessages(prev => [...prev, botResponse as any])
    }, 400)
  }

  return (
    <>
      <button className="chat-widget" onClick={() => setIsOpen(!isOpen)} aria-label="Open Chatbot">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" 
          alt="Grace, your assistant" 
          className="chat-avatar-img"
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="chat-header">
              <h3>Grace</h3>
              <button onClick={() => setIsOpen(false)}>×</button>
            </div>
            <div className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`chat-message ${m.sender}`}>{m.text}</div>
              ))}
            </div>
            <div className="chat-input">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
              <button onClick={handleSend}>Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

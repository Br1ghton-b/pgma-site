import WhatsappIcon from './WhatsappIcon'
import './CommunicationWidgets.css'

export default function CommunicationWidgets() {
  return (
    <a
      href="https://wa.me/27635149482"
      target="_blank"
      rel="noreferrer"
      className="whatsapp-widget"
      aria-label="Chat on WhatsApp"
    >
      <WhatsappIcon />
    </a>
  )
}

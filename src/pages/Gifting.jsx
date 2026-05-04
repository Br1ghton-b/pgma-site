import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/PageHero'
import {
  giftBundles,
  bundlePrice,
  formatPrice,
  img,
  pageHeroPhotos,
} from '../data/services'
import './Gifting.css'

const AMOUNTS = [250, 500, 750, 1000, 1500]

// Voucher code format: PGA-YYYYMMDD-XXXX (no ambiguous chars).
function makeVoucherCode() {
  const d = new Date()
  const yyyymmdd =
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0')
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let suffix = ''
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)]
  }
  return `PGA-${yyyymmdd}-${suffix}`
}

export default function Gifting() {
  const [voucher, setVoucher] = useState({
    amount: 500,
    customAmount: '',
    recipient: '',
    message: '',
    from: '',
  })
  const [code] = useState(() => makeVoucherCode())
  const [sent, setSent] = useState(false)
  const [pdfState, setPdfState] = useState({ loading: false, error: '' })

  const update = (field) => (e) =>
    setVoucher((v) => ({ ...v, [field]: e.target.value }))

  const amount = voucher.customAmount
    ? Number(voucher.customAmount) || 0
    : voucher.amount

  const handleSubmit = (e) => {
    e.preventDefault()
    const lines = [
      `Gift voucher order — Purely Graced Aesthetics`,
      `Code: ${code}`,
      '',
      `Amount: ${formatPrice(amount)}`,
      `For: ${voucher.recipient}`,
      voucher.from && `From: ${voucher.from}`,
      voucher.message && '',
      voucher.message && `Message: "${voucher.message}"`,
      '',
      `Please confirm payment details so this voucher can be activated.`,
    ].filter(Boolean)
    const url = `https://wa.me/27635149482?text=${encodeURIComponent(
      lines.join('\n')
    )}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  const handleDownloadPdf = async () => {
    if (!voucher.recipient) {
      setPdfState({
        loading: false,
        error: 'Please fill in the recipient name first.',
      })
      return
    }
    if (!amount || amount < 1) {
      setPdfState({
        loading: false,
        error: 'Please choose a voucher amount.',
      })
      return
    }
    setPdfState({ loading: true, error: '' })
    try {
      const { default: jsPDF } = await import('jspdf')
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a5', // 210 × 148 mm landscape
      })
      const W = 210
      const H = 148

      // Cream background
      doc.setFillColor(252, 248, 251)
      doc.rect(0, 0, W, H, 'F')

      // Outer pink border
      doc.setDrawColor(236, 65, 133)
      doc.setLineWidth(0.8)
      doc.rect(6, 6, W - 12, H - 12)

      // Inner thin border
      doc.setLineWidth(0.2)
      doc.rect(9, 9, W - 18, H - 18)

      // "Purely Graced" cursive header
      doc.setFont('times', 'italic')
      doc.setFontSize(28)
      doc.setTextColor(26, 20, 24)
      doc.text('Purely Graced', W / 2, 30, { align: 'center' })

      // "AESTHETICS" subline
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setCharSpace(2)
      doc.setTextColor(26, 20, 24)
      doc.text('AESTHETICS', W / 2, 37, { align: 'center' })
      doc.setCharSpace(0)

      // Decorative hairline
      doc.setDrawColor(236, 65, 133)
      doc.setLineWidth(0.3)
      doc.line(W / 2 - 14, 43, W / 2 + 14, 43)

      // "GIFT VOUCHER" label
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setCharSpace(3)
      doc.setTextColor(199, 33, 106)
      doc.text('GIFT VOUCHER', W / 2, 51, { align: 'center' })
      doc.setCharSpace(0)

      // "To:" recipient
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(95, 77, 90)
      doc.text(`To: ${voucher.recipient}`, W / 2, 63, { align: 'center' })

      // Amount in big italic serif
      doc.setFont('times', 'italic')
      doc.setFontSize(54)
      doc.setTextColor(26, 20, 24)
      doc.text(`R ${amount}`, W / 2, 93, { align: 'center' })

      // Message (or default)
      if (voucher.message) {
        doc.setFont('times', 'italic')
        doc.setFontSize(11)
        doc.setTextColor(26, 20, 24)
        const wrapped = doc.splitTextToSize(
          `"${voucher.message}"`,
          W - 60
        )
        doc.text(wrapped, W / 2, 106, { align: 'center' })
      } else {
        doc.setFont('times', 'italic')
        doc.setFontSize(10)
        doc.setTextColor(140, 122, 136)
        doc.text(
          'Redeemable against any PGA treatment.',
          W / 2,
          106,
          { align: 'center' }
        )
      }

      // "With love, [from]"
      if (voucher.from) {
        doc.setFont('times', 'italic')
        doc.setFontSize(10)
        doc.setTextColor(95, 77, 90)
        doc.text(`— with love, ${voucher.from}`, W / 2, 122, {
          align: 'center',
        })
      }

      // Footer — voucher code + contact
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.setCharSpace(1.2)
      doc.setTextColor(140, 122, 136)
      doc.text(
        `CODE ${code}   ·   +27 63 514 9482   ·   @purely_graced_aesthetics`,
        W / 2,
        H - 14,
        { align: 'center' }
      )
      doc.setCharSpace(0)

      // Redemption note
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(6.5)
      doc.setTextColor(160, 144, 156)
      doc.text(
        'Voucher activates on payment confirmation. Valid for 12 months from issue date.',
        W / 2,
        H - 10,
        { align: 'center' }
      )

      doc.save(`PGA-gift-voucher-${code}.pdf`)
      setPdfState({ loading: false, error: '' })
    } catch (err) {
      setPdfState({
        loading: false,
        error: 'Could not generate PDF — please try again.',
      })
      console.error(err)
    }
  }

  return (
    <>
      <Helmet>
        <title>Gift Vouchers & Packages | Purely Graced Aesthetics</title>
        <meta 
          name="description" 
          content="Give the gift of beauty and relaxation. Purchase gift vouchers or pre-curated beauty packages for mobile treatments in Johannesburg." 
        />
      </Helmet>

      <PageHero
        photoId={pageHeroPhotos.gifting || '/assets/gifts-hero.png'}
        eyebrow="Give the glow"
        title="Gift vouchers &amp; packages."
        subtitle="The softest way to say thank you, congrats, or happy birthday — mobile beauty, delivered to their door."
      />

      <section className="section gifting-bundles">
        <div className="container">
          <div className="gifting-intro">
            <span className="eyebrow">Packages</span>
            <h2>Ready-made gift bundles.</h2>
            <p>
              Pre-curated combinations for the most-loved occasions. Every
              bundle is a single-address appointment — recipient picks
              their date.
            </p>
          </div>
          <div className="gifting-bundle-grid">
            {giftBundles.map((b) => {
              const price = bundlePrice(b)
              return (
                <article key={b.id} className="bundle-card">
                  <div className="bundle-media">
                    <img
                      src={img(b.photoId, { w: 600 })}
                      alt={`Gift bundle: ${b.name}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="bundle-body">
                    <h3>{b.name}</h3>
                    <p className="bundle-blurb">{b.blurb}</p>
                    <ul className="bundle-services">
                      {b.services.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <div className="bundle-foot">
                      <span className="bundle-price">
                        {formatPrice(price)}
                      </span>
                      <a
                        href={`https://wa.me/27635149482?text=${encodeURIComponent(
                          `Hi PGA, I'd like to gift the ${b.name} bundle (${formatPrice(price)}). Please share payment options and voucher details.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bundle-buy"
                      >
                        Gift this →
                      </a>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt gifting-voucher">
        <div className="container gifting-voucher-grid">
          <div>
            <span className="eyebrow">Custom voucher</span>
            <h2>Or pick any amount.</h2>
            <p>
              Let them choose their own treatments. We'll send a beautifully
              styled PDF voucher to the recipient once payment is
              confirmed.
            </p>
            <ul className="gifting-voucher-steps">
              <li>
                <strong>1.</strong> Fill out the form.
              </li>
              <li>
                <strong>2.</strong> We reply with payment details on
                WhatsApp.
              </li>
              <li>
                <strong>3.</strong> Once paid, we send the styled voucher
                to you (or straight to the recipient).
              </li>
            </ul>
          </div>

          <form className="gifting-voucher-form" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Amount</legend>
              <div className="gifting-amount-row">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={`gifting-amount ${
                      voucher.amount === a && !voucher.customAmount
                        ? 'gifting-amount-active'
                        : ''
                    }`}
                    onClick={() =>
                      setVoucher((v) => ({
                        ...v,
                        amount: a,
                        customAmount: '',
                      }))
                    }
                  >
                    R {a}
                  </button>
                ))}
              </div>
              <label className="gifting-custom-amount">
                <span>Or enter a custom amount</span>
                <input
                  type="number"
                  min="100"
                  step="50"
                  placeholder="e.g. 850"
                  value={voucher.customAmount}
                  onChange={update('customAmount')}
                />
              </label>
            </fieldset>

            <fieldset>
              <legend>Recipient</legend>
              <label>
                <span>Recipient name</span>
                <input
                  type="text"
                  required
                  value={voucher.recipient}
                  onChange={update('recipient')}
                  placeholder="Who is this for?"
                />
              </label>
              <label>
                <span>Your name (optional)</span>
                <input
                  type="text"
                  value={voucher.from}
                  onChange={update('from')}
                  placeholder="Signed by…"
                />
              </label>
              <label>
                <span>Short message (optional)</span>
                <textarea
                  rows={3}
                  value={voucher.message}
                  onChange={update('message')}
                  placeholder="For your birthday — enjoy every minute."
                />
              </label>
            </fieldset>

            <div className="gifting-preview" aria-label="Voucher preview">
              <span className="gifting-preview-eyebrow">Voucher preview</span>
              <p className="gifting-preview-to">
                To: <strong>{voucher.recipient || '...'}</strong>
              </p>
              <p className="gifting-preview-amount">{formatPrice(amount)}</p>
              <p className="gifting-preview-message">
                {voucher.message || 'Redeemable against any PGA treatment.'}
              </p>
              {voucher.from && (
                <p className="gifting-preview-from">
                  With love, {voucher.from}
                </p>
              )}
              <p className="gifting-preview-code">Code {code}</p>
            </div>

            <div className="gifting-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleDownloadPdf}
                disabled={pdfState.loading}
              >
                {pdfState.loading ? 'Preparing PDF…' : 'Download PDF voucher'}
              </button>
              <button type="submit" className="btn btn-primary">
                Request voucher on WhatsApp
              </button>
            </div>
            <p className="gifting-disclaimer">
              Download the voucher now for reference. It activates after
              payment — request it on WhatsApp to arrange payment details.
            </p>
            {pdfState.error && (
              <p className="gifting-error" role="alert">
                {pdfState.error}
              </p>
            )}
            {sent && (
              <p className="gifting-sent" role="status">
                Opened WhatsApp — send the message so we can activate
                voucher <strong>{code}</strong>.
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="section gifting-cta">
        <div className="container gifting-cta-inner">
          <h2>Something else in mind?</h2>
          <p>
            Browse the full services menu, build your own bundle, and we'll
            match the voucher amount.
          </p>
          <Link to="/services" className="btn btn-outline">
            Explore all services
          </Link>
        </div>
      </section>
    </>
  )
}

import { jsPDF } from 'jspdf'
import { aftercareByCategory } from '../data/services'

/**
 * Draws the PGA logo lockup on the PDF.
 * Simulated version of the SVG logo.
 */
function drawLogo(doc, x, y, scale = 1) {
  const roseGold = [209, 65, 119]
  const plum = [20, 17, 20]

  // PGA (Large background text)
  doc.setTextColor(roseGold[0], roseGold[1], roseGold[2])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(50 * scale)
  doc.text('PGA', x, y, { align: 'center', charSpace: 5 * scale })

  // Purely Graced (Script/Cursive simulated with times italic)
  doc.setTextColor(plum[0], plum[1], plum[2])
  doc.setFont('times', 'italic')
  doc.setFontSize(22 * scale)
  doc.text('Purely Graced', x, y - (14 * scale), { align: 'center' })

  // AESTHETICS (Subline)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6 * scale)
  doc.setCharSpace(2 * scale)
  doc.text('AESTHETICS', x, y + (10 * scale), { align: 'center' })
  doc.setCharSpace(0)
}

/**
 * Generates an aftercare guide PDF for a service.
 * @param {Object} guide - The guide object from educationGuides
 */
export function generateAftercarePDF(guide) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const primaryColor = [20, 17, 20] // Plum
  const accentColor = [209, 65, 119] // Rose Gold
  const margin = 20
  let y = 35

  // Header Logo
  drawLogo(doc, 160, 25, 0.6)

  // Header - Brand Name
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
  doc.text('PURELY GRACED AESTHETICS', margin, 20)
  
  // Title
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(24)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text(guide.title, margin, y)
  y += 15

  // Intro
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(11)
  doc.setTextColor(80, 80, 80)
  const splitIntro = doc.splitTextToSize(guide.intro, 170)
  doc.text(splitIntro, margin, y)
  y += (splitIntro.length * 6) + 8

  // Decorative line
  doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2])
  doc.setLineWidth(0.5)
  doc.line(margin, y, 190, y)
  y += 15

  // Steps
  guide.steps.forEach((step, index) => {
    if (y > 250) {
      doc.addPage()
      y = 30
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
    doc.text(`0${index + 1}. ${step.title}`, margin, y)
    y += 8

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10.5)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    const splitBody = doc.splitTextToSize(step.body, 170)
    doc.text(splitBody, margin, y)
    y += (splitBody.length * 6) + 10
  })

  // Do's and Don'ts
  if (y > 220) {
    doc.addPage()
    y = 30
  }

  y += 5
  // Do's
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
  doc.text("What to DO", margin, y)
  y += 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  guide.doDonts.do.forEach(item => {
    doc.text(`\u2022 ${item}`, margin + 5, y)
    y += 7
  })

  y += 10
  // Don'ts
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
  doc.text("What to AVOID", margin, y)
  y += 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  guide.doDonts.dont.forEach(item => {
    doc.text(`\u2022 ${item}`, margin + 5, y)
    y += 7
  })

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text('WhatsApp: +27 63 514 9482  |  Instagram: @purely_graced_aesthetics', margin, 278)
  doc.text('Facebook: Purely Graced Aesthetics  |  Email: purelygraced1@gmail.com', margin, 283)

  doc.save(`${guide.id}-aftercare.pdf`)
}

/**
 * Generates a booking summary PDF.
 * @param {Object} booking - The booking details (selections, form, subtotal, etc.)
 */
export function generateBookingSummaryPDF(booking) {
  const { selections, form, subtotal, totalMinutes } = booking
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const primaryColor = [20, 17, 20]
  const accentColor = [209, 65, 119]
  const margin = 20
  let y = 35

  // Header Logo
  drawLogo(doc, 160, 25, 0.6)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
  doc.text('PURELY GRACED AESTHETICS', margin, 20)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('Booking Request Summary', margin, y)
  y += 15

  // Date/Time info
  doc.setFontSize(10.5)
  doc.setFont('helvetica', 'normal')
  doc.text(`Date: ${form.date}`, margin, y)
  doc.text(`Time: ${form.time}`, 100, y)
  y += 8
  doc.text(`Client: ${form.name}`, margin, y)
  doc.text(`Phone: ${form.phone}`, 100, y)
  y += 8
  doc.text(`Location: ${form.suburb}`, margin, y)
  doc.text(`Party Size: ${form.partySize} ${form.partySize > 1 ? 'people' : 'person'}`, 100, y)
  y += 15

  // Table Header
  doc.setDrawColor(230, 230, 230)
  doc.setLineWidth(0.1)
  doc.line(margin, y, 190, y)
  y += 8
  doc.setFont('helvetica', 'bold')
  doc.text('Treatment', margin, y)
  doc.text('Price', 170, y, { align: 'right' })
  y += 5
  doc.line(margin, y, 190, y)
  y += 10

  // Line items
  doc.setFont('helvetica', 'normal')
  selections.forEach((s) => {
    const basePrice = s.price
    let itemSubtotal = basePrice
    
    // Main Service Line
    doc.setFont('helvetica', 'bold')
    doc.text(s.name, margin, y)
    doc.setFont('helvetica', 'normal')
    doc.text(`R ${basePrice}`, 170, y, { align: 'right' })
    y += 6
    
    // Add-ons
    if (s.selectedAddOnIds && s.selectedAddOnIds.length > 0) {
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      
      const selectedAddOns = s.addOns.filter(a => s.selectedAddOnIds.includes(a.id))
      selectedAddOns.forEach(addOn => {
        const addOnPrice = addOn.price || 0
        itemSubtotal += addOnPrice
        doc.text(`+ ${addOn.label}`, margin + 5, y)
        doc.text(`R ${addOnPrice}`, 170, y, { align: 'right' })
        y += 5
      })
      
      doc.setFontSize(10.5)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    }

    // Individual Item Total (if there were add-ons)
    if (s.selectedAddOnIds && s.selectedAddOnIds.length > 0) {
      doc.setFont('helvetica', 'italic')
      doc.text(`${s.name} Subtotal`, margin + 5, y)
      doc.text(`R ${itemSubtotal}`, 170, y, { align: 'right' })
      y += 8
      doc.setFont('helvetica', 'normal')
    } else {
      y += 2
    }
  })

  y += 2
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, y, 190, y)
  y += 10

  // Totals
  doc.setFont('helvetica', 'bold')
  doc.text('Treatment Subtotal (per person)', margin, y)
  doc.text(`R ${subtotal}`, 170, y, { align: 'right' })
  y += 8
  
  if (form.partySize > 1) {
    doc.setFont('helvetica', 'normal')
    doc.text(`Party Size: ${form.partySize} people`, margin, y)
    doc.text(`× ${form.partySize}`, 170, y, { align: 'right' })
    y += 8
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
    doc.text('Grand Total', margin, y)
    doc.text(`R ${subtotal * form.partySize}`, 170, y, { align: 'right' })
    doc.setFontSize(10.5)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    y += 10
  }

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Estimated Duration: ~${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`, margin, y)

  // Notes
  if (form.notes) {
    y += 15
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.text('Additional Notes:', margin, y)
    y += 8
    doc.setFont('helvetica', 'normal')
    const splitNotes = doc.splitTextToSize(form.notes, 170)
    doc.text(splitNotes, margin, y)
  }

  // Aftercare — auto-appended for every category present in the booking
  const categoryIdsInOrder = []
  selections.forEach((s) => {
    if (s.categoryId && !categoryIdsInOrder.includes(s.categoryId)) {
      categoryIdsInOrder.push(s.categoryId)
    }
  })
  const aftercareSections = categoryIdsInOrder
    .map((id) => aftercareByCategory[id])
    .filter(Boolean)

  if (aftercareSections.length > 0) {
    doc.addPage()
    y = 30

    drawLogo(doc, 160, 25, 0.6)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
    doc.text('PURELY GRACED AESTHETICS', margin, 20)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.text('Aftercare for your treatments', margin, y)
    y += 10

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(10.5)
    doc.setTextColor(80, 80, 80)
    const introCare = doc.splitTextToSize(
      'A short guide for the hours and days after your visit. Following these helps results last longer and keeps recovery comfortable.',
      170
    )
    doc.text(introCare, margin, y)
    y += introCare.length * 6 + 6

    doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2])
    doc.setLineWidth(0.5)
    doc.line(margin, y, 190, y)
    y += 12

    aftercareSections.forEach((section) => {
      const bulletLines = section.bullets.flatMap((b) =>
        doc.splitTextToSize(`• ${b}`, 165)
      )
      const blockHeight = 12 + bulletLines.length * 6 + 8
      if (y + blockHeight > 270) {
        doc.addPage()
        y = 30
      }

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(13)
      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
      doc.text(section.title, margin, y)
      y += 8

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10.5)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      bulletLines.forEach((line) => {
        doc.text(line, margin + 5, y)
        y += 6
      })
      y += 6
    })
  }

  // Footer (placed on the page where we ended up — covers single or multi page)
  const lastPage = doc.internal.getNumberOfPages()
  doc.setPage(lastPage)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text('WhatsApp: +27 63 514 9482  |  Instagram: @purely_graced_aesthetics', margin, 278)
  doc.text('Facebook: Purely Graced Aesthetics  |  Email: purelygraced1@gmail.com', margin, 283)

  doc.save(`booking-summary-${form.name.replace(/\s+/g, '-')}.pdf`)
}

/**
 * Generates a styled Gift Voucher PDF.
 * @param {Object} voucher - Recipient, amount, from, message, code
 */
export function generateGiftVoucherPDF(voucher) {
  const { recipient, amount, from, message, code } = voucher
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a5', // 210 × 148 mm landscape
  })
  
  const W = 210
  const H = 148
  const plum = [20, 17, 20]
  const roseGold = [209, 65, 119]

  // Cream background
  doc.setFillColor(252, 248, 251)
  doc.rect(0, 0, W, H, 'F')

  // Borders
  doc.setDrawColor(roseGold[0], roseGold[1], roseGold[2])
  doc.setLineWidth(0.8)
  doc.rect(6, 6, W - 12, H - 12)
  doc.setLineWidth(0.2)
  doc.rect(9, 9, W - 18, H - 18)

  // Brand Header
  drawLogo(doc, W / 2, 35, 1.2)

  // Label
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setCharSpace(3)
  doc.setTextColor(roseGold[0], roseGold[1], roseGold[2])
  doc.text('GIFT VOUCHER', W / 2, 53, { align: 'center' })
  doc.setCharSpace(0)

  // Recipient
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(plum[0], plum[1], plum[2])
  doc.text(`To: ${recipient}`, W / 2, 68, { align: 'center' })

  // Amount
  doc.setFont('times', 'italic')
  doc.setFontSize(54)
  doc.setTextColor(plum[0], plum[1], plum[2])
  doc.text(`R ${amount}`, W / 2, 98, { align: 'center' })

  // Message
  if (message) {
    doc.setFont('times', 'italic')
    doc.setFontSize(11)
    doc.setTextColor(80, 80, 80)
    const wrapped = doc.splitTextToSize(`"${message}"`, W - 60)
    doc.text(wrapped, W / 2, 110, { align: 'center' })
  } else {
    doc.setFont('times', 'italic')
    doc.setFontSize(10)
    doc.setTextColor(140, 122, 136)
    doc.text('Redeemable against any PGA treatment.', W / 2, 110, { align: 'center' })
  }

  // From
  if (from) {
    doc.setFont('times', 'italic')
    doc.setFontSize(11)
    doc.setTextColor(plum[0], plum[1], plum[2])
    doc.text(`— with love, ${from}`, W / 2, 126, { align: 'center' })
  }

  // Footer
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.5)
  doc.setCharSpace(1.1)
  doc.setTextColor(140, 122, 136)
  doc.text(`CODE ${code}  |  +27 63 514 9482  |  @purely_graced_aesthetics`, W / 2, H - 16, { align: 'center' })
  doc.text(`FB: Purely Graced Aesthetics  |  Email: purelygraced1@gmail.com`, W / 2, H - 12, { align: 'center' })
  doc.setCharSpace(0)

  // Redemption note
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(6.5)
  doc.setTextColor(160, 144, 156)
  doc.text('Voucher activates on payment confirmation. Valid for 12 months from issue date.', W / 2, H - 10, { align: 'center' })

  doc.save(`PGA-gift-voucher-${code}.pdf`)
}

/**
 * Generates a skin concern recommendation PDF.
 * @param {Object} results - Concern, recommendations list
 */
export function generateSkinRecommendationPDF(results) {
  const { goal, recommendations } = results
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const plum = [20, 17, 20]
  const roseGold = [209, 65, 119]
  const margin = 20
  let y = 35

  // Header Logo
  drawLogo(doc, 160, 25, 0.6)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(roseGold[0], roseGold[1], roseGold[2])
  doc.text('PURELY GRACED AESTHETICS', margin, 20)

  // Title
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(plum[0], plum[1], plum[2])
  doc.text('Your Skin Treatment Plan', margin, y)
  y += 12

  doc.setFontSize(11)
  doc.setFont('helvetica', 'italic')
  doc.text(`Primary Goal: ${goal}`, margin, y)
  y += 15

  // Recommendations
  recommendations.forEach((s, index) => {
    if (y > 250) {
      doc.addPage()
      y = 30
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(roseGold[0], roseGold[1], roseGold[2])
    doc.text(`${index + 1}. ${s.name}`, margin, y)
    y += 8

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10.5)
    doc.setTextColor(plum[0], plum[1], plum[2])
    
    doc.text(`Category: ${s.categoryName}`, margin, y)
    y += 6
    doc.text(`Price: R ${s.price}  ·  Duration: ~${s.durationMin} min`, margin, y)
    y += 15
  })

  // CTA
  y += 10
  doc.setDrawColor(roseGold[0], roseGold[1], roseGold[2])
  doc.setLineWidth(0.1)
  doc.line(margin, y, 190, y)
  y += 15

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text('Next Steps:', margin, y)
  y += 8
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.text('1. Book your preferred treatment on our website.', margin, y)
  y += 6
  doc.text('2. Share this PDF with us on WhatsApp for a quick consultation.', margin, y)
  y += 6
  doc.text('3. Arrive with clean skin and get ready to glow.', margin, y)

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text('WhatsApp: +27 63 514 9482  |  Instagram: @purely_graced_aesthetics', margin, 278)
  doc.text('Facebook: Purely Graced Aesthetics  |  Email: purelygraced1@gmail.com', margin, 283)

  doc.save(`PGA-skin-recommendation.pdf`)
}

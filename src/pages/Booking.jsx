import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/PageHero'
import { getGuideForService } from '../data/education'
import { generateAftercarePDF, generateBookingSummaryPDF } from '../utils/pdfGenerator'
import {
  categories,
  formatPrice,
  formatDuration,
  pageHeroPhotos,
  timeSlots,
  slotFits,
  itemPrice,
  itemDuration,
  itemSelectedAddOns,
  travelAreaStatus,
  travelAreas,
  occasionPresets,
  aftercareByCategory,
  rebookWeeksByCategory,
} from '../data/services'
import './Booking.css'

function todayIso() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function makeSelection(category, service) {
  return {
    categoryId: category.id,
    categoryName: category.name,
    name: service.name,
    price: service.price,
    note: service.note,
    durationMin: service.durationMin,
    addOns: service.addOns || [],
    selectedAddOnIds: [],
  }
}

export default function Booking() {
  const [params] = useSearchParams()
  const minDate = todayIso()

  // Pre-fill the cart from ?service=&category= OR ?preset=<id> once on mount.
  const [selections, setSelections] = useState(() => {
    const presetId = params.get('preset')
    if (presetId) {
      const preset = occasionPresets.find((p) => p.id === presetId)
      if (preset) {
        return preset.services
          .map(({ categoryId, name }) => {
            const cat = categories.find((c) => c.id === categoryId)
            const svc = cat?.services.find((s) => s.name === name)
            return cat && svc ? makeSelection(cat, svc) : null
          })
          .filter(Boolean)
      }
    }
    const categoryId = params.get('category')
    const serviceName = params.get('service')
    if (!categoryId || !serviceName) return []
    const cat = categories.find((c) => c.id === categoryId)
    if (!cat) return []
    const svc = cat.services.find((s) => s.name === serviceName)
    if (!svc) return []
    return [makeSelection(cat, svc)]
  })
  const [picker, setPicker] = useState({ categoryId: '', service: '' })
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    notes: '',
    suburb: '',
    partySize: 1,
  })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const presetName = (() => {
    const id = params.get('preset')
    return id ? occasionPresets.find((p) => p.id === id)?.name : null
  })()

  const suburbStatus = useMemo(
    () => travelAreaStatus(form.suburb),
    [form.suburb]
  )

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === picker.categoryId) || null,
    [picker.categoryId]
  )

  const subtotal = selections.reduce((sum, s) => sum + itemPrice(s), 0)
  const totalMinutes = selections.reduce(
    (sum, s) => sum + itemDuration(s),
    0
  )

  const availableSlots = useMemo(() => {
    if (totalMinutes === 0) return timeSlots
    return timeSlots.filter((s) => slotFits(s, totalMinutes))
  }, [totalMinutes])

  const slotsFiltered =
    totalMinutes > 0 && availableSlots.length < timeSlots.length
  const noSlotsAvailable = totalMinutes > 0 && availableSlots.length === 0
  const alreadyAdded =
    activeCategory &&
    picker.service &&
    selections.some(
      (s) => s.categoryId === picker.categoryId && s.name === picker.service
    )

  // Pick a rebook cadence from the *primary* selection (first in cart)
  // unless it has no cadence — then use the shortest among the others.
  const rebookInfo = useMemo(() => {
    if (!selections.length) return null
    const primary = selections[0]
    const primaryWeeks = rebookWeeksByCategory[primary.categoryId]
    if (primaryWeeks != null) {
      return { weeks: primaryWeeks, categoryName: primary.categoryName }
    }
    const others = selections
      .slice(1)
      .map((s) => ({
        weeks: rebookWeeksByCategory[s.categoryId],
        categoryName: s.categoryName,
      }))
      .filter((x) => x.weeks != null)
    if (!others.length) return null
    return others.reduce((min, x) =>
      x.weeks < min.weeks ? x : min
    )
  }, [selections])

  const addSelection = () => {
    if (!activeCategory || !picker.service) return
    const svc = activeCategory.services.find(
      (s) => s.name === picker.service
    )
    if (!svc) return
    if (alreadyAdded) return
    setSelections((prev) => [...prev, makeSelection(activeCategory, svc)])
    // If the currently-selected time no longer fits the new total, drop it.
    const nextTotal = totalMinutes + (svc.durationMin || 0)
    if (form.time && !slotFits(form.time, nextTotal)) {
      setForm((f) => ({ ...f, time: '' }))
    }
    setPicker({ categoryId: '', service: '' })
    setError('')
  }

  const removeSelection = (idx) => {
    setSelections((prev) => prev.filter((_, i) => i !== idx))
  }

  const toggleAddOn = (selectionIdx, addOnId) => {
    const next = selections.map((item, i) => {
      if (i !== selectionIdx) return item
      const ids = item.selectedAddOnIds || []
      const nextIds = ids.includes(addOnId)
        ? ids.filter((id) => id !== addOnId)
        : [...ids, addOnId]
      return { ...item, selectedAddOnIds: nextIds }
    })
    setSelections(next)
    const nextTotal = next.reduce((sum, s) => sum + itemDuration(s), 0)
    if (form.time && !slotFits(form.time, nextTotal)) {
      setForm((f) => ({ ...f, time: '' }))
    }
  }

  const updateForm = (field) => (e) => {
    const value = field === 'partySize' ? Number(e.target.value) : e.target.value
    setForm((f) => ({ ...f, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selections.length === 0) {
      setError('Please add at least one treatment.')
      return
    }
    const treatmentLines = selections.map((s) => {
      const price = itemPrice(s)
      const duration = itemDuration(s)
      const addOnLabels = itemSelectedAddOns(s).map((a) => a.label)
      const addOnBit = addOnLabels.length
        ? ` (with ${addOnLabels.join(', ')})`
        : ''
      const noteBit = s.note ? ` — ${s.note}` : ''
      const durBit = duration ? ` · ${formatDuration(duration)}` : ''
      return `• ${s.name} (${s.categoryName})${noteBit}${addOnBit} — ${formatPrice(
        price
      )}${durBit}`
    })
    const totalAcrossParty = subtotal * Math.max(1, form.partySize || 1)
    const partyBit =
      form.partySize > 1
        ? ` × ${form.partySize} people = ${formatPrice(totalAcrossParty)}`
        : ''
    // Unique set of categories across the selections for aftercare links.
    const touchedCategories = [
      ...new Set(selections.map((s) => s.categoryId)),
    ]
    const aftercareRefs = touchedCategories
      .map((id) => aftercareByCategory[id]?.title)
      .filter(Boolean)
    const lines = [
      `Hi PGA, I'd like to book an appointment.`,
      presetName && `(Selected from: ${presetName})`,
      '',
      `Treatments (${selections.length}):`,
      ...treatmentLines,
      `Subtotal: ${formatPrice(subtotal)}${partyBit}`,
      totalMinutes > 0 &&
        `Appointment length: ~${formatDuration(totalMinutes)}${
          form.partySize > 1 ? ` per person` : ''
        }`,
      '',
      form.date && `Date: ${form.date}`,
      form.time && `Time: ${form.time}`,
      form.partySize > 1 && `Party size: ${form.partySize} people`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      form.suburb && `Suburb: ${form.suburb}`,
      form.notes && '',
      form.notes && `Notes: ${form.notes}`,
      '',
      aftercareRefs.length > 0 &&
        `Please share aftercare for: ${aftercareRefs.join(', ')}.`,
    ].filter(Boolean)
    const url = `https://wa.me/27635149482?text=${encodeURIComponent(
      lines.join('\n')
    )}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <>
      <Helmet>
        <title>Book an Appointment | Purely Graced Aesthetics</title>
        <meta 
          name="description" 
          content="Book your mobile beauty and aesthetic treatments online. Select from our range of facials, massages, and skincare services and we'll come to you in Johannesburg." 
        />
      </Helmet>

      <PageHero
        photoId={pageHeroPhotos.booking}
        eyebrow="Book now"
        title="Let's pick your treatments."
        subtitle="Stack multiple treatments into one appointment, pick a date and time, and we'll confirm on WhatsApp within the hour."
      />

      <section className="section booking-body">
        <div className="container booking-grid">
          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            {presetName && (
              <div className="booking-preset-banner" role="note">
                <span className="booking-preset-label">Occasion preset</span>
                <strong>{presetName}</strong>
                <span>— treatments pre-filled below. Feel free to edit.</span>
              </div>
            )}

            <fieldset className="booking-group">
              <legend>1. Choose your treatments</legend>

              <div className="booking-add-row">
                <label>
                  <span>Category</span>
                  <select
                    value={picker.categoryId}
                    onChange={(e) =>
                      setPicker({
                        categoryId: e.target.value,
                        service: '',
                      })
                    }
                  >
                    <option value="">Select a category…</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Service</span>
                  <select
                    value={picker.service}
                    onChange={(e) =>
                      setPicker((p) => ({ ...p, service: e.target.value }))
                    }
                    disabled={!activeCategory}
                  >
                    <option value="">
                      {activeCategory
                        ? 'Select a service…'
                        : 'Pick a category first'}
                    </option>
                    {activeCategory?.services.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name} — {formatPrice(s.price)}
                        {s.durationMin
                          ? ` · ${formatDuration(s.durationMin)}`
                          : ''}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  className="btn btn-primary booking-add-btn"
                  onClick={addSelection}
                  disabled={!picker.service || !!alreadyAdded}
                >
                  {alreadyAdded ? 'Added ✓' : 'Add +'}
                </button>
              </div>

              {selections.length > 0 ? (
                <div className="booking-selections">
                  <div className="booking-selections-head">
                    <span>
                      Your selection ({selections.length})
                    </span>
                    <span className="booking-selections-subtotal">
                      {formatPrice(subtotal)}
                      {totalMinutes > 0 && (
                        <>
                          <span className="booking-dot" aria-hidden="true">
                            ·
                          </span>
                          ~{formatDuration(totalMinutes)}
                        </>
                      )}
                    </span>
                  </div>
                  <ul className="booking-selections-list">
                    {selections.map((s, i) => {
                      const itemDur = itemDuration(s)
                      return (
                        <li
                          key={`${s.categoryId}-${s.name}`}
                          className="booking-selection-item"
                        >
                          <div>
                            <span className="booking-selection-cat">
                              {s.categoryName}
                              {itemDur > 0 && (
                                <>
                                  {' · '}
                                  {formatDuration(itemDur)}
                                </>
                              )}
                            </span>
                            <strong>{s.name}</strong>
                            {s.note && <em>{s.note}</em>}
                            {s.addOns && s.addOns.length > 0 && (
                              <div className="booking-selection-addons">
                                {s.addOns.map((a) => {
                                  const enabled = (
                                    s.selectedAddOnIds || []
                                  ).includes(a.id)
                                  return (
                                    <label
                                      key={a.id}
                                      className="booking-selection-addon"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={enabled}
                                        onChange={() =>
                                          toggleAddOn(i, a.id)
                                        }
                                      />
                                      <span className="booking-selection-addon-label">
                                        {a.label}
                                      </span>
                                      <span className="booking-selection-addon-meta">
                                        +{formatPrice(a.price)}
                                        {a.durationMin
                                          ? ` · +${formatDuration(
                                              a.durationMin
                                            )}`
                                          : ''}
                                      </span>
                                    </label>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                          <span className="booking-selection-price">
                            {formatPrice(itemPrice(s))}
                          </span>
                          <button
                            type="button"
                            className="booking-selection-remove"
                            onClick={() => removeSelection(i)}
                            aria-label={`Remove ${s.name}`}
                            title="Remove"
                          >
                            ×
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : (
                <p className="booking-empty">
                  No treatments added yet. Pick one above and click{' '}
                  <strong>Add +</strong>, or{' '}
                  <Link to="/services">browse the full menu</Link>.
                </p>
              )}
            </fieldset>

            <fieldset className="booking-group">
              <legend>2. Where &amp; who</legend>
              <div className="booking-row">
                <label>
                  <span>Your suburb</span>
                  <input
                    type="text"
                    value={form.suburb}
                    onChange={updateForm('suburb')}
                    placeholder="e.g. Randburg"
                    autoComplete="address-level2"
                    list="booking-suburb-list"
                  />
                  <datalist id="booking-suburb-list">
                    {[...travelAreas.included, ...travelAreas.askFirst].map(
                      (a) => (
                        <option key={a} value={a} />
                      )
                    )}
                  </datalist>
                </label>
                <label>
                  <span>How many people?</span>
                  <select
                    value={form.partySize}
                    onChange={updateForm('partySize')}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n === 1 ? 'Just me' : `${n} people`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {suburbStatus && (
                <p
                  className={`booking-suburb-note booking-suburb-${suburbStatus.status}`}
                  role="status"
                >
                  {suburbStatus.status === 'included' && (
                    <>
                      ✓ <strong>{suburbStatus.match}</strong> is in our
                      regular travel radius.
                    </>
                  )}
                  {suburbStatus.status === 'ask' && (
                    <>
                      We often travel to <strong>{suburbStatus.match}</strong>
                      . Expect a small travel fee — please confirm on
                      WhatsApp.
                    </>
                  )}
                  {suburbStatus.status === 'unknown' && (
                    <>
                      We may still come to{' '}
                      <strong>{suburbStatus.match}</strong> —{' '}
                      <a
                        href="https://wa.me/27635149482"
                        target="_blank"
                        rel="noreferrer"
                      >
                        message us
                      </a>{' '}
                      for a quick yes/no.
                    </>
                  )}
                </p>
              )}
              {form.partySize > 1 && (
                <p className="booking-hint">
                  We'll bring an extra set of tools for{' '}
                  <strong>{form.partySize} people</strong>. Price{' '}
                  multiplies accordingly — single appointment slot at the
                  same address.
                </p>
              )}
            </fieldset>

            <fieldset className="booking-group">
              <legend>3. Your details</legend>
              <div className="booking-row">
                <label>
                  <span>Full name</span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={updateForm('name')}
                    autoComplete="name"
                  />
                </label>
                <label>
                  <span>Phone</span>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={updateForm('phone')}
                    autoComplete="tel"
                    placeholder="+27…"
                  />
                </label>
              </div>
              <label>
                <span>Email (optional)</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={updateForm('email')}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>
            </fieldset>

            <fieldset className="booking-group">
              <legend>4. Pick a date &amp; time</legend>
              <div className="booking-row">
                <label>
                  <span>Date</span>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={form.date}
                    onChange={updateForm('date')}
                  />
                </label>
                <label>
                  <span>Time</span>
                  <select
                    required
                    value={form.time}
                    onChange={updateForm('time')}
                    disabled={noSlotsAvailable}
                  >
                    <option value="">
                      {noSlotsAvailable
                        ? 'Too long for one day — trim selection'
                        : 'Select a time…'}
                    </option>
                    {availableSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="booking-hint">
                All selected treatments will be stacked into this single
                appointment slot
                {totalMinutes > 0 && (
                  <>
                    {' '}— approximately{' '}
                    <strong>{formatDuration(totalMinutes)}</strong> in total
                  </>
                )}
                .
              </p>
              {slotsFiltered && !noSlotsAvailable && (
                <p className="booking-slots-note">
                  Showing only slots where a{' '}
                  <strong>{formatDuration(totalMinutes)}</strong>{' '}
                  appointment can finish by 6pm. Need a later time?{' '}
                  <a
                    href="https://wa.me/27635149482"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Message us directly.
                  </a>
                </p>
              )}
              {noSlotsAvailable && (
                <p className="booking-slots-note booking-slots-warn">
                  Your selection totals{' '}
                  <strong>{formatDuration(totalMinutes)}</strong>, longer
                  than a single working day (09:00–18:00). Remove a
                  treatment or split across two appointments.
                </p>
              )}
            </fieldset>

            <fieldset className="booking-group">
              <legend>5. Additional notes</legend>
              <label>
                <span>Anything we should know?</span>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={updateForm('notes')}
                  placeholder="Your address, skin concerns, parking notes, etc."
                />
              </label>
            </fieldset>

            <div className="booking-submit">
              <button type="submit" className="btn btn-primary">
                Send on WhatsApp
              </button>
              <p className="booking-disclaimer">
                Submitting opens WhatsApp with your full booking pre-filled —
                just hit send on your phone.
              </p>
              {error && (
                <p className="booking-error" role="alert">
                  {error}
                </p>
              )}
              {sent && (
                <div className="booking-success" role="status">
                  <strong>Request sent.</strong>
                  <p>
                    WhatsApp opened in a new tab — send the message and
                    we'll confirm your slot shortly.
                  </p>
                  
                  {selections.length > 0 && (
                    <div className="booking-success-downloads">
                      <p>
                        While you wait, download your booking summary —
                        aftercare for every treatment is included.
                      </p>
                      <div className="booking-success-btns">
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => generateBookingSummaryPDF({ selections, form, subtotal, totalMinutes })}
                        >
                          Booking Summary + Aftercare (PDF) ↓
                        </button>
                        {selections
                          .map(s => getGuideForService(s.name))
                          .filter(Boolean)
                          .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
                          .map(guide => (
                            <button
                              key={guide.id}
                              type="button"
                              className="btn btn-ghost btn-sm"
                              onClick={() => generateAftercarePDF(guide)}
                            >
                              {guide.title} (PDF) ↓
                            </button>
                          ))
                        }
                      </div>
                    </div>
                  )}

                  {rebookInfo && (
                    <p className="booking-rebook">
                      After your visit we'll suggest rebooking your{' '}
                      <strong>
                        {rebookInfo.categoryName.toLowerCase()}
                      </strong>{' '}
                      in about{' '}
                      <strong>{rebookInfo.weeks} weeks</strong> — that's
                      when results start to fade and skin is ready for its
                      next cycle.
                    </p>
                  )}
                </div>
              )}
            </div>
          </form>

          <aside className="booking-side">
            <div className="booking-side-card">
              <h3>What happens next</h3>
              <ol>
                <li>
                  Your request lands in our WhatsApp — usually replied to
                  within the hour.
                </li>
                <li>
                  We confirm the slot and share a quick prep list for your
                  treatments.
                </li>
                <li>
                  We arrive on time with the full mobile studio — and
                  leave no trace but the glow.
                </li>
              </ol>
            </div>

            <div className="booking-side-card">
              <h3>Prefer a quick chat?</h3>
              <p>
                Message or call us directly and we'll walk you through the
                options.
              </p>
              <a
                href="https://wa.me/27635149482"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                WhatsApp us
              </a>
            </div>

            <div className="booking-side-card booking-side-subtle">
              <h4>Service area</h4>
              <p>
                Roodepoort, Randburg &amp; Greater Johannesburg. Outside
                our usual radius?{' '}
                <Link to="/contact">Ask us</Link> — we may still come.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

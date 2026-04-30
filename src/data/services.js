// Source of truth: take.app/pgma, cross-checked against the per-category
// pages under /c/<id>. Prices in ZAR as integer rand.

const UNSPLASH = 'https://images.unsplash.com/'
const PEXELS = 'https://images.pexels.com/photos/'

export const beforeAfterSamples = [
  {
    id: 'ba-1',
    title: 'Brightening Facial Results',
    serviceName: 'Brightening Facial',
    beforeId: 'photo-1512290923902-8a9f81dc2069',
    afterId: 'photo-1515377905703-c4788e51af15',
  },
  {
    id: 'ba-2',
    title: 'Microneedling Transformation',
    serviceName: 'Microneedling',
    beforeId: 'photo-1616394584738-fc6e612e71b9',
    afterId: 'photo-1616683693504-3ee7e1da4f44',
  }
]

export function img(photoId, { w = 800 } = {}) {
  const id = String(photoId)
  if (id.startsWith('http') || id.startsWith('/assets/')) {
    return id
  }
  if (id.startsWith('photo-')) {
    return `${UNSPLASH}${id}?w=${w}&q=80&auto=format&fit=crop`
  }
  return `${PEXELS}${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
}

export const categories = [
  {
    id: 'aesthetics',
    name: 'Aesthetics',
    blurb: 'Skin-resurfacing and targeted treatments that leave you glowing.',
    photoId: 'photo-1616394584738-fc6e612e71b9',
    services: [
      {
        name: 'Microneedling',
        price: 550,
        durationMin: 60,
        photoId: 'photo-1677091508089-2958f18244fe',
        description: 'A collagen-induction treatment that uses ultra-fine needles to create controlled micro-channels in the skin, stimulating cell renewal for smoother, firmer results. Mild redness settles within 24–48 hours.',
        preCare: [
          'Stop retinol and active acids 3 days prior.',
          'Avoid sun exposure for 1 week before.',
          'Arrive with a clean, makeup-free face.'
        ]
      },
      {
        name: 'Skin Tag Removal',
        price: 450,
        durationMin: 30,
        photoId: 'photo-1677091508080-d6ee28356318',
        description: 'Professional removal of benign skin tags using sterile technique. A quick, almost painless procedure — most tags heal within 5–7 days with minimal scarring.',
      },
      {
        name: 'Mole Removal',
        price: 450,
        durationMin: 30,
        photoId: 'photo-1741934023052-26baf5535088',
        description: 'Cosmetic removal of benign moles, followed with detailed aftercare. Any suspicious lesions are referred to a dermatologist for medical review first.',
      },
      {
        name: 'Glycolic Peel 25%',
        price: 300,
        durationMin: 30,
        photoId: 'photo-1761718209708-9ab9ba1c7252',
        description: 'A mild chemical peel using 25% glycolic acid to dissolve dead surface cells, refine texture, and reveal brighter skin. No downtime — a lovely introduction to peels.',
      },
      {
        name: 'Acne High Frequency',
        price: 250,
        durationMin: 30,
        photoId: 'photo-1647004692483-c5d942fe1137',
        description: 'A gentle electrotherapy treatment that oxygenates the skin, calms inflammation, and kills acne-causing bacteria. Ideal for breakout-prone or congested skin as a stand-alone or facial add-on.',
      },
      {
        name: 'Polyphenol Algae Mask',
        price: 230,
        durationMin: 45,
        photoId: 'photo-1623225088166-eea1cdc9775a',
        description: 'A nutrient-rich mask formulated with green polyphenols and marine algae. Detoxifies, hydrates deeply, and restores radiance — suitable for all skin types including sensitive.',
      },
    ],
  },
  {
    id: 'facials',
    name: 'Facials',
    blurb: 'Deep-cleansing and nourishing facials tailored to your skin type.',
    photoId: 'photo-1552693673-1bf958298935',
    services: [
      {
        name: 'Brightening Facial',
        price: 550,
        durationMin: 75,
        note: 'Peel + Dermaplaning',
        photoId: 'photo-1616394584738-fc6e612e71b9',
        description: 'Our signature two-step treatment: a gentle chemical peel followed by dermaplaning. Skin emerges smoother, brighter, and ready to drink in active products — the go-to before a big event.',
        preCare: [
          'Skip exfoliating at home 2 days before.',
          'Ideally, have a "naked skin" day before our visit.',
          'Wait 2 weeks after any injectable treatments.'
        ]
      },
      {
        name: 'Purifying Facial',
        price: 450,
        durationMin: 60,
        photoId: 'photo-1617778368431-f97343a411ac',
        description: 'A deep-cleansing facial with steam, extraction, and a balancing mask. Designed for congested or combination skin — you will feel the difference right away.',
      },
      {
        name: 'Anti-Ageing Facial',
        price: 420,
        durationMin: 60,
        photoId: 'photo-1713085085470-fba013d67e65',
        description: 'A firming facial that targets fine lines and loss of elasticity using peptide-rich serums, a lifting massage, and collagen-boosting masks.',
      },
      {
        name: 'Dermaplaning',
        price: 400,
        durationMin: 45,
        photoId: 'photo-1544717304-a2db4a7b16ee',
        description: 'A precision exfoliation that removes peach fuzz and dead skin with a sterile scalpel. Instantly smooths and brightens, and skincare penetrates much better afterwards. No downtime.',
      },
      {
        name: 'Microdermabrasion',
        price: 270,
        durationMin: 45,
        photoId: 'photo-1516815989420-9cb5ef0fce78',
        description: 'A mechanical resurfacing treatment that softens fine lines, improves texture, and reveals a fresh glow. Great monthly maintenance for dull or tired skin.',
      },
    ],
  },
  {
    id: 'massages',
    name: 'Massages',
    blurb: 'Tension-releasing massage in the comfort of your own space.',
    photoId: 'photo-1519823551278-64ac92734fb1',
    services: [
      {
        name: 'Deep Tissue',
        price: 600,
        durationMin: 60,
        photoId: 'photo-1519823551278-64ac92734fb1',
        description: 'A firm, therapeutic massage that releases chronic tension in the deeper muscle layers. Ideal for knots, postural pain, and athletic recovery. Expect mild next-day tenderness.',
      },
      {
        name: 'Pregnancy Massage',
        price: 600,
        durationMin: 60,
        photoId: 'photo-1540555700478-4be289fbecef',
        description: 'A gentle, side-lying massage for the second trimester onwards. Relieves back pain, swollen feet, and tension — pressure and positioning carefully adjusted for pregnancy.',
      },
      {
        name: 'Manual Lymph Drainage',
        price: 580,
        durationMin: 60,
        photoId: 'photo-1515377905703-c4788e51af15',
        description: 'A light, rhythmic technique that stimulates lymph flow to reduce swelling, boost immunity, and aid post-surgical recovery. Deeply relaxing and detoxifying.',
      },
      {
        name: 'Swedish',
        price: 550,
        durationMin: 60,
        photoId: 'photo-1542848284-8afa78a08ccb',
        description: 'The classic full-body massage — long flowing strokes and gentle pressure to relax muscles and calm the nervous system. A true reset.',
      },
      {
        name: 'Reflexology',
        price: 300,
        durationMin: 45,
        photoId: 'photo-1537128535997-13b690849da9',
        description: 'A focused foot massage that works pressure points linked to organs and systems throughout the body. Restorative — great for sleep, circulation, and tension headaches.',
      },
    ],
  },
  {
    id: 'waxing',
    name: 'Waxing',
    blurb: 'Gentle, precise hair removal for face and body.',
    photoId: 'photo-1716363120131-2aa0e8bb5fba',
    services: [
      {
        name: 'Hollywood',
        price: 230,
        durationMin: 30,
        photoId: 'photo-1716363120131-2aa0e8bb5fba',
        description: 'A complete intimate wax that removes all hair in one session. Long-lasting, hygienic, and smoother-feeling than shaving — regular waxing thins regrowth over time.',
      },
      {
        name: 'Full Leg',
        price: 230,
        durationMin: 45,
        photoId: 'photo-1620733723572-11c53f73a416',
        description: 'Complete hair removal from ankle to upper thigh using a professional warm wax. Smooth results for up to 4 weeks with finer regrowth.',
      },
      {
        name: 'Full Arm',
        price: 200,
        durationMin: 30,
        photoId: 'photo-1492618269284-653dce58fd6d',
        description: 'Full-length arm wax from shoulder to wrist. Minimal regrowth for 3–4 weeks — the easy option before a holiday or event.',
      },
      {
        name: 'Half Leg',
        price: 200,
        durationMin: 30,
        photoId: 'photo-1761718210089-ba3bb5ccb54f',
        description: 'Ankle to knee, or knee to thigh — whichever you prefer. A quicker alternative to a full leg with the same smooth finish.',
      },
      {
        name: 'Bikini',
        price: 150,
        durationMin: 20,
        photoId: 'photo-1570172619644-dfd03ed5d881',
        description: 'A standard bikini-line wax that removes hair outside the underwear line. Quick, precise, and summer-ready.',
      },
      {
        name: 'Under Arms',
        price: 100,
        durationMin: 15,
        photoId: 'photo-1761718209835-c8586b7dcac0',
        description: 'A fast underarm wax. Smoothness lasts 3–4 weeks; consistent waxing usually makes regrowth finer and lighter over time.',
      },
      {
        name: 'Tint Lashes',
        price: 100,
        durationMin: 20,
        photoId: 'photo-1633346152343-5486573d3d50',
        description: 'A gentle professional tint that deepens natural lash colour for a mascara-like effect — no makeup needed. Lasts 4–6 weeks.',
      },
      {
        name: 'Eyebrow',
        price: 50,
        durationMin: 15,
        photoId: 'photo-1715195060250-b321e5cd5171',
        description: 'Precision brow shaping using warm wax to remove stray hairs and define the natural arch. Shape tailored to your face. Add tint for a fuller, defined finish.',
        addOns: [
          {
            id: 'brow-tint',
            label: 'Add brow tint',
            price: 30,
            durationMin: 5,
          },
        ],
      },
      {
        name: 'Upper / Lower Lip',
        price: 50,
        durationMin: 10,
        photoId: 'photo-1613057388812-029549dc3d39',
        description: 'A quick wax to remove fine upper- or lower-lip hair. Smooth finish, minimal discomfort, 3–4 weeks of regrowth.',
      },
      {
        name: 'Tint Brows',
        price: 45,
        durationMin: 15,
        photoId: 'photo-1542833807-ad5af0977050',
        description: 'A professional brow tint that fills sparse areas and deepens colour for a fuller, defined look. Lasts 3–4 weeks — pairs beautifully with eyebrow waxing.',
      },
    ],
  },
  {
    id: 'nails',
    name: 'Nails',
    blurb: 'Manicures and pedicures finished with a graceful touch.',
    photoId: 'photo-1519014816548-bf5fe059798b',
    services: [
      {
        name: 'Soft Gel Tips + Gel',
        price: 250,
        durationMin: 90,
        photoId: 'photo-1632345031435-8727f6897d53',
        description: 'Flexible soft-gel tip extensions finished with gel polish. Lightweight and far kinder to the nail bed than acrylics; lasts 2–3 weeks.',
      },
      {
        name: 'Gel Pedicure',
        price: 230,
        durationMin: 75,
        photoId: 'photo-1519415510236-718bdfcd89c8',
        description: 'The full pedi — warm soak, foot scrub, cuticle work, shape — finished with a chip-resistant gel polish. Flawless for 3–4 weeks with no flaking.',
      },
      {
        name: 'Classic Pedicure',
        price: 150,
        durationMin: 45,
        photoId: 'photo-1664643411326-6c589531be3c',
        description: 'The full pedi ritual: warm soak, foot scrub, heel smoothing, cuticle care, shape, and regular polish. A reset for tired feet.',
      },
      {
        name: 'Classic Manicure',
        price: 120,
        durationMin: 30,
        photoId: 'photo-1519014816548-bf5fe059798b',
        description: 'Hand soak, cuticle care, nail shaping, a light hand massage, and regular polish. Neat, clean, and quick — a good weekly reset.',
      },
      {
        name: 'Gel Polish',
        price: 120,
        durationMin: 45,
        photoId: 'photo-1607779097040-26e80aa78e66',
        description: 'Chip-resistant gel polish on natural nails, cured under UV for a glass-smooth finish that lasts 2 weeks.',
      },
      {
        name: 'Acrylic Soak-Off',
        price: 100,
        durationMin: 30,
        photoId: 'photo-1707725238063-0c54fb6963d1',
        description: 'Safe professional removal of existing acrylic nails using a warm soak-off method. Protects the natural nail for future wear.',
      },
      {
        name: 'Gel Soak-Off',
        price: 60,
        durationMin: 20,
        photoId: 'photo-1519419451778-14599a49ec41',
        description: 'Gentle gel polish removal that preserves the nail plate. Never peel gel at home — it thins and damages the natural nail.',
      },
    ],
  },
  {
    id: 'makeup',
    name: 'Make-up',
    blurb: 'Soft-glam and occasion make-up for every celebration.',
    photoId: 'photo-1620464003286-a5b0d79f32c2',
    services: [
      {
        name: 'Full Facebeat',
        price: 450,
        durationMin: 60,
        photoId: 'photo-1620464003286-a5b0d79f32c2',
        description: 'A full professional application: prime, base, contour, brows, eyes, lashes, lips, set. Long-wear products suited to your skin tone — ideal for weddings, events, shoots, or special nights out.',
      },
    ],
  },
]

export function formatPrice(price) {
  if (price == null) return 'Enquire'
  return `R ${price.toFixed(0)}`
}

export function formatDuration(totalMin) {
  if (!totalMin || totalMin <= 0) return ''
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

export function itemPrice(item) {
  const addOnSum = (item.addOns || [])
    .filter((a) => (item.selectedAddOnIds || []).includes(a.id))
    .reduce((s, a) => s + (a.price || 0), 0)
  return (item.price || 0) + addOnSum
}

export function itemDuration(item) {
  const addOnSum = (item.addOns || [])
    .filter((a) => (item.selectedAddOnIds || []).includes(a.id))
    .reduce((s, a) => s + (a.durationMin || 0), 0)
  return (item.durationMin || 0) + addOnSum
}

export function itemSelectedAddOns(item) {
  return (item.addOns || []).filter((a) =>
    (item.selectedAddOnIds || []).includes(a.id)
  )
}

export const categoryFaqs = {
  aesthetics: [
    {
      q: 'Is there any downtime?',
      a: 'Microneedling and peels can leave skin slightly pink for 24–48 hours. Mole and skin-tag removal heals within 5–7 days. We share exact aftercare per treatment when we confirm your booking.',
    },
    {
      q: 'Are clinical treatments safe at home?',
      a: 'Yes — we bring the same sterile single-use tools and pharmaceutical-grade products used in-clinic. Every surface is prepped before we start.',
    },
    {
      q: 'Can I book these while pregnant?',
      a: "Microneedling and peels aren't recommended during pregnancy. A Purifying Facial or Manual Lymph Drainage are safe alternatives — we'll guide you.",
    },
  ],
  facials: [
    {
      q: 'How often should I book a facial?',
      a: 'Every 4 weeks is ideal. Skin renews on roughly a 28-day cycle — a regular facial accelerates that turnover.',
    },
    {
      q: 'What should I do afterwards?',
      a: 'Avoid makeup for 4 hours, stay out of direct sun for 24 hours, and keep skincare gentle for 48 hours.',
    },
    {
      q: 'Do I need to prep my skin?',
      a: "Clean skin is ideal but we cleanse fully anyway. Skip retinol or exfoliating acids the night before.",
    },
  ],
  massages: [
    {
      q: 'Do you bring a table?',
      a: 'Yes — a professional portable bed, linens, oils, and calming music. We just need about 2 metres of space and a power outlet.',
    },
    {
      q: 'Is pregnancy massage safe?',
      a: 'From the second trimester, with side-lying positioning. We tailor pressure and avoid specific points. Please mention your trimester when booking.',
    },
    {
      q: 'What should I wear?',
      a: 'Whatever you are comfortable with — most clients undress to their comfort level beneath the sheet.',
    },
  ],
  waxing: [
    {
      q: 'How long does my hair need to be?',
      a: 'About 6 mm — two to three weeks of growth after shaving. Any shorter and the wax cannot grip.',
    },
    {
      q: 'Does it hurt?',
      a: 'The first wax is the most tender. Regular waxing (every 3–4 weeks) becomes much easier as the hair grows back finer.',
    },
    {
      q: 'Before and after?',
      a: 'Exfoliate the day before. Avoid heat and tight clothing for 24 hours after, and start gentle exfoliation again at 48 hours to prevent ingrowns.',
    },
  ],
  nails: [
    {
      q: 'How long does a gel manicure last?',
      a: '10–14 days with proper care. We recommend a removal + fresh set every 2–3 weeks so your natural nails stay healthy.',
    },
    {
      q: 'Can I walk right after a pedicure?',
      a: 'Yes — we use quick-dry top coats and bring open sandals if you prefer a few extra minutes to dry.',
    },
    {
      q: 'Can I remove gel at home?',
      a: "Please don't peel. Book a Soak-Off appointment — we remove it gently so the nail plate stays intact.",
    },
  ],
  makeup: [
    {
      q: 'How early should I book before an event?',
      a: 'We suggest arriving 90 minutes before you need to leave. Full face takes ~60 minutes and you will want breathing room.',
    },
    {
      q: 'Does it last all day?',
      a: 'Yes — we prep, prime, and set with long-wear products. For sweaty or high-energy events we can add extra setting.',
    },
    {
      q: 'Do I provide anything?',
      a: 'Just a clean, well-lit spot. We bring a full kit suited to all skin tones.',
    },
  ],
}

export const aftercareByCategory = {
  aesthetics: {
    title: 'Aesthetics aftercare',
    bullets: [
      'Keep the treated area clean and dry for 12 hours.',
      'Avoid sun, retinol, acids, hot baths and saunas for 48 hours.',
      'SPF 30+ every morning, even on cloudy days.',
      'No makeup over freshly treated skin for 24 hours.',
    ],
  },
  facials: {
    title: 'Facial aftercare',
    bullets: [
      'No makeup for 4 hours — let the skin breathe.',
      'No hot showers, sauna or gym for 12 hours.',
      'Gentle cleanser + SPF the next morning.',
      'Drink water — hydration amplifies results.',
    ],
  },
  massages: {
    title: 'Massage aftercare',
    bullets: [
      'Drink plenty of water to flush lactic acid.',
      'Avoid strenuous exercise for 12 hours.',
      'A warm (not hot) bath or gentle stretch the next day helps the work settle in.',
    ],
  },
  waxing: {
    title: 'Waxing aftercare',
    bullets: [
      'No heat, tight clothing, gym or swimming pools for 24 hours.',
      'Start gentle exfoliation at 48 hours to prevent ingrowns.',
      'Apply a soothing, fragrance-free lotion if the skin feels warm.',
    ],
  },
  nails: {
    title: 'Nails aftercare',
    bullets: [
      'Avoid hot water and harsh chemicals for the first 2 hours.',
      'Apply cuticle oil daily — dry cuticles lift gel faster.',
      'Wear gloves when cleaning or gardening.',
    ],
  },
  makeup: {
    title: 'Make-up day tips',
    bullets: [
      'Keep a touch-up lipstick and blotting papers in your clutch.',
      'Remove gently with micellar water at night — no aggressive scrubbing.',
      'Hydrating sleep mask for a refreshed morning look.',
    ],
  },
}

export const rebookWeeksByCategory = {
  aesthetics: 6,
  facials: 4,
  massages: 4,
  waxing: 4,
  nails: 3,
  makeup: null,
}

export const skinConcerns = [
  {
    id: 'acne',
    name: 'Acne & breakouts',
    blurb: 'Clear congestion, calm inflammation, rebalance oil.',
    photoId: 'photo-1647004692483-c5d942fe1137',
    services: ['Acne High Frequency', 'Purifying Facial', 'Microneedling'],
  },
  {
    id: 'pigmentation',
    name: 'Pigmentation & dark spots',
    blurb: 'Lift discolouration, even tone, brighten the whole face.',
    photoId: 'photo-1761718209708-9ab9ba1c7252',
    services: [
      'Glycolic Peel 25%',
      'Brightening Facial',
      'Microdermabrasion',
    ],
  },
  {
    id: 'ageing',
    name: 'Ageing & fine lines',
    blurb: 'Stimulate collagen, firm, plump and soften the texture.',
    photoId: 'photo-1713085085470-fba013d67e65',
    services: [
      'Anti-Ageing Facial',
      'Microneedling',
      'Polyphenol Algae Mask',
    ],
  },
  {
    id: 'dull',
    name: 'Dull & tired skin',
    blurb: 'Exfoliate, re-oxygenate, bring back the glow.',
    photoId: 'photo-1741934023052-26baf5535088',
    services: [
      'Dermaplaning',
      'Glycolic Peel 25%',
      'Microdermabrasion',
    ],
  },
  {
    id: 'dehydration',
    name: 'Dehydration',
    blurb: 'Flood thirsty skin with hydration and plump it up.',
    photoId: 'photo-1623225088166-eea1cdc9775a',
    services: [
      'Purifying Facial',
      'Polyphenol Algae Mask',
      'Anti-Ageing Facial',
    ],
  },
  {
    id: 'texture',
    name: 'Scars & uneven texture',
    blurb: 'Smooth, resurface and rebuild the surface finish.',
    photoId: 'photo-1677091508080-d6ee28356318',
    services: [
      'Microneedling',
      'Dermaplaning',
      'Glycolic Peel 25%',
    ],
  },
]

export const occasionPresets = [
  {
    id: 'bridal-trial',
    name: 'Bridal Trial',
    blurb: 'Your full look, tested before the day.',
    photoId: 'photo-1616394584738-fc6e612e71b9',
    services: [
      { categoryId: 'facials', name: 'Brightening Facial' },
      { categoryId: 'makeup', name: 'Full Facebeat' },
      { categoryId: 'nails', name: 'Classic Manicure' },
    ],
  },
  {
    id: 'pre-date',
    name: 'Pre-date Glow',
    blurb: 'A polish and a glow — the quickest way to show up radiant.',
    photoId: 'photo-1544717304-a2db4a7b16ee',
    services: [
      { categoryId: 'facials', name: 'Dermaplaning' },
      { categoryId: 'makeup', name: 'Full Facebeat' },
    ],
  },
  {
    id: 'birthday',
    name: 'Birthday Pamper',
    blurb: 'A soft morning of treatments for the guest of honour.',
    photoId: 'photo-1540555700478-4be289fbecef',
    services: [
      { categoryId: 'facials', name: 'Purifying Facial' },
      { categoryId: 'massages', name: 'Swedish' },
      { categoryId: 'nails', name: 'Gel Polish' },
    ],
  },
  {
    id: 'mom-to-be',
    name: 'Mom-to-be',
    blurb: 'Safe, nurturing treatments for the second and third trimester.',
    photoId: 'photo-1515377905703-c4788e51af15',
    services: [
      { categoryId: 'massages', name: 'Pregnancy Massage' },
      { categoryId: 'nails', name: 'Classic Pedicure' },
    ],
  },
]

export const giftBundles = [
  {
    id: 'signature-glow',
    name: 'Signature Glow',
    blurb: 'A facial that resets, a polish that shines.',
    photoId: 'photo-1616394584738-fc6e612e71b9',
    services: ['Brightening Facial', 'Gel Polish'],
  },
  {
    id: 'total-relax',
    name: 'Total Relax',
    blurb: 'An hour of massage, tidy toes to match.',
    photoId: 'photo-1519823551278-64ac92734fb1',
    services: ['Swedish', 'Classic Pedicure'],
  },
  {
    id: 'pamper-trio',
    name: 'The Pamper Trio',
    blurb: 'The full day: facial, massage, manicure.',
    photoId: 'photo-1540555700478-4be289fbecef',
    services: ['Purifying Facial', 'Deep Tissue', 'Classic Manicure'],
  },
  {
    id: 'bridal-suite',
    name: 'The Bridal Suite',
    blurb: 'Wedding-day radiance from skin to fingertips.',
    photoId: '35131772',
    services: ['Brightening Facial', 'Full Facebeat', 'Gel Polish'],
  },
  {
    id: 'nurture-gift',
    name: 'The Nurture Gift',
    blurb: 'Pregnancy-safe treatments for the expectant mother.',
    photoId: '5946333',
    services: [
      'Pregnancy Massage',
      'Classic Pedicure',
      'Polyphenol Algae Mask',
    ],
  },
  {
    id: 'glow-reset',
    name: 'The Glow Reset',
    blurb: 'Two hero skin treatments for a visible transformation.',
    photoId: '37229288',
    services: ['Microneedling', 'Dermaplaning'],
  },
  {
    id: 'deep-unwind',
    name: 'The Deep Unwind',
    blurb: 'A full-body reset — tension lifted, circulation renewed.',
    photoId: '34930119',
    services: ['Deep Tissue', 'Reflexology', 'Manual Lymph Drainage'],
  },
  {
    id: 'radiance-ritual',
    name: 'The Radiance Ritual',
    blurb: 'Three layers of skin-refining care for a luminous finish.',
    photoId: '6663572',
    services: [
      'Anti-Ageing Facial',
      'Microdermabrasion',
      'Dermaplaning',
    ],
  },
  {
    id: 'festive-edit',
    name: 'The Festive Edit',
    blurb: 'The full holiday look — glow, nails, make-up, all included.',
    photoId: '7795393',
    services: [
      'Brightening Facial',
      'Gel Polish',
      'Gel Pedicure',
      'Full Facebeat',
    ],
  },
]

export function bundlePrice(bundle) {
  const all = categories.flatMap((c) => c.services)
  return bundle.services.reduce((sum, name) => {
    const svc = all.find((s) => s.name === name)
    return sum + (svc?.price || 0)
  }, 0)
}

export const travelAreas = {
  included: [
    'Roodepoort',
    'Florida',
    'Randburg',
    'Northcliff',
    'Fairland',
    'Cresta',
    'Honeydew',
    'Weltevreden Park',
    'Krugersdorp',
  ],
  askFirst: [
    'Sandton',
    'Midrand',
    'Parktown',
    'Johannesburg CBD',
    'Soweto',
    'Fourways',
  ],
}

export function travelAreaStatus(query) {
  if (!query) return null
  const q = query.trim().toLowerCase()
  if (!q) return null
  const inIncluded = travelAreas.included.find((a) =>
    a.toLowerCase().includes(q) || q.includes(a.toLowerCase())
  )
  if (inIncluded) return { status: 'included', match: inIncluded }
  const inAsk = travelAreas.askFirst.find((a) =>
    a.toLowerCase().includes(q) || q.includes(a.toLowerCase())
  )
  if (inAsk) return { status: 'ask', match: inAsk }
  return { status: 'unknown', match: query.trim() }
}

export const reviews = []

export const featuredServices = [
  { category: 'Facials', name: 'Brightening Facial', price: 550 },
  { category: 'Aesthetics', name: 'Microneedling', price: 550 },
  { category: 'Massages', name: 'Deep Tissue', price: 600 },
  { category: 'Make-up', name: 'Full Facebeat', price: 450 },
]

export const heroPhotoId = '/assets/home-hero.png'
export const aboutPhotoId = '3757942' 
export const contactPhotoId = 'photo-1522335789203-aabd1fc54bc9' 

export const pageHeroPhotos = {
  about: '3757942', 
  services: '35884502',
  contact: '7303284',
  booking: '6724359',
  gifting: '/assets/gifts-hero.png',
  reviews: '3997980',
  concerns: '34946662',
  visit: '33224928',
  notFound: '7303284',
}

export function allServices() {
  return categories.flatMap((c) =>
    c.services.map((s) => ({
      ...s,
      categoryId: c.id,
      categoryName: c.name,
    }))
  )
}

export const WORKING_DAY = { startHour: 9, endHour: 18 }

export const timeSlots = (() => {
  const slots = []
  for (let h = WORKING_DAY.startHour; h <= WORKING_DAY.endHour; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
    if (h < WORKING_DAY.endHour) {
      slots.push(`${String(h).padStart(2, '0')}:30`)
    }
  }
  return slots
})()

export function slotToMinutes(slot) {
  const [h, m] = slot.split(':').map(Number)
  return h * 60 + m
}

export function slotFits(slot, totalMin) {
  const start = slotToMinutes(slot)
  return start + (totalMin || 0) <= WORKING_DAY.endHour * 60
}

export const educationGuides = {
  'microneedling': {
    id: 'microneedling',
    title: 'Post-Microneedling Care',
    intro: 'Your skin is in a healing phase. Follow these steps to maximize results and ensure a smooth recovery.',
    steps: [
      { title: 'The first 12 hours', body: 'Keep the area clean. No washing, no products, no makeup.' },
      { title: 'Hydration', body: 'Drink plenty of water and use only the recommended calming serums.' },
      { title: 'Sun protection', body: 'Physical SPF is mandatory for the next 7 days, even indoors.' }
    ],
    doDonts: {
      do: ['Use gentle cleanser', 'Keep skin hydrated'],
      dont: ['No active acids', 'No sun exposure', 'No gym/sauna']
    },
    seoDescription: 'Essential aftercare guide for post-microneedling treatment.'
  },
  'brightening-facial': {
    id: 'brightening-facial',
    title: 'Brightening Facial Aftercare',
    intro: 'You will leave with a glow — keep it there with these simple tips.',
    steps: [
      { title: 'Immediately after', body: 'Skin may be sensitive. Avoid any heavy products.' },
      { title: 'The next 24 hours', body: 'No makeup if possible. Focus on deep hydration.' }
    ],
    doDonts: {
      do: ['Moisturize', 'Stay out of direct sun'],
      dont: ['No exfoliating', 'No hot showers']
    },
    seoDescription: 'Simple aftercare steps for your brightening facial.'
  },
  'swedish': {
    id: 'swedish',
    title: 'Swedish Massage Aftercare',
    intro: 'You have just had a relaxing treatment. To keep the benefits going, follow these simple post-massage steps.',
    steps: [
      { title: 'Hydration', body: 'Drink plenty of water to help flush out any toxins released during the massage.' },
      { title: 'Rest', body: 'Avoid strenuous activity for the next 12-24 hours. Let your muscles recover.' },
      { title: 'Warmth', body: 'A warm bath or shower can help further relax your muscles, but avoid extremely hot water.' }
    ],
    doDonts: {
      do: ['Drink herbal tea', 'Stretch gently', 'Get a good night\'s sleep'],
      dont: ['No alcohol for 24 hours', 'No heavy lifting', 'No high-impact exercise']
    },
    seoDescription: 'Post-massage care to maintain relaxation and recovery.'
  },
  'gel-polish': {
    id: 'gel-polish',
    title: 'Gel Polish Aftercare',
    intro: 'Your nails look perfect. Help them stay that way for longer with these maintenance tips.',
    steps: [
      { title: 'Initial care', body: 'Avoid very hot water for the first 2 hours after application.' },
      { title: 'Daily maintenance', body: 'Apply cuticle oil every evening to keep the nail bed hydrated.' },
      { title: 'Protection', body: 'Wear gloves when doing household chores or gardening to prevent chipping.' }
    ],
    doDonts: {
      do: ['Use cuticle oil', 'Wear gloves for cleaning'],
      dont: ['No picking or peeling', 'No using nails as tools']
    },
    seoDescription: 'How to maintain your gel polish for maximum longevity.'
  }
}

export function getGuideForService(serviceName) {
  const id = (serviceName || '').toLowerCase().replace(/\s+/g, '-')
  return educationGuides[id] || null
}

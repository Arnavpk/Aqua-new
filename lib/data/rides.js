/**
 * Rides mock data — will be replaced by Strapi.
 * Grouped by category to match the design's section-per-category layout.
 */

export const RIDE_CATEGORIES = [
  { key: 'all', emoji: '✨', name: 'All rides', count: '14 rides' },
  { key: 'thrill', emoji: '🎢', name: 'Thrill rides', count: '4 rides' },
  { key: 'family', emoji: '👨‍👩‍👧', name: 'Family rides', count: '4 rides' },
  { key: 'kids', emoji: '🧒', name: 'Kids zone', count: '2 rides' },
  { key: 'leisure', emoji: '🌊', name: 'Pools & leisure', count: '3 attractions' },
  { key: 'events', emoji: '🎉', name: 'Live events', count: '1 attraction' },
];

export const HEIGHT_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'u33', label: "Under 3'3\"" },
  { key: 'u120', label: 'Under 120 cm' },
  { key: '120', label: '120 cm+' },
  { key: '140', label: '140 cm+' },
  { key: 'group', label: 'Group ride' },
  { key: 'single', label: 'Single rider' },
];

export const FEATURED_RIDE = {
  slug: 'wild-raft',
  name: 'Wild Raft',
  desc: 'Buckle in with your crew — the Wild Raft launches four riders down a spiralling, high-walled flume of unpredictable turns, sudden drops and one massive splash at the end.',
  specs: [
    { k: 'Category', v: 'Thrill · Group raft' },
    { k: 'Duration', v: '~2 min' },
    { k: 'Min height', v: '120 cm' },
    { k: 'Thrill level', v: '★★★★★' },
    { k: 'Riders', v: '4 per raft' },
  ],
};

export const RIDE_SECTIONS = [
  {
    key: 'thrill',
    eyebrow: 'Thrill zone',
    eyebrowColor: 'var(--coral)',
    heading: 'Adrenaline,',
    headingEm: 'engineered.',
    cta: 'All thrill rides →',
    rides: [
      { slug: 'wild-raft', art: 'bg-gradient-to-br from-brand-900 to-brand-600', emoji: '🎢', tag: 'THRILL', thrill: '★★★★★', cat: 'Group raft', name: 'Wild Raft', desc: 'A 4-person spiralling flume with sudden drops and one massive final splash.', specs: ['2 min', '120 cm+', '4 riders'], specTypes: ['', 'warn', ''] },
      { slug: 'loopy-woopy', art: 'bg-gradient-to-br from-brand-700 to-brand-400', emoji: '💧', tag: 'THRILL', thrill: '★★★★★', cat: 'Vertical drop', name: 'Loopy Woopy', desc: 'Climb four storeys. The floor drops. 2.9 seconds later, you\'re at the pool.', specs: ['45s', '140 cm+', 'Single'], specTypes: ['', 'stop', ''] },
      { slug: 'aqua-twister', art: 'bg-gradient-to-br from-brand-600 to-brand-900', emoji: '🌀', tag: 'THRILL', thrill: '★★★★☆', cat: 'Bowl spinner', name: 'Aqua Twister', desc: 'A gravity-defying bowl spinner that ends in a plunge to the splash pool.', specs: ['75s', '120 cm+', '2 riders'], specTypes: ['', 'warn', ''] },
    ],
  },
  {
    key: 'family',
    eyebrow: 'Family fun',
    eyebrowColor: 'var(--sun)',
    heading: "Everyone's",
    headingEm: 'invited.',
    cta: 'All family rides →',
    rides: [
      { slug: 'boomeranggo', art: 'bg-gradient-to-br from-sun to-coral', emoji: '🛟', tag: 'FAMILY', thrill: '★★★☆☆', cat: '4-person raft', name: 'Boomeranggo', desc: 'Ride up a giant wall, swing back down — the biggest laugh at the park.', specs: ['2 min', 'All ages', '4 riders'], specTypes: ['', '', ''] },
      { slug: 'zip-zap-zoom', art: 'bg-gradient-to-br from-coral to-sun', emoji: '🏄', tag: 'FAMILY', thrill: '★★★☆☆', cat: 'Twin slide', name: 'Zip Zap Zoom', desc: 'Race a friend down twin parallel lanes to the finish pool.', specs: ['30s', '110 cm+', 'Single'], specTypes: ['', 'warn', ''] },
      { slug: 'rainbow-racer', art: 'bg-gradient-to-br from-lime to-sun', emoji: '🌈', tag: 'FAMILY', thrill: '★★☆☆☆', cat: 'Multi-lane', name: 'Rainbow Racer', desc: 'Six colourful lanes side-by-side — race the whole family at once.', specs: ['25s', 'All ages', '6 racers'], specTypes: ['', '', ''] },
    ],
  },
  {
    key: 'kids',
    eyebrow: 'Kids zone',
    eyebrowColor: 'var(--leaf)',
    heading: 'Safe splash,',
    headingEm: 'big smiles.',
    cta: 'Kids attractions →',
    rides: [
      { slug: 'sunny-side-up', art: 'bg-gradient-to-br from-leaf to-brand-300', emoji: '🐠', tag: 'KIDS', thrill: '★☆☆☆☆', cat: 'Splash pad', name: 'Sunny Side Up', desc: 'Fountains, mini slides, and a giant tipping bucket — designed for under 10s.', specs: ['Unlimited', 'Under 10', 'Parents welcome'], specTypes: ['', '', ''] },
      { slug: 'little-lagoon', art: 'bg-gradient-to-br from-lime to-leaf', emoji: '🐢', tag: 'KIDS', thrill: '★☆☆☆☆', cat: 'Toddler pool', name: 'Little Lagoon', desc: 'Ankle-deep pool with soft slides for toddlers — parent supervision required.', specs: ['Unlimited', 'Under 5', 'Lifeguards'], specTypes: ['', '', ''] },
      { slug: 'octo-splash', art: 'bg-gradient-to-br from-leaf to-brand-300', emoji: '🦑', tag: 'KIDS', thrill: '★★☆☆☆', cat: 'Kid coaster', name: 'Octo Splash', desc: 'A gentle mini water coaster themed as a friendly octopus — first thrill of the day.', specs: ['45s', '90 cm+', 'Single'], specTypes: ['', 'warn', ''] },
    ],
  },
  {
    key: 'leisure',
    eyebrow: 'Pools & leisure',
    eyebrowColor: 'var(--brand-400)',
    heading: 'Float. Breathe.',
    headingEm: 'Repeat.',
    cta: 'All pools →',
    rides: [
      { slug: 'wave-pool', art: 'bg-gradient-to-br from-brand-300 to-brand-200', emoji: '🌊', tag: 'POOL', thrill: '★★☆☆☆', cat: 'Signature pool', name: 'Wave Pool', desc: '2-metre artificial waves every 30 minutes — the sea, without the sea.', specs: ['45-min sets', 'All ages', 'Lifeguards'], specTypes: ['', '', ''] },
      { slug: 'lazy-river', art: 'bg-gradient-to-br from-brand-400 to-brand-300', emoji: '🛶', tag: 'LEISURE', thrill: '★☆☆☆☆', cat: 'Float loop', name: 'Lazy River', desc: 'A 300-metre gentle loop with waterfall tunnels — for when your legs give up.', specs: ['Unlimited', 'All ages', 'Free tubes'], specTypes: ['', '', ''] },
      { slug: 'carnival-beach', art: 'bg-gradient-to-br from-brand-200 to-brand-400', emoji: '🌴', tag: 'LEISURE', thrill: '★☆☆☆☆', cat: 'Beach pool', name: 'Carnival Beach', desc: 'A shallow beach-style pool with sun loungers and swim-up snack service.', specs: ['Unlimited', 'All ages', 'Loungers'], specTypes: ['', '', ''] },
    ],
  },
  {
    key: 'events',
    eyebrow: 'Live & scheduled',
    eyebrowColor: 'var(--coral)',
    heading: 'Experiences you',
    headingEm: 'plan around.',
    cta: null,
    rides: [
      { slug: 'rain-disco', art: 'bg-gradient-to-br from-coral to-brand-900', emoji: '🎧', tag: 'LIVE EVENT', thrill: 'HOURLY', cat: 'Rain + DJ', name: 'Rain Disco', desc: 'Dance under an artificial monsoon with a live DJ — set on the hour.', specs: ['Every hour', 'All ages', '25 min sets'], specTypes: ['', '', ''] },
      { slug: 'splash-parade', art: 'bg-gradient-to-br from-coral to-brand-900', emoji: '🎭', tag: 'LIVE EVENT', thrill: 'DAILY', cat: 'Aqua show', name: 'Splash Parade', desc: 'Choreographed water fountain show with costumed characters — 5pm daily.', specs: ['5pm daily', 'All ages', '20 min'], specTypes: ['', '', ''] },
      { slug: 'birthday-cabanas', art: 'bg-gradient-to-br from-coral to-brand-900', emoji: '🎂', tag: 'EXPERIENCE', thrill: 'BOOKABLE', cat: 'Private cabana', name: 'Birthday Cabanas', desc: 'Reserved poolside cabanas with décor, snacks and a birthday host.', specs: ['4 hours', 'Bookable', 'Up to 15 pax'], specTypes: ['', '', ''] },
    ],
  },
];

/** Flat list of all rides for lookup */
export function getAllRides() {
  return RIDE_SECTIONS.flatMap((s) => s.rides);
}

export function getRideBySlug(slug) {
  return getAllRides().find((r) => r.slug === slug) || null;
}

/** Ride detail page — full data for a single ride */
export const RIDE_DETAILS = {
  'wild-raft': {
    slug: 'wild-raft',
    name: 'Wild',
    nameEm: 'Raft.',
    lede: 'Four riders. One giant raft. A spiralling flume of unpredictable turns, sudden drops and one massive splash at the end. The Aqua Imagicaa signature — and the reason people come back.',
    tags: [
      { label: 'THRILL', cls: 'thrill' },
      { label: 'GROUP RAFT', cls: '' },
      { label: '⭐ SIGNATURE', cls: 'featured' },
    ],
    specs: [
      { k: 'Category', v: 'Thrill', icon: '🎢' },
      { k: 'Duration', v: '~2', unit: 'min' },
      { k: 'Min height', v: '120', unit: 'cm' },
      { k: 'Riders', v: '4', unit: 'per raft' },
      { k: 'Thrill level', v: '★★★★★' },
    ],
    story: {
      lead: "You climb the tower with three friends. You strap in. The gate lifts, and a wall of blue swallows the raft as it rockets down the first spiral — walls closing in, then wide open, then closed again.",
      body: "Two more drops. A brief moment of \"we're upside down\" (you're not, it just feels like it). And then the finale: a two-storey plunge into a splash-pool so wide the crowd waiting in line gets wet. That's the Wild Raft.",
    },
    experiences: [
      { icon: '🌀', title: 'Spiral tunnels', desc: 'Enclosed high-walled turns that build serious G-force.' },
      { icon: '⚡', title: 'Sudden drops', desc: 'Three separate drops — the last one is the biggest.' },
      { icon: '💦', title: 'Splash finale', desc: 'A finish that soaks riders and spectators alike.' },
    ],
    safety: [
      { text: 'Minimum height 120 cm (3\'11") — required for every rider', type: 'ok' },
      { text: 'Between 4 riders per raft — combined weight limit 320 kg', type: 'ok' },
      { text: 'Not recommended for pregnant guests or those with back / neck / heart conditions', type: 'warn' },
      { text: 'Loose items are not permitted — please use the locker at the entrance', type: 'stop' },
      { text: 'Standard swimwear required · life vests provided free of charge', type: 'ok' },
    ],
    zone: { letter: 'A', name: 'Splash Island · Zone A', distance: '3 min walk from Gate 1' },
    hours: [
      { days: 'Mon–Fri', time: '11:00 – 17:30' },
      { days: 'Sat–Sun', time: '11:00 – 18:00' },
      { days: 'Peak season', time: '10:00 – 19:00' },
    ],
    relatedSlugs: ['loopy-woopy', 'aqua-twister', 'boomeranggo'],
  },
};

export function getRideDetail(slug) {
  return RIDE_DETAILS[slug] || RIDE_DETAILS['wild-raft']; // fallback to wild-raft for demo
}

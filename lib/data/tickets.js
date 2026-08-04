/**
 * Tickets & Offers mock data — will be replaced by Strapi.
 */

export const FILTER_TABS = [
  { key: 'all', label: 'All', count: 10 },
  { key: 'tickets', label: 'Tickets', count: 4 },
  { key: 'offers', label: 'Offers', count: 6 },
  { key: 'combos', label: 'Combos', count: 2 },
  { key: 'passes', label: 'Passes', count: 1 },
];

export const TICKETS = [
  { slug: 'adult', icon: '🧍', iconBg: 'linear-gradient(135deg,var(--brand-400),var(--brand-600))', name: 'Adult ticket', desc: 'Above 12 years · full-park access, all rides.', price: '₹899', unit: 'Per person · weekday base' },
  { slug: 'family', icon: '👨‍👩‍👧', iconBg: 'rgba(255,255,255,.2)', name: 'Family pack (4)', desc: '2 adults + 2 kids · locker included · 20% off food.', price: '₹2,999', priceStrike: '₹3,596', unit: 'Save ₹597 · pack of 4', featured: true, badge: 'MOST POPULAR' },
  { slug: 'child', icon: '🧒', iconBg: 'linear-gradient(135deg,var(--leaf),var(--brand-300))', name: 'Child ticket', desc: "Ages 3-12 · below 3'3\" enters free.", price: '₹699', unit: 'Per child · weekday base' },
  { slug: 'express', icon: '⭐', iconBg: 'linear-gradient(135deg,var(--coral),var(--sun))', name: 'Express ticket', desc: 'Skip-the-queue · priority ride access.', price: '₹1,499', unit: 'Per person · fast lane' },
];

export const OFFERS = [
  {
    slug: 'friendship-day',
    art: 'bg-gradient-to-br from-coral to-sun', emoji: '👯',
    tag: 'FRIENDSHIP DAY', badge: '🔥 HOT', badgeCls: 'badge-hot',
    discount: '50%', discountSub: 'Flat off',
    name: 'Celebrate Friendship Day at Aqua Imagicaa',
    validity: '📅 31 Jul – 2 Aug',
    features: ['Flat 50% off on Regular & Express tickets', 'Bring your squad, save together', 'Online booking only · no code required'],
  },
  {
    slug: 'monsoon-special',
    art: 'bg-gradient-to-b from-brand-700 to-brand-400', emoji: '🌧️',
    tag: 'MONSOON SPECIAL', badge: 'NEW', badgeCls: 'badge-new',
    discount: '1+1', discountSub: 'Buy 1 Get 1',
    name: 'Monsoon Special — Buy 1 & Get 1 Free',
    validity: '📅 All monsoon season',
    features: ['Buy one ticket, get another free', "Kids below 3'3\" enter free", 'Online booking only · park price higher'],
  },
  {
    slug: 'wat-a-wednesday',
    art: 'bg-gradient-to-br from-leaf to-brand-300', emoji: '💧',
    tag: 'WAT-A-WEDNESDAY', badge: 'LIMITED', badgeCls: 'badge-limited',
    discount: '₹599', discountSub: 'Flat ticket',
    name: 'Wat-a-Wednesday · Regular Ticket at ₹599',
    validity: '📅 Every Wednesday',
    features: ['Regular ticket at just ₹599*', 'Limited tickets · online booking only', "Kids below 3'3\" enter free"],
  },
  {
    slug: 'magic-pass',
    art: 'bg-gradient-to-br from-brand-900 via-brand-600 to-sun', emoji: '✨',
    tag: 'MAGIC PASS', badge: 'BEST VALUE', badgeCls: 'badge-hot',
    discount: '70%', discountSub: 'Save up to',
    name: 'Magic Pass — Multi-Park access for ₹2,499',
    validity: '📅 Valid 1 year · 4 visits',
    features: ['4 visits across 8 parks — Khopoli, Surat, Indore & more', '20% off food, merch & photo souvenirs', 'Available online & at park counter'],
  },
  {
    slug: 'college-special',
    art: 'bg-gradient-to-br from-sun to-coral', emoji: '🎓',
    tag: 'STUDENT SPECIAL', badge: null, badgeCls: '',
    discount: '₹599', discountSub: 'Student ticket',
    name: 'College Special — Flat ₹599 tickets',
    validity: '📅 All days except Wednesday',
    features: ['Junior college (11th–12th) & UG students', 'Present valid college hall ticket at counter', 'No promo code required'],
  },
  {
    slug: 'birthday',
    art: 'bg-gradient-to-br from-coral to-lime', emoji: '🎂',
    tag: 'HAPPIER BIRTHDAYS', badge: 'FREE ENTRY', badgeCls: 'badge-new',
    discount: 'FREE', discountSub: 'Birthday entry',
    name: 'Your birthday, on us. Free entry.',
    validity: '📅 On your birthday date',
    features: ['Free entry on your birthday', 'Bring 4 paying friends · we bring the cake', 'Valid ID proof required'],
  },
];

export const HELP_ITEMS = [
  { icon: '📅', title: 'Park timings', desc: 'Open daily 11am–6pm. Weekend gates close at 7pm.' },
  { icon: '🚗', title: 'Directions', desc: 'Opp. Dumbal, Canal Road, Parvat Patiya · Free parking.' },
  { icon: '❓', title: 'Ride restrictions', desc: 'Height & safety guidelines for every ride at the park.' },
  { icon: '💬', title: 'Contact us', desc: '022-69660000 · contact@aquaimagicaa.com · 9am–9pm.' },
];

/** Offer Detail — full data for a single offer */
export const OFFER_DETAILS = {
  'friendship-day': {
    slug: 'friendship-day',
    name: 'Celebrate',
    nameEm: 'friendship day',
    nameSuffix: 'at Aqua Imagicaa.',
    lede: 'Bring your squad, save flat 50% on Regular & Express tickets, and make memories worth talking about all year.',
    badge: '✨ LIMITED-TIME OFFER',
    gradient: 'linear-gradient(135deg, #FF7A9C, #FFD84D)',
    emoji: '👯',
    meta: [
      { k: 'Discount', v: 'Flat 50%' },
      { k: 'Valid dates', v: '31 Jul – 2 Aug' },
      { k: 'Applies on', v: 'Regular & Express' },
      { k: 'Promo code', v: 'Not required' },
    ],
    medallion: { big: '50%', small: 'Flat off', validity: '31 Jul – 2 Aug' },
    story: {
      heading: 'Friendship, unlocked.',
      headingEm: 'Discounted.',
      lead: 'This Friendship Day, get your best friends together for a splash-filled celebration. From 31st July through 2nd August, save a flat <strong style="color:var(--coral)">50% off</strong> on Regular and Express tickets — the perfect way to turn a plan into a full-day story.',
      body: "Whether you're a group of two or twenty-two, this offer applies to every ticket booked online during the offer window. Bring your crew, ride together, splash together — and let the wave pool decide who's really got your back.",
    },
    highlights: [
      { icon: '💰', title: 'Flat 50% off', desc: 'Applies on both Regular & Express tickets — no minimum group size.' },
      { icon: '📱', title: 'Online only', desc: 'Book on aquaimagicaa.com — tickets at the park counter are full price.' },
      { icon: '👶', title: "Kids under 3'3\" free", desc: 'Children below 100cm don\'t need a ticket — offer or not.' },
    ],
    terms: [
      'Valid only on 31 July, 1 August and 2 August 2026',
      'Discount applicable on Regular & Express tickets only',
      'Offer applicable for online bookings only — tickets bought at park counters are priced higher',
      "Children below 3'3\" (100cm) get free entry regardless of this offer",
      'No two offers can be clubbed together',
      'Government taxes as applicable',
      'Valid ID may be requested at park entry',
      'Aqua Imagicaa reserves the right to modify or withdraw the offer without prior notice',
    ],
    sidebar: {
      title: 'Friendship Day Special',
      subtitle: 'Regular & Express tickets',
      save: 'SAVE 50%',
      price: '₹449',
      priceStrike: '₹899',
      unit: 'Per person · online booking',
      features: ['Full-park access, all rides', "Free entry for kids under 3'3\"", 'Free cancellation up to 48h', 'Instant e-ticket to your inbox'],
    },
    relatedSlugs: ['monsoon-special', 'magic-pass', 'college-special'],
  },
};

export function getOfferBySlug(slug) {
  return OFFERS.find((o) => o.slug === slug) || null;
}

export function getOfferDetail(slug) {
  return OFFER_DETAILS[slug] || OFFER_DETAILS['friendship-day'];
}

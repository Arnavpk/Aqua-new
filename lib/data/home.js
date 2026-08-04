/* ================================================================
   Homepage mock data — will be replaced by Strapi API responses.
   Each export is shaped exactly like the API will return.
   ================================================================ */

export const HOT_OFFERS = [
  {
    slug: 'friendship-day',
    badge: { label: '🔥 HOT DEAL', bg: 'var(--coral)', color: '#fff' },
    discount: '50%',
    title: 'Friendship Day Special',
    desc: 'Flat 50% off Regular & Express tickets — bring your whole squad.',
    validity: '📅 31 Jul – 2 Aug',
    gradient: 'linear-gradient(135deg, #00A5C8, #5FDDEA)',
  },
  {
    slug: 'monsoon-special',
    badge: { label: 'LIMITED TIME', bg: 'var(--sun)', color: 'var(--ink)' },
    discount: '1+1',
    title: 'Monsoon Special',
    desc: 'Buy one ticket, get one free — all monsoon season, online only.',
    validity: '📅 All season',
    gradient: 'linear-gradient(135deg, #FFD84D, #FF7A9C)',
  },
  {
    slug: 'early-bird',
    badge: { label: 'EARLY BIRD', bg: 'var(--leaf)', color: '#fff' },
    discount: '₹699',
    title: 'Early Bird Entry',
    desc: 'Book before 10am and save — lowest price guaranteed, weekdays only.',
    validity: '📅 Mon – Fri',
    gradient: 'linear-gradient(135deg, #3FE0A5, #5FDDEA)',
  },
];

// lib/data/home.js
// lib/data/home.js
export const FEATURED_RIDES = [
  {
    video: 'https://res.cloudinary.com/dmjaisk94/video/upload/v1785828536/4929172-hd_1080_1920_25fps_rjsrog.mp4',
    poster: '/images/rides/loopy-woopy-poster.jpg', // shown while video loads
    artClass: 'bg-gradient-to-br from-brand-900 to-brand-600', // fallback color if video fails
    badges: [{ label: 'THRILL', cls: 'chip-white' }, { label: 'NEW', cls: 'chip-coral' }],
    index: '01',
    category: 'Signature slide',
    name: 'Loopy Woopy',
    meta: '45s · 4-storey drop · 120cm+',
    slug: 'loopy-woopy',
  },
  {
    video: 'https://res.cloudinary.com/dmjaisk94/video/upload/v1785829169/14043330_2160_3840_60fps_wgd4tm.mp4',
    poster: '/images/rides/boomeranggo-poster.jpg',
    artClass: 'bg-gradient-to-br from-sun to-coral',
    badges: [{ label: 'FAMILY', cls: 'chip-white' }],
    index: '02',
    category: 'Group raft',
    name: 'Boomeranggo',
    meta: '2 min · 4-person raft · all ages',
    slug: 'boomeranggo',
  },
  {
    video: 'https://res.cloudinary.com/dmjaisk94/video/upload/v1785829263/13526332_2160_3840_30fps_kha4sq.mp4',
    poster: '/images/rides/sunny-side-up-poster.jpg',
    artClass: 'bg-gradient-to-br from-leaf to-brand-300',
    badges: [{ label: 'KIDS', cls: 'chip-white' }],
    index: '03',
    category: 'Splash pad',
    name: 'Sunny Side Up',
    meta: 'Unlimited · under 10s',
    slug: 'sunny-side-up',
  },
];

export const CATEGORIES = [
  { title: 'Thrill rides', meta: '6 rides · 120cm+', gradient: 'linear-gradient(135deg, #0A5566, #00A5C8)' },
  { title: 'Family rides', meta: '4 rides · all ages', gradient: 'linear-gradient(135deg, #FFD84D, #FF7A9C)' },
  { title: 'Kids zone', meta: 'Under 10s', gradient: 'linear-gradient(135deg, #3FE0A5, #5FDDEA)' },
  { title: 'Wave pool', meta: '2m waves · every 30 min', gradient: 'linear-gradient(135deg, #22C4DE, #A8ECF3)' },
  { title: 'Rain disco', meta: 'Every hour · DJ set', gradient: 'linear-gradient(135deg, #FF7A9C, #FFD84D)' },
  { title: 'Lazy river', meta: '300m loop · float free', gradient: 'linear-gradient(135deg, #5FDDEA, #00A5C8)' },
];

export const EVENTS = [
  { eyebrow: 'Upcoming · this Saturday', title: 'Monsoon\nrain disco.', desc: 'DJ set under actual rain — 8pm to midnight, 21+. Limited passes, book early.', cta: { label: 'Get passes →', href: '#' }, variant: 'dark' },
  { eyebrow: 'Weekday offer', title: 'Mon–Thu\nflat 30% off.', desc: 'Applies on adult, child and family packs. Valid all summer.', cta: { label: 'Claim offer →', href: '#' }, code: 'SPLASH30', variant: 'yellow' },
];

export const GALLERY_TILES = [
  { gradient: 'linear-gradient(135deg,#50C7E8,#1770B8)', span: 'big', tag: 'Wave Pool' },
  { gradient: 'linear-gradient(135deg,#FFDA47,#FF7A59)', span: 'wide' },
  { gradient: 'linear-gradient(135deg,#4CD180,#50C7E8)', span: 'big', tag: 'Splash Pad' },
  { gradient: 'linear-gradient(135deg,#B8E4F0,#3AA6E0)', span: 'wide' },
  { gradient: 'linear-gradient(135deg,#3AA6E0,#0B2545)', span: 'wide' },
  { gradient: 'linear-gradient(135deg,#FF7A59,#FFDA47)', span: 'wide' },
  { gradient: 'linear-gradient(135deg,#1770B8,#50C7E8)', span: 'wide' },
];

export const QUOTES = [
  { text: "We showed up at 11, and I honestly thought the kids would be tired by 3. They dragged us back on the wave pool until closing. Best summer weekend we've had in years.", name: 'Priya S.', city: 'Mumbai · visited May 2026', c1: '#FFDA47', c2: '#FF7A59' },
  { text: 'The rain disco was unreal — DJ, lights, actual rain. My friends and I stayed till the last song. Coming back for the monsoon night.', name: 'Arjun M.', city: 'Pune · visited June 2026', c1: '#50C7E8', c2: '#1770B8' },
  { text: "Cleanest water park I've been to in India. Lifeguards everywhere, staff was kind to my mother, and the food court had actual good biryani. Rare combination.", name: 'Fatima K.', city: 'Thane · visited April 2026', c1: '#4CD180', c2: '#50C7E8' },
  { text: 'Booked the Splash + Stay combo for our anniversary. Novotel was gorgeous, park access for two days was worth every rupee. Zero regrets.', name: 'Rohan & Neha', city: 'Bengaluru · visited March 2026', c1: '#FF7A59', c2: '#FFDA47' },
];

export const FAQS = [
  { cat: 'park', q: 'Where is Aqua Imagicaa located?', a: 'Opp. Dumbal, Canal Road, Parvat Patiya, Surat, Gujarat — free on-site parking available.' },
  { cat: 'rides', q: 'Which rides are suitable for children?', a: "Kids under 3'3\" have a dedicated zone; height and age restrictions for every ride are listed on each ride's detail page." },
  { cat: 'safety', q: 'Can I bring outside food and drinks into the park?', a: "Outside food isn't permitted, but the on-site food court offers veg, non-veg, and dessert options for every taste." },
  { cat: 'park', q: 'How long does it take to see the entire park?', a: 'Most guests spend a full day (5–7 hours) to enjoy all rides, pools and dining comfortably.' },
];

export const SAFETY_ITEMS = [
  { icon: '💧', title: 'Water Quality Check', desc: 'Monitored every 2 hours, pH maintained at 7.2–7.8.' },
  { icon: '🔬', title: 'Filtration Standards', desc: 'Advanced multi-stage filtration for crystal clear pools.' },
  { icon: '🕐', title: '24/7 Monitoring', desc: 'Verified by third-party global safety experts.' },
  { icon: '✅', title: 'Independent Audits', desc: 'Verified by third-party global safety experts.' },
];

export const SAFETY_MARQUEE = [
  'ISO TUV Ride Safety Audits',
  'Lifeguard & Staff Training',
  'ASTM & EN Ride Standards',
  'International Water Quality',
];

export const FOOTER_COLUMNS = [
  { heading: 'Park', links: [{ label: 'Rides', href: '/rides' }, { label: 'Attractions', href: '/rides' }, { label: 'Events', href: '/tickets' }, { label: 'Dining', href: '/restaurants' }] },
  { heading: 'Book', links: [{ label: 'Tickets', href: '/tickets' }, { label: 'Combos', href: '/tickets' }, { label: 'Season pass', href: '/tickets' }, { label: 'Groups', href: '/tickets' }] },
  { heading: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Careers', href: '/about' }, { label: 'Press', href: '/about' }, { label: 'Contact', href: '/about' }] },
  { heading: 'Legal', links: [{ label: 'Privacy', href: '/about' }, { label: 'Terms', href: '/about' }, { label: 'Refund policy', href: '/about' }] },
];

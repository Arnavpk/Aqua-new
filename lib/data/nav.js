/**
 * Nav config — flat links (no mega menus in v4 design).
 * `href` uses a placeholder; the Nav component prepends `/${location.slug}`.
 */
export const NAV_LINKS = [
  { href: '', label: 'Home' },
  { href: '/rides', label: 'Rides & Attractions' },
  { href: '/tickets', label: 'Tickets & Offers' },
  { href: '/restaurants', label: 'Restaurants' },
  { href: '/about', label: 'About' },
];

export const DRAWER_SECTIONS = [
  {
    heading: null,
    links: [
      { label: 'Home', href: '' },
      { label: 'Rides & Attractions', href: '/rides' },
      { label: 'Tickets & Offers', href: '/tickets' },
      { label: 'Restaurants', href: '/restaurants' },
      { label: 'About', href: '/about' },
    ],
  },
];

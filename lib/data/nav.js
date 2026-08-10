/**
 * Nav config — flat links (no mega menus in v4 design).
 * `href` uses a placeholder; the Nav component prepends `/${location.slug}`.
 */
export const NAV_LINKS = [
  { href: '', label: 'Home' },
  { href: '/rides', label: 'Rides & Attractions' },
  { href: '/tickets', label: 'Tickets & Offers' },
  { href: '/restaurants', label: 'Restaurants' },
  {
    label: 'About',
    href: '/about',
    dropdown: [
      {
        heading: 'Quick Info',
        links: [
          { label: "DO's & DON'Ts", href: '/about/dos-donts' },
          { label: 'Retail Shop', href: '/about/retail-shop' },
        ],
      },
      {
        heading: null,
        links: [
          { label: 'Blogs', href: '/about/blog' },
        ],
      },
    ],
  },
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
  {
    heading: 'About',
    links: [
      { label: "DO's & DON'Ts", href: '/about/dos-donts' },
      { label: 'Retail Shop', href: '/about/retail-shop' },
      { label: 'Blogs', href: '/about/blog' },
    ],
  },
];

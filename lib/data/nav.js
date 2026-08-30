/**
 * Nav config — flat links (no mega menus in v4 design).
 * `href` uses a placeholder; the Nav component prepends `/${location.slug}`.
 */
export const NAV_LINKS = [
  { href: '', label: 'Home' },
  { href: '/water-park/rides-and-attractions', label: 'Rides & Attractions' },
  { href: '/tickets-and-offers', label: 'Tickets & Offers' },
  { href: '/water-park/restaurant', label: 'Restaurants' },
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
      { label: 'Rides & Attractions', href: '/water-park/rides-and-attractions' },
      { label: 'Tickets & Offers', href: '/tickets-and-offers' },
      { label: 'Restaurants', href: '/water-park/restaurant' },
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

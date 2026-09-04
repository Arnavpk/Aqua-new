/**
 * Nav config — Water Park grouped under its own dropdown to match the
 * app/[location]/water-park/* folder structure. The Nav component prepends
 * `/${location.slug}` to every href.
 */
export const NAV_LINKS = [
  { href: '', label: 'Home' },
  {
    label: 'Water Park',
    href: '/water-park/rides-and-attractions',
    dropdown: [
      {
        heading: null,
        links: [
          { label: 'Rides & Attractions', href: '/water-park/rides-and-attractions' },
          { label: 'Restaurants', href: '/water-park/restaurant' },
          { label: 'Park Timings & Directions', href: '/water-park/park-timings-directions' },
        ],
      },
    ],
  },
  { href: '/tickets-and-offers', label: 'Tickets & Offers' },
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
      { label: 'Tickets & Offers', href: '/tickets-and-offers' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    heading: 'Water Park',
    links: [
      { label: 'Rides & Attractions', href: '/water-park/rides-and-attractions' },
      { label: 'Restaurants', href: '/water-park/restaurant' },
      { label: 'Park Timings & Directions', href: '/water-park/park-timings-directions' },
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
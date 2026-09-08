import Link from 'next/link';
import { NAV_LINKS } from '@/lib/data/nav';

function findHref(links, label) {
  for (const link of links) {
    if (link.label?.toLowerCase().includes(label)) return link.href || '';
    if (link.dropdown) {
      for (const sub of link.dropdown) {
        if (sub.label?.toLowerCase().includes(label)) return sub.href || '';
      }
    }
  }
  return '';
}

function buildFooterColumns(links) {
  const rides = findHref(links, 'rides') || '/water-park/rides-and-attractions';
  const tickets = findHref(links, 'ticket') || '/tickets-and-offers';
  const restaurants = findHref(links, 'restaurant') || '/water-park/restaurant';
  const about = findHref(links, 'about') || '/about';

  return [
    {
      heading: 'Park',
      links: [
        { label: 'Rides', href: rides },
        { label: 'Attractions', href: rides },
        { label: 'Events', href: tickets },
        { label: 'Dining', href: restaurants },
      ],
    },
    {
      heading: 'Book',
      links: [
        { label: 'Tickets', href: tickets },

        // { label: 'Combos', href: tickets },
        // { label: 'Season Pass', href: tickets },
        // { label: 'Groups', href: tickets },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', href: about },
        // { label: 'Careers', href: about },
        // { label: 'Press', href: about },
        { label: 'Contact', href: '/contact-us' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy', href: '/terms-and-conditions' },
        { label: 'Terms', href: '/terms-and-conditions' },
        { label: 'Visitor Guide', href: '/visitor-guide' },
        { label: 'Guest Services', href: '/guest-services' },
      ],
    },

  ];
}

export function Footer({ location, navItems }) {
  const base = `/${location.slug}`;
  const links = navItems?.length ? navItems : NAV_LINKS;
  const columns = buildFooterColumns(links);

  return (
    <footer className="footer-shell">
      <div className="container-x">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 max-[1024px]:grid-cols-3 max-[720px]:grid-cols-2 max-[720px]:gap-8">
          <div className="max-[1024px]:col-span-3 max-[720px]:col-span-2">
            <div className="nav-mark" aria-hidden="true" />
            <h3 className="text-[32px] font-extrabold tracking-tight mt-5 mb-3">Aqua Imagicaa</h3>
            <p className="text-white/70 max-w-[320px] leading-relaxed">
              {location.address.line}
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-accent text-[11px] tracking-[.24em] uppercase text-sun m-0 mb-5 font-semibold">
                {col.heading}
              </h4>
              <ul className="m-0 p-0 list-none">
                {col.links.map((link) => (
                  <li key={link.label} className="mb-3">
                    <Link href={base + link.href} className="text-white/75 text-sm hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* add social link here  */}
        <div className="flex gap-4 mt-8">
          <a href="https://www.facebook.com/AquaImagicaa" target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">
            <span className="sr-only">Facebook</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463
.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/aquaimagicaa/" target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">
            <span className="sr-only">Instagram</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
          </a>
          <a href="https://www.youtube.com/@aquaimagicaa" target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">
            <span className="sr-only">YouTube</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M23.498 6.186a2.972 2.972 0 0 0-2.096-2.096C19.669 3.75 12 3.75 12 3.75s-7.668 0-9.402.34a2.972 2.972 0 0 0-2.096 2.096A31.156 31.156 0 0 0 0 12a31.156 31.156 0 0 0 .502 5.814c.18.71.67 1.3 1.296 1.296C4.332 20.25 12 20.25 12 20.25s7.668 0 9.402-.34a2.972 2.972 0 0 0 2.096-2.096A31.156 31.156 0 0 0 24 12a31.156 31.156 0 0 0-.502-5.814ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
            </svg>
          </a>
          {/* twitter */}
          < a href="https://twitter.com/aquaimagicaa" target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">
            <span className="sr-only">Twitter</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.555-3.591-1.555-2.717 0-4.924 2.206-4.924 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.418-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067C2.179 19.29 4.768 20 7.548 20c9.142 0 14-7.721 14-14.417 0-.21 0-.423-.015-.634.962-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
            </svg>
          </a>





        </div>
      </div>

      <div className="container-x mt-16 max-[720px]:mt-12">
        <div className="flex justify-between items-center mb-6 max-[720px]:flex-col max-[720px]:gap-3 max-[720px]:text-center">
        </div>
        <div className="flex justify-between items-center mt-[72px] pt-8 border-t border-white/10 text-white/50 text-[13px] max-[720px]:flex-col max-[720px]:gap-3 max-[720px]:mt-12 max-[720px]:text-center">
          <div>© 2026 Aqua Imagicaa. All rights reserved.</div>
          {/* <div>{location.address.line}</div> */}
        </div>
      </div>
    </footer>
  );
}
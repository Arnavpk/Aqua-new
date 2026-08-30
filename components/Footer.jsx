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
        { label: 'Combos', href: tickets },
        { label: 'Season Pass', href: tickets },
        { label: 'Groups', href: tickets },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', href: about },
        { label: 'Careers', href: about },
        { label: 'Press', href: about },
        { label: 'Contact', href: '/contact-us' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy', href: '/terms-and-conditions' },
        { label: 'Terms', href: '/terms-and-conditions' },        
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
        <div className="flex justify-between items-center mt-[72px] pt-8 border-t border-white/10 text-white/50 text-[13px] max-[720px]:flex-col max-[720px]:gap-3 max-[720px]:mt-12 max-[720px]:text-center">
          <div>© 2026 Aqua Imagicaa. All rights reserved.</div>
          {/* <div>{location.address.line}</div> */}
        </div>
      </div>
    </footer>
  );
}
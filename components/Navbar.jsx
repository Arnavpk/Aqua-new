'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, DRAWER_SECTIONS } from '@/lib/data/nav';
import { LocationSwitcher } from './LocationSwitcher';

export function Navbar({ location, locations, navItems }) {
  const [solid, setSolid] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Use Strapi nav items or fallback to hardcoded
  const links = navItems?.length ? navItems : NAV_LINKS;

  useEffect(() => {
    let t = false;
    const onScroll = () => {
      if (t) return;
      t = true;
      requestAnimationFrame(() => {
        setSolid(window.scrollY > 60);
        t = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  const base = `/${location.slug}`;
  const currentLoc = locations?.find((l) => l.slug === location.slug);
  const logo = currentLoc?.logo;

  const isActive = (href) => {
    const full = base + href;
    if (full === base || full === base + '/') return pathname === base || pathname === base + '/';
    return pathname.startsWith(full);
  };

   
  return (
    <>
      <nav className="nav-shell group" data-solid={solid} aria-label="Primary">
        <div className="container-x">
          <div className="nav-inner max-[720px]:!py-2.5 max-[720px]:!pl-4 max-[720px]:!pr-3">
            <div className="flex items-center gap-4">
              <Link href={base} className="flex items-center gap-2.5 font-bold tracking-tight text-inherit hover:text-inherit" aria-label={`${location.displayName} — Home`}>
                {logo ? (
                  <img src={logo} alt={location.displayName} className="h-12 w-auto" />
                ) : (
                  <span className="nav-mark" aria-hidden="true" />
                )}
                <span className={`max-[720px]:text-sm ${solid ? 'text-ink' : 'text-white'}`}>{location.brand}</span>
              </Link>

              <LocationSwitcher
                locations={locations || []}
                currentSlug={location.slug}
                currentName={location.name}
                solid={solid}
              />
            </div>

            <div className={`nav-links-hide flex gap-1.5 text-sm font-medium ${solid ? 'text-ink' : 'text-white'}`}>
              {links.map((link) => (
                <div
                  key={link.label}
                  className={`nav-item ${link.dropdown ? 'nav-item-has-dropdown relative' : ''}`}
                >
                  {link.dropdown ? (
                    <>
                      <Link
                        href={base + link.href}
                        className={isActive(link.href) ? 'is-active' : ''}
                      >
                        {link.label}
                        <span className="caret-down" aria-hidden="true" />
                      </Link>
                      <div className="nav-dropdown">
                        {link.dropdown.map((group, gi) => (
                          <div key={gi}>
                            {group.heading && (
                              <div className="nav-dropdown-heading">{group.heading}</div>
                            )}
                            {group.links.map((dl) => (
                              <Link key={dl.label} href={base + dl.href}>
                                {dl.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={base + link.href}
                      className={isActive(link.href) ? 'is-active' : ''}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <a href={location.contact.phoneHref} className={`nav-phone ${solid ? 'text-ink' : 'text-white'}`}>📞 {location.contact.phone}</a>
              <Link href={`${base}/tickets`} className="btn btn-primary btn-sm max-[720px]:hidden">Book now →</Link>
              <button type="button" className="nav-burger" aria-label="Open menu" aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}>
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer */}
      <div className="drawer-backdrop" data-open={drawerOpen} onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      <aside className="drawer" data-open={drawerOpen} aria-label="Mobile menu" aria-hidden={!drawerOpen}>
        <div className="flex justify-between items-center mb-4">
          <Link href={base} className="flex items-center gap-2.5 font-bold text-ink hover:text-ink" onClick={() => setDrawerOpen(false)}>
            {logo ? (
              <img src={logo} alt={location.displayName} className="h-10 w-auto" />
            ) : (
              <span className="nav-mark" aria-hidden="true" />
            )}
            <span>{location.displayName}</span>
          </Link>
          <button type="button" className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">✕</button>
        </div>

        <div className="mb-4 pb-4 border-b border-line">
          <LocationSwitcher
            locations={locations || []}
            currentSlug={location.slug}
            currentName={location.name}
          />
        </div>

        {/* Dynamic drawer links */}
        <div className="drawer-section">
          {links.map((link) => (
            <div key={link.label}>
              <Link
                href={base + link.href}
                className="block py-2 text-base font-medium"
                onClick={() => setDrawerOpen(false)}
              >
                {link.label}
              </Link>
              {link.dropdown && link.dropdown.map((group, gi) => (
                <div key={gi} className="pl-4">
                  {group.links.map((dl) => (
                    <Link
                      key={dl.label}
                      href={base + dl.href}
                      className="block py-1.5 text-sm text-ink-2"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {dl.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-5">
          <Link href={`${base}/tickets`} className="btn btn-primary w-full text-center" onClick={() => setDrawerOpen(false)}>Book now →</Link>
          <a href={location.contact.phoneHref} className="block text-center mt-3 text-ink-2 text-sm">
            📞 {location.contact.phone} · {location.contact.phoneHours}
          </a>
        </div>
      </aside>
    </>
  );
}
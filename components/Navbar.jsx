'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/data/nav';
import { LocationSwitcher } from './LocationSwitcher';
import Image from 'next/image';

export function Navbar({ location, locations, navItems }) {
  const [solid, setSolid] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const pathname = usePathname();

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
    if (href === '' || href === '/') {
      return pathname === base || pathname === base + '/';
    }
    if (!href) return false;
    const full = base + href;
    return pathname.startsWith(full);
  };

  // Render nav link or non-clickable parent
  const NavLabel = ({ link, className }) => {
    if (link.isParentOnly) {
      return (
        <span className={className} style={{ cursor: 'default' }}>
          {link.label}
          {link.dropdown && <span className="caret-down" aria-hidden="true" />}
        </span>
      );
    }
    return (
      <Link href={base + link.href} className={className}>
        {link.label}
        {link.dropdown && <span className="caret-down" aria-hidden="true" />}
      </Link>
    );
  };

  return (
    <>
      <nav className="nav-shell group" data-solid={solid} aria-label="Primary">
        <div className="container-x">
          <div className="nav-inner max-[720px]:!py-2.5 max-[720px]:!pl-4 max-[720px]:!pr-3">
            <div className="flex items-center gap-4">
              <Link href={base} className="flex items-center gap-2.5 font-bold tracking-tight text-inherit hover:text-inherit" aria-label={`${location.displayName} — Home`}>
                {logo ? (
                  <Image height={200} width={400} src={logo} alt={location.displayName} className="h-12 w-auto" />
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

            {/* Desktop nav */}
            <div className={`nav-links-hide flex gap-1.5 text-sm font-medium ${solid ? 'text-ink' : 'text-white'}`}>
              {links.map((link) => (
                <div
                  key={link.label}
                  className={`nav-item ${link.dropdown ? 'nav-item-has-dropdown relative' : ''}`}
                >
                  {link.dropdown ? (
                    <>
                      <NavLabel link={link} className={isActive(link.href) ? 'is-active' : ''} />
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
                    <NavLabel link={link} className={isActive(link.href) ? 'is-active' : ''} />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <a href={location.contact.phoneHref} className={`nav-phone ${solid ? 'text-ink' : 'text-white'}`}>📞 {location.contact.phone}</a>
              <Link href={`${base}/tickets-and-offers`} className="btn btn-primary btn-sm max-[720px]:hidden">Book now →</Link>
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
              <Image height={200} width={400} src={logo} alt={location.displayName} className="h-10 w-auto" />
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

        {/* Mobile drawer links */}
        <div className="drawer-section">
          {links.map((link) => (
            <div key={link.label}>
              {link.isParentOnly && link.dropdown ? (
                // Parent-only: accordion toggle, no navigation
                <button
                  type="button"
                  className="w-full text-left py-2 text-base font-medium flex justify-between items-center"
                  onClick={() => setOpenMobileDropdown(openMobileDropdown === link.label ? null : link.label)}
                >
                  {link.label}
                  <span className={`text-ink-2 text-xs transition-transform ${openMobileDropdown === link.label ? 'rotate-180' : ''}`}>▼</span>
                </button>
              ) : link.dropdown ? (
                // Has page + dropdown: clickable link + toggle
                <div className="flex items-center justify-between">
                  <Link
                    href={base + link.href}
                    className="py-2 text-base font-medium flex-1"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    className="p-2 text-ink-2 text-xs"
                    onClick={() => setOpenMobileDropdown(openMobileDropdown === link.label ? null : link.label)}
                  >
                    <span className={`inline-block transition-transform ${openMobileDropdown === link.label ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                </div>
              ) : (
                // Simple link
                <Link
                  href={base + link.href}
                  className="block py-2 text-base font-medium"
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.label}
                </Link>
              )}

              {/* Dropdown children */}
              {link.dropdown && (openMobileDropdown === link.label) && (
                <div className="pl-4 pb-2">
                  {link.dropdown.map((group, gi) => (
                    <div key={gi}>
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
              )}
            </div>
          ))}
        </div>

        <div className="mt-5">
          <Link href={`${base}/tickets-and-offers`} className="btn btn-primary w-full text-center" onClick={() => setDrawerOpen(false)}>Book now →</Link>
          <a href={location.contact.phoneHref} className="block text-center mt-3 text-ink-2 text-sm">
            📞 {location.contact.phone} · {location.contact.phoneHours}
          </a>
        </div>
      </aside>
    </>
  );
}
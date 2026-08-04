'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, DRAWER_SECTIONS } from '@/lib/data/nav';

export function Navbar({ location }) {
  const [solid, setSolid] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

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

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  const base = `/${location.slug}`;
  const isActive = (href) => {
    const full = base + href;
    if (full === base || full === base + '/') return pathname === base || pathname === base + '/';
    return pathname.startsWith(full);
  };

  return (
    <>
      {/* Top bar */}
      <div className="topbar" data-hidden={solid}>
        <div className="container-x flex items-center justify-between" style={{ padding: '8px 0' }}>
          <div className="flex items-center gap-5">
            <span>📍 {location.name}, {location.state}</span>
            <span className="topbar-sep" />
            <Link href="/" style={{ color: 'inherit' }}>Change location</Link>
          </div>
          <div className="flex items-center gap-5">
            <a href={location.contact.phoneHref} style={{ color: 'inherit' }}>
              📞 {location.contact.phone} · {location.contact.phoneHours}
            </a>
            <span className="topbar-sep" />
            <a href={`mailto:${location.contact.email}`} style={{ color: 'inherit' }}>{location.contact.email}</a>
            <span className="topbar-sep" />
            <a href={location.contact.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Instagram</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="nav-shell group" data-solid={solid} aria-label="Primary">
        <div className="container-x">
          <div className="nav-inner max-[720px]:!py-2.5 max-[720px]:!pl-4 max-[720px]:!pr-3">
            <Link href={base} className="flex items-center gap-2.5 font-bold tracking-tight text-inherit hover:text-inherit" aria-label={`${location.displayName} — Home`}>
              <span className="nav-mark" aria-hidden="true" />
              <span className="max-[720px]:text-sm">{location.brand}</span>
            </Link>

            <div className="nav-links-hide flex gap-1.5 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="nav-item">
                  <Link href={base + link.href} className={isActive(link.href) ? 'is-active' : ''}>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <a href={location.contact.phoneHref} className="nav-phone">📞 {location.contact.phone}</a>
              <Link href={`${base}/tickets`} className="btn btn-primary btn-sm max-[720px]:hidden">Book now →</Link>
              <button type="button" className="nav-burger" aria-label="Open menu" aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}>
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer backdrop + drawer */}
      <div className="drawer-backdrop" data-open={drawerOpen} onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      <aside className="drawer" data-open={drawerOpen} aria-label="Mobile menu" aria-hidden={!drawerOpen}>
        <div className="flex justify-between items-center mb-6">
          <Link href={base} className="flex items-center gap-2.5 font-bold text-ink hover:text-ink" onClick={() => setDrawerOpen(false)}>
            <span className="nav-mark" aria-hidden="true" />
            <span>{location.displayName}</span>
          </Link>
          <button type="button" className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">✕</button>
        </div>

        {DRAWER_SECTIONS.map((section, i) => (
          <div key={i} className="drawer-section" style={section.heading === null ? { borderTop: 'none', paddingTop: 0 } : undefined}>
            {section.heading && <h6>{section.heading}</h6>}
            {section.links.map((link) => (
              <Link key={link.label} href={base + link.href} onClick={() => setDrawerOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}

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

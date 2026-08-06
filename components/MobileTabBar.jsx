'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { key: 'home', label: 'Home', icon: '🏠', href: '' },
  { key: 'rides', label: 'Rides', icon: '🌊', href: '/rides' },
  { key: 'book', label: 'Book', icon: '🎟️', href: '/tickets', center: true },
  { key: 'dining', label: 'Dining', icon: '🍽️', href: '/restaurants' },
  { key: 'more', label: 'More', icon: '☰', href: '/about' },
];

export function MobileTabBar({ locationSlug }) {
  const pathname = usePathname();
  const base = `/${locationSlug}`;

  const isActive = (href) => {
    const full = base + href;
    if (href === '') return pathname === base || pathname === base + '/';
    return pathname.startsWith(full);
  };

  return (
    <nav className="mobile-tab-bar" aria-label="Mobile navigation">
      {TABS.map((tab) => {
        const active = isActive(tab.href);
        const full = base + tab.href;

        if (tab.center) {
          return (
            <Link key={tab.key} href={full} className="tab-center-wrap">
              <span className="tab-center-btn">
                {tab.icon}
              </span>
              <span className={`tab-label ${active ? 'tab-active' : ''}`}>
                {tab.label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={tab.key}
            href={full}
            className={`tab-item ${active ? 'tab-active' : ''}`}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
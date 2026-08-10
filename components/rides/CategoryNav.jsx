'use client';

import { useRef, useEffect } from 'react';
import { RIDE_CATEGORIES } from '@/lib/data/rides';
import { Reveal } from '@/components/Reveal';

export function CategoryNav({ categories, active, onSelect }) {
  const cats = categories?.length ? categories : RIDE_CATEGORIES;
  const mobileRef = useRef(null);

  // Auto-scroll active chip into view on mobile
  useEffect(() => {
    const container = mobileRef.current;
    if (!container) return;
    const activeEl = container.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  }, [active]);

  return (
    <section style={{ padding: '56px 0 20px' }}>
      <div className="container-x">
        {/* Desktop: 6-col grid */}
        <Reveal className="cat-nav-desktop">
          {cats.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`cat-btn ${active === c.key ? 'is-active' : ''}`}
              onClick={() => onSelect(c.key)}
            >
              <span className="cat-emoji">{c.emoji}</span>
              <span className="cat-name">{c.name}</span>
              <span className="cat-count">{c.count}</span>
            </button>
          ))}
        </Reveal>

        {/* Mobile: horizontal scroll */}
        <Reveal className="cat-nav-mobile" ref={mobileRef}>
          {cats.map((c) => (
            <button
              key={c.key}
              type="button"
              data-active={active === c.key}
              className={`cat-chip ${active === c.key ? 'is-active' : ''}`}
              onClick={() => onSelect(c.key)}
            >
              <span className="cat-chip-emoji">{c.emoji}</span>
              <span className="cat-chip-text">
                <span className="cat-chip-name">{c.name}</span>
                <span className="cat-chip-count">{c.count}</span>
              </span>
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
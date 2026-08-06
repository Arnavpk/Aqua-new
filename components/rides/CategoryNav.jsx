'use client';

import { useState } from 'react';
import { RIDE_CATEGORIES } from '@/lib/data/rides';
import { Reveal } from '@/components/Reveal';

export function CategoryNav() {
  const [active, setActive] = useState('all');

  return (
    <section style={{ padding: '56px 0 20px' }}>
      <div className="container-x">
        {/* Desktop: 6-col grid */}
        <Reveal className="cat-nav-desktop">
          {RIDE_CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`cat-btn ${active === c.key ? 'is-active' : ''}`}
              onClick={() => setActive(c.key)}
            >
              <span className="cat-emoji">{c.emoji}</span>
              <span className="cat-name">{c.name}</span>
              <span className="cat-count">{c.count}</span>
            </button>
          ))}
        </Reveal>

        {/* Mobile: horizontal scroll */}
        <Reveal className="cat-nav-mobile">
          {RIDE_CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`cat-chip ${active === c.key ? 'is-active' : ''}`}
              onClick={() => setActive(c.key)}
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
'use client';

import { useState } from 'react';
import { RIDE_CATEGORIES } from '@/lib/data/rides';
import { Reveal } from '@/components/Reveal';

export function CategoryNav() {
  const [active, setActive] = useState('all');

  return (
    <section style={{ padding: '56px 0 20px' }}>
      <div className="container-x">
        <Reveal className="grid grid-cols-6 gap-3 max-[1180px]:grid-cols-3 max-[720px]:grid-cols-2">
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
      </div>
    </section>
  );
}

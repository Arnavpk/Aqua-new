'use client';

import { useState } from 'react';
import { HEIGHT_FILTERS } from '@/lib/data/rides';
import { Reveal } from '@/components/Reveal';

export function FilterBar() {
  const [active, setActive] = useState('all');

  return (
    <section className="container-x">
      <Reveal className="flex justify-between items-center gap-6 flex-wrap py-6 pb-10 max-[720px]:flex-col max-[720px]:items-start">
        <div className="flex gap-2 flex-wrap max-[720px]:overflow-x-auto max-[720px]:flex-nowrap max-[720px]:w-full max-[720px]:pb-1">
          {HEIGHT_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`pill ${active === f.key ? 'is-active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <select className="sort-select" aria-label="Sort rides">
          <option>Sort · Thrill level ↓</option>
          <option>Sort · Alphabetical</option>
          <option>Sort · Least crowded</option>
          <option>Sort · Nearest to gate</option>
        </select>
      </Reveal>
    </section>
  );
}

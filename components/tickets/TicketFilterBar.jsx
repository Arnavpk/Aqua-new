'use client';

import { useState } from 'react';
import { FILTER_TABS } from '@/lib/data/tickets';
import { Reveal } from '@/components/Reveal';

export function TicketFilterBar() {
  const [active, setActive] = useState('all');

  return (
    <section style={{ padding: '56px 0 40px' }} id="filters">
      <div className="container-x">
        <Reveal>
          <div className="filter-card">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`filter-chip ${active === tab.key ? 'is-active' : ''}`}
                onClick={() => setActive(tab.key)}
              >
                {tab.label}
                <span className="filter-count">{tab.count}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

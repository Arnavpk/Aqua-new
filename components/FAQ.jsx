'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';
import { FAQS } from '@/lib/data/home';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'park', label: 'Park' },
  { key: 'safety', label: 'Rules & Safety' },
  { key: 'rides', label: 'Rides' },
];

export function FAQ({ data, showTabs = true }) {
  const eyebrow = data?.eyebrow || "Still curious?";
  const heading = data?.heading || "Frequently asked questions.";
  const faqs = data?.faqs?.length ? data.faqs : FAQS;

  const [cat, setCat] = useState('all');
  const [openIdx, setOpenIdx] = useState(1);

  const filtered = !showTabs || cat === 'all' ? faqs : faqs.filter((f) => f.cat === cat);

  return (
    <section className="section-shell section-tight">
      <div className="container-x">
        <Reveal>
          <div className="faq-wrap">
            <div className="grid grid-cols-[1fr_1.3fr] gap-12 max-[720px]:grid-cols-1 max-[720px]:gap-6">
              <div>
                <span className="eyebrow" style={{ color: 'var(--brand-900)' }}>{eyebrow}</span>
                <h2 className="h1 mt-3.5" style={{ whiteSpace: 'pre-line' }}>{heading}</h2>
                <span className="underline-deco" style={{ background: 'var(--brand-600)' }} />
              </div>

              <div>
                {showTabs && (
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {TABS.map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        className={`faq-tab ${cat === tab.key ? 'is-active' : ''}`}
                        onClick={() => { setCat(tab.key); setOpenIdx(-1); }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}

                {filtered.map((faq, i) => {
                  const isOpen = openIdx === i;
                  return (
                    <div key={faq.q} className="faq-item">
                      <button
                        type="button"
                        className={`faq-q ${isOpen ? 'is-open' : ''}`}
                        onClick={() => setOpenIdx(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                      >
                        {faq.q}
                        <span className="arrow">⌄</span>
                      </button>
                      <div className="faq-a" style={{ maxHeight: isOpen ? '160px' : '0px' }}>
                        <div className="faq-a-inner">{faq.a}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
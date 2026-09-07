'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

export function VisitorGuideContent({ data, base }) {
  const { sections } = data;
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (sectionId, itemIdx) => {
    const key = `${sectionId}-${itemIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isOpen = (sectionId, itemIdx) => !!openItems[`${sectionId}-${itemIdx}`];

  return (
    <>
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="section-shell">
          <div className="container-x">
            <Reveal className="section-head">
              <div>
                <span className="eyebrow mb-2 block">{section.icon} {section.title}</span>
                <h2 className="h2">{section.title}</h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="content-block">
                {section.items.map((item, i) => {
                  const open = isOpen(section.id, i);
                  return (
                    <details
                      key={i}
                      className="faq-item"
                      open={open}
                      onToggle={(e) => {
                        if (e.target.open !== open) toggleItem(section.id, i);
                      }}
                    >
                      <summary className="faq-q">{item.title}</summary>
                      <div className="faq-a">
                        <p>{item.body}</p>
                      </div>
                    </details>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal>
            <div className="cta-block text-center">
              <h3 className="text-[36px] font-extrabold tracking-tight leading-none mb-4 relative">
                Ready to make a splash?
              </h3>
              <p className="relative text-white/90 mb-7 text-base">
                Now that you know everything, book your tickets and have the best day out.
              </p>
              <div className="flex gap-3 justify-center relative flex-wrap">
                <Link href={`${base}/tickets-and-offers`} className="btn btn-primary">Book tickets →</Link>
                <Link href={`${base}/water-park/rides-and-attractions`} className="btn btn-glass">Explore rides</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
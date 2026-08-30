'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

export function ContactBody({ data, base }) {
  const { queryRows, locationContacts, emergencyContacts, closingNote } = data;
  const locationNames = queryRows[0]?.locations?.map((l) => l.name) || [];
  const [activeTab, setActiveTab] = useState(locationNames[0] || '');

  return (
    <>
      {/* ===== QUERY TABLE ===== */}
      {queryRows.length > 0 && (
        <section className="section-shell" style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}>
          <div className="container-x">
            <Reveal>
              <div className="content-block">
                <span className="eyebrow mb-3 block">Who to contact</span>
                <h2>Find the right team for your query.</h2>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto mt-6">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-brand-600/20">
                        <th className="py-3 pr-6 font-accent text-[11px] uppercase text-ink-2" style={{ letterSpacing: '.16em' }}>
                          Query Type
                        </th>
                        {locationNames.map((name) => (
                          <th key={name} className="py-3 pr-6 font-accent text-[11px] uppercase text-ink-2" style={{ letterSpacing: '.16em' }}>
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryRows.map((row, i) => (
                        <tr key={i} className="border-b border-line/60 hover:bg-brand-50/30 transition-colors">
                          <td className="py-4 pr-6 text-sm font-semibold text-ink">{row.type}</td>
                          {row.locations.map((loc) => (
                            <td key={loc.name} className="py-4 pr-6">
                              <a
                                href={`mailto:${loc.email}`}
                                className="text-sm text-brand-600 hover:text-brand-700 hover:underline break-all transition-colors"
                              >
                                {loc.email}
                              </a>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile tabbed view */}
                <div className="md:hidden mt-6">
                  <div className="flex gap-2 mb-5">
                    {locationNames.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setActiveTab(name)}
                        className={activeTab === name ? 'btn btn-primary' : 'btn btn-outline'}
                        style={{ padding: '8px 20px', fontSize: 13 }}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col gap-0">
                    {queryRows.map((row, i) => {
                      const loc = row.locations.find((l) => l.name === activeTab) || row.locations[0];
                      return (
                        <div key={i} className="py-4 border-b border-line/60 last:border-0">
                          <div className="text-[13px] font-semibold text-ink mb-1">{row.type}</div>
                          <a
                            href={`mailto:${loc?.email}`}
                            className="text-sm text-brand-600 hover:underline break-all"
                          >
                            {loc?.email}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== LOCATION CONTACT CARDS ===== */}
      {locationContacts.length > 0 && (
        <section className="section-shell">
          <div className="container-x">
            <Reveal className="section-head">
              <div>
                <span className="eyebrow mb-2 block">Reach us directly</span>
                <h2 className="h2">Call or visit a park near you.</h2>
              </div>
            </Reveal>
            <Reveal className="grid grid-cols-2 gap-6 max-[720px]:grid-cols-1">
              {locationContacts.map((lc) => (
                <div key={lc.name} className="contact-card">
                  <h4 className="font-accent text-[11px] uppercase font-semibold text-brand-600 mb-4" style={{ letterSpacing: '.24em' }}>
                    Aqua Imagicaa — {lc.name}
                  </h4>
                  <div className="c-row">
                    <span className="icon">📞</span>
                    <div>
                      <a href={`tel:${lc.phoneTel}`} className="text-lg font-bold text-ink hover:text-brand-600 transition-colors">
                        {lc.phone}
                      </a>
                      <div className="text-[13px] text-ink-2 mt-0.5">Available {lc.hours}</div>
                    </div>
                  </div>
                  {lc.email && (
                    <div className="c-row">
                      <span className="icon">✉️</span>
                      <div>
                        <a href={`mailto:${lc.email}`} className="text-sm text-brand-600 hover:underline break-all">
                          {lc.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {lc.address && (
                    <div className="c-row">
                      <span className="icon">📍</span>
                      <div className="text-sm text-ink-2 leading-relaxed">{lc.address}</div>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-dashed border-line">
                    <a href={`tel:${lc.phoneTel}`} className="btn btn-primary btn-sm flex-1 text-center">
                      📞 Call {lc.name}
                    </a>
                    <a href={`mailto:${lc.email}`} className="btn btn-outline btn-sm flex-1 text-center">
                      ✉️ Email
                    </a>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== EMERGENCY NUMBERS ===== */}
      {emergencyContacts.length > 0 && (
        <section className="section-shell" style={{ background: 'white', padding: '44px 0' }}>
          <div className="container-x">
            <Reveal className="section-head">
              <div>
                <span className="eyebrow mb-2 block">Safety first</span>
                <h2 className="h2">Emergency numbers.</h2>
              </div>
            </Reveal>
            <Reveal className="grid grid-cols-2 gap-6 max-[720px]:grid-cols-1">
              {emergencyContacts.map((ec) => (
                <div key={ec.name} className="location-card">
                  <h4 className="font-accent text-[11px] uppercase font-semibold text-brand-600 mb-4" style={{ letterSpacing: '.24em' }}>
                    {ec.name} Emergency Numbers
                  </h4>
                  <ul className="list-none m-0 p-0 flex flex-col gap-0">
                    {ec.items.map((it, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center text-sm py-3 border-b border-dashed border-line last:border-0"
                      >
                        <span className="text-ink-2">{it.label}</span>
                        <a
                          href={`tel:${it.number.replace(/[^\d]/g, '')}`}
                          className="text-brand-600 font-semibold hover:underline whitespace-nowrap ml-4"
                        >
                          {it.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== CLOSING CTA ===== */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal>
            <div className="cta-block text-center">
              {closingNote && (
                <p className="relative text-white/95 text-lg mb-6 max-w-[600px] mx-auto">{closingNote}</p>
              )}
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

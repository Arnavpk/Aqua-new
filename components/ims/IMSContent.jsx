'use client';

import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import Image from 'next/image';

const TABS = [
  { id: 'benefits', label: 'Benefits of IMS' },
  { id: 'policy', label: 'IMS Policy' },
  { id: 'iso9001', label: 'ISO 9001 – 2015' },
  { id: 'iso14001', label: 'ISO 14001 – 2015' },
  { id: 'iso45001', label: 'ISO 45001 – 2018' },
];

export function IMSContent({ data }) {
  const [activeTab, setActiveTab] = useState('benefits');
  const { intro, certifications, benefits, standards, documents } = data;

  return (
    <>
      {/* ===== INTRO ===== */}
      <section className="section-shell" style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}>
        <div className="container-x">
          <Reveal>
            <div className="content-block">
              <h2>{intro.heading}</h2>
              <p className="lead">{intro.description}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CERTIFICATION CARDS ===== */}
      <section className="section-shell" style={{ background: 'white', padding: '44px 0' }}>
        <div className="container-x">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow mb-2 block">Our certifications</span>
              <h2 className="h2">Three pillars of excellence.</h2>
            </div>
          </Reveal>
          <Reveal className="grid grid-cols-3 gap-6 max-[1024px]:grid-cols-1">
            {certifications.map((cert) => (
              <div key={cert.title} className="ims-cert-card">
                <div className="ims-cert-image">
                  {cert.image ? (
                    <Image fill className="object-contain" src={cert.image} alt={cert.title} sizes="(max-width: 1024px) 100vw, 33vw" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center text-4xl">📜</div>
                  )}
                </div>
                <div className="ims-cert-body">
                  <h3 className="text-base font-bold text-ink mb-1">{cert.standard}</h3>
                  <p className="text-[13px] text-ink-2 mb-3">{cert.title}</p>
                  <div className="text-[12px] text-brand-600 font-semibold">
                    License valid: <span className="text-ink">{cert.validity}</span>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== TABBED SECTIONS ===== */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal>
            <div className="ims-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`ims-tab ${activeTab === tab.id ? 'ims-tab-active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Benefits */}
          {activeTab === 'benefits' && (
            <Reveal>
              <div className="content-block">
                <h2>Benefits of IMS</h2>
                <div className="grid grid-cols-2 gap-4 mt-6 max-[720px]:grid-cols-1">
                  {benefits.map((b, i) => (
                    <div key={i} className="ims-benefit-card">
                      <span className="ims-benefit-num">{String(i + 1).padStart(2, '0')}</span>
                      <p className="text-sm text-ink m-0">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* IMS Policy */}
          {activeTab === 'policy' && (
            <Reveal>
              <div className="content-block">
                <h2>IMS Policy</h2>
                <p className="text-sm text-ink-2 leading-relaxed mb-4">
                  Our Integrated Management System Policy outlines our commitment to quality, environmental protection, and occupational health & safety.
                </p>
                {documents.policy.map((doc, i) => (
                  <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" className="ims-doc-link">
                    <span className="ims-doc-icon">📄</span>
                    <span>{doc.label}</span>
                    <span className="ims-doc-arrow">↗</span>
                  </a>
                ))}
              </div>
            </Reveal>
          )}

          {/* ISO Standards tabs */}
          {['iso9001', 'iso14001', 'iso45001'].includes(activeTab) && (
            <Reveal>
              <div className="content-block">
                {standards
                  .filter((s) => s.id === activeTab)
                  .map((s) => (
                    <div key={s.id}>
                      <h2>{s.standard}</h2>
                      <h3 className="text-lg font-semibold text-brand-600 mb-2">{s.certName}</h3>
                      <p className="text-sm text-ink-2 leading-relaxed mb-2"><strong>Required for:</strong> {s.requiredFor}</p>
                      <p className="text-sm text-ink-2 leading-relaxed mb-6">{s.description}</p>
                      <div className="flex flex-col gap-2">
                        {(documents[s.id] || []).map((doc, i) => (
                          <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" className="ims-doc-link">
                            <span className="ims-doc-icon">📄</span>
                            <span>{doc.label}</span>
                            <span className="ims-doc-arrow">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </Reveal>
          )}

          {/* Full Standards Table */}
          <Reveal>
            <div className="content-block mt-8">
              <span className="eyebrow mb-3 block">At a glance</span>
              <h2>ISO Standards Overview</h2>
              <div className="overflow-x-auto mt-6">
                <table className="ride-table">
                  <thead>
                    <tr>
                      <th>ISO Standard</th>
                      <th>Certification Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standards.map((s) => (
                      <tr key={s.id}>
                        <td className="font-semibold text-ink whitespace-nowrap">{s.standard}</td>
                        <td className="font-semibold text-ink">{s.certName}</td>
                        <td>
                          <p className="text-sm text-ink-2 m-0 mb-1"><strong>Required for:</strong> {s.requiredFor}</p>
                          <p className="text-sm text-ink-2 m-0">{s.description}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
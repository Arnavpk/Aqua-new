import Link from 'next/link';
import { Reveal } from './Reveal';

const TILES = [
  {
    icon: '🗺️',
    title: 'Park Essentials',
    desc: 'Map, timings, and entry guidelines',
    gradient: 'linear-gradient(135deg, #22C4DE, #5FDDEA)',
    href: '/about#essentials',
  },
  {
    icon: '📜',
    title: 'Park Rules',
    desc: 'Guidelines & codes',
    gradient: 'linear-gradient(135deg, #0A5566, #00A5C8)',
    href: '/about#rules',
  },
  {
    icon: '🚗',
    title: 'How to Reach',
    desc: 'Directions & parking',
    gradient: 'linear-gradient(135deg, #3FE0A5, #5FDDEA)',
    href: '/about#directions',
  },
  {
    icon: '🔒',
    title: 'Facilities',
    desc: 'Lockers, strollers, wheelchairs',
    gradient: 'linear-gradient(135deg, #0E7A93, #22C4DE)',
    href: '/about#facilities',
  },
];

export function PlanVisit({ locationSlug }) {
  return (
    <section className="section-shell section-tight">
      <div className="container-x">
        <Reveal className=" mb-8">
          <span className="eyebrow mb-3 block">Before you arrive</span>
          <h2 className="h1">Plan your <em>visit.</em></h2>
          <p className="body-lg mt-3 max-w-[460px]">
            Everything you need to know for a great visit
          </p>
        </Reveal>

        <Reveal>
          <div className="plan-grid">
            {/* Left — Costume Rental hero card */}
            <div className="plan-hero-card">
              <h3 className="plan-hero-title">Costume Rental</h3>
              <span className="plan-hero-line" />
              <p className="plan-hero-desc">
                Available for free till<br />
                31st March&apos;26, only 100 refundable<br />
                deposit will be charged
              </p>
              <div className="plan-hero-emoji" aria-hidden="true">
                 🩳
              </div>
            </div>

            {/* Right — 2×2 tile grid */}
            <div className="plan-tiles">
              {TILES.map((tile) => (
                <Link
                  key={tile.title}
                  href={`/${locationSlug}${tile.href}`}
                  className="plan-tile"
                >
                  <div className="plan-tile-bg" style={{ background: tile.gradient }} />
                  <span className="plan-tile-icon">{tile.icon}</span>
                  <div className="plan-tile-label">
                    <div className="plan-tile-label-inner">
                      <div>
                        <strong>{tile.title}</strong>
                        <span>{tile.desc}</span>
                      </div>
                      <span className="plan-tile-arrow">›</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
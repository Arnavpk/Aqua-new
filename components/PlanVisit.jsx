import Link from 'next/link';
import { Reveal } from './Reveal';
import Image from 'next/image';

const DEFAULT_TILES = [
  { icon: '🗺️', title: 'Park Essentials', desc: 'Map, timings, and entry guidelines', gradient: 'linear-gradient(135deg, #22C4DE, #5FDDEA)', href: '/about#essentials' },
  { icon: '📜', title: 'Park Rules', desc: 'Guidelines & codes', gradient: 'linear-gradient(135deg, #0A5566, #00A5C8)', href: '/about#rules' },
  { icon: '🚗', title: 'How to Reach', desc: 'Directions & parking', gradient: 'linear-gradient(135deg, #3FE0A5, #5FDDEA)', href: '/about#directions' },
  { icon: '🔒', title: 'Facilities', desc: 'Lockers, strollers, wheelchairs', gradient: 'linear-gradient(135deg, #0E7A93, #22C4DE)', href: '/about#facilities' },
];

export function PlanVisit({ locationSlug, data }) {
  const eyebrow = data?.eyebrow || "Before you arrive";
  const heading = data?.heading || "Plan your visit.";
  const subtitle = data?.subtitle || "Everything you need to know for a great visit";
  const hero = data?.hero || { title: "Costume Rental", description: "Available for free till\n31st March'26, only 100 refundable\ndeposit will be charged", icon: "🩳", image: null };
  const tiles = data?.tiles?.length ? data.tiles : DEFAULT_TILES;

  return (
    <section className="section-shell section-tight">
      <div className="container-x">
        <Reveal className="mb-8">
          <span className="eyebrow mb-3 block">{eyebrow}</span>
          <h2 className="h1">
            {heading.split(" ").slice(0, -1).join(" ")}{" "}
            <em>{heading.split(" ").slice(-1)}</em>
          </h2>
          <p className="body-lg mt-3 max-w-[460px]">{subtitle}</p>
        </Reveal>

        <Reveal>
          <div className="plan-grid">
            {/* Left — Hero card */}
            <div className="plan-hero-card relative overflow-hidden">
              {hero.image && (
                <>
                  <Image
                  height={200} width={400}
                    className="absolute inset-0 h-full w-full object-cover z-0"
                    src={hero.image}
                    alt={hero.title}
                  />
                  <div className="absolute inset-0 z-[1] bg-black/40" />
                </>
              )}
              <div className="relative z-[2]">
                <h3 className="plan-hero-title">{hero.title}</h3>
                <span className="plan-hero-line" />
                <p className="plan-hero-desc" style={{ whiteSpace: 'pre-line' }}>
                  {hero.description}
                </p>
              </div>
              <div className="plan-hero-emoji relative z-[2]" aria-hidden="true">
                {hero.icon}
              </div>
            </div>

            {/* Right — 2×2 tile grid */}
            <div className="plan-tiles">
              {tiles.map((tile) => (
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
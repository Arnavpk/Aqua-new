import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

export function RideSection({ section, locationSlug }) {
  return (
    <section className="section-shell" id={section.key} style={{ paddingTop: section.key === 'thrill' ? undefined : 20 }}>
      <div className="container-x">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow mb-3 block" style={{ color: section.eyebrowColor }}>
              {section.eyebrow}
            </span>
            <h2 className="h1">
              {section.heading} <em>{section.headingEm}</em>
            </h2>
          </div>
          {section.cta && (
            <a href="#" className="btn btn-outline max-[720px]:hidden">{section.cta}</a>
          )}
        </Reveal>

        <Reveal className="grid grid-cols-4 gap-4 max-[1180px]:grid-cols-3 max-[720px]:grid-cols-2">
          {section.rides.map((ride) => (
            <Link
              key={ride.slug}
              href={`/${locationSlug}/rides/${ride.slug}`}
              className="ride-card-list"
            >
              <div className="ride-media">
                {ride.image ? (
                  <div className="ride-art relative overflow-hidden">
                    <img className="absolute inset-0 h-full w-full object-cover" src={ride.image} alt={ride.name} />
                  </div>
                ) : (
                  <div className={`ride-art ${ride.art || 'bg-gradient-to-br from-brand-900 to-brand-600'}`} data-emoji={ride.emoji} />
                )}
                <span className="ride-tag">{ride.tag}</span>
                <span className="ride-thrill-badge">{ride.thrill}</span>
                <span className="ride-play">▶</span>
                <div className="ride-info">
                  <div className="cat">{ride.cat}</div>
                  <h3>{ride.name}</h3>
                </div>
              </div>
              <div className="ride-body">
                <p className="ride-desc">{ride.desc}</p>
                <div className="ride-specs-row">
                  {ride.specs.map((s, i) => (
                    <span key={i} className={`ride-spec ${ride.specTypes?.[i] || ''}`}>
                      <span className="dot" />
                      {s}
                    </span>
                  ))}
                </div>
                <div className="ride-cta-row">
                  <span className="view">View details</span>
                  <span className="arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
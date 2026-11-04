import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import Image from 'next/image';

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

        {/* CHANGED: 1 column on phones, 2 on small tablets, 3, then 4 */}
        <Reveal className="grid grid-cols-4 items-stretch gap-4 max-[1180px]:grid-cols-3 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1 max-[560px]:gap-5">
          {section.rides.map((ride) => (
            <Link
              key={ride.slug}
              href={`/${locationSlug}/water-park/rides-and-attractions/${ride.slug}`}
              className="ride-card-list flex h-full flex-col" /* CHANGED: equal-height cards */
            >
              <div className="ride-media">
                {ride.image ? (
                  <div className="ride-art absolute inset-0 overflow-hidden">
                    <Image
                      height={300}
                      width={500}
                      sizes="(max-width: 560px) 100vw, (max-width: 1180px) 50vw, 25vw"
                      className="absolute inset-0 h-full w-full object-cover"
                      src={ride.image}
                      alt={ride.name}
                    />
                  </div>
                ) : (
                  <div className={`ride-art ${ride.art || 'bg-gradient-to-br from-brand-900 to-brand-600'}`} data-emoji={ride.emoji} />
                )}

                {/* ADDED: gradient so the ride name is readable on any image */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <span className="ride-tag">{ride.tag}</span>
                <span className="ride-thrill-badge">{ride.thrill}</span>
                <span className="ride-play">▶</span>
                <div className="ride-info">
                  <h3>{ride.name}</h3>
                </div>
              </div>

              <div className="ride-body flex flex-1 flex-col"> {/* CHANGED: body fills the card */}
                <p className="ride-desc line-clamp-4 md:line-clamp-5">{ride.desc}</p> {/* CHANGED: clamp */}

                <div className="ride-specs-row">
                  {ride.specs.map((s, i) => {
                    // FIXED: skip empty values and bare numbers like the stray "1"
                    const text = String(s ?? '').trim();
                    if (!text || /^\d+$/.test(text)) return null;
                    return (
                      <span key={i} className={`ride-spec ${ride.specTypes?.[i] || ''}`}>
                        <span className="dot" />
                        {text}
                      </span>
                    );
                  })}
                </div>

                {/* CHANGED: mt-auto pins "View details" to the bottom so all cards line up */}
                <div className="ride-cta-row mt-auto">
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
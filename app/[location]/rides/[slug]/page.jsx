import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getRideDetail, getRideBySlug, getAllRides } from '@/lib/data/rides';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { WaveDivider } from '@/components/WaveDivider';
import { Reveal } from '@/components/Reveal';
import { SplashDrops } from '@/components/rides/SplashDrops';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  const ride = getRideBySlug(params.slug);
  const name = ride?.name || params.slug;
  return {
    title: `${name} — Rides — ${loc?.displayName}`,
    description: ride?.desc || `Experience ${name} at ${loc?.displayName}.`,
  };
}

export default function RideDetailPage({ params }) {
  const location = getLocation(params.location);
  const detail = getRideDetail(params.slug);
  const base = `/${location.slug}`;

  // Related rides
  const related = detail.relatedSlugs
    .map((s) => getRideBySlug(s))
    .filter(Boolean);

  return (
    <>
      <Navbar location={location} />

      {/* ===== CINEMATIC HERO ===== */}
      <header className="ride-detail-hero">
        <div className="rh-art-bg" aria-hidden="true" />
        <SplashDrops />
        <div className="container-x relative z-[2] max-w-[820px]">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={base}>Home</Link>
            <span className="sep">›</span>
            <Link href={`${base}/rides`}>Rides &amp; Attractions</Link>
            <span className="sep">›</span>
            <span className="text-white">{detail.name} {detail.nameEm}</span>
          </nav>

          <div className="flex gap-2 flex-wrap mb-5">
            {detail.tags.map((t) => (
              <span key={t.label} className={`rh-tag ${t.cls}`}>{t.label}</span>
            ))}
          </div>

          <h1 className="text-[clamp(60px,10vw,148px)] font-extrabold leading-[.9] tracking-tighter m-0 mb-5">
            {detail.name} <em className="italic font-light text-sun">{detail.nameEm}</em>
          </h1>
          <p className="text-[clamp(17px,1.6vw,22px)] max-w-[600px] mb-6 opacity-90 leading-relaxed font-light">
            {detail.lede}
          </p>

          <div className="video-cta mb-5">
            <span className="play-orb">▶</span>
            <span className="flex flex-col text-left">
              <span className="font-accent text-[10px] uppercase opacity-85 font-semibold" style={{ letterSpacing: '.14em' }}>POV Preview · 30s</span>
              <span className="text-[15px] font-semibold">Watch the drop</span>
            </span>
          </div>

          <div className="flex gap-3 flex-wrap mb-0">
            <Link href={`${base}/tickets`} className="btn btn-primary">Book tickets →</Link>
            <Link href={`${base}/rides`} className="btn btn-glass">← All rides</Link>
          </div>

          <div className="spec-strip">
            {detail.specs.map((s) => (
              <div key={s.k} className="spec-cell">
                <div className="k">{s.k}</div>
                <div className="v">
                  {s.icon && <span className="inline-block mr-2">{s.icon}</span>}
                  {s.v}
                  {s.unit && <span className="u">{s.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <WaveDivider fill="#EAFBFD" />
      </header>

      {/* ===== MAIN GRID ===== */}
      <div className="container-x">
        <div className="detail-layout">
          <div className="flex flex-col gap-8">
            {/* Story */}
            <Reveal>
              <div className="content-block">
                <span className="eyebrow mb-3 block">The story</span>
                <h2>What happens on the <em>{detail.name} {detail.nameEm}</em></h2>
                <p className="lead">{detail.story.lead}</p>
                <p>{detail.story.body}</p>
                <div className="grid grid-cols-3 gap-4 mt-5 max-[720px]:grid-cols-1">
                  {detail.experiences.map((e) => (
                    <div key={e.title} className="exp-tile">
                      <div className="w-11 h-11 rounded-[14px] flex items-center justify-center text-xl mb-3.5" style={{ background: 'linear-gradient(135deg, var(--brand-300), var(--brand-600))', color: 'white' }}>
                        {e.icon}
                      </div>
                      <h4 className="text-base font-semibold mb-1">{e.title}</h4>
                      <p className="text-[13px] text-ink-2 leading-relaxed !mb-0">{e.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Gallery */}
            <Reveal>
              <div className="content-block">
                <span className="eyebrow mb-3 block">Ride gallery</span>
                <h2>See it before you feel it.</h2>
                <div className="grid grid-cols-4 auto-rows-[140px] gap-3 mt-5 max-[720px]:grid-cols-2">
                  {[
                    { cls: 'col-span-2 row-span-2', bg: 'linear-gradient(135deg,#0A5566,#00A5C8)', tag: 'TOWER · AERIAL' },
                    { bg: 'linear-gradient(135deg,#00A5C8,#5FDDEA)', tag: 'FIRST DROP' },
                    { bg: 'linear-gradient(135deg,#5FDDEA,#A8ECF3)', tag: 'GROUP POV' },
                    { bg: 'linear-gradient(135deg,#0E7A93,#22C4DE)', tag: '30-SEC POV', play: true },
                    { bg: 'linear-gradient(135deg,#22C4DE,#5FDDEA)', tag: 'SPLASH FINALE' },
                    { cls: 'col-span-2', bg: 'linear-gradient(135deg,#0A5566,#22C4DE)', tag: 'RIDE AT SUNSET' },
                  ].map((t, i) => (
                    <div key={i} className={`gal-tile ${t.cls || ''}`} style={{ background: t.bg }}>
                      {t.play && <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-brand-900 text-xs z-[2]">▶</div>}
                      <span className="gal-tag">{t.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Safety */}
            <Reveal>
              <div className="content-block">
                <span className="eyebrow mb-3 block">Safety &amp; guidelines</span>
                <h2>Before you ride.</h2>
                <ul className="safety-list">
                  {detail.safety.map((s, i) => (
                    <li key={i} className={s.type !== 'ok' ? s.type : ''}>
                      <span dangerouslySetInnerHTML={{ __html: s.text.replace(/(\d+ cm|\d+'[^"]*")/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="cta-block">
                <h3 className="text-[36px] font-extrabold tracking-tight leading-none mb-4 relative">
                  Ready to ride the {detail.name} {detail.nameEm}?
                </h3>
                <p className="relative text-white/90 mb-7 text-base">
                  Grab a Skip-the-Queue ticket and ride first. The queue at 2pm on weekends is a very real thing.
                </p>
                <div className="relative flex gap-3 flex-wrap">
                  <button type="button" className="btn btn-primary">Book Skip-Queue →</button>
                  <Link href={`${base}/tickets`} className="btn btn-glass">See ticket options</Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ===== ASIDE ===== */}
          <aside className="sticky top-[110px] self-start flex flex-col gap-5 max-[1024px]:static">
            <Reveal>
              <div className="book-card">
                <h3 className="text-xl font-bold tracking-tight mb-1">{detail.name} {detail.nameEm} · included with any park ticket</h3>
                <p className="text-[13px] text-ink-2 mb-5">Full-day access · all rides · single QR entry.</p>
                <div className="queue-status">
                  <span className="w-2 h-2 rounded-full bg-[#1F7A44] animate-pulse" />
                  <span>Queue right now: <strong>~8 min</strong></span>
                </div>
                <div className="py-4 border-t border-b border-dashed border-line">
                  <div className="font-accent text-[12px] text-ink-2 font-semibold uppercase" style={{ letterSpacing: '.16em' }}>Starting from</div>
                  <div className="text-[44px] font-extrabold tracking-tight text-brand-700 leading-none mt-2 mb-1.5">
                    ₹599<span className="text-[15px] text-ink-2 font-medium">/person</span>
                  </div>
                  <div className="text-[13px] text-ink-2">Weekday · online booking</div>
                </div>
                <ul className="list-none m-0 p-0 my-4">
                  {['Full-park access, all 14 rides', "Free entry for kids under 3'3\"", 'Free cancellation up to 48h', 'Instant e-ticket to your inbox'].map((f) => (
                    <li key={f} className="relative text-sm text-ink-2 py-2 pl-6">
                      <span className="absolute left-0 top-2 w-4 h-4 rounded-full bg-leaf text-white text-[10px] font-bold flex items-center justify-center">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`${base}/tickets`} className="btn btn-primary w-full text-center">Book now →</Link>
                <div className="text-center text-[12px] text-ink-2 mt-3">🔒 Secure checkout · Instant confirmation</div>
              </div>
            </Reveal>

            <Reveal>
              <div className="location-card">
                <h4 className="font-accent text-[11px] uppercase font-semibold text-brand-600 mb-3.5" style={{ letterSpacing: '.24em' }}>Find it in the park</h4>
                <div className="flex items-center gap-3 p-3 rounded-[14px] bg-brand-50 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-900 text-sun flex items-center justify-center font-bold">{detail.zone.letter}</div>
                  <div>
                    <h5 className="text-sm font-semibold mb-0.5">{detail.zone.name}</h5>
                    <p className="text-[12px] text-ink-2 m-0">{detail.zone.distance}</p>
                  </div>
                </div>
                <a href="#" className="btn btn-outline w-full text-center">Open in park map →</a>
              </div>
            </Reveal>

            <Reveal>
              <div className="location-card">
                <h4 className="font-accent text-[11px] uppercase font-semibold text-brand-600 mb-3.5" style={{ letterSpacing: '.24em' }}>Ride hours</h4>
                <div className="text-sm text-ink-2 leading-[1.9]">
                  {detail.hours.map((h) => (
                    <div key={h.days} className="flex justify-between">
                      <span>{h.days}</span>
                      <strong className="text-ink">{h.time}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      {/* ===== RELATED RIDES ===== */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container-x">
          <Reveal className="flex justify-between items-end mb-8 gap-5">
            <div>
              <span className="eyebrow mb-3 block">Nearby in Zone {detail.zone.letter}</span>
              <h2 className="h1">Rides in <em>walking distance.</em></h2>
            </div>
            <Link href={`${base}/rides`} className="btn btn-outline max-[720px]:hidden">See all rides →</Link>
          </Reveal>

          <Reveal className="grid grid-cols-3 gap-5 max-[720px]:grid-cols-1">
            {related.map((r) => (
              <Link key={r.slug} href={`${base}/rides/${r.slug}`} className="ride-card-list">
                <div className="ride-media">
                  <div className={`ride-art ${r.art}`} data-emoji={r.emoji} />
                  <span className="ride-tag">{r.tag}</span>
                  <div className="ride-info"><h3>{r.name}</h3></div>
                </div>
                <div className="ride-body">
                  <p className="ride-desc">{r.desc}</p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}

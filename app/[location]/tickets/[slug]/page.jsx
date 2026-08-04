import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getOfferDetail, getOfferBySlug, OFFERS } from '@/lib/data/tickets';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { WaveDivider } from '@/components/WaveDivider';
import { Reveal } from '@/components/Reveal';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  const offer = getOfferBySlug(params.slug);
  return {
    title: `${offer?.name || params.slug} — ${loc?.displayName}`,
    description: offer?.name || `Offer detail at ${loc?.displayName}`,
  };
}

export default function OfferDetailPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const detail = getOfferDetail(params.slug);
  const sb = detail.sidebar;

  const related = detail.relatedSlugs
    .map((s) => OFFERS.find((o) => o.slug === s))
    .filter(Boolean);

  return (
    <>
      <Navbar location={location} />

      {/* ===== OFFER HERO ===== */}
      <header className="offer-hero" style={{ background: detail.gradient }} data-emoji={detail.emoji}>
        <div className="container-x relative z-[3]">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={base}>Home</Link>
            <span className="sep">›</span>
            <Link href={`${base}/tickets`}>Tickets &amp; Offers</Link>
            <span className="sep">›</span>
            <span className="text-white">{detail.name} {detail.nameEm}</span>
          </nav>
          <span className="offer-badge-hero">{detail.badge}</span>
          <h1>
            {detail.name} <em>{detail.nameEm}</em> {detail.nameSuffix}
          </h1>
          <p className="text-[clamp(17px,1.6vw,22px)] max-w-[600px] mb-6 opacity-90 leading-relaxed font-light">
            {detail.lede}
          </p>
          <div className="flex gap-3 flex-wrap">
            <button type="button" className="btn btn-dark">Book now — save 50% →</button>
            <Link href={`${base}/tickets`} className="btn btn-glass">← All offers</Link>
          </div>
          <div className="offer-meta">
            {detail.meta.map((m) => (
              <div key={m.k} className="offer-meta-item">
                <span className="k">{m.k}</span>
                <span className="v">{m.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="medallion" aria-hidden="true">
          <div className="big">{detail.medallion.big}</div>
          <div className="lil">{detail.medallion.small}</div>
          <div className="validity">{detail.medallion.validity}</div>
        </div>
        <WaveDivider fill="#EAFBFD" />
      </header>

      {/* ===== MAIN GRID ===== */}
      <div className="container-x">
        <div className="detail-layout">
          <div className="flex flex-col gap-8">
            {/* About offer */}
            <Reveal>
              <div className="content-block">
                <span className="eyebrow mb-3 block">About this offer</span>
                <h2>
                  {detail.story.heading}
                  <br />
                  <em>{detail.story.headingEm}</em>
                </h2>
                <p className="lead" dangerouslySetInnerHTML={{ __html: detail.story.lead }} />
                <p>{detail.story.body}</p>

                <div className="grid grid-cols-3 gap-4 mt-6 max-[720px]:grid-cols-1">
                  {detail.highlights.map((h) => (
                    <div key={h.title} className="highlight">
                      <div className="h-icon">{h.icon}</div>
                      <div>
                        <h4>{h.title}</h4>
                        <p>{h.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Terms */}
            <Reveal>
              <div className="content-block">
                <span className="eyebrow mb-3 block">Terms &amp; conditions</span>
                <h2>The fine print.</h2>
                <ul className="terms-list mt-5">
                  {detail.terms.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="cta-block">
                <h3 className="text-[36px] font-extrabold tracking-tight leading-none mb-4 relative">
                  Ready to make a splash?
                </h3>
                <p className="relative text-white/90 mb-7 text-base">
                  The offer ends soon and tickets are moving fast. Lock your date now — pay in full at checkout, keep the memories forever.
                </p>
                <div className="relative flex gap-3 flex-wrap">
                  <button type="button" className="btn btn-primary">Book my group →</button>
                  <a href="tel:02269660000" className="btn btn-glass">📞 Call to book</a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ===== ASIDE ===== */}
          <aside className="sticky top-[110px] self-start flex flex-col gap-5 max-[1024px]:static">
            <Reveal>
              <div className="book-card">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight mb-1">{sb.title}</h3>
                    <p className="text-[13px] text-ink-2 m-0">{sb.subtitle}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-coral text-white font-accent text-[11px] font-bold px-3 py-1.5 flex-shrink-0" style={{ letterSpacing: '.06em' }}>
                    {sb.save}
                  </span>
                </div>
                <div className="py-4 border-t border-b border-dashed border-line">
                  <div className="font-accent text-[12px] text-ink-2 font-semibold uppercase" style={{ letterSpacing: '.16em' }}>Starting from</div>
                  <div className="text-[44px] font-extrabold tracking-tight text-brand-700 leading-none mt-2 mb-1.5">
                    {sb.price}
                    <span className="text-[15px] text-ink-2 font-medium line-through ml-2">{sb.priceStrike}</span>
                  </div>
                  <div className="text-[13px] text-ink-2">{sb.unit}</div>
                </div>
                <ul className="list-none m-0 p-0 my-4">
                  {sb.features.map((f) => (
                    <li key={f} className="relative text-sm text-ink-2 py-2 pl-6">
                      <span className="absolute left-0 top-2 w-4 h-4 rounded-full bg-leaf text-white text-[10px] font-bold flex items-center justify-center">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button type="button" className="btn btn-primary w-full text-center">Book now →</button>
                <div className="text-center text-[12px] text-ink-2 mt-3">🔒 Secure checkout · Instant confirmation</div>
              </div>
            </Reveal>

            <Reveal>
              <div className="share-card">
                <h4 className="font-accent text-[11px] uppercase font-semibold text-brand-600 mb-4" style={{ letterSpacing: '.24em' }}>
                  Share this offer
                </h4>
                <div className="flex gap-2">
                  {['📱', 'f', '𝕏', '📷', '🔗'].map((icon) => (
                    <button key={icon} type="button" className="share-btn" aria-label="Share">{icon}</button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="location-card">
                <h4 className="font-accent text-[11px] uppercase font-semibold text-brand-600 mb-3" style={{ letterSpacing: '.24em' }}>
                  Need help booking?
                </h4>
                <p className="text-sm text-ink-2 mb-4">Our booking team is available every day 9am–9pm.</p>
                <a href="tel:02269660000" className="btn btn-outline w-full text-center">📞 022-69660000</a>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      {/* ===== RELATED OFFERS ===== */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container-x">
          <Reveal className="flex justify-between items-end mb-8 gap-5">
            <div>
              <span className="eyebrow mb-3 block">More ways to save</span>
              <h2 className="h1">You might also like.</h2>
            </div>
            <Link href={`${base}/tickets`} className="btn btn-outline max-[720px]:hidden">See all offers →</Link>
          </Reveal>

          <Reveal className="grid grid-cols-3 gap-5 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
            {related.map((r) => (
              <Link key={r.slug} href={`${base}/tickets/${r.slug}`} className="rel-card">
                <div className="rel-media">
                  <div className={`absolute inset-0 ${r.art}`} />
                  <div className="absolute inset-0 flex items-center justify-center text-[80px] opacity-30" data-emoji={r.emoji}>{r.emoji}</div>
                  <span className="rel-tag">{r.tag}</span>
                </div>
                <div className="rel-body">
                  <h4>{r.name}</h4>
                  <p className="text-[13px] text-ink-2 leading-relaxed m-0">{r.features[0]}</p>
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

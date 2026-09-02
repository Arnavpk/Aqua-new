import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getOfferBySlug as getStrapiOffer } from '@/lib/strapi/getTickets';
import { extractOfferDetail } from '@/lib/extractors/ticketExtractor';
import { getOfferDetail as getMockDetail, getOfferBySlug, OFFERS } from '@/lib/data/tickets';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { WaveDivider } from '@/components/WaveDivider';
import { Reveal } from '@/components/Reveal';
import { getNavItems } from '@/lib/strapi/getNav';
import Image from 'next/image';


export async function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  const strapiOffer = await getStrapiOffer(loc.slug, params.slug);
  const name = strapiOffer?.name || params.slug;
  return {
    title: `${name} — ${loc?.displayName}`,
    description: strapiOffer?.lede || `Offer detail at ${loc?.displayName}`,
  };
}

export default async function OfferDetailPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();

  const strapiOffer = await getStrapiOffer(location.slug, params.slug);
  const detail = extractOfferDetail(strapiOffer) || getMockDetail(params.slug);
  const sb = detail.sidebar;
  const navItems = await getNavItems(location.slug);

  console.log("deeeeeetail:", detail);
  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />

      {/* ===== OFFER HERO ===== */}
      <header className="offer-hero relative overflow-hidden">
        {(detail.bImage || detail.image) ? (
          <>
            {/* Desktop banner */}
            <Image
            height={200} width={400}
              className="hidden md:block absolute inset-0 h-full w-full object-cover z-0"
              src={detail.bImage || detail.image}
              alt={detail.name}
            />
            {/* Mobile banner */}
            <Image
            height={200} width={400}
              className="block md:hidden absolute inset-0 h-full w-full object-cover z-0"
              src={detail.bImageMobile || detail.bImage || detail.image}
              alt={detail.name}
            />
            <div className="absolute inset-0 z-[1] bg-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, #FF7A9C, #FFD84D)' }} />
        )}
        <div className="container-x relative z-[3]">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={base}>Home</Link>
            <span className="sep">›</span>
            <Link href={`${base}/tickets`}>Tickets &amp; Offers</Link>
            <span className="sep">›</span>
            <span className="text-white">{detail.name} {detail.nameEm}</span>
          </nav>
          {detail.badge && <span className="offer-badge-hero">{detail.badge}</span>}
          <h1>
            {detail.name} <em>{detail.nameEm}</em> {detail.nameSuffix}
          </h1>
          <p className="text-[clamp(17px,1.6vw,22px)] max-w-[600px] mb-6 opacity-90 leading-relaxed font-light">
            {detail.lede}
          </p>
          <div className="flex gap-3 flex-wrap">
            <button type="button" className="btn btn-dark">Book now — save {detail.medallion.big} →</button>
            <Link href={`${base}/tickets-and-offers`} className="btn btn-glass">← All offers</Link>
          </div>
          {detail.meta.length > 0 && (
            <div className="offer-meta">
              {detail.meta.map((m) => (
                <div key={m.k} className="offer-meta-item">
                  <span className="k">{m.k}</span>
                  <span className="v">{m.v}</span>
                </div>
              ))}
            </div>
          )}
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
            {(detail.story.heading || detail.story.lead) && (
              <Reveal>
                <div className="content-block">
                  <span className="eyebrow mb-3 block">About this offer</span>
                  <h2>
                    {detail.story.heading}
                    {detail.story.headingEm && (
                      <>
                        <br />
                        <em>{detail.story.headingEm}</em>
                      </>
                    )}
                  </h2>
                  {detail.story.lead && (
                    <p className="lead" dangerouslySetInnerHTML={{ __html: detail.story.lead }} />
                  )}
                  {detail.story.body && <p>{detail.story.body}</p>}

                  {detail.highlights.length > 0 && (
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
                  )}
                </div>
              </Reveal>
            )}

            {/* Terms */}
            {detail.terms.length > 0 && (
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
            )}

            {/* CTA */}
            {/* CTA */}
            <Reveal>
              <div className="cta-block">
                <h3 className="text-[36px] font-extrabold tracking-tight leading-none mb-4 relative">
                  {detail.detailCta?.heading}
                </h3>
                <p className="relative text-white/90 mb-7 text-base">
                  {detail.detailCta?.description}
                </p>
                <div className="relative flex gap-3 flex-wrap">
                  <a href={detail.detailCta?.url || detail.bookCtaUrl || "#"} className="btn btn-primary">
                    {detail.detailCta?.label}
                  </a>
                  <a href={detail.help?.phoneUrl} className="btn btn-glass">📞 Call to book</a>
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
                    <p className="text-[13px] text-ink-2 m-0">{sb.unit}</p>
                  </div>
                  {sb.save && (
                    <span className="inline-flex rounded-full bg-coral text-white font-accent text-[11px] font-bold px-3 py-1.5 flex-shrink-0" style={{ letterSpacing: '.06em' }}>
                      {sb.save}
                    </span>
                  )}
                </div>
                <div className="py-4 border-t border-b border-dashed border-line">
                  <div className="font-accent text-[12px] text-ink-2 font-semibold uppercase" style={{ letterSpacing: '.16em' }}>Starting from</div>
                  <div className="text-[44px] font-extrabold tracking-tight text-brand-700 leading-none mt-2 mb-1.5">
                    {sb.price}
                    {sb.priceStrike && (
                      <span className="text-[15px] text-ink-2 font-medium line-through ml-2">{sb.priceStrike}</span>
                    )}
                  </div>
                  <div className="text-[13px] text-ink-2">{sb.unit}</div>
                </div>
                {sb.features.length > 0 && (
                  <ul className="list-none m-0 p-0 my-4">
                    {sb.features.map((f) => (
                      <li key={f} className="relative text-sm text-ink-2 py-2 pl-6">
                        <span className="absolute left-0 top-2 w-4 h-4 rounded-full bg-leaf text-white text-[10px] font-bold flex items-center justify-center">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <a href={detail.bookCtaUrl || "#"} className="btn btn-primary w-full text-center">
                  {detail.bookCtaLabel}
                </a>
                <div className="text-center text-[12px] text-ink-2 mt-3">🔒 Secure checkout · Instant confirmation</div>
              </div>
            </Reveal>

            {/* <Reveal>
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
            </Reveal> */}

            <Reveal>
              <div className="location-card">
                <h4 className="font-accent text-[11px] uppercase font-semibold text-brand-600 mb-3" style={{ letterSpacing: '.24em' }}>
                  {detail.help.heading}
                </h4>
                <p className="text-sm text-ink-2 mb-4">{detail.help.description}</p>
                <a href={detail.help.phoneUrl} className="btn btn-outline w-full text-center">📞 {detail.help.phone}</a>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      {/* ===== RELATED OFFERS ===== */}
      {detail.related.length > 0 && (
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
              {detail.related.map((r) => (
                <Link key={r.slug} href={`${base}/tickets/${r.slug}`} className="rel-card">
                  <div className="rel-media relative overflow-hidden">
                    {r.image ? (
                      <Image height={200} width={400} className="absolute inset-0 h-full w-full object-cover" src={r.image} alt={r.name} />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-400" />
                    )}
                    <span className="rel-tag">{r.tag}</span>
                  </div>
                  <div className="rel-body">
                    <h4>{r.name}</h4>
                    <p className="text-[13px] text-ink-2 leading-relaxed m-0">
                      {r.discount} {r.discountSub}
                    </p>
                  </div>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}
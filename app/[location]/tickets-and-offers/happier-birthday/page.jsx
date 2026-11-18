import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getLocation } from '@/lib/locations';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { getHappierBirthdayPage } from '@/lib/strapi/getHappierBirthday';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';
import { AboutContent } from '@/components/AboutContent';

// Every section and every field below renders only when it has content in Strapi.

export async function generateMetadata({ params }) {
    const data = await getHappierBirthdayPage(params.location);
    if (!data) return {};
    const meta = {};
    if (data.meta.title) meta.title = data.meta.title;
    if (data.meta.description) meta.description = data.meta.description;
    return meta;
}

function resolveHref(href, base) {
    if (!href) return `${base}/tickets-and-offers`;
    return href.startsWith('/') ? `${base}${href}` : href;
}

const OFFER_TONES = {
    sun: { background: 'linear-gradient(160deg, #FFD84D, #FFC53D)', color: '#0C3B47', kicker: 'rgba(12,59,71,.7)' },
    brand: { background: 'linear-gradient(135deg, #0A5566 0%, #00A5C8 70%, #22C4DE 100%)', color: '#ffffff', kicker: '#FFD84D' },
};

// Shown when an experience tile has a title but no image yet (cycled by position).
const TILE_GRADIENTS = [
    'linear-gradient(135deg, #FF7A9C, #FFD84D)',
    'linear-gradient(135deg, #00A5C8, #5FDDEA)',
    'linear-gradient(135deg, #22C4DE, #3FE0A5)',
    'linear-gradient(135deg, #FFD84D, #B6F26A)',
];

// Terms beyond this count go behind "Read more".
const VISIBLE_TERMS = 5;

function TermItem({ n, text }) {
    return (
        <li className="flex gap-3 py-3 text-sm text-ink-2 leading-relaxed border-b border-line">
            <span className="shrink-0 w-6 h-6 rounded-full bg-brand-50 text-brand-700 text-[11px] font-bold inline-flex items-center justify-center mt-px">
                {n}
            </span>
            <span>{text}</span>
        </li>
    );
}

// Eyebrow + heading block; renders nothing when both are empty.
function SectionHead({ eyebrow, heading, headingClass = 'h2' }) {
    if (!eyebrow && !heading) return null;
    return (
        <Reveal className="section-head">
            <div>
                {eyebrow && <span className="eyebrow mb-2 block">{eyebrow}</span>}
                {heading && <h2 className={headingClass}>{heading}</h2>}
            </div>
        </Reveal>
    );
}

export default async function HappierBirthdayPage({ params }) {
    const location = getLocation(params.location);
    if (!location) notFound();

    const [data, strapiLocations, navItems] = await Promise.all([
        getHappierBirthdayPage(location.slug),
        getAllStrapiLocations(),
        getNavItems(location.slug),
    ]);
    if (!data) notFound();

    const base = `/${location.slug}`;
    const bookHref = resolveHref(data.bookingHref, base);
    const { hero, offer, experiences, terms, faq, cta } = data;

    return (
        <>
            <Navbar location={location} locations={strapiLocations} navItems={navItems} />

            {/* Hero */}
            {hero && (
                <PageHero
                    eyebrow={hero.eyebrow || undefined}
                    title={hero.title || undefined}
                    subtitle={hero.subtitle || undefined}
                    breadcrumbs={[
                        { label: 'Home', href: base },
                        { label: 'Tickets & offers', href: `${base}/tickets-and-offers` },
                        ...(data.pageTitle ? [{ label: data.pageTitle }] : []),
                    ]}
                    primaryCta={hero.primaryCtaLabel ? { label: hero.primaryCtaLabel, href: bookHref } : undefined}
                    secondaryCta={hero.secondaryCta || undefined}
                    bgImage={hero.bg?.url}
                    mobileImage={hero.mobile?.url}
                    bgImageSize={hero.bg?.width ? { width: hero.bg.width, height: hero.bg.height } : undefined}
                    mobileImageSize={hero.mobile?.width ? { width: hero.mobile.width, height: hero.mobile.height } : undefined}
                />
            )}

            {/* The offer */}
            {offer && (
                <section className="section-shell">
                    <div className="container-x">
                        <SectionHead eyebrow={offer.eyebrow} heading={offer.heading} />

                        {offer.cards.length > 0 && (
                            <Reveal className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
                                {offer.cards.map((c, i) => {
                                    // Uses the card's tone if it matches; otherwise yellow first, blue second.
                                    const tone = OFFER_TONES[c.tone] || (i % 2 === 0 ? OFFER_TONES.sun : OFFER_TONES.brand);
                                    return (
                                        <div key={c.title || i} className="rounded-rx p-8 relative overflow-hidden max-[720px]:p-6 max-[720px]:rounded-[24px]" style={{ background: tone.background, color: tone.color }}>
                                            {c.kicker && (
                                                <span className="font-accent text-[11px] font-semibold uppercase block mb-3" style={{ letterSpacing: '.24em', color: tone.kicker }}>
                                                    {c.kicker}
                                                </span>
                                            )}
                                            {c.big && (
                                                <div className="flex items-baseline gap-2 flex-wrap mb-2">
                                                    <span className="font-extrabold leading-none" style={{ fontSize: 'clamp(44px, 6vw, 72px)', letterSpacing: '-.03em' }}>{c.big}</span>
                                                    {c.bigSuffix && <span className="text-sm font-semibold opacity-80">{c.bigSuffix}</span>}
                                                </div>
                                            )}
                                            {c.title && <h3 className="text-lg font-bold mb-1.5">{c.title}</h3>}
                                            {c.desc && <p className="text-sm leading-relaxed m-0 opacity-85 max-w-[420px]">{c.desc}</p>}
                                        </div>
                                    );
                                })}
                            </Reveal>
                        )}

                        {offer.ctaLabel && (
                            <Reveal className="mt-5 flex flex-wrap items-center justify-between gap-4">
                                <a href={offer.ctaHref ? resolveHref(offer.ctaHref, base) : bookHref} className="btn btn-primary">{offer.ctaLabel}</a>
                            </Reveal>
                        )}
                    </div>
                </section>
            )}

            {/* Experiences */}
            {experiences && (
                <section className="section-shell" style={{ background: 'white' }}>
                    <div className="container-x">
                        <SectionHead eyebrow={experiences.eyebrow} heading={experiences.heading} headingClass="h2 mb-2" />
                        {experiences.tiles.length > 0 && (
                            <Reveal className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[720px]:gap-3">
                                {experiences.tiles.map((t, i) => (
                                    <div key={t.name || i} className="relative overflow-hidden rounded-rl aspect-[4/5] shadow-s2">
                                        {t.image ? (
                                            <Image fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" src={t.image.url} alt={t.image.alt || t.name || ''} />
                                        ) : (
                                            <div className="absolute inset-0" style={{ background: TILE_GRADIENTS[i % TILE_GRADIENTS.length] }} aria-hidden="true" />
                                        )}
                                        {t.name && <span className="chip chip-white absolute left-3 bottom-3">{t.name}</span>}
                                    </div>
                                ))}
                            </Reveal>
                        )}
                        {experiences.ctaLabel && (
                            <Reveal className="mt-6 flex justify-center">
                                <a href={experiences.ctaHref ? resolveHref(experiences.ctaHref, base) : bookHref} className="btn btn-primary">{experiences.ctaLabel}</a>
                            </Reveal>
                        )}
                    </div>
                </section>
            )}

            {/* FAQ */}
            {faq && (
                <div id="faqs" className="scroll-mt-28">
                    <AboutContent faqData={faq} aboutFaqs={faq.faqs} visibleCount={5} />
                </div>
            )}

            {/* Terms */}
            {terms && (
                <section id="terms" className="section-shell scroll-mt-28" style={{ background: 'white' }}>
                    <div className="container-x">
                        <SectionHead eyebrow={terms.eyebrow} heading={terms.heading} />
                        {terms.items.length > 0 && (
                            <Reveal className="max-w-[820px]">
                                <ol className="m-0 p-0 list-none">
                                    {terms.items.slice(0, VISIBLE_TERMS).map((t, i) => (
                                        <TermItem key={i} n={i + 1} text={t} />
                                    ))}
                                </ol>
                                {/* Native <details>: works without JavaScript, so it can stay in this server page. */}
                                {terms.items.length > VISIBLE_TERMS && (
                                    <details className="group">
                                        <summary className="mt-4 mb-1 inline-block cursor-pointer list-none text-sm font-semibold text-brand-700 underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
                                            <span className="group-open:hidden">Read more ({terms.items.length - VISIBLE_TERMS})</span>
                                            <span className="hidden group-open:inline">Show less</span>
                                        </summary>
                                        <ol className="m-0 p-0 list-none">
                                            {terms.items.slice(VISIBLE_TERMS).map((t, i) => (
                                                <TermItem key={i} n={VISIBLE_TERMS + i + 1} text={t} />
                                            ))}
                                        </ol>
                                    </details>
                                )}
                            </Reveal>
                        )}
                        {(terms.contact.phone || terms.contact.email) && (
                            <p className="text-sm text-ink-2 mt-5 mb-0">
                                Questions?
                                {terms.contact.phone && (
                                    <> Call <a href={terms.contact.phoneHref} className="font-semibold">{terms.contact.phone}</a></>
                                )}
                                {terms.contact.phone && terms.contact.email && ' or'}
                                {terms.contact.email && (
                                    <> email <a href={`mailto:${terms.contact.email}`} className="font-semibold">{terms.contact.email}</a></>
                                )}
                                .
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Closing CTA */}
            {cta && (
                <section className="section-shell">
                    <div className="container-x">
                        <Reveal>
                            <div className="cta-banner" style={{ paddingBottom: 80 }}>
                                <div className="relative text-5xl mb-3" aria-hidden="true">🎂</div>
                                {cta.heading && <h2 className="h1 text-white mb-3 relative">{cta.heading}</h2>}
                                {cta.subtitle && <p className="relative text-white/90 max-w-[520px] mx-auto mb-6">{cta.subtitle}</p>}
                                {(cta.ctaLabel || terms) && (
                                    <div className="flex gap-3 justify-center flex-wrap relative">
                                        {cta.ctaLabel && (
                                            <a href={cta.ctaHref ? resolveHref(cta.ctaHref, base) : bookHref} className="btn btn-primary">
                                                {cta.ctaLabel}
                                            </a>
                                        )}
                                        {terms && <a href="#terms" className="btn btn-glass">Offer terms</a>}
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    </div>
                </section>
            )}

            <Footer location={location} navItems={navItems} locations={strapiLocations} />
            <MobBook location={location} />
        </>
    );
}
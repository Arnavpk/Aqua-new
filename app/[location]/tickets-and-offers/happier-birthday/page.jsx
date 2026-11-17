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

export async function generateMetadata({ params }) {
    const data = await getHappierBirthdayPage(params.location);
    if (!data) return {};
    return { title: data.meta.title, description: data.meta.description };
}

function resolveHref(href, base) {
    if (!href) return `${base}/tickets-and-offers`;
    return href.startsWith('/') ? `${base}${href}` : href;
}

const OFFER_TONES = {
    sun: { background: 'linear-gradient(160deg, #FFD84D, #FFC53D)', color: '#0C3B47', kicker: 'rgba(12,59,71,.7)' },
    brand: { background: 'linear-gradient(135deg, #0A5566 0%, #00A5C8 70%, #22C4DE 100%)', color: '#ffffff', kicker: '#FFD84D' },
};

// Shown when an experience tile has no image yet (cycled by position).
const TILE_GRADIENTS = [
    'linear-gradient(135deg, #FF7A9C, #FFD84D)',
    'linear-gradient(135deg, #00A5C8, #5FDDEA)',
    'linear-gradient(135deg, #22C4DE, #3FE0A5)',
    'linear-gradient(135deg, #FFD84D, #B6F26A)',
];

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

            <PageHero
                eyebrow={hero.eyebrow}
                title={hero.title}
                subtitle={hero.subtitle}
                breadcrumbs={[{ label: 'Home', href: base }, { label: 'Tickets & offers', href: `${base}/tickets-and-offers` }, { label: data.pageTitle || 'Happier Birthday' }]}
                primaryCta={hero.primaryCtaLabel ? { label: hero.primaryCtaLabel, href: bookHref } : undefined}
                secondaryCta={hero.secondaryCta || undefined}
                bgImage={hero.bgImage}
                mobileImage={hero.mobileImage}
            />

            {/* The offer */}
            {offer && (
                <section className="section-shell">
                    <div className="container-x">
                        <Reveal className="section-head">
                            <div>
                                {offer.eyebrow && <span className="eyebrow mb-2 block">{offer.eyebrow}</span>}
                                <h2 className="h2">{offer.heading}</h2>
                            </div>
                        </Reveal>

                        <Reveal className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
                            {offer.cards.map((c, i) => {
                                // Uses the card's tone if it matches; otherwise yellow first, blue second.
                                const tone = OFFER_TONES[c.tone] || (i % 2 === 0 ? OFFER_TONES.sun : OFFER_TONES.brand);
                                return (
                                    <div key={c.title || i} className="rounded-rx p-8 relative overflow-hidden max-[720px]:p-6 max-[720px]:rounded-[24px]" style={{ background: tone.background, color: tone.color }}>
                                        <span className="font-accent text-[11px] font-semibold uppercase block mb-3" style={{ letterSpacing: '.24em', color: tone.kicker }}>
                                            {c.kicker}
                                        </span>
                                        <div className="flex items-baseline gap-2 flex-wrap mb-2">
                                            <span className="font-extrabold leading-none" style={{ fontSize: 'clamp(44px, 6vw, 72px)', letterSpacing: '-.03em' }}>{c.big}</span>
                                            {c.bigSuffix && <span className="text-sm font-semibold opacity-80">{c.bigSuffix}</span>}
                                        </div>
                                        <h3 className="text-lg font-bold mb-1.5">{c.title}</h3>
                                        <p className="text-sm leading-relaxed m-0 opacity-85 max-w-[420px]">{c.desc}</p>
                                    </div>
                                );
                            })}
                        </Reveal>

                        <Reveal className="mt-5 flex flex-wrap items-center justify-between gap-4">
                            <a href={bookHref} className="btn btn-primary">{hero.primaryCtaLabel}</a>
                        </Reveal>
                    </div>
                </section>
            )}

            {/* Experiences */}
            {experiences && (
                <section className="section-shell" style={{ background: 'white' }}>
                    <div className="container-x">
                        <Reveal className="section-head">
                            <div>
                                {experiences.eyebrow && <span className="eyebrow mb-2 block">{experiences.eyebrow}</span>}
                                <h2 className="h2 mb-2">{experiences.heading}</h2>
                            </div>
                        </Reveal>
                        <Reveal className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[720px]:gap-3">
                            {experiences.tiles.map((t, i) => (
                                <div key={t.name || i} className="relative overflow-hidden rounded-rl aspect-[4/5] shadow-s2">
                                    {t.image ? (
                                        <Image fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" src={t.image} alt={t.name || ''} />
                                    ) : (
                                        <div className="absolute inset-0" style={{ background: TILE_GRADIENTS[i % TILE_GRADIENTS.length] }} aria-hidden="true" />
                                    )}
                                    {t.name && <span className="chip chip-white absolute left-3 bottom-3">{t.name}</span>}
                                </div>
                            ))}
                        </Reveal>
                    </div>
                </section>
            )}

            {/* FAQ */}
            {faq && faq.faqs.length > 0 && (
                <div id="faqs" className="scroll-mt-28">
                    <AboutContent faqData={faq} aboutFaqs={faq.faqs} />
                </div>
            )}

            {/* Terms */}
            {terms && (
                <section id="terms" className="section-shell scroll-mt-28" style={{ background: 'white' }}>
                    <div className="container-x">
                        <Reveal className="section-head">
                            <div>
                                {terms.eyebrow && <span className="eyebrow mb-2 block">{terms.eyebrow}</span>}
                                <h2 className="h2">{terms.heading}</h2>
                            </div>
                        </Reveal>
                        <Reveal>
                            <ol className="m-0 p-0 list-none columns-2 gap-x-10 max-[1024px]:columns-1">
                                {terms.items.map((t, i) => (
                                    <li key={i} className="flex gap-3 py-3 text-sm text-ink-2 leading-relaxed border-b border-line break-inside-avoid">
                                        <span className="shrink-0 w-6 h-6 rounded-full bg-brand-50 text-brand-700 text-[11px] font-bold inline-flex items-center justify-center mt-px">
                                            {i + 1}
                                        </span>
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ol>
                        </Reveal>
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
                                <h2 className="h1 text-white mb-3 relative">{cta.heading}</h2>
                                {cta.subtitle && <p className="relative text-white/90 max-w-[520px] mx-auto mb-6">{cta.subtitle}</p>}
                                <div className="flex gap-3 justify-center flex-wrap relative">
                                    <a href={cta.ctaHref ? resolveHref(cta.ctaHref, base) : bookHref} className="btn btn-primary">
                                        {cta.ctaLabel || hero.primaryCtaLabel}
                                    </a>
                                    {terms && <a href="#terms" className="btn btn-glass">Offer terms</a>}
                                </div>
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
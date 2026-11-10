import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getLocation } from '@/lib/locations';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { getHappierBirthdayData } from '@/lib/data/happierBirthday';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';
import { AboutContent } from '@/components/AboutContent';

export function generateMetadata({ params }) {
    const data = getHappierBirthdayData(params.location);
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

export default async function HappierBirthdayPage({ params }) {
    const location = getLocation(params.location);
    const data = getHappierBirthdayData(params.location);
    if (!location || !data) notFound();

    const base = `/${location.slug}`;
    const bookHref = resolveHref(data.bookingHref, base);
    const { contact, hero, offer, experiences, reasons, terms, faq, cta } = data;

    const [strapiLocations, navItems] = await Promise.all([
        getAllStrapiLocations(),
        getNavItems(location.slug),
    ]);

    return (
        <>
            <Navbar location={location} locations={strapiLocations} navItems={navItems} />

            <PageHero
                eyebrow={hero.eyebrow}
                title={<>{hero.titleLead} <em>{hero.titleEm}</em></>}
                subtitle={hero.subtitle}
                breadcrumbs={[{ label: 'Home', href: base }, { label: 'Tickets & offers', href: `${base}/tickets-and-offers` }, { label: 'Happier Birthday' }]}
                primaryCta={{ label: hero.primaryCtaLabel, href: bookHref }}
                secondaryCta={hero.secondaryCta}
                // stats={hero.stats}
                bgImage={hero.bgImage}
                mobileImage={hero.mobileImage}
            />

            {/* The offer */}
            <section className="section-shell">
                <div className="container-x">
                    <Reveal className="section-head">
                        <div>
                            <span className="eyebrow mb-2 block">{offer.eyebrow}</span>
                            <h2 className="h2">{offer.heading}</h2>
                        </div>
                    </Reveal>

                    <Reveal className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
                        {offer.cards.map((c) => {
                            const tone = OFFER_TONES[c.tone] || OFFER_TONES.brand;
                            return (
                                <div key={c.title} className="rounded-rx p-8 relative overflow-hidden max-[720px]:p-6 max-[720px]:rounded-[24px]" style={{ background: tone.background, color: tone.color }}>
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
                        {/* <ul className="m-0 p-0 list-none flex flex-wrap gap-2">
                            {offer.notes.map((n) => (
                                <li key={n} className="rest-tag inline-flex items-center gap-1.5 bg-white">✓ {n}</li>
                            ))}
                        </ul> */}
                        <a href={bookHref} className="btn btn-primary">{hero.primaryCtaLabel}</a>
                    </Reveal>
                </div>
            </section>

            {/* Experiences */}
            <section className="section-shell" style={{ background: 'white' }}>
                <div className="container-x">
                    <Reveal className="section-head">
                        <div>
                            <span className="eyebrow mb-2 block">{experiences.eyebrow}</span>
                            <h2 className="h2 mb-2">{experiences.heading}</h2>
                            {/* <p className="text-[15px] text-ink-2 m-0 max-w-[560px]">{experiences.subtitle}</p> */}
                        </div>
                    </Reveal>
                    <Reveal className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[720px]:gap-3">
                        {experiences.tiles.map((t) => (
                            <div key={t.name} className="relative overflow-hidden rounded-rl aspect-[4/5] shadow-s2">
                                {t.image ? (
                                    <Image fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" src={t.image} alt={t.name} />
                                ) : (
                                    <div className="absolute inset-0" style={{ background: t.gradient }} aria-hidden="true" />
                                )}
                                <span className="chip chip-white absolute left-3 bottom-3">{t.name}</span>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </section>

            {/* You'll love */}
            {/* <section className="section-shell">
                <div className="container-x">
                    <Reveal className="section-head">
                        <div>
                            <span className="eyebrow mb-2 block">{reasons.eyebrow}</span>
                            <h2 className="h2">{reasons.heading}</h2>
                        </div>
                    </Reveal>
                    <Reveal className="grid grid-cols-3 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
                        {reasons.cards.map((c) => (
                            <div key={c.title} className="why-card bg-white">
                                <div className="why-icon">{c.icon}</div>
                                <h3 className="text-base font-semibold mb-1.5">{c.title}</h3>
                                <p className="text-[13px] text-ink-2 leading-relaxed m-0">{c.desc}</p>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </section> */}

            {/* FAQ */}
            <div id="faqs" className="scroll-mt-28">
                <AboutContent faqData={faq} aboutFaqs={faq.faqs} />
            </div>

            {/* Terms */}
            <section id="terms" className="section-shell scroll-mt-28" style={{ background: 'white' }}>
                <div className="container-x">
                    <Reveal className="section-head">
                        <div>
                            <span className="eyebrow mb-2 block">{terms.eyebrow}</span>
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
                    <p className="text-sm text-ink-2 mt-5 mb-0">
                        Questions? Call <a href={contact.phoneHref} className="font-semibold">{contact.phone}</a> or email{' '}
                        <a href={`mailto:${contact.email}`} className="font-semibold">{contact.email}</a>.
                    </p>
                </div>
            </section>



            {/* Closing CTA */}
            <section className="section-shell">
                <div className="container-x">
                    <Reveal>
                        <div className="cta-banner" style={{ paddingBottom: 80 }}>
                            <div className="relative text-5xl mb-3" aria-hidden="true">🎂</div>
                            <h2 className="h1 text-white mb-3 relative">{cta.heading}</h2>
                            <p className="relative text-white/90 max-w-[520px] mx-auto mb-6">{cta.subtitle}</p>
                            <div className="flex gap-3 justify-center flex-wrap relative">
                                <a href={bookHref} className="btn btn-primary">{cta.primaryCtaLabel}</a>
                                <a href="#terms" className="btn btn-glass">Offer terms</a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <Footer location={location} navItems={navItems} locations={strapiLocations} />
            <MobBook location={location} />
        </>
    );
}

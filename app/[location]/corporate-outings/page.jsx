// "use client"; // skip if it's already there

// import { useState } from "react";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { getCorporateOutingsData } from '@/lib/data/corporateOutings';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';
import { AboutContent } from '@/components/AboutContent';
import { CorporateEnquiryForm } from '@/components/corporate/CorporateEnquiryForm';
import { CorporateEnquiryModal } from '@/components/corporate/CorporateEnquiryModal';

export function generateMetadata({ params }) {
    const data = getCorporateOutingsData(params.location);
    if (!data) return {};
    return { title: data.meta.title, description: data.meta.description };
}

function MediaTile({ item, className = '' }) {
    return (
        <div className={`relative overflow-hidden rounded-rl ${className}`}>
            {item.image ? (
                <Image fill sizes="(max-width: 720px) 50vw, 25vw" className="object-cover" src={item.image} alt={item.name} />
            ) : (
                <div className="absolute inset-0" style={{ background: item.gradient }} aria-hidden="true" />
            )}
            <span className="chip chip-white absolute left-3 bottom-3">{item.name}</span>
        </div>
    );
}

export default async function CorporateOutingsPage({ params }) {
    const location = getLocation(params.location);
    const data = getCorporateOutingsData(params.location);
    if (!location || !data) notFound();

    const base = `/${location.slug}`;
    const { contact, hero, intro, benefits, rides, food, banquet, safety, steps, enquiry, faq, cta } = data;

    const formProps = {
        locationSlug: location.slug,
        locationName: location.name,
        outingTypes: enquiry.outingTypes,
        banquetOptions: enquiry.banquetOptions,
        submitLabel: enquiry.submitLabel,
        privacyNote: enquiry.privacyNote,
        successHeading: enquiry.successHeading,
        successBody: enquiry.successBody,
        minLeadDays: enquiry.minLeadDays,
    };
    const [strapiLocations, navItems] = await Promise.all([
        getAllStrapiLocations(),
        getNavItems(location.slug),
    ]);
    // const [banquetExpanded, setBanquetExpanded] = useState(false);

    return (
        <>
            <Navbar location={location} locations={strapiLocations} navItems={navItems} />

            <PageHero
                eyebrow={hero.eyebrow}
                title={<>{hero.titleLead} <em>{hero.titleEm}</em></>}
                subtitle={hero.subtitle}
                breadcrumbs={[{ label: 'Home', href: base }, { label: 'Corporate outings' }]}
                primaryCta={hero.primaryCta}
                secondaryCta={{ label: `Call ${contact.phone}`, href: contact.phoneHref }}
                stats={hero.stats}
                bgImage={hero.bgImage}
                mobileImage={hero.mobileImage}
            />

            {/* Jump links */}
            {/* <nav aria-label="On this page" className="section-shell section-tight" style={{ paddingBottom: 0 }}>
                <div className="container-x">
                    <div className="flex flex-wrap gap-2 max-[720px]:flex-nowrap max-[720px]:overflow-x-auto max-[720px]:pb-1">
                        {data.jumpLinks.map((l) => (
                            <a key={l.href} href={l.href} className="btn btn-outline btn-sm bg-white shrink-0">
                                {l.label}
                            </a>
                        ))}
                    </div>
                </div>
            </nav> */}

            {/* Intro */}
            <section className="section-shell">
                <div className="container-x">
                    <Reveal className="grid grid-cols-[1fr_1.3fr] gap-12 items-start max-[1024px]:grid-cols-1 max-[1024px]:gap-5">
                        <div>
                            <span className="eyebrow mb-3 block">{intro.eyebrow}</span>
                            <h2 className="h2">{intro.heading}</h2>
                        </div>
                        <div>
                            <input type="checkbox" id="intro-readmore" className="peer sr-only" />

                            {intro.paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className={
                                        i === 0
                                            ? "body-lg m-0 line-clamp-2 peer-checked:line-clamp-none"
                                            : "body-lg mt-4 mb-0 hidden peer-checked:block"
                                    }
                                >
                                    {p}
                                </p>
                            ))}

                            <label
                                htmlFor="intro-readmore"
                                className="inline-block mt-2 cursor-pointer text-sm font-semibold text-[#0E7A93] underline underline-offset-4 hover:opacity-80 transition after:content-['Read_more'] peer-checked:after:content-['Read_less']"
                            />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Benefits */}
            <section className="section-shell" style={{ background: 'white' }}>
                <div className="container-x">
                    <Reveal className="section-head">
                        <div>
                            <span className="eyebrow mb-2 block">{benefits.eyebrow}</span>
                            <h2 className="h2">{benefits.heading}</h2>
                        </div>
                    </Reveal>
                    <Reveal className="grid grid-cols-3 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
                        {benefits.cards.map((c) => (
                            <div key={c.title} className="why-card">
                                <div className="why-icon">{c.icon}</div>
                                <h3 className="text-base font-semibold mb-1.5">{c.title}</h3>
                                <p className="text-[13px] text-ink-2 leading-relaxed m-0">{c.desc}</p>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </section>

            {/* Rides */}
            <section id="rides" className="section-shell scroll-mt-28">
                <div className="container-x">
                    <Reveal className="section-head">
                        <div>
                            <span className="eyebrow mb-2 block">{rides.eyebrow}</span>
                            <h2 className="h2 mb-2">{rides.heading}</h2>
                            {/* <p className="text-[15px] text-ink-2 m-0 max-w-[560px]">{rides.subtitle}</p> */}
                        </div>
                        <Link href={`${base}${rides.cta.path}`} className="btn btn-outline btn-sm max-[720px]:hidden">
                            {rides.cta.label}
                        </Link>
                    </Reveal>

                    <Reveal className="grid grid-cols-4 gap-4 mb-4 max-[1024px]:grid-cols-2 max-[720px]:gap-3">
                        {rides.featured.map((r) => (
                            <MediaTile key={r.name} item={r} className="aspect-[4/3] shadow-s2" />
                        ))}
                    </Reveal>

                    {/* <Reveal className="grid grid-cols-3 gap-4 max-[1024px]:grid-cols-1">
                        {rides.groups.map((g) => (
                            <div key={g.title} className="rounded-rl p-6 text-white bg-brand-900">
                                <h3 className="text-lg font-bold mb-3" style={{ color: g.accent }}>{g.title}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {g.rides.map((name) => (
                                        <span key={name} className="rounded-full text-[12px] font-medium px-2.5 py-1 bg-white/10 text-white/90">
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Reveal> */}

                    <Link href={`${base}${rides.cta.path}`} className="btn btn-outline btn-sm mt-5 hidden max-[720px]:inline-flex">
                        {rides.cta.label}
                    </Link>
                </div>
            </section>

            {/* Food */}
            <section id="food" className="section-shell scroll-mt-28" style={{ background: 'white' }}>
                <div className="container-x">
                    <Reveal className="grid grid-cols-2 gap-12 items-center max-[1024px]:grid-cols-1 max-[1024px]:gap-6">
                        <div>
                            <span className="eyebrow mb-3 block">{food.eyebrow}</span>
                            <h2 className="h2 mb-4">{food.heading}</h2>
                            <p className="body-lg mb-5">{food.body}</p>
                            <div className="flex flex-wrap gap-2">
                                {food.outlets.map((o) => (
                                    <span key={o} className="rest-tag">{o}</span>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {food.photos.map((p) => (
                                <MediaTile key={p.name} item={p} className="aspect-[3/4]" />
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Safety */}
            <section className="section-shell">
                <div className="container-x">
                    <Reveal>
                        <div className="safety-band" style={{ paddingBottom: 48 }}>
                            <div className="relative z-[1] grid grid-cols-[1fr_2fr] gap-8 items-center max-[1024px]:grid-cols-1">
                                <div>
                                    <span className="eyebrow eyebrow-sun mb-3 block">{safety.eyebrow}</span>
                                    <h2 className="h1 text-white">{safety.heading}</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-3 max-[520px]:grid-cols-1">
                                    {safety.items.map((s, i) => (
                                        <div
                                            key={s.title}
                                            className={`safety-grid-card flex gap-3 items-start ${i === safety.items.length - 1 && safety.items.length % 2 ? 'col-span-2 max-[520px]:col-span-1' : ''}`}
                                        >
                                            <span className="text-2xl leading-none">{s.icon}</span>
                                            <div>
                                                <h3 className="text-[15px] font-bold mb-0.5">{s.title}</h3>
                                                <p className="text-[13px] text-ink-2 leading-relaxed m-0">{s.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Banquet & R&R */}
            <section id="banquet" className="section-shell scroll-mt-28">
                <div className="container-x">
                    <Reveal className="grid grid-cols-2 gap-12 items-center mb-8 max-[1024px]:grid-cols-1 max-[1024px]:gap-6">
                        <div>
                            <span className="eyebrow mb-3 block">{banquet.eyebrow}</span>
                            <h2 className="h2 mb-4">{banquet.heading}</h2>

                            <input type="checkbox" id="banquet-readmore" className="peer sr-only" />

                            <p className="body-lg m-0 line-clamp-2 peer-checked:line-clamp-none">
                                {banquet.body}
                            </p>

                            <p className="hidden peer-checked:block text-sm text-ink-2 leading-relaxed mt-4 mb-0 max-w-[720px]">
                                {banquet.note}
                            </p>

                            <label
                                htmlFor="banquet-readmore"
                                className="inline-block mt-2 cursor-pointer text-sm font-semibold text-[#0E7A93] underline underline-offset-4 hover:opacity-80 transition after:content-['Read_more'] peer-checked:after:content-['Read_less']"
                            />
                        </div>
                        <div className="rounded-rx overflow-hidden aspect-[16/10] relative max-[720px]:rounded-[24px]">
                            {banquet.image ? (
                                <Image fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" src={banquet.image} alt="Banquet facility at Aqua Imagicaa Indore" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-6xl" style={{ background: 'linear-gradient(135deg, #0E7A93, #22C4DE 60%, #A8ECF3)' }} aria-hidden="true">
                                    🎤
                                </div>
                            )}
                        </div>
                    </Reveal>

                    {/* <Reveal className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
                        {[
                            { list: banquet.provides, bg: 'white', border: '1px solid #CFEEF3', mark: '✓', markBg: '#00A5C8', markColor: 'white' },
                            { list: banquet.arranges, bg: '#FFF6D1', border: '1px solid #FFE58A', mark: '→', markBg: '#0C3B47', markColor: 'white' },
                        ].map(({ list, bg, border, mark, markBg, markColor }) => (
                            <div key={list.title} className="rounded-rl p-6" style={{ background: bg, border }}>
                                <h3 className="text-base font-bold mb-4 flex items-center gap-2.5">
                                    <span className="w-7 h-7 rounded-full inline-flex items-center justify-center text-sm" style={{ background: markBg, color: markColor }}>{mark}</span>
                                    {list.title}
                                </h3>
                                <ul className="m-0 pl-5 space-y-2 text-sm text-ink-2 leading-relaxed list-disc">
                                    {list.items.map((it) => <li key={it}>{it}</li>)}
                                </ul>
                            </div>
                        ))}
                    </Reveal> */}

                </div>
            </section>



            {/* How to plan */}
            {/* <section id="plan" className="section-shell scroll-mt-28" style={{ background: 'white' }}>
                <div className="container-x">
                    <Reveal className="section-head">
                        <div>
                            <span className="eyebrow mb-2 block">{steps.eyebrow}</span>
                            <h2 className="h2">{steps.heading}</h2>
                        </div>
                    </Reveal>
                    <Reveal>
                        <ol className="grid grid-cols-3 gap-4 m-0 p-0 list-none max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
                            {steps.items.map((s, i) => {
                                const last = i === steps.items.length - 1;
                                return (
                                    <li key={s.title} className="why-card flex gap-4 items-start">
                                        <span
                                            className={`w-9 h-9 shrink-0 rounded-full inline-flex items-center justify-center font-bold text-sm ${last ? 'bg-sun text-ink' : 'bg-brand-600 text-white'}`}
                                        >
                                            {i + 1}
                                        </span>
                                        <div>
                                            <h3 className="text-base font-semibold mb-1">{s.title}</h3>
                                            <p className="text-[13px] text-ink-2 leading-relaxed m-0">{s.desc}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </Reveal>
                </div>
            </section> */}

            {/* Enquiry */}
            {/* <section id="enquire" className="section-shell scroll-mt-28">
                <div className="container-x">
                    <div
                        className="rounded-rx p-12 grid grid-cols-[1fr_1.6fr] gap-10 items-start text-white max-[1024px]:grid-cols-1 max-[1024px]:gap-6 max-[720px]:p-5 max-[720px]:rounded-[24px]"
                        style={{ background: 'linear-gradient(135deg, #0A5566 0%, #00A5C8 70%, #22C4DE 100%)' }}
                    >
                        <div className="pt-2">
                            <span className="eyebrow eyebrow-sun mb-3 block">{enquiry.eyebrow}</span>
                            <h2 className="h1 text-white mb-4">{enquiry.heading}</h2>
                            <p className="text-white/85 text-[15px] leading-relaxed mb-6">{enquiry.body}</p>
                            <ul className="m-0 p-0 list-none space-y-2.5 text-[15px]">
                                <li>📞 <a href={contact.phoneHref} className="text-white font-semibold hover:text-sun">{contact.phone}</a></li>
                                <li>✉️ <a href={`mailto:${contact.email}`} className="text-white font-semibold hover:text-sun break-all">{contact.email}</a></li>
                                <li className="text-white/80">⏰ {contact.hours}</li>
                            </ul>
                        </div>
                        <CorporateEnquiryForm {...formProps} />
                    </div>
                </div>
            </section> */}

            {/* FAQ */}
            <div id="faqs" className="scroll-mt-28">
                <AboutContent faqData={faq} aboutFaqs={faq.faqs} />
            </div>

            {/* Closing CTA */}
            {/* <section className="section-shell">
                <div className="container-x">
                    <Reveal>
                        <div className="cta-banner" style={{ paddingBottom: 80 }}>
                            <h2 className="h1 text-white mb-3 relative">{cta.heading}</h2>
                            <p className="relative text-white/90 max-w-[520px] mx-auto mb-6">{cta.subtitle}</p>
                            <div className="flex gap-3 justify-center flex-wrap relative">
                                <a href={cta.primaryCta.href} className="btn btn-primary">{cta.primaryCta.label}</a>
                                <a href={contact.phoneHref} className="btn btn-glass">Call {contact.phone}</a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section> */}

            <Footer location={location} navItems={navItems} locations={strapiLocations} />
            <MobBook location={location} />
            <CorporateEnquiryModal
                trigger={hero.primaryCta.href}
                eyebrow={enquiry.eyebrow}
                heading={enquiry.heading}
                body={enquiry.body}
                contact={contact}
                formProps={formProps}
            />
        </>
    );
}
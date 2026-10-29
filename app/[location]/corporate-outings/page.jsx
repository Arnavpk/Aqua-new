import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { extractCorporateOutings } from '@/lib/extractors/corporateOutingsExtractor';
import { getCorporateOutingsData } from '@/lib/data/corporateOutings';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';
import { AboutContent } from '@/components/AboutContent';
import { CorporateEnquiryForm } from '@/components/corporate/CorporateEnquiryForm';
import { CorporateEnquiryModal } from '@/components/corporate/CorporateEnquiryModal';

// Re-render hourly so Strapi edits show up
export const revalidate = 3600;

export function generateMetadata({ params }) {
    const loc = getLocation(params.location);
    if (!loc) return {};
    const meta = getCorporateOutingsData(params.location)?.meta;
    const name = loc.displayName || loc.name;
    return {
        title: meta?.title || `Corporate Outings | ${name}`,
        description:
            meta?.description ||
            `Plan a corporate outing at ${name}: rides, group meals and banquet access for R&R events.`,
    };
}

/**
 * Accepts any of: "water-park/rides-and-attractions", "/water-park/...",
 * "/indore/water-park/...", "#enquire-popup", "https://…".
 */
function resolveHref(url, base) {
    if (!url) return base;
    if (/^(https?:|mailto:|tel:|#)/.test(url)) return url;
    if (url === base || url.startsWith(`${base}/`)) return url;
    return url.startsWith('/') ? `${base}${url}` : `${base}/${url}`;
}

const DEFAULT_PRIMARY_CTA = { label: 'Plan your corporate outing →', href: '#enquire-popup' };

/* ═════════════════════════════════════════════════════════════════════════════
   IMAGES — put all photos in:  public/images/corporate/
   Set any line to null to show the colour gradient instead (until the photo is ready).
   An image set in lib/data/corporateOutings.js takes priority over these.
   ═════════════════════════════════════════════════════════════════════════ */
const IMAGES = {
    hero: {
        desktop: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1793272279/Desktop_hcla24.jpg', // 2560 × 1200
        mobile: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1793272279/Mobile_s2b6vq.jpg',   // 1080 × 1350
    },
    rides: {                                            // 1200 × 900 (4:3)
        'Cyclone': 'https://res.cloudinary.com/dmjaisk94/image/upload/v1793272417/Cyclone_wkm5ia.jpg',
        'Crusader': 'https://res.cloudinary.com/dmjaisk94/image/upload/v1793272416/Crusader_kmni1t.jpg',
        'Blizzard': 'https://res.cloudinary.com/dmjaisk94/image/upload/v1793272417/Blizzard_czbao7.jpg',
        'Wave Pool': 'https://res.cloudinary.com/dmjaisk94/image/upload/v1793272418/Wave_Pool_vvm09l.jpg',
    },
    food: {                                             // 1080 × 1440 (3:4)
        'Bay View': 'https://res.cloudinary.com/dmjaisk94/image/upload/v1793272614/bay_view_desktop_zaltsb.jpg',
        'Lagoon Feast': 'https://res.cloudinary.com/dmjaisk94/image/upload/v1793272614/lagoon_fest_desktop_yek4pt.jpg',
        'Tropicool': 'https://res.cloudinary.com/dmjaisk94/image/upload/v1793272614/tropi_cool_desktop_ar6xej.jpg',
    },
    banquet: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1793272690/Desktop_1_pglpsq.jpg',          // 2000 × 1250 (16:10)
};

/* `sizes` tell the browser how wide each image shows, so it downloads the right file */
const SIZES = {
    ride: '(max-width: 720px) calc(50vw - 22px), (max-width: 1024px) calc(50vw - 28px), (max-width: 1488px) calc(25vw - 24px), 348px',
    food: '(max-width: 720px) calc(33vw - 19px), (max-width: 1024px) calc(33vw - 21px), (max-width: 1488px) calc(17vw - 24px), 224px',
    banquet: '(max-width: 720px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 40px), (max-width: 1488px) calc(50vw - 48px), 696px',
};

/* ─────────────────────────────────────────────────────────────────────────────
   Image card — used for ride cards and food cards
   ───────────────────────────────────────────────────────────────────────── */
function ImageCard({ name, image, gradient, alt, sizes, className = '' }) {
    return (
        <div className={`group relative overflow-hidden rounded-rl ${className}`}>
            {image ? (
                <Image
                    src={image}
                    alt={alt || name}
                    fill
                    sizes={sizes}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0" style={{ background: gradient }} aria-hidden="true" />
            )}

            {/* Soft dark fade at the bottom so the name pill stands out on any photo */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" aria-hidden="true" />

            <span className="chip chip-white absolute left-3 bottom-3 z-[1]">{name}</span>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Animated wave at the bottom of the hero (same as WaveDivider)
   fill = colour of the section BELOW the hero, so the wave blends into it
   ───────────────────────────────────────────────────────────────────────── */
function HeroWave({ fill = '#EAFBFD' }) {
    return (
        <div className="absolute left-0 right-0 bottom-0 h-[180px] z-[2] pointer-events-none" aria-hidden="true">
            <svg className="wave-svg opacity-40 animate-wave-1" viewBox="0 0 2400 180" preserveAspectRatio="none">
                <path d="M0,110 C300,60 500,150 800,110 C1100,70 1300,140 1600,110 C1900,80 2100,150 2400,110 L2400,180 L0,180 Z" fill={`${fill}66`} />
            </svg>
            <svg className="wave-svg opacity-60 animate-wave-2" viewBox="0 0 2400 180" preserveAspectRatio="none">
                <path d="M0,130 C300,90 500,170 800,130 C1100,90 1300,160 1600,130 C1900,100 2100,170 2400,130 L2400,180 L0,180 Z" fill={`${fill}B3`} />
            </svg>
            <svg className="wave-svg animate-wave-3" viewBox="0 0 2400 180" preserveAspectRatio="none">
                <path d="M0,150 C300,110 500,180 800,150 C1100,120 1300,180 1600,150 C1900,120 2100,180 2400,150 L2400,180 L0,180 Z" fill={fill} />
            </svg>
        </div>
    );
}

/* Reads a stat's number + label whatever the field names are in the data */
function getStatParts(s) {
    if (s == null) return ['', ''];
    if (typeof s === 'string' || typeof s === 'number') return [s, ''];
    const value = s.value ?? s.num ?? s.number ?? s.n ?? s.stat ?? s.count ?? s.big ?? s.title;
    const label = s.label ?? s.text ?? s.l ?? s.desc ?? s.caption ?? s.small ?? s.subtitle;
    if (value != null || label != null) return [value ?? '', label ?? ''];
    const vals = Object.values(s).filter((v) => typeof v === 'string' || typeof v === 'number');
    return [vals[0] ?? '', vals[1] ?? ''];
}

/* ─────────────────────────────────────────────────────────────────────────────
   Hero — image only, no text on top
   Desktop (> 720px): 2560 × 1200 image → aspect 32/15, full width
   Mobile  (≤ 720px): 1080 × 1350 image → aspect 4/5,   full width
   ───────────────────────────────────────────────────────────────────────── */
function HeroImage({ desktopImage, mobileImage, alt = '' }) {
    const fallback = (
        <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #0A5566 0%, #00A5C8 70%, #22C4DE 100%)' }}
            aria-hidden="true"
        />
    );

    return (
        <section aria-label={alt || 'Hero'} className="relative w-full overflow-hidden">
            {/* Desktop */}
            <div className="relative w-full aspect-[32/15] max-[720px]:hidden">
                {desktopImage ? (
                    <Image src={desktopImage} alt={alt} fill priority sizes="100vw" className="object-cover" />
                ) : fallback}
            </div>

            {/* Mobile — uses the desktop image if no mobile crop is set */}
            <div className="relative w-full aspect-[4/5] hidden max-[720px]:block">
                {mobileImage || desktopImage ? (
                    <Image src={mobileImage || desktopImage} alt={alt} fill priority sizes="100vw" className="object-cover" />
                ) : fallback}
            </div>

            {/* Wave — white, to blend into the white intro section below */}
            <HeroWave fill="#FFFFFF" />
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Hero intro — all the text that used to sit on the hero image
   ───────────────────────────────────────────────────────────────────────── */
function HeroIntro({ eyebrow, title, subtitle, breadcrumbs = [], primaryCta, secondaryCta, stats = [] }) {
    return (
        <section className="section-shell section-tight" style={{ background: 'white' }}>
            <div className="container-x">
                {/* Breadcrumbs */}
                {breadcrumbs.length > 0 && (
                    <nav aria-label="Breadcrumb" className="mb-5">
                        <ol className="flex flex-wrap items-center gap-1.5 m-0 p-0 list-none text-sm text-ink-2">
                            {breadcrumbs.map((b, i) => {
                                const last = i === breadcrumbs.length - 1;
                                return (
                                    <li key={`${b.label}-${i}`} className="flex items-center gap-1.5">
                                        {b.href && !last ? (
                                            <Link href={b.href} className="hover:text-[#0E7A93] transition">
                                                {b.label}
                                            </Link>
                                        ) : (
                                            <span aria-current={last ? 'page' : undefined} className={last ? 'font-semibold text-ink' : ''}>
                                                {b.label}
                                            </span>
                                        )}
                                        {!last && <span aria-hidden="true">/</span>}
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>
                )}

                <div className="grid grid-cols-[1.4fr_1fr] gap-12 items-end max-[1024px]:grid-cols-1 max-[1024px]:gap-8">
                    {/* Text + buttons */}
                    <div>
                        {eyebrow && <span className="eyebrow mb-3 block">{eyebrow}</span>}
                        <h1 className="h1 mb-4">{title}</h1>
                        {subtitle && <p className="body-lg m-0 max-w-[640px]">{subtitle}</p>}

                        {(primaryCta || secondaryCta) && (
                            <div className="flex flex-wrap gap-3 mt-6">
                                {/* Plain <a> so CorporateEnquiryModal still picks up primaryCta.href */}
                                {primaryCta && (
                                    <a href={primaryCta.href} className="btn btn-primary">
                                        {primaryCta.label}
                                    </a>
                                )}
                                {secondaryCta && (
                                    <a href={secondaryCta.href} className="btn btn-outline">
                                        {secondaryCta.label}
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    {stats.length > 0 && (
                        <dl className="grid grid-cols-2 gap-3 m-0">
                            {stats.map((s, i) => {
                                const [value, label] = getStatParts(s);
                                return (
                                    <div key={i} className="why-card flex flex-col">
                                        <dt className="text-[13px] text-ink-2 m-0 order-2">{label}</dt>
                                        <dd className="text-2xl font-extrabold text-[#0E7A93] m-0 mb-1 order-1">
                                            {value}
                                        </dd>
                                    </div>
                                );
                            })}
                        </dl>
                    )}
                </div>
            </div>
        </section>
    );
}

export default async function CorporateOutingsPage({ params }) {
    const location = getLocation(params.location);
    if (!location) notFound();

    const [page, strapiLocations, navItems] = await Promise.all([
        getPage(location.slug, 'pages', 'corporate-outings').catch(() => null),
        getAllStrapiLocations(),
        getNavItems(location.slug),
    ]);

    // Strapi first, section by section; static content only fills the gaps.
    const fromStrapi = extractCorporateOutings(page);
    const fallback = getCorporateOutingsData(location.slug) || {};
    // Field by field: an empty Strapi field never wipes out the static text
    const isEmpty = (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0);
    const pick = (key) => {
        const s = fromStrapi[key];
        const f = fallback[key];
        if (!s) return f || null;
        if (!f) return s;
        const merged = { ...f };
        for (const [k, v] of Object.entries(s)) if (!isEmpty(v)) merged[k] = v;
        return merged;
    };

    const hero = pick('hero');
    const intro = pick('intro');
    const benefits = pick('benefits');
    const rides = pick('rides');
    const food = pick('food');
    const banquet = pick('banquet');
    const safety = pick('safety');
    const enquiry = pick('enquiry') || {};
    const faq = pick('faq');
    const contact = pick('contact') || {};
    // steps / cta sections are hidden on the page for now
    const steps = fallback.steps;
    const cta = fallback.cta;

    if (!page && !fallback.hero) notFound();

    const base = `/${location.slug}`;
    const primaryCta = hero?.primaryCta?.label ? hero.primaryCta : DEFAULT_PRIMARY_CTA;

    // Images: Strapi / data file first, then the IMAGES list above
    const heroDesktop = hero?.bgImage || IMAGES.hero.desktop;
    const heroMobile = hero?.mobileImage || IMAGES.hero.mobile;
    const banquetImage = banquet?.image || IMAGES.banquet;

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

    return (
        <>
            <Navbar location={location} locations={strapiLocations} navItems={navItems} />

            {/* Hero — image only */}
            <HeroImage
                desktopImage={heroDesktop}
                mobileImage={heroMobile}
                alt={`Corporate outings at Aqua Imagicaa ${location.name}`}
            />

            {/* Hero text — below the image */}
            <HeroIntro
                eyebrow={hero?.eyebrow}
                title={<>{hero?.titleLead}{hero?.titleEm ? <> <em>{hero.titleEm}</em></> : null}</>}
                subtitle={hero?.subtitle}
                // breadcrumbs={[{ label: 'Home', href: base }, { label: 'Corporate outings' }]}
                primaryCta={primaryCta}
                secondaryCta={contact.phone ? { label: `Call ${contact.phone}`, href: contact.phoneHref } : null}
                stats={hero?.stats || []}
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
            {intro && (
                <section className="section-shell">
                    <div className="container-x">
                        <Reveal className="grid grid-cols-[1fr_1.3fr] gap-12 items-start max-[1024px]:grid-cols-1 max-[1024px]:gap-5">
                            <div>
                                <span className="eyebrow mb-3 block">{intro.eyebrow}</span>
                                <h2 className="h2">{intro.heading}</h2>
                            </div>
                            <div>
                                <input type="checkbox" id="intro-readmore" className="peer sr-only" />

                                {(intro.paragraphs || []).map((p, i) => (
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
            )}

            {/* Benefits */}
            {benefits && (
                <section className="section-shell" style={{ background: 'white' }}>
                    <div className="container-x">
                        <Reveal className="section-head">
                            <div>
                                <span className="eyebrow mb-2 block">{benefits.eyebrow}</span>
                                <h2 className="h2">{benefits.heading}</h2>
                            </div>
                        </Reveal>
                        <Reveal className="grid grid-cols-3 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
                            {(benefits.cards || []).map((c) => (
                                <div key={c.title} className="why-card">
                                    <div className="why-icon">{c.icon}</div>
                                    <h3 className="text-base font-semibold mb-1.5">{c.title}</h3>
                                    <p className="text-[13px] text-ink-2 leading-relaxed m-0">{c.desc}</p>
                                </div>
                            ))}
                        </Reveal>
                    </div>
                </section>
            )}

            {/* Rides */}
            {rides && (
                <section id="rides" className="section-shell scroll-mt-28">
                    <div className="container-x">
                        <Reveal className="section-head">
                            <div>
                                <span className="eyebrow mb-2 block">{rides.eyebrow}</span>
                                <h2 className="h2 mb-2">{rides.heading}</h2>
                                {/* <p className="text-[15px] text-ink-2 m-0 max-w-[560px]">{rides.subtitle}</p> */}
                            </div>
                            {rides.cta && (
                                <Link href={resolveHref(rides.cta.path, base)} className="btn btn-outline btn-sm max-[720px]:hidden">
                                    {rides.cta.label}
                                </Link>
                            )}
                        </Reveal>

                        <Reveal className="grid grid-cols-4 gap-4 mb-4 max-[1024px]:grid-cols-2 max-[720px]:gap-3">
                            {(rides.featured || []).map((r) => (
                                <ImageCard
                                    key={r.name}
                                    name={r.name}
                                    image={r.image || IMAGES.rides[r.name]}
                                    gradient={r.gradient}
                                    alt={`${r.name} ride at Aqua Imagicaa ${location.name}`}
                                    sizes={SIZES.ride}
                                    className="aspect-[4/3] shadow-s2"
                                />
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

                        {rides.cta && (
                            <Link href={resolveHref(rides.cta.path, base)} className="btn btn-outline btn-sm mt-5 hidden max-[720px]:inline-flex">
                                {rides.cta.label}
                            </Link>
                        )}
                    </div>
                </section>
            )}

            {/* Food */}
            {food && (
                <section id="food" className="section-shell scroll-mt-28" style={{ background: 'white' }}>
                    <div className="container-x">
                        <Reveal className="grid grid-cols-2 gap-12 items-center max-[1024px]:grid-cols-1 max-[1024px]:gap-6">
                            <div>
                                <span className="eyebrow mb-3 block">{food.eyebrow}</span>
                                <h2 className="h2 mb-4">{food.heading}</h2>
                                <p className="body-lg mb-5">{food.body}</p>
                                <div className="flex flex-wrap gap-2">
                                    {(food.outlets || []).map((o) => (
                                        <span key={o} className="rest-tag">{o}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {(food.photos || []).map((p) => (
                                    <ImageCard
                                        key={p.name}
                                        name={p.name}
                                        image={p.image || IMAGES.food[p.name]}
                                        gradient={p.gradient}
                                        alt={`${p.name} at Aqua Imagicaa ${location.name}`}
                                        sizes={SIZES.food}
                                        className="aspect-[3/4]"
                                    />
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>
            )}

            {/* Safety */}
            {safety && (
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
                                        {(safety.items || []).map((s, i) => (
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
            )}

            {/* Banquet & R&R */}
            {banquet && (
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
                                {banquetImage ? (
                                    <Image
                                        fill
                                        sizes={SIZES.banquet}
                                        className="object-cover"
                                        src={banquetImage}
                                        alt={`Banquet facility at Aqua Imagicaa ${location.name}`}
                                    />
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
            )}

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
            {faq?.faqs?.length > 0 && (
                <div id="faqs" className="scroll-mt-28">
                    <AboutContent faqData={faq} aboutFaqs={faq.faqs} />
                </div>
            )}

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
                trigger={primaryCta.href}
                eyebrow={enquiry.eyebrow}
                heading={enquiry.heading}
                body={enquiry.body}
                contact={contact}
                formProps={formProps}
            />
        </>
    );
}

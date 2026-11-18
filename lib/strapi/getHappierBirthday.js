import { cache } from 'react';
import { getPage, DEFAULT_PAGE_POPULATE } from './getPage';

// Fetches the Happier Birthday page from Strapi (Pages collection, slug "happier-birthday")
// and maps its dynamic-zone sections to the shape page.jsx renders.
// Every empty field comes back as null and every empty list as [], so the page can hide it.
//
// Section order in the Page's dynamic zone:
//   1. sections.page-hero
//   2. sections.experience-grid   → the offer cards (FREE / ₹599)
//   3. sections.experience-grid   → the experience tiles (with images)
//   4. sections.faq
//   5. sections.offer-terms       (new component, used only on this page)
//   6. sections.cta-banner
// The two experience-grids are told apart by order: the first is the offer, the second the tiles.

const PAGE_SLUG = 'happier-birthday';
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

// Name of the SEO component field on the Page content type.
// Leave null until that field exists on Page, otherwise Strapi rejects the request ("Invalid key").
// Once you add it (e.g. a single component field named "seo"), set this to 'seo'.
const SEO_FIELD = null;

const POPULATE = SEO_FIELD ? { ...DEFAULT_PAGE_POPULATE, [SEO_FIELD]: true } : DEFAULT_PAGE_POPULATE;

// Trimmed string, or null when empty.
const str = (v) => (typeof v === 'string' && v.trim() ? v.trim() : null);

// Strapi media → { url, width, height, alt }, or null when nothing is uploaded.
function media(m) {
    const url = str(m?.url);
    if (!url) return null;
    return {
        url: url.startsWith('http') ? url : `${STRAPI_URL}${url}`,
        width: m.width || null,
        height: m.height || null,
        alt: str(m.alternativeText) || '',
    };
}

const pickAll = (sections, uid) => sections.filter((s) => s.__component === uid);
const pick = (sections, uid) => pickAll(sections, uid)[0] || null;

const telHref = (phone) => (phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : null);

// "₹599 + tax / person" → big "₹599", suffix "+ tax / person". "FREE" → big "FREE".
function splitStat(stat) {
    const s = str(stat);
    if (!s) return { big: null, suffix: null };
    const [big, ...rest] = s.split(/\s+/);
    return { big, suffix: rest.join(' ') || null };
}

function mapHero(s) {
    if (!s) return null;
    const bg = media(s.background_image);
    const mobile = media(s.mobile_image);
    const secondaryLabel = str(s.secondary_cta_label);
    const hero = {
        eyebrow: str(s.eyebrow),
        title: str(s.heading),
        subtitle: str(s.subtitle),
        primaryCtaLabel: str(s.primary_cta_label),
        primaryCtaHref: str(s.primary_cta_url),
        secondaryCta: secondaryLabel ? { label: secondaryLabel, href: str(s.secondary_cta_url) || '#terms' } : null,
        // If only one image is uploaded, use it on both desktop and mobile.
        bg: bg || mobile,
        mobile: mobile || bg,
    };
    hero.hasText = Boolean(hero.eyebrow || hero.title || hero.subtitle || hero.primaryCtaLabel || hero.secondaryCta);
    if (!hero.hasText && !hero.bg) return null;
    return hero;
}

// Button under an experience-grid (new optional fields cta_label / cta_url on the component).
// The button shows only when cta_label is filled; an empty cta_url uses the hero's booking link.
const gridCta = (s) => ({ ctaLabel: str(s.cta_label), ctaHref: str(s.cta_url) });

// Offer cards from the first experience-grid:
// badge → small kicker line, stat → big number (+ suffix), title, description, tone.
function mapOffer(s) {
    if (!s) return null;
    const cards = (s.cards || [])
        .map((c) => {
            const { big, suffix } = splitStat(c.stat);
            return {
                tone: str(c.tone),
                kicker: str(c.badge),
                big,
                bigSuffix: suffix,
                title: str(c.title),
                desc: str(c.description),
            };
        })
        .filter((c) => c.kicker || c.big || c.title || c.desc);
    const offer = { eyebrow: str(s.eyebrow), heading: str(s.heading), cards, ...gridCta(s) };
    return offer.eyebrow || offer.heading || cards.length || offer.ctaLabel ? offer : null;
}

// Experience tiles from the second experience-grid.
function mapExperiences(s) {
    if (!s) return null;
    const tiles = (s.cards || [])
        .map((c) => ({ name: str(c.title), image: media(c.image) }))
        .filter((t) => t.name || t.image);
    const exp = { eyebrow: str(s.eyebrow), heading: str(s.heading), tiles, ...gridCta(s) };
    return exp.eyebrow || exp.heading || tiles.length || exp.ctaLabel ? exp : null;
}

function mapFaq(s) {
    if (!s) return null;
    const faqs = (s.faqs || [])
        .map((f) => ({ q: str(f.question), a: str(f.answer) }))
        .filter((f) => f.q && f.a);
    if (!faqs.length) return null;
    return { eyebrow: str(s.eyebrow), heading: str(s.heading), faqs };
}

// Turns the terms-content Markdown into one string per term.
// Write one term per line, as a numbered (1.) or bulleted (-) list.
// An indented line continues the term above it.
function parseTerms(markdown) {
    const items = [];
    for (const line of (markdown || '').split(/\r?\n/)) {
        if (!line.trim()) continue;
        const listItem = line.match(/^\s*(?:\d+[.)]|[-*+])\s+(.*)$/);
        if (listItem) items.push(listItem[1]);
        else if (/^\s{2,}/.test(line) && items.length) items[items.length - 1] += ` ${line.trim()}`;
        else items.push(line.trim());
    }
    // Strip bold/italic markers so they don't show as raw asterisks.
    return items.map((t) => t.replace(/(\*\*|__)(.+?)\1/g, '$2').replace(/(\*|_)(.+?)\1/g, '$2').trim()).filter(Boolean);
}

// New component: sections.offer-terms (terms = nested sections.terms-content)
function mapTerms(s) {
    if (!s) return null;
    const phone = str(s.contact_phone);
    const email = str(s.contact_email);
    const terms = {
        eyebrow: str(s.eyebrow),
        heading: str(s.heading),
        items: parseTerms(s.terms?.body),
        contact: { phone, phoneHref: telHref(phone), email },
    };
    return terms.heading || terms.items.length || phone || email ? terms : null;
}

function mapCta(s) {
    if (!s) return null;
    const cta = {
        heading: str(s.heading),
        subtitle: str(s.subtitle), // new optional field on cta-banner
        ctaLabel: str(s.cta_label),
        ctaHref: str(s.cta_url),
    };
    return cta.heading || cta.subtitle || cta.ctaLabel ? cta : null;
}

// cache() so generateMetadata and the page share one request per render.
export const getHappierBirthdayPage = cache(async (location) => {
    const page = await getPage(location, 'pages', PAGE_SLUG, POPULATE);
    if (!page) return null;

    const sections = page.sections || [];
    const hero = mapHero(pick(sections, 'sections.page-hero'));
    const [offerGrid, experienceGrid] = pickAll(sections, 'sections.experience-grid');
    const seo = (SEO_FIELD && page[SEO_FIELD]) || null;

    return {
        meta: {
            title: str(seo?.meta_title) || str(page.title),
            description: str(seo?.meta_description) || hero?.subtitle || null,
        },
        pageTitle: str(page.title),
        bookingHref: hero?.primaryCtaHref || null,
        hero,
        offer: mapOffer(offerGrid),
        experiences: mapExperiences(experienceGrid),
        faq: mapFaq(pick(sections, 'sections.faq')),
        terms: mapTerms(pick(sections, 'sections.offer-terms')),
        cta: mapCta(pick(sections, 'sections.cta-banner')),
    };
});
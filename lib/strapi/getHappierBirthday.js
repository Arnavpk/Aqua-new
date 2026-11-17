import { cache } from 'react';
import { getPage, DEFAULT_PAGE_POPULATE } from './getPage';

// Fetches the Happier Birthday page from Strapi (Pages collection, slug "happier-birthday")
// and maps its dynamic-zone sections to the shape page.jsx renders.
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

// Swap for your existing media helper if you have one.
function mediaUrl(media) {
    const url = media?.url;
    if (!url) return null;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

const pickAll = (sections, uid) => sections.filter((s) => s.__component === uid);
const pick = (sections, uid) => pickAll(sections, uid)[0] || null;

const telHref = (phone) => (phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : null);

// "₹599 + tax / person" → big "₹599", suffix "+ tax / person". "FREE" → big "FREE".
function splitStat(stat) {
    const [big = '', ...rest] = (stat || '').trim().split(/\s+/);
    return { big, suffix: rest.join(' ') || null };
}

function mapHero(s) {
    if (!s) return null;
    return {
        eyebrow: s.eyebrow,
        title: s.heading,
        subtitle: s.subtitle,
        primaryCtaLabel: s.primary_cta_label,
        primaryCtaHref: s.primary_cta_url,
        secondaryCta: s.secondary_cta_label
            ? { label: s.secondary_cta_label, href: s.secondary_cta_url || '#terms' }
            : null,
        bgImage: mediaUrl(s.background_image),
        mobileImage: mediaUrl(s.mobile_image),
    };
}

// Offer cards from the first experience-grid:
// badge → small kicker line, stat → big number (+ suffix), title, description, tone.
function mapOffer(s) {
    if (!s) return null;
    return {
        eyebrow: s.eyebrow,
        heading: s.heading,
        cards: (s.cards || []).map((c) => {
            const { big, suffix } = splitStat(c.stat);
            return {
                tone: c.tone,
                kicker: c.badge,
                big,
                bigSuffix: suffix,
                title: c.title,
                desc: c.description,
            };
        }),
    };
}

// Experience tiles from the second experience-grid.
function mapExperiences(s) {
    if (!s) return null;
    return {
        eyebrow: s.eyebrow,
        heading: s.heading,
        tiles: (s.cards || []).map((c) => ({
            name: c.title,
            image: mediaUrl(c.image),
        })),
    };
}

function mapFaq(s) {
    if (!s) return null;
    return {
        eyebrow: s.eyebrow,
        heading: s.heading,
        faqs: (s.faqs || []).map((f) => ({ q: f.question, a: f.answer })),
    };
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
    return {
        eyebrow: s.eyebrow,
        heading: s.heading,
        items: parseTerms(s.terms?.body),
        contact: {
            phone: s.contact_phone,
            phoneHref: telHref(s.contact_phone),
            email: s.contact_email,
        },
    };
}

function mapCta(s) {
    if (!s) return null;
    return {
        heading: s.heading,
        subtitle: s.subtitle, // new optional field on cta-banner
        ctaLabel: s.cta_label,
        ctaHref: s.cta_url,
    };
}

// cache() so generateMetadata and the page share one request per render.
export const getHappierBirthdayPage = cache(async (location) => {
    const page = await getPage(location, 'pages', PAGE_SLUG, POPULATE);
    if (!page) return null;

    const sections = page.sections || [];
    const hero = mapHero(pick(sections, 'sections.page-hero'));
    if (!hero) return null;

    const [offerGrid, experienceGrid] = pickAll(sections, 'sections.experience-grid');
    const seo = (SEO_FIELD && page[SEO_FIELD]) || null;

    return {
        meta: {
            title: seo?.meta_title || page.title,
            description: seo?.meta_description || hero.subtitle,
        },
        pageTitle: page.title,
        bookingHref: hero.primaryCtaHref,
        hero,
        offer: mapOffer(offerGrid),
        experiences: mapExperiences(experienceGrid),
        faq: mapFaq(pick(sections, 'sections.faq')),
        terms: mapTerms(pick(sections, 'sections.offer-terms')),
        cta: mapCta(pick(sections, 'sections.cta-banner')),
    };
});
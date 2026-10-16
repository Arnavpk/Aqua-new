// Shapes the "water-park" Pages entry from Strapi into the props the
// water-park page components expect. Each extractor returns null when its
// section is missing, so the page can fall back to lib/data/waterPark.js.
//
// Works with both Strapi v5 (flat) and v4 (attributes / data wrappers).

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || '').replace(/\/$/, '');

const unwrap = (entry) => (entry?.attributes ? { id: entry.id, ...entry.attributes } : entry);

function mediaUrl(media) {
    if (!media) return null;
    let file = media.data !== undefined ? media.data : media; // v4 wraps media in { data }
    if (Array.isArray(file)) file = file[0];
    const url = unwrap(file)?.url;
    if (!url) return null;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

function findSection(page, component) {
    const sections = unwrap(page)?.sections || [];
    return sections.find((s) => s.__component === component) || null;
}

const toCta = (c) => (c?.label ? { label: c.label, href: c.url || '' } : null);

/** sections.hero — the existing home Hero component, reused here. */
export function extractWaterParkHero(page) {
    const s = findSection(page, 'sections.hero');
    if (!s) return null;
    const title = [s.title_line_1, s.title_line_2].filter(Boolean).join(' ');
    if (!title) return null;
    return {
        eyebrow: s.eyebrow || null,
        title,
        subtitle: s.subtitle || null,
        primaryCta: toCta(s.primary_cta),
        secondaryCta: toCta(s.secondary_cta),
        video: mediaUrl(s.video),
        mobileVideo: null,
        poster: mediaUrl(s.video_poster),
    };
}

/** sections.experience-grid */
export function extractExperienceGrid(page) {
    const s = findSection(page, 'sections.experience-grid');
    if (!s?.cards?.length) return null;
    return {
        eyebrow: s.eyebrow || null,
        heading: s.heading || '',
        items: s.cards.map((c) => ({
            key: c.id ? `card-${c.id}` : c.title,
            title: c.title,
            desc: c.description || '',
            badge: c.badge || null,
            stat: c.stat || null,
            icon: c.icon && c.icon !== 'none' ? c.icon : null,
            tone: c.tone || 'deep',
            image: mediaUrl(c.image),
            mobileImage: mediaUrl(c.mobile_image),
            validUntil: c.valid_until || null,
        })),
    };
}

/** sections.price-cards */
export function extractPriceCards(page) {
    const s = findSection(page, 'sections.price-cards');
    if (!s?.prices?.length) return null;
    return {
        eyebrow: s.eyebrow || null,
        heading: s.heading || '',
        cta: toCta(s.cta),
        note: s.note || null,
        prices: s.prices.map((p) => ({
            label: p.label,
            mrp: p.original_price ?? null,
            price: p.offer_price,
        })),
    };
}

export function extractWaterPark(page) {
    if (!page) return { hero: null, experiences: null, pricing: null };
    return {
        hero: extractWaterParkHero(page),
        experiences: extractExperienceGrid(page),
        pricing: extractPriceCards(page),
    };
}
import { getStrapiMedia } from '@/lib/strapi/media';

/**
 * Maps the Strapi "corporate-outings" page (pages collection) to the same shape as
 * lib/data/corporateOutings.js, so page.jsx can use Strapi first and fall back to the
 * static data section by section.
 *
 * Reuses existing section components wherever they fit. The enquiry popup text and
 * contact details stay in lib/data/corporateOutings.js (not in Strapi).
 *
 *   Page section   Strapi component                 Notes
 *   ─────────────  ───────────────────────────────  ─────────────────────────────────────────
 *   Hero           sections.page-hero               image + mobile image + text
 *   Hero stats     sections.about-stats             stats_text: "20+,Rides & attractions,6,Food outlets"
 *   Intro          sections.about-story  (1st one)  paragraphs: one per line
 *   Benefits       sections.why-choose              cards
 *   Rides          sections.experience-grid         cards: title + image
 *   Food           sections.food-dining   (NEW)     body, outlets (one per line), photos
 *   Safety         sections.safety-band             subtitle shows as the small eyebrow text
 *   Banquet        sections.about-story  (2nd one)  line 1 = main text, next lines = "Read more" text
 *   FAQ            sections.faq                     faqs
 *
 * Every key is left out when its section isn't in Strapi, so `fromStrapi.x || fallback.x` works.
 */

const DEFAULT_GRADIENTS = [
    'linear-gradient(135deg, #FF7A9C, #FFD84D)',
    'linear-gradient(135deg, #0E7A93, #5FDDEA)',
    'linear-gradient(135deg, #00A5C8, #A8ECF3)',
    'linear-gradient(135deg, #22C4DE, #3FE0A5)',
];

const sectionsOf = (entry, name) =>
    (entry?.sections || []).filter((s) => s.__component === `sections.${name}`);

const findSection = (entry, name) => sectionsOf(entry, name)[0] || null;

const lines = (text) =>
    (text || '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

const iconCard = (c) => ({ icon: c.icon || '', title: c.title || '', desc: c.description || '' });

const gradientAt = (i) => DEFAULT_GRADIENTS[i % DEFAULT_GRADIENTS.length];

// "20+,Rides & attractions,6,Food outlets" → [{ n: '20+', l: 'Rides & attractions' }, …]
function parseStats(text) {
    const parts = (text || '').split(',').map((s) => s.trim()).filter(Boolean);
    const stats = [];
    for (let i = 0; i < parts.length - 1; i += 2) stats.push({ n: parts[i], l: parts[i + 1] });
    return stats;
}

export function extractCorporateOutings(entry) {
    const out = {};
    if (!entry) return out;

    /* ── Hero: sections.page-hero + sections.about-stats ─────────────────── */
    const hero = findSection(entry, 'page-hero');
    const stats = findSection(entry, 'about-stats');
    if (hero || stats) {
        const title =
            hero?.title ||
            [hero?.title_line_1, hero?.title_line_2].filter(Boolean).join(' ') ||
            hero?.heading ||
            '';
        out.hero = {
            eyebrow: hero?.eyebrow || '',
            titleLead: title,
            titleEm: '',
            subtitle: hero?.subtitle || hero?.description || '',
            bgImage: getStrapiMedia(hero?.background_image),
            mobileImage: getStrapiMedia(hero?.mobile_image),
            stats: parseStats(stats?.stats_text),
        };
    }

    /* ── Intro (1st about-story) + Banquet (2nd about-story) ─────────────── */
    const [introStory, banquetStory] = sectionsOf(entry, 'about-story');

    if (introStory) {
        out.intro = {
            eyebrow: introStory.eyebrow || '',
            heading: introStory.heading || '',
            paragraphs: lines(introStory.paragraphs),
        };
    }

    if (banquetStory) {
        const [body = '', ...rest] = lines(banquetStory.paragraphs);
        out.banquet = {
            eyebrow: banquetStory.eyebrow || '',
            heading: banquetStory.heading || '',
            body,
            note: rest.join(' '),
            image: getStrapiMedia(banquetStory.image),
        };
    }

    /* ── Benefits: sections.why-choose ───────────────────────────────────── */
    const why = findSection(entry, 'why-choose');
    if (why) {
        out.benefits = {
            eyebrow: why.eyebrow || '',
            heading: why.heading || '',
            cards: (why.cards || []).map(iconCard),
        };
    }

    /* ── Rides: sections.experience-grid ─────────────────────────────────── */
    const grid = findSection(entry, 'experience-grid');
    if (grid) {
        out.rides = {
            eyebrow: grid.eyebrow || '',
            heading: grid.heading || '',
            featured: (grid.cards || [])
                .filter((c) => c.title)
                .map((c, i) => ({
                    name: c.title,
                    image: getStrapiMedia(c.image),
                    gradient: gradientAt(i),
                })),
        };
    }

    /* ── Food: sections.food-dining (new) ────────────────────────────────── */
    const food = findSection(entry, 'food-dining');
    if (food) {
        out.food = {
            eyebrow: food.eyebrow || '',
            heading: food.heading || '',
            body: food.body || '',
            outlets: lines(food.outlets),
            // photos use the same tile component as the Gallery: tag = outlet name
            photos: (food.photos || [])
                .filter((p) => p.tag)
                .map((p, i) => ({
                    name: p.tag,
                    image: getStrapiMedia(p.image),
                    gradient: gradientAt(i + 1),
                })),
        };
    }

    /* ── Safety: sections.safety-band ────────────────────────────────────── */
    const safety = findSection(entry, 'safety-band');
    if (safety) {
        out.safety = {
            eyebrow: safety.subtitle || '',
            heading: safety.heading || '',
            items: (safety.items || []).map(iconCard),
        };
    }

    /* ── FAQ: sections.faq ───────────────────────────────────────────────── */
    const faq = findSection(entry, 'faq');
    if (faq) {
        out.faq = {
            eyebrow: faq.eyebrow || '',
            heading: faq.heading || '',
            faqs: (faq.faqs || [])
                .filter((f) => f.question)
                .map((f) => ({ q: f.question, a: f.answer || '' })),
        };
    }

    return out;
}
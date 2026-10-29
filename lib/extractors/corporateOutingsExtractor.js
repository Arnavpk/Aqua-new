import { getStrapiMedia } from '@/lib/strapi/media';

/**
 * Maps the Strapi "corporate-outings" page (pages collection) to the same shape as
 * lib/data/corporateOutings.js, so page.jsx can use Strapi first and fall back to the
 * static data section by section.
 *
 * Every key is left out when its section isn't in Strapi, so `fromStrapi.x || fallback.x` works.
 *
 * Text-list fields in Strapi (outlets, outing_types, banquet_options): one item per line.
 * Intro body: paragraphs separated by a blank line.
 */

const DEFAULT_GRADIENTS = [
    'linear-gradient(135deg, #FF7A9C, #FFD84D)',
    'linear-gradient(135deg, #0E7A93, #5FDDEA)',
    'linear-gradient(135deg, #00A5C8, #A8ECF3)',
    'linear-gradient(135deg, #22C4DE, #3FE0A5)',
];

const findSection = (entry, name) =>
    (entry?.sections || []).find((s) => s.__component === `sections.${name}`);

const lines = (text) =>
    (text || '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

const paragraphs = (text) =>
    (text || '').split(/\r?\n\s*\r?\n/).map((s) => s.replace(/\s*\r?\n\s*/g, ' ').trim()).filter(Boolean);

const cta = (c) => (c?.label ? { label: c.label, href: c.href || '' } : null);

const iconCard = (c) => ({ icon: c.icon || '', title: c.title || '', desc: c.description || '' });

const mediaCard = (c, i) => ({
    name: c.name,
    image: getStrapiMedia(c.image),
    gradient: c.gradient || DEFAULT_GRADIENTS[i % DEFAULT_GRADIENTS.length],
});

export function extractCorporateOutings(entry) {
    const out = {};
    if (!entry) return out;

    const hero = findSection(entry, 'corporate-hero');
    if (hero) {
        out.hero = {
            eyebrow: hero.eyebrow || '',
            titleLead: hero.title_lead || '',
            titleEm: hero.title_em || '',
            subtitle: hero.subtitle || '',
            primaryCta: cta(hero.primary_cta),
            bgImage: getStrapiMedia(hero.image),
            mobileImage: getStrapiMedia(hero.mobile_image),
            stats: (hero.stats || []).map((s) => ({ n: s.number || '', l: s.label || '' })),
        };
    }

    const intro = findSection(entry, 'corporate-intro');
    if (intro) {
        out.intro = {
            eyebrow: intro.eyebrow || '',
            heading: intro.heading || '',
            paragraphs: paragraphs(intro.body),
        };
    }

    const benefits = findSection(entry, 'corporate-benefits');
    if (benefits) {
        out.benefits = {
            eyebrow: benefits.eyebrow || '',
            heading: benefits.heading || '',
            cards: (benefits.cards || []).map(iconCard),
        };
    }

    const rides = findSection(entry, 'corporate-rides');
    if (rides) {
        const c = cta(rides.cta);
        out.rides = {
            eyebrow: rides.eyebrow || '',
            heading: rides.heading || '',
            subtitle: rides.subtitle || '',
            cta: c ? { label: c.label, path: c.href } : null,
            featured: (rides.featured || []).map(mediaCard),
        };
    }

    const food = findSection(entry, 'corporate-food');
    if (food) {
        out.food = {
            eyebrow: food.eyebrow || '',
            heading: food.heading || '',
            body: food.body || '',
            outlets: lines(food.outlets),
            photos: (food.photos || []).map(mediaCard),
        };
    }

    const banquet = findSection(entry, 'corporate-banquet');
    if (banquet) {
        out.banquet = {
            eyebrow: banquet.eyebrow || '',
            heading: banquet.heading || '',
            body: banquet.body || '',
            note: banquet.note || '',
            image: getStrapiMedia(banquet.image),
        };
    }

    const safety = findSection(entry, 'corporate-safety');
    if (safety) {
        out.safety = {
            eyebrow: safety.eyebrow || '',
            heading: safety.heading || '',
            items: (safety.items || []).map(iconCard),
        };
    }

    const enquiry = findSection(entry, 'corporate-enquiry');
    if (enquiry) {
        out.enquiry = {
            eyebrow: enquiry.eyebrow || '',
            heading: enquiry.heading || '',
            body: enquiry.body || '',
            outingTypes: lines(enquiry.outing_types),
            banquetOptions: lines(enquiry.banquet_options),
            submitLabel: enquiry.submit_label || '',
            privacyNote: enquiry.privacy_note || '',
            successHeading: enquiry.success_heading || '',
            successBody: enquiry.success_body || '',
            minLeadDays: enquiry.min_lead_days ?? 2,
        };

        // Contact details live in the enquiry section in Strapi
        if (enquiry.phone || enquiry.email) {
            out.contact = {
                phone: enquiry.phone || '',
                phoneHref: enquiry.phone ? `tel:${enquiry.phone.replace(/[^\d+]/g, '')}` : '',
                email: enquiry.email || '',
                hours: enquiry.hours || '',
            };
        }
    }

    const faq = findSection(entry, 'corporate-faq');
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

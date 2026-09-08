// Category keys are what editors pick in Strapi (enumeration on sections.faq -> faqs.category).
// Labels + order live here so marketing can't accidentally reorder the page by renaming a value.
export const FAQ_CATEGORIES = [
    { key: "park", label: "Park FAQs" },
    { key: "ticketing", label: "Ticketing FAQs" },
    { key: "rides", label: "Rides & safety FAQs" },
    { key: "food", label: "Food & dining FAQs" },
    { key: "facilities", label: "Facilities & services FAQs" },
    { key: "groups", label: "Groups & events FAQs" },
];

function normalizeCategory(value) {
    if (!value) return "park";
    return String(value)
        .trim()
        .toLowerCase()
        .replace(/\s*&\s*/g, "-")
        .replace(/[\s_]+/g, "-");
}

function labelFromKey(key) {
    return key
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
        .concat(" FAQs");
}

/**
 * Existing behaviour — used by the About page's inline FAQ block.
 * Left untouched so nothing downstream breaks.
 */
export function extractFaq(entry) {
    const sections = entry?.sections || [];
    const section = sections.find((s) => s.__component === "sections.faq");

    if (!section) return null;

    return {
        eyebrow: section.eyebrow || "Still curious?",
        heading: section.heading || "Frequently asked questions.",
        faqs: (section.faqs || []).map((f) => ({
            q: f.question,
            a: f.answer,
            cat: f.category || "park",
        })),
    };
}

/**
 * Groups a flat FAQ list into ordered category buckets.
 * Known categories come first in FAQ_CATEGORIES order; anything unrecognised
 * is appended at the end rather than silently dropped.
 */
export function groupFaqs(faqs = []) {
    const buckets = new Map();

    faqs.forEach((f, i) => {
        if (!f?.q) return;
        const key = normalizeCategory(f.cat);
        if (!buckets.has(key)) buckets.set(key, []);
        buckets.get(key).push({ ...f, id: `${key}-${i}` });
    });

    const known = FAQ_CATEGORIES.filter((c) => buckets.has(c.key)).map((c) => ({
        key: c.key,
        label: c.label,
        items: buckets.get(c.key),
    }));

    const extra = [...buckets.keys()]
        .filter((k) => !FAQ_CATEGORIES.some((c) => c.key === k))
        .map((k) => ({ key: k, label: labelFromKey(k), items: buckets.get(k) }));

    return [...known, ...extra];
}

/**
 * Extractor for the dedicated FAQ page: same Strapi block, grouped output.
 */
export function extractFaqGroups(entry) {
    const data = extractFaq(entry);
    if (!data?.faqs?.length) return null;

    return {
        eyebrow: data.eyebrow,
        heading: data.heading,
        groups: groupFaqs(data.faqs),
    };
}
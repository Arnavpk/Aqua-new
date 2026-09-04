import { rideRestrictionsFallback } from "../data/rideRestrictions";

// Handle both Strapi 4 (attributes wrapper) and Strapi 5 (flat) responses.
const unwrap = (node) => (node?.attributes ? { id: node.id, ...node.attributes } : node);
const list = (node) => {
    const raw = node?.data ?? node;
    if (!raw) return [];
    return (Array.isArray(raw) ? raw : [raw]).map(unwrap);
};

export function rideRestrictionsExtractor(entry, location) {
    console.log('[ride-restrictions]', JSON.stringify(entry, null, 2));
    const fallback = rideRestrictionsFallback(location);
    if (!entry) return fallback;

    const a = unwrap(entry);
    const seo = list(a.seo)[0] || {};

    const restrictions = list(a.restrictions)
        .map((r) => ({
            name: r.name || "",
            height: r.height || "",
            weight: r.weight || "",
            riders: r.riders || "",
        }))
        .filter((r) => r.name);

    return {
        title: a.title || fallback.title,
        intro: a.intro || fallback.intro,
        columns: fallback.columns, // headings stay hardcoded — no wrapper component
        restrictions: restrictions.length ? restrictions : fallback.restrictions,
        seo: {
            title: seo.metaTitle || a.title || fallback.seo.title,
            description: seo.metaDescription || fallback.seo.description,
        },
    };
}

export default rideRestrictionsExtractor;
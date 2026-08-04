import { strapiFetch } from "./client";

/**
 * Generic content fetcher matching the D&B pattern:
 * getPage(location, "rides", slug?) 
 *
 * @param {string} location - location slug, e.g. "indore"
 * @param {string} contentType - Strapi plural API id, e.g. "rides", "restaurants", "ticket-types"
 * @param {string} [slug] - optional entry slug for detail pages
 * @param {object} [populate] - override populate shape per content type
 */
export async function getPage(location, contentType, slug = null, populate = "*") {
    const filters = {
        location: { slug: { $eq: location } },
    };
    if (slug) filters.slug = { $eq: slug };

    const res = await strapiFetch(`/${contentType}`, {
        filters,
        populate,
    });

    const entries = res?.data || [];
    return slug ? entries[0] || null : entries;
}
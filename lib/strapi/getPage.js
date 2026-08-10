import { strapiFetch } from "./client";

// Default populate shape for the Page content type's dynamic zone.
// Extend the `on` map as you add more section components (categories, testimonials, etc.)
const DEFAULT_PAGE_POPULATE = {
    sections: {
        on: {
            "sections.hero": {
                populate: {
                    video: true,
                    video_poster: true,
                    primary_cta: true,
                    secondary_cta: true,
                    meta_items: true,
                },
            },
            "sections.featured-rides": {
                populate: {
                    rides: {
                        populate: {
                            video: true,
                            mobile_video: true,
                        },
                    },
                },
            },
            "sections.hot-offers": {
                populate: {
                    offers: {
                        populate: {
                            image: true,
                            mobile_image: true,
                        },
                    },
                },
            },
            "sections.events-split": {
                populate: {
                    events: {
                        populate: {
                            image: true,
                        },
                    },
                },
            },
            "sections.park-map": {
                populate: {
                    map_image: true,
                    mobile_map_image: true,
                },
            },
            "sections.plan-visit": {
                populate: {
                    hero_image: true,
                    tiles: true,
                },
            },
            "sections.gallery": {
                populate: {
                    tiles: {
                        populate: {
                            image: true,
                            mobile_image: true,
                        },
                    },
                },
            },
            "sections.testimonials": {
                populate: {
                    quotes: {
                        populate: {
                            avatar: true,
                        },
                    },
                },
            },
            "sections.safety-band": {
                populate: {
                    items: true,
                },
            },
            "sections.faq": {
                populate: {
                    faqs: true,
                },
            },
            "sections.cta-banner": {
                populate: {
                    background_image: true,
                    mobile_background: true,
                },
            },
            "sections.rides-hero": {
                populate: {
                    background_image: true,
                    mobile_image: true,
                },
            },
            "sections.plan-safety": {},
        },
    },
};

/**
 * Generic content fetcher matching the D&B pattern:
 * getPage(location, "pages", slug?)
 *
 * @param {string} location - location slug, e.g. "indore"
 * @param {string} contentType - Strapi plural API id, e.g. "pages", "rides", "restaurants"
 * @param {string} [slug] - optional entry slug for detail pages
 * @param {object} [populate] - override populate shape per content type
 */
export async function getPage(
    location,
    contentType,
    slug = null,
    populate = DEFAULT_PAGE_POPULATE
) {
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
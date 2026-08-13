import { getStrapiMedia } from "@/lib/strapi/media";

export function extractRestaurants(strapiRestaurants) {
    if (!strapiRestaurants?.length) return null;

    return strapiRestaurants.map((r) => ({
        slug: r.slug,
        name: r.name,
        cuisine: r.cuisine || "",
        desc: r.description || "",
        badge: r.badge || "",
        hours: r.hours ? `⏰ ${r.hours}` : "",
        tags: r.tags ? r.tags.split("\n").filter(Boolean) : [],
        image: getStrapiMedia(r.image),
        mobileImage: getStrapiMedia(r.mobile_image),
        viewCtaLabel: r.view_cta_label || "View details →",
    }));
}

export function extractRestaurantDetail(strapiRestaurant) {
    if (!strapiRestaurant) return null;

    return {
        slug: strapiRestaurant.slug,
        name: strapiRestaurant.name,
        cuisine: strapiRestaurant.cuisine || "",
        desc: strapiRestaurant.description || "",
        badge: strapiRestaurant.badge || "",
        hours: strapiRestaurant.hours ? `⏰ ${strapiRestaurant.hours}` : "",
        tags: strapiRestaurant.tags
            ? strapiRestaurant.tags.split("\n").filter(Boolean)
            : [],
        aboutText: strapiRestaurant.about_text || "",
        diningInfo: strapiRestaurant.dining_info
            ? strapiRestaurant.dining_info.split("\n").filter(Boolean)
            : [],
        cta: {
            heading: strapiRestaurant.cta_heading || "Hungry already?",
            description: strapiRestaurant.cta_description || "",
            label: strapiRestaurant.cta_label || "Book tickets →",
            url: strapiRestaurant.cta_url || "",
        },
        image: getStrapiMedia(strapiRestaurant.image),
        mobileImage: getStrapiMedia(strapiRestaurant.mobile_image),
    };
}
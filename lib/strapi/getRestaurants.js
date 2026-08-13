import { strapiFetch } from "./client";

export async function getAllRestaurants(locationSlug) {
    const res = await strapiFetch("/restaurants", {
        filters: {
            location: { slug: { $eq: locationSlug } },
        },
        populate: {
            image: true,
            mobile_image: true,
            location: true,
        },
        sort: ["sort_order:asc"],
        pagination: { pageSize: 20 },
    });
    return res?.data || [];
}

export async function getRestaurantBySlug(locationSlug, slug) {
    const res = await strapiFetch("/restaurants", {
        filters: {
            location: { slug: { $eq: locationSlug } },
            slug: { $eq: slug },
        },
        populate: {
            image: true,
            mobile_image: true,
            location: true,
        },
    });
    const entries = res?.data || [];
    return entries[0] || null;
}
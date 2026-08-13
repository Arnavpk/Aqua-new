import { strapiFetch } from "./client";

export async function getAllTickets(locationSlug) {
    const res = await strapiFetch("/tickets", {
        filters: {
            location: { slug: { $eq: locationSlug } },
        },
        sort: ["sort_order:asc"],
        pagination: { pageSize: 20 },
    });
    return res?.data || [];
}

export async function getAllOffers(locationSlug) {
    const res = await strapiFetch("/offers", {
        filters: {
            location: { slug: { $eq: locationSlug } },
        },
        populate: {
            image: true,
            mobile_image: true,
            highlights: true,
            offer_meta: true,
            offers: {
                populate: { image: true },
            },
        },
        sort: ["sort_order:asc"],
        pagination: { pageSize: 20 },
    });
    return res?.data || [];
}

export async function getOfferBySlug(locationSlug, slug) {
    const res = await strapiFetch("/offers", {
        filters: {
            location: { slug: { $eq: locationSlug } },
            slug: { $eq: slug },
        },
        populate: {
            image: true,
            mobile_image: true,
            highlights: true,
            offer_meta: true,
            offers: {
                populate: { image: true },
            },
        },
    });
    const entries = res?.data || [];
    return entries[0] || null;
}
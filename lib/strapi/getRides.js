import { strapiFetch } from "./client";

const RIDE_POPULATE = {
    image: true,
    mobile_image: true,
    video: true,
    mobile_video: true,
    specs: true,
    experiences: true,
    safety_rules: true,
    hours: true,
    gallery: {
        populate: {
            image: true,
            mobile_image: true,
        },
    },
    location: true,
    related_rides: {
        populate: {
            image: true,
            mobile_image: true,
        },
    },
};

/** Fetch all rides for a location */
export async function getAllStrapiRides(locationSlug) {
    const res = await strapiFetch("/rides", {
        filters: {
            location: { slug: { $eq: locationSlug } },
        },
        populate: RIDE_POPULATE,
        pagination: { pageSize: 50 },
    });

    return res?.data || [];
}

/** Fetch a single ride by slug + location */
export async function getStrapiRideBySlug(locationSlug, rideSlug) {
    const res = await strapiFetch("/rides", {
        filters: {
            location: { slug: { $eq: locationSlug } },
            slug: { $eq: rideSlug },
        },
        populate: RIDE_POPULATE,
    });

    const entries = res?.data || [];
    return entries[0] || null;
}
import { strapiFetch } from './client';

export async function getGroupPricingSeasons(locationSlug) {
    const today = new Date().toISOString().split('T')[0];

    const res = await strapiFetch('/group-pricing-seasons', {
        filters: {
            location: { slug: { $eq: locationSlug } },
            end_date: { $gte: today },
        },
        populate: {
            tiers: '*',
            location: true,
        },
        sort: ['start_date:asc'],
        pagination: { pageSize: 20 },
    });

    return res?.data || [];
}

export async function getGroupBlackoutDates(locationSlug) {
    const today = new Date().toISOString().split('T')[0];

    const res = await strapiFetch('/group-blackout-dates', {
        filters: {
            location: { slug: { $eq: locationSlug } },
            date: { $gte: today },
        },
        populate: {
            tiers: '*',
            location: true,
        },
        sort: ['date:asc'],
        pagination: { pageSize: 100 },
    });

    return res?.data || [];
}
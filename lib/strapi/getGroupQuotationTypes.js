import { strapiFetch } from './client';

/**
 * Fetch quotation types (Corporate Group, Student Group, etc.)
 * with their guest-count options, filtered by location.
 */
export async function getGroupQuotationTypes(locationSlug) {
    const res = await strapiFetch('/group-quotation-types', {
        populate: {
            guest_options: '*',
        },
        sort: ['name:asc'],
        pagination: { pageSize: 20 },
    });

    return (res?.data || []).map((qt) => ({
        name: qt.name,
        slug: qt.slug,
        guestOptions: (qt.guest_options || [])
            .sort((a, b) => a.min_value - b.min_value)
            .map((g) => ({
                label: g.label,
                minValue: g.min_value,
            })),
    }));
}
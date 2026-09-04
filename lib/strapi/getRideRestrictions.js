import { strapiFetch } from "./client";
import { rideRestrictionsExtractor } from "../extractors/rideRestrictionsExtractor";
import { rideRestrictionsFallback } from "../data/rideRestrictions";

// restrictions is a direct repeatable (like rideTimings on park-timing), so
// populate goes one level in with no wrapper.
const POPULATE = {
    restrictions: true,
    seo: true,
};

export async function getRideRestrictions(location) {
    try {
        const res = await strapiFetch("/ride-restrictions", {
            filters: { location: { slug: { $eq: location } } },
            populate: POPULATE,
            pagination: { pageSize: 1 },
        });

        const entry = res?.data?.[0];
        if (!entry) return rideRestrictionsFallback(location);

        return rideRestrictionsExtractor(entry, location);
    } catch (err) {
        console.error(`[getRideRestrictions] ${location}:`, err?.message || err);
        return rideRestrictionsFallback(location);
    }
}

export default getRideRestrictions;
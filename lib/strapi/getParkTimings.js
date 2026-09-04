// NOTE: swap this import for whatever ./client.js actually exports in your repo
// (e.g. `fetchAPI`, `strapiGet`). The rest of the file only needs a function
// that takes (path, queryObject) and returns the parsed JSON body.
import { strapiFetch } from "./client";
import { parkTimingsExtractor } from "../extractors/parkTimingsExtractor";
import { parkTimingsFallback } from "../data/parkTimings";

const POPULATE = {
    schedule: { populate: { rows: true } },
    rideTimings: { populate: { slots: true } },
    map: true,
    seo: true,
};

export async function getParkTimings(location) {
    try {
        const res = await strapiFetch("/park-timings", {
            filters: { location: { slug: { $eq: location } } },
            populate: POPULATE,
            pagination: { pageSize: 1 },
        });

        const entry = res?.data?.[0];
        if (!entry) return parkTimingsFallback(location);

        return parkTimingsExtractor(entry, location);
    } catch (err) {
        console.error(`[getParkTimings] ${location}:`, err?.message || err);
        return parkTimingsFallback(location);
    }
}

export default getParkTimings;
import { strapiFetch } from "./client";

export async function getContactLocations() {
    try {
        const res = await strapiFetch("/locations", {
            populate: {
                contact: {
                    populate: {
                        query_emails: true,
                        emergency_numbers: true,
                    },
                },
            },
            pagination: { pageSize: 50 },
        });
        return res?.data || [];
    } catch (e) {
        console.warn("Contact locations fetch failed:", e.message);
        return [];
    }
}
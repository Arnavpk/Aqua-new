import { strapiFetch } from "./client";

export async function getAllStrapiLocations() {
    const res = await strapiFetch("/locations", {
        fields: ["name", "slug", "address"],
        pagination: { pageSize: 50 },
    });

    return (res?.data || []).map((loc) => ({
        name: loc.name,
        slug: loc.slug,
        address: loc.address || "",
    }));
}
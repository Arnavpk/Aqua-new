import { strapiFetch } from "./client";
import { getStrapiMedia } from "./media";

export async function getAllStrapiLocations() {
    const res = await strapiFetch("/locations", {
        fields: ["name", "slug", "address"],
        populate: {
            logo: true,
        },
        pagination: { pageSize: 50 },
    });

    return (res?.data || []).map((loc) => ({
        name: loc.name,
        slug: loc.slug,
        address: loc.address || "",
        logo: getStrapiMedia(loc.logo),
    }));
}
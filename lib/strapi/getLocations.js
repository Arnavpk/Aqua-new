import { strapiFetch } from "./client";
import { getStrapiMedia } from "./media";

export async function getAllStrapiLocations() {
    const res = await strapiFetch("/locations", {
        populate: {
            logo: true,
            contact: {
                populate: {
                    query_emails: true,
                    emergency_numbers: true,
                },
            },
        },
        pagination: { pageSize: 50 },
    });

    return (res?.data || []).map((loc) => ({
        name: loc.name,
        slug: loc.slug,
        address: loc.address || "",
        phone: loc.phone || "",
        logo: getStrapiMedia(loc.logo),
        contact: loc.contact
            ? {
                phone: loc.contact.phone || "",
                phoneTel: loc.contact.phone_tel || "",
                hours: loc.contact.hours || "",
                email: loc.contact.email || "",
                address: loc.contact.address || "",
            }
            : null,
    }));
}
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
        mapEmbedUrl: loc.map_embed_url || "",
        logo: getStrapiMedia(loc.logo),
        contact: loc.contact?.[0]
            ? {
                phone: loc.contact[0].phone || "",
                phoneTel: loc.contact[0].phone_tel || "",
                hours: loc.contact[0].hours || "",
                email: loc.contact[0].email || "",
                address: loc.contact[0].address || "",
                queryEmails: (loc.contact[0].query_emails || []).map((q) => ({
                    type: q.query_type || "",
                    email: q.email || "",
                })),
                emergencyNumbers: (loc.contact[0].emergency_numbers || []).map((e) => ({
                    label: e.label || "",
                    number: e.number || "",
                })),
            }
            : null,
    }));
}
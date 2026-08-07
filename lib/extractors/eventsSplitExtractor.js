import { getStrapiMedia } from "@/lib/strapi/media";

export function extractEventsSplit(entry) {
    const sections = entry?.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.events-split"
    );

    if (!section) return null;

    return {
        events: (section.events || []).map((ev) => ({
            eyebrow: ev.eyebrow,
            title: ev.title,
            desc: ev.description,
            cta: {
                label: ev.cta_label,
                href: ev.cta_url || "#",
            },
            code: ev.promo_code || null,
            variant: ev.style || "dark",
            image: getStrapiMedia(ev.image),
        })),
    };
}
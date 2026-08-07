import { getStrapiMedia } from "@/lib/strapi/media";

const GRADIENTS = [
    { c1: "#FFDA47", c2: "#FF7A59" },
    { c1: "#50C7E8", c2: "#1770B8" },
    { c1: "#4CD180", c2: "#50C7E8" },
    { c1: "#FF7A59", c2: "#FFDA47" },
];

export function extractTestimonials(entry) {
    const sections = entry?.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.testimonials"
    );

    if (!section) return null;

    return {
        eyebrow: section.eyebrow || "4.7 ★ · 12,400 reviews",
        quotes: (section.quotes || []).map((q, i) => {
            const colors = GRADIENTS[i % GRADIENTS.length];
            return {
                text: q.text,
                name: q.name,
                city: q.city,
                avatar: getStrapiMedia(q.avatar),
                c1: colors.c1,
                c2: colors.c2,
            };
        }),
    };
}
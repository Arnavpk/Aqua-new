import { getStrapiMedia } from "@/lib/strapi/media";

const GRADIENTS = [
    "linear-gradient(135deg, #22C4DE, #5FDDEA)",
    "linear-gradient(135deg, #0A5566, #00A5C8)",
    "linear-gradient(135deg, #3FE0A5, #5FDDEA)",
    "linear-gradient(135deg, #0E7A93, #22C4DE)",
];

export function extractPlanVisit(entry) {
    const sections = entry?.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.plan-visit"
    );

    if (!section) return null;

    return {
        eyebrow: section.eyebrow || "Before you arrive",
        heading: section.heading || "Plan your visit.",
        subtitle: section.subtitle || "Everything you need to know for a great visit",
        hero: {
            title: section.hero_title || "Costume Rental",
            description: section.hero_description || "",
            icon: section.hero_icon || "🩳",
            image: getStrapiMedia(section.hero_image),
        },
        tiles: (section.tiles || []).map((tile, i) => ({
            icon: tile.icon,
            title: tile.title,
            desc: tile.description,
            href: tile.url || "#",
            gradient: GRADIENTS[i % GRADIENTS.length],
        })),
    };
}
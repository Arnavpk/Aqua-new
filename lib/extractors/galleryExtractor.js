import { getStrapiMedia } from "@/lib/strapi/media";

export function extractGallery(entry) {
    const sections = entry?.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.gallery"
    );

    if (!section) return null;

    return {
        eyebrow: section.eyebrow || "#AquaImagicaa · Instagram",
        heading: section.heading || "You, having a day",
        ctaLabel: section.cta_label || "See full gallery →",
        ctaUrl: section.cta_url || "",
        tiles: (section.tiles || []).map((tile) => ({
            image: getStrapiMedia(tile.image),
            mobileImage: getStrapiMedia(tile.mobile_image),
            tag: tile.tag || null,
            span: tile.size || "wide",
        })),
    };
}
import { getStrapiMedia } from "@/lib/strapi/media";

export function extractCtaBanner(entry) {
    const sections = entry?.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.cta-banner"
    );

    if (!section) return null;

    return {
        eyebrow: section.eyebrow || "Ready when you are",
        heading: section.heading || "Your day out starts here.",
        ctaLabel: section.cta_label || "Book tickets from ₹899 →",
        ctaUrl: section.cta_url || "",
        bgImage: getStrapiMedia(section.background_image),
        mobileBg: getStrapiMedia(section.mobile_background),
    };
}
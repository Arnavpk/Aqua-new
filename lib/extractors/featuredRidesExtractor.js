import { getStrapiMedia } from "@/lib/strapi/media";

export function extractFeaturedRides(entry) {
    const sections = entry?.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.featured-rides"
    );

    if (!section) return null;

    const tagStyleMap = {
        Thrill: "chip-white",
        Family: "chip-white",
        Kids: "chip-white",
        Signature: "chip-white",
        Splash: "chip-white",
        New: "chip-coral",
        Popular: "chip-sun",
        Limited: "chip-coral",
    };

    return {
        eyebrow: section.eyebrow || "Featured attractions",
        heading: section.heading || "Pick your adventure.",
        rides: (section.rides || []).map((ride, i) => ({
            name: ride.name,
            slug: ride.slug,
            category: ride.category,
            meta: ride.info,
            index: String(i + 1).padStart(2, "0"),
            video: getStrapiMedia(ride.video),
            mobileVideo: getStrapiMedia(ride.mobile_video),
            badges: [
                ride.primary_tag
                    ? { label: ride.primary_tag, cls: tagStyleMap[ride.primary_tag] || "chip-white" }
                    : null,
                ride.highlight_tag
                    ? { label: ride.highlight_tag, cls: tagStyleMap[ride.highlight_tag] || "chip-coral" }
                    : null,
            ].filter(Boolean),
        })),
    };
}
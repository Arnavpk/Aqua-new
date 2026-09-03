import { getStrapiMedia } from "@/lib/strapi/media";

// const badgeStyleMap = {
//     "Hot Deal": { bg: "var(--coral)", color: "#fff", label: "🔥 HOT DEAL" },
//     "Limited Time": { bg: "var(--sun)", color: "var(--ink)", label: "LIMITED TIME" },
//     "Early Bird": { bg: "var(--leaf)", color: "#fff", label: "EARLY BIRD" },
//     "Seasonal": { bg: "var(--brand-500)", color: "#fff", label: "SEASONAL" },
//     "Flash Sale": { bg: "var(--coral)", color: "#fff", label: "⚡ FLASH SALE" },
//     "Lowest Price": {
//         bg: "var(--leaf)", color: "#fff", label: "💰LOWEST PRICE"
//     },
// };

export function extractHotOffers(entry) {
    const sections = entry?.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.hot-offers"
    );

    if (!section) return null;

    return {
        eyebrow: section.eyebrow || "Save more, splash more",
        heading: section.heading || "Hot offers.",
        ctaLabel: section.cta_label || "View all offers →",
        ctaUrl: section.cta_url || "",
        offers: (section.offers || []).map((offer) => {
            // const badge = badgeStyleMap[offer.badge] || badgeStyleMap["Hot Deal"];
            return {
                title: offer.title,
                slug: offer.slug,
                desc: offer.description,
                discount: offer.discount_text,
                validity: offer.validity ? `📅 ${offer.validity}` : "",
                badge: offer.badge_text,
                image: getStrapiMedia(offer.image),
                mobileImage: getStrapiMedia(offer.mobile_image),
            };
        }),
    };


}
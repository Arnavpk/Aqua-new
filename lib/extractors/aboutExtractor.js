import { getStrapiMedia } from "@/lib/strapi/media";

function parseStats(statsText) {
    if (!statsText) return [];
    const parts = statsText.split(",").map((s) => s.trim());
    const stats = [];
    for (let i = 0; i < parts.length; i += 2) {
        stats.push({ n: parts[i], l: parts[i + 1] || "" });
    }
    return stats;
}

export function extractAboutStats(pageEntry) {
    if (!pageEntry) return null;
    const section = (pageEntry.sections || []).find(
        (s) => s.__component === "sections.about-stats"
    );
    if (!section) return null;
    return parseStats(section.stats_text);
}

export function extractAboutStory(pageEntry) {
    if (!pageEntry) return null;
    const section = (pageEntry.sections || []).find(
        (s) => s.__component === "sections.about-story"
    );
    if (!section) return null;
    return {
        eyebrow: section.eyebrow || "",
        heading: section.heading || "",
        paragraphs: section.paragraphs
            ? section.paragraphs.split("\n").filter(Boolean)
            : [],
        image: getStrapiMedia(section.image),
        mobileImage: getStrapiMedia(section.mobile_image),
    };
}

export function extractWhyChoose(pageEntry) {
    if (!pageEntry) return null;
    const section = (pageEntry.sections || []).find(
        (s) => s.__component === "sections.why-choose"
    );
    if (!section) return null;
    return {
        eyebrow: section.eyebrow || "",
        heading: section.heading || "",
        cards: (section.cards || []).map((c) => ({
            icon: c.icon,
            title: c.title,
            desc: c.description,
        })),
    };
}

export function extractVisionMission(pageEntry) {
    if (!pageEntry) return null;
    const section = (pageEntry.sections || []).find(
        (s) => s.__component === "sections.vision-mission"
    );
    if (!section) return null;
    return {
        eyebrow: section.eyebrow || "",
        heading: section.heading || "",
        items: (section.items || []).map((v) => ({
            icon: v.icon,
            title: v.title,
            desc: v.description,
        })),
    };
}

export function extractAboutTimeline(pageEntry) {
    if (!pageEntry) return null;
    const section = (pageEntry.sections || []).find(
        (s) => s.__component === "sections.about-timeline"
    );
    if (!section) return null;
    return {
        eyebrow: section.eyebrow || "",
        heading: section.heading || "",
        milestones: (section.milestones || []).map((t) => ({
            year: t.year,
            title: t.title,
            desc: t.description,
        })),
        image: getStrapiMedia(section.image),
    };
}

export function extractAboutCta(pageEntry) {
    if (!pageEntry) return null;
    const section = (pageEntry.sections || []).find(
        (s) => s.__component === "sections.about-cta"
    );
    if (!section) return null;
    return {
        heading: section.heading || "",
        subtitle: section.subtitle || "",
        primaryCta: section.primary_cta_label
            ? { label: section.primary_cta_label, href: section.primary_cta_url || "#" }
            : null,
        secondaryCta: section.secondary_cta_label
            ? { label: section.secondary_cta_label, href: section.secondary_cta_url || "#" }
            : null,
    };
}

export function extractDosDonts(pageEntry) {
    if (!pageEntry) return null;
    const section = (pageEntry.sections || []).find(
        (s) => s.__component === "sections.dos-donts"
    );
    if (!section) return null;
    return {
        dos: (section.dos || []).map((d) => ({
            icon: d.icon,
            title: d.title,
            desc: d.description,
        })),
        donts: (section.donts || []).map((d) => ({
            icon: d.icon,
            title: d.title,
            desc: d.description,
        })),
        ctaEyebrow: section.cta_eyebrow || "",
        ctaHeading: section.cta_heading || "",
        ctaLabel: section.cta_label || "",
        ctaUrl: section.cta_url || "",
    };
}

export function extractRetailProducts(pageEntry) {
    if (!pageEntry) return null;
    const section = (pageEntry.sections || []).find(
        (s) => s.__component === "sections.retail-products"
    );
    if (!section) return null;
    return {
        eyebrow: section.eyebrow || "",
        heading: section.heading || "",
        products: (section.products || []).map((p) => ({
            icon: p.icon,
            name: p.name,
            desc: p.description,
            price: p.price,
            image: getStrapiMedia(p.image),
        })),
        costume: {
            eyebrow: section.costume_eyebrow || "",
            heading: section.costume_heading || "",
            description: section.costume_description || "",
            ctaLabel: section.costume_cta_label || "",
            ctaUrl: section.costume_cta_url || "",
        },
    };
}
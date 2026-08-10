import { getStrapiMedia } from "@/lib/strapi/media";

const CATEGORY_META = {
    thrill: { eyebrow: "Thrill zone", eyebrowColor: "var(--coral)", heading: "Adrenaline,", headingEm: "engineered.", cta: "All thrill rides →" },
    family: { eyebrow: "Family fun", eyebrowColor: "var(--sun)", heading: "Everyone's", headingEm: "invited.", cta: "All family rides →" },
    kids: { eyebrow: "Kids zone", eyebrowColor: "var(--leaf)", heading: "Safe splash,", headingEm: "big smiles.", cta: "Kids attractions →" },
    leisure: { eyebrow: "Pools & leisure", eyebrowColor: "var(--brand-400)", heading: "Float. Breathe.", headingEm: "Repeat.", cta: "All pools →" },
    events: { eyebrow: "Live & scheduled", eyebrowColor: "var(--coral)", heading: "Experiences you", headingEm: "plan around.", cta: null },
};

const MOSAIC_CATEGORIES = [
    { category: "thrill", tagLabel: "THRILL", gradient: "linear-gradient(135deg, #0A5566, #22C4DE)" },
    { category: "leisure", tagLabel: "POOL", gradient: "linear-gradient(135deg, #00A5C8, #5FDDEA)" },
    { category: "kids", tagLabel: "KIDS", gradient: "linear-gradient(135deg, #FFD84D, #FF7A9C)" },
    { category: "family", tagLabel: "FAMILY", gradient: "linear-gradient(135deg, #3FE0A5, #5FDDEA)" },
];

const COLOR_MAP = {
    coral: "var(--coral)",
    sun: "var(--sun)",
    leaf: "var(--leaf)",
    brand: "var(--brand-400)",
};

/** Transform a single Strapi ride entry for listing cards */
function transformRideCard(ride) {
    return {
        slug: ride.slug,
        name: ride.name,
        desc: ride.description,
        tag: ride.tag,
        category: ride.category,
        thrill: ride.thrill_level,
        cat: ride.specs?.[0]?.value ? `${ride.specs[0].value}` : ride.tag,
        image: getStrapiMedia(ride.image),
        mobileImage: getStrapiMedia(ride.mobile_image),
        specs: (ride.specs || []).slice(0, 3).map((s) => s.value + (s.unit ? ` ${s.unit}` : "")),
        specTypes: (ride.specs || []).slice(0, 3).map(() => ""),
    };
}

function buildCategoryMeta(strapiCategories) {
    if (!strapiCategories?.length) return null;

    const meta = {};
    for (const cat of strapiCategories) {
        meta[cat.key] = {
            eyebrow: cat.eyebrow,
            eyebrowColor: COLOR_MAP[cat.color] || "var(--coral)",
            heading: cat.heading,
            headingEm: cat.heading_emphasis,
            cta: cat.cta_label || null,
        };
    }
    return meta;
}

/** Extract rides-hero section from Page entry */
export function extractRidesHero(pageEntry) {
    if (!pageEntry) return null;
    const sections = pageEntry.sections || [];
    const section = sections.find((s) => s.__component === "sections.rides-hero");
    if (!section) return null;

    let stats = null;
    if (section.stats_text) {
        const parts = section.stats_text.split(",").map((s) => s.trim());
        stats = [];
        for (let i = 0; i < parts.length; i += 2) {
            stats.push({ n: parts[i], l: parts[i + 1] || "" });
        }
    }

    return {
        eyebrow: section.eyebrow || "14 rides · 3 pools · 1 unforgettable day",
        heading: section.heading || "Rides & attractions.",
        description: section.description || "",
        ctaLabel: section.cta_label || "Book tickets from ₹599 →",
        ctaUrl: section.cta_url || "",
        bgImage: getStrapiMedia(section.background_image),
        mobileImage: getStrapiMedia(section.mobile_image),
        stats,
    };
}

/** Extract plan-safety section from Page entry */
export function extractPlanSafety(pageEntry) {
    if (!pageEntry) return null;
    const sections = pageEntry.sections || [];
    const section = sections.find((s) => s.__component === "sections.plan-safety");
    if (!section) return null;

    return {
        planHeading: section.plan_heading || "Turn your ride list into a day.",
        planDescription: section.plan_description || "",
        planCtaLabel: section.plan_cta_label || "Build my itinerary →",
        planCtaUrl: section.plan_cta_url || "",
        safetyHeading: section.safety_heading || "Certified safe. Lifeguards everywhere.",
        safetyDescription: section.safety_description || "",
        safetyBadges: section.safety_badges
            ? section.safety_badges.split(",").map((s) => s.trim()).filter(Boolean)
            : ["ISO 9001", "IAAPA member", "First aid on-site"],
    };
}

/** Group rides into sections by category for listing page */
export function extractRideSections(strapiRides, strapiCategories) {
    if (!strapiRides?.length) return null;

    const categoryMeta = buildCategoryMeta(strapiCategories) || FALLBACK_CATEGORY_META;

    const grouped = {};
    for (const ride of strapiRides) {
        const cat = ride.category || "thrill";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(transformRideCard(ride));
    }

    // Order by Strapi sort_order if available, else default
    const categoryOrder = strapiCategories?.length
        ? strapiCategories.map((c) => c.key)
        : ["thrill", "family", "kids", "leisure", "events"];

    return categoryOrder
        .filter((key) => grouped[key]?.length)
        .map((key) => ({
            key,
            ...(categoryMeta[key] || FALLBACK_CATEGORY_META[key] || {}),
            rides: grouped[key],
        }));
}

export function extractMosaicTiles(strapiRides) {
    if (!strapiRides?.length) return null;

    return MOSAIC_CATEGORIES.map((m) => {
        const ride = strapiRides.find((r) => r.category === m.category);
        return {
            tag: m.tagLabel,
            label: ride?.name || m.category,
            image: ride ? getStrapiMedia(ride.image) : null,
            gradient: m.gradient,
        };
    }).filter(Boolean);
}

/** Extract the featured/spotlight ride */
export function extractFeaturedSpotlightSection(pageEntry) {
    if (!pageEntry) return null;
    const sections = pageEntry.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.featured-spotlight"
    );
    if (!section) return null;

    return {
        badgeText: section.badge_text || "⭐ FEATURED RIDE",
        ctaLabel: section.cta_label || "View ride details →",
        previewLabel: section.preview_label || "▶ Watch preview",
        previewEyebrow: section.preview_eyebrow || "POV · 30-second preview",
        previewHeading: section.preview_heading || "See the drop before you feel it",
        bgImage: getStrapiMedia(section.background_image),
        mobileImage: getStrapiMedia(section.mobile_image),
    };
}

/** Extract ride categories for the CategoryNav */
export function extractRideCategories(strapiRides, strapiCategories) {
    if (!strapiRides?.length) return null;

    const catCounts = {};
    for (const ride of strapiRides) {
        const cat = ride.category || "thrill";
        catCounts[cat] = (catCounts[cat] || 0) + 1;
    }

    const cats = [
        { key: "all", emoji: "✨", name: "All rides", count: `${strapiRides.length} rides` },
    ];

    if (strapiCategories?.length) {
        for (const sc of strapiCategories) {
            if (catCounts[sc.key]) {
                cats.push({
                    key: sc.key,
                    emoji: sc.emoji || "✨",
                    name: sc.name,
                    count: `${catCounts[sc.key]} ${catCounts[sc.key] === 1 ? "ride" : "rides"}`,
                });
            }
        }
    } else {
        const EMOJI_MAP = { thrill: "🎢", family: "👨‍👩‍👧", kids: "🧒", leisure: "🌊", events: "🎉" };
        const NAME_MAP = { thrill: "Thrill rides", family: "Family rides", kids: "Kids zone", leisure: "Pools & leisure", events: "Live events" };
        for (const [key, count] of Object.entries(catCounts)) {
            cats.push({
                key,
                emoji: EMOJI_MAP[key] || "✨",
                name: NAME_MAP[key] || key,
                count: `${count} ${count === 1 ? "ride" : "rides"}`,
            });
        }
    }

    return cats;
}

/** Full ride detail for the detail page */
export function extractRideDetail(strapiRide) {
    if (!strapiRide) return null;

    return {
        slug: strapiRide.slug,
        name: strapiRide.name_emphasis
            ? strapiRide.name.replace(strapiRide.name_emphasis.replace(".", ""), "").trim()
            : strapiRide.name,
        nameEm: strapiRide.name_emphasis || "",
        lede: strapiRide.lede || strapiRide.description,
        tags: [
            strapiRide.tag ? { label: strapiRide.tag.toUpperCase(), cls: strapiRide.category === "thrill" ? "thrill" : "" } : null,
            strapiRide.specs?.[0] ? { label: strapiRide.specs[0].value + (strapiRide.specs[0].unit ? ` ${strapiRide.specs[0].unit}` : ""), cls: "" } : null,
            strapiRide.is_featured ? { label: "⭐ SIGNATURE", cls: "featured" } : null,
        ].filter(Boolean),
        specs: (strapiRide.specs || []).map((s) => ({
            k: s.label,
            v: s.value,
            unit: s.unit || null,
            icon: s.icon || null,
        })),
        story: {
            lead: strapiRide.story_lead || "",
            body: strapiRide.story_body || "",
        },
        experiences: (strapiRide.experiences || []).map((e) => ({
            icon: e.icon,
            title: e.title,
            desc: e.description,
        })),
        gallery: (strapiRide.gallery || []).map((g) => ({
            image: getStrapiMedia(g.image),
            mobileImage: getStrapiMedia(g.mobile_image),
            tag: g.tag,
            span: g.size || "wide",
        })),
        safety: (strapiRide.safety_rules || []).map((s) => ({
            text: s.text,
            type: s.type || "ok",
        })),
        zone: {
            letter: strapiRide.zone_letter || "",
            name: strapiRide.zone_name || "",
            distance: strapiRide.zone_distance || "",
        },
        hours: (strapiRide.hours || []).map((h) => ({
            days: h.days,
            time: h.time,
        })),
        related: (strapiRide.related_rides || []).map((r) => ({
            slug: r.slug,
            name: r.name,
            desc: r.description,
            tag: r.tag,
            image: getStrapiMedia(r.image),
        })),
        image: getStrapiMedia(strapiRide.image),
        video: getStrapiMedia(strapiRide.video),
        mobileVideo: getStrapiMedia(strapiRide.mobile_video),

    };
}
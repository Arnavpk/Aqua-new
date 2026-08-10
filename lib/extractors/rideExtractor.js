import { getStrapiMedia } from "@/lib/strapi/media";

const CATEGORY_META = {
    thrill: { eyebrow: "Thrill zone", eyebrowColor: "var(--coral)", heading: "Adrenaline,", headingEm: "engineered.", cta: "All thrill rides →" },
    family: { eyebrow: "Family fun", eyebrowColor: "var(--sun)", heading: "Everyone's", headingEm: "invited.", cta: "All family rides →" },
    kids: { eyebrow: "Kids zone", eyebrowColor: "var(--leaf)", heading: "Safe splash,", headingEm: "big smiles.", cta: "Kids attractions →" },
    leisure: { eyebrow: "Pools & leisure", eyebrowColor: "var(--brand-400)", heading: "Float. Breathe.", headingEm: "Repeat.", cta: "All pools →" },
    events: { eyebrow: "Live & scheduled", eyebrowColor: "var(--coral)", heading: "Experiences you", headingEm: "plan around.", cta: null },
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

/** Group rides into sections by category for listing page */
export function extractRideSections(strapiRides) {
    if (!strapiRides?.length) return null;

    const grouped = {};
    const categoryOrder = ["thrill", "family", "kids", "leisure", "events"];

    for (const ride of strapiRides) {
        const cat = ride.category || "thrill";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(transformRideCard(ride));
    }

    return categoryOrder
        .filter((key) => grouped[key]?.length)
        .map((key) => ({
            key,
            ...CATEGORY_META[key],
            rides: grouped[key],
        }));
}

/** Extract the featured/spotlight ride */
export function extractFeaturedSpotlight(strapiRides) {
    if (!strapiRides?.length) return null;

    const featured = strapiRides.find((r) => r.is_featured) || strapiRides[0];

    return {
        slug: featured.slug,
        name: featured.name,
        desc: featured.description,
        image: getStrapiMedia(featured.image),
        specs: (featured.specs || []).map((s) => ({
            k: s.label,
            v: `${s.value}${s.unit ? ` ${s.unit}` : ""}`,
        })),
    };
}

/** Extract ride categories for the CategoryNav */
export function extractRideCategories(strapiRides) {
    if (!strapiRides?.length) return null;

    const catCounts = {};
    for (const ride of strapiRides) {
        const cat = ride.category || "thrill";
        catCounts[cat] = (catCounts[cat] || 0) + 1;
    }

    const EMOJI_MAP = {
        thrill: "🎢", family: "👨‍👩‍👧", kids: "🧒",
        leisure: "🌊", events: "🎉",
    };
    const NAME_MAP = {
        thrill: "Thrill rides", family: "Family rides", kids: "Kids zone",
        leisure: "Pools & leisure", events: "Live events",
    };

    const cats = [
        { key: "all", emoji: "✨", name: "All rides", count: `${strapiRides.length} rides` },
    ];

    for (const [key, count] of Object.entries(catCounts)) {
        cats.push({
            key,
            emoji: EMOJI_MAP[key] || "✨",
            name: NAME_MAP[key] || key,
            count: `${count} ${count === 1 ? "ride" : "rides"}`,
        });
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
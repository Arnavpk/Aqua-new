import { getStrapiMedia } from "@/lib/strapi/media";

/** Transform Strapi tickets for the grid */
export function extractTickets(strapiTickets) {
    if (!strapiTickets?.length) return null;

    return strapiTickets.map((t) => ({
        slug: t.slug,
        name: t.name,
        icon: t.icon || "🎫",
        iconBg: t.is_featured
            ? "rgba(255,255,255,.2)"
            : "linear-gradient(135deg,var(--brand-400),var(--brand-600))",
        desc: t.description,
        price: t.price,
        priceStrike: t.price_strike || null,
        unit: t.unit,
        badge: t.badge || null,
        featured: t.is_featured || false,
        ctaLabel: t.cta_label || "Book →",
        ctaUrl: t.cta_url || "",
    }));
}

/** Transform Strapi offers for the listing grid */
export function extractOffers(strapiOffers) {
    if (!strapiOffers?.length) return null;

    return strapiOffers.map((o) => ({
        slug: o.slug,
        name: o.name,
        tag: o.tag,
        discount: o.discount_text,
        discountSub: o.discount_sub,
        validity: o.validity ? `📅 ${o.validity}` : "",
        badge: o.badge || null,
        image: getStrapiMedia(o.image),
        mobileImage: getStrapiMedia(o.mobile_image),
        features: o.features
            ? o.features.split("\n").filter(Boolean)
            : [],
        viewCtaLabel: o.view_cta_label || "View offer",
        viewCtaUrl: o.view_cta_url || "",
        bookCtaLabel: o.book_cta_label || "Book now →",
        bookCtaUrl: o.book_cta_url || "",
    }));
}

/** Full offer detail for the detail page */
export function extractOfferDetail(strapiOffer) {
    if (!strapiOffer) return null;

    return {
        slug: strapiOffer.slug,
        name: strapiOffer.name_emphasis
            ? strapiOffer.name.replace(strapiOffer.name_emphasis, "").trim()
            : strapiOffer.name,
        nameEm: strapiOffer.name_emphasis || "",
        nameSuffix: strapiOffer.name_suffix || "",
        lede: strapiOffer.lede || "",
        badge: strapiOffer.badge || "",
        image: getStrapiMedia(strapiOffer.image),
        meta: (strapiOffer.offer_meta || []).map((m) => ({
            k: m.label,
            v: `${m.value}${m.unit ? ` ${m.unit}` : ""}`,
        })),
        medallion: {
            big: strapiOffer.discount_text || "",
            small: strapiOffer.discount_sub || "",
            validity: strapiOffer.validity || "",
        },
        story: {
            heading: strapiOffer.story_heading || "",
            headingEm: strapiOffer.story_heading_emphasis || "",
            lead: strapiOffer.story_lead || "",
            body: strapiOffer.story_body || "",
        },
        highlights: (strapiOffer.highlights || []).map((h) => ({
            icon: h.icon,
            title: h.title,
            desc: h.description,
        })),
        terms: strapiOffer.terms
            ? strapiOffer.terms.split("\n").filter(Boolean)
            : [],
        sidebar: {
            title: strapiOffer.sidebar_title || strapiOffer.name,
            price: strapiOffer.sidebar_price || "",
            priceStrike: strapiOffer.sidebar_price_strike || "",
            save: strapiOffer.sidebar_save || "",
            unit: strapiOffer.sidebar_unit || "",
            features: strapiOffer.sidebar_features
                ? strapiOffer.sidebar_features.split("\n").filter(Boolean)
                : [],
        },
        bookCtaLabel: strapiOffer.book_cta_label || "Book now →",
        bookCtaUrl: strapiOffer.book_cta_url || "",
        detailCta: {
            heading: strapiOffer.detail_cta_heading || "Ready to make a splash?",
            description: strapiOffer.detail_cta_description || "The offer ends soon and tickets are moving fast. Lock your date now.",
            label: strapiOffer.detail_cta_label || "Book my group →",
            url: strapiOffer.detail_cta_url || "",
        },
        help: {
            heading: strapiOffer.help_heading || "Need help booking?",
            description: strapiOffer.help_description || "Our booking team is available every day 9am–9pm.",
            phone: strapiOffer.help_phone || "022-69660000",
            phoneUrl: strapiOffer.help_phone_url || "tel:02269660000",
        },
        related: (strapiOffer.offers || []).map((r) => ({
            slug: r.slug,
            name: r.name,
            tag: r.tag,
            discount: r.discount_text,
            discountSub: r.discount_sub,
            image: getStrapiMedia(r.image),
        })),
    };
}

/** Extract page-hero section from Page entry */
export function extractPageHero(pageEntry) {
    if (!pageEntry) return null;
    const sections = pageEntry.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.page-hero"
    );
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
        eyebrow: section.eyebrow || "",
        heading: section.heading || "",
        subtitle: section.subtitle || "",
        primaryCta: section.primary_cta_label
            ? { label: section.primary_cta_label, href: section.primary_cta_url || "#" }
            : null,
        secondaryCta: section.secondary_cta_label
            ? { label: section.secondary_cta_label, href: section.secondary_cta_url || "#" }
            : null,
        stats: stats || [],
        bgImage: getStrapiMedia(section.background_image),
        mobileImage: getStrapiMedia(section.mobile_image),
    };
}

/** Extract help-strip section from Page entry */
export function extractHelpStrip(pageEntry) {
    if (!pageEntry) return null;
    const sections = pageEntry.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.help-strip"
    );
    if (!section) return null;

    return {
        eyebrow: section.eyebrow || "Booking help",
        heading: section.heading || "Everything you need to know.",
        items: (section.items || []).map((h) => ({
            icon: h.icon,
            title: h.title,
            desc: h.description,
        })),
        ctaEyebrow: section.cta_eyebrow || "Ready when you are",
        ctaHeading: section.cta_heading || "Your day out starts at ₹599.",
        ctaLabel: section.cta_label || "Book tickets →",
        ctaUrl: section.cta_url || "",
        phoneLabel: section.phone_label || "📞 Call us",
        phoneUrl: section.phone_url || "tel:02269660000",
    };
}
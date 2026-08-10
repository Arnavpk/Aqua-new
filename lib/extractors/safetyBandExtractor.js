export function extractSafetyBand(entry) {
    const sections = entry?.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.safety-band"
    );

    if (!section) return null;

    return {
        heading: section.heading || "Your Safety Our Priority",
        subtitle: section.subtitle || "Wave pools, slides & aqua fun under the sun",
        items: (section.items || []).map((item) => ({
            icon: item.icon,
            title: item.title,
            desc: item.description,
        })),
        marquee: section.marquee_text
            ? section.marquee_text.split(",").map((s) => s.trim()).filter(Boolean)
            : [],
    };
}
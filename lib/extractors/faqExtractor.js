export function extractFaq(entry) {
    const sections = entry?.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.faq"
    );

    if (!section) return null;

    return {
        eyebrow: section.eyebrow || "Still curious?",
        heading: section.heading || "Frequently asked questions.",
        faqs: (section.faqs || []).map((f) => ({
            q: f.question,
            a: f.answer,
            cat: f.category || "park",
        })),
    };
}
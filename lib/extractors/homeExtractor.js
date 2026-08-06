import { getStrapiMedia } from "@/lib/strapi/media";

export function extractHero(entry) {
    const sections = entry?.sections || [];
    const hero = sections.find((s) => s.__component === "sections.hero");

    if (!hero) return null;

    return {
        eyebrow: hero.eyebrow,
        title: {
            line1: hero.title_line_1,
            line2: hero.title_line_2,
            emphasis: hero.title_emphasis,
        },
        subtitle: hero.subtitle,
        video: getStrapiMedia(hero.video),
        videoPoster: getStrapiMedia(hero.video_poster),
        primaryCta: hero.primary_cta
            ? { label: hero.primary_cta.label, href: hero.primary_cta.url }
            : null,
        secondaryCta: hero.secondary_cta
            ? { label: hero.secondary_cta.label, href: hero.secondary_cta.url }
            : null,
        meta: (hero.meta_items || []).map((m) => ({
            strong: m.strong_text,
            detail: m.detail_text,
        })),
    };
}
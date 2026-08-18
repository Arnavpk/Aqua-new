import { getStrapiMedia } from "@/lib/strapi/media";

export function extractArticles(strapiArticles) {
    if (!strapiArticles?.length) return null;

    return strapiArticles.map((a) => ({
        slug: a.slug,
        title: a.title,
        desc: a.description || "",
        cat: a.category?.name || "ARTICLE",
        date: a.createdAt
            ? new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "",
        readTime: a.read_time || "3 min read",
        cover: getStrapiMedia(a.cover),
        author: a.author?.name || "Aqua Imagicaa Team",
    }));
}

export function extractArticleDetail(strapiArticle) {
    if (!strapiArticle) return null;

    const sections = [];
    const toc = [];

    for (const block of strapiArticle.blocks || []) {
        if (block.__component === "shared.rich-text") {
            const body = block.body || "";
            const headingMatch = body.match(/^##?\s+(.+)/m);
            if (headingMatch) {
                const heading = headingMatch[1].replace(/^\d+\.\s*/, "");
                toc.push(heading);
                sections.push({
                    heading,
                    body: body.replace(/^##?\s+.+\n?/, "").trim(),
                });
            } else {
                sections.push({ heading: "", body });
            }
        }
    }

    const categories = strapiArticle.category
        ? [strapiArticle.category.name]
        : [];

    return {
        slug: strapiArticle.slug,
        title: strapiArticle.title,
        cat: strapiArticle.category?.name || "ARTICLE",
        author: strapiArticle.author?.name || "Aqua Imagicaa Team",
        authorAvatar: strapiArticle.author?.avatar
            ? getStrapiMedia(strapiArticle.author.avatar)
            : null,
        date: strapiArticle.createdAt
            ? new Date(strapiArticle.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "",
        readTime: strapiArticle.read_time || "3 min read",
        cover: getStrapiMedia(strapiArticle.cover),
        intro: strapiArticle.intro || "",
        outro: strapiArticle.outro || "",
        sections,
        toc,
        categories,
    };
}
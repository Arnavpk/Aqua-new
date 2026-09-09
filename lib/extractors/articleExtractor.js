import { getStrapiMedia } from '@/lib/strapi/media';
import { blocksToText, blocksToToc } from '@/components/BlocksRenderer';

/**
 * Pick the best available date for an article.
 * Priority: display_date (editorial override) → publishedAt → createdAt
 */
function resolveDate(entry) {
    return entry.display_date || entry.publishedAt || entry.createdAt || null;
}

function formatDate(raw) {
    if (!raw) return '';
    return new Date(raw).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function extractYear(raw) {
    if (!raw) return new Date().getFullYear();
    return new Date(raw).getFullYear();
}

export function extractArticles(strapiArticles) {
    if (!strapiArticles?.length) return null;

    return strapiArticles.map((a) => {
        const dateRaw = resolveDate(a);
        return {
            slug: a.slug,
            title: a.title,
            desc: a.description || '',
            cat: a.category?.name || 'ARTICLE',
            date: formatDate(dateRaw),
            year: extractYear(dateRaw),
            readTime: a.read_time || '3 min read',
            cover: getStrapiMedia(a.cover),
            author: a.author?.name || 'Aqua Imagicaa Team',
        };
    });
}

export function extractArticleDetail(strapiArticle) {
    if (!strapiArticle) return null;

    // Collect all blocks — each block is a dynamic-zone component.
    // We keep every type, not just rich-text, so the detail page can render
    // media / quote / slider blocks too.
    const blocks = (strapiArticle.blocks || []).map((block) => {
        const type = block.__component?.replace('shared.', '') || 'unknown';

        if (type === 'rich-text') {
            // body is blocks JSON (array) in Strapi v5, or a markdown string in v4
            return { type, body: block.body };
        }

        if (type === 'media') {
            return {
                type,
                file: block.file ? getStrapiMedia(block.file) : null,
                alt: block.file?.alternativeText || '',
                caption: block.caption || '',
            };
        }

        if (type === 'quote') {
            return { type, title: block.title || '', body: block.body || '' };
        }

        if (type === 'slider') {
            return {
                type,
                files: (block.files || []).map((f) => ({
                    src: getStrapiMedia(f),
                    alt: f.alternativeText || '',
                })),
            };
        }

        return { type, raw: block };
    });

    // Build TOC from all rich-text blocks' headings
    const toc = blocks
        .filter((b) => b.type === 'rich-text' && Array.isArray(b.body))
        .flatMap((b) => blocksToToc(b.body));

    const categories = strapiArticle.category
        ? [strapiArticle.category.name]
        : [];

    return {
        slug: strapiArticle.slug,
        title: strapiArticle.title,
        cat: strapiArticle.category?.name || 'ARTICLE',
        author: strapiArticle.author?.name || 'Aqua Imagicaa Team',
        authorAvatar: strapiArticle.author?.avatar
            ? getStrapiMedia(strapiArticle.author.avatar)
            : null,
        date: formatDate(resolveDate(strapiArticle)),
        readTime: strapiArticle.read_time || '3 min read',
        cover: getStrapiMedia(strapiArticle.cover),
        intro: strapiArticle.intro || '',
        outro: strapiArticle.outro || '',
        blocks,
        toc,
        categories,
        // Keep legacy shape so pages that read blog.sections don't break immediately.
        // Remove once all consumers switch to blocks.
        sections: [],
    };
}
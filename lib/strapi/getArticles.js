import { strapiFetch } from "./client";

const ARTICLE_POPULATE = {
    cover: true,
    author: {
        populate: { avatar: true },
    },
    category: true,
    blocks: {
        on: {
            "shared.rich-text": {},
            "shared.media": { populate: { file: true } },
            "shared.quote": {},
            "shared.slider": { populate: { files: true } },
        },
    },
    location: true,
};

export async function getAllArticles(locationSlug) {
    const res = await strapiFetch("/articles", {
        filters: {
            location: { slug: { $eq: locationSlug } },
        },
        populate: {
            cover: true,
            author: true,
            category: true,
            location: true,
        },
        sort: ["createdAt:desc"],
        pagination: { pageSize: 20 },
    });
    return res?.data || [];
}

export async function getArticleBySlug(locationSlug, slug) {
    const res = await strapiFetch("/articles", {
        filters: {
            location: { slug: { $eq: locationSlug } },
            slug: { $eq: slug },
        },
        populate: ARTICLE_POPULATE,
    });
    const entries = res?.data || [];
    return entries[0] || null;
}
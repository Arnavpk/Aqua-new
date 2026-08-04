const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/**
 * Resolves a Strapi media field to a usable URL.
 * Handles both relative (local upload) and absolute (S3/Cloudinary) URLs.
 */
export function getStrapiMedia(media) {
    if (!media) return null;
    const url = media?.url || media?.data?.attributes?.url;
    if (!url) return null;
    return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}
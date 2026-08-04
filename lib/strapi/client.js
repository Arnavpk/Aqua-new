const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Core fetch wrapper for Strapi 5 REST API.
 * @param {string} path - e.g. "/api/rides"
 * @param {object} params - query params (filters, populate, sort, pagination)
 */
export async function strapiFetch(path, params = {}) {
    const query = buildQuery(params);
    const url = `${STRAPI_URL}/api${path}${query ? `?${query}` : ""}`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
            "Content-Type": "application/json",
        },
        next: { revalidate: 60 }, // ISR - tune per content type later
    });

    if (!res.ok) {
        const errBody = await res.text().catch(() => "");
        throw new Error(
            `Strapi fetch failed: ${res.status} ${res.statusText} — ${path} — ${errBody}`
        );
    }

    const json = await res.json();
    return json;
}

/**
 * Builds a Strapi 5 compatible query string from a params object.
 * Supports nested populate, filters, sort, pagination via qs-style bracket notation.
 */
function buildQuery(params) {
    const parts = [];

    const walk = (obj, prefix) => {
        Object.entries(obj).forEach(([key, value]) => {
            const fullKey = prefix ? `${prefix}[${key}]` : key;
            if (value === undefined || value === null) return;
            if (Array.isArray(value)) {
                value.forEach((v, i) => {
                    if (typeof v === "object") {
                        walk(v, `${fullKey}[${i}]`);
                    } else {
                        parts.push(`${encodeURIComponent(`${fullKey}[${i}]`)}=${encodeURIComponent(v)}`);
                    }
                });
            } else if (typeof value === "object") {
                walk(value, fullKey);
            } else {
                parts.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`);
            }
        });
    };

    walk(params, "");
    return parts.join("&");
}
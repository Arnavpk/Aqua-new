import { strapiFetch } from "./client";

export async function getNavItems(locationSlug) {
    const res = await strapiFetch("/pages", {
        filters: {
            location: { slug: { $eq: locationSlug } },
            show_in_nav: { $eq: true },
        },
        fields: ["title", "slug", "nav_label", "nav_order", "nav_parent", "is_parent_only"],
        sort: ["nav_order:asc"],
        pagination: { pageSize: 50 },
    });

    const pages = res?.data || [];

    const topLevel = pages.filter((p) => !p.nav_parent);
    const dropdowns = pages.filter((p) => p.nav_parent);

    return topLevel.map((page) => {
        const children = dropdowns
            .filter((d) => d.nav_parent === page.slug)
            .sort((a, b) => (a.nav_order || 0) - (b.nav_order || 0));

        const isParentOnly = page.is_parent_only === true;

        const item = {
            label: page.nav_label || page.title,
            href: isParentOnly ? '' : (page.slug === "home" ? "" : `/${page.slug}`),
            isParentOnly,
            dropdown: null,
        };

        if (children.length > 0) {
            item.dropdown = [
                {
                    heading: null,
                    links: children.map((c) => ({
                        label: c.nav_label || c.title,
                        href: `/${c.slug}`,
                    })),
                },
            ];
        }

        return item;
    });
}
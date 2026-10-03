import { strapiFetch } from "./client";
import { getStrapiMedia } from "./media";

export async function getGlobalPopup() {
    try {
        const res = await strapiFetch("/global", {
            populate: {
                popup_image: true,
            },
        });

        const data = res?.data;
        if (!data || !data.show_popup) return null;

        // popup_image is a multiple-media field — take the first entry
        const raw = Array.isArray(data.popup_image)
            ? data.popup_image[0]
            : data.popup_image;

        const image = getStrapiMedia(raw);
        if (!image) return null;

        return {
            image,
            link: data.popup_link || null,
        };
    } catch (e) {
        console.warn("Global popup fetch failed:", e.message);
        return null;
    }
}
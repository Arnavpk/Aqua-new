import { getStrapiMedia } from "@/lib/strapi/media";

export function extractParkMap(entry) {
    const sections = entry?.sections || [];
    const section = sections.find(
        (s) => s.__component === "sections.park-map"
    );

    if (!section) return null;

    return {
        title: section.title || "Park Map",
        mapImage: getStrapiMedia(section.map_image),
        mobileMapImage: getStrapiMedia(section.mobile_map_image),
        pdfUrl: section.pdf_url || null,
        downloadLabel: section.download_label || "Download full park map PDF →",
    };
}
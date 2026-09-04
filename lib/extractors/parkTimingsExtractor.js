import { parkTimingsFallback } from "../data/parkTimings";

const unwrap = (node) => (node?.attributes ? { id: node.id, ...node.attributes } : node);
const list = (node) => {
    const raw = node?.data ?? node;
    if (!raw) return [];
    return (Array.isArray(raw) ? raw : [raw]).map(unwrap);
};

export function parkTimingsExtractor(entry, location) {
    const fallback = parkTimingsFallback(location);
    if (!entry) return fallback;

    const a = unwrap(entry);
    const schedule = unwrap(a.schedule) || {};
    const map = unwrap(a.map) || {};
    const seo = list(a.seo)[0] || {};

    const scheduleRows = list(schedule.rows).map((r) => ({
        label: r.label || "",
        value: r.value || "",
    }));

    const rideRows = list(a.rideTimings)
        .map((r) => ({
            name: r.name || "",
            slots: list(r.slots)
                .map((s) => ({ start: s.startTime || "", end: s.endTime || "" }))
                .filter((s) => s.start || s.end),
        }))
        .filter((r) => r.name);

    return {
        title: a.title || fallback.title,
        intro: a.intro || fallback.intro,
        statusLinkLabel: a.statusLinkLabel || fallback.statusLinkLabel,

        schedule: {
            title: schedule.title || fallback.schedule.title,
            openDaysLabel: schedule.openDaysLabel || fallback.schedule.openDaysLabel,
            columns: {
                label: schedule.labelHeading || fallback.schedule.columns.label,
                value: schedule.valueHeading || fallback.schedule.columns.value,
            },
            rows: scheduleRows.length ? scheduleRows : fallback.schedule.rows,
            note: schedule.note ?? fallback.schedule.note,
        },

        rideTimings: {
            // Headings hardcoded — no wrapper component holds them.
            columns: fallback.rideTimings.columns,
            subtitle: fallback.rideTimings.subtitle,
            rows: rideRows.length ? rideRows : fallback.rideTimings.rows,
        },

        map: {
            address: map.address || fallback.map.address,
            embedUrl: map.embedUrl || fallback.map.embedUrl,
            directionsUrl: map.directionsUrl || fallback.map.directionsUrl,
        },

        seo: {
            title: seo.metaTitle || a.title || fallback.seo.title,
            description: seo.metaDescription || fallback.seo.description,
        },
    };
}

export default parkTimingsExtractor;
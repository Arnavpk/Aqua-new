// Fallback content used when Strapi is unreachable or the entry is unpublished.
// Same shape the extractor returns, so components never branch on data source.

const shared = {
    title: "Park Timings & Directions",
    intro:
        "Park and slides operational timing are subject to change without notice. For the most up-to-date information, always check slide/attraction operation timings displayed at the park entrance on the morning of your visit.",
    statusLinkLabel: "Rides Maintenance Status Timings",
    schedule: {
        title: "AquaImagicaa Water Park Schedule",
        openDaysLabel: "Open All days",
        columns: { label: "Item", value: "Time" },
        rows: [
            { label: "Ticket Counter Opening Time", value: "09:30 AM – Onward" },
            { label: "Park Timings", value: "10:00 AM – 05:30 PM" },
            { label: "Ride Timings", value: "10:30 AM – 05:30 PM" },
        ],
        note: "For more details, please contact the Guest Relation Executive at the park.",
    },
    rideTimings: {
        title: "Rides maintenance status and timings",
        subtitle: "Slides & Attractions Opening & Closing Timings",
        columns: { name: "Slides & Attractions", start: "Start Time", end: "End Time" },
        rows: [],
    },
    map: {
        address: "",
        embedUrl: "",
        directionsUrl: "",
    },
    seo: {
        title: "Park Timings & Directions",
        description:
            "Opening hours, ride timings and directions for AquaImagicaa Water Park.",
    },
};

const byLocation = {
    surat: {
        ...shared,
        rideTimings: {
            ...shared.rideTimings,
            rows: [
                { name: "King cobra", slots: [{ start: "12:00 PM", end: "05:30 PM" }] },
                { name: "Forest jump", slots: [{ start: "12:00 PM", end: "05:30 PM" }] },
                { name: "Windigo", slots: [{ start: "12:00 PM", end: "05:30 PM" }] },
                { name: "Twister", slots: [{ start: "12:00 PM", end: "05:30 PM" }] },
                { name: "Kamikaze", slots: [{ start: "12:00 PM", end: "05:30 PM" }] },
                { name: "Freefall", slots: [{ start: "12:00 PM", end: "05:30 PM" }] },
                { name: "Black hole", slots: [{ start: "10:30 AM", end: "05:30 PM" }] },
                { name: "Sky slider", slots: [{ start: "10:30 AM", end: "05:30 PM" }] },
                { name: "Jungle boat", slots: [{ start: "10:30 AM", end: "05:30 PM" }] },
                { name: "Tribal twist", slots: [{ start: "10:30 AM", end: "05:30 PM" }] },
                {
                    name: "Pond of life",
                    slots: [
                        { start: "10:30 AM", end: "12:00 PM" },
                        { start: "11:30 AM", end: "05:30 PM" },
                    ],
                },
                { name: "Wild Raft", slots: [{ start: "12:00 PM", end: "05:30 PM" }] },
                { name: "Rain Dance", slots: [{ start: "10:30 AM", end: "05:30 PM" }] },
            ],
        },
        map: {
            address: "Opp Dumbal Transport Godown, Parvat Patiya, Surat, Gujarat",
            embedUrl:
                "https://www.google.com/maps?q=Aqua+Imagicaa+Water+Park+Surat&output=embed",
            directionsUrl:
                "https://www.google.com/maps/dir/?api=1&destination=Aqua+Imagicaa+Water+Park+Surat",
        },
    },
    ahmedabad: { ...shared },
    indore: { ...shared },
};

export function parkTimingsFallback(location) {
    return byLocation[location] || shared;
}

export default byLocation;
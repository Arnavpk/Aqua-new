// Fallback used until Strapi entries exist. Same shape as the extractor output.

const shared = {
    title: "Ride Restrictions",
    intro:
        "Every guest's safety is our first priority at Aqua Imagicaa. To ensure that everyone enjoys a safe and pleasurable water park experience, we request all guests to assist Aqua Imagicaa staff in enforcing the following rules.",
    columns: { name: "Attractions", restrictions: "Restrictions" },
    seo: {
        title: "Ride Restrictions",
        description:
            "Height, weight and rider limits for every ride at Aqua Imagicaa Water Park.",
    },
};

const byLocation = {
    surat: {
        ...shared,
        restrictions: [
            { name: "King Cobra", height: 'Min. 48"', weight: "Min. 50 kg and Max. 110 kg", riders: "4 riders at a time" },
            { name: "Twister", height: 'Min. 48"', weight: "Max. 136 kg", riders: "4 riders at a time" },
            { name: "Forest Jump", height: 'Min. 48"', weight: "Min. 45 kg and Max. 136 kg", riders: "1 rider at a time" },
            { name: "Kamikaze", height: 'Min. 48"', weight: "Max. 120 kg", riders: "1 rider at a time" },
            { name: "Tribal Twist", height: 'Min. 48"', weight: "Min. 50 kg and Max. 110 kg", riders: "" },
        ],
    },
    ahmedabad: { ...shared, restrictions: [] },
    indore: { ...shared, restrictions: [] },
};

export function rideRestrictionsFallback(location) {
    return byLocation[location] || { ...shared, restrictions: [] };
}

export default byLocation;
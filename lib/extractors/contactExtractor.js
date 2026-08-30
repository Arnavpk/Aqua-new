export function extractContactPage(strapiLocations) {
    if (!strapiLocations || !strapiLocations.length) return null;

    // contact is repeatable — take first entry per location
    const withContact = strapiLocations
        .map((loc) => ({
            ...loc,
            cd: Array.isArray(loc.contact) ? loc.contact[0] : loc.contact,
        }))
        .filter((loc) => loc.cd);

    if (!withContact.length) return null;

    const queryTypeMap = new Map();
    withContact.forEach((loc) => {
        (loc.cd.query_emails || []).forEach((qe) => {
            if (!queryTypeMap.has(qe.query_type)) {
                queryTypeMap.set(qe.query_type, []);
            }
            queryTypeMap.get(qe.query_type).push({
                name: loc.name,
                email: qe.email || "",
            });
        });
    });

    const queryRows = Array.from(queryTypeMap.entries()).map(([type, locations]) => ({
        type,
        locations,
    }));

    const locationContacts = withContact.map((loc) => ({
        name: loc.name || "",
        phone: loc.cd.phone || "",
        phoneTel: loc.cd.phone_tel || (loc.cd.phone || "").replace(/[\s-]/g, ""),
        hours: loc.cd.hours || "",
        email: loc.cd.email || "",
        address: loc.cd.address || loc.address || "",
    }));

    const emergencyContacts = withContact
        .filter((loc) => loc.cd.emergency_numbers?.length)
        .map((loc) => ({
            name: loc.name || "",
            items: (loc.cd.emergency_numbers || []).map((it) => ({
                label: it.label || "",
                number: it.number || "",
            })),
        }));

    return {
        hero: {
            eyebrow: "Get In Touch",
            title: "We'd love to hear from you!",
            subtitle: "Get in touch with us for any queries, feedback, or assistance.",
        },
        queryRows,
        locationContacts,
        emergencyContacts,
        closingNote: "We appreciate your patience. Thank you and see you soon at Aqua Imagicaa Parks.",
    };
}
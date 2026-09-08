// Fallback content — used only when the Strapi `faq-help` page has no sections.faq block.
// Answers below are placeholders lifted from the live site's question list; replace the
// copy before shipping, or better, get these into Strapi and let this file wither.

export const FAQ_ITEMS = [
    // --- Park ---
    {
        cat: "park",
        q: "What time does the Water Park open?",
        a: "Park timings vary by season. Current timings are shown on the Park Timings & Directions page, and gates open 30 minutes before the first ride starts.",
    },
    {
        cat: "park",
        q: "How do I get to Aqua Imagicaa Water Park?",
        a: "Full driving directions, the pin location and nearest public transport options are on the Park Timings & Directions page.",
    },
    {
        cat: "park",
        q: "How can I get in touch with you?",
        a: "Call our guest helpline or write to us using the details on the Contact Us page. We reply to emails within one working day.",
    },
    {
        cat: "park",
        q: "Can I exit the park and re-enter the park on the same day?",
        a: "Re-entry is not permitted once you exit. Please collect everything you need before leaving.",
    },
    {
        cat: "park",
        q: "When may I call if I want to speak with someone directly?",
        a: "Our helpline is staffed during park operating hours, every day of the week.",
    },
    {
        cat: "park",
        q: "Are smoking and alcoholic beverages permitted here?",
        a: "Smoking and alcohol are not permitted anywhere inside the park.",
    },
    {
        cat: "park",
        q: "What if my group gets split up?",
        a: "Agree on a meeting point when you arrive. Our guest services desk can also make an announcement for you.",
    },
    {
        cat: "park",
        q: "Who should parents report to, if they can't locate their children?",
        a: "Report to the nearest lifeguard or the guest services desk immediately. Our team follows a lost-child protocol and will start a search right away.",
    },

    // --- Ticketing ---
    {
        cat: "ticketing",
        q: "Can I buy tickets at the gate?",
        a: "Yes, but online tickets are cheaper and let you skip the counter queue.",
    },
    {
        cat: "ticketing",
        q: "Do I need to print my ticket?",
        a: "No. Show the QR code on your phone at the entry gate.",
    },
    {
        cat: "ticketing",
        q: "Can I reschedule or cancel my booking?",
        a: "Booking changes are subject to the terms on the Terms & Conditions page. Contact the helpline with your booking ID.",
    },

    // --- Rides & safety ---
    {
        cat: "rides",
        q: "Are there height or weight restrictions on rides?",
        a: "Yes. Every ride lists its own restrictions on the Ride Restrictions page, and they are enforced at the ride entrance.",
    },
    {
        cat: "rides",
        q: "Do I need to know swimming?",
        a: "No. Most attractions are non-swimmer friendly and lifeguards are stationed across the park. Life jackets are available free of charge.",
    },
];

export const FAQ_PAGE_FALLBACK = {
    eyebrow: "Still curious?",
    heading: "Frequently asked questions.",
};
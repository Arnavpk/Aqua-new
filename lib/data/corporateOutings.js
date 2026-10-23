// Static content for the Corporate Outings landing page.
// Keyed by location slug; a location without an entry returns 404.
// Lines marked CONFIRM are still open in the copy deck — verify before go-live.
// When this moves to Strapi, each top-level key below becomes one section component.

const INDORE = {
    meta: {
        title: 'Corporate Outings in Indore | Aqua Imagicaa Indore',
        description:
            'Plan a corporate outing at Aqua Imagicaa Indore: 20+ rides, group meals across six food outlets and banquet access for R&R events, on the Indore-Ujjain Road.',
    },

    contact: {
        phone: '022-69660016',
        phoneHref: 'tel:02269660016',
        email: 'contact.indore@aquaimagicaa.com',
        hours: '9 AM to 9 PM, all days',
    },

    hero: {
        eyebrow: 'Out of office. Into the wave pool.',
        titleLead: 'Corporate outings at Aqua Imagicaa,',
        titleEm: 'Indore.',
        subtitle:
            'Over 20 rides, lunch for the whole team and a banquet for your R&R moment, all on the Indore-Ujjain Road.',
        primaryCta: { label: 'Plan your corporate outing →', href: '#enquire' },
        bgImage: null, // TODO: real company team at the Indore wave pool, shot with consent
        mobileImage: null,
        stats: [
            { n: '20+', l: 'Rides & attractions' },
            { n: '6', l: 'Food outlets' },
            { n: '7,000', l: 'Guest capacity' }, // CONFIRM capacity figure
        ],
    },

    jumpLinks: [
        { label: 'Rides', href: '#rides' },
        { label: 'Food', href: '#food' },
        { label: 'Banquet & R&R', href: '#banquet' },
        { label: 'How to plan', href: '#plan' },
        { label: 'FAQs', href: '#faqs' },
        { label: 'Get a quote', href: '#enquire' },
    ],

    intro: {
        eyebrow: 'Team days, sorted',
        heading: 'The one offsite nobody needs convincing to attend.',
        paragraphs: [
            'Planning a team day usually means finding something that works for everyone: the adventure-seekers and the poolside sitters, the new joiners and the leadership team. A water park quietly solves that problem. Everyone finds their own pace, and the conversations that never happen in the office start happening in the queue for the next slide.',
            'Aqua Imagicaa Indore opened in 2025 on the Indore-Ujjain Road, near Lemon City. It is run by Imagicaaworld Entertainment, the company behind Imagicaa near Khopoli and Aqua Imagicaa in Surat.',
        ],
    },

    benefits: {
        eyebrow: 'Why teams pick us',
        heading: 'What makes it easy to say yes.',
        cards: [
            { icon: '🏢', title: 'Room for the whole company', desc: 'The park is built for large groups, so one booking can cover several teams or an entire office.' },
            { icon: '🎢', title: 'Rides for every pace', desc: '20+ rides and attractions, from the Wave Pool and Rain Dance to Crusader and Thunder Drop.' },
            { icon: '🍽️', title: 'Food that keeps up', desc: 'Six food outlets, from quick-bite counters to full-service restaurants, with group meals arranged in advance.' },
            { icon: '🎤', title: 'A stage for the speeches', desc: 'Banquet access for R&R events, awards and team celebrations.' },
            { icon: '🅿️', title: 'Parking on site', desc: 'Space for cars and buses at the park.' }, // CONFIRM parking capacity
            { icon: '⛑️', title: 'Care on hand', desc: 'A first-aid centre inside the park, and lifeguards at key attractions.' },
        ],
    },

    rides: {
        eyebrow: 'Rides & attractions',
        heading: 'From the slow lane to the fast track.',
        subtitle: '20+ rides and attractions, so the team can split up, regroup and compare notes over lunch.',
        cta: { label: 'See all rides →', path: '/water-park/rides-and-attractions' },
        // TODO: swap gradients for ride photos (brochure crops are too low-res)
        featured: [
            { name: 'Cyclone', image: null, gradient: 'linear-gradient(135deg, #FF7A9C, #FFD84D)' },
            { name: 'Crusader', image: null, gradient: 'linear-gradient(135deg, #0E7A93, #5FDDEA)' },
            { name: 'Blizzard', image: null, gradient: 'linear-gradient(135deg, #00A5C8, #A8ECF3)' },
            { name: 'Wave Pool', image: null, gradient: 'linear-gradient(135deg, #22C4DE, #3FE0A5)' },
        ],
        // CONFIRM ride groupings
        groups: [
            {
                title: 'For the thrill-seekers',
                accent: '#FFD84D',
                rides: ['Crusader', 'Blizzard', 'Aqua Rush', 'Super Curl', 'Thunder Drop', 'Spider Racer', 'Vortex', 'Torpedo', 'Splash Down'],
            },
            {
                title: 'For the whole team at once',
                accent: '#5FDDEA',
                rides: ['Wave Pool', 'Rain Dance', 'Cyclone', 'Crazy Cruise', 'Wave Rider'],
            },
            {
                title: 'For family days',
                accent: '#FF7A9C',
                rides: ['Aqua Land', 'Pirate Bay', 'Splash Island', 'Jr. Rider', 'Water Fall'],
            },
        ],
    },

    food: {
        eyebrow: 'Food & dining',
        heading: 'Lunch, sorted for the whole floor.',
        body: "Feeding a large group is usually where outings go wrong. Aqua Imagicaa's Gourmet Zone has six outlets, serving everything to soothe Indian taste buds. Tell us your headcount and timings, and group meals are planned before you arrive.",
        // CONFIRM outlet names/spellings, group menus, veg and Jain options
        outlets: ['Bay View', 'Pocco Locco', 'Lagoon Feast', 'Malva Cafe', 'Tropicool', 'Chill Zone'],
        // TODO: outlet photos
        photos: [
            { name: 'Bay View', image: null, gradient: 'linear-gradient(160deg, #FFD84D, #FF7A9C)' },
            { name: 'Lagoon Feast', image: null, gradient: 'linear-gradient(160deg, #22C4DE, #0E7A93)' },
            { name: 'Tropicool', image: null, gradient: 'linear-gradient(160deg, #3FE0A5, #22C4DE)' },
        ],
    },

    banquet: {
        eyebrow: 'Banquet & R&R',
        heading: 'Room for the R&R moment.',
        body: "A good outing often ends with something more formal: awards, a word from leadership, or a celebration of a big quarter. The park's banquet facility can be booked for suitable corporate gatherings and R&R events, so the day can move from the wave pool to the awards in one place.",
        image: null, // TODO: banquet facility at the Indore park
        provides: {
            title: 'What the park provides',
            items: [
                'Water park access for your group',
                'Food and group meals',
                'Access to the banquet facility',
                'Park facilities: lockers, changing rooms, baggage counter, first aid and parking',
            ],
        },
        arranges: {
            title: 'What your company arranges',
            items: [
                'Tent-house set-up and seating',
                'Stage, décor, sound and lighting',
                'Your host, programme and any entertainment',
                'Transport to and from the park',
            ],
        },
        note: "Bring in your preferred tent-house or event partner. When you enquire, our team will confirm the banquet's availability, timings and access arrangements so your vendor can plan.",
    },

    safety: {
        eyebrow: 'Safety & care',
        heading: 'Looked after, all day.',
        items: [
            { icon: '⛑️', title: 'First-aid centre', desc: 'A first-aid centre inside the park.' }, // CONFIRM nursing staff
            { icon: '🛟', title: 'Lifeguards', desc: 'Stationed at key attractions.' },
            { icon: '🔧', title: 'Regular ride checks', desc: 'Rides are checked regularly.' }, // CONFIRM frequency
            { icon: '💧', title: 'Clean pools', desc: 'Clean, well-maintained pools.' },
            { icon: '📏', title: 'Clear ride limits', desc: 'Height and weight limits shown at each ride entry.' },
        ],
    },

    steps: {
        eyebrow: 'Planning',
        heading: 'How to plan your corporate outing.',
        items: [
            { title: 'Share the basics', desc: 'Your date, headcount and type of outing.' },
            { title: 'Tell us if you need the banquet', desc: 'For R&R, awards or a celebration.' },
            { title: 'Get your quote', desc: "What's included, meal timings and availability." },
            { title: 'Line up your event partner', desc: "If you're using the banquet, book your tent-house and set-up." },
            { title: 'Confirm the booking', desc: 'Lock in your date and inclusions with our team.' }, // CONFIRM advance payment & notice period
            { title: 'Arrive and switch off', desc: 'Gates open at 10:00 AM.' }, // CONFIRM gate time (location config says 11am)
        ],
    },

    enquiry: {
        eyebrow: 'Get a quote',
        heading: 'Plan your corporate outing.',
        body: "Tell us a little about your team and we'll come back with a quote and available dates.",
        outingTypes: ['Team outing', 'R&R / awards event', 'Annual day or celebration', 'Offsite / team-building', 'Other'],
        banquetOptions: ['Yes', 'No', 'Not sure yet'],
        submitLabel: 'Request a corporate quote',
        privacyNote: "We'll only use these details to reply to your enquiry.",
        successHeading: 'Thanks, we have your enquiry.',
        successBody: "Our corporate sales team will get back to you with a quote and available dates.",
        minLeadDays: 2,
    },

    faq: {
        eyebrow: 'Common questions',
        heading: 'Corporate outing FAQs.',
        faqs: [
            { q: 'Can Aqua Imagicaa Indore host a large corporate group?', a: "Yes. The park is built for large groups. Share your headcount and we'll confirm arrangements for your date." },
            { q: 'Do you offer corporate rates?', a: 'Yes. Group rates are quoted on request, based on headcount, date and meals.' },
            { q: 'What is included in a corporate booking?', a: 'Water park access, food for your group and, if requested, access to the banquet facility. Your quote lists the exact inclusions.' },
            { q: 'Can we hold an R&R or awards event at the park?', a: 'Yes. The banquet facility can be booked for suitable corporate gatherings. Your company arranges the tent-house set-up and event infrastructure.' },
            { q: 'What do we need to arrange ourselves?', a: 'Tent-house set-up and seating, stage, décor, sound and lighting, your host or programme, and transport to the park.' },
            { q: 'Is food arranged for groups?', a: "Yes. Group meals are planned in advance across the park's six food outlets." },
            { q: 'Is there parking for cars and buses?', a: 'Yes, there is on-site parking. Let us know how many vehicles to expect.' },
            { q: 'What should employees wear?', a: 'Swimwear made of lycra or nylon in the water. Swimwear can be rented at the park for ₹150 plus a ₹100 refundable deposit.' },
            { q: 'Is medical help available?', a: 'Yes. There is a first-aid centre inside the park.' },
            { q: 'Where is the park, and what are the timings?', a: 'Indore-Ujjain Road, near Lemon City, Paliya Village, Indore. Open daily, 10:00 AM to 6:00 PM.' }, // CONFIRM timings
        ],
    },

    cta: {
        heading: 'Take the next team meeting to the wave pool.',
        subtitle: "Send us your date and headcount, and we'll plan the rest of the day around your team.",
        primaryCta: { label: 'Plan your corporate outing →', href: '#enquire' },
    },
};

const CORPORATE_OUTINGS = { indore: INDORE };

export function getCorporateOutingsData(locationSlug) {
    return CORPORATE_OUTINGS[locationSlug] ?? null;
}
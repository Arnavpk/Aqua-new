// Fallback content for the /[location]/water-park page, used when the Strapi
// "water-park" Pages entry (or one of its sections) is missing.
// Keyed by location slug. A location with neither Strapi content nor an entry
// here returns 404, so another park never shows Surat's prices by mistake.
//
// Shapes match lib/extractors/waterParkExtractor.js output.
// Link hrefs are relative to the location ("tickets-and-offers" → /surat/tickets-and-offers).

export const WATER_PARK_CONTENT = {
    surat: {
        meta: {
            title: 'Water Park — Aqua Imagicaa Surat',
            description:
                'Aqua Imagicaa, where Surat comes to chill & thrill — 16 international slides, a wave pool, rain dance and great food.',
        },

        hero: {
            eyebrow: 'Water Park',
            title: 'Aqua Imagicaa: Where Surat Comes to Chill & Thrill!',
            subtitle:
                'Your hunt for a perfect place to chill and thrill ends here! Find yourself in the world of fun, laughter, and lots of splashes!',
            primaryCta: { label: 'Book Now', href: 'tickets-and-offers' },
            secondaryCta: { label: 'Read more ↓', href: '#experiences' },
            video: '/videos/water-park-hero.mp4',
            mobileVideo: null,
            poster: null,
        },

        experiences: {
            eyebrow: 'Chill meets thrill',
            heading: '#LifeKaAsliMazza at Aqua Imagicaa',
            items: [
                {
                    key: 'dj-ronny',
                    title: 'DJ Ronny — Live Every Weekend',
                    desc: 'Groove to DJ Ronny’s electrifying Bollywood, Punjabi & EDM sets — lighting up nightlife since 2012.',
                    badge: 'Till 1 June',
                    validUntil: '2026-06-01',
                    icon: 'music',
                    tone: 'night',
                },
                {
                    key: 'slides',
                    title: '16 International Slides',
                    desc: 'Get your adrenaline pumping on 16 world-class water slides, built for every thrill-seeker out there!',
                    stat: '16',
                    tone: 'deep',
                },
                {
                    key: 'wave-pool',
                    title: 'Wave Pool',
                    desc: 'Perfect for all ages, it’s your ultimate chill-meets-thrill splash zone!',
                    icon: 'waves',
                    tone: 'aqua',
                },
                {
                    key: 'rain-dance',
                    title: 'Rain Dance',
                    desc: 'Dance under a tropical rain shower with thumping beats and vibey moves.',
                    icon: 'rain',
                    tone: 'lagoon',
                },
                {
                    key: 'food',
                    title: 'Delicious Food & More',
                    desc: 'Refuel your energy with mouth-watering food delights, coolers, and treats — something for every craving!',
                    icon: 'food',
                    tone: 'warm',
                },
            ],
        },

        pricing: {
            eyebrow: 'Tickets',
            heading: 'Get ready to experience Life ka Asli Mazza at Aqua Imagicaa!',
            cta: { label: 'Book Now', href: 'tickets-and-offers' },
            note: null,
            prices: [
                { label: 'Adult', mrp: 899, price: 674 },
                { label: 'Senior Citizen', mrp: 699, price: 524 },
                { label: 'Child', mrp: 699, price: 524 },
            ],
        },
    },
};

export function getWaterParkContent(locationSlug) {
    return WATER_PARK_CONTENT[locationSlug] || null;
}

/** Drops cards whose validUntil date (IST, end of day) has passed. */
export function activeExperiences(items = [], now = new Date()) {
    return items.filter((item) => {
        if (!item.validUntil) return true;
        return new Date(`${item.validUntil}T23:59:59+05:30`) >= now;
    });
}
// Static content for the Happier Birthday offer page.
// Keyed by location slug; a location without an entry returns 404.
// Lines marked CONFIRM need checking before go-live.
// When this moves to Strapi, each top-level key below becomes one section component.

const SURAT = {
    meta: {
        title: 'Happier Birthday Offer | Free Birthday Ticket at Aqua Imagicaa Surat',
        description:
            'Celebrate your birthday at Aqua Imagicaa Surat: the birthday person gets a free Regular Access ticket, and a crew of 4 or more gets tickets at ₹599 + tax each.',
    },

    // CONFIRM: direct link to the birthday offer in the booking flow.
    // A path starting with "/" is prefixed with the location (/surat/...); a full URL is used as is.
    bookingHref: '/tickets-and-offers',

    contact: {
        phone: '022-69660000',
        phoneHref: 'tel:02269660000',
        email: 'contact@aquaimagicaa.com', // copy deck says "aquamagicaa" — assumed typo, CONFIRM
    },

    hero: {
        eyebrow: 'Happier Birthday!',
        titleLead: 'Your birthday celebration just got',
        titleEm: 'better!',
        subtitle: 'The birthday person gets a FREE ticket. Celebrate your special day with friends and family.',
        primaryCtaLabel: 'Book your birthday visit →',
        secondaryCta: { label: 'Offer terms', href: '#terms' },
        bgImage: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1794314830/Desktop--3840_1600_jwi6qy.jpg', // TODO: birthday group at the park
        mobileImage: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1794314839/Mobile-2160_1920_vucmrc.jpg',
        stats: [
            { n: 'FREE', l: 'Ticket for the birthday person' },
            { n: '₹599', l: 'Per guest + tax (min. 4)' },
            { n: '±3 days', l: 'Around your birthday' },
        ],
    },

    offer: {
        eyebrow: 'The offer',
        heading: 'Bring the gang. The birthday ticket is on us.',
        cards: [
            {
                tone: 'sun',
                kicker: 'Birthday person',
                big: 'FREE',
                title: 'Regular Access Ticket',
                desc: 'Valid on your birthday, 3 days before or after. Auto-applied at checkout. One birthday person per booking.',
            },
            {
                tone: 'brand',
                kicker: 'Birthday crew · minimum 4',
                big: '₹599',
                bigSuffix: '+ tax / person',
                title: 'Lowest Deal Day price',
                desc: 'Every guest in the crew gets tickets at the Deal Day price.',
            },
        ],
        notes: [
            'Valid on your birthday or up to 3 days before or after',
            'Not valid on Deal Day (Wednesday)',
            'Online and at the park ticket counter',
            'Original government photo ID required',
        ],
    },

    experiences: {
        eyebrow: 'Experiences',
        heading: 'Make your special day more exciting.',
        subtitle: 'Thrilling rides, Wave Pool masti, Rain Dance and a variety of food options.',
        // TODO: images to be added
        tiles: [
            { name: 'Thrilling rides', image: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1794314832/Thrilling_rides__g6fxdc.jpg', gradient: 'linear-gradient(135deg, #FF7A9C, #FFD84D)' },
            { name: 'Wave Pool', image: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1794314831/Wave_Pool__rlambc.jpg', gradient: 'linear-gradient(135deg, #00A5C8, #5FDDEA)' },
            { name: 'Rain Dance', image: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1794314831/Rain_Dance__d4hjen.jpg', gradient: 'linear-gradient(135deg, #22C4DE, #3FE0A5)' },
            { name: 'Food & more', image: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1794314830/Food_more__pmgjje.jpg', gradient: 'linear-gradient(135deg, #FFD84D, #B6F26A)' },
        ],
    },

    reasons: {
        eyebrow: "You'll love",
        heading: 'More reasons to celebrate here.',
        cards: [
            { icon: '🎟️', title: 'FREE birthday ticket', desc: 'Birthday person gets 1 FREE Regular Access Ticket.' },
            { icon: '🎉', title: 'Birthday gang offer', desc: 'Minimum 4 guests get tickets at ₹599 + tax per person.' },
            { icon: '🎢', title: '16+ thrilling rides', desc: 'From exciting slides to fun-filled water adventures.' }, // CONFIRM: site metadata says 14 rides
            { icon: '🌊', title: 'Wave Pool & Rain Dance', desc: 'Make your birthday celebration full of energy.' },
            { icon: '🍔', title: 'Food & more', desc: 'Refuel your fun with a variety of food options.' },
            { icon: '🛟', title: 'Safety comes first', desc: 'Trained lifeguards and regular water quality checks.' },
        ],
    },

    terms: {
        eyebrow: 'Fine print',
        heading: 'Terms & conditions.',
        items: [
            'Birthday person gets a free Regular Access ticket.',
            'Crew (minimum 4 people) accompanying the birthday person gets tickets at the lowest Deal Day price of ₹599 + tax.',
            'Applicable for guests visiting on their birthday or within 3 days before or after it.',
            'Offer applicable online and at the park ticket counter.',
            'Children below 3\'3" height get free entry.',
            'Offer not valid on Deal Day (Wednesday).',
            'A valid original government-issued photo ID must be presented at the park ticket counter.',
            'Select your desired visit date while making the booking.',
            'On successful payment, you will receive a booking confirmation with booking details within 24 hours.',
            'Show the booking details email at park admission to avail entry.',
            'Guests must show a valid government ID card for booking confirmation and entry to the park on the day of the visit.',
            'On cancellation, 25% of the ticket amount is deducted and the remaining 75% refunded. This applies only to cancellations made at least 24 hours before the visit.',
            'You can reschedule within 15 days of the original visit date by informing us at least 24 hours in advance. A ₹100 + tax rescheduling fee per ticket applies for the Water Park.',
            'If a guest does not follow the park\'s safety measures, Aqua Imagicaa may deny admission or remove the guest from the park, for the safety of all guests and employees, without further explanation.',
            'Standard Aqua Imagicaa park rules, regulations and terms & conditions apply.',
        ],
    },

    faq: {
        eyebrow: 'Birthday offer FAQs',
        heading: 'Questions before the party?',
        faqs: [
            { q: 'What is the Happier Birthday Offer?', a: 'The birthday person gets a complimentary Regular Access Ticket, while a minimum of 4 accompanying guests can enjoy the park at a special price of ₹599 + applicable taxes per person.' },
            { q: 'What is the validity of the Happier Birthday Offer?', a: 'The offer is valid for 3 days before and 3 days after the birthday.' },
            { q: 'Can I avail this offer on my actual birthday?', a: 'Yes! You can celebrate on your actual birthday or anytime within the 3-day period before or after your birthday.' },
            { q: 'What is the minimum number of guests required to avail of this offer?', a: 'A minimum of 4 paying guests (Birthday Crew) is required to avail the Happier Birthday Offer.' },
            { q: 'What documents are required to avail of the offer?', a: 'The birthday person must be present at the park and carry an original government-issued ID (hard copy) or a valid ID in DigiLocker for date-of-birth verification. Photos on mobile phones and photocopies will not be accepted.' },
            { q: 'Is the offer valid on Deal Day Wednesdays?', a: 'No, the Happier Birthday Offer is not valid on Wednesdays.' },
            { q: 'Does the birthday person need to purchase a separate ticket?', a: 'No. The complimentary birthday ticket is automatically added to your cart. You do not need to add a separate ticket.' },
            { q: 'Can children below 3 feet 3 inches avail of the offer?', a: "Children below 3 feet 3 inches can enter the park free of charge, as per the park's applicable child entry policy." },
            { q: 'How many birthday persons can avail of the complimentary ticket in one booking?', a: 'Only 1 birthday person per transaction is eligible for the complimentary ticket. Any additional birthday person must make a separate booking to avail of the offer.' },
            { q: 'What does the Regular Access Ticket include?', a: 'The Regular Access Ticket includes unlimited access to all Water Park rides and attractions, including the Wave Pool and Rain Dance.' },
        ],
    },

    cta: {
        heading: 'Make this birthday the happiest one yet.',
        subtitle: 'Free ticket for the birthday person. ₹599 + tax for the crew.',
        primaryCtaLabel: 'Book your birthday visit →',
    },
};

const HAPPIER_BIRTHDAY = { surat: SURAT };

export function getHappierBirthdayData(locationSlug) {
    return HAPPIER_BIRTHDAY[locationSlug] ?? null;
}

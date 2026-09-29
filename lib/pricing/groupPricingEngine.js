/**
 * Group Pricing Engine (v3)
 *
 * Corporate: quotation_type × date × day_type × guest_min → solo/combo rates
 * Student:   quotation_type × date × guest_min → flat category rates (all days)
 *
 * Priority: Blackout (blocked) → Blackout (special price) → Season → null
 */

function parseDate(str) {
    return new Date(str + 'T00:00:00Z');
}

function isSameDay(d1, d2) {
    return d1.toISOString().split('T')[0] === d2.toISOString().split('T')[0];
}

function parseWeekendDays(weekendStr) {
    if (!weekendStr) return new Set([0, 6]);
    return new Set(
        weekendStr.split(',').map((d) => parseInt(d.trim(), 10)).filter((n) => !isNaN(n))
    );
}

function findTier(tiers, quotationTypeSlug, guestMin, dayType) {
    // Exact match first (weekday/weekend specific)
    const exact = tiers?.find(
        (t) =>
            t.quotation_type === quotationTypeSlug &&
            t.guest_min === guestMin &&
            t.day_type === dayType
    );
    if (exact) return exact;

    // Fallback: null day_type means "any day" (student groups, blackout dates)
    return tiers?.find(
        (t) =>
            t.quotation_type === quotationTypeSlug &&
            t.guest_min === guestMin &&
            t.day_type == null
    ) || null;
}

function extractCorporatePricing(tier) {
    if (!tier) return null;
    return {
        type: 'corporate',
        comboAdult: {
            rate: tier.combo_adult_rate,
            discount: tier.combo_adult_disc,
            total: tier.combo_adult_total,
        },
        comboKids: {
            rate: tier.combo_kids_rate,
            discount: tier.combo_kids_disc,
            total: tier.combo_kids_total,
        },
        soloAdult: {
            rate: tier.solo_adult_rate,
            discount: tier.solo_adult_disc,
            total: tier.solo_adult_total,
        },
        soloKids: {
            rate: tier.solo_kids_rate,
            discount: tier.solo_kids_disc,
            total: tier.solo_kids_total,
        },
    };
}

function extractStudentPricing(tier) {
    if (!tier) return null;
    return {
        type: 'student',
        schoolRate: tier.student_school_rate,
        collegeRate: tier.student_college_rate,
        teacherRate: tier.student_teacher_rate,
    };
}

function extractPricing(tier, quotationTypeSlug) {
    if (!tier) return null;
    if (quotationTypeSlug === 'student-group') {
        return extractStudentPricing(tier);
    }
    return extractCorporatePricing(tier);
}

/**
 * @param {string} visitDateStr      - "2026-09-25"
 * @param {string} quotationTypeSlug - "corporate-group" or "student-group"
 * @param {number} guestMin          - 20, 30, 50, 100, 200
 * @param {Array}  seasons           - from getGroupPricingSeasons()
 * @param {Array}  blackouts         - from getGroupBlackoutDates()
 */
export function resolveGroupPricing(visitDateStr, quotationTypeSlug, guestMin, seasons = [], blackouts = []) {
    const visitDate = parseDate(visitDateStr);

    if (!guestMin || !quotationTypeSlug) return null;

    // 1. Blackout dates
    const blackout = blackouts.find((b) => isSameDay(parseDate(b.date), visitDate));

    if (blackout) {
        if (blackout.is_blocked) {
            return {
                pricing: null,
                source: 'blackout',
                isBlocked: true,
                eventName: blackout.event_name || 'Blocked date',
                dayType: null,
                seasonLabel: null,
            };
        }

        const dayOfWeek = visitDate.getUTCDay();
        const parentSeason = seasons.find((s) => {
            const start = parseDate(s.start_date);
            const end = parseDate(s.end_date);
            return visitDate >= start && visitDate <= end;
        });
        const weekendDays = parseWeekendDays(parentSeason?.weekend_days);
        const dayType = weekendDays.has(dayOfWeek) ? 'weekend' : 'weekday';

        const tier = findTier(blackout.tiers, quotationTypeSlug, guestMin, dayType);
        const pricing = extractPricing(tier, quotationTypeSlug);

        if (pricing) {
            return {
                pricing,
                source: 'blackout',
                isBlocked: false,
                eventName: blackout.event_name || 'Special date',
                dayType,
                seasonLabel: parentSeason?.label || null,
            };
        }
    }

    // 2. Seasons
    const season = seasons.find((s) => {
        const start = parseDate(s.start_date);
        const end = parseDate(s.end_date);
        return visitDate >= start && visitDate <= end;
    });

    if (!season) return null;

    const dayOfWeek = visitDate.getUTCDay();
    const weekendDays = parseWeekendDays(season.weekend_days);
    const dayType = weekendDays.has(dayOfWeek) ? 'weekend' : 'weekday';

    const tier = findTier(season.tiers, quotationTypeSlug, guestMin, dayType);
    const pricing = extractPricing(tier, quotationTypeSlug);

    if (!pricing) return null;

    return {
        pricing,
        source: 'season',
        isBlocked: false,
        eventName: null,
        dayType,
        seasonLabel: season.label,
    };
}
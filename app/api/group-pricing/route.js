import { NextResponse } from 'next/server';
import { getGroupPricingSeasons, getGroupBlackoutDates } from '@/lib/strapi/getGroupPricing';
import { resolveGroupPricing } from '@/lib/pricing/groupPricingEngine';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location');
        const date = searchParams.get('date');
        const guests = searchParams.get('guests');
        const qtype = searchParams.get('quotationType');

        if (!location || !date || !guests || !qtype) {
            return NextResponse.json(
                { error: 'location, date, guests, and quotationType are required' },
                { status: 400 }
            );
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return NextResponse.json({ error: 'date must be YYYY-MM-DD' }, { status: 400 });
        }

        const guestMin = parseInt(guests, 10);
        if (isNaN(guestMin)) {
            return NextResponse.json({ error: 'guests must be a number' }, { status: 400 });
        }

        const [seasons, blackouts] = await Promise.all([
            getGroupPricingSeasons(location),
            getGroupBlackoutDates(location),
        ]);

        console.log('SEASONS:', JSON.stringify(seasons.length), 'BLACKOUTS:', JSON.stringify(blackouts.length));
        console.log('PARAMS:', { date, qtype, guestMin });

        const result = resolveGroupPricing(date, qtype, guestMin, seasons, blackouts);

        if (!result) {
            return NextResponse.json({
                found: false,
                message: 'No pricing configured for this date. Our sales team will provide a custom quote.',
            });
        }

        if (result.isBlocked) {
            return NextResponse.json({
                found: false,
                blocked: true,
                eventName: result.eventName,
                message: `${result.eventName} — bookings are not available for this date.`,
            });
        }

        return NextResponse.json({
            found: true,
            pricing: result.pricing,
            dayType: result.dayType,
            seasonLabel: result.seasonLabel,
            eventName: result.eventName,
            source: result.source,
        });
    } catch (err) {
        console.error('Group pricing error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
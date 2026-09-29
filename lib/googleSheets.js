const inr = (n) => (n == null || isNaN(n) ? '—' : `₹${Number(n).toLocaleString('en-IN')}`);

function summarisePricing(p) {
    if (!p) return 'Not configured — custom quote';
    if (p.type === 'corporate') {
        return [
            ['Combo Adult', p.comboAdult],
            ['Combo Kids', p.comboKids],
            ['Solo Adult', p.soloAdult],
            ['Solo Kids', p.soloKids],
        ]
            .filter(([, d]) => d?.total || d?.rate)
            .map(([label, d]) => `${label}: ${inr(d.total ?? d.rate)}`)
            .join(' | ');
    }
    if (p.type === 'student') {
        return [
            p.schoolRate != null && `School: ${inr(p.schoolRate)}`,
            p.collegeRate != null && `College: ${inr(p.collegeRate)}`,
            p.teacherRate != null && `Teacher: ${inr(p.teacherRate)}`,
        ]
            .filter(Boolean)
            .join(' | ');
    }
    return '';
}

export async function appendEnquiryToSheet(d) {
    // ⬇️ Keys = your sheet's header names in row 1 (exact spelling)
    const data = {
        'Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        'Location': d.location,
        'Quotation Type': d.quotationType,
        'Name': d.name,
        'Company / School': d.company,
        'City': d.city,
        'District': d.district,
        'Pin Code': d.pinCode,
        'Email': d.email,
        'CC Emails': d.ccEmails,
        'Phone': d.phone,
        'Visit Date': d.visitDate,
        'Guests': d.guests,
        'Day Type': d.pricingDayType,
        'Season': d.pricingSeasonLabel,
        'Event': d.pricingEventName,
        'Indicative Pricing': summarisePricing(d.resolvedPricing),
    };

    const res = await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: process.env.GOOGLE_SCRIPT_SECRET, data }),
        redirect: 'follow',
        cache: 'no-store',
    });

    const out = await res.json().catch(() => null);
    if (!out?.ok) throw new Error(out?.error || `Sheet script responded ${res.status}`);
}
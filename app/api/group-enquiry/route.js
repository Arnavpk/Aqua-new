import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { appendEnquiryToSheet } from '@/lib/googleSheets';

export const runtime = 'nodejs';

const PARK_NAMES = {
    surat: 'Aqua Imagicaa Surat',
    indore: 'Aqua Imagicaa Indore',
    mehsana: 'Aqua Imagicaa Mehsana',
};

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

function fmt(n) {
    if (n == null || isNaN(n)) return '_____';
    return Number(n).toLocaleString('en-IN');
}

/* ═══════════════════════════════════════════════════════════════
   CORPORATE EMAIL
   ═══════════════════════════════════════════════════════════════ */

function buildCorporatePricingRows(p) {
    if (!p) {
        return `
        <tr><td style="padding:6px 12px;">Ticket Rates:</td><td style="padding:6px 12px;">Adults @ Rs. _____ less Rs. _____ discount = Rs. _____ + taxes per person</td></tr>
        <tr><td style="padding:6px 12px;">Ticket Rates:</td><td style="padding:6px 12px;">Kids (3.3 ft – 4.6 ft) @ Rs. _____ less Rs. _____ discount = Rs. _____ + taxes per person</td></tr>`;
    }
    let rows = '';
    if (p.comboAdult?.rate) rows += `<tr><td style="padding:6px 12px;font-weight:bold;">Combo Adult:</td><td style="padding:6px 12px;">@ Rs.${fmt(p.comboAdult.rate)} less Rs.${fmt(p.comboAdult.discount)} discount = <strong>Rs.${fmt(p.comboAdult.total)}</strong> + taxes per person</td></tr>`;
    if (p.comboKids?.rate) rows += `<tr><td style="padding:6px 12px;font-weight:bold;">Combo Kids:</td><td style="padding:6px 12px;">(3.3 ft – 4.6 ft) @ Rs.${fmt(p.comboKids.rate)} less Rs.${fmt(p.comboKids.discount)} discount = <strong>Rs.${fmt(p.comboKids.total)}</strong> + taxes per person</td></tr>`;
    if (p.soloAdult?.rate) rows += `<tr><td style="padding:6px 12px;font-weight:bold;">Solo Adult:</td><td style="padding:6px 12px;">@ Rs.${fmt(p.soloAdult.rate)} less Rs.${fmt(p.soloAdult.discount)} discount = <strong>Rs.${fmt(p.soloAdult.total)}</strong> + taxes per person</td></tr>`;
    if (p.soloKids?.rate) rows += `<tr><td style="padding:6px 12px;font-weight:bold;">Solo Kids:</td><td style="padding:6px 12px;">(3.3 ft – 4.6 ft) @ Rs.${fmt(p.soloKids.rate)} less Rs.${fmt(p.soloKids.discount)} discount = <strong>Rs.${fmt(p.soloKids.total)}</strong> + taxes per person</td></tr>`;
    if (!rows) rows = `<tr><td style="padding:6px 12px;" colspan="2"><em>Pricing to be confirmed by sales team</em></td></tr>`;
    rows += `<tr><td style="padding:6px 12px;" colspan="2"><em>Kids (below 3.3 feet height) are permitted at no extra charges accompanying their parents</em></td></tr>`;
    return rows;
}

function buildCorporateEmailHtml(data) {
    const parkName = PARK_NAMES[data.location] || 'Aqua Imagicaa';
    const visitDate = formatDate(data.visitDate);
    const p = data.resolvedPricing;
    const pricingRows = buildCorporatePricingRows(p);
    const pricingNote = data.pricingSeasonLabel
        ? `<p style="font-size:12px;color:#888;">Season: ${data.pricingSeasonLabel} · Day type: ${data.pricingDayType}${data.pricingEventName ? ' · ' + data.pricingEventName : ''}</p>`
        : '';

    return `<!DOCTYPE html>
<html><head><meta charset="utf-8" /></head>
<body style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;line-height:1.6;margin:0;padding:0;">
<div style="background:#0A5566;color:white;padding:24px 32px;text-align:center;">
    <h1 style="margin:0;font-size:22px;">${parkName} — Group Quotation</h1>
</div>
<div style="padding:24px 32px;">
<p>To,<br/><strong>${data.name}</strong><br/>${data.company}<br/>${data.city}${data.district ? ', ' + data.district : ''}${data.pinCode ? ' - ' + data.pinCode : ''}<br/>${data.phone}</p>
<p>Dear ${data.name},</p>
<p>Greetings from <strong>${parkName}</strong>! This is in reference to your enquiry for <strong>Corporate Group</strong> booking. We are pleased to offer you as follows:</p>

<h3 style="color:#0A5566;border-bottom:2px solid #00A5C8;padding-bottom:4px;">Visit Details</h3>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
    <tr><td style="padding:6px 12px;font-weight:bold;width:160px;">Date of Visit:</td><td style="padding:6px 12px;">${visitDate}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">No. of Pax:</td><td style="padding:6px 12px;">${data.guests}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Location:</td><td style="padding:6px 12px;">${parkName}</td></tr>
</table>

<h3 style="color:#0A5566;border-bottom:2px solid #00A5C8;padding-bottom:4px;">Quote for ${parkName} Water Park Ticket</h3>
<p><em>(Entry Ticket providing access to all international rides &amp; slides, between 10 AM to 06 PM as per daily ride schedule)</em></p>
${pricingNote}
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">${pricingRows}</table>

<h3 style="color:#0A5566;border-bottom:2px solid #00A5C8;padding-bottom:4px;">Lunch Options</h3>
<ul><li>Buffet Lunch @ Rs.450 AI per head (available for minimum 30 pax or more)</li><li>Food Recharge Option – Pay Rs.400 and Get Rs.500 Food Voucher</li></ul>

<h3 style="color:#0A5566;border-bottom:2px solid #00A5C8;padding-bottom:4px;">Extras</h3>
<ul>
    <li>18% Taxes on Entry Ticket</li>
    <li>Breakfast, if required, @ Rs.150 AI per head (10:00 AM to 11:00 AM) for minimum 30 pax</li>
    <li>Hi Tea, if required @ Rs.100 AI per head (05:00 PM to 06:00 PM) for minimum 30 pax</li>
    <li>Parking @ Rs.50 AI for 2 Wheeler / Rs.100 for Car / Rs.200 for Bus</li>
    <li>Locker Rental @ Rs.400 AI (inclusive of Rs.100 refundable deposit)</li>
    <li>Costume Hire @ Rs.300 AI (inclusive of Rs.100 refundable deposit)</li>
</ul>

<h3 style="color:#0A5566;border-bottom:2px solid #00A5C8;padding-bottom:4px;">Optional Add-ons</h3>
<ul>
    <li>Customised T-Shirts / Costumes / Merchandise / Photo Frame</li>
    <li>Exclusive Photographer / Videographer for the full day</li>
    <li>Three Mini Attractions Bundled as One Package</li>
    <li>Team Building Activities</li>
</ul>

<h3 style="color:#0A5566;border-bottom:2px solid #00A5C8;padding-bottom:4px;">Terms &amp; Conditions</h3>
<ol style="font-size:12px;color:#666;padding-left:18px;">
    <li>To confirm your booking, please arrange an advance payment of the estimated bill to our bank account at least 3 working days prior to the visit date.</li>
    <li>Once confirmed, all group bookings will be liable for cancellation charges equivalent to 100% of the estimated bill.</li>
    <li>Any extras should be paid at the park on the day of the visit via Cash, Card Swipe, or DD.</li>
    <li>For a GST invoice, please share a scanned copy of your GST number at least 3 working days prior.</li>
    <li>Food Voucher invoices do not qualify for Input Tax Credit (ITC).</li>
    <li>We serve a pure vegetarian menu. Alcoholic drinks are not permitted.</li>
    <li>Rides are operated in a phase-wise manner as displayed at the park daily.</li>
    <li>Any ride may be temporarily unavailable due to maintenance without prior notice.</li>
    <li>Nylon/Lycra costumes are mandatory for water park rides.</li>
    <li>Height and weight restrictions apply to all rides.</li>
    <li>In case of rain, select rides may operate at management's discretion.</li>
    <li>Group tickets cannot be transferred, reissued, or sold to any third party.</li>
    <li>This quotation is valid for 7 days from the date of issue.</li>
    <li>All invoices are sent via email within 10 working days from the visit date.</li>
</ol>

<p>Please feel free to revert to us for any further clarifications.</p>
<p>Thanks &amp; Regards<br/><strong>Team ${parkName}</strong></p>
</div>
<div style="background:#f5f5f5;padding:16px 32px;font-size:11px;color:#999;text-align:center;">
    <p><strong>Disclaimer:</strong> This email is legally privileged and confidential. Unauthorized use may be unlawful.</p>
</div>
</body></html>`;
}

/* ═══════════════════════════════════════════════════════════════
   STUDENT EMAIL
   ═══════════════════════════════════════════════════════════════ */

function buildStudentEmailHtml(data) {
    const parkName = PARK_NAMES[data.location] || 'Aqua Imagicaa';
    const visitDate = formatDate(data.visitDate);
    const p = data.resolvedPricing;

    const schoolRate = p?.schoolRate ? `Rs.${fmt(p.schoolRate)}` : 'Rs. _____';
    const collegeRate = p?.collegeRate ? `Rs.${fmt(p.collegeRate)}` : 'Rs. _____';
    const teacherRate = p?.teacherRate ? `Rs.${fmt(p.teacherRate)}` : 'Rs. _____';

    return `<!DOCTYPE html>
<html><head><meta charset="utf-8" /></head>
<body style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;line-height:1.6;margin:0;padding:0;">
<div style="background:#0A5566;color:white;padding:24px 32px;text-align:center;">
    <h1 style="margin:0;font-size:22px;">${parkName} — Student Group Package</h1>
</div>
<div style="padding:24px 32px;">
<p>To,<br/><strong>${data.name}</strong><br/>${data.company}<br/>${data.city}${data.district ? ', ' + data.district : ''}${data.pinCode ? ' - ' + data.pinCode : ''}<br/>${data.phone}</p>
<p>Dear ${data.name},</p>
<p>Greetings from <strong>${parkName}</strong>! This is in reference to your enquiry for <strong>Student Group</strong> booking. We are pleased to offer you the following package:</p>

<h3 style="color:#0A5566;border-bottom:2px solid #00A5C8;padding-bottom:4px;">Visit Details</h3>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
    <tr><td style="padding:6px 12px;font-weight:bold;width:160px;">Date of Visit:</td><td style="padding:6px 12px;">${visitDate}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">No. of Students:</td><td style="padding:6px 12px;">${data.guests}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Location:</td><td style="padding:6px 12px;">${parkName}</td></tr>
</table>

<h3 style="color:#0A5566;border-bottom:2px solid #00A5C8;padding-bottom:4px;">Student Group Package (Available All Days)</h3>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;border:1px solid #e0e0e0;">
    <tr style="background:#f8f8f8;">
        <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #e0e0e0;">Category</td>
        <td style="padding:8px 12px;font-weight:bold;text-align:right;border-bottom:1px solid #e0e0e0;">Rate per person</td>
    </tr>
    <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e0e0e0;">1st to 12th Grade Students (Breakfast + Lunch)</td>
        <td style="padding:8px 12px;text-align:right;font-weight:bold;border-bottom:1px solid #e0e0e0;">${schoolRate}</td>
    </tr>
    <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e0e0e0;">Sr. College Students (3rd Year Graduation, maximum upto 22 yrs, with Breakfast &amp; Lunch)</td>
        <td style="padding:8px 12px;text-align:right;font-weight:bold;border-bottom:1px solid #e0e0e0;">${collegeRate}</td>
    </tr>
    <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e0e0e0;">Teachers (Breakfast + Lunch)</td>
        <td style="padding:8px 12px;text-align:right;font-weight:bold;border-bottom:1px solid #e0e0e0;">${teacherRate}</td>
    </tr>
    <tr>
        <td style="padding:8px 12px;">Free Teacher Ratio in case of Students Group</td>
        <td style="padding:8px 12px;text-align:right;font-weight:bold;">10:1</td>
    </tr>
</table>

<h3 style="color:#0A5566;border-bottom:2px solid #00A5C8;padding-bottom:4px;">Inclusions</h3>
<ul>
    <li>Water Park Entry Ticket (10 AM to 06 PM)</li>
    <li>Buffet Breakfast (10 AM to 11 AM)</li>
    <li>Buffet Lunch (1 PM to 3 PM)</li>
    <li>Rental Costumes (against refundable deposit) in water park</li>
    <li>Complimentary use of Lockers / Luggage Room (against refundable deposit) in water park</li>
    <li>10:1 FOC for Teacher</li>
    <li>GST on Entry Ticket and Meals</li>
</ul>

<h3 style="color:#0A5566;border-bottom:2px solid #00A5C8;padding-bottom:4px;">Menu (Part of Package)</h3>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;border:1px solid #e0e0e0;">
    <tr style="background:#f8f8f8;">
        <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #e0e0e0;width:50%;">Buffet Breakfast</td>
        <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #e0e0e0;">Buffet Lunch Menu</td>
    </tr>
    <tr>
        <td style="padding:8px 12px;vertical-align:top;">Poha &amp; Tea</td>
        <td style="padding:8px 12px;vertical-align:top;">Paneer Sabji, Dal, Rice, Roti, Salad, Papad, Pickle &amp; 2 piece Gulab Jamun</td>
    </tr>
</table>

<h3 style="color:#0A5566;border-bottom:2px solid #00A5C8;padding-bottom:4px;">Important Notes</h3>
<ul style="font-size:13px;color:#555;">
    <li>Package applicable for minimum 30 or more students.</li>
    <li>Package must be booked at least 72 hrs prior to the date of visit with advance payment.</li>
    <li>School Letterhead and School Students ID card is mandatory for all students.</li>
    <li>Without ID Card, students would be charged as per prevailing rates for regular ticket, Buffet Breakfast &amp; Buffet Lunch.</li>
    <li>In case of any pre-existing medical history, groups are advised not to bring such students / teachers to the park.</li>
    <li>Park is not liable in case of any untoward incidents or for not following the park rules.</li>
    <li>Height &amp; weight restrictions apply on rides. Please check the instruction boards before boarding.</li>
</ul>

<p>Please feel free to revert to us for any further clarifications.</p>
<p>Thanks &amp; Regards<br/><strong>Team ${parkName}</strong></p>
</div>
<div style="background:#f5f5f5;padding:16px 32px;font-size:11px;color:#999;text-align:center;">
    <p><strong>Disclaimer:</strong> This email is legally privileged and confidential. Unauthorized use may be unlawful.</p>
</div>
</body></html>`;
}

/* ═══════════════════════════════════════════════════════════════
   INTERNAL NOTIFICATION
   ═══════════════════════════════════════════════════════════════ */

function buildInternalNotificationHtml(data) {
    const parkName = PARK_NAMES[data.location] || 'Aqua Imagicaa';
    const p = data.resolvedPricing;
    const isStudent = data.quotationTypeSlug === 'student-group';

    let pricingBlock = '<p><em>No pricing resolved — manual quote needed</em></p>';

    if (p && isStudent) {
        pricingBlock = `
        <table style="border-collapse:collapse;font-size:13px;margin-top:8px;border:1px solid #e0e0e0;">
            <tr style="background:#f0f0f0;"><th style="padding:4px 10px;text-align:left;">Category</th><th style="padding:4px 10px;text-align:right;">Rate</th></tr>
            ${p.schoolRate ? `<tr><td style="padding:4px 10px;">School (1st–12th)</td><td style="padding:4px 10px;text-align:right;font-weight:bold;">₹${fmt(p.schoolRate)}</td></tr>` : ''}
            ${p.collegeRate ? `<tr><td style="padding:4px 10px;">Sr. College</td><td style="padding:4px 10px;text-align:right;font-weight:bold;">₹${fmt(p.collegeRate)}</td></tr>` : ''}
            ${p.teacherRate ? `<tr><td style="padding:4px 10px;">Teachers</td><td style="padding:4px 10px;text-align:right;font-weight:bold;">₹${fmt(p.teacherRate)}</td></tr>` : ''}
        </table>`;
    } else if (p && !isStudent) {
        pricingBlock = `
        <table style="border-collapse:collapse;font-size:13px;margin-top:8px;">
            <tr style="background:#f0f0f0;"><th style="padding:4px 10px;text-align:left;">Type</th><th style="padding:4px 10px;">Rate</th><th style="padding:4px 10px;">Disc</th><th style="padding:4px 10px;">Total</th></tr>
            ${p.comboAdult?.rate ? `<tr><td style="padding:4px 10px;">Combo Adult</td><td style="padding:4px 10px;text-align:right;">${fmt(p.comboAdult.rate)}</td><td style="padding:4px 10px;text-align:right;">${fmt(p.comboAdult.discount)}</td><td style="padding:4px 10px;text-align:right;font-weight:bold;">${fmt(p.comboAdult.total)}</td></tr>` : ''}
            ${p.comboKids?.rate ? `<tr><td style="padding:4px 10px;">Combo Kids</td><td style="padding:4px 10px;text-align:right;">${fmt(p.comboKids.rate)}</td><td style="padding:4px 10px;text-align:right;">${fmt(p.comboKids.discount)}</td><td style="padding:4px 10px;text-align:right;font-weight:bold;">${fmt(p.comboKids.total)}</td></tr>` : ''}
            ${p.soloAdult?.rate ? `<tr><td style="padding:4px 10px;">Solo Adult</td><td style="padding:4px 10px;text-align:right;">${fmt(p.soloAdult.rate)}</td><td style="padding:4px 10px;text-align:right;">${fmt(p.soloAdult.discount)}</td><td style="padding:4px 10px;text-align:right;font-weight:bold;">${fmt(p.soloAdult.total)}</td></tr>` : ''}
            ${p.soloKids?.rate ? `<tr><td style="padding:4px 10px;">Solo Kids</td><td style="padding:4px 10px;text-align:right;">${fmt(p.soloKids.rate)}</td><td style="padding:4px 10px;text-align:right;">${fmt(p.soloKids.discount)}</td><td style="padding:4px 10px;text-align:right;font-weight:bold;">${fmt(p.soloKids.total)}</td></tr>` : ''}
        </table>`;
    }

    if (p && data.pricingSeasonLabel) {
        pricingBlock += `<p style="font-size:11px;color:#888;margin-top:4px;">Season: ${data.pricingSeasonLabel} · ${data.pricingDayType || 'all days'}${data.pricingEventName ? ' · ' + data.pricingEventName : ''}</p>`;
    }

    return `<h2 style="font-family:Arial,sans-serif;">New ${data.quotationType || 'Group'} Enquiry — ${parkName}</h2>
<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
    <tr><td style="padding:6px 12px;font-weight:bold;">Quotation For:</td><td style="padding:6px 12px;">${data.quotationType || 'Corporate Group'}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Name:</td><td style="padding:6px 12px;">${data.name}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">${isStudent ? 'School/College' : 'Company'}:</td><td style="padding:6px 12px;">${data.company}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">City:</td><td style="padding:6px 12px;">${data.city}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">District:</td><td style="padding:6px 12px;">${data.district}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Pin Code:</td><td style="padding:6px 12px;">${data.pinCode || '—'}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Email:</td><td style="padding:6px 12px;">${data.email}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">CC Emails:</td><td style="padding:6px 12px;">${data.ccEmails || '—'}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Phone:</td><td style="padding:6px 12px;">${data.phone}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Visit Date:</td><td style="padding:6px 12px;">${formatDate(data.visitDate)}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">No. of ${isStudent ? 'Students' : 'Guests'}:</td><td style="padding:6px 12px;">${data.guests}</td></tr>
</table>
<h3 style="font-family:Arial,sans-serif;margin-top:16px;">Resolved Pricing</h3>
${pricingBlock}`;
}

/* ═══════════════════════════════════════════════════════════════
   POST HANDLER
   ═══════════════════════════════════════════════════════════════ */

export async function POST(request) {
    try {
        const body = await request.json();

        const required = ['name', 'company', 'city', 'district', 'email', 'confirmEmail', 'phone', 'visitDate', 'guests', 'location'];
        for (const field of required) {
            if (!body[field]?.trim?.()) {
                return NextResponse.json({ error: `${field} is required` }, { status: 400 });
            }
        }

        if (body.email !== body.confirmEmail) {
            return NextResponse.json({ error: 'Emails do not match' }, { status: 400 });
        }

        if (!/^\d{10}$/.test(body.phone)) {
            return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
        }

        const parkName = PARK_NAMES[body.location] || 'Aqua Imagicaa';
        const isStudent = body.quotationTypeSlug === 'student-group';

        // 0. Save to Google Sheet first, so the lead is recorded even if email fails
        try {
            await appendEnquiryToSheet({
                ...body,
                location: parkName, // "Aqua Imagicaa Surat" instead of "surat"
                visitDate: formatDate(body.visitDate), // DD/MM/YYYY
            });
        } catch (sheetErr) {
            console.error('Group enquiry → Google Sheet failed:', sheetErr.message);
            // don't block the enquiry if the sheet write fails
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: { rejectUnauthorized: false },
        });

        // Pick the right email template
        const customerHtml = isStudent
            ? buildStudentEmailHtml(body)
            : buildCorporateEmailHtml(body);

        const subjectPrefix = isStudent ? 'Student Group Package' : 'Group Quotation';

        // 1. Quotation to customer
        await transporter.sendMail({
            from: `"${parkName}" <${process.env.SMTP_FROM}>`,
            to: body.email,
            cc: body.ccEmails || undefined,
            subject: `${subjectPrefix} — ${parkName} — ${formatDate(body.visitDate)}`,
            html: customerHtml,
        });

        // 2. Internal notification
        await transporter.sendMail({
            from: `"${parkName}" <${process.env.SMTP_FROM}>`,
            to: process.env.GROUP_ENQUIRY_EMAIL,
            replyTo: body.email,
            subject: `[Internal] ${body.quotationType || 'Group'} Enquiry — ${body.company} — ${body.guests} — ${body.location}`,
            html: buildInternalNotificationHtml(body),
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Group enquiry error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
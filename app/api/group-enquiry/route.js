import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { appendEnquiryToSheet } from '@/lib/googleSheets';

export const runtime = 'nodejs';

const PARK_NAMES = {
    surat: 'Aqua Imagicaa Surat',
    indore: 'Aqua Imagicaa Indore',
    mehsana: 'Aqua Imagicaa Mehsana',
};

// Branding used only in the corporate quotation email.
// Parks without an entry fall back to PARK_NAMES and no tagline.
const CORPORATE_BRANDING = {
    mehsana: {
        displayName: 'Aqua Imagicaa @ Shankus',
        tagline: "Gujarat's Biggest International Water Park",
    },
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
        <tr><td style="padding:6px 12px;">Ticket Rates:</td><td style="padding:6px 12px;">Adults @ Rs. _____ less Rs. _____ discount = Rs. _____ + 18% taxes per person</td></tr>
        <tr><td style="padding:6px 12px;">Ticket Rates:</td><td style="padding:6px 12px;">Kids (Between 3.3 feet to 4 feet) @ Rs. _____ less Rs. _____ discount = Rs. _____ + 18% taxes per person</td></tr>
        <tr><td style="padding:6px 12px;" colspan="2"><em>Kids (below 3.3 feet height) are permitted at no extra charges accompanying their parents</em></td></tr>`;
    }
    let rows = '';
    if (p.comboAdult?.rate) rows += `<tr><td style="padding:6px 12px;font-weight:bold;">Combo Adult:</td><td style="padding:6px 12px;">@ Rs.${fmt(p.comboAdult.rate)} less Rs.${fmt(p.comboAdult.discount)} discount = <strong>Rs.${fmt(p.comboAdult.total)}</strong> + 18% taxes per person</td></tr>`;
    if (p.comboKids?.rate) rows += `<tr><td style="padding:6px 12px;font-weight:bold;">Combo Kids:</td><td style="padding:6px 12px;">(Between 3.3 feet to 4 feet) @ Rs.${fmt(p.comboKids.rate)} less Rs.${fmt(p.comboKids.discount)} discount = <strong>Rs.${fmt(p.comboKids.total)}</strong> + 18% taxes per person</td></tr>`;
    if (p.soloAdult?.rate) rows += `<tr><td style="padding:6px 12px;font-weight:bold;">Solo Adult:</td><td style="padding:6px 12px;">@ Rs.${fmt(p.soloAdult.rate)} less Rs.${fmt(p.soloAdult.discount)} discount = <strong>Rs.${fmt(p.soloAdult.total)}</strong> + 18% taxes per person</td></tr>`;
    if (p.soloKids?.rate) rows += `<tr><td style="padding:6px 12px;font-weight:bold;">Solo Kids:</td><td style="padding:6px 12px;">(Between 3.3 feet to 4 feet) @ Rs.${fmt(p.soloKids.rate)} less Rs.${fmt(p.soloKids.discount)} discount = <strong>Rs.${fmt(p.soloKids.total)}</strong> + 18% taxes per person</td></tr>`;
    if (!rows) rows = `<tr><td style="padding:6px 12px;" colspan="2"><em>Pricing to be confirmed by sales team</em></td></tr>`;
    rows += `<tr><td style="padding:6px 12px;" colspan="2"><em>Kids (below 3.3 feet height) are permitted at no extra charges accompanying their parents</em></td></tr>`;
    return rows;
}

function buildCorporateEmailHtml(data) {
    const parkName = PARK_NAMES[data.location] || 'Aqua Imagicaa';
    const brand = CORPORATE_BRANDING[data.location] || {};
    const displayName = brand.displayName || parkName;
    const greetingName = brand.tagline ? `${displayName}, ${brand.tagline}` : displayName;
    const visitDate = formatDate(data.visitDate);
    const p = data.resolvedPricing;
    const pricingRows = buildCorporatePricingRows(p);
    const pricingNote = data.pricingSeasonLabel
        ? `<p style="font-size:12px;color:#888;">Season: ${data.pricingSeasonLabel} · Day type: ${data.pricingDayType}${data.pricingEventName ? ' · ' + data.pricingEventName : ''}</p>`
        : '';

    const h3 = 'color:#0A5566;border-bottom:2px solid #00A5C8;padding-bottom:4px;';
    const menuStyle = 'list-style:none;padding-left:16px;margin:2px 0 6px;font-size:13px;color:#555;';

    return `<!DOCTYPE html>
<html><head><meta charset="utf-8" /></head>
<body style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;line-height:1.6;margin:0;padding:0;">
<div style="background:#0A5566;color:white;padding:24px 32px;text-align:center;">
    <h1 style="margin:0;font-size:22px;">${displayName} — Group Quotation</h1>
</div>
<div style="padding:24px 32px;">
<p>To,<br/><strong>${data.name}</strong><br/>${data.company}<br/>${data.city}<br/>${data.phone}</p>
<p>Dear ${data.name},</p>
<p>Greetings from <strong>${greetingName}</strong>.</p>
<p>This is in reference to your enquiry for group booking, we are pleased to offer you as follows:</p>

<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
    <tr><td style="padding:6px 12px;font-weight:bold;width:160px;">Date of Visit:</td><td style="padding:6px 12px;">${visitDate}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">No. of Pax:</td><td style="padding:6px 12px;">${data.guests} (minimum guaranteed)</td></tr>
</table>

<h3 style="${h3}">Ticket Rates</h3>
${pricingNote}
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">${pricingRows}</table>

<h3 style="${h3}">Meal Options</h3>
<ul>
    <li>Buffet Breakfast @ Rs.180 AI per head (10 AM to 11 AM) for minimum 30 pax
        <ul style="${menuStyle}"><li>&#8250; <em>Buffet Menu: Poha + Idli + Sambhar + Coconut Chutney + Tea / Coffee</em></li></ul>
    </li>
    <li>Buffet Lunch @ Rs.500 AI per head (available for minimum 30 pax or more)
        <ul style="${menuStyle}"><li>&#8250; <em>Paneer Main Course, Mixed Veg, Dal, Rice, Roti, Salad, Papad, Pickle, Raita &amp; Gulab Jamun</em></li></ul>
    </li>
    <li>Hi Tea @ Rs.200 AI per head (05 PM to 06 PM) for minimum 30 pax
        <ul style="${menuStyle}"><li>&#8250; <em>Assorted Pakora + Tea / Coffee</em></li></ul>
    </li>
</ul>

<h3 style="${h3}">Extras</h3>
<ul>
    <li>18% Taxes on Entry Ticket</li>
    <li>Parking @ Rs.50 AI for 2 Wheeler / Rs.100 for Car / Rs.200 for Bus</li>
    <li>Locker Rental @ Rs.400 AI (inclusive of Rs.100 refundable deposit)</li>
    <li>Costume Hire @ Rs.300 AI (inclusive of Rs.100 refundable deposit)</li>
</ul>

<h3 style="${h3}">Terms &amp; Conditions</h3>
<ul style="font-size:12px;color:#666;padding-left:18px;">
    <li>To confirm your booking, please arrange to make an advance payment of the estimated bill to our bank account, at least 3 working days prior to the date of visit, and share the transaction details of the same, clearly mentioning your date of visit, your company name and confirmed no. of persons.</li>
    <li>Once confirmed, with an email / purchase order or advance, all Group bookings would be liable for cancellation charges equivalent to 100% of the estimated bill, in the event of cancellation / modifications / postponement / name change or rerouting of the booking through any other channel.</li>
    <li>Any extras should be paid at the park on the day of the visit in Cash, Card Swipe, or DD. Cheques are not accepted.</li>
    <li>For GST invoice, please share the scanned copy of your GST number, at least 3 working days prior to the date of visit. No changes would be made once the bill is generated.</li>
    <li>Please note that we serve a Pure Vegetarian Menu, and strictly do not permit any alcoholic drinks or persons who have consumed alcohol inside the park.</li>
    <li>Rides are operated in a phase-wise manner. The same is displayed at the park every day.</li>
    <li>Any rides / attractions may be paused temporarily or for a longer period, if required, due to maintenance or any other reason without any prior notice.</li>
    <li>It is mandatory to wear Nylon/Lycra costumes to enter the water park rides. You may bring the same from your end OR purchase/hire from the park.</li>
    <li>Height and Weight restrictions apply on all rides. Please check the instruction boards for the same. At all times, for all rides, safety gears / lap bars must be closed for the rider's safety. The final permission to provide access to the rides would be at the discretion of the park management.</li>
    <li>In case of rains, select rides and attractions would be operated as per Management discretion, keeping the safety of the visitors in consideration.</li>
    <li>The tickets issued to your group are exclusively for your group's use. They cannot be transferred, reissued, or sold to any third party under any circumstances.</li>
    <li>In case of any TDS deductions, please ensure to provide the details of the same on the scanned copy of your company letterhead. In case the same is not provided, any difference in the total amount payable will be collected by default at the ticket counter on the day of visit.</li>
    <li>This quote is valid for a period of 7 days from the date of this email. Unless confirmed in writing with advance payment, management reserves the right to change the prices, park timings or package inclusions without any prior intimation.</li>
    <li>All invoices are provided by email within 10 working days from your visit date.</li>
</ul>

<p>Please feel free to revert to us for any further clarifications.</p>
<p>Thanks &amp; Regards<br/><strong>Team ${displayName}</strong></p>
</div>
<div style="background:#f5f5f5;padding:16px 32px;font-size:11px;color:#999;text-align:center;">
    <p><strong>Disclaimer:</strong> This email message is legally privileged, confidential and is for the use of the individual or entity to whom it is addressed. If you are not the addressee, please do not disclose, copy, circulate or in any other way use the information contained in this transmission. Such unauthorised use may be unlawful. If you have received this message in error, please delete it and notify us immediately by email.</p>
    <p>We scan all e-mails for viruses but do not guarantee that any e-mail is virus-free and accept no responsibility should any loss or damage result from the use of this email message or its attachment(s).</p>
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
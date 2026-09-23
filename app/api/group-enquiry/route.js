import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';  // npm install nodemailer

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

function buildEmailHtml(data) {
    const parkName = PARK_NAMES[data.location] || 'Aqua Imagicaa';
    const visitDate = formatDate(data.visitDate);

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
    body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333; line-height: 1.6; }
    .header { background: #0A5566; color: white; padding: 24px 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; }
    .content { padding: 24px 32px; }
    .section { margin-bottom: 20px; }
    .section h3 { color: #0A5566; font-size: 15px; margin: 0 0 8px; border-bottom: 2px solid #00A5C8; padding-bottom: 4px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    .info-table td { padding: 6px 12px; vertical-align: top; }
    .info-table td:first-child { font-weight: bold; width: 160px; color: #555; }
    .terms { font-size: 12px; color: #666; }
    .terms ol { padding-left: 18px; }
    .terms li { margin-bottom: 6px; }
    .footer { background: #f5f5f5; padding: 16px 32px; font-size: 11px; color: #999; text-align: center; }
</style>
</head>
<body>

<div class="header">
    <h1>${parkName} — Group Quotation</h1>
</div>

<div class="content">

<p>To,<br/>
<strong>${data.name}</strong><br/>
${data.company}<br/>
${data.city}${data.district ? ', ' + data.district : ''}${data.pinCode ? ' - ' + data.pinCode : ''}<br/>
${data.phone}</p>

<p>Dear ${data.name},</p>

<p>Greetings from <strong>${parkName}</strong>! This is in reference to your enquiry for group booking. We are pleased to offer you as follows:</p>

<div class="section">
    <h3>Visit Details</h3>
    <table class="info-table">
        <tr><td>Date of Visit:</td><td>${visitDate}</td></tr>
        <tr><td>No. of Pax:</td><td>${data.guests}</td></tr>
        <tr><td>Location:</td><td>${parkName}</td></tr>
    </table>
</div>

<div class="section">
    <h3>Quote for ${parkName} Water Park Solo Ticket</h3>
    <p><em>(Entry Ticket of Water Park providing access to all international rides &amp; slides, between 10 AM to 06 PM as per daily ride schedule)</em></p>
    <table class="info-table">
        <tr><td>Ticket Rates:</td><td>Adults @ Rs. _____ less Rs. _____ discount = Rs. _____ + taxes per person</td></tr>
        <tr><td>Ticket Rates:</td><td>Kids (Between 3.3 feet to 4.6 feet) @ Rs. _____ less Rs. _____ discount = Rs. _____ + taxes per person</td></tr>
        <tr><td colspan="2"><em>Kids (below 3.3 feet height) are permitted at no extra charges accompanying their parents</em></td></tr>
    </table>
</div>

<div class="section">
    <h3>Lunch Options</h3>
    <ul>
        <li>Buffet Lunch @ Rs.450 AI per head (available for minimum 30 pax or more)</li>
        <li>Food Recharge Option – Pay Rs.400 and Get Rs.500 Food Voucher</li>
    </ul>
</div>

<div class="section">
    <h3>Extras</h3>
    <ul>
        <li>18% Taxes on Entry Ticket</li>
        <li>Breakfast, if required, @ Rs.150 AI per head (10:00 AM to 11:00 AM) for minimum 30 pax</li>
        <li>Hi Tea, if required @ Rs.100 AI per head (05:00 PM to 06:00 PM) for minimum 30 pax</li>
        <li>Parking @ Rs.50 AI for 2 Wheeler / Rs.100 for Car / Rs.200 for Bus</li>
        <li>Locker Rental @ Rs.400 AI (inclusive of Rs.100 refundable deposit)</li>
        <li>Costume Hire @ Rs.300 AI (inclusive of Rs.100 refundable deposit)</li>
    </ul>
</div>

<div class="section">
    <h3>Optional Add-ons</h3>
    <ul>
        <li>Customised T-Shirts / Costumes / Merchandise / Photo Frame</li>
        <li>Exclusive Photographer / Videographer for the full day</li>
        <li>Three Mini Attractions Bundled as One Package</li>
        <li>Team Building Activities</li>
    </ul>
</div>

<div class="section terms">
    <h3>Terms &amp; Conditions</h3>
    <ol>
        <li>To confirm your booking, please arrange an advance payment of the estimated bill to our bank account at least 3 working days prior to the visit date and share the transaction details, clearly mentioning your date of visit, company name, and confirmed number of persons.</li>
        <li>Once confirmed through email, purchase order, or advance payment, all group bookings will be liable for cancellation charges equivalent to 100% of the estimated bill in case of cancellation, modification, postponement, name change, or rerouting through any other channel.</li>
        <li>Any extras should be paid at the park on the day of the visit via Cash, Card Swipe, or DD. Cheques are not accepted.</li>
        <li>For a GST invoice, please share a scanned copy of your GST number at least 3 working days prior to the visit date. No changes will be made once the bill is generated.</li>
        <li>In case of a Food Voucher, please note that a separate invoice is generated. This does not qualify for Input Tax Credit (ITC).</li>
        <li>Please note that we serve a pure vegetarian menu and strictly do not permit alcoholic drinks or persons under the influence of alcohol inside the park.</li>
        <li>Rides are operated in a phase-wise manner. The schedule is displayed at the park daily.</li>
        <li>Any ride or attraction may be temporarily or long-term unavailable due to maintenance or any other reason without prior notice.</li>
        <li>It is mandatory to wear Nylon/Lycra costumes to access water park rides. Guests may bring their own or purchase/hire them from the park.</li>
        <li>Height and weight restrictions apply to all rides. Please refer to the instruction boards. Safety gears and lap bars must be properly secured. Final access to rides is subject to park management discretion.</li>
        <li>In case of rain, select rides and attractions may operate at the management's discretion, keeping visitor safety in consideration.</li>
        <li>Tickets issued to your group are exclusively for your group's use and cannot be transferred, reissued, or sold to any third party.</li>
        <li>In case of TDS deductions, please provide the details on a scanned copy of your company letterhead. If not provided, any difference in the payable amount will be collected at the ticket counter on the day of the visit.</li>
        <li>This quotation is valid for 7 days from the date of issue. Unless confirmed in writing with advance payment, management reserves the right to change prices, park timings, or package inclusions without prior notice.</li>
        <li>All invoices are sent via email within 10 working days from the visit date.</li>
    </ol>
</div>

<p>Please feel free to revert to us for any further clarifications.</p>

<p>Thanks &amp; Regards<br/>
<strong>Team ${parkName}</strong></p>

</div>

<div class="footer">
    <p><strong>Disclaimer:</strong> This email message is legally privileged, confidential and is for the use of the individual or entity to whom it is addressed. If you are not the addressee, please do not disclose, copy, circulate or in any other way use the information contained in this transmission. Such unauthorized use may be unlawful. If you have received this message in error, please delete it and notify us immediately by email.</p>
    <p>We scan all e-mails for viruses, but do not guarantee that any e-mail is virus-free and accept no responsibility should any loss or damage result from the use of this email message or its attachment(s).</p>
</div>

</body>
</html>`;
}

function buildInternalNotificationHtml(data) {
    const parkName = PARK_NAMES[data.location] || 'Aqua Imagicaa';
    return `<h2>New Group Enquiry — ${parkName}</h2>
<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
    <tr><td style="padding:6px 12px;font-weight:bold;">Name:</td><td style="padding:6px 12px;">${data.name}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Company:</td><td style="padding:6px 12px;">${data.company}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">City:</td><td style="padding:6px 12px;">${data.city}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">District:</td><td style="padding:6px 12px;">${data.district}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Pin Code:</td><td style="padding:6px 12px;">${data.pinCode || '—'}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Email:</td><td style="padding:6px 12px;">${data.email}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">CC Emails:</td><td style="padding:6px 12px;">${data.ccEmails || '—'}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Phone:</td><td style="padding:6px 12px;">${data.phone}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Visit Date:</td><td style="padding:6px 12px;">${formatDate(data.visitDate)}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">No. of Guests:</td><td style="padding:6px 12px;">${data.guests}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Location:</td><td style="padding:6px 12px;">${parkName}</td></tr>
</table>
<p style="margin-top:16px;font-size:13px;color:#888;">Fill in the pricing and forward the quotation to the customer.</p>`;
}

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

        // ─── SMTP (uncomment when ready) ────────────────────────

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // 1. Quotation to customer
        await transporter.sendMail({
            from: `"${PARK_NAMES[body.location] || 'Aqua Imagicaa'}" <${process.env.SMTP_FROM}>`,
            to: body.email,
            cc: body.ccEmails || undefined,
            subject: `Group Quotation — ${PARK_NAMES[body.location] || 'Aqua Imagicaa'} — ${formatDate(body.visitDate)}`,
            html: buildEmailHtml(body),
        });

        // 2. Internal notification to sales
        await transporter.sendMail({
            from: `"${PARK_NAMES[body.location] || 'Aqua Imagicaa'}" <${process.env.SMTP_FROM}>`,
            to: process.env.GROUP_ENQUIRY_EMAIL,
            replyTo: body.email,
            subject: `[Internal] Group Enquiry — ${body.company} — ${body.guests} — ${body.location}`,
            html: buildInternalNotificationHtml(body),
        });

        // ─────────────────────────────────────────────────────────

        console.log('GROUP ENQUIRY:', JSON.stringify(body, null, 2));

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Group enquiry error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
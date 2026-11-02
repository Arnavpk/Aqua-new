// app/api/corporate-enquiry/route.js
// Corporate outing enquiry → two emails:
//   1. Sales team notification  (from contactus@imagicaaworld.in → sales team, Reply-To = customer)
//   2. Customer auto-reply      (from contactus@imagicaaworld.in → customer, Reply-To = sales team)

import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // nodemailer needs Node, not the Edge runtime

// ═════════════════════════════════════════════════════════════════════════════
// CREDENTIALS & SETTINGS — read from .env (never put real values in this file)
//   INDR_SMTP_HOST=...
//   INDR_SMTP_PORT=587        # 465 = SSL, 587 = STARTTLS
//   INDR_SMTP_USER=...
//   INDR_SMTP_PASS=...
//   INDR_SITE_URL=https://... # optional, adds an "Explore the park" button to the customer email
// ═════════════════════════════════════════════════════════════════════════════
const SMTP = {
    host: process.env.INDR_SMTP_HOST,
    port: Number(process.env.INDR_SMTP_PORT || 587),
    user: process.env.INDR_SMTP_USER,
    pass: process.env.INDR_SMTP_PASS,
};
const SITE_URL = (process.env.INDR_SITE_URL || '').replace(/\/$/, '');

const FROM = { name: 'Aqua Imagicaa', address: 'contactus@imagicaaworld.in' };

// Per-park settings. Add Surat / Mehsana here when their corporate pages go live.
const LOCATIONS = {
    indore: {
        name: 'Indore',
        salesEmail: 'salesteam.indore@aquaimagicaa.com',
        contact: {
            phone: '022-69660016',
            phoneHref: 'tel:02269660016',
            email: 'contact.indore@aquaimagicaa.com',
            hours: '9 AM to 9 PM, all days',
        },
    },
};
const DEFAULT_LOCATION = 'indore';

// ═════════════════════════════════════════════════════════════════════════════
// EMAIL TEMPLATES
//   buildTeamEmail(d)     → sales team notification
//   buildCustomerEmail(d) → auto-reply to the customer
// Email-safe markup: tables + inline styles only (Gmail/Outlook ignore <style>, flexbox, etc.).
// Every value from the form is escaped here, at the point it goes into HTML.
// ═════════════════════════════════════════════════════════════════════════════

const BRAND = {
    name: 'Aqua Imagicaa',
    deep: '#0A5566',
    teal: '#00A5C8',
    aqua: '#22C4DE',
    ink: '#0C3B47',
    muted: '#5B7A84',
    line: '#D6F1F5',
    tint: '#EAFBFD',
    sun: '#FFD84D',
};

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Keeps line breaks the customer typed in the message box
const multiline = (value) => escapeHtml(value).replace(/\r?\n/g, '<br/>');

const FONT = "font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;";

/* ── Shared building blocks ─────────────────────────────────────────────── */

function shell({ preheader, title, subtitle, content, footer }) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="x-apple-disable-message-reformatting" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.tint};${FONT}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.tint};">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${BRAND.line};">
        <tr>
          <td style="background:${BRAND.deep};background-image:linear-gradient(135deg,${BRAND.deep} 0%,${BRAND.teal} 70%,${BRAND.aqua} 100%);padding:28px 32px;">
            <div style="${FONT}font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.sun};font-weight:700;">${BRAND.name}</div>
            <div style="${FONT}font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;margin-top:6px;">${escapeHtml(title)}</div>
            ${subtitle ? `<div style="${FONT}font-size:14px;line-height:1.5;color:#E3F7FA;margin-top:6px;">${escapeHtml(subtitle)}</div>` : ''}
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 8px 32px;${FONT}font-size:15px;line-height:1.6;color:${BRAND.ink};">
            ${content}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 28px 32px;border-top:1px solid ${BRAND.line};${FONT}font-size:12px;line-height:1.6;color:${BRAND.muted};">
            ${footer}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function sectionTitle(text) {
    return `<div style="${FONT}font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND.teal};font-weight:700;margin:22px 0 8px 0;">${escapeHtml(text)}</div>`;
}

// Two-column label/value rows. Empty values are skipped.
function detailRows(rows) {
    const body = rows
        .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
        .map(
            ([label, value, isHtml]) => `
      <tr>
        <td valign="top" style="padding:9px 12px 9px 0;width:38%;border-bottom:1px solid ${BRAND.line};${FONT}font-size:13px;color:${BRAND.muted};">${escapeHtml(label)}</td>
        <td valign="top" style="padding:9px 0;border-bottom:1px solid ${BRAND.line};${FONT}font-size:14px;color:${BRAND.ink};font-weight:600;">${isHtml ? value : escapeHtml(value)}</td>
      </tr>`
        )
        .join('');
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${body}</table>`;
}

function messageBox(text) {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="background:${BRAND.tint};border-left:4px solid ${BRAND.aqua};border-radius:8px;padding:14px 16px;${FONT}font-size:14px;line-height:1.6;color:${BRAND.ink};">${multiline(text)}</td>
      </tr>
    </table>`;
}

function button(label, href) {
    return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 4px 0;">
      <tr>
        <td style="background:${BRAND.sun};border-radius:999px;">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 24px;${FONT}font-size:14px;font-weight:700;color:${BRAND.ink};text-decoration:none;">${escapeHtml(label)}</a>
        </td>
      </tr>
    </table>`;
}

const link = (text, href) =>
    `<a href="${escapeHtml(href)}" style="color:${BRAND.teal};text-decoration:none;font-weight:600;">${escapeHtml(text)}</a>`;

/* ── Shared field list (same order in both emails) ─────────────────────── */

function enquiryRows(d) {
    return [
        ['Preferred date', d.dateLabel],
        ['Number of guests', d.headcount],
        ['Type of outing', d.outingType],
        ['Banquet needed', d.banquet],
        ['Park', d.locationName],
    ];
}

/* ── 1. Sales team notification ─────────────────────────────────────────── */

function buildTeamEmail(d) {
    const subjectBits = [d.company || d.name, d.headcount && `${d.headcount} guests`, d.dateLabel].filter(Boolean);
    const subject = `New corporate outing enquiry: ${subjectBits.join(' · ')}`;

    const contactRows = [
        ['Name', d.name],
        ['Company', d.company],
        ['Designation', d.designation],
        ['Email', link(d.email, `mailto:${d.email}`), true],
        ['Phone', d.phone ? link(d.phone, `tel:${d.phone.replace(/[^\d+]/g, '')}`) : '', true],
        ['City', d.city],
    ];

    const content = `
      <p style="margin:0 0 4px 0;">A new corporate outing enquiry has come in from the website. Reply to this email to answer the customer directly.</p>
      ${sectionTitle('Contact')}
      ${detailRows(contactRows)}
      ${sectionTitle('Outing details')}
      ${detailRows(enquiryRows(d))}
      ${d.message ? `${sectionTitle('Message')}${messageBox(d.message)}` : ''}
      <div style="height:18px;line-height:18px;">&nbsp;</div>
      ${button(`Reply to ${d.name || 'customer'}`, `mailto:${d.email}?subject=${encodeURIComponent(`Your corporate outing at ${d.locationName ? `${BRAND.name} ${d.locationName}` : BRAND.name}`)}`)}
    `;

    const footer = `Received ${escapeHtml(d.receivedAt)}${d.source ? ` · via ${escapeHtml(d.source)}` : ''}${d.pageUrl ? `<br/>Page: ${escapeHtml(d.pageUrl)}` : ''}`;

    const html = shell({
        preheader: `${d.name || 'Someone'}${d.company ? ` from ${d.company}` : ''} wants to plan a corporate outing.`,
        title: 'New corporate outing enquiry',
        subtitle: [d.company, d.locationName && `${BRAND.name} ${d.locationName}`].filter(Boolean).join(' · '),
        content,
        footer,
    });

    const text = [
        'New corporate outing enquiry',
        '',
        'CONTACT',
        `Name: ${d.name}`,
        d.company && `Company: ${d.company}`,
        d.designation && `Designation: ${d.designation}`,
        `Email: ${d.email}`,
        `Phone: ${d.phone}`,
        d.city && `City: ${d.city}`,
        '',
        'OUTING DETAILS',
        ...enquiryRows(d).filter(([, v]) => v).map(([l, v]) => `${l}: ${v}`),
        d.message && '',
        d.message && 'MESSAGE',
        d.message,
        '',
        `Received ${d.receivedAt}${d.source ? ` via ${d.source}` : ''}`,
    ]
        .filter((line) => line !== undefined && line !== null && line !== false)
        .join('\n')
        .replace(/\n{3,}/g, '\n\n');

    return { subject, html, text };
}

/* ── 2. Customer auto-reply ─────────────────────────────────────────────── */

function buildCustomerEmail(d, contact) {
    const parkName = d.locationName ? `${BRAND.name} ${d.locationName}` : BRAND.name;
    const subject = `We've received your corporate outing enquiry · ${parkName}`;
    const firstName = (d.name || '').trim().split(/\s+/)[0] || 'there';

    const content = `
      <p style="margin:0 0 12px 0;">Hi ${escapeHtml(firstName)},</p>
      <p style="margin:0 0 12px 0;">Thank you for thinking of ${escapeHtml(parkName)} for your team's day out. We've received your enquiry, and our corporate sales team will get back to you with a quote and availability for your date.</p>
      ${sectionTitle('Your enquiry')}
      ${detailRows([
        ['Company', d.company],
        ...enquiryRows(d),
    ])}
      ${d.message ? `${sectionTitle('Your message')}${messageBox(d.message)}` : ''}
      ${sectionTitle('Need to add something?')}
      <p style="margin:0 0 6px 0;">Just reply to this email, or reach us directly:</p>
      <p style="margin:0 0 16px 0;">
        ${contact.phone ? `Phone: ${link(contact.phone, contact.phoneHref)}<br/>` : ''}
        ${contact.email ? `Email: ${link(contact.email, `mailto:${contact.email}`)}<br/>` : ''}
        ${contact.hours ? `<span style="color:${BRAND.muted};">${escapeHtml(contact.hours)}</span>` : ''}
      </p>
      ${contact.siteUrl ? button(`Explore ${parkName}`, contact.siteUrl) : ''}
      <p style="margin:18px 0 0 0;">See you at the wave pool,<br/><strong>Team ${escapeHtml(parkName)}</strong></p>
    `;

    const footer = `You're receiving this email because you sent a corporate outing enquiry on the ${escapeHtml(parkName)} website. If this wasn't you, you can ignore this email.<br/>${escapeHtml(BRAND.name)} is run by Imagicaaworld Entertainment Limited.`;

    const html = shell({
        preheader: 'Thanks! Our corporate sales team will be in touch with a quote.',
        title: 'Thanks, we have your enquiry',
        subtitle: 'Our corporate sales team will be in touch with a quote.',
        content,
        footer,
    });

    const text = [
        `Hi ${firstName},`,
        '',
        `Thank you for thinking of ${parkName} for your team's day out. We've received your enquiry, and our corporate sales team will get back to you with a quote and availability for your date.`,
        '',
        'YOUR ENQUIRY',
        d.company && `Company: ${d.company}`,
        ...enquiryRows(d).filter(([, v]) => v).map(([l, v]) => `${l}: ${v}`),
        d.message && '',
        d.message && `Your message: ${d.message}`,
        '',
        'Need to add something? Reply to this email, or reach us:',
        contact.phone && `Phone: ${contact.phone}`,
        contact.email && `Email: ${contact.email}`,
        contact.hours,
        '',
        `See you at the wave pool,`,
        `Team ${parkName}`,
    ]
        .filter((line) => line !== undefined && line !== null && line !== false)
        .join('\n')
        .replace(/\n{3,}/g, '\n\n');

    return { subject, html, text };
}

// ═════════════════════════════════════════════════════════════════════════════
// SENDING
// ═════════════════════════════════════════════════════════════════════════════

// ─── Transporter (created once, reused) ───────────────────────────────────────
let transporter;
function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: SMTP.host,
            port: SMTP.port,
            secure: SMTP.port === 465,
            auth: { user: SMTP.user, pass: SMTP.pass },
            pool: true,
            maxConnections: 3,
        });
    }
    return transporter;
}

// ─── Input cleaning ───────────────────────────────────────────────────────────
// Trim, drop control characters, cap length. HTML escaping happens in the templates.
const clean = (value, max = 200) =>
    value == null
        ? ''
        : String(value)
            .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
            .trim()
            .slice(0, max);

const cleanEmail = (value) => {
    const v = clean(value, 150).toLowerCase();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? v : '';
};

const cleanPhone = (value) => clean(value, 20).replace(/[^\d+\-\s()]/g, '').trim();

// First non-empty value among possible field names, so the route works with the form as-is
const first = (body, keys) => {
    for (const k of keys) {
        const v = body?.[k];
        if (v !== undefined && v !== null && String(v).trim() !== '') return v;
    }
    return '';
};

function formatDate(value) {
    if (!value) return '';
    const m = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return clean(value, 40);
    const date = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    return new Intl.DateTimeFormat('en-GB', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
    }).format(date);
}

function normalise(body) {
    const fullName =
        first(body, ['name', 'fullName', 'contactName']) ||
        [first(body, ['firstName']), first(body, ['lastName'])].filter(Boolean).join(' ');

    const slug = clean(first(body, ['locationSlug', 'location']), 40).toLowerCase();
    const locationKey = LOCATIONS[slug] ? slug : DEFAULT_LOCATION;
    const loc = LOCATIONS[locationKey];

    const banquetRaw = first(body, ['banquet', 'banquetRequired', 'needBanquet', 'banquetOption']);
    const banquet = typeof banquetRaw === 'boolean' ? (banquetRaw ? 'Yes' : 'No') : clean(banquetRaw, 40);

    const headcountRaw = first(body, ['headcount', 'guests', 'guestCount', 'groupSize', 'numberOfGuests', 'guestNumber']);
    const headcountNum = parseInt(headcountRaw, 10);

    const rawDate = clean(first(body, ['date', 'eventDate', 'visitDate', 'preferredDate', 'outingDate']), 40);

    return {
        loc,
        locationKey,
        data: {
            name: clean(fullName, 120),
            company: clean(first(body, ['company', 'companyName', 'organisation', 'organization']), 150),
            designation: clean(first(body, ['designation', 'jobTitle', 'role']), 100),
            email: cleanEmail(first(body, ['email'])),
            phone: cleanPhone(first(body, ['phone', 'mobile', 'phoneNumber'])),
            city: clean(first(body, ['city']), 80),
            rawDate,
            dateLabel: formatDate(rawDate),
            headcount: Number.isFinite(headcountNum) && headcountNum > 0 ? String(headcountNum) : '',
            outingType: clean(first(body, ['outingType', 'eventType', 'type']), 80),
            banquet,
            message: clean(first(body, ['message', 'notes', 'requirements', 'specialRequests', 'specialRequirements']), 2000),
            locationName: loc.name,
            source: clean(first(body, ['source']), 40),
            pageUrl: clean(first(body, ['pageUrl']), 300),
            receivedAt: new Intl.DateTimeFormat('en-IN', {
                dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata',
            }).format(new Date()) + ' IST',
        },
    };
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req) {
    let body;
    try {
        body = await req.json();
    } catch {
        return Response.json({ error: 'Invalid request.' }, { status: 400 });
    }

    // Honeypot: a hidden field real people leave empty. Pretend success to bots.
    if (clean(first(body, ['_trap', 'website', 'company_website']))) {
        return Response.json({ ok: true });
    }

    const { loc, locationKey, data } = normalise(body);

    if (!data.name) return Response.json({ error: 'Please enter your name.' }, { status: 400 });
    if (!data.email) return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    if (!data.phone || data.phone.replace(/\D/g, '').length < 8) {
        return Response.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    }

    if (!SMTP.host || !SMTP.user || !SMTP.pass) {
        console.error('[corporate-enquiry] INDR_SMTP_HOST / INDR_SMTP_USER / INDR_SMTP_PASS missing in .env');
        return Response.json({ error: 'Email is not configured. Please call us instead.' }, { status: 500 });
    }

    const mailer = getTransporter();
    const team = buildTeamEmail(data);
    const customer = buildCustomerEmail(data, {
        ...loc.contact,
        siteUrl: SITE_URL ? `${SITE_URL}/${locationKey}` : '',
    });

    // The team email must go out; the customer copy is best effort.
    try {
        await mailer.sendMail({
            from: FROM,
            to: loc.salesEmail,
            replyTo: { name: data.name, address: data.email },
            subject: team.subject,
            html: team.html,
            text: team.text,
        });
    } catch (err) {
        console.error('[corporate-enquiry] Team email failed:', err);
        return Response.json(
            { error: 'Sorry, we could not send your enquiry. Please try again or call us.' },
            { status: 500 }
        );
    }

    try {
        await mailer.sendMail({
            from: FROM,
            to: { name: data.name, address: data.email },
            replyTo: loc.salesEmail,
            subject: customer.subject,
            html: customer.html,
            text: customer.text,
        });
    } catch (err) {
        console.error('[corporate-enquiry] Customer auto-reply failed:', err);
    }

    return Response.json({ ok: true });
}
'use client';

import { useState, useId } from 'react';


const EMPTY = {
    company: '',
    contactName: '',
    email: '',
    phone: '',
    outingType: '',
    guests: '',
    banquet: '',
    preferredDate: '',
    message: '',
    website: '', // honeypot: real users never see or fill this
};


function isoDatePlusDays(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function CorporateEnquiryForm({
    locationSlug,
    locationName,
    outingTypes = [],
    banquetOptions = ['Yes', 'No'],
    submitLabel = 'Request a corporate quote',
    privacyNote = '',
    successHeading = 'Thanks, we have your enquiry.',
    successBody = 'Our team will get back to you shortly.',
    minLeadDays = 2,
    bare = false,        // true inside the popup: drops the white card wrapper
    source = 'inline',   // 'inline' | 'popup'
}) {
    const uid = useId();
    const cardClass = bare ? 'text-ink' : 'rounded-rl bg-white text-ink p-8 shadow-s2 max-[720px]:p-5';
    const [form, setForm] = useState({ ...EMPTY, outingType: outingTypes[0] || '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const minDate = isoDatePlusDays(minLeadDays);

    const set = (field) => (e) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
    };

    function validate() {
        const errs = {};
        if (!form.company.trim()) errs.company = 'Company name is required';
        if (!form.contactName.trim()) errs.contactName = 'Contact person is required';
        if (!form.email.trim()) errs.email = 'Work email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Enter a valid email';
        const phone = form.phone.replace(/[\s-]/g, '').replace(/^(\+91|0)/, '');
        if (!phone) errs.phone = 'Phone is required';
        else if (!/^\d{10}$/.test(phone)) errs.phone = 'Enter a valid 10-digit number';
        if (!form.outingType) errs.outingType = 'Select the type of outing';
        const guests = Number(form.guests);
        if (!form.guests) errs.guests = 'Expected guests is required';
        else if (!Number.isInteger(guests) || guests < 1) errs.guests = 'Enter a number of guests';
        if (!form.banquet) errs.banquet = 'Let us know about the banquet';
        if (form.preferredDate && form.preferredDate < minDate) {
            errs.preferredDate = `Pick a date at least ${minLeadDays} days from today`;
        }
        return errs;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setStatus('sending');
        try {
            const res = await fetch('/api/corporate-enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    guests: Number(form.guests),
                    location: locationSlug,
                    source,
                    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            setStatus('success');
            setForm({ ...EMPTY, outingType: outingTypes[0] || '' });

            // Conversion tracking — no-ops if GTM / Meta Pixel aren't loaded.
            try {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'corporate_enquiry_submit', location: locationSlug, form_source: source });
                if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: 'Corporate outing' });
            } catch { }
        } catch {
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className={`${bare ? 'py-6' : 'rounded-rl bg-white p-10 shadow-s2 max-[720px]:p-6'} text-ink text-center`} role="status">
                <div className="text-[44px] mb-3">✅</div>
                <h3 className="h3 mb-2">{successHeading}</h3>
                <p className="text-sm text-ink-2 mb-5">
                    {successBody} {locationName ? `(Aqua Imagicaa ${locationName})` : ''}
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="btn btn-outline btn-sm">
                    Send another enquiry
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className={`relative ${cardClass}`}>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 max-[720px]:grid-cols-1">
                <Field id="ce-company" label="Company name" required error={errors.company}>
                    <input id="ce-company" type="text" autoComplete="organization" value={form.company} onChange={set('company')} className="form-input" />
                </Field>

                <Field id="ce-name" label="Contact person" required error={errors.contactName}>
                    <input id="ce-name" type="text" autoComplete="name" value={form.contactName} onChange={set('contactName')} className="form-input" />
                </Field>

                <Field id="ce-email" label="Work email" required error={errors.email}>
                    <input id="ce-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} className="form-input" />
                </Field>

                <Field id="ce-phone" label="Phone" required error={errors.phone}>
                    <input id="ce-phone" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} className="form-input" maxLength={14} />
                </Field>

                <Field id="ce-type" label="Type of outing" required error={errors.outingType}>
                    <select id="ce-type" value={form.outingType} onChange={set('outingType')} className="form-input">
                        {outingTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </Field>

                <Field id="ce-guests" label="Expected guests" required error={errors.guests}>
                    <input id="ce-guests" type="number" min={1} inputMode="numeric" placeholder="e.g. 150" value={form.guests} onChange={set('guests')} className="form-input" />
                </Field>

                <Field id="ce-banquet" label="Need the banquet?" required error={errors.banquet}>
                    <select id="ce-banquet" value={form.banquet} onChange={set('banquet')} className="form-input">
                        <option value="" disabled>Select</option>
                        {banquetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                </Field>

                <Field id="ce-date" label="Preferred date" error={errors.preferredDate}>
                    <input id="ce-date" type="date" min={minDate} value={form.preferredDate} onChange={set('preferredDate')} className="form-input" />
                </Field>

                <div className="col-span-2 max-[720px]:col-span-1">
                    <Field id="ce-message" label="Anything else we should know?">
                        <textarea id="ce-message" rows={3} value={form.message} onChange={set('message')} className="form-input resize-y" />
                    </Field>
                </div>
            </div>

            {/* Honeypot */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
                <label htmlFor="ce-website">Website</label>
                <input id="ce-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
            </div>

            {status === 'error' && (
                <p className="text-red-600 text-sm mt-4" role="alert">
                    Something went wrong. Please try again, or call us directly.
                </p>
            )}

            <div className="mt-6 flex items-center gap-4 flex-wrap">
                <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:opacity-60">
                    {status === 'sending' ? 'Sending…' : submitLabel}
                </button>
                {privacyNote && <p className="text-xs text-ink-2 m-0">{privacyNote}</p>}
            </div>
        </form>
    );
}

function Field({ id, label, required, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-ink mb-1.5">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
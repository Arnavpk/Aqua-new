'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

function formatCurrency(n) {
    if (n == null || isNaN(n)) return '—';
    return `₹${Number(n).toLocaleString('en-IN')}`;
}

export function GroupEnquiryForm({ locationSlug, locationName, quotationTypes = [] }) {
    const types = quotationTypes.length > 0
        ? quotationTypes
        : [
            { name: 'Corporate Group', slug: 'corporate-group', guestOptions: [{ label: 'Minimum 20 or more', minValue: 20 }] },
            { name: 'Student Group', slug: 'student-group', guestOptions: [{ label: 'Minimum 30 or more', minValue: 30 }] },
        ];

    const [selectedTypeSlug, setSelectedTypeSlug] = useState(types[0].slug);
    const selectedType = useMemo(
        () => types.find((t) => t.slug === selectedTypeSlug) || types[0],
        [types, selectedTypeSlug]
    );
    const guestOptions = selectedType.guestOptions || [];
    const isStudent = selectedTypeSlug === 'student-group';

    const [form, setForm] = useState({
        name: '',
        company: '',
        city: '',
        district: '',
        pinCode: '',
        email: '',
        confirmEmail: '',
        ccEmails: '',
        phone: '',
        visitDate: '',
        guestMinValue: guestOptions[0]?.minValue || 20,
        guestLabel: guestOptions[0]?.label || '',
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');
    const [pricing, setPricing] = useState(null);
    const [pricingStatus, setPricingStatus] = useState('idle');

    const set = (field) => (e) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
    };

    function handleTypeChange(e) {
        const slug = e.target.value;
        setSelectedTypeSlug(slug);
        const type = types.find((t) => t.slug === slug) || types[0];
        const firstGuest = type.guestOptions?.[0];
        setForm((f) => ({
            ...f,
            guestMinValue: firstGuest?.minValue || 20,
            guestLabel: firstGuest?.label || '',
        }));
        setPricing(null);
        setPricingStatus('idle');
    }

    function handleGuestChange(e) {
        const minVal = parseInt(e.target.value, 10);
        const option = guestOptions.find((g) => g.minValue === minVal);
        setForm((f) => ({
            ...f,
            guestMinValue: minVal,
            guestLabel: option?.label || '',
        }));
    }

    const fetchPricing = useCallback(async (date, guestMin, qtypeSlug) => {
        if (!date || !guestMin || !qtypeSlug) {
            setPricing(null);
            setPricingStatus('idle');
            return;
        }

        setPricingStatus('loading');
        try {
            const params = new URLSearchParams({
                location: locationSlug,
                date,
                guests: String(guestMin),
                quotationType: qtypeSlug,
            });
            const res = await fetch(`/api/group-pricing?${params}`);
            const data = await res.json();

            if (data.blocked) {
                setPricing(null);
                setPricingStatus('blocked');
                setErrors((prev) => ({ ...prev, visitDate: data.message }));
            } else if (data.found) {
                setPricing(data);
                setPricingStatus('found');
            } else {
                setPricing(null);
                setPricingStatus('notfound');
            }
        } catch {
            setPricing(null);
            setPricingStatus('error');
        }
    }, [locationSlug]);

    useEffect(() => {
        fetchPricing(form.visitDate, form.guestMinValue, selectedTypeSlug);
    }, [form.visitDate, form.guestMinValue, selectedTypeSlug, fetchPricing]);

    function validate() {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.company.trim()) errs.company = isStudent ? 'School/college name is required' : 'Company name is required';
        if (!form.city.trim()) errs.city = 'City is required';
        if (!form.district.trim()) errs.district = 'District is required';
        if (!form.email.trim()) errs.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
        if (!form.confirmEmail.trim()) errs.confirmEmail = 'Please confirm your email';
        else if (form.email !== form.confirmEmail) errs.confirmEmail = 'Emails do not match';
        if (!form.phone.trim()) errs.phone = 'Mobile number is required';
        else if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Enter a valid 10-digit number';
        if (!form.visitDate) errs.visitDate = 'Visit date is required';
        else {
            const minDate = new Date();
            minDate.setDate(minDate.getDate() + 3); // 72 hrs for student, 2 days for corporate
            minDate.setHours(0, 0, 0, 0);
            if (new Date(form.visitDate) < minDate) errs.visitDate = isStudent ? 'Date must be at least 3 days from today' : 'Date must be at least 2 days from today';
        }
        if (pricingStatus === 'blocked') errs.visitDate = 'This date is not available for group bookings';
        return errs;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setStatus('sending');
        try {
            const res = await fetch('/api/group-enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    location: locationSlug,
                    quotationType: selectedType.name,
                    quotationTypeSlug: selectedTypeSlug,
                    guests: form.guestLabel,
                    resolvedPricing: pricing?.pricing || null,
                    pricingDayType: pricing?.dayType || null,
                    pricingSeasonLabel: pricing?.seasonLabel || null,
                    pricingEventName: pricing?.eventName || null,
                }),
            });
            if (res.ok) {
                setStatus('success');
                setForm({
                    name: '', company: '', city: '', district: '', pinCode: '',
                    email: '', confirmEmail: '', ccEmails: '', phone: '', visitDate: '',
                    guestMinValue: guestOptions[0]?.minValue || 20,
                    guestLabel: guestOptions[0]?.label || '',
                });
                setPricing(null);
                setPricingStatus('idle');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className="rounded-2xl bg-white p-10 shadow-s2 text-center max-w-[600px] mx-auto">
                <div className="text-[48px] mb-4">✅</div>
                <h3 className="h3 mb-2">Enquiry submitted!</h3>
                <p className="text-sm text-ink-2 mb-5">
                    Our sales team will get back to you within 24 hours with a quotation for your {isStudent ? 'student' : 'group'} visit to Aqua Imagicaa {locationName}.
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="btn btn-outline btn-sm">
                    Submit another enquiry
                </button>
            </div>
        );
    }

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + (isStudent ? 3 : 2));
    const minDateStr = minDate.toISOString().split('T')[0];
    const p = pricing?.pricing;

    return (
        <div className="rounded-2xl bg-white p-8 shadow-s2 max-w-[800px] mx-auto max-[720px]:p-5">
            <h2 className="h2 text-center mb-6">Group Enquiry</h2>

            <div className="grid grid-cols-2 gap-x-5 gap-y-4 max-[720px]:grid-cols-1">
                <Field label="Quotation For" required>
                    <select value={selectedTypeSlug} onChange={handleTypeChange} className="form-input">
                        {types.map((t) => (
                            <option key={t.slug} value={t.slug}>{t.name}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Your Name" required error={errors.name}>
                    <input type="text" value={form.name} onChange={set('name')} placeholder="Your Name" className="form-input" />
                </Field>

                <Field label={isStudent ? 'School / College Name' : 'Your Company Name'} required error={errors.company}>
                    <input type="text" value={form.company} onChange={set('company')} placeholder={isStudent ? 'School / College Name' : 'Your Company Name'} className="form-input" />
                </Field>

                <Field label="Your City / Taluka" required error={errors.city}>
                    <input type="text" value={form.city} onChange={set('city')} placeholder="Your City / Taluka" className="form-input" />
                </Field>

                <Field label="Your District" required error={errors.district}>
                    <input type="text" value={form.district} onChange={set('district')} placeholder="Your District" className="form-input" />
                </Field>

                <Field label="Pin Code" error={errors.pinCode}>
                    <input type="text" value={form.pinCode} onChange={set('pinCode')} placeholder="Pin Code" className="form-input" maxLength={6} />
                </Field>

                <Field label="Email" required error={errors.email}>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="Email ID" className="form-input" />
                </Field>

                <Field label="Confirm Email ID" required error={errors.confirmEmail}>
                    <input type="email" value={form.confirmEmail} onChange={set('confirmEmail')} placeholder="Confirm Email ID" className="form-input" />
                </Field>

                <Field label="Other Email ID (Separated by comma)" error={errors.ccEmails}>
                    <input type="text" value={form.ccEmails} onChange={set('ccEmails')} placeholder="CC email ID" className="form-input" />
                </Field>

                <Field label="Mobile Number" required error={errors.phone}>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="Mobile Number" className="form-input" maxLength={10} />
                </Field>

                <Field label="Visit Date" required error={errors.visitDate}>
                    <input type="date" value={form.visitDate} onChange={set('visitDate')} min={minDateStr} className="form-input" />
                </Field>

                <Field label="No. of Guests" required>
                    <select value={form.guestMinValue} onChange={handleGuestChange} className="form-input">
                        {guestOptions.map((g) => (
                            <option key={g.minValue} value={g.minValue}>{g.label}</option>
                        ))}
                    </select>
                </Field>
            </div>

            {/* Pricing display */}
            {/* {pricingStatus === 'loading' && (
                <div className="mt-5 p-4 rounded-xl bg-blue-50 text-sm text-blue-700 text-center">Fetching pricing…</div>
            )}
            {pricingStatus === 'notfound' && (
                <div className="mt-5 p-4 rounded-xl bg-amber-50 text-sm text-amber-700 text-center">
                    Pricing not configured for this date yet. Our sales team will provide a custom quote.
                </div>
            )}
            {pricingStatus === 'blocked' && (
                <div className="mt-5 p-4 rounded-xl bg-red-50 text-sm text-red-700 text-center">
                    This date is blocked for group bookings. Please select another date or contact our sales team.
                </div>
            )} */}

            {/* Corporate pricing table */}
            {/* {pricingStatus === 'found' && p && p.type === 'corporate' && (
                <div className="mt-5 rounded-xl border border-[#00A5C8]/20 overflow-hidden">
                    <div className="bg-[#0A5566] text-white px-5 py-3 text-sm font-semibold flex justify-between items-center">
                        <span>Indicative Pricing — {selectedType.name}</span>
                        <span className="text-white/70 text-xs font-normal capitalize">
                            {pricing.dayType}{pricing.seasonLabel ? ` · ${pricing.seasonLabel}` : ''}
                            {pricing.eventName ? ` · ${pricing.eventName}` : ''}
                        </span>
                    </div>
                    <div className="p-5 overflow-x-auto">
                        <table className="w-full text-sm border-collapse min-w-[500px]">
                            <thead>
                                <tr className="text-left text-ink-2">
                                    <th className="pb-2 font-semibold">Ticket Type</th>
                                    <th className="pb-2 font-semibold text-right">Rate</th>
                                    <th className="pb-2 font-semibold text-right">Discount</th>
                                    <th className="pb-2 font-semibold text-right">After Discount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <PriceRow label="Combo — Adult" data={p.comboAdult} />
                                <PriceRow label="Combo — Kids" data={p.comboKids} />
                                <PriceRow label="Solo — Adult" data={p.soloAdult} />
                                <PriceRow label="Solo — Kids" data={p.soloKids} />
                            </tbody>
                        </table>
                        <p className="text-xs text-ink-2 mt-3 mb-0">
                            * 18% taxes applicable. Kids: 3.3 ft – 4.6 ft. Below 3.3 ft free with parent.
                        </p>
                    </div>
                </div>
            )} */}

            {/* Student pricing table */}
            {/* {pricingStatus === 'found' && p && p.type === 'student' && (
                <div className="mt-5 rounded-xl border border-[#00A5C8]/20 overflow-hidden">
                    <div className="bg-[#0A5566] text-white px-5 py-3 text-sm font-semibold flex justify-between items-center">
                        <span>Student Group Package — {pricing.seasonLabel || 'Academic Year'}</span>
                        <span className="text-white/70 text-xs font-normal">Available all days</span>
                    </div>
                    <div className="p-5">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="text-left text-ink-2">
                                    <th className="pb-2 font-semibold">Category</th>
                                    <th className="pb-2 font-semibold text-right">Rate (per person)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {p.schoolRate && (
                                    <tr className="border-t border-black/5">
                                        <td className="py-2.5 font-medium">1st to 12th Grade Students (Breakfast + Lunch)</td>
                                        <td className="py-2.5 text-right font-semibold">{formatCurrency(p.schoolRate)}</td>
                                    </tr>
                                )}
                                {p.collegeRate && (
                                    <tr className="border-t border-black/5">
                                        <td className="py-2.5 font-medium">Sr. College Students (3rd Year Graduation, max 22 yrs, with Breakfast &amp; Lunch)</td>
                                        <td className="py-2.5 text-right font-semibold">{formatCurrency(p.collegeRate)}</td>
                                    </tr>
                                )}
                                {p.teacherRate && (
                                    <tr className="border-t border-black/5">
                                        <td className="py-2.5 font-medium">Teachers (Breakfast + Lunch)</td>
                                        <td className="py-2.5 text-right font-semibold">{formatCurrency(p.teacherRate)}</td>
                                    </tr>
                                )}
                                <tr className="border-t border-black/5">
                                    <td className="py-2.5 font-medium">Free Teacher Ratio</td>
                                    <td className="py-2.5 text-right font-semibold">10:1</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-4 pt-4 border-t border-black/5">
                            <h4 className="text-sm font-semibold mb-2">Inclusions</h4>
                            <ul className="text-xs text-ink-2 space-y-1 m-0 pl-4">
                                <li>Water Park Entry Ticket (10 AM to 06 PM)</li>
                                <li>Buffet Breakfast (10 AM to 11 AM)</li>
                                <li>Buffet Lunch (1 PM to 3 PM)</li>
                                <li>Rental Costumes (against refundable deposit) in water park</li>
                                <li>Complimentary use of Lockers / Luggage Room (against refundable deposit)</li>
                                <li>10:1 FOC for Teacher</li>
                                <li>GST on Entry Ticket and Meals</li>
                            </ul>
                        </div>

                        <p className="text-xs text-ink-2 mt-3 mb-0">
                            * Package applicable for minimum 30 or more students. Must be booked at least 72 hrs prior.
                        </p>
                    </div>
                </div>
            )} */}

            {status === 'error' && (
                <p className="text-red-600 text-sm mt-4 text-center">
                    Something went wrong. Please try again or contact our sales team directly.
                </p>
            )}

            <div className="mt-6 text-center">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={status === 'sending' || pricingStatus === 'blocked'}
                    className="btn btn-primary px-10"
                >
                    {status === 'sending' ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );
}

function PriceRow({ label, data }) {
    if (!data?.rate && !data?.total) return null;
    return (
        <tr className="border-t border-black/5">
            <td className="py-2.5 font-medium">{label}</td>
            <td className="py-2.5 text-right">{formatCurrency(data.rate)}</td>
            <td className="py-2.5 text-right text-green-600">−{formatCurrency(data.discount)}</td>
            <td className="py-2.5 text-right font-semibold">{formatCurrency(data.total)}</td>
        </tr>
    );
}

function Field({ label, required, error, children }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
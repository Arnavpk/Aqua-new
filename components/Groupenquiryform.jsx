'use client';

import { useState } from 'react';

const CORPORATE_GUEST_OPTIONS = [
    'Minimum 30 or more',
    'Minimum 50 or more',
    'Minimum 100 or more',
    'Minimum 200 or more',
];

const STUDENT_GUEST_OPTIONS = [
    'Minimum 30 or more',
];

function getGuestOptions(type) {
    return type === 'Student Group' ? STUDENT_GUEST_OPTIONS : CORPORATE_GUEST_OPTIONS;
}

const INITIAL = {
    quotationType: 'Corporate Group',
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
    guests: CORPORATE_GUEST_OPTIONS[0],
};

export function GroupEnquiryForm({ locationSlug, locationName }) {
    const [form, setForm] = useState(INITIAL);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const set = (field) => (e) => {
        const val = e.target.value;
        setForm((f) => {
            const updated = { ...f, [field]: val };
            // Reset guests when quotation type changes
            if (field === 'quotationType') {
                const opts = getGuestOptions(val);
                updated.guests = opts[0];
            }
            return updated;
        });
        if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
    };

    function validate() {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.company.trim()) errs.company = 'Company name is required';
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
            minDate.setDate(minDate.getDate() + 2);
            minDate.setHours(0, 0, 0, 0);
            if (new Date(form.visitDate) < minDate) errs.visitDate = 'Date must be at least 2 days from today';
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
            const res = await fetch('/api/group-enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, location: locationSlug }),
            });
            if (res.ok) {
                setStatus('success');
                setForm(INITIAL);
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
                    Our sales team will get back to you within 24 hours with a quotation for your group visit to Aqua Imagicaa {locationName}.
                </p>
                <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="btn btn-outline btn-sm"
                >
                    Submit another enquiry
                </button>
            </div>
        );
    }

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    const minDateStr = minDate.toISOString().split('T')[0];

    return (
        <div className="rounded-2xl bg-white p-8 shadow-s2 max-w-[800px] mx-auto max-[720px]:p-5">
            <h2 className="h2 text-center mb-6">Group Enquiry</h2>

            <div className="grid grid-cols-2 gap-x-5 gap-y-4 max-[720px]:grid-cols-1">
                <Field label="Quotation For" required>
                    <select
                        value={form.quotationType}
                        onChange={set('quotationType')}
                        className="form-input"
                    >
                        <option value="Corporate Group">Corporate Group</option>
                        <option value="Student Group">Student Group</option>
                    </select>
                </Field>

                <Field label="Your Name" required error={errors.name}>
                    <input
                        type="text"
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Your Name"
                        className="form-input"
                    />
                </Field>

                <Field label="Your Company Name" required error={errors.company}>
                    <input
                        type="text"
                        value={form.company}
                        onChange={set('company')}
                        placeholder="Your Company Name"
                        className="form-input"
                    />
                </Field>

                <Field label="Your City / Taluka" required error={errors.city}>
                    <input
                        type="text"
                        value={form.city}
                        onChange={set('city')}
                        placeholder="Your City / Taluka"
                        className="form-input"
                    />
                </Field>

                <Field label="Your District" required error={errors.district}>
                    <input
                        type="text"
                        value={form.district}
                        onChange={set('district')}
                        placeholder="Your District"
                        className="form-input"
                    />
                </Field>

                <Field label="Pin Code" error={errors.pinCode}>
                    <input
                        type="text"
                        value={form.pinCode}
                        onChange={set('pinCode')}
                        placeholder="Pin Code"
                        className="form-input"
                        maxLength={6}
                    />
                </Field>

                <Field label="Email" required error={errors.email}>
                    <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="Email ID"
                        className="form-input"
                    />
                </Field>

                <Field label="Confirm Email ID" required error={errors.confirmEmail}>
                    <input
                        type="email"
                        value={form.confirmEmail}
                        onChange={set('confirmEmail')}
                        placeholder="Confirm Email ID"
                        className="form-input"
                    />
                </Field>

                <Field label="Other Email ID (Separated by comma)" error={errors.ccEmails}>
                    <input
                        type="text"
                        value={form.ccEmails}
                        onChange={set('ccEmails')}
                        placeholder="CC email ID"
                        className="form-input"
                    />
                </Field>

                <Field label="Mobile Number" required error={errors.phone}>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="Mobile Number"
                        className="form-input"
                        maxLength={10}
                    />
                </Field>

                <Field label="Visit Date" required error={errors.visitDate}>
                    <input
                        type="date"
                        value={form.visitDate}
                        onChange={set('visitDate')}
                        min={minDateStr}
                        className="form-input"
                    />
                </Field>

                <Field label="No. of Guests" required error={errors.guests}>
                    <select
                        value={form.guests}
                        onChange={set('guests')}
                        className="form-input"
                    >
                        {getGuestOptions(form.quotationType).map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </Field>
            </div>

            {status === 'error' && (
                <p className="text-red-600 text-sm mt-4 text-center">
                    Something went wrong. Please try again or contact our sales team directly.
                </p>
            )}

            <div className="mt-6 text-center">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                    className="btn btn-primary px-10"
                >
                    {status === 'sending' ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
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
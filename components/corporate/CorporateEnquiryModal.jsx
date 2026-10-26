'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CorporateEnquiryForm } from './CorporateEnquiryForm';

// Opens the corporate enquiry form in a popup.
// Any link on the page pointing at `trigger` (default "#enquire-popup") opens it,
// so server components like PageHero can trigger it with a plain href.
// Visiting the page with that hash in the URL also opens it (handy for ad links).

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CorporateEnquiryModal({
    trigger = '#enquire-popup',
    eyebrow,
    heading,
    body,
    contact,
    formProps,
}) {
    const [open, setOpen] = useState(false);
    const dialogRef = useRef(null);
    const returnFocusRef = useRef(null);

    const close = useCallback(() => {
        setOpen(false);
        if (window.location.hash === trigger) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    }, [trigger]);

    // Open on click of any matching link, or when the URL carries the hash.
    useEffect(() => {
        function onClick(e) {
            const link = e.target.closest?.(`a[href="${trigger}"]`);
            if (!link) return;
            e.preventDefault();
            returnFocusRef.current = link;
            setOpen(true);
        }
        function onHash() {
            if (window.location.hash === trigger) setOpen(true);
        }
        document.addEventListener('click', onClick);
        window.addEventListener('hashchange', onHash);
        onHash();
        return () => {
            document.removeEventListener('click', onClick);
            window.removeEventListener('hashchange', onHash);
        };
    }, [trigger]);

    // While open: lock page scroll, focus the first field, handle Esc and Tab.
    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const dialog = dialogRef.current;
        const raf = requestAnimationFrame(() => {
            const first = dialog?.querySelector('input:not([tabindex="-1"]), select, textarea');
            (first || dialog)?.focus({ preventScroll: true });
        });

        function onKey(e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                close();
                return;
            }
            if (e.key !== 'Tab' || !dialog) return;
            const nodes = Array.from(dialog.querySelectorAll(FOCUSABLE)).filter((n) => n.offsetParent !== null);
            if (!nodes.length) return;
            const firstNode = nodes[0];
            const lastNode = nodes[nodes.length - 1];
            if (e.shiftKey && document.activeElement === firstNode) {
                e.preventDefault();
                lastNode.focus();
            } else if (!e.shiftKey && document.activeElement === lastNode) {
                e.preventDefault();
                firstNode.focus();
            }
        }
        document.addEventListener('keydown', onKey);

        return () => {
            cancelAnimationFrame(raf);
            document.body.style.overflow = prevOverflow;
            document.removeEventListener('keydown', onKey);
            returnFocusRef.current?.focus?.({ preventScroll: true });
        };
    }, [open, close]);

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 max-[720px]:items-end max-[720px]:p-0"
            style={{
                visibility: open ? 'visible' : 'hidden',
                opacity: open ? 1 : 0,
                // visibility flips instantly on open (so focus works) and waits for the fade on close
                transition: open
                    ? 'opacity .3s cubic-bezier(.22,1,.36,1), visibility 0s'
                    : 'opacity .3s cubic-bezier(.22,1,.36,1), visibility 0s linear .3s',
            }}
            aria-hidden={!open}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0"
                style={{ background: 'rgba(10, 59, 71, .6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
                onClick={close}
            />

            {/* Panel */}
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="corporate-modal-title"
                tabIndex={-1}
                className="relative w-full max-w-[760px] bg-white rounded-rl shadow-s3 overflow-y-auto overscroll-contain outline-none max-[720px]:rounded-b-none max-[720px]:rounded-t-[24px]"
                style={{
                    maxHeight: 'calc(100dvh - 32px)',
                    transform: open ? 'translateY(0)' : 'translateY(24px)',
                    transition: 'transform .4s cubic-bezier(.22,1,.36,1)',
                }}
            >
                <div
                    className="sticky top-0 z-[2] text-white px-8 pt-7 pb-6 max-[720px]:px-5 max-[720px]:pt-5"
                    style={{ background: 'linear-gradient(135deg, #0A5566 0%, #00A5C8 70%, #22C4DE 100%)' }}
                >
                    <button
                        type="button"
                        onClick={close}
                        aria-label="Close"
                        className="absolute top-4 right-4 w-10 h-10 rounded-full border-0 text-white text-lg leading-none"
                        style={{ background: 'rgba(255,255,255,.18)' }}
                    >
                        ✕
                    </button>
                    {eyebrow && <span className="eyebrow eyebrow-sun mb-2 block">{eyebrow}</span>}
                    <h2 id="corporate-modal-title" className="h2 text-white pr-12">{heading}</h2>
                    {body && <p className="text-white/85 text-sm leading-relaxed mt-2 mb-0 max-w-[520px]">{body}</p>}
                    {contact && (
                        <p className="text-[13px] text-white/80 mt-3 mb-0">
                            Prefer to talk?{' '}
                            <a href={contact.phoneHref} className="text-white font-semibold hover:text-sun">{contact.phone}</a>
                            <span className="opacity-60"> · {contact.hours}</span>
                        </p>
                    )}
                </div>

                <div className="px-8 pt-6 pb-8 max-[720px]:px-5 max-[720px]:pb-[calc(24px+env(safe-area-inset-bottom,0px))]">
                    <CorporateEnquiryForm {...formProps} bare source="popup" />
                </div>
            </div>
        </div>
    );
}
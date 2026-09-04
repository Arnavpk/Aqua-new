"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Portal-based modal — mounts to document.body so it escapes any enclosing
 * <p> or stacking context. Prevents the "modal renders inline" bug caused by
 * nesting a <div> inside a <p>.
 */
export default function RideTimingsModal({ label, rideTimings }) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dialogRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => setMounted(true), []);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", onKeyDown);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialogRef.current?.focus();

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prev;
            triggerRef.current?.focus();
        };
    }, [open, close]);

    if (!rideTimings?.rows?.length) return null;

    const { subtitle, columns, rows } = rideTimings;

    const trigger = (
        <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-2 rounded-full bg-[#14418B] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0f3269] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC93C]"
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <circle cx="10" cy="10" r="7.5" />
                <path d="M10 6v4l2.5 1.5" strokeLinecap="round" />
            </svg>
            {label}
            <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
            >
                →
            </span>
        </button>
    );

    const modal = open ? (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 px-4 py-8 backdrop-blur-sm sm:py-12"
            onClick={(e) => {
                if (e.target === e.currentTarget) close();
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="ride-timings-title"
                tabIndex={-1}
                className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl outline-none"
            >
                {/* Yellow accent bar — matches the brand */}
                <div className="h-1.5 w-full bg-[#FFC93C]" />

                <button
                    type="button"
                    onClick={close}
                    aria-label="Close ride timings"
                    className="absolute right-4 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg leading-none text-slate-600 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14418B]"
                >
                    ×
                </button>

                <div className="px-6 pt-8 sm:px-10">
                    <h2
                        id="ride-timings-title"
                        className="pr-12 text-center text-2xl font-bold text-[#14418B] sm:text-3xl"
                    >
                        Rides maintenance status & timings
                    </h2>
                    {subtitle ? (
                        <p className="mt-2 text-center text-sm font-medium text-slate-600 sm:text-base">
                            {subtitle}
                        </p>
                    ) : null}
                </div>

                <div className="max-h-[65vh] overflow-auto px-6 pb-8 pt-6 sm:px-10">
                    <div className="overflow-hidden rounded-xl ring-1 ring-slate-200">
                        <table className="w-full border-collapse text-sm sm:text-base">
                            <thead className="sticky top-0 bg-[#14418B] text-white">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left font-semibold">
                                        {columns.name}
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center font-semibold">
                                        {columns.start}
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-center font-semibold">
                                        {columns.end}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((ride, i) => (
                                    <tr
                                        key={ride.name}
                                        className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                                    >
                                        <th
                                            scope="row"
                                            className="px-4 py-3 text-left font-medium text-slate-800"
                                        >
                                            {ride.name}
                                        </th>
                                        <td className="px-4 py-3 text-center text-slate-700">
                                            {ride.slots.map((slot, j) => (
                                                <span key={j} className="block tabular-nums">
                                                    {slot.start}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="px-4 py-3 text-center text-slate-700">
                                            {ride.slots.map((slot, j) => (
                                                <span key={j} className="block tabular-nums">
                                                    {slot.end}
                                                </span>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            {trigger}
            {mounted && modal ? createPortal(modal, document.body) : null}
        </>
    );
}
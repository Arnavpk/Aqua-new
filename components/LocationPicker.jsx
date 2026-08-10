'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function LocationPicker({ locations, currentSlug }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Show popup if no location cookie set
    useEffect(() => {
        const hasChosen = document.cookie.includes('aqua_location=');
        if (!hasChosen && locations.length > 1) {
            setOpen(true);
        }
    }, [locations]);

    const selectLocation = (slug) => {
        // Set cookie for 30 days
        document.cookie = `aqua_location=${slug};path=/;max-age=${60 * 60 * 24 * 30}`;

        // Redirect to same page under new location
        if (currentSlug && pathname.startsWith(`/${currentSlug}`)) {
            const newPath = pathname.replace(`/${currentSlug}`, `/${slug}`);
            router.push(newPath);
        } else {
            router.push(`/${slug}`);
        }
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-[440px] w-full mx-4 shadow-xl">
                <div className="text-center mb-6">
                    <div className="text-3xl mb-3">📍</div>
                    <h2 className="text-xl font-bold tracking-tight mb-1">Choose your location</h2>
                    <p className="text-sm text-ink-2">Select a park to see rides, tickets & offers near you</p>
                </div>

                <div className="flex flex-col gap-3">
                    {locations.map((loc) => (
                        <button
                            key={loc.slug}
                            type="button"
                            onClick={() => selectLocation(loc.slug)}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all hover:border-brand-500 hover:bg-brand-50 ${loc.slug === currentSlug ? 'border-brand-500 bg-brand-50' : 'border-line'
                                }`}
                        >
                            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-lg flex-shrink-0">
                                📍
                            </div>
                            <div>
                                <div className="font-semibold">{loc.name}</div>
                                {loc.address && <div className="text-xs text-ink-2 mt-0.5">{loc.address}</div>}
                            </div>
                            {loc.slug === currentSlug && (
                                <span className="ml-auto text-xs font-semibold text-brand-600 bg-brand-100 px-2 py-1 rounded-full">Current</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
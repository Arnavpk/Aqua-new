'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function LocationSwitcher({ locations, currentSlug, currentName }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const router = useRouter();
    const pathname = usePathname();

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const switchLocation = (slug) => {
        document.cookie = `aqua_location=${slug};path=/;max-age=${60 * 60 * 24 * 30}`;
        if (pathname.startsWith(`/${currentSlug}`)) {
            router.push(pathname.replace(`/${currentSlug}`, `/${slug}`));
        } else {
            router.push(`/${slug}`);
        }
        setOpen(false);
    };

    if (locations.length <= 1) return null;

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ color: 'inherit' }}
            >
                📍 {currentName}
                <span className="text-[10px]">{open ? '▲' : '▼'}</span>
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-line py-2 min-w-[200px] z-50">
                    {locations.map((loc) => (
                        <button
                            key={loc.slug}
                            type="button"
                            onClick={() => switchLocation(loc.slug)}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-brand-50 transition-colors flex items-center justify-between ${loc.slug === currentSlug ? 'text-brand-600 font-semibold bg-brand-50' : 'text-ink'
                                }`}
                        >
                            {loc.name}
                            {loc.slug === currentSlug && <span className="text-xs">✓</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
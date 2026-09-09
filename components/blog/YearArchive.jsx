'use client';

import { useMemo } from 'react';

export function YearArchive({ blogs = [], activeYear, onSelect }) {
    const years = useMemo(() => {
        const set = new Set(blogs.map((b) => b.year).filter(Boolean));
        return Array.from(set).sort((a, b) => b - a);
    }, [blogs]);

    // Count per year for the badge
    const counts = useMemo(() => {
        const map = {};
        blogs.forEach((b) => {
            if (b.year) map[b.year] = (map[b.year] || 0) + 1;
        });
        return map;
    }, [blogs]);

    if (years.length <= 1) return null;

    return (
        <nav aria-label="Blog archive">
            <h3 className="text-lg font-bold mb-2">Archives</h3>
            <div className="w-10 h-[3px] rounded-full bg-[#F5A623] mb-4" />

            <ul className="m-0 list-none p-0 flex flex-col gap-1">
                <li>
                    <button
                        type="button"
                        onClick={() => onSelect(null)}
                        className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] transition-colors ${!activeYear
                                ? 'bg-[#00A5C8]/10 text-[#0A5566] font-semibold'
                                : 'text-ink-2 hover:bg-black/[0.04] hover:text-[#0A5566]'
                            }`}
                    >
                        <span>All years</span>
                        <span className="text-[13px] font-normal opacity-60">
                            {blogs.length}
                        </span>
                    </button>
                </li>
                {years.map((y) => (
                    <li key={y}>
                        <button
                            type="button"
                            onClick={() => onSelect(y)}
                            className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] transition-colors ${activeYear === y
                                    ? 'bg-[#00A5C8]/10 text-[#0A5566] font-semibold'
                                    : 'text-ink-2 hover:bg-black/[0.04] hover:text-[#0A5566]'
                                }`}
                        >
                            <span>{y}</span>
                            <span className="text-[13px] font-normal opacity-60">
                                {counts[y] || 0}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
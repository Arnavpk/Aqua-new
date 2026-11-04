'use client';

import Link from 'next/link';
import { ArrowRight, Play, Star } from 'lucide-react';

export function RideCard({ ride, locationSlug }) {
    const capacity = ride.capacity ? `${ride.capacity} per raft` : null;
    const minHeight = ride.minHeight ? `Min. height ${ride.minHeight}"` : null;
    const meta = [ride.category, minHeight, capacity].filter(Boolean);

    // ASSUMPTION: adjust to your real details route
    const href = `/${locationSlug}/water-park/rides-and-attractions/${ride.slug}`;

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-s2">
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                    src={ride.image}
                    alt={ride.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-800">
                    {ride.category || 'Thrill'}
                </span>

                <div className="absolute right-3 top-3 z-10 flex items-center gap-0.5 rounded-full bg-[#1f4e5f]/90 px-2.5 py-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`h-3 w-3 ${i < (ride.rating ?? 5) ? 'fill-white text-white' : 'text-white/40'}`}
                        />
                    ))}
                </div>

                {ride.video && (
                    <button
                        type="button"
                        aria-label={`Play ${ride.name} video`}
                        className="absolute left-1/2 top-[40%] z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#1f4e5f] backdrop-blur"
                    >
                        <Play className="h-5 w-5 fill-current" />
                    </button>
                )}

                <h3 className="absolute bottom-3 left-4 right-4 z-10 text-xl font-bold leading-tight text-white drop-shadow-md sm:text-2xl">
                    {ride.name}
                </h3>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
                <p className="line-clamp-4 text-[15px] leading-relaxed text-slate-600 md:line-clamp-5">
                    {ride.description}
                </p>

                {meta.length > 0 && (
                    <ul className="mt-4 space-y-2">
                        {meta.map((m) => (
                            <li key={m} className="flex items-center gap-2 text-sm text-slate-600">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                                {m}
                            </li>
                        ))}
                    </ul>
                )}

                <Link
                    href={href}
                    className="mt-auto flex items-center justify-between border-t border-sky-100 pt-4 font-semibold text-[#2b6f86]"
                >
                    View details
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1f4e5f] text-white transition group-hover:translate-x-0.5">
                        <ArrowRight className="h-5 w-5" />
                    </span>
                </Link>
            </div>
        </article>
    );
}
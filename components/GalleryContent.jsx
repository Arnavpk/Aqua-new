'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';
import Image from 'next/image';

const CATEGORIES = [
    { key: 'all', label: 'All' },
    { key: 'rides', label: 'Rides' },
    { key: 'pools', label: 'Pools' },
    { key: 'dining', label: 'Dining' },
    { key: 'events', label: 'Events' },
    { key: 'park', label: 'Park' },
];

export function GalleryContent({ tiles }) {
    const [filter, setFilter] = useState('all');
    const filtered = filter === 'all' ? tiles : tiles.filter((g) => g.cat === filter);

    return (
        <section className="section-shell" style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}>
            <div className="container-x">
                <Reveal className="mb-8">
                    <div className="filter-card">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.key}
                                type="button"
                                className={`filter-chip ${filter === cat.key ? 'is-active' : ''}`}
                                onClick={() => setFilter(cat.key)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </Reveal>

                <Reveal className="gallery-page-grid">
                    {filtered.map((item, i) => (
                        <div
                            key={i}
                            className={`gal-tile gallery-page-tile ${item.span === 'big' ? 'gallery-big' : ''} relative overflow-hidden`}
                        >
                            {item.image ? (
                                <Image height={200} width={400}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    src={item.image}
                                    alt={item.tag || `Gallery ${i + 1}`}
                                />
                            ) : (
                                <div className="absolute inset-0" style={{ background: item.gradient || 'linear-gradient(135deg, #0A5566, #00A5C8)' }} />
                            )}
                            <span className="gal-tag">{item.tag}</span>
                        </div>
                    ))}
                </Reveal>

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-ink-2">
                        No photos in this category yet.
                    </div>
                )}
            </div>
        </section>
    );
}
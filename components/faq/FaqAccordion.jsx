'use client';

import { useMemo, useState } from 'react';

function matches(item, query) {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
        (item.q || '').toLowerCase().includes(q) ||
        (item.a || '').toLowerCase().includes(q)
    );
}

export function FaqAccordion({ groups = [] }) {
    const [query, setQuery] = useState('');
    const [openId, setOpenId] = useState(null);

    const filtered = useMemo(() => {
        if (!query) return groups;
        return groups
            .map((g) => ({ ...g, items: g.items.filter((i) => matches(i, query)) }))
            .filter((g) => g.items.length > 0);
    }, [groups, query]);

    const total = useMemo(
        () => filtered.reduce((n, g) => n + g.items.length, 0),
        [filtered]
    );

    return (
        <div className="grid grid-cols-[240px_1fr] gap-10 items-start max-[900px]:grid-cols-1 max-[900px]:gap-6">
            {/* Jump nav */}
            <nav
                aria-label="FAQ categories"
                className="sticky top-[110px] max-[900px]:static max-[900px]:top-auto"
            >
                <div className="mb-3">
                    <label htmlFor="faq-search" className="sr-only">
                        Search questions
                    </label>
                    <input
                        id="faq-search"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search questions"
                        className="w-full rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus-visible:border-[#00A5C8] focus-visible:ring-2 focus-visible:ring-[#00A5C8]/30"
                    />
                </div>

                <ul className="m-0 list-none p-0 max-[900px]:flex max-[900px]:flex-wrap max-[900px]:gap-2">
                    {filtered.map((g) => (
                        <li key={g.key} className="max-[900px]:contents">
                            <a
                                href={`#faq-${g.key}`}
                                className="block rounded-lg px-3 py-2 text-[13px] font-semibold text-ink-2 transition-colors hover:bg-black/[0.04] hover:text-[#0A5566] max-[900px]:rounded-full max-[900px]:border max-[900px]:border-black/10 max-[900px]:bg-white"
                            >
                                {g.label}
                                <span className="ml-1.5 font-normal opacity-55">
                                    {g.items.length}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Groups */}
            <div>
                {total === 0 && (
                    <div className="rounded-rx border border-black/10 bg-white p-8 text-center">
                        <p className="mb-2 text-base font-semibold">
                            Nothing matches “{query}”.
                        </p>
                        <p className="m-0 text-sm text-ink-2">
                            Try a shorter search, or call the helpline below and we&apos;ll
                            answer it directly.
                        </p>
                    </div>
                )}

                {filtered.map((group) => (
                    <section
                        key={group.key}
                        id={`faq-${group.key}`}
                        className="mb-10 scroll-mt-[120px] last:mb-0"
                    >
                        <h2 className="h3 mb-4">{group.label}</h2>

                        <div className="flex flex-col gap-2.5">
                            {group.items.map((item) => {
                                const isOpen = openId === item.id;
                                return (
                                    <div
                                        key={item.id}
                                        className={`overflow-hidden rounded-xl border transition-colors ${isOpen
                                            ? 'border-[#00A5C8]/40 bg-white'
                                            : 'border-transparent bg-black/[0.04]'
                                            }`}
                                    >
                                        <h3 className="m-0">
                                            <button
                                                type="button"
                                                aria-expanded={isOpen}
                                                aria-controls={`panel-${item.id}`}
                                                id={`trigger-${item.id}`}
                                                onClick={() => setOpenId(isOpen ? null : item.id)}
                                                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold leading-snug focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#00A5C8]"
                                            >
                                                <span>{item.q}</span>
                                                <span
                                                    aria-hidden="true"
                                                    className={`shrink-0 text-lg leading-none text-[#0A5566] transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''
                                                        }`}
                                                >
                                                    ⌄
                                                </span>
                                            </button>
                                        </h3>

                                        <div
                                            id={`panel-${item.id}`}
                                            role="region"
                                            aria-labelledby={`trigger-${item.id}`}
                                            hidden={!isOpen}
                                            className="px-5 pb-5 pt-0"
                                        >
                                            <p className="m-0 max-w-[70ch] whitespace-pre-line text-sm leading-relaxed text-ink-2">
                                                {item.a}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
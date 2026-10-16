import Image from 'next/image';
import { Reveal } from '../Reveal';

// Tone → gradient. Kept here (not in lib/data) because Tailwind only scans
// app/ and components/ for class names.
const TONES = {
    night: 'from-ink to-brand-700',
    deep: 'from-brand-900 to-brand-600',
    aqua: 'from-brand-700 to-brand-400',
    lagoon: 'from-brand-600 to-leaf',
    warm: 'from-coral to-sun',
};

const ICON_PATHS = {
    music: (
        <>
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
        </>
    ),
    waves: (
        <>
            <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        </>
    ),
    rain: (
        <>
            <path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.24" />
            <path d="M16 14v6" />
            <path d="M8 14v6" />
            <path d="M12 16v6" />
        </>
    ),
    food: (
        <>
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </>
    ),
};

function CardArt({ item }) {
    if (item.image) {
        return (
            <>
                <Image height={300} width={600}
                    className="absolute inset-0 h-full w-full object-cover hidden md:block"
                    src={item.image}
                    alt={item.title}
                />
                <Image height={300} width={600}
                    className="absolute inset-0 h-full w-full object-cover md:hidden"
                    src={item.mobileImage || item.image}
                    alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </>
        );
    }

    return (
        <>
            <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(260px 160px at 85% 0%, rgba(255,255,255,.35), transparent 65%)' }}
                aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center text-white" aria-hidden="true">
                {item.stat ? (
                    <span className="text-[88px] font-extrabold leading-none" style={{ letterSpacing: '-.04em' }}>
                        {item.stat}
                    </span>
                ) : ICON_PATHS[item.icon] ? (
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="opacity-95">
                        {ICON_PATHS[item.icon]}
                    </svg>
                ) : null}
            </div>
        </>
    );
}

export function ExperienceGrid({ eyebrow, heading = '', items = [] }) {
    if (!items.length) return null;

    const n = items.length;
    const gridCols =
        n === 4
            ? 'grid-cols-4 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1'
            : 'grid-cols-3 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1';
    // With 5 (or 8…) cards in 3 columns, widen the first one so rows stay full.
    const widenFirst = n !== 4 && n % 3 === 2;

    const words = heading.split(' ');

    return (
        <section className="section-shell scroll-mt-24" id="experiences">
            <div className="container-x">
                <Reveal className="mb-8 max-w-[720px]">
                    {eyebrow && <span className="eyebrow mb-3.5 block">{eyebrow}</span>}
                    <h2 className="h1">
                        {words.slice(0, -1).join(' ')} <em>{words.slice(-1)}</em>
                    </h2>
                </Reveal>

                <Reveal className={`grid gap-5 ${gridCols}`}>
                    {items.map((item, i) => (
                        <article
                            key={item.key || item.title}
                            className={`hot-card ${widenFirst && i === 0 ? 'col-span-2 max-[720px]:col-span-1' : ''}`}
                        >
                            <div className={`relative h-[200px] overflow-hidden rounded-t-rl bg-gradient-to-br ${TONES[item.tone] || TONES.deep}`}>
                                <CardArt item={item} />
                                {item.badge && (
                                    <span
                                        className="absolute top-3.5 left-3.5 z-[2] rounded-full px-3 py-1.5 font-accent text-[10.5px] font-bold"
                                        style={{ background: '#ffd84d', color: 'var(--ink)', letterSpacing: '.06em' }}
                                    >
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="text-[17px] font-bold tracking-tight mb-1.5">{item.title}</h3>
                                <p className="text-[13px] text-ink-2 leading-relaxed">{item.desc}</p>
                            </div>
                        </article>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
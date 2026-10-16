import Link from 'next/link';
import { Reveal } from '../Reveal';

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

export function PriceCards({ eyebrow, heading, prices = [], ctaLabel = 'Book Now', ctaHref, note }) {
    if (!prices.length) return null;

    return (
        <section className="section-shell" id="tickets">
            <div className="container-x">
                <Reveal className="mx-auto mb-8 max-w-[760px] text-center">
                    {eyebrow && <span className="eyebrow mb-3.5 block">{eyebrow}</span>}
                    <h2 className="h1">{heading}</h2>
                </Reveal>

                <Reveal className="mx-auto grid max-w-[980px] grid-cols-3 gap-5 max-[720px]:grid-cols-1">
                    {prices.map((p) => {
                        const off = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
                        return (
                            <div
                                key={p.label}
                                className="relative flex flex-col items-center rounded-rl border border-line bg-white px-6 pb-6 pt-8 text-center shadow-s2 transition-shadow duration-300 ease-smooth hover:shadow-card-hover"
                            >
                                {off > 0 && (
                                    <span
                                        className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 font-accent text-[10.5px] font-bold"
                                        style={{ background: '#ffd84d', color: 'var(--ink)', letterSpacing: '.06em' }}
                                    >
                                        {off}% OFF
                                    </span>
                                )}

                                <div className="font-accent text-[11px] font-semibold uppercase text-ink-2" style={{ letterSpacing: '.14em' }}>
                                    {p.label}
                                </div>

                                <div
                                    className="mt-4 flex items-baseline justify-center gap-2.5"
                                    aria-label={off > 0 ? `${p.label}: was ${inr(p.mrp)}, now ${inr(p.price)}` : `${p.label}: ${inr(p.price)}`}
                                >
                                    {off > 0 && <del className="text-[18px] font-semibold text-ink-2">{inr(p.mrp)}</del>}
                                    <span className="text-[44px] font-extrabold leading-none text-ink" style={{ letterSpacing: '-.03em' }}>
                                        {inr(p.price)}
                                        <sup className="ml-0.5 text-[20px] text-coral">*</sup>
                                    </span>
                                </div>

                                {ctaHref && (
                                    <Link href={ctaHref} className="btn btn-primary mt-6 w-full justify-center">
                                        {ctaLabel}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </Reveal>

                {note && <p className="mt-5 text-center text-[12px] text-ink-2">{note}</p>}
            </div>
        </section>
    );
}
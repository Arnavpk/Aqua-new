import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { TICKETS } from '@/lib/data/tickets';

export function TicketsGrid({ locationSlug, data }) {
  const tickets = data?.length ? data : TICKETS;

  return (
    <section className="section-shell" id="tickets" style={{ paddingBottom: 80 }}>
      <div className="container-x">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow mb-3 block">Choose your ticket</span>
            <h2 className="h1">Base tickets, simply priced.</h2>
          </div>
          <a href="#offers" className="btn btn-outline max-[720px]:hidden">Skip to offers →</a>
        </Reveal>

        <Reveal className="grid grid-cols-4 gap-5 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
          {tickets.map((t) => (
            <div key={t.slug} className={`ticket-card ${t.featured ? 'featured' : ''}`}>
              {t.badge && (
                <span className="badge-abs" style={{ background: 'var(--sun)', color: 'var(--ink)' }}>
                  {t.badge}
                </span>
              )}
              <div
                className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[26px] mb-5"
                style={{ background: t.iconBg }}
              >
                {t.icon}
              </div>
              <h3 className="text-[17px] font-bold tracking-tight mb-1.5">{t.name}</h3>
              <p className={`text-[13px] leading-relaxed mb-5 ${t.featured ? 'text-white/85' : 'text-ink-2'}`}>
                {t.desc}
              </p>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="price">{t.price}</span>
                {t.priceStrike && <span className="price-strike">{t.priceStrike}</span>}
              </div>
              <div className={`text-[12px] mb-5 ${t.featured ? 'text-white/80' : 'text-ink-2'}`}>
                {t.unit}
              </div>
              <Link
                href={t.ctaUrl || `/${locationSlug}/tickets`}
                className={`btn ${t.featured ? 'btn-primary' : 'btn-dark'} w-full text-center mt-auto`}
              >
                {t.ctaLabel || (t.featured ? `Book ${t.name.toLowerCase()} →` : 'Book →')}
              </Link>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { HELP_ITEMS } from '@/lib/data/tickets';

export function HelpStrip({ locationSlug, data }) {
  const eyebrow = data?.eyebrow || "Booking help";
  const heading = data?.heading || "Everything you need to know.";
  const items = data?.items?.length ? data.items : HELP_ITEMS;
  const ctaEyebrow = data?.ctaEyebrow || "Ready when you are";
  const ctaHeading = data?.ctaHeading || "Your day out starts at ₹599.";
  const ctaLabel = data?.ctaLabel || "Book tickets →";
  const ctaUrl = data?.ctaUrl || `/${locationSlug}/tickets`;
  const phoneLabel = data?.phoneLabel || "📞 Call us";
  const phoneUrl = data?.phoneUrl || "tel:02269660000";

  return (
    <>
      <section className="section-shell" style={{ paddingTop: 20, paddingBottom: 40 }}>
        <div className="container-x">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow mb-3 block">{eyebrow}</span>
              <h2 className="h1">{heading}</h2>
            </div>
          </Reveal>
          <Reveal className="grid grid-cols-4 gap-5 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
            {items.map((h) => (
              <div key={h.title} className="help-card-sm">
                <div className="help-icon">{h.icon}</div>
                <h4 className="text-base font-semibold mb-1.5">{h.title}</h4>
                <p className="text-[13px] text-ink-2 leading-relaxed m-0">{h.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-shell" style={{ paddingTop: 20 }}>
        <div className="container-x">
          <Reveal>
            <div className="cta-strip">
              <div className="relative">
                <span className="eyebrow eyebrow-sun block mb-4">{ctaEyebrow}</span>
                <h2 className="h1 text-white" style={{ whiteSpace: 'pre-line' }}>{ctaHeading}</h2>
              </div>
              <div className="flex gap-3 flex-wrap relative">
                <Link href={ctaUrl} className="btn btn-primary">{ctaLabel}</Link>
                <a href={phoneUrl} className="btn btn-glass">{phoneLabel}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
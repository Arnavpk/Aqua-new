import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { HELP_ITEMS } from '@/lib/data/tickets';

export function HelpStrip({ locationSlug }) {
  return (
    <>
      {/* Help cards */}
      <section className="section-shell" style={{ paddingTop: 20, paddingBottom: 40 }}>
        <div className="container-x">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow mb-3 block">Booking help</span>
              <h2 className="h1">Everything you need to know.</h2>
            </div>
          </Reveal>
          <Reveal className="grid grid-cols-4 gap-5 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
            {HELP_ITEMS.map((h) => (
              <div key={h.title} className="help-card-sm">
                <div className="help-icon">{h.icon}</div>
                <h4 className="text-base font-semibold mb-1.5">{h.title}</h4>
                <p className="text-[13px] text-ink-2 leading-relaxed m-0">{h.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA strip */}
      <section className="section-shell" style={{ paddingTop: 20 }}>
        <div className="container-x">
          <Reveal>
            <div className="cta-strip">
              <div className="relative">
                <span className="eyebrow eyebrow-sun block mb-4">Ready when you are</span>
                <h2 className="h1 text-white">Your day out<br />starts at ₹599.</h2>
              </div>
              <div className="flex gap-3 flex-wrap relative">
                <Link href={`/${locationSlug}/tickets`} className="btn btn-primary">Book tickets →</Link>
                <a href="tel:02269660000" className="btn btn-glass">📞 Call us</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

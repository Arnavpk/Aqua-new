import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

export function PlanSafety({ locationSlug }) {
  return (
    <section className="section-shell" style={{ paddingTop: 20 }}>
      <div className="container-x">
        <Reveal className="grid grid-cols-[1.3fr_1fr] gap-6 max-[1180px]:grid-cols-1">
          <div className="plan-card">
            <span className="eyebrow eyebrow-sun relative">Plan your visit</span>
            <h3 className="text-[clamp(28px,3vw,42px)] font-bold tracking-tight mt-4 mb-3 leading-tight relative">
              Turn your ride list into a day.
            </h3>
            <p className="text-base text-white/90 leading-relaxed max-w-[420px] mb-7 relative">
              Pick your favourites, drop them into your itinerary, and we&apos;ll build the shortest walking route between them — with queue estimates baked in.
            </p>
            <div className="flex gap-3 flex-wrap relative">
              <button type="button" className="btn btn-primary">Build my itinerary →</button>
              <Link href={`/${locationSlug}/tickets`} className="btn btn-glass">See tickets</Link>
            </div>
          </div>

          <div className="safety-card-white">
            <div
              className="w-14 h-14 rounded-[18px] flex items-center justify-center text-white text-2xl"
              style={{ background: 'linear-gradient(135deg, var(--leaf), var(--brand-300))' }}
            >
              ✓
            </div>
            <span className="eyebrow">Safety first</span>
            <h3 className="text-[22px] font-bold tracking-tight mt-3 mb-1">
              Certified safe. Lifeguards everywhere.
            </h3>
            <p className="text-sm text-ink-2 leading-relaxed">
              ISO 9001-certified operations, 40+ trained lifeguards on duty, and every ride inspected daily before opening. Height &amp; medical guidelines are enforced.
            </p>
            <div className="flex gap-2 flex-wrap mt-auto">
              <span className="chip chip-green">ISO 9001</span>
              <span className="chip chip-green">IAAPA member</span>
              <span className="chip chip-green">First aid on-site</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

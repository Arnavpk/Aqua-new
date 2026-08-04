import Link from 'next/link';
import { Reveal } from './Reveal';
import { FEATURED_RIDES } from '@/lib/data/home';

export function FeaturedRides({ locationSlug }) {
  return (
    <section className="section-shell" id="rides">
      <div className="container-x">
        <Reveal className="section-head">
          <div className="max-w-[640px]">
            <span className="eyebrow mb-3.5 block">Featured attractions</span>
            <h2 className="h1">Pick your <em>adventure.</em></h2>
          </div>
          <div className="flex gap-2 max-[720px]:hidden">
            <button type="button" className="arrow-btn" aria-label="Previous">←</button>
            <button type="button" className="arrow-btn arrow-btn-primary" aria-label="Next">→</button>
          </div>
        </Reveal>

        <Reveal className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[720px]:flex max-[720px]:overflow-x-auto max-[720px]:snap-x max-[720px]:snap-mandatory max-[720px]:-mx-4 max-[720px]:px-4 max-[720px]:pb-3 max-[720px]:gap-4">
          {FEATURED_RIDES.map((ride) => (
            <Link key={ride.name} href={`/${locationSlug}/rides/${ride.slug}`} className="ride-card max-[720px]:flex-[0_0_78%] max-[720px]:snap-center text-inherit hover:text-inherit">
              <div className={`ride-art ${ride.artClass}`} aria-hidden="true" />
              <div className="absolute top-4 left-4 right-4 flex justify-between z-[2]">
                {ride.badges.map((b) => <span key={b.label} className={`chip ${b.cls}`}>{b.label}</span>)}
              </div>
              <div className="absolute left-6 right-6 bottom-6 text-white z-[2]">
                <div className="font-accent text-[10px] opacity-70 mb-1.5" style={{ letterSpacing: '.14em' }}>{ride.index} · {ride.category}</div>
                <div className="text-[20px] font-bold leading-tight" style={{ letterSpacing: '-.02em' }}>{ride.name}</div>
                <div className="text-[12px] opacity-85 mt-1">{ride.meta}</div>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

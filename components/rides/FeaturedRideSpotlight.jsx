import Link from 'next/link';
import { FEATURED_RIDE } from '@/lib/data/rides';
import { Reveal } from '@/components/Reveal';
import Image from 'next/image';

export function FeaturedRideSpotlight({ locationSlug, ride, section }) {
  const r = ride || FEATURED_RIDE;
  const badgeText = section?.badgeText || "⭐ FEATURED RIDE";
  const ctaLabel = section?.ctaLabel || "View ride details →";
  const previewLabel = section?.previewLabel || "▶ Watch preview";
  const previewEyebrow = section?.previewEyebrow || "POV · 30-second preview";
  const previewHeading = section?.previewHeading || "See the drop before you feel it";

  return (
    <section className="container-x mb-8">
      <Reveal>
        <div className="featured-ride">
          <div className="relative">
            <span className="featured-badge">{badgeText}</span>
            <h2 className="text-[clamp(40px,5vw,72px)] font-extrabold leading-[.95] tracking-tight m-0 mb-4">
              {r.name}.
            </h2>
            <p className="text-lg text-white/90 max-w-[480px] mb-0 leading-relaxed">{r.desc}</p>
            <div className="featured-specs">
              {r.specs.map((s) => (
                <div key={s.k} className="spec flex flex-col gap-0.5">
                  <span className="k">{s.k}</span>
                  <span className="v">{s.v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap relative">
              <Link href={`/${locationSlug}/rides/${r.slug}`} className="btn btn-primary">
                {ctaLabel}
              </Link>
              <button type="button" className="btn btn-glass">{previewLabel}</button>
            </div>
          </div>

          <div className="featured-visual max-[720px]:hidden">
            {section?.bgImage || r.image ? (
              <Image
              height={200} width={400}
                className="absolute inset-0 h-full w-full object-cover z-0"
                src={section?.bgImage || r.image}
                alt={r.name}
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-600" />
                <div className="absolute inset-0 flex items-center justify-center text-[220px] opacity-[.35]" aria-hidden="true">🌊</div>
              </>
            )}
            <button type="button" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88px] h-[88px] rounded-full bg-white/95 flex items-center justify-center text-brand-900 text-[28px] z-[3] cursor-pointer shadow-s3 hover:scale-[1.08] transition-transform" aria-label="Play preview">
              ▶
            </button>
            <div className="absolute bottom-6 left-6 z-[3]">
              <div className="font-accent text-[11px] uppercase opacity-85 font-semibold text-white" style={{ letterSpacing: '.16em' }}>{previewEyebrow}</div>
              <div className="text-xl font-bold text-white">{previewHeading}</div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
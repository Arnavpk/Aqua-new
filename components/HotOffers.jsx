import Link from 'next/link';
import { Reveal } from './Reveal';
import { HOT_OFFERS } from '@/lib/data/home';

export function HotOffers({ locationSlug }) {
  return (
    <section className="section-shell" style={{ paddingTop: 40 }}>
      <div className="container-x">
        <Reveal className="flex justify-between items-end gap-5 mb-6">
          <div>
            <span className="eyebrow">Save more, splash more</span>
            <h2 className="h1 mt-3">Hot offers.</h2>
          </div>
          <Link href={`/${locationSlug}/tickets`} className="btn btn-ghost max-[720px]:hidden">
            View all offers →
          </Link>
        </Reveal>

        <Reveal className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
          {HOT_OFFERS.map((offer) => (
            <div key={offer.slug} className="hot-card">
              <div className="relative" style={{ aspectRatio: '16/10' }}>
                <div className="absolute inset-0 rounded-t-rl" style={{ background: offer.gradient }} />
                <span
                  className="absolute top-3.5 left-3.5 rounded-full px-3 py-1.5 font-accent text-[10.5px] font-bold z-[2]"
                  style={{ background: offer.badge.bg, color: offer.badge.color, letterSpacing: '.06em' }}
                >
                  {offer.badge.label}
                </span>
                <div className="absolute bottom-3.5 right-3.5 bg-white/[.97] rounded-2xl px-3.5 py-2.5 text-right z-[2] shadow-s3">
                  <div className="text-[22px] font-extrabold text-coral leading-none">{offer.discount}</div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-[15px] font-bold tracking-tight mb-1.5">{offer.title}</h3>
                <p className="text-[12px] text-ink-2 leading-relaxed mb-4">{offer.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[11.5px] text-ink-2 font-semibold">{offer.validity}</span>
                  <Link href={`/${locationSlug}/tickets/${offer.slug}`} className="btn btn-dark btn-sm">
                    View offer →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

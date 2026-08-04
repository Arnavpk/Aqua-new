import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { OFFERS } from '@/lib/data/tickets';

export function OffersGrid({ locationSlug }) {
  return (
    <section className="section-shell" id="offers" style={{ paddingTop: 20, paddingBottom: 80 }}>
      <div className="container-x">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow mb-3 block">Limited-time deals</span>
            <h2 className="h1">Exclusive <em>offers.</em></h2>
          </div>
          <span className="body-lg max-w-[360px] max-[720px]:hidden">
            Save up to 70% on your visit — the best time to book is right now.
          </span>
        </Reveal>

        <Reveal className="grid grid-cols-4 gap-4 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
          {OFFERS.map((offer) => (
            <article key={offer.slug} className="offer-card">
              <div className="offer-media">
                <div className={`art ${offer.art}`} data-emoji={offer.emoji} />
                <span className="offer-tag">{offer.tag}</span>
                {offer.badge && <span className={`offer-badge ${offer.badgeCls}`}>{offer.badge}</span>}
                <div className="offer-discount">
                  <div className="big">{offer.discount}</div>
                  <div className="small">{offer.discountSub}</div>
                </div>
              </div>
              <div className="offer-body">
                <h3>{offer.name}</h3>
                <span className="offer-validity">{offer.validity}</span>
                <ul>
                  {offer.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="offer-cta">
                  <Link href={`/${locationSlug}/tickets/${offer.slug}`} className="btn btn-outline">
                    View offer
                  </Link>
                  <Link href={`/${locationSlug}/tickets`} className="btn btn-primary">
                    Book now →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

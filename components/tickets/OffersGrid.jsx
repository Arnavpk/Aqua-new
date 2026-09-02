import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { OFFERS } from '@/lib/data/tickets';
import Image from 'next/image';

export function OffersGrid({ locationSlug, data }) {
  const offers = data?.length && data;

  return (
    <section className="section-shell" id="offers" style={{ paddingTop: 20, paddingBottom: 80 }}>
      <div className="container-x">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow mb-3 block">Limited-time deals</span>
            <h2 className="h1">Exclusive <em>offers.</em></h2>
          </div>
          <span className="body-lg max-w-[360px] max-[720px]:hidden">
            The best time to book is right now.
          </span>
        </Reveal>

        <Reveal className="grid grid-cols-4 gap-4 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
          {offers.map((offer) => (
            <article key={offer.slug} className="offer-card">
              <div className="offer-media">
                {offer.image ? (
                  <div className="art relative overflow-hidden">
                    <Image height={200} width={400} className="absolute inset-0 h-full w-full object-cover" src={offer.image} alt={offer.name} />
                  </div>
                ) : (
                  <div className={`art ${offer.art || 'bg-gradient-to-br from-brand-700 to-brand-400'}`} data-emoji={offer.emoji} />
                )}
                <span className="offer-tag">{offer.tag}</span>
                {offer.badge && <span className="offer-badge badge-hot">{offer.badge}</span>}
                <div className="offer-discount">
                  <div className="big">{offer.discount}</div>
                  <div className="small">{offer.discountSub}</div>
                </div>
              </div>
              <div className="offer-body">
                <h3>
                  {offer.name}{offer.nameEm ? <> <em>{offer.nameEm}</em></> : null}{offer.nameSuffix ? ` ${offer.nameSuffix}` : null}
                </h3>
                <span className="offer-validity">{offer.validity}</span>
                <ul>
                  {offer.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="offer-cta">
                  <Link href={offer.viewCtaUrl || `/${locationSlug}/tickets-and-offers/${offer.slug}`} className="btn btn-outline">
                    {offer.viewCtaLabel || "View offer"}
                  </Link>
                  <Link href={offer.bookCtaUrl || `/${locationSlug}/tickets-and-offers/${offer.slug}`} className="btn btn-primary">
                    {offer.bookCtaLabel || "Book now →"}
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
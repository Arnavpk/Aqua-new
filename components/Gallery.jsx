import Link from 'next/link';
import { Reveal } from './Reveal';
import { GALLERY_TILES } from '@/lib/data/home';

export function Gallery({ locationSlug, data }) {
  const eyebrow = data?.eyebrow || "#AquaImagicaa · Instagram";
  const heading = data?.heading || "You, having a day";
  const ctaLabel = data?.ctaLabel || "See full gallery →";
  const ctaUrl = data?.ctaUrl || `/${locationSlug}/gallery`;
  const tiles = data?.tiles?.length ? data.tiles : GALLERY_TILES;

  return (
    <section className="section-shell section-tight" id="gallery">
      <div className="container-x">
        <Reveal className="section-head">
          <div className="max-w-[640px]">
            <span className="eyebrow mb-3.5 block">{eyebrow}</span>
            <h2 className="h1">{heading}</h2>
          </div>
          <Link href={ctaUrl} className="btn btn-ghost max-[720px]:hidden">
            {ctaLabel}
          </Link>
          <Link
            href={ctaUrl}
            className="hidden max-[720px]:inline-flex text-brand-600 text-sm font-semibold"
          >
            Gallery →
          </Link>
        </Reveal>

        {/* Desktop grid */}
        <Reveal className="gal-desktop">
          {tiles.map((tile, i) => {
            const spanCls = tile.span === 'big' ? 'col-span-2 row-span-2' : 'col-span-2';
            return (
              <div key={i} className={`gal-tile ${spanCls} relative overflow-hidden`}>
                {tile.image ? (
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={tile.image}
                    alt={tile.tag || `Gallery image ${i + 1}`}
                  />
                ) : (
                  <div className="absolute inset-0" style={{ background: tile.gradient }} />
                )}
                {tile.tag && <span className="gal-tag">{tile.tag}</span>}
              </div>
            );
          })}
        </Reveal>

        {/* Mobile grid */}
        <Reveal className="gal-mobile">
          <div className="gal-mobile-grid">
            {tiles.slice(0, 3).map((tile, i) => {
              const cls = i < 2 ? 'gal-m-half' : 'gal-m-full';
              return (
                <div key={i} className={`gal-tile ${cls} relative overflow-hidden`}>
                  {tile.mobileImage || tile.image ? (
                    <img
                      className="absolute inset-0 h-full w-full object-cover"
                      src={tile.mobileImage || tile.image}
                      alt={tile.tag || `Gallery image ${i + 1}`}
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: tile.gradient }} />
                  )}
                  {tile.tag && <span className="gal-tag">{tile.tag}</span>}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
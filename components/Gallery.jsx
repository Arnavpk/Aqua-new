import Link from 'next/link';
import { Reveal } from './Reveal';
import { GALLERY_TILES } from '@/lib/data/home';

export function Gallery({ locationSlug }) {
  return (
    <section className="section-shell section-tight" id="gallery">
      <div className="container-x">
        {/* Header — desktop shows ghost button, mobile shows inline link */}
        <Reveal className="section-head">
          <div className="max-w-[640px]">
            <span className="eyebrow mb-3.5 block">#AquaImagicaa · Instagram</span>
            <h2 className="h1">You, having a day</h2>
          </div>
          <Link href={`/${locationSlug}/gallery`} className="btn btn-ghost max-[720px]:hidden">
            See full gallery →
          </Link>
          <Link
            href={`/${locationSlug}/gallery`}
            className="hidden max-[720px]:inline-flex text-brand-600 text-sm font-semibold"
          >
            Gallery →
          </Link>
        </Reveal>

        {/* Desktop grid — full 7-tile layout */}
        <Reveal className="gal-desktop">
          {GALLERY_TILES.map((tile, i) => {
            const spanCls = tile.span === 'big' ? 'col-span-2 row-span-2' : 'col-span-2';
            return (
              <div key={i} className={`gal-tile ${spanCls}`} style={{ background: tile.gradient }}>
                {tile.tag && <span className="gal-tag">{tile.tag}</span>}
              </div>
            );
          })}
        </Reveal>

        {/* Mobile grid — compact 3-tile layout (2 top + 1 full-width) */}
        <Reveal className="gal-mobile">
          <div className="gal-mobile-grid">
            <div className="gal-tile gal-m-half" style={{ background: GALLERY_TILES[0].gradient }}>
              {GALLERY_TILES[0].tag && <span className="gal-tag">{GALLERY_TILES[0].tag}</span>}
            </div>
            <div className="gal-tile gal-m-half" style={{ background: GALLERY_TILES[1].gradient }}>
              {GALLERY_TILES[1].tag && <span className="gal-tag">{GALLERY_TILES[1].tag}</span>}
            </div>
            <div className="gal-tile gal-m-full" style={{ background: GALLERY_TILES[2].gradient }}>
              {GALLERY_TILES[2].tag && <span className="gal-tag">{GALLERY_TILES[2].tag}</span>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
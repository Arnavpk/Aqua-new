import { Reveal } from './Reveal';
import { GALLERY_TILES } from '@/lib/data/home';

export function Gallery({ locationSlug }) {
  return (
    <section className="section-shell section-tight" id="gallery">
      <div className="container-x">
        <Reveal className="section-head">
          <div className="max-w-[640px]">
            <span className="eyebrow mb-3.5 block">#AquaImagicaa · Instagram</span>
            <h2 className="h1">You, having a day.</h2>
          </div>
          <a href="#" className="btn btn-ghost max-[720px]:hidden">See full gallery →</a>
        </Reveal>
        <Reveal className="grid grid-cols-6 auto-rows-[120px] gap-3 max-[1024px]:grid-cols-4 max-[1024px]:auto-rows-[100px] max-[720px]:grid-cols-2 max-[720px]:auto-rows-[120px]">
          {GALLERY_TILES.map((tile, i) => {
            const spanCls = tile.span === 'big' ? 'col-span-2 row-span-2' : 'col-span-2';
            return (
              <div key={i} className={`gal-tile ${spanCls}`} style={{ background: tile.gradient }}>
                {tile.tag && <span className="gal-tag">{tile.tag}</span>}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

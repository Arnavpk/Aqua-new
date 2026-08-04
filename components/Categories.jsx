import { Reveal } from './Reveal';
import { CATEGORIES } from '@/lib/data/home';

export function Categories() {
  return (
    <section className="section-shell section-tight">
      <div className="container-x">
        <Reveal>
          <div className="cats-bg">
            <div className="relative">
              <span className="eyebrow">Six worlds, one park</span>
              <h2 className="h1 mt-4">Something for<br />every kind of brave.</h2>
              <div className="grid grid-cols-3 gap-4 mt-10 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
                {CATEGORIES.map((c) => (
                  <div key={c.title} className="cat-card">
                    <div className="w-12 h-12 rounded-[14px] mb-4" style={{ background: c.gradient }} aria-hidden="true" />
                    <h3 className="text-base font-semibold m-0 mb-1">{c.title}</h3>
                    <div className="text-[13px] text-ink-2">{c.meta}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

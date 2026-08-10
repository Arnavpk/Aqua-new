import { Reveal } from './Reveal';
import { SAFETY_ITEMS, SAFETY_MARQUEE } from '@/lib/data/home';

export function SafetyBand({ data }) {
  const heading = data?.heading || "Your Safety Our Priority";
  const subtitle = data?.subtitle || "Wave pools, slides & aqua fun under the sun";
  const items = data?.items?.length ? data.items : SAFETY_ITEMS;
  const marquee = data?.marquee?.length ? data.marquee : SAFETY_MARQUEE;

  const doubled = [...marquee, ...marquee, ...marquee, ...marquee];

  return (
    <section className="section-shell section-tight">
      <div className="container-x">
        <Reveal>
          <div className="safety-band">
            <div className="relative z-[1]">
              <div className="text-center mb-8">
                <h2 className="h1 text-white">
                  {heading.split(" ").slice(0, -1).join(" ")}{" "}
                  <em className="!text-sun">{heading.split(" ").slice(-1)}</em>
                </h2>
                <p className="text-white/80 mt-2">{subtitle}</p>
              </div>

              <div className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-2 max-[720px]:gap-3">
                {items.map((item) => (
                  <div key={item.title} className="safety-grid-card">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3" style={{ background: 'linear-gradient(135deg, #EAFBFD, #A8ECF3)' }}>
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold mb-1">{item.title}</h3>
                    <p className="text-[13px] text-ink-2 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scrolling ticker */}
            <div className="mt-8 -mx-12 overflow-hidden py-4 border-t border-white/10">
              <div className="marquee-track text-white/70">
                {doubled.map((item, i) => (
                  <span key={i} className="marquee-item">
                    <span className="marquee-dot" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
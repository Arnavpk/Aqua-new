import { WaveDivider } from './WaveDivider';

export function Hero({ location }) {
  const { hero } = location;

  return (
    <header className="hero-shell relative overflow-hidden" id="top">
      <video
        className="absolute inset-0 h-full w-full object-cover z-0"
        src={hero.video}
        poster={hero.video_poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      <div className="container-x relative z-[3]">
        <div className="relative pb-[140px] max-[720px]:pb-[110px]">
          <p className="eyebrow eyebrow-sun hero-fade mb-5">{hero.eyebrow}</p>
          <h1 className="hero-title hero-fade">
            {hero.title.line1}
            <br />
            {hero.title.line2} <em>{hero.title.emphasis}</em>
          </h1>
          <p className="hero-sub hero-fade">{hero.subtitle}</p>
          <div className="flex flex-wrap gap-3 hero-fade">
            {hero.primaryCta && (
              <a href={hero.primaryCta.href} className="btn btn-primary">
                {hero.primaryCta.label}
              </a>
            )}
            {hero.secondaryCta && (
              <a href={hero.secondaryCta.href} className="btn btn-glass">
                {hero.secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container-x absolute left-0 right-0 bottom-16 z-[3] flex justify-between items-end gap-6 opacity-0 max-[720px]:hidden" style={{ animation: 'fadeUp .8s cubic-bezier(.22,1,.36,1) forwards .8s' }}>
        <div className="flex gap-10">
          {hero.meta.map((m, i) => (
            <div key={i} className="meta-item"><strong>{m.strong}</strong>{m.detail}</div>
          ))}
        </div>
        <div className="scroll-cue" aria-hidden="true">Scroll</div>
      </div>

      <WaveDivider fill="#EAFBFD" />
    </header>
  );
}
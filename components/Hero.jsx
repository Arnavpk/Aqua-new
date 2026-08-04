import { WaveDivider } from './WaveDivider';

export function Hero({ location }) {
  const { hero, hours } = location;
  const words = [];
  let idx = 0;
  hero.title.lines.forEach((line, li) => {
    line.forEach((w) => {
      words.push({ w, delay: `${(0.05 + idx * 0.1).toFixed(2)}s`, key: `${li}-${idx}` });
      idx++;
    });
    words.push({ br: true, key: `br-${li}` });
  });
  if (words.length && words[words.length - 1].br) words.pop();

  return (
    <header className="hero-shell relative overflow-hidden" id="top">
      <video
        className="absolute inset-0 h-full w-full object-cover z-0"
        src="https://www.aquaimagicaa.com/surat/wp-content/uploads/aquamagica-video-desktop.mp4"
        poster={hero.videoPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* keeps text/badges readable over the footage — tune opacity to taste */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      <div className="container-x relative z-[3]">
        <div className="relative pb-[140px] max-[720px]:pb-[110px]">
          <p className="eyebrow eyebrow-sun hero-fade mb-5">{hours.eyebrow}</p>
          <h1 className="hero-title">
            {words.map((item) => {
              if (item.br) return <br key={item.key} />;
              if (typeof item.w === 'object' && item.w.em) {
                return <span key={item.key} className="hero-word" style={{ animationDelay: item.delay }}><em>{item.w.em}</em></span>;
              }
              return <><span key={item.key} className="hero-word" style={{ animationDelay: item.delay }}>{item.w}</span>{' '}</>;
            })}
          </h1>
          <p className="hero-sub hero-fade">{hero.subtitle}</p>
          <div className="flex flex-wrap gap-3 hero-fade">
            <a href={hero.primaryCta.href} className="btn btn-primary">{hero.primaryCta.label}</a>
            <a href={hero.secondaryCta.href} className="btn btn-glass">{hero.secondaryCta.label}</a>
          </div>
        </div>
      </div>

      <div className="container-x absolute left-0 right-0 bottom-16 z-[3] flex justify-between items-end gap-6 opacity-0 max-[720px]:hidden" style={{ animation: 'fadeUp .8s cubic-bezier(.22,1,.36,1) forwards .8s' }}>
        <div className="flex gap-10">
          {hero.meta.map((m) => (
            <div key={m.strong} className="meta-item"><strong>{m.strong}</strong>{m.detail}</div>
          ))}
        </div>
        <div className="scroll-cue" aria-hidden="true">Scroll</div>
      </div>

      <WaveDivider fill="#EAFBFD" />
    </header>
  );
}
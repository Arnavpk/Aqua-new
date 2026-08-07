import { Reveal } from './Reveal';
import { EVENTS } from '@/lib/data/home';

export function EventsSplit({ data }) {
  const events = data?.events?.length ? data.events : EVENTS;

  return (
    <section className="section-shell section-tight">
      <div className="container-x">
        <Reveal className="grid grid-cols-[1.15fr_1fr] gap-5 max-[1024px]:grid-cols-1">
          {events.map((ev, i) => (
            <article key={i} className={`split-card ${ev.variant === 'dark' ? 'split-dark' : 'split-yellow'} relative overflow-hidden`}>
              {ev.image && (
                <>
                  <img
                    className="absolute inset-0 h-full w-full object-cover z-0"
                    src={ev.image}
                    alt={ev.title}
                  />
                  {/* <div className="absolute inset-0 z-[1] bg-black/50" /> */}
                </>
              )}
              <div className="relative z-[2]">
                <p className={`eyebrow ${ev.variant === 'dark' ? 'eyebrow-sun' : ''}`}>{ev.eyebrow}</p>
                <h3 className="split-title mt-4" style={{ whiteSpace: 'pre-line' }}>{ev.title}</h3>
                <p className="text-[15px] opacity-85 mb-6 max-w-[320px]">{ev.desc}</p>
                <a href={ev.cta.href} className={`btn ${ev.variant === 'dark' ? 'btn-primary' : 'btn-dark'}`}>
                  {ev.cta.label}
                </a>
              </div>
              {ev.code && (
                <div className="absolute right-6 bottom-6 font-accent text-[11px] opacity-55 z-[2]" style={{ letterSpacing: '.08em' }}>
                  {ev.code}
                </div>
              )}
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
import { Reveal } from './Reveal';

export function CtaBanner({ locationSlug }) {
  return (
    <section className="section-shell section-tight" id="tickets">
      <div className="container-x">
        <Reveal>
          <div className="cta-banner">
            <span className="eyebrow eyebrow-sun">Ready when you are</span>
            <h2 className="h-display my-5 mb-8">Your day out<br />starts here.</h2>
            <a href={`/${locationSlug}/tickets`} className="btn btn-primary btn-lg">Book tickets from ₹899 →</a>
            <div className="absolute left-0 right-0 bottom-0 h-20 pointer-events-none" aria-hidden="true">
              <svg className="w-[200%] h-full animate-wave-1" viewBox="0 0 2400 80" preserveAspectRatio="none">
                <path d="M0,40 C300,10 500,60 800,40 C1100,20 1300,60 1600,40 C1900,20 2100,60 2400,40 L2400,80 L0,80 Z" fill="rgba(255,255,255,.18)" />
              </svg>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

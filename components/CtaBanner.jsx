import Image from 'next/image';
import { Reveal } from './Reveal';

export function CtaBanner({ locationSlug, data }) {
  const eyebrow = data?.eyebrow || "Ready when you are";
  const heading = data?.heading || "Your day out starts here.";
  const ctaLabel = data?.ctaLabel || "Book tickets from ₹899 →";
  const ctaUrl = data?.ctaUrl || `/${locationSlug}/tickets`;

  return (
    <section className="section-shell section-tight" id="tickets">
      <div className="container-x">
        <Reveal>
          <div className="cta-banner relative overflow-hidden">
            {/* Background image */}
            {data?.bgImage && (
              <>
                <Image height={200} width={400}                
                  className="absolute inset-0 h-full w-full object-cover z-0 hidden md:block"
                  src={data.bgImage}
                  alt=""
                />
                <Image height={200} width={400}
                  className="absolute inset-0 h-full w-full object-cover z-0 md:hidden"
                  src={data.mobileBg || data.bgImage}
                  alt=""
                />
                <div className="absolute inset-0 z-[1] bg-black/40" />
              </>
            )}

            <div className="relative z-[2]">
              <span className="eyebrow eyebrow-sun">{eyebrow}</span>
              <h2 className="h-display my-5 mb-8" style={{ whiteSpace: 'pre-line' }}>{heading}</h2>
              <a href={ctaUrl} className="btn btn-primary btn-lg">{ctaLabel}</a>
            </div>

            <div className="absolute left-0 right-0 bottom-0 h-20 pointer-events-none z-[3]" aria-hidden="true">
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
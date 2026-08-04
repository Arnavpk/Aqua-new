import { Reveal } from './Reveal';

export function ParkMap() {
  return (
    <section className="section-shell section-tight">
      <div className="container-x">
        <Reveal>
          <div className="park-map flex flex-col items-center justify-center p-6 relative">
            {/* Park map title */}
            <span className="absolute top-6 left-6 z-[2] text-[24px] font-extrabold text-white" style={{ textShadow: '0 4px 20px rgba(10,85,102,.5)' }}>
              Park Map
            </span>
            {/* Category toggles */}
            <div className="absolute top-6 right-6 z-[2] flex gap-2">
              <button className="btn btn-primary btn-sm" style={{ boxShadow: '0 10px 24px -8px rgba(255,216,77,.7)' }}>
                Water Park
              </button>
              <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,.9)', color: 'var(--ink)' }}>
                Dining
              </button>
            </div>
            {/* Placeholder visual */}
            <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-20" aria-hidden="true">🗺️</div>
            {/* Download CTA */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2]">
              <button className="btn btn-dark" style={{ boxShadow: '0 12px 30px -10px rgba(10,85,102,.5)' }}>
                Download full park map PDF →
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

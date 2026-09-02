import Image from 'next/image';
import { Reveal } from './Reveal';

export function ParkMap({ data }) {
  const title = data?.title || "Park Map";
  const downloadLabel = data?.downloadLabel || "Download full park map PDF →";

  return (
    <section className="section-shell section-tight">
      <div className="container-x">
        <Reveal>
          <div className="park-map flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background map image */}
            {data?.mapImage ? (
              <>
                <Image height={200} width={400}
                  className="absolute inset-0 h-full w-full object-cover z-0 hidden md:block"
                  src={data.mapImage}
                  alt={title}
                />
                <Image height={200} width={400}
                  className="absolute inset-0 h-full w-full object-cover z-0 md:hidden"
                  src={data.mobileMapImage || data.mapImage}
                  alt={title}
                />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-20" aria-hidden="true">🗺️</div>
            )}

            {/* Title */}
            <span className="absolute top-6 left-6 z-[2] text-[24px] font-extrabold text-white" style={{ textShadow: '0 4px 20px rgba(10,85,102,.5)' }}>
              {title}
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

            {/* Download CTA */}
            {data?.pdfUrl && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2]">
                <a
                  href={data.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark"
                  style={{ boxShadow: '0 12px 30px -10px rgba(10,85,102,.5)' }}
                >
                  {downloadLabel}
                </a>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
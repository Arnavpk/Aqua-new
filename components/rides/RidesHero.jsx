import Link from 'next/link';
import { WaveDivider } from '@/components/WaveDivider';

export function RidesHero({ locationSlug }) {
  return (
    <header className="rides-hero">
      <div className="container-x relative z-[3]">
        <div className="grid grid-cols-2 gap-12 items-center max-[1180px]:grid-cols-1 max-[1180px]:gap-12">
          <div>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href={`/${locationSlug}`}>Home</Link>
              <span className="sep">›</span>
              <span className="text-white">Rides &amp; Attractions</span>
            </nav>
            <span className="eyebrow eyebrow-sun mb-3 block">14 rides · 3 pools · 1 unforgettable day</span>
            <h1 className="h-display mb-4">
              Rides &amp; <em className="!text-sun">attractions.</em>
            </h1>
            <p className="text-lg text-white/85 max-w-[520px] mb-6 font-light leading-relaxed">
              From adrenaline-fuelled thrill slides to gentle lazy rivers — every ride at Aqua Imagicaa Surat is engineered for stories worth telling.
            </p>
            <div className="flex gap-3 flex-wrap mb-8">
              <Link href={`/${locationSlug}/tickets`} className="btn btn-primary">Book tickets from ₹599 →</Link>
              <a href="#rides" className="btn btn-glass">Explore rides ↓</a>
            </div>
            <div className="grid grid-cols-4 gap-6 max-[720px]:grid-cols-2 max-[720px]:gap-4">
              {[
                { n: '14', l: 'Signature rides' },
                { n: '6', l: 'Attraction zones' },
                { n: '40+', l: 'Trained lifeguards' },
                { n: 'ISO', l: '9001 certified' },
              ].map((s) => (
                <div key={s.l} className="hero-stat">
                  <strong>{s.n}</strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mosaic */}
          <div className="relative h-[480px] max-[1180px]:h-[400px] max-[720px]:h-[340px]">
            <div className="mosaic-tile rounded-rl" style={{ top: '0', left: '6%', width: '48%', height: '48%', background: 'linear-gradient(135deg, #0A5566, #22C4DE)', animationDelay: '0s' }}>
              <span className="tile-tag">THRILL</span>
              <span className="tile-label">Wild Raft</span>
            </div>
            <div className="mosaic-tile rounded-rl" style={{ top: '8%', right: '0', width: '42%', height: '44%', background: 'linear-gradient(135deg, #00A5C8, #5FDDEA)', animationDelay: '2s' }}>
              <span className="tile-tag">POOL</span>
              <span className="tile-label">Wave Pool</span>
            </div>
            <div className="mosaic-tile rounded-rl" style={{ bottom: '0', right: '6%', width: '52%', height: '44%', background: 'linear-gradient(135deg, #3FE0A5, #5FDDEA)', animationDelay: '4s' }}>
              <span className="tile-tag">FAMILY</span>
              <span className="tile-label">Lazy River</span>
            </div>
            <div className="mosaic-tile rounded-rl" style={{ bottom: '12%', left: '0', width: '34%', height: '34%', background: 'linear-gradient(135deg, #FFD84D, #FF7A9C)', animationDelay: '3s' }}>
              <span className="tile-tag">KIDS</span>
              <span className="tile-label">Splash Pad</span>
            </div>
          </div>
        </div>
      </div>
      <WaveDivider fill="#EAFBFD" />
    </header>
  );
}

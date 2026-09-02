import Link from 'next/link';
import { WaveDivider } from '@/components/WaveDivider';
import Image from 'next/image';

const DEFAULT_STATS = [
  { n: '14', l: 'Signature rides' },
  { n: '6', l: 'Attraction zones' },
  { n: '40+', l: 'Trained lifeguards' },
  { n: 'ISO', l: '9001 certified' },
];

const DEFAULT_MOSAIC = [
  { tag: 'THRILL', label: 'Wild Raft', image: null, gradient: 'linear-gradient(135deg, #0A5566, #22C4DE)' },
  { tag: 'POOL', label: 'Wave Pool', image: null, gradient: 'linear-gradient(135deg, #00A5C8, #5FDDEA)' },
  { tag: 'KIDS', label: 'Splash Pad', image: null, gradient: 'linear-gradient(135deg, #FFD84D, #FF7A9C)' },
  { tag: 'FAMILY', label: 'Lazy River', image: null, gradient: 'linear-gradient(135deg, #3FE0A5, #5FDDEA)' },
];

const TILE_STYLES = [
  { top: '0', left: '6%', width: '48%', height: '48%', animationDelay: '0s' },
  { top: '8%', right: '0', width: '42%', height: '44%', animationDelay: '2s' },
  { bottom: '12%', left: '0', width: '34%', height: '34%', animationDelay: '3s' },
  { bottom: '0', right: '6%', width: '52%', height: '44%', animationDelay: '4s' },
];


export function RidesHero({ locationSlug, data, mosaic }) {
  const eyebrow = data?.eyebrow || "14 rides · 3 pools · 1 unforgettable day";
  const heading = data?.heading || "Rides & attractions.";
  const description = data?.description || "From adrenaline-fuelled thrill slides to gentle lazy rivers — every ride at Aqua Imagicaa is engineered for stories worth telling.";
  const ctaLabel = data?.ctaLabel || "Book tickets from ₹599 →";
  const ctaUrl = data?.ctaUrl || `/${locationSlug}/tickets`;
  const stats = data?.stats || DEFAULT_STATS;
  const tiles = mosaic?.length ? mosaic : DEFAULT_MOSAIC;

  return (
    <header className="rides-hero">
      {data?.bgImage && (
        <>
          <Image
          height={200} width={400}
            className="absolute inset-0 h-full w-full object-cover z-0 hidden md:block"
            src={data.bgImage}
            alt=""
          />
          <Image
          height={200} width={400}
            className="absolute inset-0 h-full w-full object-cover z-0 md:hidden"
            src={data.mobileImage || data.bgImage}
            alt=""
          />
        </>
      )}
      <div className="container-x relative z-[3]">
        <div className="grid grid-cols-2 gap-12 items-center max-[1180px]:grid-cols-1 max-[1180px]:gap-12">
          <div>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href={`/${locationSlug}`}>Home</Link>
              <span className="sep">›</span>
              <span className="text-white">Rides &amp; Attractions</span>
            </nav>
            <span className="eyebrow eyebrow-sun mb-3 block">{eyebrow}</span>
            <h1 className="h-display mb-4">
              {heading.split(" ").slice(0, -1).join(" ")}{" "}
              <em className="!text-sun">{heading.split(" ").slice(-1)}</em>
            </h1>
            <p className="text-lg text-white/85 max-w-[520px] mb-6 font-light leading-relaxed">
              {description}
            </p>
            <div className="flex gap-3 flex-wrap mb-8">
              <Link href={ctaUrl} className="btn btn-primary">{ctaLabel}</Link>
              <a href="#rides" className="btn btn-glass">Explore rides ↓</a>
            </div>
            <div className="grid grid-cols-4 gap-6 max-[720px]:grid-cols-2 max-[720px]:gap-4">
              {stats.map((s) => (
                <div key={s.l} className="hero-stat">
                  <strong>{s.n}</strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[480px] max-[1180px]:h-[400px] max-[720px]:h-[340px]">
            {tiles.map((tile, i) => (
              <div
                key={tile.tag}
                className="mosaic-tile rounded-rl overflow-hidden"
                style={{ position: 'absolute', ...TILE_STYLES[i], background: tile.gradient }}
              >
                {tile.image && (
                  <Image
                  height={200} width={400}
                    className="absolute inset-0 h-full w-full object-cover z-0"
                    src={tile.image}
                    alt={tile.label}
                  />
                )}
                <span className="tile-tag">{tile.tag}</span>
                <span className="tile-label">{tile.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <WaveDivider fill="#EAFBFD" />
    </header>
  );
}
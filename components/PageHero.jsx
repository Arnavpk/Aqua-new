import Image from 'next/image';
import { WaveDivider } from './WaveDivider';

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs = [],
  stats = [],
  primaryCta = null,
  secondaryCta = null,
  bgImage = null,
  mobileImage = null,
  fill = '#EAFBFD',
}) {
  return (
    <header
      className="relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(135deg, #0A5566 0%, #00A5C8 60%, #5FDDEA 100%)',
        padding: '140px 0 180px',
      }}
    >
      {bgImage && (
        <>
          <Image
          height={200} width={400}
            className="absolute inset-0 h-full w-full object-cover z-0 hidden md:block"
            src={bgImage}
            alt=""
          />
          <Image
          height={200} width={400}
            className="absolute inset-0 h-full w-full object-cover z-0 md:hidden"
            src={mobileImage || bgImage}
            alt=""
          />
          <div className="absolute inset-0 z-[1] bg-black/40" />
        </>
      )}
      {!bgImage && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(600px 300px at 80% 10%, rgba(255,255,255,.4), transparent 60%)',
          }}
          aria-hidden="true"
        />
      )}
      <div className="container-x relative z-[3]">
        {breadcrumbs.length > 0 && (
          <nav className="breadcrumb" aria-label="Breadcrumb">
            {breadcrumbs.map((bc, i) => (
              <span key={i}>
                {i > 0 && <span className="sep">›</span>}
                {bc.href ? (
                  <a href={bc.href}>{bc.label}</a>
                ) : (
                  <span className="text-white">{bc.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="eyebrow eyebrow-sun mb-4 block">{eyebrow}</span>}
        <h1 className="h-display mb-4">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/85 max-w-[600px] leading-relaxed">{subtitle}</p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="flex gap-3 flex-wrap mt-6">
            {primaryCta && (
              <a href={primaryCta.href} className="btn btn-primary">
                {primaryCta.label}
              </a>
            )}
            {secondaryCta && (
              <a href={secondaryCta.href} className="btn btn-glass">
                {secondaryCta.label}
              </a>
            )}
          </div>
        )}

        {stats.length > 0 && (
          <div className="grid grid-cols-4 gap-6 mt-8 max-[720px]:grid-cols-2 max-[720px]:gap-4">
            {stats.map((s) => (
              <div key={s.l} className="hero-stat">
                <strong>{s.n}</strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <WaveDivider fill={fill} />
    </header>
  );
}
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
  // Optional { width, height } of the images. Only used when the hero shows the image alone,
  // to reserve the right space before the image loads.
  bgImageSize = null,
  mobileImageSize = null,
  bgVideo = null,
  mobileVideo = null,
  videoPoster = null,
  fill = '#EAFBFD',
}) {
  const hasMedia = Boolean(bgVideo || bgImage);
  const hasContent = Boolean(eyebrow || title || subtitle || primaryCta || secondaryCta || stats.length);

  // No text, buttons or stats: show the image at its own proportions instead of
  // squeezing it into the padded text layout, so it doesn't shrink. No dark overlay.
  if (!hasContent && !bgVideo && bgImage) {
    const separateMobile = Boolean(mobileImage && mobileImage !== bgImage);
    return (
      <header className="relative overflow-hidden">
        <Image
          src={bgImage}
          alt=""
          width={bgImageSize?.width || 3840}
          height={bgImageSize?.height || 1600}
          sizes="100vw"
          priority
          className={`block w-full h-auto ${separateMobile ? 'hidden md:block' : ''}`}
        />
        {separateMobile && (
          <Image
            src={mobileImage}
            alt=""
            width={mobileImageSize?.width || 2160}
            height={mobileImageSize?.height || 1920}
            sizes="100vw"
            className="block w-full h-auto md:hidden"
          />
        )}
        <WaveDivider fill={fill} />
      </header>
    );
  }

  return (
    <header
      className="relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(135deg, #0A5566 0%, #00A5C8 60%, #5FDDEA 100%)',
        padding: '140px 0 180px',
      }}
    >
      {bgVideo ? (
        <>
          {/* One video for all screens unless a separate mobile cut is given,
              so desktop doesn't download two files. */}
          <video
            className={`absolute inset-0 h-full w-full object-cover z-0 ${mobileVideo ? 'hidden md:block' : ''}`}
            src={bgVideo}
            poster={videoPoster || bgImage || undefined}
            autoPlay muted loop playsInline
            preload="metadata"
            aria-hidden="true"
          />
          {mobileVideo && (
            <video
              className="absolute inset-0 h-full w-full object-cover z-0 md:hidden"
              src={mobileVideo}
              poster={videoPoster || mobileImage || bgImage || undefined}
              autoPlay muted loop playsInline
              preload="metadata"
              aria-hidden="true"
            />
          )}
          <div className="absolute inset-0 z-[1] bg-black/40" />
        </>
      ) : bgImage ? (
        <>
          {/* fill + sizes="100vw" so the browser gets a full-width image, not a 400px one stretched. */}
          <Image
            fill
            sizes="100vw"
            priority
            className="object-cover z-0 hidden md:block"
            src={bgImage}
            alt=""
          />
          <Image
            fill
            sizes="100vw"
            className="object-cover z-0 md:hidden"
            src={mobileImage || bgImage}
            alt=""
          />
          <div className="absolute inset-0 z-[1] bg-black/40" />
        </>
      ) : null}
      {!hasMedia && (
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
        {title && <h1 className="h-display mb-4">{title}</h1>}
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
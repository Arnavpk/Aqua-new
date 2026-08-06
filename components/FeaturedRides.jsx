'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Reveal } from './Reveal';
import { FEATURED_RIDES } from '@/lib/data/home';

const AUTOPLAY_MS = 3000;

export function FeaturedRides({ locationSlug }) {
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = FEATURED_RIDES.length;

  /* ---- scroll to card ---- */
  const scrollTo = useCallback((i) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setIdx(i);
  }, []);

  /* ---- autoplay ---- */
  const stopAuto = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timerRef.current = setInterval(() => {
      setIdx((prev) => {
        const next = (prev + 1) % total;
        const track = trackRef.current;
        if (track && track.children[next]) {
          track.scrollTo({ left: track.children[next].offsetLeft - track.offsetLeft, behavior: 'smooth' });
        }
        return next;
      });
    }, AUTOPLAY_MS);
  }, [stopAuto, total]);

  useEffect(() => { startAuto(); return stopAuto; }, [startAuto, stopAuto]);

  /* ---- pause on interaction ---- */
  const onInteractStart = () => { setPaused(true); stopAuto(); };
  const onInteractEnd = () => { setPaused(false); startAuto(); };

  /* ---- sync idx from manual scroll ---- */
  const onScroll = () => {
    const track = trackRef.current;
    if (!track || !paused) return;
    let closest = 0;
    let minDist = Infinity;
    Array.from(track.children).forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setIdx(closest);
  };

  const prev = () => { scrollTo((idx - 1 + total) % total); startAuto(); };
  const next = () => { scrollTo((idx + 1) % total); startAuto(); };

  return (
    <section className="section-shell" id="rides">
      <div className="container-x">
        <Reveal className="section-head max-[720px]:!flex-row max-[720px]:!items-center">
          <div className="max-w-[640px]">
            <span className="eyebrow mb-3.5 block">Featured attractions</span>
            <h2 className="h1">Pick your <em>adventure.</em></h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2 max-[720px]:hidden">
              <button type="button" className="arrow-btn" onClick={prev} aria-label="Previous">←</button>
              <button type="button" className="arrow-btn arrow-btn-primary" onClick={next} aria-label="Next">→</button>
            </div>
            <Link href={`/${locationSlug}/rides`} className="btn btn-outline btn-sm">
              All rides →
            </Link>
          </div>
        </Reveal>

        {/* Carousel track */}
        <Reveal>
          <div
            ref={trackRef}
            className="rides-carousel"
            onMouseEnter={onInteractStart}
            onMouseLeave={onInteractEnd}
            onTouchStart={onInteractStart}
            onTouchEnd={onInteractEnd}
            onScroll={onScroll}
          >
            {FEATURED_RIDES.map((ride) => (
              <Link
                key={ride.name}
                href={`/${locationSlug}/rides/${ride.slug}`}
                className="rides-carousel-card text-inherit hover:text-inherit"
              >
                {/* Art layer — video if available, gradient fallback */}
                <div className={`ride-art relative overflow-hidden ${ride.artClass}`}>
                  {ride.video && (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      src={ride.video}
                      poster={ride.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  )}
                  {/* Gradient overlay — keeps text readable over video or gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between z-[2]">
                  {ride.badges.map((b) => (
                    <span key={b.label} className={`chip ${b.cls}`}>{b.label}</span>
                  ))}
                </div>

                {/* Info */}
                <div className="absolute left-4 right-4 bottom-4 text-white z-[2]">
                  <div className="font-accent text-[9px] opacity-70 mb-1" style={{ letterSpacing: '.14em' }}>
                    {ride.index} · {ride.category}
                  </div>
                  <div className="text-[18px] font-bold leading-tight" style={{ letterSpacing: '-.02em' }}>
                    {ride.name}
                  </div>
                  <div className="text-[11px] opacity-85 mt-0.5">{ride.meta}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Dots */}
          <div className="rides-dots">
            {FEATURED_RIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`rides-dot ${i === idx ? 'is-active' : ''}`}
                onClick={() => { scrollTo(i); startAuto(); }}
                aria-label={`Ride ${i + 1}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { QUOTES } from '@/lib/data/home';
import { Reveal } from './Reveal';
import Image from 'next/image';

const AUTOPLAY = 8000;
const FADE = 200;

export function Testimonials({ data }) {
  const eyebrow = data?.eyebrow || "4.7 ★ · 12,400 reviews";
  const quotes = data?.quotes?.length ? data.quotes : QUOTES;

  const [idx, setIdx] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [show, setShow] = useState(true);
  const timer = useRef(null);
  const q = quotes[displayIdx];

  useEffect(() => {
    if (idx === displayIdx) return;
    setShow(false);
    const t = setTimeout(() => { setDisplayIdx(idx); setShow(true); }, FADE);
    return () => clearTimeout(t);
  }, [idx, displayIdx]);

  const stop = useCallback(() => { if (timer.current) { clearInterval(timer.current); timer.current = null; } }, []);
  const start = useCallback(() => { stop(); if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; timer.current = setInterval(() => setIdx((i) => (i + 1) % quotes.length), AUTOPLAY); }, [stop, quotes.length]);
  useEffect(() => { start(); return stop; }, [start, stop]);

  const go = (i) => { setIdx(((i % quotes.length) + quotes.length) % quotes.length); start(); };

  return (
    <section className="section-shell section-tight">
      <div className="container-x">
        <Reveal>
          <div className="quote-shell" onMouseEnter={stop} onMouseLeave={start}>
            <div className="relative">
              <span className="eyebrow eyebrow-sun">{eyebrow}</span>
              <blockquote className={`quote-text ${show ? 'is-visible' : ''}`}>
                &quot;{q.text}&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                {q.avatar ? (
                  <Image height={200} width={400} className="w-14 h-14 rounded-full flex-shrink-0 object-cover" src={q.avatar} alt={q.name} />
                ) : (
                  <div className="w-14 h-14 rounded-full flex-shrink-0 transition-[background] duration-500 ease-smooth" style={{ background: `linear-gradient(135deg, ${q.c1}, ${q.c2})` }} aria-hidden="true" />
                )}
                <div>
                  <div className="font-semibold">{q.name}</div>
                  <div className="text-sm opacity-70">{q.city}</div>
                </div>
                <div className="ml-auto flex gap-2 max-[720px]:hidden">
                  <button type="button" className="quote-btn" onClick={() => go(idx - 1)} aria-label="Previous">←</button>
                  <button type="button" className="quote-btn quote-btn-primary" onClick={() => go(idx + 1)} aria-label="Next">→</button>
                </div>
              </div>
              <div className="flex gap-1.5 mt-8" role="tablist">
                {quotes.map((_, i) => (
                  <button key={i} type="button" className={`quote-dot ${i === displayIdx ? 'is-active' : ''}`} onClick={() => go(i)} aria-label={`Testimonial ${i + 1}`} role="tab" aria-selected={i === displayIdx} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
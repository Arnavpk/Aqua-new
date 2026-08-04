'use client';
import { useEffect, useRef, useState } from 'react';

export function StatNum({ target, suffix = '', duration = 1200 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(target);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started) return;
        obs.disconnect();
        setStarted(true);
        setVal(0);
        const t0 = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - t0) / duration);
          setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
          else setVal(target);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, started]);

  return (
    <div ref={ref} className="stat-num">
      {started ? val : target}
      {suffix}
    </div>
  );
}

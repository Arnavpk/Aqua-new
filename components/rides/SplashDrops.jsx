'use client';

import { useEffect, useState } from 'react';

const N = 14;

function make() {
  const a = [];
  for (let i = 0; i < N; i++) {
    a.push({
      top: Math.random() * 90,
      left: Math.random() * 100,
      size: 60 + Math.random() * 200,
      dx: (Math.random() - 0.5) * 80,
      dy: (Math.random() - 0.5) * 80,
      dur: 14 + Math.random() * 18,
      delay: -Math.random() * 22,
    });
  }
  return a;
}

export function SplashDrops() {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setDrops(make());
  }, []);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
      {drops.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full opacity-0"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.85), rgba(95,221,234,.3) 50%, transparent 70%)',
            animation: `driftDrop ${d.dur}s ease-in-out infinite`,
            animationDelay: `${d.delay}s`,
            '--dx': `${d.dx}px`,
            '--dy': `${d.dy}px`,
          }}
        />
      ))}
    </div>
  );
}

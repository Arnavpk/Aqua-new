'use client';
import { useEffect, useState } from 'react';

const N = 22;
function make() {
  const a = [];
  for (let i = 0; i < N; i++) {
    a.push({
      left: Math.random() * 100,
      size: 6 + Math.random() * 24,
      dx: (Math.random() - 0.5) * 60,
      dur: 8 + Math.random() * 12,
      delay: -Math.random() * 20,
    });
  }
  return a;
}

export function Bubbles() {
  const [b, setB] = useState([]);
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setB(make());
  }, []);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
      {b.map((x, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: `${x.left}%`,
            width: `${x.size}px`,
            height: `${x.size}px`,
            animationDuration: `${x.dur}s`,
            animationDelay: `${x.delay}s`,
            '--dx': `${x.dx}px`,
          }}
        />
      ))}
    </div>
  );
}

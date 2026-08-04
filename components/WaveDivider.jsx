export function WaveDivider({ fill = '#EAFBFD' }) {
  return (
    <div className="absolute left-0 right-0 bottom-0 h-[180px] z-[2] pointer-events-none" aria-hidden="true">
      <svg className="wave-svg opacity-40 animate-wave-1" viewBox="0 0 2400 180" preserveAspectRatio="none">
        <path d="M0,110 C300,60 500,150 800,110 C1100,70 1300,140 1600,110 C1900,80 2100,150 2400,110 L2400,180 L0,180 Z" fill={`${fill}66`} />
      </svg>
      <svg className="wave-svg opacity-60 animate-wave-2" viewBox="0 0 2400 180" preserveAspectRatio="none">
        <path d="M0,130 C300,90 500,170 800,130 C1100,90 1300,160 1600,130 C1900,100 2100,170 2400,130 L2400,180 L0,180 Z" fill={`${fill}B3`} />
      </svg>
      <svg className="wave-svg animate-wave-3" viewBox="0 0 2400 180" preserveAspectRatio="none">
        <path d="M0,150 C300,110 500,180 800,150 C1100,120 1300,180 1600,150 C1900,120 2100,180 2400,150 L2400,180 L0,180 Z" fill={fill} />
      </svg>
    </div>
  );
}

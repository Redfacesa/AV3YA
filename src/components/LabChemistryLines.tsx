'use client';

type Props = {
  className?: string;
  tone?: 'hero' | 'body';
};

export default function LabChemistryLines({ className = '', tone = 'body' }: Props) {
  const stroke = tone === 'hero' ? 'rgba(37, 99, 235, 0.28)' : 'rgba(37, 99, 235, 0.16)';
  const strokePink = tone === 'hero' ? 'rgba(236, 72, 153, 0.18)' : 'rgba(236, 72, 153, 0.12)';

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1200 700"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <g className="lab-chem-flow" strokeWidth="1">
        <path d="M80 120 C 220 80, 280 240, 420 200 S 620 80, 760 160" stroke={stroke} />
        <path d="M180 520 C 320 480, 400 360, 560 400 S 820 520, 1040 360" stroke={strokePink} />
        <path d="M40 340 L 180 300 L 260 380 L 420 340 L 520 420 L 700 300 L 860 360 L 1020 220" stroke={stroke} />
        <path d="M980 80 C 900 180, 980 280, 860 360 S 720 480, 640 560" stroke={strokePink} />
      </g>
      {[
        [80, 120],
        [420, 200],
        [760, 160],
        [180, 520],
        [560, 400],
        [1040, 360],
        [260, 380],
        [700, 300],
        [1020, 220],
        [860, 360],
      ].map(([cx, cy], i) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={i % 3 === 0 ? 5 : 3.5} fill="white" stroke={i % 2 ? strokePink : stroke} strokeWidth="1.2" />
          <circle cx={cx} cy={cy} r="10" className="lab-chem-pulse" stroke={i % 2 ? strokePink : stroke} />
        </g>
      ))}
    </svg>
  );
}

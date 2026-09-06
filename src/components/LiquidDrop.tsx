export default function LiquidDrop() {
  return (
    <div className="relative h-28 sm:h-36 overflow-hidden bg-transparent" aria-hidden>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lab-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(56, 189, 248)" stopOpacity="0.55" />
            <stop offset="55%" stopColor="rgb(236, 72, 153)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(255, 255, 255)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          className="lab-liquid-stream"
          d="M200 0 C 198 30, 210 40, 200 70 C 188 100, 205 110, 200 140"
          fill="none"
          stroke="url(#lab-liquid)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle className="lab-liquid-drop" cx="200" cy="28" r="4" fill="rgb(56, 189, 248)" opacity="0.7" />
        <circle className="lab-liquid-drop lab-liquid-drop-2" cx="200" cy="70" r="3" fill="rgb(236, 72, 153)" opacity="0.55" />
      </svg>
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 lab-chip text-black/35">↓ Continue sequence</p>
    </div>
  );
}

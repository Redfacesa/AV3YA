'use client';

import { AV3YA_SOCIAL } from '@/lib/social';

export default function InspirationPage() {
  const placeholders = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="pt-24 pb-16 bg-black min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 mb-10">
        <p className="text-av3ya-neon text-xs tracking-[0.35em] uppercase mb-3">Characters</p>
        <h1 className="font-display text-5xl sm:text-6xl text-white mb-4">AV3YA WORLD</h1>
        <p className="text-white/50 text-sm max-w-lg">
          The faces, moods, and energy behind the Syndicate. Anime-inspired looks from the AV3YA universe.
        </p>
        <a href={AV3YA_SOCIAL.email} className="inline-block mt-6 text-xs tracking-[0.2em] uppercase text-white/50 hover:text-av3ya-neon transition-colors">
          av3ya.inc@gmail.com
        </a>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        {placeholders.map((i) => (
          <div
            key={i}
            className="break-inside-avoid mb-3 aspect-[3/4] border border-white/10 bg-zinc-950 flex items-center justify-center"
          >
            <span className="font-display text-2xl text-white/15">AV3YA</span>
          </div>
        ))}
      </div>
    </div>
  );
}

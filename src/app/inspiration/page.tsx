'use client';

import Image from 'next/image';
import { AV3YA_SOCIAL } from '@/lib/social';
import { LAB_ARCHIVE } from '@/lib/lab-media';

export default function InspirationPage() {
  const archive = LAB_ARCHIVE;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 mb-10">
        <p className="text-black/45 text-xs tracking-[0.35em] uppercase mb-3 font-mono">Archive</p>
        <h1 className="font-display text-5xl sm:text-6xl text-black mb-4">AV3YA WORLD</h1>
        <p className="text-black/50 text-sm max-w-lg">
          Specimens from the lab — cobalt, origin white, and magenta syndicate cuts.
        </p>
        <a href={AV3YA_SOCIAL.email} className="inline-block mt-6 text-xs tracking-[0.2em] uppercase text-black/50 hover:text-black transition-colors">
          av3ya.inc@gmail.com
        </a>
      </div>

      <div className="columns-2 md:columns-3 gap-3 px-4 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">
        {archive.map((src) => {
          const wide = src.includes('group.jpg') || src.includes('duo.jpg');
          return (
          <div key={src} className={`break-inside-avoid mb-3 relative border border-black/10 overflow-hidden bg-neutral-100 ${wide ? 'aspect-[3/2]' : 'aspect-[2/3]'}`}>
            <Image src={src} alt="AV3YA Labs archive" fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
          </div>
          );
        })}
      </div>
    </div>
  );
}

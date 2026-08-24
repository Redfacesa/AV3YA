'use client';

import { Instagram, Facebook, Mail } from 'lucide-react';
import { AV3YA_SOCIAL, AV3YA_SOCIAL_LINKS } from '@/lib/social';

export default function InspirationPage() {
  const placeholders = Array.from({ length: 12 }, (_, i) => i);
  const primarySocial = AV3YA_SOCIAL_LINKS[0];

  return (
    <div className="pt-24 pb-16">
      <div className="section-padding mb-8">
        <h1 className="font-display text-4xl mb-2">Fashion Inspiration</h1>
        <p className="text-white/50 mb-6">Seasonal outfits, trending looks, and AV3YA Syndicate energy</p>
        <div className="flex flex-wrap gap-3">
          {AV3YA_SOCIAL_LINKS.map((link) => {
            const Icon = link.id === 'instagram' ? Instagram : Facebook;
            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:border-av3ya-neon/40 transition-colors"
              >
                <Icon size={16} className="text-av3ya-neon" />
                Follow on {link.label}
              </a>
            );
          })}
          <a
            href={AV3YA_SOCIAL.email}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:border-av3ya-neon/40 transition-colors"
          >
            <Mail size={16} className="text-av3ya-neon" />
            av3ya.inc@gmail.com
          </a>
        </div>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 section-padding">
        {placeholders.map((i) => (
          <div
            key={i}
            className="break-inside-avoid mb-4 rounded-2xl overflow-hidden glass aspect-[3/4] flex items-center justify-center text-white/20"
          >
            <span className="text-4xl">✨</span>
          </div>
        ))}
      </div>
      {primarySocial ? (
        <p className="text-center text-white/30 text-sm mt-8">
          More looks on{' '}
          <a
            href={primarySocial.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-av3ya-neon hover:text-white transition-colors"
          >
            {primarySocial.handle}
          </a>
        </p>
      ) : (
        <p className="text-center text-white/30 text-sm mt-8">
          Follow AV3YA for drops and lookbooks. Instagram link coming soon.
        </p>
      )}
    </div>
  );
}

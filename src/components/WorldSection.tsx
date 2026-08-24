'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Av3yaEnterButton from '@/components/Av3yaEnterButton';
import { isDirectVideoFile, resolveVideoEmbedUrl } from '@/lib/site-content';

type Props = {
  videoUrl?: string | null;
};

export default function WorldSection({ videoUrl }: Props) {
  const embed = resolveVideoEmbedUrl(videoUrl);
  const direct = embed && isDirectVideoFile(embed);

  return (
    <section id="world" className="bg-black border-t border-white/10 py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-none mb-6">
            THIS IS
            <br />
            AV3YA
          </h2>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed max-w-md mb-8">
            More than clothing. A feeling when you put something on and carry yourself differently. When someone asks
            where you got that. When you know you are not wearing what everyone else is wearing.
          </p>
          <Av3yaEnterButton href="/#story" label="DISCOVER OUR WORLD" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-black"
        >
          {embed ? (
            direct ? (
              <video src={embed} controls className="w-full h-full object-cover" playsInline />
            ) : (
              <iframe
                src={embed}
                title="AV3YA world intro"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )
          ) : (
            <Link
              href="/#story"
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-950 via-black to-av3ya-neon/10 group"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,45,149,0.15),transparent_55%)]" />
              <span className="relative w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center text-white text-xl pl-1 group-hover:border-av3ya-neon transition-colors">
                ▶
              </span>
              <span className="relative text-xs tracking-[0.3em] uppercase text-white/55">
                Add video in Admin → Storefront
              </span>
            </Link>
          )}
          <div className="absolute bottom-4 left-4 text-[10px] text-white/35 tracking-widest pointer-events-none">
            26.2041° S · 28.0473° E
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section id="story" className="bg-black border-t border-white/10 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
        <p className="text-av3ya-neon text-xs tracking-[0.35em] uppercase mb-4">About AV3YA</p>
        <h2 className="font-display text-3xl sm:text-4xl text-white mb-8 leading-tight">
          Don&apos;t just wear the culture. Experience it.
        </h2>
        <div className="space-y-5 text-white/60 text-sm sm:text-base leading-relaxed">
          <p>
            AV3YA was created from a simple idea: clothing should be more than something you wear. It should be
            something you experience.
          </p>
          <p>
            Streetwear had become too predictable. We built AV3YA to challenge the ordinary. You should not dress to fit
            into a crowd. You should dress to stand apart from it.
          </p>
          <p>
            AV3YA is for the people who create their own lane. Who see fashion as a canvas rather than a uniform.
            Different by design. Unapologetically original. Made to be experienced.
          </p>
        </div>
      </div>
    </section>
  );
}

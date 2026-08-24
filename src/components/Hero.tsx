'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Av3yaEnterButton from '@/components/Av3yaEnterButton';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src="/brand/hero-main.png"
          alt="AV3YA neon city streetwear"
          fill
          priority
          className="object-cover object-center scale-[1.02]"
          sizes="100vw"
        />
        {/* Lighter overlays so the hero art reads clearly */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,45,149,0.22),transparent_55%)]" />
        <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <span className="vertical-scroll hidden lg:block text-av3ya-neon/50" aria-hidden>
        SCROLL
      </span>

      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-16 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <p className="text-av3ya-neon text-sm sm:text-base font-display tracking-[0.35em] uppercase mb-3 anime-glow-text">
            One of a kind
          </p>
          <p className="text-av3ya-pink/70 text-xs tracking-[0.25em] mb-6">ユニークなもの</p>

          <h1 className="font-display text-[clamp(3.5rem,12vw,7rem)] leading-[0.9] tracking-tight text-white mb-6 drop-shadow-[0_0_30px_rgba(255,45,149,0.25)]">
            AV3YA
          </h1>

          <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-md mb-10">
            A brand for the outcasts, the originals, the ones who create their own path. Different by design.
            Unapologetically original.
          </p>

          <Av3yaEnterButton href="/shop" label="ENTER AV3YA" />
        </motion.div>
      </div>
    </section>
  );
}

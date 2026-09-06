'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Av3yaEnterButton from '@/components/Av3yaEnterButton';

type Props = {
  experiments?: number;
  specimens?: number;
  testing?: number;
};

export default function Hero({ experiments = 3, specimens = 27, testing = 5 }: Props) {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src="/brand/hero-main.jpg"
          alt="AV3YA Syndicate streetwear"
          fill
          priority
          className="object-cover object-center scale-[1.02]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <span className="vertical-scroll hidden lg:block" aria-hidden>
        SCROLL
      </span>

      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-16 lg:pb-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <p className="text-white/70 text-sm sm:text-base font-display tracking-[0.35em] uppercase mb-3">
              Welcome to AV3YA Labs
            </p>
            <h1 className="font-display text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.92] tracking-tight text-white mb-4">
              THE FUTURE IS CURRENTLY UNDER DEVELOPMENT.
            </h1>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-md mb-10">
              Clinical streetwear. Experiments in fabric, silhouette, and identity.
            </p>
            <Av3yaEnterButton href="/shop" label="ENTER THE LAB" />
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-full max-w-sm border border-white/20 bg-white/95 text-black p-5 backdrop-blur-sm"
          >
            <p className="lab-chip text-black/45 mb-3">Lab access terminal</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs tracking-[0.2em] uppercase text-black/50">Status</span>
              <span className="lab-chip text-av3ya-active">● Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-[0.2em] uppercase text-black/50">Clearance</span>
              <span className="lab-chip">Lvl 3+ only</span>
            </div>
          </motion.aside>
        </div>

        <div className="mt-12 grid grid-cols-3 border-t border-white/20 pt-5 font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-white/80">
          <p>Experiments: {String(experiments).padStart(2, '0')}</p>
          <p className="text-center">Specimens: {String(specimens).padStart(2, '0')}</p>
          <p className="text-right text-av3ya-testing">Testing: {String(testing).padStart(2, '0')}</p>
        </div>
      </div>
    </section>
  );
}

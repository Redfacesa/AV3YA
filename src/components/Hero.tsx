'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Av3yaLogo from '@/components/Av3yaLogo';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/brand/hero-main.png"
          alt=""
          fill
          priority
          className="object-cover object-center scale-105 opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-av3ya-black via-av3ya-dark/95 to-av3ya-purple/30" />
        <div className="absolute inset-0 bg-av3ya-grid bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-av3ya-black via-transparent to-av3ya-purple/10" />
      </div>

      <div className="relative section-padding w-full pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <Av3yaLogo variant="full" animated className="mb-6 mx-auto lg:mx-0" priority />

            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-av3ya-pink mb-6 shadow-neon-sm">
              <Sparkles size={14} />
              AV3YA Syndicate · one of a kind
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-tight mb-6 text-balance">
              Don&apos;t just wear
              <br />
              <span className="text-av3ya-neon anime-glow-text">the culture.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/65 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Experience it. Anime energy, neon streetwear, and pieces built to make people stop, look twice, and feel
              something.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop" className="btn-primary text-lg">
                Shop the drop
                <ArrowRight size={20} />
              </Link>
              <Link href="#story" className="btn-secondary text-lg">
                Our story
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] border border-av3ya-neon/30 bg-gradient-to-b from-av3ya-neon/10 to-av3ya-purple/5 shadow-neon-sm" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10">
                <Image
                  src="/products/syndicate-pink-black.png"
                  alt="AV3YA Syndicate tracksuit in neon pink"
                  width={800}
                  height={900}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-center text-xs text-white/40 mt-3 tracking-[0.18em] uppercase">
                Different by design
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

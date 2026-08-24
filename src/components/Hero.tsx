'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import FashionSpinAnimation from '@/components/FashionSpinAnimation';
import Av3yaLogo from '@/components/Av3yaLogo';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 opacity-40"
          style={{ backgroundImage: 'url(/hero-store.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-av3ya-black via-av3ya-dark/95 to-av3ya-purple/20" />
        <div className="absolute inset-0 bg-av3ya-grid bg-grid opacity-40" />
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
              Anime streetwear · neon energy
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-tight mb-6 text-balance">
              Wear the
              <br />
              <span className="text-av3ya-neon anime-glow-text">Voltage</span>
            </h1>

            <p className="text-base sm:text-lg text-white/65 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Limited drops, bold prints, and instant checkout with RedFace Pay. Built for fans who live in colour.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop" className="btn-primary text-lg">
                Shop Now
                <ArrowRight size={20} />
              </Link>
              <Link href="/tailoring" className="btn-secondary text-lg">
                Tailoring POS
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
              <FashionSpinAnimation priority showGlow className="px-2" />
              <p className="text-center text-xs text-white/35 mt-2 tracking-wide uppercase">
                360° look · hover to pause
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-av3ya-gold rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

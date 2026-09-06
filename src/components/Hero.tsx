'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import LabTurnAnimation from '@/components/LabTurnAnimation';
import LabChemistryLines from '@/components/LabChemistryLines';

type Props = {
  experiments?: number;
  specimens?: number;
  testing?: number;
};

export default function Hero({ experiments = 3, specimens = 27, testing = 5 }: Props) {
  const exp = String(experiments).padStart(2, '0');
  const spec = String(specimens).padStart(2, '0');
  const test = String(testing).padStart(2, '0');

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-white">
      <div className="absolute inset-0">
        <LabTurnAnimation />
        <div className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-white/75 via-white/25 to-transparent pointer-events-none" />
        <LabChemistryLines tone="hero" className="opacity-80" />
      </div>

      <div
        className="absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 text-[9px] tracking-[0.35em] uppercase text-black/45 z-10"
        aria-hidden
      >
        <span className="h-8 w-px bg-black/20" />
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Scroll to explore</span>
        <span className="h-8 w-px bg-black/20" />
      </div>

      <div className="relative flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-8 flex flex-col justify-end">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <p className="text-black/70 text-sm sm:text-base font-medium tracking-[0.18em] uppercase mb-2">
              Welcome to
            </p>
            <h1 className="font-display text-[clamp(3.2rem,10vw,7rem)] leading-[0.86] tracking-tight text-black mb-4">
              AV3YA LABS
            </h1>
            <p className="text-black text-sm sm:text-base font-medium tracking-[0.04em] uppercase mb-8 max-w-md">
              The future is currently under development.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-black text-white px-6 py-3.5 text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase hover:bg-neutral-800 transition-colors"
            >
              <span aria-hidden>&gt;</span>
              Enter lab
              <span aria-hidden>→</span>
            </Link>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="w-full max-w-[280px] border border-black/10 bg-white/80 backdrop-blur-md p-5 shadow-sm"
          >
            <p className="lab-chip text-black mb-4">Lab access terminal &gt;</p>
            <dl className="space-y-3 font-mono text-[10px] tracking-[0.16em] uppercase">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-black/40">Subject</dt>
                <dd>AV3YA</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-black/40">Status</dt>
                <dd className="text-av3ya-active font-medium">● Active</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-black/40">Clearance</dt>
                <dd>Lvl 3+ only</dd>
              </div>
            </dl>
            <svg className="mt-5 w-full h-10 text-black" viewBox="0 0 220 40" aria-hidden>
              {Array.from({ length: 48 }).map((_, i) => (
                <rect
                  key={i}
                  x={i * 4.6}
                  y={4}
                  width={i % 5 === 0 ? 2.4 : 1.2}
                  height={i % 7 === 0 ? 32 : 24}
                  fill="currentColor"
                />
              ))}
            </svg>
          </motion.aside>
        </div>

        <div className="mt-10 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 border border-black/10 bg-white/85 backdrop-blur-md">
          <div className="px-4 py-4 border-r border-b lg:border-b-0 border-black/10">
            <p className="lab-chip text-black/40 mb-1">Experiments</p>
            <p className="font-mono text-sm tracking-[0.12em] uppercase">
              {exp} <span className="text-av3ya-active">Active</span>
            </p>
          </div>
          <div className="px-4 py-4 border-b lg:border-b-0 lg:border-r border-black/10">
            <p className="lab-chip text-black/40 mb-1">Specimens</p>
            <p className="font-mono text-sm tracking-[0.12em] uppercase">{spec} Available</p>
          </div>
          <div className="px-4 py-4 border-r border-black/10">
            <p className="lab-chip text-black/40 mb-1">Testing</p>
            <p className="font-mono text-sm tracking-[0.12em] uppercase">
              {test} <span className="text-av3ya-testing">Ongoing</span>
            </p>
          </div>
          <div className="px-4 py-4 flex items-center justify-between gap-3">
            <div>
              <p className="lab-chip text-black/40 mb-1">Classified</p>
              <p className="font-mono text-sm tracking-[0.12em] uppercase">Top secret</p>
            </div>
            <Lock size={16} className="text-black/50 shrink-0" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

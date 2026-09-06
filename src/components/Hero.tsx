'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LabTurnAnimation from '@/components/LabTurnAnimation';
import LabChemistryLines from '@/components/LabChemistryLines';
import { LAB_COLORWAYS } from '@/lib/lab-media';

type Props = {
  experiments?: number;
  specimens?: number;
  testing?: number;
};

export default function Hero({ experiments = 3, specimens = 27, testing = 5 }: Props) {
  return (
    <section className="relative min-h-[calc(100svh-4rem)] bg-white overflow-hidden">
      <LabChemistryLines tone="hero" className="opacity-40" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-6 lg:pt-28">
        <div className="grid lg:grid-cols-2 min-h-[70vh] border border-black/10">
          {/* Screen 1 — welcome / shop */}
          <div className="relative flex flex-col justify-between p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-black/10 bg-white/80">
            <p className="lab-chip text-black/40">Screen 01 · Access</p>
            <div className="py-10">
              <p className="text-sm tracking-[0.2em] uppercase text-black/50 mb-3">Welcome to</p>
              <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.85] mb-4">AV3YA LABS</h1>
              <p className="text-sm uppercase tracking-[0.08em] text-black/70 max-w-sm mb-8">
                The future is currently under development.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/shop" className="btn-primary">
                  Shop now
                </Link>
                <Link href="/shop" className="btn-secondary">
                  Select your product
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {LAB_COLORWAYS.map((look) => (
                  <Link
                    key={look.id}
                    href="/shop"
                    className="lab-chip border border-black/15 px-3 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    {look.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.16em] uppercase text-black/40">
              <span>Experiments {String(experiments).padStart(2, '0')}</span>
              <span>Specimens {String(specimens).padStart(2, '0')}</span>
              <span>Testing {String(testing).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Screen 2 — small looping chamber */}
          <div className="relative flex flex-col bg-[#f3f5f7] p-5 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <p className="lab-chip text-black/40">Screen 02 · Live viewport</p>
              <span className="lab-chip text-av3ya-active">● Recording</span>
            </div>

            <div className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-black text-white">
              <ArrowRight size={18} />
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-[380px]">
                <div className="lab-viewport-glow absolute -inset-3 rounded-sm pointer-events-none" />
                <div className="relative border border-black/20 bg-white aspect-[4/3] overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-sky-400/70 via-white to-pink-400/60" />
                  <div className="absolute inset-2">
                    <LabTurnAnimation className="h-full w-full" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between lab-chip text-black/40">
                    <span>Turntable</span>
                    <span>GIF · Loop</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-between font-mono text-[9px] tracking-[0.2em] uppercase text-black/35">
                  <span>Do not upscale</span>
                  <span>Native specimen feed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

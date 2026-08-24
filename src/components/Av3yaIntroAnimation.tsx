'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Av3yaLogo from '@/components/Av3yaLogo';
import { FASHION_ANIMATION_FRAMES } from '@/components/FashionSpinAnimation';

/** Splash / loader — pangolin logo pulse + outfit spin preview */
export default function Av3yaIntroAnimation({ onDone }: { onDone?: () => void }) {
  const [frame, setFrame] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const spin = window.setInterval(() => {
      setFrame((f) => (f + 1) % FASHION_ANIMATION_FRAMES.length);
    }, 140);
    const hide = window.setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 2800);
    return () => {
      window.clearInterval(spin);
      window.clearTimeout(hide);
    };
  }, [onDone]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-av3ya-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.3, duration: 0.5 }}
    >
      <motion.div
        animate={{ scale: [1, 1.04, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="mb-8"
      >
        <Av3yaLogo variant="full-stacked" animated />
      </motion.div>

      <div className="relative w-48 h-64">
        <Image
          src={FASHION_ANIMATION_FRAMES[frame]}
          alt=""
          fill
          priority
          className="object-contain object-bottom"
        />
      </div>

      <p className="mt-6 text-xs tracking-[0.3em] uppercase text-av3ya-neon/70">Loading collection</p>
    </motion.div>
  );
}

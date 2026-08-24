'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type Variant = 'icon' | 'full' | 'full-stacked';

type Props = {
  variant?: Variant;
  className?: string;
  href?: string;
  animated?: boolean;
};

function LogoMark({ variant }: { variant: Variant }) {
  const compact = variant === 'icon';
  return (
    <span
      className={`inline-flex items-center font-display font-bold tracking-[0.18em] uppercase ${
        compact ? 'text-lg' : variant === 'full-stacked' ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'
      }`}
    >
      <span className="text-av3ya-neon anime-glow-text">AV</span>
      <span className="text-av3ya-purple anime-glow-text">3</span>
      <span className="text-av3ya-pink anime-glow-text">YA</span>
    </span>
  );
}

export default function Av3yaLogo({
  variant = 'icon',
  className = '',
  href = '/',
  animated = false,
}: Props) {
  const content = animated ? (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      <LogoMark variant={variant} />
    </motion.div>
  ) : (
    <span className={className}>
      <LogoMark variant={variant} />
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex items-center shrink-0" aria-label="AV3YA home">
      {content}
    </Link>
  );
}

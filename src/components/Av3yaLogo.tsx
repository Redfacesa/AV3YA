'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Variant = 'icon' | 'full' | 'full-stacked';

type Props = {
  variant?: Variant;
  className?: string;
  href?: string;
  animated?: boolean;
  priority?: boolean;
};

const SIZES: Record<Variant, { width: number; height: number; className: string }> = {
  icon: { width: 120, height: 40, className: 'h-9 w-auto lg:h-10' },
  full: { width: 180, height: 56, className: 'h-10 lg:h-12 w-auto' },
  'full-stacked': { width: 240, height: 96, className: 'h-20 lg:h-24 w-auto' },
};

export default function Av3yaLogo({
  variant = 'icon',
  className = '',
  href = '/',
  animated = false,
  priority = false,
}: Props) {
  const size = SIZES[variant];
  const img = (
    <Image
      src="/brand/logo.png"
      alt="AV3YA"
      width={size.width}
      height={size.height}
      priority={priority}
      className={`object-contain ${size.className}`}
    />
  );

  const content = animated ? (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {img}
    </motion.div>
  ) : (
    <span className={className}>{img}</span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex items-center shrink-0" aria-label="AV3YA home">
      {content}
    </Link>
  );
}

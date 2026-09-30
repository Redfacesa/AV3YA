'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LAB_TURN_FRAMES } from '@/lib/lab-media';

type Props = {
  className?: string;
  intervalMs?: number;
  alt?: string;
};

export default function LabTurnAnimation({
  className = '',
  intervalMs = 280,
  alt = 'AV3YA Labs specimen turntable',
}: Props) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % LAB_TURN_FRAMES.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return (
    <div className={`relative ${className}`} role="img" aria-label={alt}>
      {LAB_TURN_FRAMES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="(max-width: 1024px) 70vw, 420px"
          className={`object-cover object-top transition-opacity duration-100 ${
            i === frame ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}

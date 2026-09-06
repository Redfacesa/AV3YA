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
  intervalMs = 240,
  alt = 'AV3YA Labs specimen turntable',
}: Props) {
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % LAB_TURN_FRAMES.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, paused]);

  return (
    <div
      className={`absolute inset-0 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="img"
      aria-label={alt}
    >
      {LAB_TURN_FRAMES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-75 ${
            i === frame ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}

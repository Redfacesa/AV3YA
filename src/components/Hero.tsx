'use client';

import { useCallback, useEffect, useRef } from 'react';

const HERO_SRC = '/brand/hero.mp4';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const play = video.play();
    if (play) void play.catch(() => undefined);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (!coarse) tryPlay();

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && !coarse) tryPlay();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [tryPlay]);

  return (
    <section className="relative h-[100svh] min-h-[32rem] w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover cursor-pointer"
        src={HERO_SRC}
        playsInline
        muted
        loop
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        aria-label="AV3YA Labs film"
        onClick={tryPlay}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/25" />
    </section>
  );
}

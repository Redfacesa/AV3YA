'use client';

import { useCallback, useEffect, useRef } from 'react';

const HERO_SRC = '/brand/hero.mp4';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const play = video.play();
    if (play) void play.catch(() => undefined);
  }, []);

  useEffect(() => {
    tryPlay();
    const video = videoRef.current;
    if (!video) return;

    const kick = () => tryPlay();
    video.addEventListener('loadeddata', kick);
    video.addEventListener('canplay', kick);
    const onVisibility = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      video.removeEventListener('loadeddata', kick);
      video.removeEventListener('canplay', kick);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [tryPlay]);

  return (
    <section className="relative h-[100svh] min-h-[32rem] w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        aria-label="AV3YA Labs film"
        onClick={tryPlay}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
    </section>
  );
}

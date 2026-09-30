'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const HERO_SRC = '/brand/hero.mp4';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    if (video.paused) {
      const play = video.play();
      if (play) void play.catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      if (video.readyState >= 3) setReady(true);
      tryPlay();
    };

    video.addEventListener('loadeddata', onReady);
    video.addEventListener('canplaythrough', onReady);
    const onPlaying = () => {
      if (video.readyState >= 3) setReady(true);
    };
    video.addEventListener('playing', onPlaying);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };
    document.addEventListener('visibilitychange', onVisibility);

    tryPlay();

    return () => {
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplaythrough', onReady);
      video.removeEventListener('playing', onPlaying);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [tryPlay]);

  return (
    <section className="relative h-[100svh] min-h-[32rem] w-full overflow-hidden bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/hero-poster.jpg?v=new1"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        src={`${HERO_SRC}?v=new1`}
        poster="/brand/hero-poster.jpg?v=new1"
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
    </section>
  );
}

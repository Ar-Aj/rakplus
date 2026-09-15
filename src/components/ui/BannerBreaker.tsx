"use client";

import { useEffect, useRef } from "react";

interface BannerBreakerProps {
  className?: string;
  src?: string;
}

/**
 * BannerBreaker — Precision Full-Width Video Banner (Line Breaker)
 *
 * Plays 21:9 ultra-wide video continuously at 1.5x speed.
 * Uses `w-full h-auto block` for strict zero-cropping preservation of the 21:9 aspect ratio.
 */
export default function BannerBreaker({
  className = "",
  src = "/videos/banner/sustainability banner.mp4",
}: BannerBreakerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden relative z-20 bg-neutral-950 ${className}`}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-[150px] md:h-[200px] lg:h-[250px] object-cover object-center block"
      />
    </div>
  );
}

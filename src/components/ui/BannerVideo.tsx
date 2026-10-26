"use client";

/**
 * BannerVideo — Loading-locked video player used for the
 * Contact-page hero banner.
 *
 * Renders the supplied poster image as an absolute fallback that
 * fades out only once the underlying <video> has buffered at least
 * 40 % of its duration (or the canplay event fires). This
 * eliminates the dreaded white flash on first paint.
 *
 * Props:
 *   • className — passes through to the rendered media.
 *   • src       — video URL.
 *   • poster    — cover image URL (shown until video is ready).
 *
 * Pure-React. Zero external state libraries. No GSAP, no canvas,
 * zero impact on the locked scroll/canvas engine.
 */

import { useEffect, useRef, useState } from "react";

export interface BannerVideoProps {
  className?: string;
  src: string;
  poster: string;
  /** Intrinsic poster dimensions, so the browser reserves the hero's box
      before the multi-MB MP4 starts loading (CLS = 0). Each banner ships a
      different aspect ratio (21:9 desktop / 3:4 tablet / 9:16 mobile), so
      the caller passes the real pixel size of its own poster. Rendered size
      is still container-driven via w-full h-full object-cover. */
  posterWidth?: number;
  posterHeight?: number;
}

export default function BannerVideo({
  className,
  src,
  poster,
  posterWidth = 1920,
  posterHeight = 1080,
}: BannerVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Already enough data buffered (e.g. navigated back to page)
    if (el.readyState >= 3 && el.buffered.length > 0) {
      const duration = el.duration || 0;
      const end = el.buffered.end(el.buffered.length - 1);
      if (duration > 0 && end / duration >= 0.4) {
        setIsReady(true);
        return;
      }
    }

    const checkBuffer = () => {
      const duration = el.duration || 0;
      if (duration > 0 && el.buffered.length > 0) {
        const end = el.buffered.end(el.buffered.length - 1);
        if (end / duration >= 0.4) {
          setIsReady(true);
          return true;
        }
      }
      return false;
    };

    const onProgress = () => {
      if (checkBuffer()) {
        el.removeEventListener("progress", onProgress);
        el.removeEventListener("canplay", onCanPlay);
      }
    };

    const onCanPlay = () => {
      if (checkBuffer() || el.readyState >= 3) {
        setIsReady(true);
      }
    };

    el.addEventListener("progress", onProgress);
    el.addEventListener("canplay", onCanPlay);
    el.addEventListener("canplaythrough", onCanPlay);

    const fallback = window.setTimeout(() => {
      if (!isReady) setIsReady(true);
    }, 6000);

    return () => {
      el.removeEventListener("progress", onProgress);
      el.removeEventListener("canplay", onCanPlay);
      el.removeEventListener("canplaythrough", onCanPlay);
      window.clearTimeout(fallback);
    };
  }, [isReady, src]);

  return (
    <>
      {/* Poster cover — always rendered as fallback, fades out only
          when the video is ready. */}
      {!isReady && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          // Explicit intrinsic dimensions + async decode so the hero poster
          // reserves its box BEFORE the multi-MB MP4 begins loading. Without
          // these the poster paints at 0×0 and the whole hero shifts — a
          // Cumulative Layout Shift on the most expensive page.
          width={posterWidth}
          height={posterHeight}
          decoding="async"
          className={`${className ?? ""} absolute inset-0 w-full h-full object-cover`}
        />
      )}
      <video
        ref={videoRef}
        className={`${className ?? ""} w-full h-full object-cover`}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        // "metadata" (not "auto") — these banners are 7–18 MB each. With
        // preload="auto" the browser queues the FULL file before first paint,
        // starving LCP on mobile data. "metadata" fetches only enough to
        // learn duration/dimensions; playback then streams progressively
        // behind the poster image, which is already sized so nothing shifts.
        preload="metadata"
        style={{
          opacity: isReady ? 1 : 0,
          transition: "opacity 600ms ease-out",
        }}
      />
    </>
  );
}
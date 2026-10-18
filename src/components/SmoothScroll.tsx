"use client";

/**
 * SmoothScroll — Lenis smooth scrolling wrapper.
 *
 * Hijacks the native browser scrollbar to deliver a heavy, luxurious,
 * Apple-style scroll feel. Wraps the entire app via layout.tsx.
 *
 * Uses the modern `lenis/react` package (formerly @studio-freight/react-lenis).
 *
 * HOTFIX (Phase 40 Issue #07): Added Lenis ↔ GSAP ScrollTrigger RAF sync.
 *   - lenis.on('scroll', ScrollTrigger.update) keeps ST progress values accurate.
 *   - gsap.ticker drives lenis.raf() so both systems share ONE animation loop.
 *   - gsap.ticker.lagSmoothing(0) prevents GSAP from skipping frames during
 *     tab-switch catch-up, which can cause Lenis to jump position.
 */

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

// ─── Inner sync component — runs inside ReactLenis context ───────────────────
function LenisGSAPSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // 1. Keep ScrollTrigger progress values in sync on every Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Drive Lenis RAF via GSAP ticker so both share ONE animation loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
    };
    gsap.ticker.add(tickerCallback);

    // 3. Prevent GSAP from overcorrecting after tab-switch (Lenis position jump)
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerCallback);
    };
  }, [lenis]);

  return null;
}

// ─── Root wrapper ─────────────────────────────────────────────────────────────
export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,          // Low lerp = heavier, more luxurious scroll feel
        duration: 1.4,        // Smooth scroll duration
        smoothWheel: true,    // Smooth mousewheel scrolling
        wheelMultiplier: 0.8, // Slightly slower wheel = more cinematic
        touchMultiplier: 1.5, // Faster touch for mobile responsiveness
        autoRaf: false,       // ← CRITICAL: disable Lenis's own RAF loop.
                              //   GSAP ticker now drives it via tickerCallback.
      }}
    >
      <LenisGSAPSync />
      {children}
    </ReactLenis>
  );
}

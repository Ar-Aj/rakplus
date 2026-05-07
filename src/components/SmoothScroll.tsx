"use client";

/**
 * SmoothScroll — Lenis smooth scrolling wrapper.
 *
 * Hijacks the native browser scrollbar to deliver a heavy, luxurious,
 * Apple-style scroll feel. Wraps the entire app via layout.tsx.
 *
 * Uses the modern `lenis/react` package (formerly @studio-freight/react-lenis).
 */

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

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
      }}
    >
      {children}
    </ReactLenis>
  );
}

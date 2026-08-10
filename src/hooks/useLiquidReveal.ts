"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useLiquidReveal — Phase 25.0 Hydro-Kinetic GSAP Text Reveal
 *
 * Replaces standard fade-ins with a relentless, fluid wave effect.
 * Instead of opacity fading, a CSS mask combined with an SVG displacement
 * filter washes over the heavy pitch-black headings.
 *
 * Targets `.hud-liquid-reveal`.
 */
export function useLiquidReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // ── 1. Heading Physics: Heavy, dramatic, tied to scroll scrub ──
      container.querySelectorAll(".gsap-liquid-heading, .hud-liquid-reveal").forEach((el) => {
        gsap.set(el, {
          "--liquid-progress": "0%",
          WebkitMaskImage: "linear-gradient(to right, black var(--liquid-progress), transparent calc(var(--liquid-progress) + 15%))",
          maskImage: "linear-gradient(to right, black var(--liquid-progress), transparent calc(var(--liquid-progress) + 15%))",
        });

        gsap.to(el, {
          "--liquid-progress": "115%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 1.2,
          },
        });
      });

      // ── 2. Description Physics: Faster, decoupled from slow scrub ──
      container.querySelectorAll(".gsap-liquid-body").forEach((el) => {
        gsap.set(el, {
          "--liquid-progress": "0%",
          WebkitMaskImage: "linear-gradient(to right, black var(--liquid-progress), transparent calc(var(--liquid-progress) + 15%))",
          maskImage: "linear-gradient(to right, black var(--liquid-progress), transparent calc(var(--liquid-progress) + 15%))",
        });

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.to(el, {
              "--liquid-progress": "115%",
              duration: 0.8,
              ease: "power2.out",
            });
          },
          once: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}

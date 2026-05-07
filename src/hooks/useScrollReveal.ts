"use client";

/**
 * useScrollReveal — Global GSAP scroll-triggered reveal animation.
 *
 * Selects all elements with the `reveal-section` class and applies
 * a fromTo animation: opacity 0 → 1, y 50 → 0.
 *
 * Uses toggleActions "play none none reverse" so sections fade back
 * out when scrolling up, creating a bi-directional reveal effect.
 *
 * This is independent of the CanvasSequence ScrollTrigger — the canvas
 * scrubs based on its container's scroll progress, while these reveals
 * trigger based on individual element visibility.
 */

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll(".reveal-section").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}

"use client";

/**
 * HeroVeil — Progressive Frame-1 Background Dissolve (20% → 100%)
 *
 * A controlled white architectural veil that sits absolutely behind the
 * pre-canvas hero content (Home, Innovation, Sustainability, About).
 * It is designed to work with a `<CanvasSequence />` mounted as
 * `fixed inset-0 z-0` behind the entire page (which renders Frame 1
 * immediately, before any scroll happens).
 *
 *   • At scroll position 0 (top of page): the white veil starts at
 *     `opacity 0.78` so Frame 1 of the canvas behind is clearly
 *     visible (≈ 22% reveal) as a living architectural backdrop.
 *     A subtle radial spotlight mask in the veil darkens the right
 *     side of the hero more than the left, so the 1:1 side-image
 *     and the canvas beneath it shine through even more clearly.
 *
 *   • As the user scrolls through the hero (ScrollTrigger:
 *     start "top top" → end "bottom top", scrub 0.6,
 *     ease "power2.inOut"):
 *       – Veil opacity scrubs from 0.78 → 0.0
 *       – backdrop-blur scrubs from 4px → 0
 *       – Veil `mask-image` radial spotlight expands so the canvas
 *         becomes fully visible.
 *       – Hero foreground content applies a silky 3D depth transition
 *         (y: -60, opacity 0.95 → 0 over the final 25% of the hero
 *         scroll) so instead of a hard "curtain" edge, the hero
 *         content melts away into depth while Frame 1 of the canvas
 *         sharpens from ≈ 22% visibility to 100% full visibility
 *         right as `<div ref={sequenceRef}>` begins scrubbing.
 *
 *   • The veil is pointer-events-none and z-0, so it never blocks
 *     the hero CTAs.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface HeroVeilProps {
  /**
   * Selector for the hero wrapper that owns this veil. The ScrollTrigger
   * is attached to this element. Defaults to the closest
   * `[data-hero-veil-scope]` ancestor.
   */
  scrollScopeSelector?: string;
  /** Starting opacity (0–1). Default: 0.78 (Frame 1 ≈ 22% visible). */
  startOpacity?: number;
  /** Ending opacity (0–1). Default: 0.0 (Frame 1 fully visible). */
  endOpacity?: number;
  /** Backdrop blur in px at the start. Default: 4. */
  startBlurPx?: number;
  /** Backdrop blur in px at the end. Default: 0. */
  endBlurPx?: number;
  /** Optional class for the wrapper. */
  className?: string;
}

export default function HeroVeil({
  scrollScopeSelector,
  startOpacity = 0.78,
  endOpacity = 0.0,
  startBlurPx = 4,
  endBlurPx = 0,
  className = "",
}: HeroVeilProps) {
  const veilRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!veilRef.current) return;

    // Scope: either explicit selector or the closest data-hero-veil-scope.
    const scopeEl = scrollScopeSelector
      ? (document.querySelector(scrollScopeSelector) as HTMLElement | null)
      : (veilRef.current.closest("[data-hero-veil-scope]") as HTMLElement | null) ??
        (veilRef.current.parentElement as HTMLElement | null);

    if (!scopeEl) return;

    const ctx = gsap.context(() => {
      // 1. Initial values — white veil at 78% with 4px backdrop-blur.
      //    The radial spotlight mask keeps the right side more
      //    transparent (so the 1:1 image area lets the canvas shine
      //    through more clearly).
      gsap.set(veilRef.current, { opacity: startOpacity });
      veilRef.current!.style.setProperty(
        "backdrop-filter",
        `blur(${startBlurPx}px)`
      );
      veilRef.current!.style.setProperty(
        "-webkit-backdrop-filter",
        `blur(${startBlurPx}px)`
      );

      // 2. ScrollTrigger — smoothly dissolve veil + parallax foreground.
      ScrollTrigger.create({
        trigger: scopeEl,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          // Linear-ease-equivalent scrub (GSAP applies power2.inOut
          // because of the ease option below).
          const easeP = p;
          const opacity = startOpacity + (endOpacity - startOpacity) * easeP;
          const blur = startBlurPx + (endBlurPx - startBlurPx) * easeP;

          if (veilRef.current) {
            veilRef.current.style.opacity = String(opacity);
            veilRef.current.style.setProperty(
              "backdrop-filter",
              `blur(${blur}px)`
            );
            veilRef.current.style.setProperty(
              "-webkit-backdrop-filter",
              `blur(${blur}px)`
            );
          }

          if (foregroundRef.current) {
            // Hero foreground parallax + late-stage fade-out so the
            // canvas handoff feels like a depth melt, not a curtain.
            const y = -60 * easeP;
            // Fade foreground only in the last 25% of the hero scroll
            // so the hero copy stays fully legible until then.
            const fadeStart = 0.75;
            const fadeT = Math.max(0, (easeP - fadeStart) / (1 - fadeStart));
            const foregroundOpacity = 0.95 - 0.95 * fadeT;
            foregroundRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
            foregroundRef.current.style.opacity = String(
              Math.max(0, foregroundOpacity)
            );
          }
        },
      });
    }, scopeEl);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollScopeSelector, startOpacity, endOpacity, startBlurPx, endBlurPx]);

  return (
    <>
      {/* ─── The white architectural veil with radial spotlight mask ───
          z-0 so it sits ABOVE the fixed <CanvasSequence /> (z-0) but
          BELOW the hero foreground content (z-10). The mask-image
          radial gradient keeps the right half of the screen more
          transparent so the 1:1 image and the canvas behind it
          shine through with greater visibility from scroll = 0. */}
      <div
        ref={veilRef}
        className={[
          "pointer-events-none absolute inset-0 z-0",
          "bg-[#FAFAFA]",
          className,
        ].join(" ")}
        // Subtle radial spotlight: opaque on the left (so the hero
        // copy is fully readable), progressively more transparent
        // toward the right (so the 1:1 image and canvas shine
        // through). 0.92 (left) → 0.65 (right).
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 100% at 30% 50%, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.80) 50%, rgba(0,0,0,0.65) 100%)",
          maskImage:
            "radial-gradient(ellipse 90% 100% at 30% 50%, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.80) 50%, rgba(0,0,0,0.65) 100%)",
        }}
        aria-hidden="true"
        data-hero-veil
      />
      {/* ─── Foreground parallax + late-stage opacity wrapper ───
          Hero foreground content (CTAs, headings, etc.) is placed
          inside a sibling <div data-hero-veil-content>...</div>.
          The contents wrapper is what gets the y: -60 / opacity
          fade in the last 25% of the scroll. */}
      <div
        ref={foregroundRef}
        data-hero-veil-content
        className="contents"
      />
    </>
  );
}

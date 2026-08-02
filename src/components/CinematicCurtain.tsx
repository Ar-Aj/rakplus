"use client";

/**
 * CinematicCurtain — The $50k Theatrical Content Reveal
 *
 * Architecture:
 * 1. An obsidian (#070707) block sits below the canvas sequence sections
 * 2. As the user scrolls past the video lock-point, the curtain
 *    translates from 100vh → 0 via GSAP ScrollTrigger
 * 3. Once fully revealed, it unpins and becomes normal document flow
 * 4. Children inside the curtain use IntersectionObserver for
 *    staggered reveal animations
 *
 * Integration: Placed as a sibling AFTER the HUD content sections
 * in each page's main container. The canvas stays fixed behind
 * everything, so the curtain naturally covers it as it rises.
 */

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CinematicCurtainProps {
  children: ReactNode;
  /** Optional unique ID for debugging ScrollTrigger instances */
  id?: string;
}

export default function CinematicCurtain({
  children,
  id = "cinematic-curtain",
}: CinematicCurtainProps) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ─── GSAP ScrollTrigger: Slide-up reveal ───
  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    const ctx = gsap.context(() => {
      // The curtain starts fully below the viewport via CSS transform
      // ScrollTrigger animates it upward as the user scrolls into its zone
      gsap.fromTo(
        curtain,
        { yPercent: 30, opacity: 0.3 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            id: `${id}-reveal`,
            trigger: curtain,
            start: "top bottom",    // Animation begins when top of curtain hits bottom of viewport
            end: "top 20%",         // Fully revealed when top of curtain reaches 20% from viewport top
            scrub: 0.6,             // Smooth, cinematic scrub
          },
        }
      );
    });

    return () => ctx.revert();
  }, [id]);

  // ─── IntersectionObserver: Staggered child reveals ───
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const children = content.querySelectorAll(".reveal-curtain-child");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={curtainRef}
      className="curtain-obsidian relative w-full overflow-hidden"
      style={{ willChange: "transform, opacity" }}
    >
      {/* ─── Top Edge: Gradient fade from transparent to obsidian ─── */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #070707 100%)",
        }}
      />

      {/* ─── Content Container ─── */}
      <div ref={contentRef} className="relative z-20">
        {children}
      </div>
    </div>
  );
}

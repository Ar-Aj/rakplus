"use client";

/**
 * CinematicCurtain — Phase 22.1 Elite GSAP Reveal
 *
 * Material: Pristine White Frosted Glass
 *   bg-white/95 backdrop-blur-2xl rounded-t-[40px]
 *   shadow-[0_-20px_60px_rgba(0,0,0,0.08)]
 *
 * Elite GSAP Physics:
 *   1. H1/H2 — Clip-path y: 100% → 0% (power4.out, 1.2s)
 *   2. Grid items — Staggered y: 60 → 0, stagger: 0.15
 *   3. Images — Clip-path polygon wipe reveal
 *   4. CTAs — scale: 0.95 → 1.05 spring on hover
 *   5. Parallax — yPercent scrub on scroll
 */

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CinematicCurtainProps {
  children: ReactNode;
  id?: string;
}

export default function CinematicCurtain({
  children,
  id = "cinematic-curtain",
}: CinematicCurtainProps) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ─── 1. Curtain Slide-Up Reveal ───
  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        curtain,
        { yPercent: 12, opacity: 0.85 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            id: `${id}-reveal`,
            trigger: curtain,
            start: "top bottom",
            end: "top 15%",
            scrub: 0.8,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [id]);

  // ─── 2. Elite GSAP Content Reveals ───
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const ctx = gsap.context(() => {

      // ── A. Clip-Path Heading Reveals ──
      // Wraps each heading line in overflow-hidden; text slides up from 100%
      content.querySelectorAll(".gsap-heading").forEach((el) => {
        // Wrap inner text nodes in a span if not already
        const inner = el.querySelector(".gsap-heading-inner") ?? el;
        gsap.set(inner, { y: "100%", opacity: 0 });

        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => {
            gsap.to(inner, {
              y: "0%",
              opacity: 1,
              duration: 1.2,
              ease: "power4.out",
              clearProps: "transform,opacity",
            });
          },
          once: true,
        });
      });

      // ── B. Staggered Grid Items (stagger: 0.15) ──
      const staggerGroups = content.querySelectorAll(".gsap-stagger-group");
      staggerGroups.forEach((group) => {
        const items = group.querySelectorAll(".gsap-stagger-item");
        gsap.set(items, { y: 60, opacity: 0 });

        ScrollTrigger.create({
          trigger: group,
          start: "top 85%",
          onEnter: () => {
            gsap.to(items, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              stagger: 0.15,
              clearProps: "transform,opacity",
            });
          },
          once: true,
        });
      });

      // ── C. Clip-Path Image Wipe Reveal ──
      // polygon(0 0, 0 0, 0 100%, 0 100%) → polygon(0 0, 100% 0, 100% 100%, 0 100%)
      content.querySelectorAll(".gsap-img-wipe").forEach((el) => {
        gsap.set(el, { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" });

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.to(el, {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              duration: 1.4,
              ease: "power4.inOut",
              clearProps: "clipPath",
            });
          },
          once: true,
        });
      });

      // ── D. Parallax on Images ──
      content.querySelectorAll(".gsap-parallax").forEach((el) => {
        gsap.to(el, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      // ── E. CTA Scale Hover + Viewport Entrance ──
      content.querySelectorAll(".gsap-cta").forEach((el) => {
        gsap.set(el, { scale: 0.9, opacity: 0 });

        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          onEnter: () => {
            gsap.to(el, {
              scale: 1,
              opacity: 1,
              duration: 0.7,
              ease: "back.out(1.7)",
              clearProps: "transform,opacity",
            });
          },
          once: true,
        });

        // Hover: scale 1.05
        const scaleUp = () => gsap.to(el, { scale: 1.05, duration: 0.25, ease: "power2.out" });
        const scaleDown = () => gsap.to(el, { scale: 1, duration: 0.25, ease: "power2.in" });
        (el as HTMLElement).addEventListener("mouseenter", scaleUp);
        (el as HTMLElement).addEventListener("mouseleave", scaleDown);
      });

      // ── F. Stat Counter Animations ──
      content.querySelectorAll(".gsap-counter").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") ?? "0");
        const isInt = Number.isInteger(target);
        const obj = { val: 0 };

        gsap.set(el, { opacity: 0, y: 20 });

        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = isInt ? Math.round(obj.val).toString() : obj.val.toFixed(2);
              },
            });
          },
          once: true,
        });
      });

      // ── G. Simple fade-slide fallback for reveal-curtain-child ──
      content.querySelectorAll(".reveal-curtain-child").forEach((el) => {
        gsap.set(el, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          onEnter: () => {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform,opacity",
            });
          },
          once: true,
        });
      });

    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={curtainRef}
      className="relative z-20 w-full"
      style={{ willChange: "transform, opacity" }}
    >
      {/* ─── Frosted White Curtain Panel ─── */}
      <div className="bg-white/95 backdrop-blur-2xl rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.08)] min-h-screen">
        {/* ─── Content ─── */}
        <div ref={contentRef} className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

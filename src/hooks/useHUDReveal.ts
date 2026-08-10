"use client";

/**
 * useHUDReveal — Elite GSAP Scroll-Driven HUD Animations
 *
 * Targets elements within a container ref and applies:
 *
 * 1. `.hud-blur-reveal`  → Blur + Y drift as user scrolls through canvas sections
 *    filter: blur(12px), y: 20, opacity: 0  →  blur(0px), y: 0, opacity: 1
 *    ease: power3.out — feels like ink resolving from focus
 *
 * 2. `.hud-skew-heading` → 3D skew snap for major headings
 *    rotateX: -15deg, y: 40, opacity: 0  →  rotateX: 0, y: 0, opacity: 1
 *    ease: power4.out + perspective
 *
 * 3. `.hud-stagger-group` + `.hud-stagger-item` → Cascading child reveals
 *    y: 50, opacity: 0 → y: 0, opacity: 1 with stagger: 0.12
 *
 * 4. `.hud-scrub-text` → Line-by-line scroll scrubbing
 *    Each line transitions opacity 0.2 → 1 scrubbed to scroll position
 *
 * 5. `.hud-counter` (data-target) → Number counter on enter
 */

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHUDReveal(containerRef: React.RefObject<HTMLElement | HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {

      // ── 1. Blur Reveal (HUD canvas overlay text) ──
      // Feels like the CGI renders into focus as you scroll down
      container.querySelectorAll(".hud-blur-reveal").forEach((el) => {
        gsap.set(el, { filter: "blur(14px)", y: 22, opacity: 0 });

        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          onEnter: () => {
            gsap.to(el, {
              filter: "blur(0px)",
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              clearProps: "filter,transform,opacity",
            });
          },
          once: true,
        });
      });

      // ── 2. 3D Skew Heading Snap ──
      // Headings feel like they're snapping from perspective depth into the plane
      container.querySelectorAll(".hud-skew-heading").forEach((el) => {
        gsap.set(el, {
          rotateX: -18,
          y: 45,
          opacity: 0,
          transformPerspective: 800,
          transformOrigin: "top center",
        });

        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => {
            gsap.to(el, {
              rotateX: 0,
              y: 0,
              opacity: 1,
              duration: 1.3,
              ease: "power4.out",
              clearProps: "all",
            });
          },
          once: true,
        });
      });

      // ── 3. Stagger Group (y drift + opacity, cascading) ──
      container.querySelectorAll(".hud-stagger-group").forEach((group) => {
        const items = group.querySelectorAll(".hud-stagger-item");
        gsap.set(items, { y: 50, opacity: 0 });

        ScrollTrigger.create({
          trigger: group,
          start: "top 85%",
          onEnter: () => {
            gsap.to(items, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              clearProps: "transform,opacity",
            });
          },
          once: true,
        });
      });

      // ── 4. Line-by-Line Scrub Text ──
      // Technical paragraphs illuminate line-by-line as you read down
      container.querySelectorAll(".hud-scrub-text").forEach((el) => {
        // Split into word spans for granular control
        const text = el.textContent ?? "";
        const words = text.split(" ").filter(Boolean);

        // Only apply if element has enough words to make it worthwhile
        if (words.length < 10) {
          gsap.set(el, { opacity: 0 });
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            onEnter: () => gsap.to(el, { opacity: 1, duration: 0.8, ease: "power2.out", clearProps: "opacity" }),
            once: true,
          });
          return;
        }

        // Wrap words in spans
        el.innerHTML = words
          .map((w) => `<span class="hud-word" style="opacity:0.2;display:inline;">${w} </span>`)
          .join("");

        const wordEls = el.querySelectorAll(".hud-word");

        gsap.to(wordEls, {
          opacity: 1,
          stagger: {
            each: 0.025,
            from: "start",
          },
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 1.5,
          },
        });
      });

      // ── 5. Counter Animation ──
      container.querySelectorAll(".hud-counter").forEach((el) => {
        const raw = el.getAttribute("data-target") ?? "0";
        const target = parseFloat(raw);
        const isInt = Number.isInteger(target);
        const suffix = el.getAttribute("data-suffix") ?? "";
        const obj = { val: 0 };

        gsap.set(el, { opacity: 0, y: 20 });

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", clearProps: "transform,opacity" });
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                const display = isInt ? Math.round(obj.val) : obj.val.toFixed(1);
                el.textContent = display + suffix;
              },
            });
          },
          once: true,
        });
      });

    }, containerRef as React.RefObject<HTMLElement>);

    return () => ctx.revert();
  }, [containerRef]);
}

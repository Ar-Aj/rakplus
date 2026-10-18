"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { frameLoadTracker } from "@/hooks/useFrameLoadTracker";

/**
 * Preloader — Phase 52.4 → Phase 54.0
 *
 * Visual: clean, single central circle with the logo video masked inside,
 * encircled by a glowing cyan SVG progress ring. Premium, restrained design.
 *
 * Intelligence:
 *   - 5 s minimum display, 15 s maximum (force-dismiss if frames take too long).
 *   - Frame sync: progress driven by frameLoadTracker.getProgress() polling
 *     every 100 ms, so the visual ring tracks actual decode state rather
 *     than an arbitrary timer.
 *   - Route exclusion: bypasses rendering entirely on product detail pages
 *     (/products/* but not /products itself).
 *
 * TASK 1 (VRAM eviction) lives in CanvasSequence's useEffect cleanup.
 * The Preloader holds no frame references.
 */

/**
 * Phase 56.0 note: the dismiss logic is now a composite signal
 * `(firstPaint && loaded/total >= 0.6 && wallMs >= 4000)` plus a
 * 12 s hard fallback. It no longer reads any single buffer-size
 * constant on the CanvasSequence side.
 */

export default function Preloader() {
  const pathname = usePathname();

  // ── All hooks MUST be called before any conditional return so the
  //    hook order is identical across every render (React Rules of Hooks). ──

  // ── State ────────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");
  const [progress, setProgress] = useState(0); // 0–100, drives the ring + counter

  const videoRef = useRef<HTMLVideoElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── TASK 2 (kept): Route Exclusion ──────────────────────────────────────
  // Computed AFTER all hooks so the conditional `return null` below is the
  // very last thing this component does. React requires hooks to fire in
  // the same order every render — returning early between them would
  // violate that and break the component.
  const isProductDetail =
    pathname.startsWith("/products/") && pathname !== "/products";

  // ── Dismiss sequence: fill ring → fade overlay → unmount ────────────────
  const beginDismissSequence = useCallback(() => {
    // Animate to 100 % visually so the ring completes its sweep
    setProgress(100);

    // Brief beat so the ring finishes its closing arc, then fade out
    fadeTimerRef.current = setTimeout(() => {
      setPhase("fading");
    }, 400);

    // After CSS 700 ms fade transition, fully unmount from DOM
    unmountTimerRef.current = setTimeout(() => {
      setPhase("done");
    }, 1100);
  }, []);

  useEffect(() => {
    // Lock body scroll while overlay is active
    document.body.style.overflow = "hidden";

    // ── PHASE 56.0 — Preloader dismiss contract ──
    // The entire purpose of the Preloader is to absorb the loading cost
    // so scrolling is 100 % smooth afterward. We now hold the overlay
    // until a meaningful slice of the sequence is fully loaded.
    //
    //   DISMISS WHEN (whichever fires first):
    //     (A) PRIMED:   loaded/total ≥ UPFRONT_TARGET_RATIO (60 %)
    //                   AND firstPaint has occurred AND ≥ 4 s wall-clock
    //     (B) FULLY-LOADED: loaded ≥ total (small sub-page case)
    //                   AND ≥ 4 s wall-clock
    //     (C) HARD FALLBACK: 12 s wall-clock maximum reached
    //
    //   PROGRESS BAR: tracks `loaded / total` directly so the user
    //   sees smooth 0 → 100 % while the heavy upfront sequential
    //   loading finishes.
    //
    //   TAIL LOADS: the canvas's pre-warm continues to fire `new Image()`
    //   requests in the background for any frames the user did not see
    //   the Preloader complete for. By the time the user reaches the
    //   bottom of the page, the tail is already cached.
    const MIN_DISMISS_MS = 4000;
    const FALLBACK_DISMISS_MS = 12000;
    const TARGET_RATIO = 0.6;

    const dismiss = () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
      beginDismissSequence();
    };

    pollIntervalRef.current = setInterval(() => {
      const { loaded, total, pct } = frameLoadTracker.getProgress();
      const firstPaint = frameLoadTracker.hasFirstPaint();
      // Phase 56.5 — PROGRESS RING MATH:
      // The Preloader dismisses at `loaded/total >= TARGET_RATIO (0.6)`.
      // To make the ring hit 100% exactly when the preloader is ready
      // to dismiss, scale the displayed percentage against the
      // dismiss threshold: `(loaded / (total * TARGET_RATIO)) * 100`,
      // clamped to 100. So when `loaded/total` reaches 0.6, the ring
      // shows 100% and the user sees a smooth close-out animation.
      const dismissThreshold = total * TARGET_RATIO;
      const ringPct = total > 0 && dismissThreshold > 0
        ? Math.min(100, Math.round((loaded / dismissThreshold) * 100))
        : 0;
      setProgress(ringPct);
      // Keep pct available as a fallback reference.
      void pct;

      // Native ratio (used for the dismiss condition).
      const ratio = total > 0 ? Math.min(loaded / total, 1) : 0;

      const wallMs = Date.now() - startTimeRef.current;
      const minTimeElapsed = wallMs >= MIN_DISMISS_MS;
      const hitFallback = wallMs >= FALLBACK_DISMISS_MS;

      // (A) PRIMED: first canvas paint + 60% of upfront target decoded
      //            + 4 s minimum wall-clock.
      if (firstPaint && total > 0 && ratio >= TARGET_RATIO && minTimeElapsed) {
        dismiss();
        return;
      }

      // (B) FULLY LOADED: small sub-page case where total ≤ 250 and
      //     every frame is loaded upfront.
      if (firstPaint && total > 0 && total <= 250 && loaded >= total && minTimeElapsed) {
        dismiss();
        return;
      }

      // (C) HARD FALLBACK: 12 s max — never trap the user.
      if (hitFallback) {
        dismiss();
      }
    }, 100);

    // ── Autoplay safeguard for mobile & modern browsers ──────────────────────
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — video stays paused (muted + playsInline set)
      });
    }

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      document.body.style.overflow = "";
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current);
    };
  }, [beginDismissSequence]);

  // ── TASK 2: Route Exclusion (now placed AFTER all hooks) ───────────────
  // Bypasses rendering entirely on product detail pages
  // (/products/* but not /products itself).
  if (isProductDetail) {
    return null;
  }

  // ── SVG ring constants ───────────────────────────────────────────────────
  // 256×256 viewBox, centre (128, 128), radius 120, circumference ≈ 753.98
  const RING_RADIUS = 120;
  const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
  const strokeDashoffset =
    RING_CIRCUMFERENCE - (progress / 100) * RING_CIRCUMFERENCE;

  // Unmount when phase === "done"
  if (phase === "done") return null;

  return (
    <div
      aria-hidden={phase !== "loading"}
      className={`fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center
        transition-opacity duration-700 ease-in-out select-none
        ${phase === "loading" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* Circular Preloader Wrapper */}
      <div className="relative w-64 h-64 flex items-center justify-center">

        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />

        {/* Centered Circular Mask for Video */}
        {/*
          clip-path: circle() is GPU-composited — no CPU rasterization during
          animation. transition: clip-path 0.3s ease-out smooths the radius
          change between 100 ms poll updates. The mask sits inside inset-4
          (112 px radius) and the video "eats" the loader as it fills.
        */}
        <div
          className="absolute inset-4 rounded-full overflow-hidden bg-black flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]"
          style={{
            clipPath: "circle(50% at 50% 50%)",
            transition: "clip-path 0.3s ease-out",
          }}
        >
          <video
            ref={videoRef}
            src="/videos/Loader/Logo%20Animation.mp4"
            autoPlay
            muted
            playsInline
            loop
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Glowing Bluish Energy Progress Ring */}
        {/*
          Rendered ABOVE the masked video so it always stays visible as a
          full circle. stroke-dashoffset animates with the progress ticker,
          producing the "filling up" energy ring effect.
        */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-[0_0_20px_rgba(56,189,248,0.8)] overflow-visible"
          viewBox="0 0 256 256"
        >
          <defs>
            <linearGradient
              id="bluishEnergyGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%"   stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>
          </defs>

          {/* Energy Track Line — always shows full grey track */}
          <circle
            cx="128"
            cy="128"
            r={RING_RADIUS}
            stroke="rgba(56, 189, 248, 0.15)"
            strokeWidth="3"
            fill="none"
          />

          {/* Active Energy Progress Stroke — fills as progress climbs */}
          <circle
            cx="128"
            cy="128"
            r={RING_RADIUS}
            stroke="url(#bluishEnergyGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            className="transition-[stroke-dashoffset] duration-100 ease-linear"
          />
        </svg>
      </div>

      {/* Tech-Styled Monospace Percentage Counter */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-sky-400 font-semibold uppercase drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] tabular-nums">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
          <span>LOADING {progress}%</span>
        </div>
      </div>
    </div>
  );
}

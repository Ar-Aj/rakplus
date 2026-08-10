"use client";

/**
 * CanvasSequence — Responsive, scroll-driven image sequence player.
 *
 * Phase 13.1 — Tri-Viewport Sync & Full-Screen Cover Physics:
 * When useDocumentScroll={true}, the ScrollTrigger binds to the full
 * page (document.documentElement) instead of the container element.
 * This makes the canvas scrub from frame 1 to frameCount across the
 * ENTIRE page height — perfectly ending as the user reaches the footer,
 * regardless of how much content is on the page.
 *
 * VIEWPORT MAPPING (3-tier):
 *   - innerWidth < 768   → mobilePath  (9:16 source)
 *   - innerWidth 768–1023 → tabletPath (3:4 source, iPad-native)
 *   - innerWidth >= 1024 → desktopPath (16:9 source)
 *
 * COVER-FIT MATH (Math.max):
 *   Ensures 100% screen fill with zero empty space.
 *   The tri-viewport path switching naturally minimizes crop amount
 *   by serving the closest aspect ratio video for each device class.
 */

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ───

const FRAME_PREFIX = "frame_";
const FRAME_EXT = ".webp";
const TABLET_BREAKPOINT = 768;   // mobile → tablet
const DESKTOP_BREAKPOINT = 1024; // tablet → desktop

function frameSrc(basePath: string, index: number): string {
  return `${basePath}${FRAME_PREFIX}${String(index).padStart(4, "0")}${FRAME_EXT}`;
}

// ─── Render (Cover-Fit, Full-Screen Fill) ───
// Works for any aspect ratio: 16:9 desktop, 3:4 tablet, 9:16 mobile.
// Math.max scale ensures 100% screen fill. Center anchor = symmetric crop.
// Tri-viewport path switching naturally minimizes crop by matching ratios.

function renderFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement
): void {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (!w || !h) return;

  // Scale to cover: whichever axis needs more scaling wins
  const scale = Math.max(canvas.width / w, canvas.height / h);

  // Center-anchor: equal overflow on both sides of each axis
  const x = canvas.width  / 2 - (w / 2) * scale;
  const y = canvas.height / 2 - (h / 2) * scale;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, w * scale, h * scale);
}

// ─── Component ───

interface CanvasSequenceProps {
  /** Path to desktop frames, e.g. "/innovation-desktop/" */
  desktopPath: string;
  /** Path to tablet frames, e.g. "/innovation-tablet/" (optional — falls back to desktopPath) */
  tabletPath?: string;
  /** Path to mobile frames, e.g. "/innovation-mobile/" */
  mobilePath: string;
  /** Exact number of frames in the sequence */
  frameCount: number;
  desktopFrameCount?: number;
  tabletFrameCount?: number;
  mobileFrameCount?: number;
  /**
   * Optional ref to a specific DOM element to use as the ScrollTrigger.
   * When provided, this takes priority over useDocumentScroll.
   * Use this for "early finish" behaviour — e.g. end: "85% bottom"
   * so the video completes before the footer enters the viewport.
   */
  scrollTriggerRef?: RefObject<HTMLElement | HTMLDivElement | null>;
  /**
   * When true (and no scrollTriggerRef provided), binds the GSAP ScrollTrigger
   * to document.documentElement. Page height drives the scrub.
   * Default: false (uses the internal container ref).
   */
  useDocumentScroll?: boolean;
  /** Container className */
  className?: string;
}

export default function CanvasSequence({
  desktopPath,
  tabletPath,
  mobilePath,
  frameCount,
  desktopFrameCount,
  tabletFrameCount,
  mobileFrameCount,
  scrollTriggerRef,
  useDocumentScroll = false,
  className,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ─── 1. Device Detection (3-tier) ───
    const getActiveTierData = () => {
      if (window.innerWidth < TABLET_BREAKPOINT) return { path: mobilePath, count: mobileFrameCount ?? frameCount };
      if (window.innerWidth < DESKTOP_BREAKPOINT) return { path: tabletPath ?? desktopPath, count: tabletFrameCount ?? desktopFrameCount ?? frameCount };
      return { path: desktopPath, count: desktopFrameCount ?? frameCount };
    };

    let { path: basePath, count: currentFrameCount } = getActiveTierData();
    // Track which tier we're in so resize can detect a crossing
    const getTier = () =>
      window.innerWidth < TABLET_BREAKPOINT  ? "mobile"
      : window.innerWidth < DESKTOP_BREAKPOINT ? "tablet"
      : "desktop";
    let currentTier = getTier();

    console.log(
      `[CanvasSequence] ${window.innerWidth}px → ${basePath} (${currentFrameCount} frames, docScroll=${useDocumentScroll})`
    );

    // ─── 2. Size Canvas ───
    const sizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    sizeCanvas();

    // ─── 3. Frame Storage ───
    const framesRef = { current: new Array<HTMLImageElement | null>(currentFrameCount) };
    let currentIndex = 0;
    // GSAP context — rebuilt on breakpoint swap
    let gsapCtx = gsap.context(() => {}, containerRef.current ?? document.body);

    // ─── 4. Sequence Loader (reusable — called on init + breakpoint swap) ───
    function loadSequence(path: string) {
      // ─── GSAP ScrollTrigger Nuke ───
      // Explicitly kill stale ScrollTriggers associated with this canvas to prevent "ghost" triggers.
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.id === "canvas-sequence") t.kill();
      });

      // Reset frame array and index for the new path
      framesRef.current = new Array(currentFrameCount);
      currentIndex = 0;

      const firstImage = new Image();
      firstImage.decoding = "async";
      firstImage.src = frameSrc(path, 1);

      firstImage.onload = () => {
        framesRef.current[0] = firstImage;
        console.log(
          `[CanvasSequence] ✓ Frame 1 painted (${firstImage.naturalWidth}×${firstImage.naturalHeight}) from ${path}`
        );
        if (canvas && ctx) renderFrame(canvas, ctx, firstImage);
        loadRemainingFrames(path);
      };

      firstImage.onerror = () => {
        console.error(`[CanvasSequence] ✗ Failed: "${firstImage.src}"`);
        loadRemainingFrames(path);
      };
    }

    // ─── 5. Load Remaining Frames ───
    function loadRemainingFrames(path: string) {
      let loaded = 1;

      for (let i = 2; i <= currentFrameCount; i++) {
        const img = new Image();
        img.decoding = "async";
        const src = frameSrc(path, i);
        img.src = src;

        img.onload = () => {
          framesRef.current[i - 1] = img;
          loaded++;
          if (loaded === currentFrameCount) onAllFramesLoaded();
        };

        img.onerror = () => {
          console.warn(`[CanvasSequence] ⚠ Failed: "${src}"`);
          framesRef.current[i - 1] = new Image();
          loaded++;
          if (loaded === currentFrameCount) onAllFramesLoaded();
        };
      }
    }

    // ─── 6. Init GSAP After All Frames Load ───
    function onAllFramesLoaded() {
      console.log(
        `[CanvasSequence] ✓ All ${currentFrameCount} frames loaded. Initializing GSAP.`
      );

      // Tear down previous GSAP context before rebuilding
      gsapCtx.revert();
      gsapCtx = gsap.context(() => {}, containerRef.current ?? document.body);

      /**
       * SCROLL TARGET PRIORITY:
       * 1. scrollTriggerRef prop → specific element (early-finish mode)
       * 2. useDocumentScroll    → document.documentElement (full-page mode)
       * 3. fallback             → internal containerRef
       */
      const scrollTarget: Element =
        scrollTriggerRef?.current
          ? scrollTriggerRef.current
          : useDocumentScroll
          ? document.documentElement
          : (containerRef.current ?? document.documentElement);

      // Early-finish end: "85% bottom" = video locks on final frame
      // while user can still freely scroll the last 15% + footer.
      const triggerEnd = scrollTriggerRef?.current
        ? "85% bottom"
        : "bottom bottom";

      gsapCtx.add(() => {
        gsap.to(
          { frame: 0 },
          {
            frame: currentFrameCount - 1,
            ease: "none",
            scrollTrigger: {
              id: "canvas-sequence",
              trigger: scrollTarget,
              start: "top top",
              end: triggerEnd,
              scrub: 0.1, // tightened for maximum sensitivity (Phase 13.3)
              onUpdate: (self) => {
                const idx = Math.min(
                  currentFrameCount - 1,
                  Math.max(0, Math.round(self.progress * (currentFrameCount - 1)))
                );
                if (idx !== currentIndex) {
                  currentIndex = idx;
                  const frame = framesRef.current[idx];
                  if (frame?.naturalWidth && canvas && ctx) {
                    renderFrame(canvas, ctx, frame);
                  }
                }
              },
            },
          }
        );
      });

      ScrollTrigger.refresh();
      console.log("[CanvasSequence] ✓ GSAP ScrollTrigger active.");
    }

    // ─── 7. Resize Handler — Tri-Tier Breakpoint Detection ───
    let lastWidth = window.innerWidth;

    const handleResize = () => {
      sizeCanvas();

      // Strict Width-Only Breakpoint Tracking
      if (window.innerWidth === lastWidth) {
        // Only height changed (e.g., mobile address bar scroll). Redraw current frame and return early.
        const frame = framesRef.current[currentIndex];
        if (frame?.naturalWidth && canvas && ctx) {
          renderFrame(canvas, ctx, frame);
        }
        return;
      }

      lastWidth = window.innerWidth;
      const newTier = getTier();

      // Tier changed → swap frame set entirely
      if (newTier !== currentTier) {
        currentTier = newTier;
        const tierData = getActiveTierData();
        basePath = tierData.path;
        currentFrameCount = tierData.count;
        console.log(`[CanvasSequence] Tier swap → ${newTier} (${basePath})`);
        loadSequence(basePath);
        return;
      }

      // Same tier, width changed — redraw current frame at new canvas size
      const frame = framesRef.current[currentIndex];
      if (frame?.naturalWidth && canvas && ctx) {
        renderFrame(canvas, ctx, frame);
      }
    };

    window.addEventListener("resize", handleResize);

    // ─── 8. Initial Load ───
    loadSequence(basePath);

    // ─── 9. Cleanup ───
    return () => {
      window.removeEventListener("resize", handleResize);
      gsapCtx.revert();
    };
  }, [desktopPath, tabletPath, mobilePath, frameCount, desktopFrameCount, tabletFrameCount, mobileFrameCount, useDocumentScroll, scrollTriggerRef]);

  return (
    <div
      ref={containerRef}
      className={`${useDocumentScroll ? "fixed inset-0 w-full h-full pointer-events-none" : "absolute inset-0 w-full"} ${className || ""}`}
      style={useDocumentScroll ? undefined : { height: "100%" }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[-1] w-full h-[100dvh] pointer-events-none"
        aria-hidden="true"
        role="img"
        aria-label="RAKPLUS cinematic scroll sequence"
      />
    </div>
  );
}

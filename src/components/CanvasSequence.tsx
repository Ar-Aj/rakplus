"use client";

/**
 * CanvasSequence — Responsive, scroll-driven image sequence player.
 *
 * Phase 52.0 — MASTER PERFORMANCE REFACTOR:
 *
 * MEMORY:
 *   - Rolling buffer: only BUFFER_AHEAD + BUFFER_BEHIND frames are held in
 *     active memory at any time. All frames outside the window have their
 *     src="" to allow the browser to release the backing bitmap from VRAM.
 *   - GC leak fix: old framesRef array is fully cleared before reassignment
 *     on breakpoint swap, preventing double-stacked VRAM after tier change.
 *
 * GPU:
 *   - Context flags: { alpha: false, desynchronized: true } eliminate the
 *     alpha-blending math cost and decouple canvas repaint from the main thread.
 *   - fillRect removed: alpha:false guarantees an opaque surface; the white fill
 *     was a wasted full-viewport rasterize every frame.
 *   - Canvas promoted to its own compositor layer via willChange + translateZ(0).
 *
 * PAINT:
 *   - img.decode() called before drawImage to move GPU bitmap upload off the
 *     main thread, eliminating decode-spike stutters during the scrub.
 *   - rAF race fixed: currentIndex is re-read *inside* the rAF callback so we
 *     always paint the latest GSAP position, never a stale one.
 *   - manageBuffer() called inside the rAF loop to keep the window centered.
 *
 * REACT:
 *   - scrollTriggerRef removed from useEffect deps — it's a stable RefObject;
 *     including it risks tearing down the GSAP timeline on parent re-renders.
 *   - { passive: true } added to the resize listener.
 *
 * UNCHANGED:
 *   - All UI, CSS classes, GSAP scroll distances, cover Math.max logic.
 *   - Tri-viewport breakpoint detection and path routing.
 */

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ───────────────────────────────────────────────────────────────

const FRAME_PREFIX = "frame_";
const FRAME_EXT = ".webp";
const TABLET_BREAKPOINT = 768;    // mobile → tablet
const DESKTOP_BREAKPOINT = 1024;  // tablet → desktop

/** Frames to keep loaded ahead of the current scroll position.
 *  80 frames ≈ 2.5 s of video pre-loaded — prevents fast-scrub misses. */
const BUFFER_AHEAD = 80;
/** Frames to keep loaded behind the current scroll position.
 *  40 frames ≈ 1.5 s — prevents reload cost on reverse scrubs. */
const BUFFER_BEHIND = 40;
/** Minimum frame-delta before manageBuffer re-runs.
 *  Throttles GC pressure to once per 10-frame scroll step. */
const BUFFER_THROTTLE = 10;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function frameSrc(basePath: string, index: number): string {
  return `${basePath}${FRAME_PREFIX}${String(index).padStart(4, "0")}${FRAME_EXT}`;
}

// ─── Render (Cover-Fit, Full-Screen Fill) ────────────────────────────────────
// Works for any aspect ratio: 16:9 desktop, 3:4 tablet, 9:16 mobile.
// Math.max scale ensures 100% screen fill. Center anchor = symmetric crop.
// Tri-viewport path switching naturally minimizes crop by matching ratios.
// NOTE: ctx.fillRect removed — alpha:false context guarantees opaque surface.

function renderFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement
): void {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (!w || !h) return;

  // True Full-Bleed Cover Math (unchanged)
  const scale = Math.max(canvas.width / w, canvas.height / h);

  // Center-anchor: equal overflow on both sides of each axis
  const x = canvas.width  / 2 - (w / 2) * scale;
  const y = canvas.height / 2 - (h / 2) * scale;

  ctx.drawImage(img, x, y, w * scale, h * scale);
}

// ─── Rolling Buffer Manager ───────────────────────────────────────────────────
/**
 * Keeps only the [centerIndex - BUFFER_BEHIND, centerIndex + BUFFER_AHEAD]
 * window of frames loaded in memory. Frames outside that window have their
 * src cleared so the browser can release their GPU-resident bitmaps.
 *
 * Frames inside the window that are missing are loaded and pre-decoded.
 * Claiming the slot immediately with the Image object prevents duplicate
 * network requests when this function is called multiple times per second.
 */
function manageBuffer(
  framesRef: { current: Array<HTMLImageElement | null> },
  basePath: string,
  centerIndex: number,
  totalFrames: number
): void {
  const lo = Math.max(0, centerIndex - BUFFER_BEHIND);
  const hi = Math.min(totalFrames - 1, centerIndex + BUFFER_AHEAD);

  // ── Evict frames outside the window ──
  for (let i = 0; i < totalFrames; i++) {
    if ((i < lo || i > hi)) {
      const img = framesRef.current[i];
      if (img && img.src) {
        img.onload  = null;
        img.onerror = null;
        img.src = ""; // Signals the browser to release the decoded bitmap
        framesRef.current[i] = null;
      }
    }
  }

  // ── Load missing frames inside the window ──
  for (let i = lo; i <= hi; i++) {
    if (!framesRef.current[i]) {
      const img = new Image();
      img.decoding = "async";

      // Claim slot immediately — prevents duplicate loads if called again
      // before this image's onload fires.
      framesRef.current[i] = img;

      img.onload = () => {
        // Pre-decode: move GPU bitmap upload off the main thread.
        // Resolves immediately if the browser already decoded it.
        img.decode().then(() => {
          // Only commit if this slot wasn't evicted while we were decoding
          if (framesRef.current[i] === img) {
            framesRef.current[i] = img;
          }
        }).catch(() => {
          framesRef.current[i] = null;
        });
      };

      img.onerror = () => {
        framesRef.current[i] = null;
      };

      img.src = frameSrc(basePath, i + 1); // frames on disk are 1-indexed
    }
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

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
  /** Custom GSAP end trigger expression (e.g. "+=150%", "+=1500px", "85% bottom") */
  end?: string;
  /** Mobile-specific GSAP end trigger expression (e.g. "+=1500px", "+=150%") */
  mobileEnd?: string;
  /** GSAP scrub duration in seconds or boolean (default: 0.1 on desktop, 0.5 on mobile) */
  scrub?: number | boolean;
  /** Mobile-specific GSAP scrub duration in seconds or boolean (default: 0.5) */
  mobileScrub?: number | boolean;
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
  end,
  mobileEnd,
  scrub,
  mobileScrub,
  className,
}: CanvasSequenceProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── GPU Context Flags ──
    // alpha: false     → no alpha channel; eliminates premultiplied-alpha blend math
    //                    and saves VRAM (no alpha plane allocated)
    // desynchronized   → decouples canvas repaint from the browser's composite cycle;
    //                    GPU scheduler queues draws independently of main thread sync
    // willReadFrequently: false → we never call getImageData; skip readback path
    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false,
    });
    if (!ctx) return;

    // ─── 1. Device Detection (3-tier) ────────────────────────────────────────
    const getActiveTierData = () => {
      if (window.innerWidth < TABLET_BREAKPOINT)
        return { path: mobilePath,                            count: mobileFrameCount  ?? frameCount };
      if (window.innerWidth < DESKTOP_BREAKPOINT)
        return { path: tabletPath ?? desktopPath,             count: tabletFrameCount  ?? desktopFrameCount ?? frameCount };
      return   { path: desktopPath,                           count: desktopFrameCount ?? frameCount };
    };

    let { path: basePath, count: currentFrameCount } = getActiveTierData();

    const getTier = () =>
      window.innerWidth < TABLET_BREAKPOINT  ? "mobile"
      : window.innerWidth < DESKTOP_BREAKPOINT ? "tablet"
      : "desktop";
    let currentTier = getTier();

    console.log(
      `[CanvasSequence] ${window.innerWidth}px → ${basePath} (${currentFrameCount} frames, docScroll=${useDocumentScroll})`
    );

    // ─── 2. Size Canvas ───────────────────────────────────────────────────────
    const sizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    sizeCanvas();

    // ─── 3. Frame Storage ─────────────────────────────────────────────────────
    // Null-initialized array — slots are claimed lazily by manageBuffer.
    const framesRef: { current: Array<HTMLImageElement | null> } = {
      current: new Array<HTMLImageElement | null>(currentFrameCount).fill(null),
    };
    let currentIndex = 0;

    // GSAP context — rebuilt on breakpoint swap
    let gsapCtx = gsap.context(() => {}, containerRef.current ?? document.body);

    // ─── 4. Clear Frame Array Helper ─────────────────────────────────────────
    // Must be called BEFORE reassigning framesRef.current so we release the
    // old bitmaps. The original code cleared the array AFTER reassignment,
    // which meant the loop ran on the new empty array — a full memory leak.
    function clearFrameArray(arr: Array<HTMLImageElement | null>): void {
      for (let i = 0; i < arr.length; i++) {
        const img = arr[i];
        if (img) {
          img.onload  = null;
          img.onerror = null;
          img.src = "";   // Release backing bitmap
          arr[i]  = null;
        }
      }
    }

    // ─── 5. Sequence Loader ───────────────────────────────────────────────────
    function loadSequence(path: string) {
      // Kill stale ScrollTriggers
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.id === "canvas-sequence") t.kill();
      });

      // ── GC FIX: clear OLD array contents BEFORE reassigning the reference ──
      clearFrameArray(framesRef.current);
      framesRef.current = new Array<HTMLImageElement | null>(currentFrameCount).fill(null);
      currentIndex = 0;

      // Seed frame 0 immediately so the canvas isn't blank on load
      const firstImage = new Image();
      firstImage.decoding = "async";
      firstImage.src = frameSrc(path, 1);

      // Claim slot 0 immediately
      framesRef.current[0] = firstImage;

      firstImage.onload = () => {
        firstImage.decode().then(() => {
          if (canvas && ctx) renderFrame(canvas, ctx, firstImage);
          console.log(
            `[CanvasSequence] ✓ Frame 1 painted (${firstImage.naturalWidth}×${firstImage.naturalHeight}) from ${path}`
          );
          // Seed the initial buffer window around frame 0
          manageBuffer(framesRef, path, 0, currentFrameCount);
          initGSAP(path);
        }).catch(() => {
          if (canvas && ctx) renderFrame(canvas, ctx, firstImage);
          manageBuffer(framesRef, path, 0, currentFrameCount);
          initGSAP(path);
        });
      };

      firstImage.onerror = () => {
        console.error(`[CanvasSequence] ✗ Failed: "${firstImage.src}"`);
        framesRef.current[0] = null;
        manageBuffer(framesRef, path, 0, currentFrameCount);
        initGSAP(path);
      };
    }

    // ─── 6. Init GSAP ─────────────────────────────────────────────────────────
    function initGSAP(path: string) {
      console.log(`[CanvasSequence] ✓ GSAP init for path: ${path}`);

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

      const isMobile = window.innerWidth < TABLET_BREAKPOINT;

      const triggerEnd = isMobile && mobileEnd
        ? mobileEnd
        : end
        ? end
        : scrollTriggerRef?.current
        ? (isMobile ? "+=1500px" : "85% bottom")
        : "bottom bottom";

      const scrubValue = isMobile
        ? (mobileScrub ?? 0.5)
        : (scrub ?? 0.1);

      // rAF guard — prevents stacking multiple draw calls in a single frame
      let renderRequested = false;
      const frame = { index: 0 };
      // Tracks the center index at which manageBuffer last ran.
      // Prevents running the GC-heavy buffer loop on every GSAP tick.
      let lastBufferedIndex = 0;

      gsapCtx.add(() => {
        gsap.to(frame, {
          index: currentFrameCount - 1,
          snap: "index",
          ease: "none",
          scrollTrigger: {
            id: "canvas-sequence",
            trigger: scrollTarget,
            start: "top top",
            end: triggerEnd,
            scrub: scrubValue,
            onUpdate: () => {
              const idx = Math.round(frame.index);
              if (idx !== currentIndex) {
                currentIndex = idx;

                if (!renderRequested) {
                  renderRequested = true;

                  requestAnimationFrame(() => {
                    // Re-read currentIndex inside rAF — multiple GSAP onUpdate
                    // calls may have fired between scheduling and executing this
                    // rAF, so always paint the latest position, never a stale one.
                    const finalIdx = currentIndex;
                    const img = framesRef.current[finalIdx];

                    // ── SYNCHRONOUS DRAW ──────────────────────────────────────
                    // img.decode() is intentionally NOT called here.
                    // Promise resolution latency desyncs GSAP scrub timing.
                    // img.complete + naturalWidth > 0 is a zero-cost sync guard:
                    // it is true only when the browser has fully decoded the
                    // image into a drawable bitmap (equivalent post-decode state).
                    if (img && img.complete && img.naturalWidth > 0 && canvas && ctx) {
                      renderFrame(canvas, ctx, img);
                    }

                    renderRequested = false;

                    // ── THROTTLED BUFFER MANAGEMENT ───────────────────────────
                    // Only run the buffer eviction/load loop when the scroll
                    // position has moved more than BUFFER_THROTTLE frames since
                    // the last run. This reduces manageBuffer from 60 calls/sec
                    // to roughly 6 calls/sec during a fast scrub, eliminating
                    // the GC churn that was causing the stutter.
                    if (Math.abs(finalIdx - lastBufferedIndex) > BUFFER_THROTTLE) {
                      lastBufferedIndex = finalIdx;
                      manageBuffer(framesRef, path, finalIdx, currentFrameCount);
                    }
                  });
                }
              }
            },
          },
        });
      });

      ScrollTrigger.refresh();
      console.log("[CanvasSequence] ✓ GSAP ScrollTrigger active.");
    }

    // ─── 7. Resize Handler — Tri-Tier Breakpoint Detection ───────────────────
    let lastWidth = window.innerWidth;

    const handleResize = () => {
      sizeCanvas();

      // Strict Width-Only Breakpoint Tracking
      if (window.innerWidth === lastWidth) {
        // Only height changed (e.g., mobile address bar collapse). Redraw current frame.
        const img = framesRef.current[currentIndex];
        if (img?.naturalWidth && canvas && ctx) renderFrame(canvas, ctx, img);
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
      const img = framesRef.current[currentIndex];
      if (img?.naturalWidth && canvas && ctx) renderFrame(canvas, ctx, img);

      // Re-center the buffer in case width change shifted the target index
      manageBuffer(framesRef, basePath, currentIndex, currentFrameCount);
    };

    // { passive: true } — doesn't block the browser's native composite thread
    window.addEventListener("resize", handleResize, { passive: true });

    // ─── 8. Initial Load ──────────────────────────────────────────────────────
    loadSequence(basePath);

    // ─── 9. Cleanup ───────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener("resize", handleResize);
      gsapCtx.revert();
      clearFrameArray(framesRef.current);
    };
  }, [
    desktopPath,
    tabletPath,
    mobilePath,
    frameCount,
    desktopFrameCount,
    tabletFrameCount,
    mobileFrameCount,
    useDocumentScroll,
    // scrollTriggerRef intentionally excluded: it is a stable RefObject whose
    // .current is read inside the effect. Including it in deps risks tearing
    // down and rebuilding the GSAP timeline mid-scroll on parent re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    end,
    mobileEnd,
    scrub,
    mobileScrub,
  ]);

  return (
    <div
      ref={containerRef}
      className={`${useDocumentScroll ? "fixed inset-0 w-full h-full pointer-events-none" : "absolute inset-0 w-full"} ${className || ""}`}
      style={useDocumentScroll ? undefined : { height: "100%" }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-screen pointer-events-none"
        aria-hidden="true"
        role="img"
        aria-label="RAKPLUS cinematic scroll sequence"
        style={{
          zIndex: -1,
          // Force a dedicated GPU compositor layer so the canvas is
          // composited independently of the DOM layer tree.
          // willChange: "contents" is correct for a canvas whose pixels
          // mutate every frame (not "transform" which reserves a transform layer).
          willChange: "contents",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}

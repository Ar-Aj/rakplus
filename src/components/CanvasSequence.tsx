"use client";

/**
 * CanvasSequence — Responsive, scroll-driven image sequence player.
 *
 * Phase 9 — Prop-Driven Multi-Page Reuse:
 * Accepts desktopPath, mobilePath, and frameCount as props so
 * any page can mount its own sequence without hardcoded paths.
 *
 * VIEWPORT MAPPING:
 *   - innerWidth < 1024  → mobilePath  (4:3 source)
 *   - innerWidth >= 1024  → desktopPath (16:9 source)
 *
 * COVER-FIT MATH (Phase 8.1):
 *   Math.max scaling + dead-center anchor = edge-to-edge fill on ALL devices.
 *   On vertical phones (9:16), the 4:3 source is cropped equally left/right
 *   keeping the core action centered. No letterboxing, no black bars.
 *
 * GSAP LIFECYCLE:
 *   ScrollTrigger is created ONLY after the first frame has successfully
 *   triggered its .onload event. No useState gates. Single useEffect.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ───

const FRAME_PREFIX = "frame_";
const FRAME_EXT = ".webp";
const DESKTOP_BREAKPOINT = 1024;

/** Build frame URL: e.g. /home-desktop/frame_0001.webp */
function frameSrc(basePath: string, index: number): string {
  return `${basePath}${FRAME_PREFIX}${String(index).padStart(4, "0")}${FRAME_EXT}`;
}

// ─── Render Function (Cover-Fit, Dead-Center Anchor) ───

/**
 * scale = Math.max(canvas.width / img.width, canvas.height / img.height)
 * Guarantees edge-to-edge fill. Cropping is symmetric around center.
 */
function renderFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement
): void {
  if (!img.naturalWidth || !img.naturalHeight) return;

  const scale = Math.max(
    canvas.width / img.naturalWidth,
    canvas.height / img.naturalHeight
  );

  const x = canvas.width / 2 - (img.naturalWidth / 2) * scale;
  const y = canvas.height / 2 - (img.naturalHeight / 2) * scale;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    x,
    y,
    img.naturalWidth * scale,
    img.naturalHeight * scale
  );
}

// ─── Component ───

interface CanvasSequenceProps {
  /** Path to desktop frames, e.g. "/home-desktop/" */
  desktopPath: string;
  /** Path to mobile frames, e.g. "/home-mobile/" */
  mobilePath: string;
  /** Exact number of frames in the sequence */
  frameCount: number;
  /** Container className */
  className?: string;
}

export default function CanvasSequence({
  desktopPath,
  mobilePath,
  frameCount,
  className,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ─── 1. Device Detection ───
    const basePath =
      window.innerWidth >= DESKTOP_BREAKPOINT ? desktopPath : mobilePath;

    console.log(
      `[CanvasSequence] ${window.innerWidth}px → ${basePath} (${frameCount} frames)`
    );

    // ─── 2. Size Canvas to Full Viewport ───
    const sizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    sizeCanvas();

    // ─── 3. Frame Storage ───
    const frames: HTMLImageElement[] = new Array(frameCount);
    let currentIndex = 0;

    // ─── 4. CRITICAL FIRST PAINT ───
    const firstImage = new Image();
    firstImage.src = frameSrc(basePath, 1);

    firstImage.onload = () => {
      frames[0] = firstImage;
      console.log(
        `[CanvasSequence] ✓ First frame painted (${firstImage.naturalWidth}×${firstImage.naturalHeight})`
      );
      renderFrame(canvas, ctx, firstImage);
      loadRemainingFrames();
    };

    firstImage.onerror = () => {
      console.error(
        `[CanvasSequence] ✗ FAILED to load first frame: "${firstImage.src}"`
      );
      loadRemainingFrames();
    };

    // ─── 5. Load Remaining Frames ───
    function loadRemainingFrames() {
      let loaded = 1;

      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        const src = frameSrc(basePath, i);
        img.src = src;

        img.onload = () => {
          frames[i - 1] = img;
          loaded++;
          if (loaded === frameCount) onAllFramesLoaded();
        };

        img.onerror = () => {
          console.warn(`[CanvasSequence] ⚠ Failed: "${src}"`);
          frames[i - 1] = new Image();
          loaded++;
          if (loaded === frameCount) onAllFramesLoaded();
        };
      }
    }

    // ─── 6. Once All Frames Are Ready → Init GSAP ───
    function onAllFramesLoaded() {
      console.log(
        `[CanvasSequence] ✓ All ${frameCount} frames loaded. Initializing GSAP.`
      );

      gsapCtx.add(() => {
        gsap.to(
          { frame: 0 },
          {
            frame: frameCount - 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              onUpdate: (self) => {
                // Strict clamping: never exceed frame bounds
                const idx = Math.min(
                  frameCount - 1,
                  Math.max(0, Math.round(self.progress * (frameCount - 1)))
                );
                if (idx !== currentIndex) {
                  currentIndex = idx;
                  const frame = frames[idx];
                  if (frame && frame.naturalWidth && canvas && ctx) {
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

    // ─── 7. Resize Handler ───
    const handleResize = () => {
      sizeCanvas();
      const frame = frames[currentIndex];
      if (frame && frame.naturalWidth && canvas && ctx) {
        renderFrame(canvas, ctx, frame);
      }
    };

    window.addEventListener("resize", handleResize);

    // ─── 8. GSAP Context for Scoped Cleanup ───
    const gsapCtx = gsap.context(() => {}, container);

    // ─── 9. Cleanup ───
    return () => {
      window.removeEventListener("resize", handleResize);
      gsapCtx.revert();
    };
  }, [desktopPath, mobilePath, frameCount]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full ${className || ""}`}
      style={{ height: "100%" }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[-1] w-full h-full"
        aria-hidden="true"
        role="img"
        aria-label="RAKPLUS cinematic scroll sequence"
      />
    </div>
  );
}

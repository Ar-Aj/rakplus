/**
 * FrameLoadTracker — Phase 52.3 / Phase R1
 *
 * A module-level singleton that tracks how many frames have been loaded by
 * CanvasSequence. Any component (e.g. Preloader) can read the progress to
 * synchronise UI with the actual decode state.
 *
 * Phase R1 additions:
 *  - `markFirstPaint()` — invoked by CanvasSequence the moment it paints
 *    frame 1 on the canvas. The Preloader uses this as the primary
 *    dismiss signal: the page is "ready to scroll" the moment the user
 *    can actually see something, not the moment N decodes are queued.
 *  - `hasFirstPaint()` — read by the Preloader to confirm the canvas
 *    has rendered at least one frame before dismissing.
 *
 * Usage:
 *   import { frameLoadTracker } from "@/hooks/useFrameLoadTracker";
 *   frameLoadTracker.reset(totalFrames);   // called at sequence start
 *   frameLoadTracker.increment();            // called when each frame loads
 *   frameLoadTracker.markFirstPaint();       // called on first canvas paint
 *   frameLoadTracker.getProgress();          // returns { loaded, total, pct }
 *   frameLoadTracker.hasFirstPaint();        // returns boolean
 */

export interface LoadProgress {
  loaded: number;
  total: number;
  pct: number; // 0–100, clamped
}

class FrameLoadTracker {
  private loaded = 0;
  private total = 0;
  private firstPaint = false;

  /**
   * Reset and seed the tracker for a new loading batch.
   * Call this before starting to load a new frame set.
   */
  reset(total: number): void {
    this.loaded = 0;
    this.total = total;
    this.firstPaint = false;
  }

  /**
   * Increment the loaded count. Safe to call multiple times per frame
   * (idempotent within a single batch).
   */
  increment(): void {
    if (this.loaded < this.total) {
      this.loaded = Math.min(this.loaded + 1, this.total);
    }
  }

  /**
   * Returns the current progress snapshot.
   */
  getProgress(): LoadProgress {
    const pct = this.total > 0
      ? Math.min(Math.round((this.loaded / this.total) * 100), 100)
      : 0;
    return { loaded: this.loaded, total: this.total, pct };
  }

  /**
   * Returns true when all frames are loaded.
   */
  isComplete(): boolean {
    return this.total > 0 && this.loaded >= this.total;
  }

  /**
   * Phase R1: mark that the canvas has rendered its first frame at
   * least once. Idempotent. The Preloader polls `hasFirstPaint()`
   * alongside `loaded` to dismiss on the meaningful "user can see
   * something" signal rather than the brittle "N decodes confirmed"
   * signal.
   */
  markFirstPaint(): void {
    this.firstPaint = true;
  }

  /**
   * Returns true once `markFirstPaint()` has been called at least once
   * during this tracker's lifetime (since the last `reset()`).
   */
  hasFirstPaint(): boolean {
    return this.firstPaint;
  }
}

export const frameLoadTracker = new FrameLoadTracker();

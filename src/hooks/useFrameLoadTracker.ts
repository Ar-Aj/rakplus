/**
 * FrameLoadTracker — PRODUCTION HOTFIX (Route-Aware Frame Readiness Hub)
 *
 * A module-level singleton that is the SINGLE SOURCE OF TRUTH for
 * "is the canvas sequence on this route actually ready to be shown?".
 *
 * ── WHAT WAS BROKEN (Phase 57 diagnosis) ──────────────────────────────────
 * This tracker was written with a full producer API (`reset`, `increment`,
 * `markFirstPaint`) but **nothing in the codebase ever called them**. The
 * only consumer was `Preloader.tsx`, which reads `total` — permanently 0.
 * Every ratio-based dismiss branch was dead code guarded by `total > 0`, so
 * the Preloader ran purely on its 4 s / 12 s wall-clock timers and showed a
 * progress bar that had no relationship to real decode state.
 *
 * `CanvasSequence` now actually reports here, which makes the tracker's
 * `criticalReady` / `gpuWarmed` signals real.
 *
 * ── SESSION GENERATIONS (why this matters) ───────────────────────────────
 * Route changes overlap: the OLD page's in-flight `onload` callbacks can
 * fire *after* the NEW page has called `reset()`. Without a guard, Home's
 * late decodes would increment Innovation's counters and dismiss
 * Innovation's Preloader against Home's frames.
 *
 * Every `reset()` mints a new monotonically-increasing `session` number.
 * Callers capture the session when they *start* loading and pass it back on
 * every report; a report whose session is stale is discarded outright.
 *
 * ── CONSUMERS ────────────────────────────────────────────────────────────
 *   CanvasSequence → reset / notifyFrameLoaded / markFirstPaint /
 *                    markCriticalReady / markGpuWarmed / markAborted
 *   Preloader      → getProgress / isCriticalReady / isGpuWarmed /
 *                    hasFirstPaint / isRouteReady
 */

/** Normalise a Next.js `usePathname()` value to a bare route key.
 *  `/innovation/`, `/innovation`, and `/innovation` all collapse to
 *  `/innovation`. The site root collapses to `/`. */
export function normalizeRoute(pathname: string | null | undefined): string {
  if (!pathname) return "/";
  // Strip query/hash defensively — usePathname() shouldn't include them, but
  // a future routing change must not be able to silently miss the Preloader.
  const clean = pathname.split("?")[0].split("#")[0];
  if (clean === "/" || clean === "") return "/";
  return clean.replace(/\/+$/, "") || "/";
}

/** The four routes that mount a `<CanvasSequence />`.
 *  Any other route (products, contact, terms, locations…) must NOT be
 *  blocked by the frame Preloader — it would stall navigation for nothing. */
export const CANVAS_ROUTES: ReadonlySet<string> = new Set([
  "/",
  "/innovation",
  "/sustainability",
  "/about",
]);

/** True when `pathname` is one of the canvas-sequence routes. */
export function isCanvasRoute(pathname: string | null | undefined): boolean {
  return CANVAS_ROUTES.has(normalizeRoute(pathname));
}

export interface LoadProgress {
  loaded: number;
  total: number;
  pct: number; // 0–100, clamped
  /** Frames in the "must be ready before we dismiss" critical set. */
  criticalTotal: number;
  criticalLoaded: number;
  /** 0–100 progress of the critical set specifically. */
  criticalPct: number;
  /** Whether every critical frame has finished loading AND decoding. */
  criticalReady: boolean;
  /** Whether the off-screen GPU texture warm-up pass has completed. */
  gpuWarmed: boolean;
  /** Whether the canvas has painted at least one visible frame. */
  firstPaint: boolean;
  /** True once firstPaint && criticalReady && gpuWarmed for the CURRENT route. */
  routeReady: boolean;
  /** True when the sequence was torn down (route change) before completing. */
  aborted: boolean;
}

class FrameLoadTracker {
  private loaded = 0;
  private total = 0;

  private criticalLoaded = 0;
  private criticalTotal = 0;

  private firstPaint = false;
  private gpuWarmed = false;
  private aborted = false;

  private route = "";
  private session = 0;

  // ── Reset for a new route / new frame set ────────────────────────────────
  /**
   * Mint a new session and clear all readiness state.
   *
   * This is what makes the Preloader re-appear on every canvas route: the
   * consumer watches `session` change, and a change means "a new sequence is
   * loading, show the overlay again".
   *
   * @returns the new session number — the caller MUST pass it back on every
   *          subsequent report so stale callbacks from a previous route are
   *          ignored.
   */
  reset(total: number, criticalTotal = 0, route = ""): number {
    this.session += 1;
    this.loaded = 0;
    this.total = Math.max(0, total);
    this.criticalLoaded = 0;
    this.criticalTotal = Math.max(0, Math.min(criticalTotal, this.total));
    this.firstPaint = false;
    this.gpuWarmed = false;
    this.aborted = false;
    this.route = route;
    return this.session;
  }

  /** Current session number. Callers capture this at load start. */
  getSession(): number {
    return this.session;
  }

  getRoute(): string {
    return this.route;
  }

  /** True when `session` is the live one (not a stale async callback). */
  isCurrent(session: number): boolean {
    return session === this.session;
  }

  /** Report that one frame finished loading + decoding. */
  notifyFrameLoaded(session: number, critical = false): void {
    if (!this.isCurrent(session)) return;
    if (this.loaded < this.total) this.loaded += 1;
    if (critical && this.criticalLoaded < this.criticalTotal) this.criticalLoaded += 1;
  }

  /**
   * Report that the critical startup buffer is 100% loaded AND decoded.
   * Distinct from a ratio threshold — this is the "every single startup
   * frame is confirmed" signal Pillar 3 requires.
   */
  markCriticalReady(session: number): void {
    if (!this.isCurrent(session)) return;
    this.criticalLoaded = this.criticalTotal;
    this.criticalReadyFlag = true;
  }

  private criticalReadyFlag = false;

  /**
   * Report that the hidden off-screen GPU texture warm-up pass finished.
   * The Preloader holds `lenis.stop()` until this lands, so the user never
   * starts scrolling against cold GPU textures.
   */
  markGpuWarmed(session: number): void {
    if (!this.isCurrent(session)) return;
    this.gpuWarmed = true;
  }

  /** Mark that the sequence was torn down before completing (route change). */
  markAborted(session: number): void {
    if (!this.isCurrent(session)) return;
    this.aborted = true;
    this.gpuWarmed = false;
    this.criticalReadyFlag = false;
  }

  markFirstPaint(session?: number): void {
    if (session !== undefined && !this.isCurrent(session)) return;
    this.firstPaint = true;
  }

  hasFirstPaint(): boolean {
    return this.firstPaint;
  }

  isCriticalReady(): boolean {
    return this.criticalReadyFlag || (this.criticalTotal > 0 && this.criticalLoaded >= this.criticalTotal);
  }

  isGpuWarmed(): boolean {
    return this.gpuWarmed;
  }

  isAborted(): boolean {
    return this.aborted;
  }

  /**
   * True once the session has been superseded or torn down before finishing
   * (i.e. the user switched routes mid-load). Exposed on the progress
   * snapshot as `aborted` so the Preloader can get out of the way
   * immediately instead of waiting out a fallback timer.
   */
  abortedSeen(): boolean {
    return this.aborted;
  }

  /** The dismiss signal: visible AND all critical frames decoded AND GPU warm. */
  isRouteReady(): boolean {
    return this.firstPaint && this.isCriticalReady() && this.gpuWarmed;
  }

  getProgress(): LoadProgress {
    const pct =
      this.total > 0
        ? Math.min(Math.round((this.loaded / this.total) * 100), 100)
        : 0;
    const criticalPct =
      this.criticalTotal > 0
        ? Math.min(Math.round((this.criticalLoaded / this.criticalTotal) * 100), 100)
        : 0;
    return {
      loaded: this.loaded,
      total: this.total,
      pct,
      criticalTotal: this.criticalTotal,
      criticalLoaded: this.criticalLoaded,
      criticalPct,
      criticalReady: this.isCriticalReady(),
      gpuWarmed: this.gpuWarmed,
      firstPaint: this.firstPaint,
      routeReady: this.isRouteReady(),
      aborted: this.aborted,
    };
  }

  isComplete(): boolean {
    return this.total > 0 && this.loaded >= this.total;
  }
}

export const frameLoadTracker = new FrameLoadTracker();
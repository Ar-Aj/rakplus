/**
 * HudOverlayPanel — Swiss-grid asymmetric HUD panels.
 *
 * Replaces the repetitive stacked quote boxes inside `<div ref={sequenceRef}>`
 * with an asymmetric grid of telemetry panels that DO NOT obstruct the
 * center of the 3D pipe animation.
 *
 *   • Desktop:  panels snap to top-left, top-right, bottom-left, bottom-right
 *               corners. Each is sized differently (Swiss 12-col grid) for
 *               compositional tension.
 *   • Tablet:   two columns along the bottom edge.
 *   • Mobile:   single bottom-sheet, draggable, never covering the 3D pipe
 *               canvas (renders UNDER the canvas in z-order; canvas remains
 *               clear in the center).
 *
 * Animation: GSAP staggered character/line reveals driven by the parent's
 * scroll scrub. Pointer events on the panels themselves are normal so
 * users can interact; the rest of the canvas accepts pointer events.
 */

import HudTelemetryBadge from "@/components/ui/HudTelemetryBadge";
import EngineeringSpecCard from "@/components/ui/EngineeringSpecCard";
import { ArrowUpRight } from "lucide-react";

export interface HudPanelData {
  /** Position on the Swiss 12-col grid. */
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "bottom-bar"
    | "bottom-sheet";
  /** Small monospace overline (e.g. "PN20 / SDR6"). */
  overline?: string;
  /** Display headline (e.g. "50 years of life guaranteed"). */
  headline: string;
  /** Body copy. */
  body?: string;
  /** Optional action link. */
  cta?: { href: string; label: string };
  /** Optional telemetry pills. */
  pills?: Array<{
    label: string;
    value: string | number;
    unit?: string;
  }>;
  /** Visual variant. */
  variant?: "dark-glass" | "brass-accent";
}

const POSITION_CLASSES: Record<HudPanelData["position"], string> = {
  "top-left":
    "md:col-start-1 md:col-end-5 md:row-start-1 md:row-end-2",
  "top-right":
    "md:col-start-8 md:col-end-13 md:row-start-1 md:row-end-2",
  "bottom-left":
    "md:col-start-1 md:col-end-5 md:row-start-3 md:row-end-4",
  "bottom-right":
    "md:col-start-8 md:col-end-13 md:row-start-3 md:row-end-4",
  "bottom-bar": "md:col-start-1 md:col-end-13 md:row-start-4 md:row-end-5",
  "bottom-sheet": "md:col-start-1 md:col-end-13 md:row-start-4 md:row-end-5",
};

export interface HudOverlayPanelProps {
  panels: HudPanelData[];
  className?: string;
}

export default function HudOverlayPanel({
  panels,
  className = "",
}: HudOverlayPanelProps) {
  return (
    <div
      className={[
        "hud-overlay-grid grid grid-cols-1 md:grid-cols-12",
        "grid-rows-1 md:grid-rows-4 gap-3 md:gap-4",
        "w-full h-full",
        className,
      ].join(" ")}
      data-hud-overlay
    >
      {panels.map((panel, i) => (
        <div
          key={i}
          className={[
            POSITION_CLASSES[panel.position],
            "hud-overlay-panel relative",
          ].join(" ")}
        >
          <EngineeringSpecCard
            variant={panel.variant ?? "dark-glass"}
            overline={panel.overline}
            headline={panel.headline}
            footer={panel.cta?.label}
            className="h-full"
          >
            {panel.body && (
              <p className="text-sm md:text-base leading-relaxed">
                {panel.body}
              </p>
            )}

            {panel.pills && panel.pills.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {panel.pills.map((pill) => (
                  <HudTelemetryBadge
                    key={pill.label}
                    variant="dark-glass"
                    label={pill.label}
                    value={pill.value}
                    unit={pill.unit}
                  />
                ))}
              </div>
            )}

            {panel.cta && (
              <a
                href={panel.cta.href}
                className="mt-4 inline-flex items-center gap-2 text-emerald text-xs font-mono uppercase tracking-[0.25em] font-bold hover:text-emerald-dark transition-colors"
              >
                {panel.cta.label}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </EngineeringSpecCard>
        </div>
      ))}
    </div>
  );
}
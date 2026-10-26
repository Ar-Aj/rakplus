/**
 * HudTelemetryBadge — Compact HUD telemetry pill.
 *
 * Used inside HUD overlays for tight data readouts (e.g. "PN25 · SDR 5").
 * Three variants map to the EngineeringSpecCard system:
 *   • dark-glass  — over canvas, sapphire rim
 *   • swiss-grid  — over light technical surfaces, monospace
 *   • brass-accent — for "100% Brass" insert data points
 */

import { type ReactNode } from "react";
import type { EngineeringSpecCardVariant } from "./EngineeringSpecCard";

export interface HudTelemetryBadgeProps {
  /** Monospace label (e.g. "PRESSURE CLASS"). */
  label: string;
  /** Display value (e.g. "PN25"). */
  value: ReactNode;
  /** Optional unit suffix (e.g. "bar"). */
  unit?: string;
  /** Visual variant — defaults to swiss-grid for editorial readability. */
  variant?: EngineeringSpecCardVariant;
  /** Optional extra classes. */
  className?: string;
}

const VARIANT_STYLES: Record<
  EngineeringSpecCardVariant,
  { container: string; label: string; value: string; unit: string }
> = {
  "dark-glass": {
    container:
      "bg-pitch-black/85 backdrop-blur-md border border-white/10 text-studio-white",
    label: "text-crimson",
    value: "text-studio-white font-sans font-extrabold tracking-tighter",
    unit: "text-studio-white/60 font-mono",
  },
  "swiss-grid": {
    container:
      "bg-studio-white border border-neutral-900/10 text-ink corner-crosshairs",
    label: "text-crimson font-semibold",
    value: "text-pitch-black font-sans font-extrabold tracking-tighter",
    unit: "text-neutral-600 font-mono",
  },
  "brass-accent": {
    container:
      "bg-studio-white border border-brass/40 text-ink corner-crosshairs",
    label: "text-crimson font-semibold",
    value: "text-pitch-black font-sans font-extrabold tracking-tighter",
    unit: "text-neutral-600 font-mono",
  },
};

export default function HudTelemetryBadge({
  label,
  value,
  unit,
  variant = "swiss-grid",
  className = "",
}: HudTelemetryBadgeProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      className={[
        styles.container,
        "flex flex-col gap-1 px-4 py-3 min-w-0 overflow-hidden corner-crosshairs",
        className,
      ].join(" ")}
      data-hud-telemetry={variant}
    >
      <span
        className={[
          styles.label,
          "text-[10px] font-mono uppercase tracking-[0.25em]",
        ].join(" ")}
      >
        {label}
      </span>
      <span className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 min-w-0">
        <span
          className={[
            styles.value,
            "text-2xl md:text-3xl font-bold tabular-nums leading-none",
          ].join(" ")}
        >
          {value}
        </span>
        {unit && (
          <span
            className={[
              styles.unit,
              "text-[11px] uppercase tracking-widest break-words",
            ].join(" ")}
          >
            {unit}
          </span>
        )}
      </span>
    </div>
  );
}
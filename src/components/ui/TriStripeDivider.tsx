/**
 * TriStripeDivider — Black · Red · Yellow architectural divider bar.
 *
 * The signature RakPlus ROHRSYSTEME German-standard identity tri-stripe
 * (Pitch Black / Crimson Red / Signal Yellow) that sits under major
 * headings and section breaks across the site. Matches the 4-color
 * palette lockup: Black (#0A0A0A) · Red (#DC2626) · Yellow (#FACC15) ·
 * White (#FAFAFA).
 */

import { type CSSProperties } from "react";

export interface TriStripeDividerProps {
  /** Tailwind/CSS classes for the outer wrapper. */
  className?: string;
  /** Tailwind/CSS classes for the bar itself (size, etc). */
  barClassName?: string;
  /** Override the default stripe colors (for light-theme variants). */
  colors?: [string, string, string];
  /** Optional monospace label rendered to the right of the bar. */
  label?: string;
}

const DEFAULT_COLORS: [string, string, string] = [
  "#0A0A0A",
  "#DC2626",
  "#FACC15",
];

export default function TriStripeDivider({
  className = "",
  barClassName = "h-1 w-24",
  colors = DEFAULT_COLORS,
  label,
}: TriStripeDividerProps) {
  const wrapperStyle: CSSProperties = {};
  return (
    <div
      className={["flex items-center gap-3", className].join(" ")}
      aria-hidden={!label}
      data-tri-stripe
    >
      <div
        className={["flex overflow-hidden", barClassName].join(" ")}
        style={{
          ...wrapperStyle,
        }}
      >
        <span
          className="flex-1"
          style={{ backgroundColor: colors[0] }}
          aria-hidden="true"
        />
        <span
          className="flex-1"
          style={{ backgroundColor: colors[1] }}
          aria-hidden="true"
        />
        <span
          className="flex-1"
          style={{ backgroundColor: colors[2] }}
          aria-hidden="true"
        />
      </div>
      {label && (
        <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-pitch-black/70">
          {label}
        </span>
      )}
    </div>
  );
}

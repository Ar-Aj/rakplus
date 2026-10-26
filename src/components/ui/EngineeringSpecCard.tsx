/**
 * EngineeringSpecCard — Polymorphic spec callout card.
 *
 * Variants:
 *   • swiss-grid    — DEFAULT: light-luxury alabaster panel with hairline
 *                     border, monospace DIN labels, deep pitch-black
 *                     display typography, emerald + brass accents.
 *                     (Matches the new light-theme futuristic infographic
 *                     design system — Apple M-Series / Polestar reference.)
 *   • dark-glass    — pitch-black obsidian panel with sapphire rim-lighting,
 *                     used for editorial HUD overlays over canvas.
 *   • brass-accent  — emerald-bordered panel with brass accents, used for
 *                     "100% Brass" insert callouts.
 *
 * Every variant carries:
 *   • 1px specular border (border-white/10 or border-neutral-900/10)
 *   • corner crosshair micro-markers (via .corner-crosshairs utility)
 *   • monospace DIN 8077/8078 metadata label (overline)
 */

import { type ReactNode } from "react";

export type EngineeringSpecCardVariant =
  | "dark-glass"
  | "swiss-grid"
  | "brass-accent";

export interface EngineeringSpecCardProps {
  variant?: EngineeringSpecCardVariant;
  /** Small overline label rendered in monospace (e.g. "DIN 8077/8078"). */
  overline?: string;
  /** Optional eyebrow value shown before the headline (e.g. "PN20"). */
  eyebrow?: string;
  /** Headline copy (display font, tight tracking). */
  headline?: ReactNode;
  /** Body copy. */
  children?: ReactNode;
  /** Optional monospace footer caption. */
  footer?: string;
  /** Adds `.corner-crosshairs` micro-markers (default: true). */
  withCrosshairs?: boolean;
  /** Optional extra Tailwind classes. */
  className?: string;
}

const VARIANT_STYLES: Record<
  EngineeringSpecCardVariant,
  {
    container: string;
    overline: string;
    eyebrow: string;
    headline: string;
    body: string;
    footer: string;
  }
> = {
  "dark-glass": {
    container:
      "relative bg-pitch-black/85 backdrop-blur-xl border border-white/10 text-studio-white",
    overline: "text-crimson",
    eyebrow: "text-brass",
    headline: "text-studio-white font-sans font-extrabold tracking-tighter",
    body: "text-studio-white/75",
    footer: "text-studio-white/40 border-t border-white/10",
  },
  "swiss-grid": {
    container:
      "relative bg-studio-white border border-neutral-900/10 text-ink corner-crosshairs",
    overline: "text-crimson font-semibold",
    eyebrow: "text-emerald-700",
    headline: "text-pitch-black font-sans font-extrabold tracking-tighter",
    body: "text-neutral-800",
    footer: "text-neutral-600 border-t border-neutral-900/10",
  },
  "brass-accent": {
    container:
      "relative bg-studio-white backdrop-blur-md border border-brass/40 text-ink corner-crosshairs",
    overline: "text-crimson font-semibold",
    eyebrow: "text-emerald-700",
    headline: "text-pitch-black font-sans font-extrabold tracking-tighter",
    body: "text-neutral-800",
    footer: "text-neutral-600 border-t border-brass/30",
  },
};

export default function EngineeringSpecCard({
  variant = "swiss-grid",
  overline,
  eyebrow,
  headline,
  children,
  footer,
  withCrosshairs = true,
  className = "",
}: EngineeringSpecCardProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <article
      className={[
        // Top-border German tri-stripe accent: Pitch Black 60% /
        // Crimson Red 20% / Signal Yellow 20%. Renders as a 3px
        // hairline divider above every spec card. The tri-stripe
        // gives the swiss-grid and brass-accent variants the
        // unmistakable ROHRSYSTEME identity.
        styles.container,
        "relative pt-7 md:pt-8 rounded-none p-6 md:p-7",
        withCrosshairs ? "corner-crosshairs" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-engineering-spec-card={variant}
    >
      {/* Top-border German tri-stripe accent bar.
          60% black · 20% red · 20% yellow — the signature RakPlus
          ROHRSYSTEME divider applied to every spec card. */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] flex pointer-events-none"
        aria-hidden="true"
      >
        <span className="flex-[6] bg-[#0A0A0A]" />
        <span className="flex-[2] bg-[#DC2626]" />
        <span className="flex-[2] bg-[#FACC15]" />
      </div>
      {overline && (
        <p
          className={[
            styles.overline,
            "text-[10px] md:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] mb-3",
          ].join(" ")}
        >
          {overline}
        </p>
      )}

      {eyebrow && (
        <p
          className={[
            styles.eyebrow,
            "text-xs font-mono font-bold uppercase tracking-[0.2em] mb-2",
          ].join(" ")}
        >
          {eyebrow}
        </p>
      )}

      {headline && (
        <h3
          className={[
            styles.headline,
            "text-xl md:text-2xl lg:text-3xl font-bold leading-[0.95] mb-3",
          ].join(" ")}
        >
          {headline}
        </h3>
      )}

      {children && (
        <div
          className={[
            styles.body,
            "text-sm md:text-base leading-relaxed font-medium",
          ].join(" ")}
        >
          {children}
        </div>
      )}

      {footer && (
        <p
          className={[
            styles.footer,
            "mt-4 pt-3 text-[10px] font-mono uppercase tracking-[0.2em]",
          ].join(" ")}
        >
          {footer}
        </p>
      )}
    </article>
  );
}
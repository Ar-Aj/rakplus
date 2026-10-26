/**
 * FuturisticProductShowcaseCard — Light-Theme Glassmorphic Infographic Wrapper
 *
 * The reusable product-image wrapper for the new Light-Theme Futuristic
 * Infographic UI overhaul. Wraps each `<img>` with live, interactive
 * HTML/CSS floating glassmorphic telemetry badges, SVG CAD callout
 * lines, and DIN spec pills — so the futuristic informative engineering
 * data cards render natively in the UI even before/after the AI image
 * loads.
 *
 * Three placements (all defined by the v4 IMAGE_GENERATION_MANIFEST.md):
 *   1. "hero"           — full-bleed image with 4 corner glass badges + 1 leader line
 *   2. "bento"          — square image with side-panel glass card + 2 corner badges
 *   3. "knolling"       — wide image with bottom-strip spec rail + center title
 *
 * Visual System (matches the Light-Theme v4 manifest):
 *   • Studio white alabaster (#FAFAFA / #F2F4F3) surface
 *   • Frosted-white glassmorphic cards (backdrop-blur + white/70 + 1px hairline)
 *   • Emerald-600 (#059669) accents for engineering data
 *   • Brass #C59B27 accents for 100% Brass callouts
 *   • Pitch-black #0A0A0A Clash Display typography
 *   • 1px hairline grids in neutral-900/10
 *   • Subtle isometric blueprint grid behind the image
 *   • Thin SVG CAD leader lines connecting badges to the product safe zone
 *
 * All spec data is sourced from the RakPlus catalogue / verified brand
 * claims (4 strict claims: 100% Polymer, 100% Brass, WRAS, 50-year life).
 * No invented certifications. No invented dimensions.
 */

import Image from "next/image";
import { type ReactNode } from "react";

/* ─── Public types ──────────────────────────────────────────────────── */

export type FuturisticShowcaseVariant = "hero" | "bento" | "knolling";

/** A single floating glassmorphic HUD badge. */
export interface ShowcaseBadge {
  /** Monospace overline / data label (e.g. "DIN 8077/78"). */
  label: string;
  /** Big display value (e.g. "PN20"). */
  value: string;
  /** Optional unit suffix (e.g. "bar"). */
  unit?: string;
  /** Position on the 3×3 grid. */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  /** Accent color: emerald (default) or brass. */
  accent?: "emerald" | "brass" | "sapphire" | "amber";
}

/** A thin SVG CAD leader line connecting a badge to a product anchor. */
export interface ShowcaseLeader {
  /** Anchor point on the product (percent of image area). */
  anchor: { x: number; y: number };
  /** Endpoint on the badge (percent of card area). */
  endpoint: { x: number; y: number };
  /** Accent color. */
  accent?: "emerald" | "brass" | "sapphire" | "amber";
}

/** A floating info card (translucent, headline + body). */
export interface ShowcaseInfoCard {
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-bar"
    | "bottom-bar";
  overline?: string;
  headline: string;
  body?: string;
  accent?: "emerald" | "brass" | "sapphire" | "amber";
}

export interface FuturisticProductShowcaseCardProps {
  /** Image source (relative to /public, or remote URL). */
  src: string;
  /** Required alt text for SEO + a11y. */
  alt: string;
  /** Image intrinsic dimensions (for next/image layout). */
  width: number;
  height: number;
  /** Visual variant — drives badge geometry. */
  variant?: FuturisticShowcaseVariant;
  /** Optional title / overline above the image (rendered in HTML, not the image). */
  title?: string;
  /** Optional kicker (small monospace tag above the title). */
  kicker?: string;
  /** Optional caption below the image. */
  caption?: string;
  /** Floating glassmorphic badges (1–8). */
  badges?: ShowcaseBadge[];
  /** Thin CAD leader lines (1–6). */
  leaders?: ShowcaseLeader[];
  /** Optional floating info card (1 max per card for "bento"). */
  infoCard?: ShowcaseInfoCard;
  /** Optional classes for the outer wrapper. */
  className?: string;
  /** Pass priority to next/image (for above-the-fold placements). */
  priority?: boolean;
  /** sizes attribute for next/image. */
  sizes?: string;
  /** Children: optional overlay content slot (renders absolute on top of image). */
  children?: ReactNode;
}

/* ─── Style tokens (locked to the light-luxury design system) ──────── */

const ACCENT_BADGE: Record<
  NonNullable<ShowcaseBadge["accent"]>,
  { ring: string; value: string; dot: string; label: string }
> = {
  emerald: {
    ring: "border-emerald-600/40",
    value: "text-emerald-600",
    dot: "bg-emerald-600",
    label: "text-emerald-700",
  },
  brass: {
    ring: "border-brass/40",
    value: "text-brass-dark",
    dot: "bg-brass",
    label: "text-brass-dark",
  },
  sapphire: {
    ring: "border-sapphire/40",
    value: "text-sapphire",
    dot: "bg-sapphire",
    label: "text-sapphire",
  },
  amber: {
    ring: "border-amber-500/40",
    value: "text-amber-600",
    dot: "bg-amber-500",
    label: "text-amber-700",
  },
};

const POSITION_CLASSES: Record<
  NonNullable<ShowcaseBadge["position"]>,
  string
> = {
  "top-left": "top-3 left-3 md:top-5 md:left-5",
  "top-center": "top-3 left-1/2 -translate-x-1/2 md:top-5",
  "top-right": "top-3 right-3 md:top-5 md:right-5",
  "center-left": "top-1/2 -translate-y-1/2 left-3 md:left-5",
  "center-right": "top-1/2 -translate-y-1/2 right-3 md:right-5",
  "bottom-left": "bottom-3 left-3 md:bottom-5 md:left-5",
  "bottom-center": "bottom-3 left-1/2 -translate-x-1/2 md:bottom-5",
  "bottom-right": "bottom-3 right-3 md:bottom-5 md:right-5",
};

const INFOCARD_POSITION_CLASSES: Record<
  ShowcaseInfoCard["position"],
  string
> = {
  "top-left": "top-3 left-3 md:top-6 md:left-6 max-w-[260px]",
  "top-right": "top-3 right-3 md:top-6 md:right-6 max-w-[260px]",
  "bottom-left": "bottom-3 left-3 md:bottom-6 md:left-6 max-w-[260px]",
  "bottom-right": "bottom-3 right-3 md:bottom-6 md:right-6 max-w-[260px]",
  "top-bar":
    "top-3 left-3 right-3 md:top-6 md:left-6 md:right-6 flex flex-col md:flex-row md:items-center",
  "bottom-bar":
    "bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 flex flex-col md:flex-row md:items-center",
};

/* ─── Sub-components ────────────────────────────────────────────────── */

function ShowcaseBadgeChip({ badge }: { badge: ShowcaseBadge }) {
  const a = ACCENT_BADGE[badge.accent ?? "emerald"];
  return (
    <div
      className={[
        "group/badge relative",
        "inline-flex flex-col gap-0.5",
        "px-3 py-2 md:px-3.5 md:py-2.5",
        "bg-white/70 backdrop-blur-xl",
        "border", a.ring,
        "shadow-[0_8px_28px_-12px_rgba(10,10,10,0.18)]",
        "corner-crosshairs",
      ].join(" ")}
      data-showcase-badge
    >
      <span
        className={[
          "flex items-center gap-1.5",
          "text-[9px] md:text-[10px] font-mono uppercase tracking-[0.25em] font-bold",
          a.label,
        ].join(" ")}
      >
        <span className={["w-1 h-1 rounded-full", a.dot].join(" ")} />
        {badge.label}
      </span>
      <span className="flex items-baseline gap-1">
        <span
          className={[
            "font-sans font-extrabold tabular-nums leading-none tracking-tighter",
            "text-base md:text-xl",
            a.value,
          ].join(" ")}
        >
          {badge.value}
        </span>
        {badge.unit && (
          <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-neutral-900/60">
            {badge.unit}
          </span>
        )}
      </span>
    </div>
  );
}

function ShowcaseInfoCardPanel({ card }: { card: ShowcaseInfoCard }) {
  const a = ACCENT_BADGE[card.accent ?? "emerald"];
  return (
    <article
      className={[
        "relative",
        "bg-white/80 backdrop-blur-xl",
        "border border-neutral-900/10",
        "p-4 md:p-5",
        "shadow-[0_18px_48px_-18px_rgba(10,10,10,0.22)]",
        "corner-crosshairs",
      ].join(" ")}
      data-showcase-info
    >
      {card.overline && (
        <p
          className={[
            "text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.25em] mb-1.5",
            a.label,
          ].join(" ")}
        >
          {card.overline}
        </p>
      )}
      <h3 className="font-sans font-extrabold text-neutral-900 text-base md:text-lg leading-[0.95] tracking-tighter mb-1.5">
        {card.headline}
      </h3>
      {card.body && (
        <p className="text-xs md:text-[13px] leading-snug text-neutral-900/75 font-medium">
          {card.body}
        </p>
      )}
    </article>
  );
}

function ShowcaseLeaderOverlay({
  leaders,
  className = "",
}: {
  leaders: ShowcaseLeader[];
  className?: string;
}) {
  return (
    <svg
      className={[
        "absolute inset-0 w-full h-full pointer-events-none",
        "text-emerald-600/60",
        className,
      ].join(" ")}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {leaders.map((leader, i) => {
        const color =
          leader.accent === "brass"
            ? "text-brass/70"
            : leader.accent === "sapphire"
            ? "text-sapphire/60"
            : leader.accent === "amber"
            ? "text-amber-500/60"
            : "text-emerald-600/60";
        return (
          <g key={i} className={color}>
            <line
              x1={leader.anchor.x}
              y1={leader.anchor.y}
              x2={leader.endpoint.x}
              y2={leader.endpoint.y}
              stroke="currentColor"
              strokeWidth="0.18"
              strokeDasharray="0.6 0.6"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={leader.anchor.x}
              cy={leader.anchor.y}
              r="0.5"
              fill="currentColor"
            />
            <circle
              cx={leader.endpoint.x}
              cy={leader.endpoint.y}
              r="0.5"
              fill="currentColor"
            />
          </g>
        );
      })}
    </svg>
  );
}

function BlueprintGrid() {
  /* Faint isometric-style micro-grid behind the image. Pure CSS — no DOM noise. */
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.18]"
      aria-hidden="true"
      // eslint-disable-next-line react/forbid-dom-props -- decorative blueprint grid
      style={{
        backgroundImage: [
          "linear-gradient(to right, #0A0A0A 1px, transparent 1px)",
          "linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "48px 48px",
      }}
    />
  );
}

/* ─── Main component ────────────────────────────────────────────────── */

export default function FuturisticProductShowcaseCard({
  src,
  alt,
  width,
  height,
  variant = "hero",
  title,
  kicker,
  caption,
  badges = [],
  leaders = [],
  infoCard,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px",
  children,
}: FuturisticProductShowcaseCardProps) {
  const isKnolling = variant === "knolling";

  return (
    <figure
      className={[
        "relative w-full",
        "bg-studio-white",
        "border border-neutral-900/10",
        "corner-crosshairs",
        "overflow-hidden",
        className,
      ].join(" ")}
      data-futuristic-showcase={variant}
    >
      {/* Optional kicker / title above the image */}
      {(kicker || title) && (
        <header
          className={[
            "relative z-20",
            "flex flex-col gap-1",
            "px-5 md:px-7 pt-5 md:pt-6 pb-3 md:pb-4",
            "border-b border-neutral-900/10",
            "bg-studio-white",
          ].join(" ")}
        >
          {kicker && (
            <p className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-emerald-600">
              // {kicker}
            </p>
          )}
          {title && (
            <h3 className="font-sans font-extrabold text-pitch-black text-lg md:text-xl leading-[0.95] tracking-tighter">
              {title}
            </h3>
          )}
        </header>
      )}

      {/* Image + overlay layer */}
      <div
        className={[
          "relative w-full",
          isKnolling ? "aspect-[21/9]" : "aspect-square",
          "bg-concrete-light",
        ].join(" ")}
      >
        {/* Faint blueprint grid (purely decorative, behind image) */}
        <BlueprintGrid />

        {/* The actual image — left/right/center anchored */}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={[
            "relative z-10",
            "w-full h-full",
            "object-cover object-center",
          ].join(" ")}
        />

        {/* CAD leader lines layer (between image and badges so badges sit above) */}
        {leaders.length > 0 && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            <ShowcaseLeaderOverlay leaders={leaders} />
          </div>
        )}

        {/* Glassmorphic badges */}
        {badges.length > 0 && (
          <div className="absolute inset-0 z-30 pointer-events-none">
            {badges.map((badge, i) => (
              <div
                key={`${badge.label}-${badge.value}-${i}`}
                className={[
                  "absolute pointer-events-auto",
                  POSITION_CLASSES[badge.position ?? "top-left"],
                ].join(" ")}
              >
                <ShowcaseBadgeChip badge={badge} />
              </div>
            ))}
          </div>
        )}

        {/* Floating info card (only one allowed per showcase) */}
        {infoCard && (
          <div
            className={[
              "absolute z-30",
              INFOCARD_POSITION_CLASSES[infoCard.position],
            ].join(" ")}
          >
            <ShowcaseInfoCardPanel card={infoCard} />
          </div>
        )}

        {/* Custom children slot (e.g. legacy right-side note) */}
        {children && (
          <div className="absolute inset-0 z-30 pointer-events-none">
            {children}
          </div>
        )}
      </div>

      {/* Optional caption below the image */}
      {caption && (
        <figcaption
          className={[
            "relative z-20",
            "px-5 md:px-7 py-3 md:py-4",
            "border-t border-neutral-900/10",
            "bg-studio-white",
            "text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-neutral-900/60",
          ].join(" ")}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * EditorialAboveTheFold — Generic pre-canvas editorial hero.
 *
 * Used by Innovation, Sustainability, and About pages. Renders ABOVE
 * `<CanvasSequence />` so it naturally delays the 3D sequence entry
 * without modifying the locked canvas component.
 *
 * Variants:
 *   • "innovation"  — emerald + brass + monospace engineering markers
 *   • "sustainability" — concrete-light + emerald accents
 *   • "about" — pitch-black + brass + observatory palette
 *
 * Layout (Fix 2 · 12-col desktop split):
 *   • Mobile / tablet (<1024px): stacked — text → image.
 *   • Laptop / desktop (lg: >= 1024px): side-by-side grid
 *     `grid-cols-1 lg:grid-cols-12 lg:items-center gap-8 lg:gap-12`
 *     with text in `lg:col-span-7` and a strict 1:1 square image in
 *     `lg:col-span-5`.
 *
 * Color (Fix 3 · German-Standard):
 *   • Each Hero H1 is a 3-line block:
 *       Line 1: Pitch Black (#0A0A0A)
 *       Line 2: German Crimson Red (#DC2626)
 *       Line 3: Signal Yellow (#FACC15) architectural highlight
 *   • Bespoke CTA buttons: Pitch Black with left-edge tri-stripe +
 *     Yellow arrow badge, hover sweeps to Crimson Red; Studio White
 *     with 2px Pitch Black border + dual Red/Yellow indicator badge,
 *     hover black.
 *
 * Props are passed through to drive H1, overline, hero copy, bento cards,
 * and the strict 4-claim bar — all strictly bound to the four verified
 * RakPlus brand claims and the RakPlus Catalogue.
 */

import Link from "@/components/AppLink";
import StrictBrandClaimBar from "@/components/ui/StrictBrandClaimBar";
import HudTelemetryBadge from "@/components/ui/HudTelemetryBadge";
import EngineeringSpecCard from "@/components/ui/EngineeringSpecCard";
import HeroVeil from "@/components/hero/HeroVeil";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export type EditorialVariant = "innovation" | "sustainability" | "about";

export interface BentoCard {
  overline?: string;
  eyebrow?: string;
  headline: string;
  body: string;
  footer?: string;
  /** Visual variant for the card. */
  variant?: "dark-glass" | "swiss-grid" | "brass-accent";
}

export interface TelemetryPill {
  label: string;
  value: string | number;
  unit?: string;
  variant?: "dark-glass" | "swiss-grid" | "brass-accent";
}

export interface EditorialAboveTheFoldProps {
  variant: EditorialVariant;
  /** Top-bar monospace identity strip items (e.g. ISO/DIN/BRASS). */
  identityStrips: string[];
  /** Monospace overline above the H1. */
  overline: string;
  /** H1 — supply as a tuple of (colorClass, text). Use the 3-line
      German standard (Black / Crimson Red / Signal Yellow) by passing
      explicit Tailwind color classes per line. */
  headlineSpans: Array<{ text: string; colorClass: string }>;
  /** Hero body copy below the H1. */
  heroBody: string;
  /** Primary CTA href + label. */
  primaryCta: { href: string; label: string };
  /** Secondary CTA href + label (optional). */
  secondaryCta?: { href: string; label: string };
  /** Bento spec prelude cards (1-4). */
  bentoCards: BentoCard[];
  /** Telemetry badges (1-6). */
  telemetryPills: TelemetryPill[];
  /** Optional bento section eyebrow. */
  bentoEyebrow?: string;
  /** Optional bottom-of-section image (legacy / wide editorial). */
  sectionImage?: {
    src: string;
    alt: string;
    /** Optional monospace caption rendered below the image. */
    caption?: string;
    /** Optional monospace kicker rendered above the image. */
    kicker?: string;
  };
  /**
   * Optional 1:1 hero image mounted BESIDE the hero copy on desktop
   * (Fix 2). Rendered as a strict 1:1 square architectural frame with
   * a floating glassmorphic telemetry badge overlaid on its bottom
   * corner. When provided, replaces (and the page should NOT also
   * pass `sectionImage` to avoid duplication).
   */
  heroImage?: {
    src: string;
    alt: string;
    /** Glassmorphic telemetry badge text rendered on the image. */
    badgeHeadline?: string;
    badgeSubline?: string;
  };
  /**
   * Compact 4-pillar trust strip rendered below the CTAs on desktop.
   * Communicates the strict 4 verified RakPlus brand claims.
   */
  trustStrip?: Array<{ label: string; value: string }>;
  /**
   * Optional array of secondary 1:1 image + description showcases
   * rendered strictly INSIDE the pre-canvas hero (BEFORE
   * `<div ref={sequenceRef}>`), in the same pattern as the Home
   * Page's `home-bento-brass-transition.png` row in
   * `AboveTheFoldHero.tsx`. Each showcase alternates left/right
   * based on its index parity: even index → image LEFT, odd index
   * → image RIGHT. On mobile/tablet they stack.
   */
  secondaryShowcases?: Array<{
    src: string;
    alt: string;
    caption?: string;
    /** EVOLVE/EXPAND/EMPOWER-style 3-line headline. */
    headline: Array<{ text: string; colorClass: string }>;
    body: string;
  }>;
}

const VARIANT_PALETTE: Record<
  EditorialVariant,
  {
    surface: string;
    text: string;
    muted: string;
    overline: string;
    primaryBtn: string;
    secondaryBtn: string;
    claimBar: "dark" | "light";
  }
> = {
  innovation: {
    surface: "bg-transparent",
    text: "text-pitch-black",
    muted: "text-neutral-700",
    overline: "text-crimson",
    primaryBtn:
      "bg-pitch-black hover:bg-crimson text-studio-white hover:shadow-crimson/30",
    secondaryBtn:
      "bg-studio-white/80 text-pitch-black border-2 border-pitch-black hover:bg-pitch-black hover:text-studio-white",
    claimBar: "light",
  },
  sustainability: {
    surface: "bg-transparent",
    text: "text-pitch-black",
    muted: "text-neutral-700",
    overline: "text-crimson",
    primaryBtn:
      "bg-pitch-black hover:bg-crimson text-studio-white hover:shadow-crimson/30",
    secondaryBtn:
      "bg-studio-white text-pitch-black border-2 border-pitch-black hover:bg-pitch-black hover:text-studio-white",
    claimBar: "light",
  },
  about: {
    surface: "bg-transparent",
    text: "text-pitch-black",
    muted: "text-neutral-700",
    overline: "text-crimson",
    primaryBtn:
      "bg-pitch-black hover:bg-crimson text-studio-white hover:shadow-crimson/30",
    secondaryBtn:
      "bg-studio-white/80 text-pitch-black border-2 border-pitch-black hover:bg-pitch-black hover:text-studio-white",
    claimBar: "light",
  },
};

export default function EditorialAboveTheFold(
  props: EditorialAboveTheFoldProps
) {
  useScrollReveal();

  const palette = VARIANT_PALETTE[props.variant];
  const isDark = palette.surface.includes("black");

  return (
    <section
      className={[
        palette.surface,
        palette.text,
        "relative w-full overflow-hidden",
      ].join(" ")}
      data-above-fold={props.variant}
      data-hero-veil-scope
      aria-labelledby={`above-fold-h1-${props.variant}`}
    >
      {/* ─── Progressive Frame-1 Background Dissolve (20% → 100%) ─── */}
      <HeroVeil />

      {/* ─── Top identity strip ─── */}
      <div
        className={[
          "relative z-10 w-full border-b",
          isDark ? "border-white/10 bg-obsidian" : "border-neutral-900/10 bg-concrete-light",
        ].join(" ")}
      >
        <div className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em]">
            {props.identityStrips.map((item) => (
              <li
                key={item}
                className={[
                  "flex items-center gap-2",
                  isDark ? "text-studio-white/60" : "text-neutral-700",
                ].join(" ")}
              >
                <span className="w-1 h-1 rounded-full bg-emerald" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── Hero · 12-column desktop split (text 7-col / 1:1 image 5-col) ─── */}
      <div className="relative z-10 w-full pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-center gap-8 lg:gap-12">
            {/* ─── LEFT COLUMN (text · 7-col on desktop) ─── */}
            <div className="lg:col-span-7">
              {/* ─── Architectural accent rule ───
                  Replaces the removed 3D pipe line-breaker with a thin
                  flat accent line that still hints at precision
                  instrumentation without drawing focus. */}
              <div className="mb-10 md:mb-12 reveal-section">
                <div className="h-[3px] w-16 md:w-24 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full" />
              </div>

              {/* ─── 3-line German-Standard Hero H1 ───
                  EVOLVE. EXPAND. EMPOWER. formula:
                    Line 1: Pure Pitch Black (#0A0A0A)
                    Line 2: Pure German Crimson Red (#DC2626) with trailing
                             period in Pitch Black
                    Line 3: Pure Signal Yellow (#FACC15) with trailing
                             period in Pitch Black — NO background box,
                             NO padding, NO rounded.
                  Consumer passes headlineSpans[] with explicit colorClass
                  per line. The last line is always rendered in pure
                  Signal Yellow text (never a yellow highlight box). */}
              <h1
                id={`above-fold-h1-${props.variant}`}
                className={[
                  "font-sans font-extrabold leading-[0.9] tracking-tighter",
                  "text-[clamp(2.75rem,7.5vw,7rem)] mb-8 reveal-section",
                  palette.text,
                ].join(" ")}
              >
                {props.headlineSpans.map((span, i) => {
                  // Strip any trailing period so we render exactly ONE.
                  const cleanText = span.text.replace(/\.+$/, "");
                  return (
                    <span key={i} className={["block", span.colorClass].join(" ")}>
                      {cleanText}
                      {/* Single trailing period, always in Pitch Black, for a
                          consistent architectural dot on every line. */}
                      <span className="text-[#0A0A0A]">.</span>
                    </span>
                  );
                })}
              </h1>

              <p
                className={[
                  "text-base md:text-xl max-w-3xl leading-relaxed font-medium mb-10 reveal-section",
                  palette.muted,
                ].join(" ")}
              >
                {props.heroBody}
              </p>

              {/* ─── Clean EVOLVE. EXPAND. EMPOWER.-style CTA buttons ───
                  Primary: Solid Crimson Red pill, hover darkens to #B91C1C,
                  clean right arrow →.
                  Secondary: Frosted Light-Grey/White pill, hover darkens. */}
              <div className="flex flex-col sm:flex-row items-start gap-4 reveal-section">
                <Link
                  href={props.primaryCta.href}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm md:text-base font-bold tracking-wider rounded-full transition-all duration-300 shadow-[0_10px_25px_rgba(220,38,38,0.35)] hover:shadow-[0_14px_30px_rgba(220,38,38,0.45)] hover:-translate-y-0.5 uppercase"
                >
                  <span>{props.primaryCta.label}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                {props.secondaryCta && (
                  <Link
                    href={props.secondaryCta.href}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-200/80 hover:bg-neutral-300/90 backdrop-blur-md border border-neutral-400/50 text-[#0A0A0A] text-sm md:text-base font-bold tracking-wider rounded-full transition-all duration-300 shadow-sm uppercase"
                  >
                    {props.secondaryCta.label} →
                  </Link>
                )}
              </div>

              {/* Compact 4-pillar trust strip (visible on desktop only,
                  below the CTA row). Communicates the strict 4 verified
                  brand claims at-a-glance. */}
              {props.trustStrip && props.trustStrip.length > 0 && (
                <ul
                  className="hidden lg:grid grid-cols-4 gap-4 mt-10 reveal-section"
                  aria-label="Strict RakPlus verified brand claims"
                >
                  {props.trustStrip.map((pill) => (
                    <li
                      key={pill.value}
                      className="flex flex-col items-start gap-1 px-3 py-2 bg-white/70 backdrop-blur-sm border border-neutral-900/10 rounded-lg"
                    >
                      <span className="font-extrabold text-[#0A0A0A] text-base tracking-tighter">
                        {pill.label}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-700">
                        {pill.value}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ─── RIGHT COLUMN (1:1 image · 5-col on desktop) ─── */}
            {props.heroImage && (
              <div className="lg:col-span-5 reveal-section">
                <div className="relative w-full max-w-[540px] mx-auto lg:ml-auto">
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-2xl border border-neutral-900/15 bg-white/80 backdrop-blur-md">
                    <img
                      src={props.heroImage.src}
                      alt={props.heroImage.alt}
                      width={2048}
                      height={2048}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-pitch-black/10 rounded-2xl" />
                  </div>

                  {/* Floating glassmorphic telemetry badge */}
                  <div
                    className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 z-20 bg-pitch-black/85 backdrop-blur-xl border border-white/15 text-studio-white rounded-2xl shadow-2xl px-4 py-3 md:px-5 md:py-4 flex items-center gap-3 max-w-[80%]"
                    role="img"
                    aria-label={`${props.heroImage.badgeHeadline ?? ""} ${props.heroImage.badgeSubline ?? ""}`}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] flex rounded-t-2xl overflow-hidden"
                      aria-hidden="true"
                    >
                      <span className="flex-[6] bg-[#0A0A0A]" />
                      <span className="flex-[2] bg-[#DC2626]" />
                      <span className="flex-[2] bg-[#FACC15]" />
                    </div>
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="font-extrabold text-base md:text-lg tracking-tighter text-studio-white leading-none">
                        {props.heroImage.badgeHeadline ?? props.variant.toUpperCase()}
                      </span>
                      <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-studio-white/60">
                        {props.heroImage.badgeSubline ?? "RakPlus®"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Optional mounted editorial section image (legacy / wide editorial) ─── */}
      {props.sectionImage && !props.heroImage && (
        <div className="relative z-10 w-full px-6 md:px-12 max-w-screen-2xl mx-auto pb-12 md:pb-16 reveal-section">
          <div className="group relative w-full">
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[16/10] w-full overflow-hidden rounded-2xl border border-neutral-900/10 bg-concrete-light">
              <img
                src={props.sectionImage.src}
                alt={props.sectionImage.alt}
                width={2048}
                height={2048}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-pitch-black/10 rounded-2xl" />
            </div>
            {(props.sectionImage.kicker || props.sectionImage.caption) && (
              <p className="mt-3 text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-pitch-black/60">
                {props.sectionImage.kicker}
                {props.sectionImage.kicker && props.sectionImage.caption && " · "}
                {props.sectionImage.caption}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ─── Bento Spec Prelude ─── */}
      <div className="relative z-10 w-full pb-16 md:pb-24">
        <div className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
          {/* Telemetry pills row */}
          {props.telemetryPills.length > 0 && (
            <div
              className={[
                "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 reveal-section",
              ].join(" ")}
            >
              {props.telemetryPills.map((pill) => (
                <HudTelemetryBadge
                  key={`${pill.label}-${pill.value}`}
                  variant={
                    pill.variant ?? (isDark ? "dark-glass" : "swiss-grid")
                  }
                  label={pill.label}
                  value={pill.value}
                  unit={pill.unit}
                />
              ))}
            </div>
          )}

          {/* Bento cards */}
          {props.bentoCards.length > 0 && (
            <div
              className={[
                "grid grid-cols-1 md:grid-cols-3 gap-4 reveal-section",
              ].join(" ")}
            >
              {props.bentoCards.map((card, i) => (
                <EngineeringSpecCard
                  key={i}
                  variant={
                    card.variant ?? (isDark ? "dark-glass" : "swiss-grid")
                  }
                  overline={card.overline}
                  eyebrow={card.eyebrow}
                  headline={card.headline}
                  footer={card.footer}
                >
                  {card.body}
                </EngineeringSpecCard>
              ))}
            </div>
          )}

          {/* Strict 4-Claim bar */}
          <div className="mt-6 md:mt-8 reveal-section">
            <StrictBrandClaimBar variant={palette.claimBar} />
          </div>

          {/* ─── Secondary 1:1 showcase rows (pre-canvas only) ───
              Strictly rendered INSIDE the pre-canvas hero so the
              <div ref={sequenceRef}> canvas scroll zone stays 100%
              unobstructed by 1:1 images. Each showcase alternates
              left/right based on its index parity. The description
              column is wrapped in a frosted card
              (bg-white/85 backdrop-blur-md) so the 3-line
              Black/Red/Yellow heading and paragraph text have
              razor-sharp legibility against the semi-visible
              Frame 1 water canvas behind. */}
          {props.secondaryShowcases && props.secondaryShowcases.length > 0 && (
            <div className="mt-10 md:mt-14 flex flex-col gap-10 md:gap-16">
              {props.secondaryShowcases.map((showcase, i) => {
                const imageLeft = i % 2 === 0; // 0,2,4... image left
                return (
                  <div
                    key={`${showcase.src}-${i}`}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center reveal-section"
                    data-showcase-index={i}
                  >
                    {/* 1:1 image column (7-col desktop). On mobile
                        the image always renders first. */}
                    <div
                      className={[
                        "md:col-span-7",
                        imageLeft ? "md:order-1" : "md:order-2",
                      ].join(" ")}
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-900/15 bg-white/80 backdrop-blur-md shadow-xl">
                        <img
                          src={showcase.src}
                          alt={showcase.alt}
                          width={2048}
                          height={2048}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-pitch-black/10 rounded-2xl" />
                      </div>
                      {showcase.caption && (
                        <p className="mt-3 text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-pitch-black/60">
                          {showcase.caption}
                        </p>
                      )}
                    </div>

                    {/* Description column (5-col desktop). Wrapped
                        in a frosted architectural card so the H3
                        and body copy are 100% legible against
                        Frame 1 of the canvas behind. */}
                    <div
                      className={[
                        "md:col-span-5",
                        imageLeft ? "md:order-2" : "md:order-1",
                      ].join(" ")}
                    >
                      <div className="bg-white/85 backdrop-blur-md p-8 lg:p-10 rounded-2xl border border-neutral-900/10 shadow-sm">
                        <h3 className="font-sans font-extrabold tracking-tighter leading-[0.95] text-[clamp(1.75rem,3.5vw,2.5rem)] mb-4">
                          {showcase.headline.map((line, j) => (
                            <span key={j} className="block">
                              <span className={line.colorClass}>
                                {line.text.replace(/\.$/, "")}
                              </span>
                              <span className="text-[#0A0A0A]">.</span>
                            </span>
                          ))}
                        </h3>
                        <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-medium">
                          {showcase.body}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          </div>
      </div>
    </section>
  );
}

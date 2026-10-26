/**
 * AboveTheFoldHero — Pre-Canvas Editorial Hero
 *
 * Renders BEFORE `<CanvasSequence />`. Because CanvasSequence pins and
 * scrubs based on `scrollTriggerRef={sequenceRef}`, any rich editorial
 * content placed before `<div ref={sequenceRef}>` naturally delays the
 * 3D sequence entry by 1.5–2.5 scrolls.
 *
 * Architecture (Home page variant):
 *   • Top: TightSpec identity strip (DIN 8077/8078 · ISO 9001:2015 · WRAS · UAE)
 *   • Hero: 12-column desktop split (text 7-col / 1:1 image 5-col)
 *     with a 3-line German-standard H1 (Black / Crimson Red / Signal
 *     Yellow architectural highlight) and bespoke German CTA buttons.
 *   • Bento Spec Prelude: 3-column asymmetric grid of:
 *       - Pressure Classes card (PN10 → PN25 visual ladder)
 *       - Live Catalog Stats card (Density, Thermal, Charpy)
 *       - Strict 4-Claim bar
 *   • Bento side-by-side: home-bento-brass-transition.png mounted in a
 *     1:1 square beside the editorial spec callout on desktop.
 *   • Scroll cue → enters canvas sequence
 *
 * This component is RENDERED ABOVE <div ref={sequenceRef}>; it does NOT
 * participate in the GSAP scrub. All animation here is pure CSS + small
 * IntersectionObserver fade-ups via `useScrollReveal`.
 */

import Link from "next/link";
import StrictBrandClaimBar from "@/components/ui/StrictBrandClaimBar";
import HudTelemetryBadge from "@/components/ui/HudTelemetryBadge";
import EngineeringSpecCard from "@/components/ui/EngineeringSpecCard";
import HeroVeil from "@/components/hero/HeroVeil";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboveTheFoldHero() {
  useScrollReveal();

  return (
    <section
      className="relative w-full bg-transparent text-pitch-black overflow-hidden"
      data-above-fold="true"
      data-hero-veil-scope
      aria-labelledby="hero-h1"
    >
      {/* ─── Progressive Frame-1 Background Dissolve (20% → 100%) ───
          Renders the white architectural veil with a radial spotlight
          mask. Zero impact on the locked <CanvasSequence /> — it
          remains untouched at fixed inset-0 z-0. */}
      <HeroVeil />

      {/* ─── Top identity strip ─── */}
      <div className="relative z-10 w-full border-b border-neutral-900/10 bg-concrete-light">
        <div className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-700">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-600" />
              <span>ISO 9001:2015</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-600" />
              <span>ISO 14001:2015</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-sapphire" />
              <span>DIN 8077/8078</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-sapphire" />
              <span>DVS 2207</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-brass" />
              <span>WRAS Approved Material</span>
            </li>
            <li className="hidden md:flex items-center gap-2 ml-auto text-neutral-500">
              <span>RakPlus® Rohrsysteme UAE · Umm Al Quwain, UAE</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ─── Hero · 12-column desktop split (text 7-col / 1:1 image 5-col) ───
          Mobile & tablet (<1024px): stacked layout (text → image).
          Laptop & desktop (lg: >= 1024px): side-by-side split grid so
          the 1st image appears in a 1:1 square BESIDE the hero copy
          instead of below it. The right column shows the 1st page
          image (home-hero-pipe-system.png) inside a `max-w-[540px]`
          architectural frame with a floating glassmorphic telemetry
          badge overlaid on its bottom corner. */}
      <div className="relative z-10 w-full pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-center gap-8 lg:gap-12">
            {/* ─── LEFT COLUMN (text · 7-col on desktop) ─── */}
            <div className="lg:col-span-7">
              {/* ─── 3-line German-Standard Hero H1 ───
                  EVOLVE. EXPAND. EMPOWER. formula:
                    Line 1: Pitch Black (#0A0A0A) — "Premium PPR Pipes."
                    Line 2: German Crimson Red (#DC2626) — "Unbreakable German"
                             with trailing period in Pitch Black
                    Line 3: Pure Signal Yellow (#FACC15) — "Foundations."
                             with trailing period in Pitch Black
                             NO background box, NO padding, NO rounded.
              */}
              <h1
                id="hero-h1"
                className="font-sans font-extrabold leading-[0.9] tracking-tighter text-[clamp(3rem,8.5vw,8rem)] mb-8 reveal-section"
              >
                <span className="block text-[#0A0A0A]">Premium PPR Pipes.</span>
                <span className="block">
                  <span className="text-[#DC2626]">Unbreakable German</span>
                  <span className="text-[#0A0A0A]">.</span>
                </span>
                <span className="block">
                  <span className="text-[#FACC15]">Foundations</span>
                  <span className="text-[#0A0A0A]">.</span>
                </span>
              </h1>

              <p className="text-neutral-700 text-base md:text-xl max-w-3xl leading-relaxed font-medium mb-10 reveal-section">
                RakPlus® engineers PP-R pipes and brass-insert fittings to{" "}
                <span className="text-[#EAB308] font-extrabold">DIN 8077/8078</span> and{" "}
                <span className="text-[#EAB308] font-extrabold">DVS 2207</span> in our{" "}
                <span className="text-[#DC2626] font-extrabold">UAE</span> facility — specified across the GCC for
                residential, commercial, and industrial potable water systems.
              </p>

              {/* ─── Clean EVOLVE. EXPAND. EMPOWER.-style CTA buttons ───
                  Primary: Solid Crimson Red pill, hover darkens to #B91C1C,
                  clean right arrow →.
                  Secondary: Frosted Light-Grey/White pill, hover darkens. */}
              <div className="flex flex-col sm:flex-row items-start gap-4 reveal-section">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm md:text-base font-bold tracking-wider rounded-full transition-all duration-300 shadow-[0_10px_25px_rgba(220,38,38,0.35)] hover:shadow-[0_14px_30px_rgba(220,38,38,0.45)] hover:-translate-y-0.5 uppercase"
                >
                  <span>View Catalogue</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/sustainability"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-200/80 hover:bg-neutral-300/90 backdrop-blur-md border border-neutral-400/50 text-[#0A0A0A] text-sm md:text-base font-bold tracking-wider rounded-full transition-all duration-300 shadow-sm uppercase"
                >
                  100% Safe for Potable Water →
                </Link>
              </div>

              {/* Compact 4-pillar trust strip (visible on desktop only,
                  below the CTA row). Communicates the strict 4 verified
                  brand claims at-a-glance. */}
              <ul
                className="hidden lg:grid grid-cols-4 gap-4 mt-10 reveal-section"
                aria-label="Strict RakPlus verified brand claims"
              >
                {[
                  { label: "100%", value: "Polymer" },
                  { label: "100%", value: "Brass" },
                  { label: "WRAS", value: "Approved" },
                  { label: "50 YR", value: "Life" },
                ].map((pill) => (
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
            </div>

            {/* ─── RIGHT COLUMN (1:1 image · 5-col on desktop) ───
                On desktop, mount home-hero-pipe-system.png in a strict
                1:1 square architectural frame with a futuristic
                floating glassmorphic telemetry badge overlaid on its
                bottom corner. On mobile/tablet the image is full-width
                1:1 and stacks below the text. */}
            <div className="lg:col-span-5 reveal-section">
              <div className="relative w-full max-w-[540px] mx-auto lg:ml-auto">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-2xl border border-neutral-900/15 bg-white/80 backdrop-blur-md">
                  <img
                    src="/images/home-hero-pipe-system.png"
                    alt="RakPlus 63x10,5mm SDR6 / PN20 horizontal green PP-R pipe on a futuristic white architectural telemetry display with floating glassmorphic DIN/PN20/WRAS spec cards."
                    width={2048}
                    height={2048}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Architectural edge frame — thin pitch-black hairline overlay */}
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-pitch-black/10 rounded-2xl" />
                </div>

                {/* Floating glassmorphic telemetry badge overlaid on the
                    bottom corner of the 1:1 image. Anchored to the
                    bottom-left, sticking out by ~30% for a true
                    futuristic "HUD" feel. */}
                <div
                  className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 z-20 bg-pitch-black/85 backdrop-blur-xl border border-white/15 text-studio-white rounded-2xl shadow-2xl px-4 py-3 md:px-5 md:py-4 flex items-center gap-3 max-w-[80%]"
                  role="img"
                  aria-label="Glassmorphic telemetry badge: PN20 · SDR6 · DIN 8077/8078"
                >
                  {/* Top tri-stripe accent on the badge */}
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
                      PN20 · SDR6
                    </span>
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-studio-white/60">
                      DIN 8077/8078
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bento Spec Prelude ───
          No 1st image stacked below the fold (it's now mounted in the
          12-col desktop split above). The bento below is focused on
          the secondary image (home-bento-brass-transition.png) which
          is rendered in a 1:1 side-by-side split beside the bento
          specs on desktop. */}
      <div className="relative z-10 w-full pb-16 md:pb-24">
        <div className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
          {/* Bento grid: 12-column asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 reveal-section">
            {/* Pressure Classes ladder — wide left (cols 1-7) */}
            <div className="md:col-span-7 bg-studio-white border border-neutral-900/10 p-6 md:p-8 corner-crosshairs relative">
              {/* Top tri-stripe accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] flex pointer-events-none"
                aria-hidden="true"
              >
                <span className="flex-[6] bg-[#0A0A0A]" />
                <span className="flex-[2] bg-[#DC2626]" />
                <span className="flex-[2] bg-[#FACC15]" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-crimson text-[10px] font-mono font-bold uppercase tracking-[0.25em]">
                  Pressure Class Range
                </span>
              </div>
              <h2 className="font-sans font-extrabold tracking-tighter text-pitch-black text-2xl md:text-3xl lg:text-4xl mb-2">
                PN10 · PN16 · PN20 · PN25
              </h2>
              <p className="text-neutral-700 text-sm mb-6 max-w-md">
                Four pressure classes cover every UAE plumbing requirement
                from residential cold-water distribution to industrial
                high-pressure risers.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <HudTelemetryBadge
                  variant="swiss-grid"
                  label="PN10 · SDR11"
                  value="10"
                  unit="bar"
                />
                <HudTelemetryBadge
                  variant="swiss-grid"
                  label="PN16 · SDR7.4"
                  value="16"
                  unit="bar"
                />
                <HudTelemetryBadge
                  variant="swiss-grid"
                  label="PN20 · SDR6"
                  value="20"
                  unit="bar"
                />
                <HudTelemetryBadge
                  variant="swiss-grid"
                  label="PN25 · SDR5"
                  value="25"
                  unit="bar"
                />
              </div>
            </div>

            {/* Material properties — right column (cols 8-12) */}
            <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <HudTelemetryBadge
                variant="brass-accent"
                label="Density (ISO 1183)"
                value="905"
                unit="kg/m³"
              />
              <HudTelemetryBadge
                variant="swiss-grid"
                label="Thermal Cond. (DIN 52612)"
                value="0.24"
                unit="W/m·K"
              />
              <HudTelemetryBadge
                variant="swiss-grid"
                label="Melt Flow (ISO 1133)"
                value="≤0.3"
                unit="g/10min"
              />
              <HudTelemetryBadge
                variant="brass-accent"
                label="Charpy Impact (ISO 179/1eU)"
                value="NB"
                unit="No Break"
              />
            </div>
          </div>

          {/* Strict 4-Claim bar */}
          <div className="mt-6 md:mt-8 reveal-section">
            <StrictBrandClaimBar variant="light" />
          </div>

          {/* ─── Bento side-by-side: 1:1 image beside editorial spec callout ───
              On desktop the brass-transition image (1:1) sits BESIDE
              the editorial spec callout in a 12-col split (7-col image
              / 5-col copy). On mobile/tablet it stacks (image first,
              then copy). */}
          <div className="group relative w-full mt-10 md:mt-12 reveal-section">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {/* Image — 1:1 square desktop, 1:1 mobile/tablet, 7-col
                  on desktop. */}
              <div className="md:col-span-7 relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-900/10 bg-concrete-light">
                <img
                  src="/images/home-bento-brass-transition.png"
                  alt="RakPlus Ø32x1&quot; PP-R TYP3 green transition female elbow with golden hex brass insert on a white architectural drafting surface with silver isometric CAD grid and golden 100% BRASS callout card."
                  width={2048}
                  height={2048}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-pitch-black/10 rounded-2xl" />
              </div>
              {/* Editorial spec column (5-col on desktop). Wrapped
                  in a frosted architectural card (bg-white/85
                  backdrop-blur-md) so the 3-line Black/Red/Yellow
                  heading and paragraph text have 100% razor-sharp
                  legibility against the semi-visible Frame 1 water
                  canvas behind. */}
              <div className="md:col-span-5">
                <div className="bg-white/85 backdrop-blur-md p-8 lg:p-10 rounded-2xl border border-neutral-900/10 shadow-sm flex flex-col gap-4">
                  <p className="flex items-center gap-3 text-crimson text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.3em]">
                    <span>100% Brass Insert Transitions</span>
                  </p>
                  <h3 className="font-sans font-extrabold tracking-tighter text-pitch-black text-2xl md:text-3xl leading-[0.95]">
                    <span className="block text-[#0A0A0A]">Solid Brass Insert</span>
                    <span className="block text-[#DC2626]">DIN 8076</span>
                    <span className="block">
                      <span className="text-[#FACC15]">Zero-Leak Seal</span>
                      <span className="text-[#0A0A0A]">.</span>
                    </span>
                  </h3>
                  <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-medium">
                    Precision-machined solid brass insert — never plated,
                    never hybrid. Engineered for thermal-cycling durability
                    and zero-galvanic compatibility with the PP-R pipe
                    matrix.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 self-start text-pitch-black hover:text-crimson text-xs font-mono font-bold uppercase tracking-[0.25em] transition-colors"
                  >
                    Explore All Products Range →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Engineering spec callout (editorial anchor) */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 reveal-section">
            <EngineeringSpecCard
              variant="swiss-grid"
              overline="DIN 8077/8078"
              eyebrow="Material"
              headline="100% Virgin Polypropylene Random-Copolymer"
              footer="Type 3 · PP-R"
            >
              Pure polymer matrix delivering molecular stability from
              0 °C to 70 °C continuous, with short-term peaks up to
              100 °C.
            </EngineeringSpecCard>
            <EngineeringSpecCard
              variant="brass-accent"
              overline="Brass Inserts"
              eyebrow="Fittings"
              headline="100% Brass Insert Transitions"
              footer="Never plated · Never hybrid"
            >
              Precision-machined brass inserts engineered for thermal
              cycling durability and zero-galvanic compatibility with the
              PP-R pipe matrix.
            </EngineeringSpecCard>
            <EngineeringSpecCard
              variant="swiss-grid"
              overline="WRAS Approved"
              eyebrow="Potable Water"
              headline="Independent Potable Water Certification"
              footer="UK Water Regulations Advisory Scheme"
            >
              Every RakPlus pipe and brass-insert fitting carries WRAS
              approval for contact with drinking water — the international
              benchmark demanded by consultants across the GCC.
            </EngineeringSpecCard>
          </div>
        </div>
      </div>
    </section>
  );
}

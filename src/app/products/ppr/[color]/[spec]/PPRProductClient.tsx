"use client";

/**
 * PPRProductClient — The Curtain Reveal Product Experience
 *
 * Architecture:
 *   Layer 0: Fixed cinematic background (dark gradient + animated pulse)
 *   Layer 1: Scroll spacer (100vh) — user scrolls to reveal
 *   Layer 2: CinematicCurtain wrapping all product data
 *
 * Inside the curtain:
 *   1. Hero/Overview — left-aligned massive H1, descriptions
 *   2. Features & Applications — asymmetrical stagger grid
 *   3. Engineering Data Matrix — frosted glass table
 *   4. Technical Directives — Welding/Installation (DIN 16962 / DVS 2207)
 *   5. UAE Project Compliance — Certifications & climate resilience
 *   6. CTA + Navigation
 *
 * All text is left-aligned. Zero centering. Edge-to-edge breathing room.
 * Layout uses 10% dynamic viewport padding (zero wasted margin rule).
 */

import Link from "next/link";
import CinematicCurtain from "@/components/CinematicCurtain";
import { getAdjacentSpecs, VALID_COLORS } from "@/config/pprData";
import type { PprSpecConfig } from "@/types/pprTypes";
import {
  ArrowRight,
  ArrowLeft,
  Shield,
  Zap,
  Droplets,
  Factory,
  FlaskConical,
  Waves,
  Wrench,
  Award
} from "lucide-react";

// ─── Props ───

interface PPRProductClientProps {
  specData: PprSpecConfig;
  color: string;
}

// ─── Application Icons (mapped by index for visual variety) ───

const APPLICATION_ICONS = [Droplets, Factory, Waves, FlaskConical];

// ─── Component ───

export default function PPRProductClient({
  specData,
  color,
}: PPRProductClientProps) {
  const { prev, next } = getAdjacentSpecs(specData.specSlug);

  // Build navigation URLs
  const buildUrl = (spec: string) => `/products/ppr/${color}/${spec}`;

  return (
    <article className="relative min-h-[200vh]">
      {/* ═══════════════════════════════════════════════════════
          LAYER 0 — Fixed Cinematic Background
          ═══════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d1a0f] to-[#0a0a0a]" />

        {/* Animated radial pulse */}
        <div className="ppr-hero-pulse absolute inset-0 opacity-30" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* RAKPLUS watermark */}
        <div className="absolute bottom-[15%] right-[5%] select-none pointer-events-none">
          <span
            className="font-display text-[12vw] font-black leading-none tracking-tighter"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(34,197,94,0.06)",
            }}
          >
            RAK+
          </span>
        </div>

        {/* Hero content overlay — visible during spacer scroll */}
        <div className="absolute inset-0 flex items-center px-[10%] md:px-[10vw]">
          <div className="w-full max-w-[1920px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500/70">
                PP-R Pipes / Fittings — German Standard Engineering
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black text-white/90 tracking-tighter leading-[0.9] mb-6">
              Engineered
              <br />
              <span className="text-green-500">Without</span>
              <br />
              Compromise.
            </h2>
            <p className="text-white/40 text-base lg:text-lg leading-relaxed font-light">
              {specData.shortDescription}
            </p>

            {/* Scroll indicator */}
            <div className="mt-12 flex items-center gap-3">
              <div className="w-[1px] h-16 bg-gradient-to-b from-green-500/60 to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/25 font-medium">
                Scroll to explore
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 1 — Scroll Spacer
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 h-[100vh]" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          LAYER 2 — The Curtain
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-20">
        <CinematicCurtain id={`ppr-${specData.specSlug}`}>
          {/* Strict 10% padding block enforcing 80% utilization */}
          <div className="w-full min-h-screen rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] px-[10%] md:px-[10vw] max-w-[1920px] mx-auto py-24 lg:py-32 bg-[#070707]">
            
            {/* ─── Breadcrumb ─── */}
            <nav
              className="flex items-center gap-2 text-sm mb-16 w-full reveal-curtain-child"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="text-white/30 hover:text-white/60 transition-colors"
              >
                Home
              </Link>
              <span className="text-white/15">/</span>
              <Link
                href="/products"
                className="text-white/30 hover:text-white/60 transition-colors"
              >
                Products
              </Link>
              <span className="text-white/15">/</span>
              <span className="text-white/60 font-medium">
                PP-R {color.charAt(0).toUpperCase() + color.slice(1)}
              </span>
              <span className="text-white/15">/</span>
              <span className="text-green-500/80 font-medium truncate">
                {specData.specSlug.toUpperCase().replace("-", " / ")}
              </span>
            </nav>

            {/* ════════════════════════════════════════════
                SECTION 1 — Hero / Overview
                ════════════════════════════════════════════ */}
            <section
              className="w-full mb-24 lg:mb-32"
              aria-label="Product overview"
            >
              <div className="flex flex-wrap gap-3 mb-8 reveal-curtain-child">
                <span className="curtain-badge">
                  <Shield className="w-3 h-3 mr-2 text-brand-red" />
                  DIN 8077/78
                </span>
                <span className="curtain-badge">
                  <Shield className="w-3 h-3 mr-2 text-brand-yellow" />
                  ISO 9001:2015
                </span>
                <span className="curtain-badge">
                  <Zap className="w-3 h-3 mr-2 text-green-500" />
                  50-Year Guarantee
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-8 reveal-curtain-child reveal-delay-1">
                {specData.title}
              </h1>

              <div className="curtain-accent-line mb-8 reveal-curtain-child reveal-delay-2" />

              <p className="text-xl lg:text-2xl text-white/90 font-light leading-relaxed mb-6 reveal-curtain-child reveal-delay-2">
                {specData.shortDescription}
              </p>

              <p className="text-base lg:text-lg text-white/50 leading-[1.8] w-full reveal-curtain-child reveal-delay-3">
                {specData.overviewParagraph}
              </p>

              <h2 className="sr-only">
                Leading Thermoplastic Pipes / Fittings Engineering in the UAE
              </h2>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 2 — Features & Applications
                ════════════════════════════════════════════ */}
            <section
              className="w-full mb-24 lg:mb-32"
              aria-label="Features and applications"
            >
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight mb-4 reveal-curtain-child">
                Dubai&apos;s Top Choice for Hot &amp; Cold Water Transmission
              </h2>
              <p className="text-white/35 text-sm mb-12 w-full reveal-curtain-child">
                Precision-engineered PP-R Pipes / Fittings delivering unmatched
                performance across the Gulf region&apos;s most demanding
                infrastructure projects.
              </p>

              <div className="stagger-grid">
                <div className="reveal-curtain-child">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white tracking-tight">
                      Engineering Advantages
                    </h3>
                  </div>

                  <ul className="space-y-4">
                    {specData.featuresGrid.map((feature, i) => (
                      <li key={i} className="flex items-start gap-4 group">
                        <div className="ppr-glow-bullet flex-shrink-0 mt-1.5">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                        <span className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="reveal-curtain-child reveal-delay-2">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Factory className="w-5 h-5 text-white/60" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white tracking-tight">
                      Industrial Applications
                    </h3>
                  </div>

                  <ul className="space-y-5">
                    {specData.applicationsList.map((app, i) => {
                      const Icon =
                        APPLICATION_ICONS[i % APPLICATION_ICONS.length];
                      return (
                        <li
                          key={i}
                          className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-white/40" />
                          </div>
                          <span className="text-sm text-white/60 leading-relaxed">
                            {app}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 3 — Engineering Data Matrix
                ════════════════════════════════════════════ */}
            <section
              className="w-full mb-24 lg:mb-32"
              aria-label="Engineering specifications"
            >
              <div className="flex items-center gap-3 mb-4 reveal-curtain-child">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  Complete Engineering Specifications
                </h2>
              </div>
              <p className="text-white/35 text-sm mb-10 w-full reveal-curtain-child">
                Dimensional data sourced directly from the RAKPLUS product
                catalog. All measurements conform to DIN 8077/78 German
                engineering standards. Matrix renders all available pipe sizes.
              </p>

              <div className="reveal-curtain-child reveal-delay-1">
                <div className="rounded-2xl border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.05)] w-full overflow-hidden">
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left min-w-[800px]">
                      <thead>
                        <tr className="ppr-table-header">
                          <th
                            scope="col"
                            className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 whitespace-nowrap"
                          >
                            Part No.
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 whitespace-nowrap"
                          >
                            OD (mm)
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 whitespace-nowrap"
                          >
                            Wall (mm)
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 whitespace-nowrap"
                          >
                            ID (mm)
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 whitespace-nowrap"
                          >
                            Pack
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 whitespace-nowrap"
                          >
                            Kg/Mtr
                          </th>
                          {specData.hasWaterContent && (
                            <th
                              scope="col"
                              className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 whitespace-nowrap"
                            >
                              Water (L/Mtr)
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="font-mono tabular-nums">
                        {specData.engineeringTable.map((row, i) => (
                          <tr
                            key={row.part}
                            className={`border-b border-white/[0.04] last:border-b-0 transition-colors duration-200 hover:bg-white/[0.03] ${
                              i % 2 === 0
                                ? "bg-transparent"
                                : "bg-white/[0.015]"
                            }`}
                          >
                            <td className="px-5 py-4 text-sm text-green-500/80 font-semibold whitespace-nowrap">
                              {row.part}
                            </td>
                            <td className="px-5 py-4 text-sm text-white/70 whitespace-nowrap">
                              <span className="text-green-500/50 mr-1">⌀</span>
                              {row.od_mm}
                            </td>
                            <td className="px-5 py-4 text-sm text-white/60 whitespace-nowrap">
                              {row.wall_mm}
                            </td>
                            <td className="px-5 py-4 text-sm text-white/60 whitespace-nowrap">
                              {row.id_mm}
                            </td>
                            <td className="px-5 py-4 text-sm text-white/40 whitespace-nowrap">
                              {row.pack}
                            </td>
                            <td className="px-5 py-4 text-sm text-white/70 font-medium whitespace-nowrap">
                              {row.kg_mtr}
                            </td>
                            {specData.hasWaterContent && (
                              <td className="px-5 py-4 text-sm text-white/60 whitespace-nowrap">
                                {row.water_l_mtr ?? "—"}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
                    <p className="text-[11px] text-white/25 tracking-wide">
                      Showing all {specData.engineeringTable.length} sizes available · 
                      Data sourced from RAKPLUS product catalog · DIN 8077/78 compliant
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 3.5 — Technical Directives (NEW)
                ════════════════════════════════════════════ */}
            <section
              className="w-full mb-24 lg:mb-32"
              aria-label="Installation and Welding Guidelines"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                <div className="reveal-curtain-child">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-white/60" />
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight">
                      Installation &amp; Welding Guidelines
                    </h2>
                  </div>
                  <p className="text-white/50 text-base leading-relaxed mb-6">
                    RAKPLUS PP-R Pipes / Fittings utilize homogeneous thermal polyfusion bonding. Following proper socket fusion parameters according to <strong>DIN 16962</strong> and <strong>DVS 2207</strong> is critical to guarantee a 100% leak-proof, monolithic piping system that lasts 50+ years.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <p className="text-sm text-white/60 leading-relaxed">
                        <strong className="text-white/90 font-medium">Fusion Temperature:</strong> The welding tool must be strictly calibrated and stabilized at 260°C (±10°C) before initiating any socket fusion.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <p className="text-sm text-white/60 leading-relaxed">
                        <strong className="text-white/90 font-medium">Heating &amp; Cooling Times:</strong> Ensure adherence to specific heating durations relative to pipe diameter (e.g., 5 sec for 20mm, 12 sec for 40mm). Do not apply mechanical stress during the cooling phase.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <p className="text-sm text-white/60 leading-relaxed">
                        <strong className="text-white/90 font-medium">Alignment Tolerance:</strong> Pipes and fittings must be aligned precisely. Minor adjustments can only be made within the first few seconds post-insertion.
                      </p>
                    </li>
                  </ul>
                </div>
                
                {/* ════════════════════════════════════════════
                    SECTION 3.6 — UAE Project Compliance Block (NEW)
                    ════════════════════════════════════════════ */}
                <div className="reveal-curtain-child reveal-delay-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white/60" />
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight">
                      UAE Project Compliance
                    </h2>
                  </div>
                  <div className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                    <p className="text-white/70 text-base leading-relaxed mb-8">
                      Engineered for the Middle East, RAKPLUS systems exceed the stringent requirements set by local municipalities and international standardization bodies.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                        <h4 className="text-white font-semibold mb-2 tracking-tight">ISO Certifications</h4>
                        <p className="text-xs text-white/40 leading-relaxed">
                          Manufactured under ISO 9001:2015 (Quality) and ISO 14001:2015 (Environmental) management systems.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                        <h4 className="text-white font-semibold mb-2 tracking-tight">Thermal Resilience</h4>
                        <p className="text-xs text-white/40 leading-relaxed">
                          Rated for continuous operation from 0°C to 70°C, with a 100°C short-term peak capacity, ideal for GCC climates.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] sm:col-span-2">
                        <h4 className="text-white font-semibold mb-2 tracking-tight">Municipality Approvals</h4>
                        <p className="text-xs text-white/40 leading-relaxed">
                          Fully approved by Dubai Municipality and relevant UAE authorities for large-scale residential, commercial, and high-rise developments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 4 — Spec Selector (Cross-links)
                ════════════════════════════════════════════ */}
            <section
              className="w-full mb-24 lg:mb-32"
              aria-label="Other specifications"
            >
              <h3 className="font-display text-lg font-semibold text-white/50 tracking-tight mb-6 reveal-curtain-child">
                Other PP-R Specifications
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 reveal-curtain-child w-full">
                {["pn10-sdr11", "pn16-sdr74", "pn20-sdr6", "pn25-sdr5"].map(
                  (slug) => {
                    const isCurrent = slug === specData.specSlug;
                    const label = slug.toUpperCase().replace("-", " / ");
                    return (
                      <Link
                        key={slug}
                        href={buildUrl(slug)}
                        className={`group flex items-center justify-between px-6 py-5 rounded-xl border transition-all duration-300 ${
                          isCurrent
                            ? "border-green-500/40 bg-green-500/10 cursor-default"
                            : "border-white/[0.06] bg-white/[0.02] hover:border-green-500/30 hover:bg-white/[0.04]"
                        }`}
                        aria-current={isCurrent ? "page" : undefined}
                      >
                        <span
                          className={`text-sm font-semibold tracking-tight ${
                            isCurrent ? "text-green-500" : "text-white/60 group-hover:text-white/90"
                          } transition-colors`}
                        >
                          {label}
                        </span>
                        {isCurrent ? (
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-green-500/60 group-hover:translate-x-0.5 transition-all duration-300" />
                        )}
                      </Link>
                    );
                  }
                )}
              </div>

              {/* Color variant cross-link */}
              <div className="mt-6 reveal-curtain-child">
                {VALID_COLORS.filter((c) => c !== color).map((otherColor) => (
                  <Link
                    key={otherColor}
                    href={`/products/ppr/${otherColor}/${specData.specSlug}`}
                    className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        otherColor === "yellow"
                          ? "bg-brand-yellow"
                          : "bg-brand-green"
                      }`}
                    />
                    View in{" "}
                    {otherColor.charAt(0).toUpperCase() + otherColor.slice(1)}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 5 — CTA
                ════════════════════════════════════════════ */}
            <section
              className="w-full mb-24 lg:mb-32 reveal-curtain-child"
              aria-label="Call to action"
            >
              <div className="p-8 lg:p-12 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight mb-4">
                  Specify This Product for Your Project
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8 w-full">
                  Our engineering team at Aquasmart Plastic Industries can help
                  configure the exact PP-R Pipes / Fittings specification for
                  your infrastructure requirements across Dubai and the UAE.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-500 hover:bg-green-600 text-black text-sm font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5"
                  >
                    Request a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-white/60 text-sm font-medium rounded-xl border border-white/10 hover:border-white/20 hover:text-white/80 transition-all duration-200"
                  >
                    View All Pipes / Fittings
                  </Link>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 6 — Product Navigation (Prev/Next)
                ════════════════════════════════════════════ */}
            <section
              className="w-full pt-8 border-t border-white/[0.06]"
              aria-label="Product navigation"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {prev ? (
                  <Link
                    href={buildUrl(prev.specSlug)}
                    className="group flex items-center gap-3 px-6 py-4 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/[0.06] transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4 text-white/30 group-hover:text-green-500 transition-colors group-hover:-translate-x-1 duration-200" />
                    <div className="text-right">
                      <p className="text-[10px] text-white/25 uppercase tracking-widest font-medium">
                        Previous
                      </p>
                      <p className="text-sm text-white/60 font-medium group-hover:text-green-500 transition-colors">
                        {prev.specSlug.toUpperCase().replace("-", " / ")}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                <Link
                  href="/products"
                  className="text-xs text-white/25 uppercase tracking-[0.2em] font-medium hover:text-white/50 transition-colors"
                >
                  All Pipes / Fittings
                </Link>

                {next ? (
                  <Link
                    href={buildUrl(next.specSlug)}
                    className="group flex items-center gap-3 px-6 py-4 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/[0.06] transition-all duration-200"
                  >
                    <div>
                      <p className="text-[10px] text-white/25 uppercase tracking-widest font-medium">
                        Next
                      </p>
                      <p className="text-sm text-white/60 font-medium group-hover:text-green-500 transition-colors">
                        {next.specSlug.toUpperCase().replace("-", " / ")}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-green-500 transition-colors group-hover:translate-x-1 duration-200" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </section>
          </div>
        </CinematicCurtain>
      </div>
    </article>
  );
}

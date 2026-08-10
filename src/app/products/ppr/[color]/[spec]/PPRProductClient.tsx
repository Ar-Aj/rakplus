"use client";


/**
 * PPRProductClient — Phase 21.0 Hyper-Alpha Redesign
 *
 * Architecture:
 *   Layer 0: Fixed pristine white background with subtle emerald grid
 *   Layer 1: Scroll spacer (100vh) — user scrolls to reveal
 *   Layer 2: CinematicCurtain wrapping all product data (Frosted White)
 *
 * Inside the curtain:
 *   - Pitch black typography, emerald accents, crimson hovers.
 *   - Clinical light-mode engineering tables.
 *   - Elite GSAP reveals (clip-path, stagger, scale).
 */

import Link from "next/link";
import CinematicCurtain from "@/components/CinematicCurtain";
import { getAdjacentSpecs } from "@/config/pprData";
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

interface PPRProductClientProps {
  specData: PprSpecConfig;
  color: string;
}

const APPLICATION_ICONS = [Droplets, Factory, Waves, FlaskConical];

export default function PPRProductClient({
  specData,
  color,
}: PPRProductClientProps) {
  const { prev, next } = getAdjacentSpecs(specData.specSlug);
  const buildUrl = (spec: string) => `/products/ppr/${color}/${spec}`;

  return (
    <article className="relative min-h-[200vh] bg-white">
      {/* ═══════════════════════════════════════════════════════
          LAYER 0 — Fixed Pristine Background
          ═══════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-white" />

        {/* Subtle emerald grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(5,150,105,1) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* RAKPLUS watermark */}
        <div className="absolute bottom-[15%] right-[5%] select-none pointer-events-none">
          <span
            className="font-sans text-[12vw] font-black leading-none tracking-tighter"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(5,150,105,0.08)",
            }}
          >
            RAK+
          </span>
        </div>

        {/* Hero content overlay — visible during spacer scroll */}
        <div className="absolute inset-0 flex items-center px-[10vw]">
          <div className="w-full max-w-[1920px] mx-auto reveal-section">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald">
                PP-R Pipes / Fittings — <span className="text-red-600">German Standard</span> Engineering
              </span>
            </div>
            <h2 className="font-sans font-extrabold text-5xl sm:text-6xl lg:text-8xl font-extrabold text-neutral-950 tracking-tighter leading-[0.9] mb-6">
              Engineered
              <br />
              <span className="text-emerald">Without</span>
              <br />
              Compromise.
            </h2>
            <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                {specData.shortDescription}
              </p>
            </div>

            {/* Scroll indicator */}
            <div className="mt-12 flex items-center gap-3">
              <div className="w-[1px] h-16 bg-neutral-950/20" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-950 font-bold">
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
          <div className="w-full px-[10vw] max-w-[1920px] mx-auto">
            
            {/* ─── Breadcrumb ─── */}
            <nav
              className="flex items-center gap-2 text-sm mb-16 w-full reveal-curtain-child"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="text-neutral-950 hover:text-emerald transition-colors font-bold"
              >
                Home
              </Link>
              <span className="text-neutral-950 font-black">/</span>
              <Link
                href="/products"
                className="text-neutral-950 hover:text-emerald transition-colors font-bold"
              >
                Products
              </Link>
              <span className="text-neutral-950 font-black">/</span>
              <span className="text-neutral-950 font-bold">
                PP-R {color.charAt(0).toUpperCase() + color.slice(1)}
              </span>
              <span className="text-neutral-950 font-black">/</span>
              <span className="text-emerald font-bold truncate">
                {specData.specSlug.toUpperCase().replace("-", " / ")}
              </span>
            </nav>

            {/* ════════════════════════════════════════════
                SECTION 1 — Hero / Overview
                ════════════════════════════════════════════ */}
            <section
              className="w-full mb-32 lg:mb-48"
              aria-label="Product overview"
            >
              <div className="flex flex-wrap gap-3 mb-10 reveal-curtain-child">
                <span className="px-5 py-2 text-xs font-bold text-neutral-950 border border-neutral-950/20 rounded-full uppercase tracking-widest flex items-center shadow-sm">
                  <Shield className="w-4 h-4 mr-2 text-red-600" />
                  DIN 8077/78
                </span>
                <span className="px-5 py-2 text-xs font-bold text-neutral-950 border border-neutral-950/20 rounded-full uppercase tracking-widest flex items-center shadow-sm">
                  <Shield className="w-4 h-4 mr-2 text-amber-500" />
                  ISO 9001:2015
                </span>
                <span className="px-5 py-2 text-xs font-bold text-neutral-950 border border-neutral-950/20 rounded-full uppercase tracking-widest flex items-center shadow-sm">
                  <Zap className="w-4 h-4 mr-2 text-emerald" />
                  <span className="text-emerald-600">50-Year Guarantee</span>
                </span>
              </div>

              <h1 className="font-sans text-[clamp(3.5rem,8vw,8rem)] font-extrabold text-neutral-950 tracking-tighter leading-[0.85] mb-12 reveal-typography max-w-6xl">
                <span dangerouslySetInnerHTML={{
                  __html: specData.title
                    .replace(/(PN\d+)/g, '<span class="relative pb-4 inline-block text-red-600 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">$1</span>')
                    .replace(/(DIN 8077\/[0-9]+|DIN 8077\/78)/g, '<span class="relative pb-4 inline-block text-yellow-400 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">$1</span>')
                    .replace(/(PP-R|PPR)/g, '<span class="relative pb-4 inline-block text-neutral-950 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">$1</span>')
                }} />
              </h1>

              <div className="w-24 h-[3px] bg-emerald-500 rounded-full mb-12 reveal-curtain-child" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
                <div className="lg:col-span-8">
                  <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full mb-10">
                    <p 
                      className="gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950"
                      dangerouslySetInnerHTML={{
                        __html: specData.shortDescription
                          .replace(/UAE/g, '<span class="text-red-600">UAE</span>')
                          .replace(/Dubai/g, '<span class="text-red-600">Dubai</span>')
                          .replace(/German Standard/ig, '<span class="text-yellow-400">German Standard</span>')
                      }} 
                    />
                  </div>

                  <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
                    <p 
                      className="gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950"
                      dangerouslySetInnerHTML={{
                        __html: specData.overviewParagraph
                          .replace(/UAE/g, '<span class="text-red-600">UAE</span>')
                          .replace(/Dubai/g, '<span class="text-red-600">Dubai</span>')
                          .replace(/German Standard/ig, '<span class="text-yellow-400">German Standard</span>')
                      }} 
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 2 — Features & Applications
                ════════════════════════════════════════════ */}
            <section
              className="w-full mb-32 lg:mb-48"
              aria-label="Features and applications"
            >
              <h2 className="font-sans font-extrabold text-4xl lg:text-6xl font-extrabold text-neutral-950 tracking-tighter mb-6 reveal-typography">
                Dubai&apos;s Top Choice for Hot &amp; Cold Water Transmission
              </h2>
              <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl mb-16 max-w-3xl">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Precision-engineered PP-R Pipes / Fittings delivering unmatched
                performance across the Gulf region&apos;s most demanding
                infrastructure projects.
              </p>
            </div>

              {/* Asymmetrical 12-col grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
                
                {/* Left: Engineering Advantages (Spans 5 cols) */}
                <div className="lg:col-span-5 reveal-curtain-child">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-emerald/10 flex items-center justify-center">
                      <Zap className="w-7 h-7 text-emerald" />
                    </div>
                    <h3 className="font-sans font-extrabold text-3xl font-extrabold text-neutral-950 tracking-tight">
                      Engineering Advantages
                    </h3>
                  </div>

                  <ul className="space-y-8">
                    {specData.featuresGrid.map((feature, i) => (
                      <li key={i} className="flex items-start gap-5">
                        <div className="w-2 h-2 rounded-full bg-emerald mt-2.5 flex-shrink-0" />
                        <span className="text-lg lg:text-xl text-neutral-950 leading-loose font-normal">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Industrial Applications (Spans 6 cols, starts at col 7) */}
                <div className="lg:col-start-7 lg:col-span-6 reveal-curtain-child">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center border border-neutral-200">
                      <Factory className="w-7 h-7 text-neutral-950" />
                    </div>
                    <h3 className="font-sans font-extrabold text-3xl font-extrabold text-neutral-950 tracking-tight">
                      Industrial Applications
                    </h3>
                  </div>

                  <ul className="space-y-6">
                    {specData.applicationsList.map((app, i) => {
                      const Icon = APPLICATION_ICONS[i % APPLICATION_ICONS.length];
                      return (
                        <li
                          key={i}
                          className="flex items-start gap-6 p-6 rounded-2xl border border-neutral-950/10 bg-white hover:border-emerald/40 transition-all duration-300 shadow-sm"
                        >
                          <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-neutral-950" />
                          </div>
                          <span className="text-lg lg:text-xl text-neutral-950 leading-loose font-normal pt-1">
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
              className="w-full mb-32 lg:mb-48"
              aria-label="Engineering specifications"
            >
              {/* Asymmetrical 12-col grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
                
                {/* Left: Typography (Spans 4 cols) */}
                <div className="lg:col-span-4 reveal-curtain-child z-10 relative">
                  <div className="flex flex-col gap-6 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-emerald/10 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-emerald" />
                    </div>
                    <h2 className="font-sans font-extrabold text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tighter">
                      Complete
                      <br />
                      Engineering
                      <br />
                      Specifications
                    </h2>
                  </div>
                  <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Dimensional data sourced directly from the RAKPLUS product
                    catalog. All measurements conform to DIN 8077/78 German
                    engineering standards. Matrix renders all available pipe sizes.
              </p>
            </div>
                </div>

                {/* Right: Table (Spans 8 cols, pulls left with negative margin) */}
                <div className="lg:col-span-8 lg:-ml-12 reveal-curtain-child">
                <div className="rounded-2xl border border-neutral-200 shadow-sm w-full overflow-hidden bg-white">
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left min-w-[800px]">
                      <thead>
                        <tr className="bg-neutral-50 border-b border-neutral-200">
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 whitespace-nowrap text-emerald">
                            Part No.
                          </th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 whitespace-nowrap">
                            OD (mm)
                          </th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 whitespace-nowrap">
                            Wall (mm)
                          </th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 whitespace-nowrap">
                            ID (mm)
                          </th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 whitespace-nowrap">
                            Pack
                          </th>
                          <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 whitespace-nowrap">
                            Kg/Mtr
                          </th>
                          {specData.hasWaterContent && (
                            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 whitespace-nowrap">
                              Water (L/Mtr)
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="font-mono tabular-nums">
                        {specData.engineeringTable.map((row, i) => (
                          <tr
                            key={row.part}
                            className={`border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors duration-200 ${
                              i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"
                            }`}
                          >
                            <td className="px-6 py-4 text-sm text-emerald font-bold whitespace-nowrap">
                              {row.part}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-950 font-normal whitespace-nowrap">
                              <span className="text-neutral-950 font-black mr-1">⌀</span>
                              {row.od_mm}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-950 font-normal whitespace-nowrap">
                              {row.wall_mm}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-950 font-normal whitespace-nowrap">
                              {row.id_mm}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-950 font-normal whitespace-nowrap">
                              {row.pack}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-950 font-bold whitespace-nowrap">
                              {row.kg_mtr}
                            </td>
                            {specData.hasWaterContent && (
                              <td className="px-6 py-4 text-sm text-neutral-950 font-normal whitespace-nowrap">
                                {row.water_l_mtr ?? "—"}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-5 border-t border-neutral-200 bg-neutral-100">
                    <p className="text-xs text-neutral-950 font-medium">
                      Showing all {specData.engineeringTable.length} sizes available · 
                      Data sourced from RAKPLUS product catalog · DIN 8077/78 compliant
                    </p>
                  </div>
                </div>
              </div>
              </div>{/* /grid */}
            </section>

            {/* ════════════════════════════════════════════
                SECTION 3.5 — Technical Directives
                ════════════════════════════════════════════ */}
            <section
              className="w-full mb-32 lg:mb-48"
              aria-label="Installation and Welding Guidelines"
            >
              {/* Asymmetrical 12-col grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
                
                {/* Left: Welding Directives (Spans 5 cols) */}
                <div className="lg:col-span-5 reveal-curtain-child">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center border border-neutral-200">
                      <Wrench className="w-7 h-7 text-neutral-950" />
                    </div>
                    <h2 className="font-sans font-extrabold text-3xl font-extrabold text-neutral-950 tracking-tight">
                      Installation &amp; Welding
                    </h2>
                  </div>
                  <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full mb-10">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                RAKPLUS PP-R Pipes / Fittings utilize homogeneous thermal polyfusion bonding. Following proper socket fusion parameters according to <strong className="font-bold">DIN 16962</strong> and <strong className="font-bold"><span className="text-yellow-400">DVS 2207</span></strong> is critical to guarantee a 100% leak-proof, monolithic piping system that lasts 50+ years.
              </p>
            </div>
                  <ul className="space-y-8">
                    <li className="flex items-start gap-5">
                      <div className="w-2 h-2 rounded-full bg-emerald mt-3 flex-shrink-0" />
                      <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                <strong className="font-bold">Fusion Temperature:</strong> The welding tool must be strictly calibrated and stabilized at 260°C (±10°C) before initiating any socket fusion.
              </p>
            </div>
                    </li>
                    <li className="flex items-start gap-5">
                      <div className="w-2 h-2 rounded-full bg-emerald mt-3 flex-shrink-0" />
                      <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                <strong className="font-bold">Heating &amp; Cooling Times:</strong> Ensure adherence to specific heating durations relative to pipe diameter. Do not apply mechanical stress during the cooling phase.
              </p>
            </div>
                    </li>
                    <li className="flex items-start gap-5">
                      <div className="w-2 h-2 rounded-full bg-emerald mt-3 flex-shrink-0" />
                      <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                <strong className="font-bold">Alignment Tolerance:</strong> Pipes and fittings must be aligned precisely. Minor adjustments can only be made within the first few seconds post-insertion.
              </p>
            </div>
                    </li>
                  </ul>
                </div>
                
                {/* ════════════════════════════════════════════
                    SECTION 3.6 — UAE Project Compliance Block
                    (Spans 6 cols, starts at col 7)
                    ════════════════════════════════════════════ */}
                <div className="lg:col-start-7 lg:col-span-6 reveal-curtain-child">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center border border-neutral-200">
                      <Award className="w-7 h-7 text-neutral-950" />
                    </div>
                    <h2 className="font-sans font-extrabold text-3xl font-extrabold text-neutral-950 tracking-tight">
                      UAE Project Compliance
                    </h2>
                  </div>
                  <div className="p-10 rounded-2xl border border-neutral-950/10 bg-white shadow-sm hover:border-emerald/40 transition-colors">
                    <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full mb-10">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Engineered for the Middle East, RAKPLUS systems exceed the stringent requirements set by local municipalities and international standardization bodies.
              </p>
            </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="p-8 rounded-2xl border border-neutral-950/10 bg-neutral-50">
                        <h4 className="text-neutral-950 font-extrabold mb-4 tracking-tight text-xl">DVS 2207 Welding</h4>
                        <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Full material traceability and compliance with German thermal polyfusion standards.
              </p>
            </div>
                      </div>
                      <div className="p-8 rounded-2xl border border-neutral-950/10 bg-neutral-50">
                        <h4 className="text-neutral-950 font-extrabold mb-4 tracking-tight text-xl">Potable Water Safe</h4>
                        <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Independently tested to guarantee zero toxicity and zero microbial growth.
              </p>
            </div>
                      </div>
                      <div className="p-8 rounded-2xl border border-neutral-950/10 bg-neutral-50">
                        <h4 className="text-neutral-950 font-extrabold mb-4 tracking-tight text-xl">ISO Certifications</h4>
                        <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Manufactured under <span className="text-yellow-400">ISO 9001:2015</span> (Quality) and <span className="text-yellow-400">ISO 14001:2015</span> (Environmental) systems.
              </p>
            </div>
                      </div>
                      <div className="p-8 rounded-2xl border border-neutral-950/10 bg-neutral-50">
                        <h4 className="text-neutral-950 font-extrabold mb-4 tracking-tight text-xl">Thermal Resilience</h4>
                        <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Rated for continuous operation from 0°C to 70°C, with a 100°C short-term peak capacity.
              </p>
            </div>
                      </div>
                      <div className="p-6 rounded-xl border border-neutral-200 bg-white shadow-sm sm:col-span-2">
                        <h4 className="text-neutral-950 font-bold mb-3 tracking-tight">Municipality Approvals</h4>
                        <p className="text-sm text-neutral-950 leading-relaxed font-medium">
                          Fully approved by Dubai Municipality and relevant UAE authorities for large-scale residential, commercial, and high-rise developments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 4 — Spec Selector
                ════════════════════════════════════════════ */}
            <section
              className="w-full pt-16 lg:pt-24 border-t-2 border-neutral-200"
              aria-label="Related specifications"
            >
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="font-sans font-extrabold text-3xl lg:text-5xl font-extrabold text-neutral-950 tracking-tighter mb-6">
                  Explore the Range
                </h2>
                <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl mb-10 w-full max-w-3xl">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                RAKPLUS PP-R pipes are available in a comprehensive range of
                  sizes and pressure ratings to accommodate any residential,
                  commercial, or industrial requirement.
              </p>
            </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mb-20">
                {/* Prev */}
                {prev ? (
                  <Link
                    href={buildUrl(prev.specSlug)}
                    className="group flex flex-col p-8 rounded-2xl border border-neutral-950/10 bg-white hover:border-emerald/40 transition-all duration-300 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-6 text-neutral-950 group-hover:text-emerald transition-colors">
                      <ArrowLeft className="w-5 h-5 text-neutral-950 group-hover:text-emerald transition-colors group-hover:-translate-x-1 duration-300" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                        Previous Spec
                      </span>
                    </div>
                    <h3 className="font-sans font-extrabold text-2xl font-extrabold text-neutral-950 tracking-tight group-hover:text-emerald transition-colors">
                      {prev.specSlug.toUpperCase().replace("-", " / ")}
                    </h3>
                  </Link>
                ) : (
                  <div className="hidden md:block" />
                )}

                {/* Next */}
                {next && (
                  <Link
                    href={buildUrl(next.specSlug)}
                    className="group flex flex-col p-8 rounded-2xl border border-neutral-950/10 bg-white hover:border-emerald/40 transition-all duration-300 shadow-sm items-end text-right"
                  >
                    <div className="flex items-center gap-3 mb-6 text-neutral-950 group-hover:text-emerald transition-colors">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                        Next Spec
                      </span>
                      <ArrowRight className="w-5 h-5 text-neutral-950 group-hover:text-emerald transition-colors group-hover:translate-x-1 duration-300" />
                    </div>
                    <h3 className="font-sans font-extrabold text-2xl font-extrabold text-neutral-950 tracking-tight group-hover:text-emerald transition-colors">
                      {next.specSlug.toUpperCase().replace("-", " / ")}
                    </h3>
                  </Link>
                )}
              </div>

              <div className="flex justify-center pb-24">
                <Link
                  href="/products"
                  className="text-xs text-neutral-950 uppercase tracking-[0.2em] font-black hover:text-emerald transition-colors"
                >
                  View Full Catalogue →
                </Link>
              </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 5 — CTA
                ════════════════════════════════════════════ */}
            <section
              className="w-full mb-24 lg:mb-32 reveal-curtain-child"
              aria-label="Call to action"
            >
              <div className="p-10 lg:p-16 rounded-3xl border border-neutral-200 bg-neutral-50">
                <h3 className="font-sans font-extrabold text-3xl lg:text-4xl font-bold text-neutral-950 tracking-tight mb-6">
                  Specify This Product for Your Project
                </h3>
                <p className="text-neutral-950 text-lg font-medium leading-relaxed mb-10 w-full max-w-3xl">
                  Our engineering team at Aquasmart Plastic Industries can help
                  configure the exact PP-R Pipes / Fittings specification for
                  your infrastructure requirements across Dubai and the UAE.
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <Link
                    href="/contact"
                    className="reveal-cta inline-flex items-center gap-3 px-8 py-4 bg-neutral-950 hover:bg-red-600 text-white text-base font-bold rounded-full transition-all duration-300 hover:shadow-xl group"
                  >
                    Request a Quote
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/products"
                    className="reveal-cta inline-flex items-center gap-2 px-8 py-4 text-neutral-950 text-base font-bold rounded-full border border-neutral-300 hover:border-red-600 hover:text-red-600 transition-all duration-300"
                  >
                    View All Pipes / Fittings
                  </Link>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════════════
                SECTION 6 — Product Navigation
                ════════════════════════════════════════════ */}
            <section
              className="w-full pt-10 border-t border-neutral-200"
              aria-label="Product navigation"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                {prev ? (
                  <Link
                    href={buildUrl(prev.specSlug)}
                    className="group flex items-center gap-4 px-8 py-5 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all duration-300"
                  >
                    <ArrowLeft className="w-5 h-5 text-neutral-950 group-hover:text-emerald transition-colors group-hover:-translate-x-1 duration-300" />
                    <div className="text-left">
                      <p className="text-[10px] text-neutral-950 uppercase tracking-widest font-bold mb-1">
                        Previous
                      </p>
                      <p className="text-base text-neutral-950 font-bold group-hover:text-emerald transition-colors">
                        {prev.specSlug.toUpperCase().replace("-", " / ")}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                <Link
                  href="/products"
                  className="text-xs text-neutral-950 uppercase tracking-[0.2em] font-bold hover:text-emerald transition-colors"
                >
                  All Pipes / Fittings
                </Link>

                {next ? (
                  <Link
                    href={buildUrl(next.specSlug)}
                    className="group flex items-center gap-4 px-8 py-5 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all duration-300"
                  >
                    <div className="text-right">
                      <p className="text-[10px] text-neutral-950 uppercase tracking-widest font-bold mb-1">
                        Next
                      </p>
                      <p className="text-base text-neutral-950 font-bold group-hover:text-emerald transition-colors">
                        {next.specSlug.toUpperCase().replace("-", " / ")}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-neutral-950 group-hover:text-emerald transition-colors group-hover:translate-x-1 duration-300" />
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

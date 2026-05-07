"use client";

/**
 * Sustainability Page — Phase 10.3 Structural Refactor
 *
 * 121 frames at native 24fps.
 * Layout: Flex/Grid stacking SIBLING to CanvasSequence to fix Footer trapping.
 * Reveal: useScrollReveal hook for consistent text fading.
 * Typography: Extreme drop-shadows, pure white text, Red German accents.
 */

import Link from "next/link";
import CanvasSequence from "@/components/CanvasSequence";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  Shield,
  Award,
  Droplets,
  Leaf,
  Recycle,
  HeartPulse,
  ThermometerSun,
  ShieldCheck,
} from "lucide-react";

// ─── Sustainability Pillars Data ───
const PILLARS = [
  {
    icon: Leaf,
    title: "Lower Manufacturing Energy",
    description:
      "PP-R pipes require significantly less energy to manufacture than copper, steel, or iron alternatives. The extrusion process operates at lower temperatures with reduced carbon emissions per meter of pipe produced.",
    accent: "bg-brand-green/10 text-brand-green border-brand-green/20",
  },
  {
    icon: Droplets,
    title: "Potable Water Safe",
    description:
      "Certified under DIN 8077/8078 for potable drinking water transmission. RAKPLUS PP-R is inherently non-toxic — no heavy metals, no chemical leaching, no taste or odour transfer to the water supply.",
    accent: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  {
    icon: Recycle,
    title: "Recyclable Material",
    description:
      "Polypropylene random copolymer is a fully recyclable thermoplastic. End-of-life RAKPLUS pipes can be reprocessed into new PP-R products, reducing landfill burden and supporting circular economy principles.",
    accent: "bg-brand-green/10 text-brand-green border-brand-green/20",
  },
  {
    icon: HeartPulse,
    title: "Hygienic & Non-Toxic",
    description:
      "Unlike metal pipes that corrode and release particulates, RAKPLUS PP-R maintains a smooth, inert inner surface throughout its entire 50-year service life. Hygienic and non-toxic compared to metal or other plastic products.",
    accent: "bg-red-600/10 text-red-600 border-red-600/20",
  },
  {
    icon: ThermometerSun,
    title: "Zero Scaling & Corrosion",
    description:
      "PP-R is chemically inert to water and common building chemicals. There is zero mineral scaling, no galvanic corrosion, and no biofilm formation — delivering consistent flow rates decade after decade.",
    accent: "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20",
  },
  {
    icon: ShieldCheck,
    title: "50-Year Durability",
    description:
      "A guaranteed service life of 50 years under continuous operational stress means fewer replacements, less construction waste, and dramatically reduced lifecycle environmental impact compared to metal piping systems.",
    accent: "bg-white/10 text-white border-white/20",
  },
];

// ─── Page ───
export default function SustainabilityPage() {
  useScrollReveal();

  return (
    <main className="relative w-full bg-transparent">
      {/* ─── Global Cinematic Vignette ─── */}
      <div
        className="fixed inset-0 pointer-events-none z-[0]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* ─── Canvas Sequence (Untrapped Background) ─── */}
      <CanvasSequence
        desktopPath="/sustainability-desktop/"
        mobilePath="/sustainability-mobile/"
        frameCount={121}
      />

      {/* ─── Scrolling Content (Sibling to Canvas) ─── */}
      <div className="relative z-10 flex flex-col w-full">
        {/* ═══════════════════════════════════════════════════════════
            SECTION 1 — Pure Water. Clean Future.
            ═══════════════════════════════════════════════════════════ */}
        <section
          id="sustainability-hero"
          className="min-h-screen flex flex-col items-center justify-center py-20"
        >
          <div className="text-center px-6 max-w-5xl mx-auto reveal-section">
            <p className="text-xs font-bold text-brand-green uppercase tracking-[0.3em] mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Sustainability
            </p>
            <h1 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9]">
              100% Safe.
              <br />
              <span className="text-brand-green drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                Hygienic. Non-Toxic
              </span>
              <span className="text-red-600">.</span>
            </h1>

            <p className="mt-6 sm:mt-8 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-bold max-w-2xl mx-auto md:leading-relaxed">
              100% safe, hygienic, and non-toxic potable water systems.
              DIN 8077/8078 certified for drinking water transmission.
            </p>

            <div className="mt-10 sm:mt-14 flex flex-col items-center gap-2 animate-bounce">
              <span className="text-white/80 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                Scroll to explore
              </span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2 — Zero Scaling. Zero Corrosion.
            ═══════════════════════════════════════════════════════════ */}
        <section
          id="zero-scaling-section"
          className="min-h-screen flex flex-col items-center justify-center py-20"
        >
          <div className="text-center px-6 max-w-4xl mx-auto reveal-section">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-red-600/50 mb-8 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <ThermometerSun className="w-4 h-4 text-brand-yellow" />
              <span className="text-xs font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Chemically Inert PP-R
              </span>
            </div>

            <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
              Zero Scaling.
              <br />
              <span className="text-brand-yellow drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                Zero Corrosion
              </span>
              <span className="text-red-600">.</span>
            </h2>

            <p className="mt-6 sm:mt-8 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-bold max-w-xl mx-auto md:leading-relaxed">
              Zero scaling, zero corrosion. Guaranteed service life of over
              50 years. PP-R is chemically inert — no biofilm formation,
              no galvanic corrosion, consistent flow rates decade after decade.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md mx-auto">
              {[
                { value: "0%", label: "Scaling" },
                { value: "0%", label: "Corrosion" },
                { value: "50yr", label: "Flow Life" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold font-display text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/80 font-bold uppercase tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 3 — Eco-Friendly Manufacturing
            ═══════════════════════════════════════════════════════════ */}
        <section
          id="eco-manufacturing-section"
          className="min-h-screen flex flex-col items-center justify-center py-20"
        >
          <div className="text-center px-6 max-w-4xl mx-auto reveal-section">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-red-600/50 mb-8 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <Shield className="w-4 h-4 text-brand-green" />
              <span className="text-xs font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                DIN 8077/8078 Certified
              </span>
            </div>

            <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
              Eco-Friendly
              <br />
              <span className="text-brand-green drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                Manufacturing
              </span>
              <span className="text-red-600">.</span>
            </h2>

            <p className="mt-6 sm:mt-8 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-bold max-w-xl mx-auto md:leading-relaxed">
              Environmentally friendly manufacturing. Fully recyclable PP-R
              polymers. Lower energy consumption than copper, steel, or iron
              alternatives — with zero toxic byproducts.
            </p>

            <div className="mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-base font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-red-600 hover:bg-white/20 group"
              >
                Explore Our Products
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 text-brand-green" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 4 — ISO/DIN Certifications Grid
            ═══════════════════════════════════════════════════════════ */}
        <section
          id="certifications-section"
          className="min-h-screen flex flex-col items-center justify-center py-20"
        >
          <div className="text-center px-6 max-w-4xl mx-auto reveal-section">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-red-600/50 mb-8 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <Award className="w-4 h-4 text-brand-yellow" />
              <span className="text-xs font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Internationally Certified
              </span>
            </div>

            <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95]">
              Certified
              <br />
              <span className="text-brand-yellow drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                Excellence
              </span>
              <span className="text-red-600">.</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-bold max-w-xl mx-auto leading-relaxed">
              Proudly holding ISO 9001:2015 quality management and
              ISO 14001:2015 environmental management certifications.
              Every product is tested, traceable, and guaranteed.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                "ISO 9001:2015",
                "ISO 14001:2015",
                "DIN 8077/8078",
                "DVS 2207",
                "EN ISO 15874-2",
              ].map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1.5 text-[11px] font-bold text-white border border-white/30 rounded-lg uppercase tracking-wider backdrop-blur-sm shadow-[0_4px_10px_rgba(0,0,0,0.5)] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Below-Fold: Sustainability Pillars Section ─── */}
        <article className="relative z-10 bg-transparent py-20 lg:py-28 px-6 lg:px-8">
          <div className="relative z-10 max-w-7xl mx-auto reveal-section">
            <div className="max-w-2xl mb-16">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                Engineering a Sustainable Pipeline<span className="text-red-600">.</span>
              </h2>
              <p className="text-white/95 leading-relaxed font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                RAKPLUS PP-R pipes are environment-friendly as they take less
                energy to manufacture than metal alternatives. From raw material
                to end-of-life recyclability, every stage of the RAKPLUS
                lifecycle is designed to minimize environmental impact while
                delivering a 50-year guaranteed service life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PILLARS.map((pillar) => (
                <section
                  key={pillar.title}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-red-600/50 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${pillar.accent} border flex items-center justify-center mb-6 shadow-[0_4px_10px_rgba(0,0,0,0.5)]`}
                  >
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-extrabold text-white tracking-tight mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    {pillar.description}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </article>

        {/* ─── Water Safety Deep Dive ─── */}
        <section className="relative py-20 lg:py-28 px-6 lg:px-8 bg-transparent">
          <div className="relative z-10 max-w-7xl mx-auto reveal-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-3xl font-extrabold text-white tracking-tight mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                  Safe for Drinking Water<span className="text-red-600">.</span>
                </h2>
                <p className="text-white/95 leading-relaxed mb-4 font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                  Water quality is not negotiable. RAKPLUS PP-R pipes are
                  certified under DIN 8077/8078 specifically for potable drinking
                  water transmission — meaning they have been independently
                  tested and verified to introduce zero contaminants into the
                  water supply.
                </p>
                <p className="text-white/95 leading-relaxed mb-4 font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                  The smooth, chemically inert inner surface of PP-R prevents
                  biofilm formation, mineral scaling, and particulate buildup
                  that plague metal piping systems. This translates to
                  consistently clean water and maintained flow rates throughout
                  the entire 50-year service life.
                </p>
                <p className="text-white/95 leading-relaxed font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                  For projects where water hygiene is critical — hospitals,
                  schools, food processing facilities, and residential
                  developments — RAKPLUS delivers the assurance of
                  German-standard certification combined with non-toxic,
                  corrosion-free material performance.
                </p>
              </div>

              <div className="flex flex-col justify-center">
                <div className="p-8 lg:p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <h3 className="font-display text-2xl font-extrabold text-white tracking-tight mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                    Environmental Comparison
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Manufacturing Energy",
                        ppr: "Low",
                        metal: "High",
                      },
                      {
                        label: "Corrosion Risk",
                        ppr: "Zero",
                        metal: "High",
                      },
                      {
                        label: "Scaling Buildup",
                        ppr: "Zero",
                        metal: "Progressive",
                      },
                      {
                        label: "Recyclability",
                        ppr: "Full",
                        metal: "Partial",
                      },
                      {
                        label: "Service Life",
                        ppr: "50 years",
                        metal: "15–25 years",
                      },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="grid grid-cols-3 gap-4 py-3 border-b border-white/10 last:border-b-0"
                      >
                        <span className="text-sm font-bold text-white/95 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                          {row.label}
                        </span>
                        <span className="text-sm text-brand-green font-extrabold text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                          {row.ppr}
                        </span>
                        <span className="text-sm text-white/60 font-bold text-center">
                          {row.metal}
                        </span>
                      </div>
                    ))}
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                        Property
                      </span>
                      <span className="text-[10px] text-brand-green font-extrabold uppercase tracking-widest text-center">
                        RAKPLUS PP-R
                      </span>
                      <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest text-center">
                        Metal Pipe
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA (transparent) ─── */}
        <section className="relative py-20 px-6 lg:px-8 bg-transparent">
          <div className="relative z-10 max-w-3xl mx-auto text-center reveal-section">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
              Build with Confidence<span className="text-red-600">.</span>
            </h2>
            <p className="mt-4 text-white/95 leading-relaxed max-w-lg mx-auto font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
              Choose a piping system that protects both your project and the
              environment — for the next 50 years.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white text-sm font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-red-600/30 hover:-translate-y-1 border border-red-500"
              >
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-bold rounded-full border border-white/30 hover:border-red-600 transition-all duration-200 hover:bg-white/10 backdrop-blur-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

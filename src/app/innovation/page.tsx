"use client";

/**
 * Innovation Page — Phase 10.3 Structural Refactor
 *
 * 121 frames (shared from sustainability).
 * Layout: Flex/Grid stacking SIBLING to CanvasSequence to fix Footer trapping.
 * Reveal: useScrollReveal hook for consistent text fading.
 * Typography: Extreme drop-shadows, pure white text, Red German accents.
 */

import Link from "next/link";
import CanvasSequence from "@/components/CanvasSequence";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  Layers,
  Zap,
  FlaskConical,
  Cpu,
  Shield,
} from "lucide-react";

// ─── Innovation Pillars Data ───
const INNOVATIONS = [
  {
    icon: Layers,
    title: "DIN 8077/8078 Precision",
    description:
      "Every RAKPLUS pipe is manufactured to the exacting dimensional tolerances of DIN 8077 (dimensions) and DIN 8078 (determination of properties). This guarantees precise wall thickness, outer diameter consistency, and pressure classification accuracy across every production batch.",
    accent: "bg-brand-green/10 text-brand-green border-brand-green/20",
  },
  {
    icon: Zap,
    title: "DVS 2207 Welding Technology",
    description:
      "Our fittings and jointing systems comply with DVS 2207 — the German welding regulation for thermoplastic pipes. This ensures fusion joints achieve the same structural integrity as the pipe wall itself, with zero leakage risk over the full 50-year service life.",
    accent: "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20",
  },
  {
    icon: FlaskConical,
    title: "PP-R Random Copolymer",
    description:
      "RAKPLUS uses polypropylene random copolymer (PP-R Type 3) — a material engineered for superior tightness, excellent elasticity and rigidity, and high resistance to aggressive fluids. The molecular structure delivers damped vibrations and noise reduction throughout the pipe network.",
    accent: "bg-red-600/10 text-red-600 border-red-600/20",
  },
  {
    icon: Cpu,
    title: "SDR Engineering",
    description:
      "Our pipe range spans four Standard Dimension Ratios — SDR11 (PN10), SDR7.4 (PN16), SDR6 (PN20), and SDR5 (PN25) — each precisely calibrated to deliver the optimal wall thickness-to-diameter ratio for its pressure class, from cold water distribution to high-pressure industrial networks.",
    accent: "bg-white/10 text-white border-white/20",
  },
];

// ─── Page ───
export default function InnovationPage() {
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
            SECTION 1 — Innovation at Every Layer
            ═══════════════════════════════════════════════════════════ */}
        <section
          id="innovation-hero"
          className="min-h-screen flex flex-col items-center justify-center py-20"
        >
          <div className="text-center px-6 max-w-5xl mx-auto reveal-section">
            <p className="text-xs font-bold text-brand-yellow uppercase tracking-[0.3em] mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Engineering Excellence
            </p>
            <h1 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9]">
              Innovation at
              <br />
              <span className="text-brand-yellow drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                Every Layer
              </span>
              <span className="text-red-600">.</span>
            </h1>

            <p className="mt-6 sm:mt-8 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-bold max-w-2xl mx-auto md:leading-relaxed">
              Advanced Polypropylene Random-Copolymer (PP-R) engineering.
              Industry-leading thermal conductivity of 0.24 W/mK at 20°C.
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
            SECTION 2 — German Precision Engineering
            ═══════════════════════════════════════════════════════════ */}
        <section
          id="precision-section"
          className="min-h-screen flex flex-col items-center justify-center py-20"
        >
          <div className="text-center px-6 max-w-4xl mx-auto reveal-section">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-red-600/50 mb-8 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <Layers className="w-4 h-4 text-brand-green" />
              <span className="text-xs font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                DIN 8077 / 8078
              </span>
            </div>

            <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
              German Precision
              <br />
              <span className="text-brand-green drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                Engineering
              </span>
              <span className="text-red-600">.</span>
            </h2>

            <p className="mt-6 sm:mt-8 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-bold max-w-xl mx-auto md:leading-relaxed">
              Advanced PP-R material science — manufactured to the exacting
              dimensional tolerances of DIN 8077/8078. Precise wall thickness,
              outer diameter consistency, and pressure classification accuracy
              across every production batch.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
              {[
                { value: "PN10", label: "to PN25" },
                { value: "20mm", label: "to 160mm" },
                { value: "SDR6", label: "to SDR11" },
                { value: "50yr", label: "Service Life" },
              ].map((stat) => (
                <div key={stat.value} className="text-center">
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
            SECTION 3 — DVS 2207 Fusion Welding
            ═══════════════════════════════════════════════════════════ */}
        <section
          id="welding-section"
          className="min-h-screen flex flex-col items-center justify-center py-20"
        >
          <div className="text-center px-6 max-w-4xl mx-auto reveal-section">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-red-600/50 mb-8 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <Zap className="w-4 h-4 text-brand-yellow" />
              <span className="text-xs font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                DVS 2207 Certified
              </span>
            </div>

            <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
              DVS 2207
              <br />
              <span className="text-brand-yellow drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                Fusion Welding
              </span>
              <span className="text-red-600">.</span>
            </h2>

            <p className="mt-6 sm:mt-8 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-bold max-w-xl mx-auto md:leading-relaxed">
              Unbreakable DVS 2207 thermal fusion joints. Fusion welds
              achieve the same structural integrity as the pipe wall itself —
              zero leakage risk over the full 50-year service life.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 4 — Unbreakable Joints. Zero Leaks.
            ═══════════════════════════════════════════════════════════ */}
        <section
          id="joints-section"
          className="min-h-screen flex flex-col items-center justify-center py-20"
        >
          <div className="text-center px-6 max-w-4xl mx-auto reveal-section">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-red-600/50 mb-8 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <Shield className="w-4 h-4 text-brand-green" />
              <span className="text-xs font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Leak-Free Guarantee
              </span>
            </div>

            <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
              Unbreakable Joints.
              <br />
              <span className="text-brand-green drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                Zero Leaks
              </span>
              <span className="text-red-600">.</span>
            </h2>

            <p className="mt-6 sm:mt-8 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-bold max-w-xl mx-auto md:leading-relaxed">
              PP-R random copolymer (Type 3) delivers superior tightness,
              excellent elasticity and rigidity, and high resistance to
              aggressive fluids. The molecular structure provides damped
              vibrations and noise reduction throughout the pipe network.
            </p>

            <div className="mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-base font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-red-600 hover:bg-white/20 group"
              >
                View All Products
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 text-brand-green" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Below-Fold: Innovation Pillars Section ─── */}
        <article className="relative z-10 bg-transparent py-20 lg:py-28 px-6 lg:px-8">
          <div className="relative z-10 max-w-7xl mx-auto reveal-section">
            <div className="max-w-2xl mb-16">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                The Technology Behind RAKPLUS<span className="text-red-600">.</span>
              </h2>
              <p className="text-white/95 leading-relaxed font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                RAKPLUS pipes are not generic plastic tubes. Each product is
                engineered from raw-material selection through extrusion,
                calibration, and quality testing — meeting five German and
                international standards simultaneously: DIN 8077/8078, DIN 8076,
                DVS 2207, and EN ISO 15874-2.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {INNOVATIONS.map((item) => (
                <section
                  key={item.title}
                  className="p-8 lg:p-10 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-red-600/50 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${item.accent} border flex items-center justify-center mb-6 shadow-[0_4px_10px_rgba(0,0,0,0.5)]`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-extrabold text-white tracking-tight mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    {item.description}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </article>

        {/* ─── Material Science Deep Dive ─── */}
        <section className="relative py-20 lg:py-28 px-6 lg:px-8 bg-transparent">
          <div className="relative z-10 max-w-7xl mx-auto reveal-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-3xl font-extrabold text-white tracking-tight mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                  Why PP-R Over Metal?<span className="text-red-600">.</span>
                </h2>
                <p className="text-white/95 leading-relaxed mb-4 font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                  Polypropylene random copolymer offers a fundamental engineering
                  advantage over traditional metal piping. RAKPLUS PP-R pipes
                  are environment-friendly, requiring significantly less energy
                  to manufacture than copper or steel alternatives.
                </p>
                <p className="text-white/95 leading-relaxed mb-4 font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                  The material is inherently hygienic and non-toxic, making it
                  certified for potable drinking water transmission under DIN
                  8077/8078. Unlike metal pipes, PP-R is completely resistant to
                  corrosion, eliminates scaling buildup, and provides damped
                  vibrations — resulting in noise reduction throughout the
                  building.
                </p>
                <p className="text-white/95 leading-relaxed font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                  With high impact strength and flexibility, RAKPLUS pipes deliver
                  cost-effective pipeline networks with lightweight construction,
                  easy installation, and the lowest labour cost of any piping
                  material in their class.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    stat: "50",
                    unit: "years",
                    label: "Guaranteed service life under continuous stress",
                  },
                  {
                    stat: "100",
                    unit: "°C",
                    label: "Short-term peak temperature resistance",
                  },
                  {
                    stat: "25",
                    unit: "bar",
                    label: "Maximum nominal pressure (PN25/SDR5)",
                  },
                  {
                    stat: "5",
                    unit: "standards",
                    label: "Simultaneous German & ISO certifications",
                  },
                ].map((item) => (
                  <div
                    key={item.stat}
                    className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  >
                    <div className="flex-shrink-0">
                      <span className="font-display text-4xl font-extrabold text-brand-green tabular-nums drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        {item.stat}
                      </span>
                      <span className="text-sm text-brand-green/80 font-bold ml-1">
                        {item.unit}
                      </span>
                    </div>
                    <p className="text-sm text-white/95 leading-relaxed font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA (transparent) ─── */}
        <section className="relative py-20 px-6 lg:px-8 bg-transparent">
          <div className="relative z-10 max-w-3xl mx-auto text-center reveal-section">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
              Explore Our Engineering<span className="text-red-600">.</span>
            </h2>
            <p className="mt-4 text-white/95 leading-relaxed max-w-lg mx-auto font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
              See the full RAKPLUS product range — from PN10 cold water pipes
              to PN25 high-pressure systems.
            </p>
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white text-sm font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-red-600/30 hover:-translate-y-1 border border-red-500"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

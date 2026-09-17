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
import { useRef } from "react";
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
  // sequenceRef — tight GSAP boundary (4 HUD sections + hold buffer).
  // On mobile, compressed to +=1500px with scrub: 0.5 for fast-scrub thumb physics.
  const sequenceRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative w-full bg-transparent">
      {/* ─── Full-Screen Hero Video Banner ─── */}
      <section className="relative w-full mt-16 lg:mt-20 h-auto aspect-[21/9] lg:aspect-auto lg:h-[100dvh] overflow-hidden">
        <video 
          src="/videos/banner/sustainability banner.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </section>

      {/* ─── Canvas Sequence (Untrapped Background) ─── */}
      <CanvasSequence
        desktopPath="/sustainability-desktop/"
        tabletPath="/sustainability-tablet/"
        mobilePath="/sustainability-mobile/"
        frameCount={124}
        desktopFrameCount={124}
        tabletFrameCount={124}
        mobileFrameCount={97}
        scrollTriggerRef={sequenceRef}
        mobileEnd="+=1500px"
        mobileScrub={0.5}
      />

      {/* ─── Scrolling Content (Sibling to Canvas) ─── */}
      <div ref={contentRef} className="relative z-10 flex flex-col w-full">
        {/* sequenceRef boundary: GSAP canvas trigger tethered here */}
        <div ref={sequenceRef} className="flex flex-col w-full">
          {/* ═══════════════════════════════════════════════════════════
              SECTION 1 — Pure Water. Clean Future (Hero)
              Vertically centered perfectly on mobile via min-h-[100svh]
              ═══════════════════════════════════════════════════════════ */}
          <section
            id="sustainability-hero"
            className="min-h-[100svh] flex flex-col justify-center py-16 md:py-24 w-full"
          >
            <div className="text-center px-6 max-w-5xl mx-auto reveal-section">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-neutral-950/15 mb-6">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-neutral-950 uppercase tracking-[0.25em]">
                  <span className="text-red-600">German Standard</span> · <span className="text-emerald-600">Sustainability</span>
                </span>
              </div>

              <h1 className="font-sans font-extrabold tracking-tighter leading-[0.9] text-neutral-950 text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_2px_16px_rgba(255,255,255,0.85)]">
                <span className="text-emerald-600">100% Safe</span>.
                <br />
                <span>Hygienic</span>.{" "}
                <span className="text-red-600">Non-Toxic</span>
                <span className="text-yellow-500">.</span>
              </h1>

              <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full mx-auto mt-8 text-center text-neutral-950 shadow-lg">
                <p className="text-base sm:text-lg md:text-xl font-bold leading-relaxed">
                  <span className="text-emerald-600 font-extrabold">100% Safe</span>, hygienic, and <span className="text-red-600 font-extrabold">Non-Toxic</span> potable water systems. Certified under{" "}
                  <span className="text-yellow-500 font-extrabold">DIN 8077/8078</span> for drinking water transmission.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-2 animate-bounce">
                <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-neutral-950 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-extrabold shadow-sm">
                  Scroll to explore
                </span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-950"
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
              Uniform py-16 md:py-24 spacing structure
              ═══════════════════════════════════════════════════════════ */}
          <section
            id="zero-scaling-section"
            className="flex flex-col items-center justify-center py-16 md:py-24 w-full"
          >
            <div className="text-center px-6 max-w-4xl mx-auto reveal-section">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-950/15 mb-6 shadow-sm">
                <ThermometerSun className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-neutral-950 uppercase tracking-[0.2em]">
                  <span className="text-red-600">Chemically Inert</span> PP-R
                </span>
              </div>

              <h2 className="font-sans font-extrabold tracking-tighter leading-[0.95] text-neutral-950 text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_2px_16px_rgba(255,255,255,0.85)]">
                Zero <span className="text-emerald-600">Scaling</span>.
                <br />
                Zero <span className="text-yellow-500">Corrosion</span>
                <span className="text-red-600">.</span>
              </h2>

              <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full mx-auto mt-6 text-center text-neutral-950 shadow-lg">
                <p className="text-base sm:text-lg font-bold leading-relaxed">
                  <span className="text-emerald-600 font-extrabold">Zero Scaling</span>, <span className="text-yellow-500 font-extrabold">zero corrosion</span>. Guaranteed service life of over{" "}
                  <span className="text-red-600 font-extrabold">50 years</span>. <span className="text-emerald-600 font-extrabold">PP-R Polymers</span> are chemically inert — no biofilm formation, no galvanic corrosion, consistent flow rates decade after decade.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 max-w-md mx-auto">
                {[
                  { value: "0%", label: "Scaling" },
                  { value: "0%", label: "Corrosion" },
                  { value: "50yr", label: "Flow Life" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-neutral-950/10 shadow-md">
                    <span className="block text-2xl sm:text-3xl font-extrabold font-sans text-neutral-950 tabular-nums">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-xs text-neutral-950 font-bold uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              SECTION 3 — Sustainable Manufacturing
              Uniform py-16 md:py-24 spacing structure
              ═══════════════════════════════════════════════════════════ */}
          <section
            id="eco-manufacturing-section"
            className="flex flex-col items-center justify-center py-16 md:py-24 w-full"
          >
            <div className="text-center px-6 max-w-4xl mx-auto reveal-section">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-950/15 mb-6 shadow-sm">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-neutral-950 uppercase tracking-[0.2em]">
                  <span className="text-yellow-600 font-extrabold">DIN 8077/8078</span> Certified
                </span>
              </div>

              <h2 className="font-sans font-extrabold tracking-tighter leading-[0.95] text-neutral-950 text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_2px_16px_rgba(255,255,255,0.85)]">
                <span className="text-emerald-600">Sustainable</span>
                <br />
                <span>Manufacturing</span>
                <span className="text-red-600">.</span>
              </h2>

              <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full mx-auto mt-6 text-center text-neutral-950 shadow-lg">
                <p className="text-base sm:text-lg font-bold leading-relaxed">
                  Environmentally friendly manufacturing. Fully recyclable <span className="text-emerald-600 font-extrabold">PP-R Polymers</span>. Lower energy consumption than copper, steel, or iron alternatives — with <span className="text-red-600 font-extrabold">zero toxic byproducts</span>.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-950 text-white text-base font-bold rounded-full transition-all duration-300 hover:bg-neutral-800 hover:shadow-xl hover:-translate-y-0.5 group"
                >
                  Explore Our Products
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 text-emerald-400" />
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              SECTION 4 — ISO/DIN Certifications Grid
              Uniform py-16 md:py-24 spacing structure
              ═══════════════════════════════════════════════════════════ */}
          <section
            id="certifications-section"
            className="flex flex-col items-center justify-center py-16 md:py-24 w-full"
          >
            <div className="text-center px-6 max-w-4xl mx-auto reveal-section">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-950/15 mb-6 shadow-sm">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-neutral-950 uppercase tracking-[0.2em]">
                  Internationally Certified
                </span>
              </div>

              <h2 className="font-sans font-extrabold tracking-tighter leading-[0.95] text-neutral-950 text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_2px_16px_rgba(255,255,255,0.85)]">
                <span className="text-red-600">Certified</span>
                <br />
                <span>Excellence</span>
                <span className="text-yellow-500">.</span>
              </h2>

              <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full mx-auto mt-6 text-center text-neutral-950 shadow-lg">
                <p className="text-base sm:text-lg font-bold leading-relaxed">
                  Proudly holding <span className="text-emerald-600 font-extrabold">ISO 9001:2015</span> quality management and <span className="text-yellow-500 font-extrabold">ISO 14001:2015</span> environmental management certifications. Every product is tested, traceable, and guaranteed.
                </p>
              </div>

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
                    className="px-4 py-2 text-xs md:text-sm font-bold text-neutral-950 bg-white/80 border-2 border-neutral-950/15 rounded-xl uppercase tracking-wider backdrop-blur-sm shadow-sm"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ CINEMATIC HOLD BUFFER ═══ */}
          <div className="w-full h-12 md:h-20 bg-transparent pointer-events-none" aria-hidden="true" />

        </div>{/* ─── END sequenceRef boundary ─── */}

        {/* ─── Below-Fold: Sustainability Pillars Section ─── */}
        <article className="relative z-10 bg-transparent py-16 md:py-24 px-6 lg:px-8">
          <div className="relative z-10 max-w-7xl mx-auto reveal-section">
            <div className="max-w-2xl mb-16">
              <h2 className="font-sans font-extrabold tracking-tighter text-3xl sm:text-4xl lg:text-5xl text-neutral-950 mb-6">
                Engineering a <span className="text-emerald-600">Sustainable</span>{" "}
                <span className="text-red-600">Pipeline</span>
                <span className="text-yellow-400">.</span>
              </h2>
              <p className="text-neutral-950 leading-relaxed font-bold text-base md:text-lg">
                RAKPLUS PP-R Pipes / Fittings are environment-friendly as they take less
                energy to manufacture than metal alternatives. From raw material
                to end-of-life recyclability, every stage of the RAKPLUS
                lifecycle is designed to minimize environmental impact while
                delivering a <span className="text-red-600 font-extrabold">50-year guaranteed service life</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PILLARS.map((pillar) => (
                <section
                  key={pillar.title}
                  className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-950/10 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-emerald-600/50 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${pillar.accent} border flex items-center justify-center mb-6 shadow-sm`}
                  >
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans text-lg font-extrabold text-neutral-950 tracking-tight mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-bold">
                    {pillar.description}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </article>

        {/* ─── Water Safety Deep Dive ─── */}
        <section className="relative py-16 md:py-24 px-6 lg:px-8 bg-transparent">
          <div className="relative z-10 max-w-7xl mx-auto reveal-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-sans font-extrabold tracking-tighter text-3xl sm:text-4xl lg:text-5xl text-neutral-950 mb-6">
                  Safe for <span className="text-emerald-600">Drinking Water</span>
                  <span className="text-red-600">.</span>
                </h2>
                <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full text-neutral-950 shadow-lg flex flex-col gap-4">
                  <p className="leading-relaxed font-bold text-base md:text-lg">
                    Water quality is not negotiable. RAKPLUS PP-R Pipes / Fittings are
                    certified under <span className="text-yellow-500 font-extrabold">DIN 8077/8078</span> specifically for potable drinking
                    water transmission — meaning they have been independently
                    tested and verified to introduce <span className="text-red-600 font-extrabold">zero contaminants</span> into the
                    water supply.
                  </p>
                  <p className="leading-relaxed font-bold text-base md:text-lg">
                    The smooth, chemically inert inner surface of <span className="text-emerald-600 font-extrabold">PP-R Polymers</span> prevents
                    biofilm formation, mineral scaling, and particulate buildup
                    that plague metal piping systems. This translates to
                    consistently clean water and maintained flow rates throughout
                    the entire <span className="text-red-600 font-extrabold">50-year</span> service life.
                  </p>
                  <p className="leading-relaxed font-bold text-base md:text-lg">
                    For projects where water hygiene is critical — hospitals,
                    schools, food processing facilities, and residential
                    developments — RAKPLUS delivers the assurance of
                    German-standard certification combined with <span className="text-emerald-600 font-extrabold">non-toxic</span>,
                    corrosion-free material performance.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="p-8 lg:p-10 rounded-2xl bg-white/80 backdrop-blur-md border border-neutral-950/10 shadow-lg">
                  <h3 className="font-sans text-2xl font-extrabold tracking-tighter text-neutral-950 mb-6">
                    <span className="text-emerald-600">Environmental</span> Comparison
                    <span className="text-yellow-400">.</span>
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
                        className="grid grid-cols-3 gap-4 py-3 border-b border-neutral-950/10 last:border-b-0"
                      >
                        <span className="text-sm font-bold text-neutral-950">
                          {row.label}
                        </span>
                        <span className="text-sm text-emerald-600 font-extrabold text-center">
                          {row.ppr}
                        </span>
                        <span className="text-sm text-neutral-600 font-bold text-center">
                          {row.metal}
                        </span>
                      </div>
                    ))}
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <span className="text-[10px] text-neutral-950/60 font-bold uppercase tracking-widest">
                        Property
                      </span>
                      <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest text-center">
                        RAKPLUS PP-R
                      </span>
                      <span className="text-[10px] text-neutral-950/60 font-bold uppercase tracking-widest text-center">
                        Metal Pipe
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA Section ─── */}
        <section className="relative py-16 md:py-24 px-6 lg:px-8 bg-transparent">
          <div className="relative z-10 max-w-3xl mx-auto text-center reveal-section">
            <h2 className="font-sans font-extrabold tracking-tighter text-3xl sm:text-4xl lg:text-5xl text-neutral-950">
              Build with <span className="text-emerald-600">Confidence</span>
              <span className="text-red-600">.</span>
            </h2>
            <p className="mt-4 text-neutral-700 leading-relaxed max-w-lg mx-auto font-bold text-base md:text-lg">
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
                className="inline-flex items-center gap-2 px-8 py-4 text-neutral-950 text-sm font-bold rounded-full border border-neutral-950/20 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white transition-all duration-200 backdrop-blur-sm"
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

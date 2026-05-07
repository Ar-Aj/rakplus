"use client";

/**
 * RAKPLUS Homepage — Phase 10.3 Structural Refactor
 *
 * 169 frames at 24fps.
 * Layout: Flex/Grid stacking SIBLING to CanvasSequence to fix Footer trapping.
 * Reveal: useScrollReveal hook for consistent text fading.
 * Transparency: Absolute transparency, extreme drop shadows.
 */

import Link from "next/link";
import CanvasSequence from "@/components/CanvasSequence";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  Shield,
  Award,
  Wrench,
} from "lucide-react";

// ─── Glassmorphism CTA Button ───
function GlassCTA({
  href,
  children,
  isPrimary = false,
}: {
  href: string;
  children: React.ReactNode;
  isPrimary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 px-7 py-3.5 bg-white/10 backdrop-blur-md border text-white text-sm font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 group ${
        isPrimary
          ? "border-red-600 hover:bg-red-600 hover:shadow-red-600/25"
          : "border-white/20 hover:border-red-600 hover:bg-white/20"
      }`}
    >
      {children}
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

// ─── Page ───
export default function HomePage() {
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
        desktopPath="/home-desktop/"
        mobilePath="/home-mobile/"
        frameCount={169}
      />

      {/* ─── Scrolling Content (Sibling to Canvas) ─── */}
      <div className="relative z-10 flex flex-col w-full">
        {/* ═══ SECTION 1 — Hero ═══ */}
        <section
          id="hero-section"
          className="min-h-screen flex flex-col items-center justify-center py-20"
        >
          <div className="text-center px-6 max-w-5xl mx-auto reveal-section">
            <h1 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-[0.9]">
              EVOLVE.
              <br className="sm:hidden" />{" "}
              EXPAND.
              <br className="sm:hidden" />{" "}
              EMPOWER<span className="text-red-600">.</span>
            </h1>

            <p className="mt-6 sm:mt-8 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-bold max-w-2xl mx-auto md:leading-relaxed">
              Premium PP-R Piping Systems in the UAE. Manufactured to strict
              German DIN 8077/8078 standards.
            </p>

            <div className="mt-8 sm:mt-10">
              <GlassCTA href="/about" isPrimary>
                Learn About RAKPLUS
              </GlassCTA>
            </div>

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

        {/* ═══ SECTION 2 — German Engineering ═══ */}
        <section
          id="engineering-section"
          className="min-h-screen flex flex-col items-center justify-center py-20"
        >
          <div className="text-center px-6 max-w-4xl mx-auto reveal-section">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-red-600/50 mb-8 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <Wrench className="w-4 h-4 text-red-600" />
              <span className="text-xs font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                DIN 8077 / 8078 · DVS 2207
              </span>
            </div>

            <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
              German Standard
              <br />
              Engineering<span className="text-red-600">.</span>
            </h2>

            <p className="mt-6 sm:mt-8 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-bold max-w-xl mx-auto md:leading-relaxed">
              Manufactured using modern technology in strict accordance with
              German standards DIN 8077/8078. Every pipe is produced with
              precision tooling and DVS 2207 certified welding processes.
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

            <div className="mt-8">
              <GlassCTA href="/products">View Product Range</GlassCTA>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3 — Trusted Across the GCC ═══ */}
        <section
          id="gcc-trust-section"
          className="min-h-screen flex flex-col items-center justify-center py-20"
        >
          <div className="text-center px-6 max-w-4xl mx-auto reveal-section">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-red-600/50 mb-8 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <Award className="w-4 h-4 text-red-600" />
              <span className="text-xs font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                ISO 9001:2015 · ISO 14001:2015
              </span>
            </div>

            <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
              Trusted Across
              <br />
              the GCC<span className="text-red-600">.</span>
            </h2>

            <p className="mt-6 sm:mt-8 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-bold max-w-xl mx-auto md:leading-relaxed">
              Trusted across the GCC for residential, commercial, and
              industrial water transmission. ISO 9001:2015 certified quality
              with a 50-year guaranteed service life.
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

            <div className="mt-8">
              <GlassCTA href="/sustainability">
                Explore Sustainability
              </GlassCTA>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 4 — Contact CTA ═══ */}
        <section
          id="contact-section"
          className="min-h-screen flex flex-col items-center justify-center py-20"
        >
          <div className="text-center px-6 max-w-4xl mx-auto reveal-section">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-red-600/50 mb-8 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <Shield className="w-4 h-4 text-red-600" />
              <span className="text-xs font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                50-Year Guarantee
              </span>
            </div>

            <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
              100% Safe for
              <br />
              Potable Water<span className="text-red-600">.</span>
            </h2>

            <p className="mt-6 sm:mt-8 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-bold max-w-xl mx-auto md:leading-relaxed">
              Exceeding DIN 8077/8078 German Standards for Hygiene. RAKPLUS
              PP-R pipes are independently tested — hygienic, non-toxic,
              and safe for your family&apos;s drinking water.
            </p>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white text-base font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-red-600/30 hover:-translate-y-1 group border border-red-500"
              >
                Get a Quote
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ Below-Fold — bg-transparent, canvas entirely visible ═══ */}
        <section className="relative z-10 bg-transparent py-24 sm:py-32">
          {/* Removed background colors per instructions to force video visibility */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center reveal-section">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
              Precision. Durability. Trust<span className="text-red-600">.</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/95 md:leading-relaxed max-w-2xl mx-auto font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
              RAKPLUS pipes are manufactured to DIN 8077/8078 and DVS 2207 German
              standards — delivering ISO 9001:2015 certified quality with a
              50-year guaranteed service life.
            </p>

            <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <article className="p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-red-600/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                  <span className="text-red-600 text-xl font-extrabold font-display">
                    50
                  </span>
                </div>
                <h3 className="font-display text-lg font-extrabold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                  Year Guarantee
                </h3>
                <p className="mt-2 text-sm text-white/90 font-bold leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Guaranteed service life of 50 years under continuous operational
                  stress.
                </p>
              </article>

              <article className="p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-red-600/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                  <span className="text-red-600 text-xl font-extrabold font-display">
                    DIN
                  </span>
                </div>
                <h3 className="font-display text-lg font-extrabold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                  German Standard
                </h3>
                <p className="mt-2 text-sm text-white/90 font-bold leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Manufactured to DIN 8077/8078 standards with DVS 2207 welding
                  compliance.
                </p>
              </article>

              <article className="p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-red-600/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                  <span className="text-red-600 text-xl font-extrabold font-display">
                    ISO
                  </span>
                </div>
                <h3 className="font-display text-lg font-extrabold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                  ISO 9001:2015
                </h3>
                <p className="mt-2 text-sm text-white/90 font-bold leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Internationally certified quality management system for every
                  product.
                </p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

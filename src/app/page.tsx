"use client";

/**
 * RAKPLUS Homepage — Phase 14.0 Cinematic Curtain Architecture
 *
 * 182 frames at native fps. Tri-viewport: 16:9, 3:4, 9:16.
 * Layout: HUD floating sections → CinematicCurtain obsidian reveal.
 * Reveal: useScrollReveal hook for HUD text, IntersectionObserver for curtain children.
 */

import Link from "next/link";
import Image from "next/image";
import CanvasSequence from "@/components/CanvasSequence";
import CinematicCurtain from "@/components/CinematicCurtain";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  Shield,
  Award,
  Wrench,
  Thermometer,
  Zap,
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

// ─── Curtain CTA (dark background variant) ───
function CurtainPrimaryCTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/30 hover:-translate-y-1 group"
    >
      {children}
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </Link>
  );
}

function CurtainGhostCTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 px-8 py-4 border border-white/15 hover:border-red-600 text-curtain-text text-sm font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5 group"
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
        tabletPath="/home-tablet/"
        mobilePath="/home-mobile/"
        frameCount={182}
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

        {/* ═══════════════════════════════════════════════════════════
            CINEMATIC CURTAIN — "The Unbreakable Foundation"
            Obsidian block slides up from bottom after video locks.
            Asymmetrical staggered layout with Thermal Shield 3D asset.
            ═══════════════════════════════════════════════════════════ */}
        <CinematicCurtain id="home-curtain">
          <article className="w-full px-6 md:px-12 lg:px-20 xl:px-28 py-28 sm:py-36 lg:py-44">

            {/* ─── Top hook line ─── */}
            <div className="max-w-screen-xl mx-auto mb-20 reveal-curtain-child">
              <div className="curtain-accent-line mb-6" />
              <span className="text-red-600 text-xs font-extrabold uppercase tracking-[0.3em]">
                The Unbreakable Foundation
              </span>
            </div>

            {/* ─── Asymmetrical Stagger Grid: Copy Left + Asset Right ─── */}
            <div className="max-w-screen-xl mx-auto stagger-grid">

              {/* LEFT: Massive Typography + SEO Copy */}
              <div className="flex flex-col gap-8">
                <h2 className="curtain-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold reveal-curtain-child">
                  Engineered for
                  <br />
                  the Extremes<span className="text-red-600">.</span>
                  <br />
                  <span className="text-curtain-muted text-[0.65em]">
                    Guaranteed for 50 Years.
                  </span>
                </h2>

                <p className="curtain-body text-lg md:text-xl max-w-xl reveal-curtain-child reveal-delay-1">
                  The RAKPLUS PP-R system is built on a proprietary{" "}
                  <span className="text-white font-bold">
                    Polypropylene Random-Copolymer (PP-R Type 3)
                  </span>{" "}
                  matrix — engineered for maximum molecular stability under
                  extreme pressure and temperature differentials. Every
                  millimeter of pipe is extruded from 100% virgin material,
                  guaranteeing zero contamination and absolute hygiene for
                  potable water networks.
                </p>

                <p className="curtain-body text-lg md:text-xl max-w-xl reveal-curtain-child reveal-delay-2">
                  With continuous operating temperatures of up to{" "}
                  <span className="text-white font-bold">70°C</span> and
                  short-term peaks of{" "}
                  <span className="text-white font-bold">100°C</span>, the
                  PP-R matrix delivers unmatched thermal endurance. The thermal
                  conductivity of just{" "}
                  <span className="text-white font-bold">0.24 W/mK</span>{" "}
                  ensures maximum energy retention — drastically reducing heat
                  loss in hot water transmission and cutting operational costs
                  across residential and commercial HVAC installations.
                </p>

                {/* Stat Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4 reveal-curtain-child reveal-delay-3">
                  {[
                    { value: "70°C", label: "Continuous Temp", icon: <Thermometer className="w-4 h-4 text-red-600" /> },
                    { value: "100°C", label: "Peak Temp", icon: <Zap className="w-4 h-4 text-red-600" /> },
                    { value: "0.24", label: "W/mK Conductivity", icon: <Shield className="w-4 h-4 text-red-600" /> },
                    { value: "50yr", label: "Service Life", icon: <Award className="w-4 h-4 text-red-600" /> },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        {stat.icon}
                        <span className="curtain-stat text-2xl sm:text-3xl font-extrabold text-white">
                          {stat.value}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs text-curtain-muted font-bold uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Hub */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6 reveal-curtain-child reveal-delay-4">
                  <CurtainPrimaryCTA href="/innovation">
                    Explore Innovation
                  </CurtainPrimaryCTA>
                  <CurtainGhostCTA href="/products">
                    View Product Range
                  </CurtainGhostCTA>
                </div>
              </div>

              {/* RIGHT: 3D Thermal Shield Asset */}
              <div className="reveal-curtain-child reveal-delay-2">
                <div className="curtain-asset-float">
                  <Image
                    src="/images/curtain-home-thermal.png"
                    alt="RAKPLUS PP-R pipe splitting boiling plasma and freezing liquid nitrogen — extreme thermal shield visualization"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-2xl"
                    priority={false}
                  />
                </div>
                <p className="mt-4 text-xs text-curtain-muted font-bold uppercase tracking-wider text-center">
                  Thermal Shield — PP-R Extreme Temperature Resistance
                </p>
              </div>
            </div>

            {/* ─── Bottom Certification Strip ─── */}
            <div className="max-w-screen-xl mx-auto mt-20 pt-10 border-t border-obsidian-border reveal-curtain-child reveal-delay-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs text-curtain-muted font-bold uppercase tracking-wider mr-4">
                  Certified:
                </span>
                {["DIN 8077/8078", "DVS 2207", "EN ISO 15874-2", "ISO 9001:2015", "ISO 14001:2015", "WRAS Approved"].map(
                  (cert) => (
                    <span key={cert} className="curtain-badge">
                      {cert}
                    </span>
                  )
                )}
              </div>
            </div>
          </article>
        </CinematicCurtain>
      </div>
    </main>
  );
}

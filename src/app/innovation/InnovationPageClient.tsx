"use client";

/**
 * RAKPLUS Innovation — Phase 13.1 Multi-Layer Matrix HUD
 *
 * Frames from 3 dedicated sources:
 *   - /innovation-desktop/ (16:9, 1920px)
 *   - /innovation-tablet/  (3:4, iPad-native)
 *   - /innovation-mobile/  (9:16, 720px)
 *
 * Layout: Staggered alternating grid (Right → Left → Right → Center).
 * ScrollTrigger: useDocumentScroll=true, end="85% bottom" early-finish.
 * Typography: 100% floating HUD — zero backgrounds, aggressive drop shadows.
 */

import { useRef } from "react";
import Link from "next/link";
import CanvasSequence from "@/components/CanvasSequence";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, FlaskConical, Layers, Shield, Cpu } from "lucide-react";

// ─── CTA Buttons ───

function PrimaryCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-red-600/30 hover:-translate-y-0.5 group drop-shadow-[0_4px_4px_rgba(0,0,0,1)]"
    >
      {children}
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

function GlassCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 px-7 py-3.5 border border-white/40 text-white text-sm font-bold rounded-full transition-all duration-300 hover:border-red-500 hover:text-red-400 hover:-translate-y-0.5 group drop-shadow-[0_4px_4px_rgba(0,0,0,1)]"
    >
      {children}
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

// ─── Pill Badge ───

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 mb-6">
      {icon}
      <span className="text-xs font-bold text-white/90 uppercase tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
        {label}
      </span>
    </div>
  );
}

// ─── Spec Pill ───

function SpecPill({ label }: { label: string }) {
  return (
    <span className="px-3 py-1.5 text-xs font-extrabold text-white/90 border border-white/30 rounded-full uppercase tracking-wide drop-shadow-[0_3px_3px_rgba(0,0,0,1)]">
      {label}
    </span>
  );
}

// ─── Page ───

export default function InnovationPageClient() {
  useScrollReveal();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative w-full bg-transparent">

      {/* ─── Cinematic Vignette ─── */}
      <div
        className="fixed inset-0 pointer-events-none z-[0]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* ─── Canvas — Tri-Viewport (Desktop 16:9 / Tablet 1:1 / Mobile 9:16) ───
           scrollTriggerRef binds to contentRef → early-finish at 85% */}
      <CanvasSequence
        desktopPath="/innovation-desktop/"
        tabletPath="/innovation-tablet/"
        mobilePath="/innovation-mobile/"
        frameCount={97}
        scrollTriggerRef={contentRef}
      />

      {/* ─── HUD Content — pure document flow, zero backgrounds ─── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full flex flex-col gap-32 pt-40 pb-40 px-6 md:px-12 bg-transparent"
      >

        {/* ══════════════════════════════════════════════════════
            GRID WRAPPER — all 4 sections share this 2-col grid
            Mobile: single column · Desktop: alternating L/R
            ══════════════════════════════════════════════════════ */}
        <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-32 gap-x-16">

          {/* ─────────────────────────────────────────────────────
              S1 — HERO HOOK  (Right-Aligned: lg:col-start-2)
              "Engineering the Best PP-R Pipes in the UAE & Gulf."
              ───────────────────────────────────────────────────── */}
          <section
            id="innovation-hero"
            className="lg:col-start-2 reveal-section flex flex-col"
          >
            <Badge
              icon={<FlaskConical className="w-4 h-4 text-red-400" />}
              label="PP-R Multi-Layer Co-Extrusion"
            />

            <h1 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.92]">
              Engineering the Best
              <br />
              PP-R Pipes in the
              <br />
              <span className="text-red-500 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                UAE &amp; Gulf.
              </span>
            </h1>

            <p className="mt-7 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] font-bold leading-relaxed max-w-xl">
              At RAKPLUS®, innovation is not just a concept; it is our structural
              foundation. As the premier manufacturer of thermoplastic piping
              networks in the GCC, our advanced multi-layer co-extrusion
              technology sets the benchmark for high-pressure,
              extreme-temperature fluid transmission.
            </p>

            <div className="mt-10 flex flex-col items-start gap-2 animate-bounce">
              <span className="text-white/80 text-[10px] uppercase tracking-[0.3em] font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                Scroll to explore
              </span>
              <svg className="w-5 h-5 text-white/80 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────
              S2 — RAW MATERIAL  (Left-Aligned: lg:col-start-1)
              "100% Virgin Polypropylene Random-Copolymer."
              ───────────────────────────────────────────────────── */}
          <section
            id="innovation-material"
            className="lg:col-start-1 reveal-section flex flex-col"
          >
            <Badge
              icon={<Layers className="w-4 h-4 text-red-400" />}
              label="100% Virgin PP-R Type 3"
            />

            <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95]">
              100% Virgin
              <br />
              Polypropylene
              <br />
              <span className="text-red-500 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                Random-Copolymer.
              </span>
            </h2>

            <p className="mt-7 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] font-bold leading-relaxed max-w-xl">
              Our proprietary material matrix is characterized by unmatched
              elasticity, rigidity, tightness, and compression strength.
              Engineered specifically to combat the harsh Middle Eastern climate,
              RAKPLUS pipes deliver complete resistance to corrosion and scaling,
              guaranteeing pure, non-toxic potable water supply.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["PN10 to PN25", "SDR6 to SDR11", "20mm to 160mm", "0.24 W/mK", "50-Year Life"].map(
                (s) => <SpecPill key={s} label={s} />
              )}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────
              S3 — GERMAN PRECISION  (Right-Aligned: lg:col-start-2)
              "DIN 8077/8078 & DVS 2207 Fusion Compliance."
              ───────────────────────────────────────────────────── */}
          <section
            id="innovation-german"
            className="lg:col-start-2 reveal-section flex flex-col"
          >
            <Badge
              icon={<Cpu className="w-4 h-4 text-red-400" />}
              label="DIN 8077/8078 Compliant"
            />

            <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95]">
              DIN 8077/8078 &amp;
              <br />
              DVS 2207 Fusion
              <br />
              <span className="text-red-500 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                Compliance.
              </span>
            </h2>

            <p className="mt-7 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] font-bold leading-relaxed max-w-xl">
              Every millimeter of a RAKPLUS pipe is extruded in strict accordance
              with German DIN standards. Utilizing advanced DVS 2207 welding
              regulations, our systems achieve a seamless molecular bond —
              creating an indestructible network that completely eliminates the
              risk of leaks in high-stress HVAC and industrial applications.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["DIN 8077/8078", "DVS 2207", "EN ISO 15874-2", "ISO 9001:2015"].map(
                (s) => <SpecPill key={s} label={s} />
              )}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────
              S4 — MONOLITH CTA  (Centered: col-span-full)
              "Outlasting the Buildings We Power."
              ───────────────────────────────────────────────────── */}
          <section
            id="innovation-cta"
            className="lg:col-span-2 reveal-section text-center flex flex-col items-center mt-20"
          >
            <Badge
              icon={<Shield className="w-4 h-4 text-red-400" />}
              label="ISO 9001:2015 Certified"
            />

            <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
              Outlasting the
              <br />
              <span className="text-red-500 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                Buildings We Power.
              </span>
            </h2>

            <p className="mt-7 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] font-bold max-w-2xl mx-auto leading-relaxed">
              Backed by ISO 9001:2015 certification and independent international
              laboratory testing, we guarantee a 50-year service life on all
              standard installations. Experience the pinnacle of fluid
              engineering.
            </p>

            {/* Floating stat row */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-xl mx-auto">
              {[
                { value: "50",   label: "Year Guarantee" },
                { value: "25",   label: "Bar Max Pressure" },
                { value: "100",  label: "°C Peak Temp" },
                { value: "5",    label: "Standards" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <span className="block text-4xl sm:text-5xl font-extrabold font-display text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] leading-none">
                    {s.value}
                  </span>
                  <span className="block mt-2 text-xs text-white/80 uppercase tracking-widest font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
              <PrimaryCTA href="/products">Download Technical Specs</PrimaryCTA>
              <GlassCTA href="/products">Explore the Catalogue</GlassCTA>
            </div>
          </section>

        </div>{/* /grid */}
      </div>{/* /contentRef */}
    </main>
  );
}

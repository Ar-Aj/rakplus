"use client";


/**
 * RAKPLUS Innovation — Phase 23.0 Global Color Correction & Elite GSAP
 *
 * CGI videos = pure white backgrounds → ALL text over canvas = PITCH BLACK.
 * Zero drop-shadows. Zero text-white. Zero vignettes.
 * Emerald = accents/icons only.
 * All CTAs: bg-red-600 → hover:bg-emerald-600 hover:text-white
 *
 * Layout: Staggered alternating 2-col grid (Right → Left → Right → Center).
 * GSAP (via useHUDReveal):
 *   .hud-blur-reveal   → blur 14px → 0 + y drift
 *   .hud-skew-heading  → rotateX -18° → 0° snap
 *   .hud-stagger-group → cascading 0.12s stagger
 *   .hud-scrub-text    → word-by-word opacity scrub
 */

import { useRef } from "react";
import LiquidButton from "@/components/ui/LiquidButton";
import CanvasSequence from "@/components/CanvasSequence";
import { useHUDReveal } from "@/hooks/useHUDReveal";
import { FlaskConical, Layers, Shield, Cpu } from "lucide-react";

// ─── CTAs — Red → Yellow ─────────────────────────────────────────────────
function PrimaryCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <LiquidButton href={href}>
      {children}
    </LiquidButton>
  );
}

// ─── Badge — Black on transparent ──────────────────────────────────────
function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-950/20 bg-white/40 backdrop-blur-sm mb-6">
      {icon}
      <span className="text-xs font-bold text-neutral-950 uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}

// ─── Spec Pill — Black ──────────────────────────────────────────────────
function SpecPill({ label }: { label: string }) {
  return (
    <span className="px-3 py-1.5 text-xs font-extrabold text-neutral-950 border border-neutral-950/25 rounded-full uppercase tracking-wide bg-white/30 backdrop-blur-sm">
      {label}
    </span>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────
export default function InnovationPageClient() {
  const contentRef = useRef<HTMLDivElement>(null);
  // sequenceRef — tight GSAP boundary (HUD sections only, excludes any footer).
  // end = "85% bottom" of this wrapper = 2x faster scrub, locks final frame.
  const sequenceRef = useRef<HTMLDivElement>(null);
  useHUDReveal(contentRef);

  return (
    <main className="relative w-full bg-transparent">

      {/* ─── Canvas (scrollTriggerRef = sequenceRef, early-finish at 85%) ─── */}
      <CanvasSequence
        desktopPath="/innovation-desktop/"
        tabletPath="/innovation-tablet/"
        mobilePath="/innovation-mobile/"
        frameCount={155}
        tabletFrameCount={198}
        mobileFrameCount={198}
        scrollTriggerRef={sequenceRef}
      />

      {/* ─── HUD Content — zero backgrounds, pitch-black text ─── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full flex flex-col gap-0 pt-40 pb-0 px-[10vw] bg-transparent"
      >
        {/* sequenceRef boundary: GSAP canvas trigger tethered here (sections + hold buffer) */}
        <div ref={sequenceRef} className="flex flex-col w-full">

        {/* ══════════════════════════════════════════════════════
            GRID WRAPPER — alternating 2-col on desktop
            ══════════════════════════════════════════════════════ */}
        <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-40 gap-x-20">

          {/* ──────────────────────────────────────────────────
              S1 — HERO HOOK  (Right: lg:col-start-2)
              ────────────────────────────────────────────────── */}
          <section
            id="innovation-hero"
            className="lg:col-start-2 flex flex-col"
          >
            <div className="hud-blur-reveal">
              <Badge
                icon={<FlaskConical className="w-4 h-4 text-emerald-600" />}
                label="PP-R Multi-Layer Co-Extrusion"
              />
            </div>

            <div className="hud-liquid-reveal">
              <h1 className="font-sans font-extrabold leading-[0.9] tracking-tighter text-neutral-950
                text-[clamp(2.5rem,6vw,5.5rem)]">
                Engineering the Best
                <br />
                PP-R Pipes in the
                <br />
                <span className="relative pb-4 inline-block text-emerald-500 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">Multi-Layer</span> <span className="relative pb-4 inline-block text-red-600 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">Technology</span>.
              </h1>
            </div>

            <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl mt-7 max-w-3xl w-full">
              <p className="gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Utilizing <span className="text-emerald-500">100% Virgin Material</span>, our advanced co-extrusion process strictly adheres to <span className="text-yellow-400">German Standard</span> engineering protocols.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4 hud-blur-reveal">
              <div className="w-[1px] h-12 bg-neutral-950/20" />
              <span className="text-neutral-950 text-[10px] uppercase tracking-[0.4em] font-bold">
                Scroll to explore
              </span>
            </div>
          </section>

          {/* ──────────────────────────────────────────────────
              S2 — RAW MATERIAL  (Left: lg:col-start-1)
              ────────────────────────────────────────────────── */}
          <section
            id="innovation-material"
            className="lg:col-start-1 flex flex-col mt-[10vh] md:mt-[20vh]"
          >
            <div className="hud-blur-reveal">
              <Badge
                icon={<Layers className="w-4 h-4 text-emerald-600" />}
                label="100% Virgin PP-R Type 3"
              />
            </div>

            <div className="hud-skew-heading">
              <h2 className="font-sans font-extrabold font-extrabold leading-[0.92] tracking-tighter text-neutral-950
                text-[clamp(2rem,5vw,4.5rem)]">
                100% Virgin
                <br />
                Polypropylene
                <br />
                <span className="text-emerald-600">
                  Random-Copolymer.
                </span>
              </h2>
            </div>

            <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl mt-7 max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Our proprietary material matrix is characterized by unmatched
              elasticity, rigidity, tightness, and compression strength.
              Engineered specifically to combat the harsh Middle Eastern climate,
              RAKPLUS pipes deliver complete resistance to corrosion and scaling,
              guaranteeing pure, non-toxic potable water supply.
              </p>
            </div>

            <div className="mt-8 hud-stagger-group flex flex-wrap gap-3">
              {["PN10 to PN25", "SDR6 to SDR11", "20mm to 160mm", "0.24 W/mK", "50-Year Life"].map(
                (s) => <SpecPill key={s} label={s} />
              )}
            </div>
          </section>

          {/* ──────────────────────────────────────────────────
              S3 — GERMAN PRECISION  (Right: lg:col-start-2)
              ────────────────────────────────────────────────── */}
          <section
            id="innovation-german"
            className="lg:col-start-2 flex flex-col mt-[10vh] md:mt-[20vh]"
          >
            <div className="hud-blur-reveal">
              <Badge
                icon={<Cpu className="w-4 h-4 text-emerald-600" />}
                label="DIN 8077/8078 Compliant"
              />
            </div>

            <div className="hud-skew-heading">
              <h2 className="font-sans font-extrabold font-extrabold leading-[0.92] tracking-tighter text-neutral-950
                text-[clamp(2rem,5vw,4.5rem)]">
                <span className="text-emerald-600">DIN 8077/8078</span> &amp;
                <br />
                DVS 2207 Fusion
                <br />
                <span className="text-emerald-600">
                  Compliance.
                </span>
              </h2>
            </div>

            <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl mt-7 max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Every millimeter of a RAKPLUS pipe is extruded in strict accordance
              with German DIN standards. Utilizing advanced <span className="text-yellow-400">DVS 2207</span> welding
              regulations, our systems achieve a seamless molecular bond —
              creating an indestructible network that completely eliminates the
              risk of leaks in high-stress HVAC and industrial applications.
              </p>
            </div>

            <div className="mt-8 hud-stagger-group flex flex-wrap gap-3">
              {["DIN 8077/8078", "DVS 2207", "EN ISO 15874-2", "ISO 9001:2015"].map(
                (s) => <SpecPill key={s} label={s} />
              )}
            </div>
          </section>

          {/* ──────────────────────────────────────────────────
              S4 — MONOLITH CTA  (Full width: col-span-2)
              ────────────────────────────────────────────────── */}
          <section
            id="innovation-cta"
            className="lg:col-span-2 text-center flex flex-col items-center mt-10"
          >
            <div className="hud-blur-reveal">
              <Badge
                icon={<Shield className="w-4 h-4 text-emerald-600" />}
                label="ISO 9001:2015 Certified"
              />
            </div>

            <div className="hud-skew-heading max-w-4xl mx-auto">
              <h2 className="font-sans font-extrabold font-extrabold leading-[0.92] tracking-tighter text-neutral-950
                text-[clamp(2.5rem,6vw,6rem)]">
                Outlasting the
                <br />
                <span className="text-emerald-600">
                  Buildings We Power.
                </span>
              </h2>
            </div>

            <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl mt-7 max-w-3xl w-full mx-auto">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Backed by <span className="text-yellow-400">ISO 9001:2015</span> certification and independent international
              laboratory testing, we guarantee a <span className="text-emerald-500">50-year</span> service life on all
              standard installations. Experience the pinnacle of fluid
              engineering.
              </p>
            </div>

            {/* Stat row */}
            <div className="mt-14 hud-stagger-group grid grid-cols-2 sm:grid-cols-4 gap-10 max-w-xl mx-auto">
              {[
                { value: "50", suffix: "", label: "Year Guarantee" },
                { value: "25", suffix: "", label: "Bar Max Pressure" },
                { value: "100", suffix: "°C", label: "Peak Temp" },
                { value: "5", suffix: "", label: "Standards" },
              ].map((s) => (
                <div key={s.label} className="hud-stagger-item text-center">
                  <span className="block font-sans font-black text-neutral-950 tabular-nums tracking-tighter leading-none
                    text-[clamp(2rem,4vw,3.5rem)]">
                    {s.value}{s.suffix}
                  </span>
                  <span className="block mt-2 text-xs text-neutral-950 uppercase tracking-widest font-bold">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 hud-stagger-group flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
              <PrimaryCTA href="/products">Download Technical Specs</PrimaryCTA>
              <LiquidButton isPrimary={false} href="/products">Explore the Catalogue</LiquidButton>
            </div>
          </section>

        </div>{/* /grid */}

        {/* ═══ CINEMATIC HOLD BUFFER ═══ */}
        {/* Phase 40: User scrolls through empty space while GSAP holds the final locked frame */}
        <div className="w-full h-[50vh] md:h-[70vh] bg-transparent pointer-events-none" aria-hidden="true" />

        </div>{/* ─── END sequenceRef boundary ─── */}

      </div>{/* /contentRef */}
    </main>
  );
}

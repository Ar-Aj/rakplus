"use client";


/**
 * RAKPLUS Homepage — Phase 23.0 Global Color Correction & Elite GSAP
 *
 * CGI = white backgrounds → ALL HUD text = PITCH BLACK.
 * Canvas: useDocumentScroll={true} — all 4 sections drive 240 frames.
 * GSAP HUD: useHUDReveal (blur-reveal, skew-heading, stagger, scrub).
 * GSAP Curtain: clip-path headings, polygon wipe images, CTA scale.
 */

import { useRef } from "react";
import Link from "next/link";
import LiquidButton from "@/components/ui/LiquidButton";
import Image from "next/image";
import CanvasSequence from "@/components/CanvasSequence";
import CinematicCurtain from "@/components/CinematicCurtain";
import { useHUDReveal } from "@/hooks/useHUDReveal";
import { useLiquidReveal } from "@/hooks/useLiquidReveal";
import {
  ArrowRight,
  Shield,
  Award,
  Wrench,
  Thermometer,
  Zap,
} from "lucide-react";

// ─── CTAs — Red → Yellow (universal rule) ───────────────────────────────
function HeroCTA({ href, children, isPrimary = false }: { href: string; children: React.ReactNode; isPrimary?: boolean; }) {
  if (isPrimary) {
    return <LiquidButton href={href} className="md:px-9 md:py-4">{children}</LiquidButton>;
  }
  return (
    <Link href={href} className="gsap-cta inline-flex items-center gap-3 px-7 py-3.5 md:px-9 md:py-4 text-sm md:text-base font-bold rounded-full transition-colors duration-200 group bg-neutral-950/10 backdrop-blur-sm text-neutral-950 border border-neutral-950/20 hover:bg-neutral-950 hover:text-white">
      {children}
      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

function CurtainPrimaryCTA({ href, children }: { href: string; children: React.ReactNode; }) {
  return <LiquidButton href={href} className="md:px-9 md:py-4">{children}</LiquidButton>;
}



// ─── Page ───
export default function HomePage() {
  const hudRef = useRef<HTMLDivElement>(null);
  // sequenceRef — wraps ONLY the 4 transparent HUD sections + hold buffer.
  // Passed to CanvasSequence as scrollTriggerRef so GSAP end = "85% bottom"
  // of this tighter region, compressing the scrub to finish well before the curtain.
  const sequenceRef = useRef<HTMLDivElement>(null);
  useHUDReveal(hudRef);
  useLiquidReveal(hudRef);

  return (
    /* ─────────────────────────────────────────────────────
       ROOT FIX: bg-transparent — never cover the canvas.
       ──────────────────────────────────────────────────── */
    <main className="relative w-full bg-transparent">

      {/* ─── Canvas Sequence — Scrub ends at 85% of sequenceRef (section track only) ─── */}
      <CanvasSequence
        desktopPath="/home-desktop/"
        tabletPath="/home-desktop/"
        mobilePath="/home-desktop/"
        frameCount={337}
        scrollTriggerRef={sequenceRef}
      />

      {/* ─── Scrolling HUD Sections (over video, transparent bg) ─── */}
      <div ref={hudRef} className="relative z-10 flex flex-col w-full">

        {/* ┌───────────────────────────────────────────────────────────────
             sequenceRef BOUNDARY — GSAP canvas scrub is tethered to this div.
             It spans: 4 HUD sections + 3 cinematic spacers + 1 cinematic hold buffer.
             The curtain is OUTSIDE this boundary so the scrub ends before it.
             └─────────────────────────────────────────────────────────────── */}
        <div ref={sequenceRef} className="flex flex-col w-full">

        {/* ═══ SECTION 1 — Hero ═══ */}
        <section
          id="hero-section"
          className="relative min-h-[80vh] flex flex-col justify-center py-20 w-full overflow-hidden"
        >
          {/* Top content wrapper with smart padding */}
          <div className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
            {/* Overline */}
            <p className="text-neutral-950/50 text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] mb-6 hud-blur-reveal">
              <span className="text-red-600">German Standard</span> Engineering · Made in UAE
            </p>
          </div>

          {/* Heading — Hydro-Kinetic Reveal (FULL BLEED MASK BOUNDARY) */}
          {/* This wrapper must touch the edges of the screen so the mask sweeps from the true left/right */}
          <div className="w-full mb-6 hud-liquid-reveal">
            {/* Inner wrapper applies the elegant padding to align text */}
            <div className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
              <h1 className="font-sans font-extrabold leading-[0.85] tracking-tighter text-neutral-950
                text-[clamp(4rem,12vw,10rem)]">
                <span className="relative pb-4 inline-block text-neutral-950 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">EVOLVE</span>.<br className="hidden sm:block" />{" "}
                <span className="relative pb-4 inline-block text-red-600 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">EXPAND</span>.<br className="hidden sm:block" />{" "}
                <span className="relative pb-4 inline-block text-yellow-400 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">EMPOWER</span><span className="text-emerald-600">.</span>
              </h1>
            </div>
          </div>

          {/* Bottom content wrapper with smart padding */}
          <div className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
            <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full mb-14">
              <p className="gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Premium PP-R Piping Systems in the <span className="text-red-600">UAE</span>. Manufactured to strict{" "}
                <span className="text-yellow-400">German Standard</span> <span className="text-yellow-400">DIN 8077/8078</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 hud-blur-reveal">
              <HeroCTA href="/products" isPrimary>
                View Product Range
              </HeroCTA>
              <HeroCTA href="/about">
                Learn About RAKPLUS
              </HeroCTA>
            </div>

            {/* Scroll indicator */}
            <div className="mt-16 md:mt-24 flex items-center gap-4 hud-blur-reveal">
              <div className="w-[1px] h-12 md:h-16 bg-neutral-950/20" />
              <span className="text-neutral-950/40 text-[9px] md:text-[11px] uppercase tracking-[0.4em] font-bold">
                Scroll to explore
              </span>
            </div>
          </div>
        </section>

        {/* ═══ CINEMATIC SPACER ═══ */}
        <div className="w-full min-h-[5vh] md:min-h-[10vh] pointer-events-none" aria-hidden="true" />

        {/* ═══ SECTION 2 — German Engineering ═══ */}
        <section
          id="engineering-section"
          className="min-h-[80vh] flex flex-col justify-center py-16 md:py-28 px-[10vw]"
        >
          <div className="w-full max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-center">
              {/* Left — Text spans 5 cols */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm border border-neutral-950/15 mb-10 hud-blur-reveal">
                  <Wrench className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px] font-bold text-neutral-950 uppercase tracking-[0.2em]">
                    DIN 8077 / 8078 · DVS 2207
                  </span>
                </div>

                <div className="hud-liquid-reveal pb-6 pr-2">
                  <h2 className="font-sans font-extrabold leading-tight tracking-tighter text-neutral-950
                    text-[clamp(2.7rem,7.2vw,6.3rem)] mb-10 pr-4">
                    <span className="text-red-600">German Standard</span>
                    <br />
                    <span className="whitespace-nowrap">Engineering<span className="text-emerald-600">.</span><span className="text-transparent select-none pr-4">&nbsp;</span></span>
                  </h2>
                </div>

                <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full mb-14">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Manufactured using modern technology in strict accordance with{" "}
                  <span className="text-red-600">German standards</span> <span className="text-emerald-600">DIN 8077/8078</span>. Every pipe is produced with
                  precision tooling and <span className="text-yellow-400">DVS 2207</span> certified welding processes.
              </p>
            </div>

                <div className="hud-blur-reveal">
                  <HeroCTA href="/products" isPrimary>
                    View Product Range
                  </HeroCTA>
                </div>
              </div>

              {/* Right — Stats Grid spans 6 cols with a 1 col gap (starts at 7) and breaks out with negative margin */}
              <div className="lg:col-start-7 lg:col-span-6 lg:-ml-12 hud-stagger-group grid grid-cols-2 gap-12 lg:gap-16 lg:pl-16 lg:border-l-2 lg:border-neutral-950/10">
                {[
                  { value: "PN10", label: "to PN25" },
                  { value: "20mm", label: "to 160mm" },
                  { value: "SDR6", label: "to SDR11" },
                  { value: "50yr", label: "Service Life" },
                ].map((stat) => (
                  <div key={stat.value} className="hud-stagger-item">
                    <span className="block font-sans font-black text-neutral-950 tabular-nums tracking-tighter
                      text-[clamp(2rem,5vw,3.5rem)] leading-none mb-2">
                      {stat.value}
                    </span>
                    <span className="text-[10px] md:text-xs text-neutral-950 font-bold uppercase tracking-wider block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CINEMATIC SPACER ═══ */}
        <div className="w-full min-h-[5vh] md:min-h-[10vh] pointer-events-none" aria-hidden="true" />

        {/* ═══ SECTION 3 — GCC Trust ═══ */}
        <section
          id="gcc-trust-section"
          className="min-h-[80vh] flex flex-col justify-center py-16 md:py-28 px-[10vw]"
        >
          <div className="w-full max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-center">
              
              {/* Left — Cert Badges (Spans 6 cols, negative margin to overlap) */}
              <div className="order-2 lg:order-1 lg:col-span-6 lg:-mr-8 hud-stagger-group flex flex-wrap gap-4 z-10">
                {[
                  "ISO 9001:2015",
                  "ISO 14001:2015",
                  "DIN 8077/8078",
                  "DVS 2207",
                  "EN ISO 15874-2",
                ].map((cert) => (
                  <span
                    key={cert}
                    className="hud-stagger-item px-5 py-3 md:px-6 md:py-4 text-xs md:text-sm font-bold text-neutral-950
                      bg-white/80 backdrop-blur-md border-2 border-neutral-950/20 rounded-xl uppercase tracking-widest shadow-xl"
                  >
                    {cert}
                  </span>
                ))}
              </div>

              {/* Right — Text (Spans 5 cols, starts at col 8) */}
              <div className="order-1 lg:order-2 lg:col-start-8 lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm border border-neutral-950/15 mb-10 hud-blur-reveal">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px] font-bold text-neutral-950 uppercase tracking-[0.2em]">
                    ISO 9001:2015 · ISO 14001:2015
                  </span>
                </div>

                <div className="hud-skew-heading">
                  <h2 className="font-sans font-extrabold font-extrabold leading-[0.85] tracking-tighter text-neutral-950
                    text-[clamp(3rem,8vw,7rem)] mb-10">
                    Trusted Across
                    <br />
                    the GCC<span className="text-emerald-600">.</span>
                  </h2>
                </div>

                <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full mb-14">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Trusted across the GCC for residential, commercial, and
                  industrial water transmission. <span className="text-yellow-400">ISO 9001:2015</span> certified quality
                  with a <span className="text-emerald-600">50-year guaranteed service life</span>.
              </p>
            </div>

                <div className="hud-blur-reveal">
                  <HeroCTA href="/sustainability">
                    Explore Sustainability
                  </HeroCTA>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CINEMATIC SPACER ═══ */}
        <div className="w-full min-h-[5vh] md:min-h-[10vh] pointer-events-none" aria-hidden="true" />

        {/* ═══ SECTION 4 — Potable Water CTA ═══ */}
        <section
          id="contact-section"
          className="min-h-[60vh] flex flex-col justify-center py-16 md:py-28 px-[10vw]"
        >
          <div className="w-full max-w-[1920px] mx-auto">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm border border-neutral-950/15 mb-10 hud-blur-reveal">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-[11px] font-bold text-neutral-950 uppercase tracking-[0.2em]">
                  <span className="text-emerald-600">50-Year Guarantee</span>
                </span>
              </div>

              <div className="hud-skew-heading">
                <h2 className="font-sans font-extrabold font-extrabold leading-[0.85] tracking-tighter text-neutral-950
                  text-[clamp(3rem,8vw,7rem)] mb-10">
                  100% Safe for
                  <br />
                  Potable Water<span className="text-red-600">.</span>
                </h2>
              </div>

              <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full mb-14">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Exceeding <span className="text-emerald-600">DIN 8077/8078</span> <span className="text-red-600">German Standards</span> for Hygiene. RAKPLUS
                PP-R pipes are independently tested — hygienic, non-toxic,
                and safe for your family&apos;s drinking water.
              </p>
            </div>

              <div className="hud-blur-reveal">
                <HeroCTA href="/contact" isPrimary>
                  Get a Quote
                </HeroCTA>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CINEMATIC SPACER ═══ */}
        <div className="w-full min-h-[5vh] md:min-h-[10vh] pointer-events-none" aria-hidden="true" />

        {/* ═══ SECTION 5 — Global Infrastructure ═══ */}
        <section
          id="infrastructure-section"
          className="min-h-[80vh] flex flex-col justify-center py-16 md:py-28 px-[10vw]"
        >
          <div className="w-full max-w-[1920px] mx-auto">
            <div className="max-w-4xl">
              <div className="hud-skew-heading">
                <h2 className="font-sans font-extrabold font-extrabold leading-[0.85] tracking-tighter text-neutral-950
                  text-[clamp(3rem,8vw,7rem)] mb-10">
                  Global
                  <br />
                  Infrastructure<span className="text-emerald-600">.</span>
                </h2>
              </div>

              <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full mb-14">
                <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                  Engineered for the most demanding environments. The <span className="text-red-600">RAKPLUS®</span> system is designed for Hot & Cold potable water supply in residential and commercial buildings, HVAC, compressed air systems, and networks for aggressive fluids.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CINEMATIC SPACER ═══ */}
        <div className="w-full min-h-[5vh] md:min-h-[10vh] pointer-events-none" aria-hidden="true" />

        {/* ═══ SECTION 6 — Built to Outlast ═══ */}
        <section
          id="fifty-year-promise-section"
          className="min-h-[80vh] flex flex-col justify-center py-16 md:py-28 px-[10vw]"
        >
          <div className="w-full max-w-[1920px] mx-auto flex justify-end">
            <div className="max-w-4xl w-full text-right">
              <div className="hud-skew-heading">
                <h2 className="font-sans font-extrabold font-extrabold leading-[0.85] tracking-tighter text-neutral-950
                  text-[clamp(3rem,8vw,7rem)] mb-10">
                  Built to
                  <br />
                  Outlast<span className="text-yellow-400">.</span>
                </h2>
              </div>

              <div className="bg-emerald-50/40 backdrop-blur-md border-r-4 border-emerald-500 p-6 rounded-l-2xl max-w-3xl w-full mb-14 ml-auto text-left">
                <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                  Manufactured using modern technology in accordance with strict <span className="text-red-600">German standards</span>. Characterized by high impact strength, our environment-friendly, lightweight piping networks deliver a guaranteed service life of <span className="text-emerald-600">min. 50 years</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CINEMATIC HOLD BUFFER ═══ */}
        {/* Phase 39: Final locked-frame buffer — user scrolls through empty space while
            GSAP scrub finishes the last frames and holds the solid pipe image for ~1s. */}
        <div className="w-full h-[50vh] md:h-[70vh] bg-transparent pointer-events-none" aria-hidden="true" />

        </div>{/* ─── END sequenceRef boundary ─── */}

        {/* ═══════════════════════════════════════════════════════
            CINEMATIC CURTAIN — Pristine White Frosted Glass
            Slides up from below the video.
            ═══════════════════════════════════════════════════ */}
        <CinematicCurtain id="home-curtain">
          <article className="w-full px-[10vw] max-w-[1920px] mx-auto pt-[20vh] md:pt-[30vh] lg:pt-[35vh] pb-24 md:pb-32 lg:pb-40">

            {/* ─── Overline ─── */}
            <div className="mb-20 md:mb-32 reveal-curtain-child">
              <div className="w-24 h-[3px] bg-gradient-to-r from-emerald-500 to-transparent rounded-full mb-8" />
              <span className="text-emerald-600 text-xs font-black uppercase tracking-[0.35em]">
                The Unbreakable Foundation
              </span>
            </div>

            {/* ─── Asymmetrical Main Grid ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 mb-32 md:mb-48">

              {/* LEFT — Typography (Spans 5 cols) */}
              <div className="lg:col-span-5">

                {/* Heading with clip-path reveal */}
                <div className="overflow-hidden mb-12 md:mb-16 gsap-heading">
                  <div className="gsap-heading-inner">
                    <h2 className="font-sans font-extrabold font-extrabold leading-[0.85] tracking-tighter text-neutral-950
                      text-[clamp(3.5rem,8vw,7.5rem)]">
                      Engineered for
                      <br />
                      the Extremes<span className="text-red-600">.</span>
                      <br />
                      <span className="text-neutral-950 font-black
                        text-[clamp(1.5rem,3vw,3rem)] tracking-normal leading-normal mt-4 block">
                        Guaranteed for 50 Years.
                      </span>
                    </h2>
                  </div>
                </div>

                {/* Staggered paragraphs */}
                <div className="gsap-stagger-group flex flex-col gap-8 mb-16 max-w-2xl">
                  <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                The RAKPLUS PP-R system is built on a proprietary{" "}
                    <strong className="font-bold">
                      Polypropylene Random-Copolymer (PP-R Type 3)
                    </strong>{" "}
                    matrix — engineered for maximum molecular stability under
                    extreme pressure and temperature differentials. Every
                    millimeter extruded from <span className="text-emerald-500">100% virgin material</span>, guaranteeing
                    zero contamination for potable water networks.
              </p>
            </div>
                  <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                With continuous operating temperatures of up to{" "}
                    <strong className="font-bold">70°C</strong> and
                    short-term peaks of{" "}
                    <strong className="font-bold">100°C</strong>, the
                    PP-R matrix delivers unmatched thermal endurance. Thermal
                    conductivity of just{" "}
                    <strong className="font-bold">0.24 W/mK</strong>{" "}
                    — maximising energy retention in HVAC systems.
              </p>
            </div>
                </div>

                {/* Stat Strip — staggered */}
                <div className="gsap-stagger-group grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
                  {[
                    { value: "70", suffix: "°C", label: "Continuous Temp", icon: <Thermometer className="w-5 h-5 text-emerald-600" /> },
                    { value: "100", suffix: "°C", label: "Peak Temp", icon: <Zap className="w-5 h-5 text-emerald-600" /> },
                    { value: "0.24", suffix: "", label: "W/mK Conductivity", icon: <Shield className="w-5 h-5 text-emerald-600" /> },
                    { value: "50", suffix: "yr", label: "Service Life", icon: <Award className="w-5 h-5 text-emerald-600" /> },
                  ].map((stat) => (
                    <div key={stat.label} className="gsap-stagger-item flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        {stat.icon}
                      </div>
                      <div className="flex items-baseline gap-0.5">
                        <span
                          className="font-sans font-black text-neutral-950 tabular-nums tracking-tighter
                            text-[clamp(1.8rem,4vw,2.8rem)] leading-none"
                        >
                          {stat.value}
                        </span>
                        <span className="font-sans font-black text-neutral-950 text-xl">
                          {stat.suffix}
                        </span>
                      </div>
                      <span className="text-[10px] md:text-xs text-neutral-950 font-bold uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <CurtainPrimaryCTA href="/innovation">
                    Explore Innovation
                  </CurtainPrimaryCTA>
                  <LiquidButton isPrimary={false} href="/products">
                    View Product Range
                  </LiquidButton>
                </div>
              </div>

              {/* RIGHT — Image wipe reveal (Spans 6 cols, negative margin) */}
              <div className="lg:col-start-7 lg:col-span-6 lg:-mt-24 lg:-mr-12 gsap-img-wipe relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-neutral-950 shadow-2xl z-10">
                <div className="gsap-parallax w-full h-full">
                  <Image
                    src="/images/curtain-home-thermal.png"
                    alt="RAKPLUS PP-R pipe extreme thermal shield — splitting boiling plasma and liquid nitrogen"
                    width={1000}
                    height={1200}
                    className="absolute top-[-15%] left-0 w-full h-[130%] object-cover gsap-parallax-image"
                    priority={false}
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 pt-20 bg-gradient-to-t from-black/80 to-transparent z-20 flex justify-center text-center">
                  <p className="text-white text-xs font-bold tracking-widest uppercase">
                    Thermal Shield — PP-R Extreme Temperature Resistance
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Certification Strip ─── */}
            <div className="pt-16 md:pt-20 border-t-2 border-neutral-200 reveal-curtain-child">
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <span className="text-[10px] md:text-xs text-neutral-950 font-bold uppercase tracking-wider mr-2">
                  Certified:
                </span>
                <div className="gsap-stagger-group flex flex-wrap gap-3">
                  {["DIN 8077/8078", "DVS 2207", "EN ISO 15874-2", "ISO 9001:2015", "ISO 14001:2015", "WRAS Approved"].map(
                    (cert) => (
                      <span
                        key={cert}
                        className="gsap-stagger-item px-4 py-2 text-[10px] md:text-xs font-bold text-neutral-950 bg-neutral-100 rounded-full border border-neutral-200"
                      >
                        {cert}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

          </article>
        </CinematicCurtain>

      </div>
    </main>
  );
}

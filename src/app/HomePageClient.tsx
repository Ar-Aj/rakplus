"use client";

/**
 * RAKPLUS Homepage — Client Shell (Phase 3 Server-Wrapper split)
 *
 * Server-rendered H1 + SEO fallback now live in `page.tsx` (Server
 * Component). This file holds ONLY the interactive GSAP/Canvas layer
 * so Googlebot's initial static HTML fetch sees real headings and
 * copy, not an empty <div id="main-content">.
 */

import { useRef } from "react";
import Link from "next/link";
import LiquidButton from "@/components/ui/LiquidButton";
import CanvasSequence from "@/components/CanvasSequence";
import CinematicCurtain from "@/components/CinematicCurtain";
import SemanticLSIBlock from "@/components/SemanticLSIBlock";
import RelatedProducts from "@/components/RelatedProducts";
import AeoTargetBlock from "@/components/AeoTargetBlock";
import AboveTheFoldHero from "@/components/hero/AboveTheFoldHero";
import { useHUDReveal } from "@/hooks/useHUDReveal";
import { useLiquidReveal } from "@/hooks/useLiquidReveal";
import {
  ArrowRight,
  Shield,
  Award,
  Wrench,
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


// ─── Page (client shell) ───
export default function HomePageClient() {
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
    <div id="main-content" className="relative w-full bg-transparent">

      {/* ─── Above-the-Fold Editorial Hero ─────────────────
          Renders BEFORE <CanvasSequence /> so the rich editorial
          introduction naturally pushes the 3D sequence down by
          1.5–2.5 scrolls. The locked <CanvasSequence /> is NOT
          modified. Its scrollTriggerRef still wraps the HUD
          sections below. ──────────────────────────────────── */}
      <AboveTheFoldHero />

      {/* ── noscript FALLBACK ────────────────────────────────
          Renders a semantic, brand-claims-rich summary for
          crawlers / browsers with JavaScript disabled. Real
          HTML, no Tailwind sr-only trickery. The AeoTargetBlock
          and SemanticLSIBlock below provide the full Q&A and
          LSI content for JS-enabled crawlers.
          ─────────────────────────────────────────────────── */}
      <noscript>
        <div
          style={{
            padding: "2rem 1.5rem",
            maxWidth: "64rem",
            margin: "0 auto",
            fontFamily: "system-ui, sans-serif",
            color: "#0a0a0a",
          }}
        >
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
            WRAS Approved PPR Pipes &amp; 100% Brass Fittings Manufacturer in the UAE
          </h2>
          <p style={{ marginTop: "1rem", fontSize: "1rem", lineHeight: 1.6 }}>
            RakPlus manufactures premium PPR pipes and PPR fittings in the
            UAE, engineered to German Standard DIN 8077/8078. Made from
            100% Polymer with 100% Brass inserts, every RakPlus pipe and
            fitting is WRAS approved for contact with potable drinking
            water and carries a 50 years guaranteed service life.
            Specified by engineers across Dubai, Abu Dhabi, Sharjah, and
            the wider GCC for residential, commercial, and industrial
            water transmission.
          </p>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginTop: "1.5rem" }}>
            Four Verified Claims
          </h2>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem", lineHeight: 1.7 }}>
            <li>100% Polymer</li>
            <li>100% Brass</li>
            <li>WRAS approved</li>
            <li>50 years guaranteed service life</li>
          </ul>
          <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "#525252" }}>
            Pressurised water systems: PN10 to PN25. Continuous
            operating temperature: 70&deg;C. Short-term peak: 100&deg;C.
            Pipe diameters: 20 mm to 160 mm. ISO 9001:2015, ISO
            14001:2015, WRAS, DIN 8077/8078, DVS 2207, EN ISO 15874-2.
          </p>
        </div>
      </noscript>

      {/* ─── Canvas Sequence — Scrub ends at 85% of sequenceRef (section track only) ─── */}
      {/* Frame counts MUST match disk: /home-desktop = 337, /home-mobile = 452.
          mobileEnd overrides CanvasSequence's "+=1500px" mobile fallback, which
          ended the scrub after ~2 screens regardless of the track's real height. */}
      <CanvasSequence
        desktopPath="/home-desktop/"
        tabletPath="/home-desktop/"
        mobilePath="/home-mobile/"
        frameCount={337}
        desktopFrameCount={337}
        mobileFrameCount={452}
        mobileEnd="85% bottom"
        end="+=300%"
        scrub={0.4}
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
              <h2 className="font-sans font-extrabold leading-[0.85] tracking-tighter text-neutral-950
                text-[clamp(4rem,12vw,10rem)]">
                {/* Each word + period shares a nowrap parent: an inline-block's edge is a
                    line-break opportunity, so a bare "." after it could widow on mobile. */}
                <span className="inline-block whitespace-nowrap"><span className="relative pb-4 inline-block text-neutral-950 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">EVOLVE</span>.</span>{" "}
                <span className="inline-block whitespace-nowrap"><span className="relative pb-4 inline-block text-red-600 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">EXPAND</span>.</span>{" "}
                <span className="inline-block whitespace-nowrap"><span className="relative pb-4 inline-block text-yellow-400 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">EMPOWER</span><span className="text-emerald-600">.</span></span>
              </h2>
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
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
              <div className="lg:col-start-7 lg:col-span-6 lg:-ml-12 hud-stagger-group grid grid-cols-2 gap-6 lg:gap-8 lg:pl-16 lg:border-l-2 lg:border-neutral-950/10">
                {[
                  { value: "PN10", label: "to PN25" },
                  { value: "20mm", label: "to 160mm" },
                  { value: "SDR6", label: "to SDR11" },
                  { value: "50yr", label: "Service Life" },
                ].map((stat) => (
                  /* Mini glossy card — a scaled-down echo of the German Standard
                     description card on the left: same translucent emerald glass,
                     same backdrop blur, same left accent rule, just tighter
                     padding and a smaller radius so it reads as a supporting
                     stat rather than competing with the headline card. */
                  <div
                    key={stat.value}
                    className="hud-stagger-item bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500
                      p-4 md:p-5 rounded-r-xl"
                  >
                    <span className="block font-sans font-black text-neutral-950 tabular-nums tracking-tighter
                      text-[clamp(1.6rem,3.2vw,2.4rem)] leading-none mb-1.5">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">

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
                PPR systems are <span className="text-emerald-600">WRAS approved</span> for contact with potable drinking water
                and carry a <span className="text-yellow-400">50-year manufacturer guarantee</span>.
              </p>
            </div>

              <div className="hud-blur-reveal">
                <HeroCTA href="/contact" isPrimary>
                  Request a Quotation
                </HeroCTA>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CINEMATIC HOLD BUFFER (extra scroll room after Section 4 before curtain reveal) ═══ */}
        <div className="w-full min-h-[50vh] md:min-h-[80vh] pointer-events-none" aria-hidden="true" />

        </div>
        {/* ═══ END sequenceRef BOUNDARY ═══ */}

        {/* ═══════════════════════════════════════════════════════
            CINEMATIC CURTAIN — Reveals AFTER the canvas scrub.
            Sits OUTSIDE the sequenceRef so the scrub doesn't
            fight the curtain reveal. Inside hudRef so any
            scroll-triggered HUD logic still applies.
            ═══════════════════════════════════════════════════ */}
        <CinematicCurtain>
          <article className="px-6 md:px-12 max-w-screen-2xl mx-auto py-20 md:py-32">

            {/* Eyebrow */}
            <p className="text-[10px] md:text-xs text-red-600 font-bold uppercase tracking-[0.4em] mb-6">
              The RakPlus Standard
            </p>

            {/* Headline */}
            <h2 className="font-sans font-extrabold leading-[0.85] tracking-tighter text-neutral-950
              text-[clamp(3rem,8vw,7rem)] mb-12 max-w-6xl">
              Evolve. Expand. Empower<span className="text-emerald-600">.</span>
            </h2>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-6xl">
              <p className="text-lg md:text-xl leading-relaxed text-neutral-700 font-bold">
                RakPlus is the UAE&rsquo;s premium PPR pipe and fittings
                manufacturer — engineered to German Standard DIN 8077/8078.
                Every system is built from <span className="text-emerald-600">100% Polymer</span> with <span className="text-yellow-400">100% Brass</span> insert fittings,
                <span className="text-red-600"> WRAS approved</span> for contact with potable water, and
                backed by a <span className="text-emerald-600">50-year manufacturer guarantee</span>.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-neutral-700 font-bold">
                Specified by engineers across Dubai, Abu Dhabi, Sharjah, and
                the wider GCC for hotels, hospitals, high-rise residential
                towers, and industrial facilities. Pressure rated PN10 to
                PN25. Diameters 20 mm to 160 mm. Continuous operating
                temperature 70°C with 100°C short-term peaks.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col sm:flex-row items-start gap-4">
              <CurtainPrimaryCTA href="/products">
                View Product Range
              </CurtainPrimaryCTA>
              <HeroCTA href="/contact">
                Request a Quotation
              </HeroCTA>
            </div>

            {/* Certification Strip */}
            <div className="mt-16 pt-10 border-t border-neutral-200">
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

        {/* ═══════════════════════════════════════════════════════
            AEO TARGET BLOCK — Direct-Answer Q&A for AI crawlers.
            Sits OUTSIDE the canvas scrub region so the answer
            engines can read it even before canvas hydration.
            ═══════════════════════════════════════════════════ */}
        <AeoTargetBlock />

        {/* ─── Related Products — internal link graph (home) ─── */}
        <section className="relative z-10 bg-transparent py-16 md:py-24 px-6 lg:px-8">
          <div className="relative z-10 max-w-7xl mx-auto">
            <RelatedProducts currentSlug="ppr-green-pn20" />
          </div>
        </section>

        {/* ─── LSI Semantic Block — topical authority (home) ─── */}
        <SemanticLSIBlock topic="home" />
      </div>
    </div>
  );
}

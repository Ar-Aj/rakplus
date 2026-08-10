"use client";


/**
 * RAKPLUS About Us — Phase 23.0 Global Color Correction & Elite GSAP
 *
 * CGI videos = pure white backgrounds → ALL text over canvas = PITCH BLACK.
 * Zero drop-shadows. Zero text-white. Zero vignettes.
 * Emerald green = accents/icons only.
 * All CTAs: bg-red-600 → hover:bg-emerald-600 hover:text-white
 *
 * GSAP (via useHUDReveal hook):
 *   .hud-blur-reveal   → blur 14px → 0px + y drift (power3.out)
 *   .hud-skew-heading  → rotateX -18° → 0° (power4.out, 1.3s)
 *   .hud-stagger-group/.hud-stagger-item → cascading y stagger (0.12s)
 *   .hud-scrub-text    → word-by-word scrub opacity 0.2 → 1
 *   .hud-counter       → count-up on enter
 */

import { useRef } from "react";
import Link from "next/link";
import LiquidButton from "@/components/ui/LiquidButton";
import Image from "next/image";
import CanvasSequence from "@/components/CanvasSequence";
import CinematicCurtain from "@/components/CinematicCurtain";
import { useHUDReveal } from "@/hooks/useHUDReveal";
import { ArrowRight, ShieldCheck, Award, Wrench, Droplets } from "lucide-react";

// ─── CTAs — Red → Yellow ───────────────────────────────────────────────
function PrimaryCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <LiquidButton href={href}>
      {children}
    </LiquidButton>
  );
}

// ─── Badge — Black on transparent ───────────────────────────────────────
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

// ─── Spec pill — Black border, black text ───────────────────────────────
function SpecPill({ label }: { label: string }) {
  return (
    <span className="px-3 py-1.5 text-xs font-extrabold text-neutral-950 border border-neutral-950/25 rounded-full uppercase tracking-wide bg-white/30 backdrop-blur-sm">
      {label}
    </span>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────
export default function AboutPageClient() {
  const contentRef = useRef<HTMLDivElement>(null);
  useHUDReveal(contentRef);

  return (
    <main className="relative w-full bg-transparent">

      {/* ─── Canvas (scrollTriggerRef = early-finish at 85%) ─── */}
      <CanvasSequence
        desktopPath="/about-desktop/"
        tabletPath="/about-tablet/"
        mobilePath="/about-mobile/"
        frameCount={155}
        scrollTriggerRef={contentRef}
      />

      {/* ─── HUD Content — zero backgrounds, pitch-black text ─── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full flex flex-col gap-32 md:gap-48 pt-32 pb-40 px-[10vw]"
      >

        {/* ══════════════════════════════════════════════════════
            S1 — AUTHORITY HOOK
            ══════════════════════════════════════════════════════ */}
        <section id="about-hero" className="max-w-4xl">

          <div className="hud-blur-reveal">
            <Badge
              icon={<Award className="w-4 h-4 text-emerald-600" />}
              label="UAE's #1 PPR Manufacturer"
            />
          </div>

          <div className="overflow-hidden hud-liquid-reveal">
            <h1 className="font-sans font-extrabold leading-[0.9] tracking-tighter text-neutral-950
              text-[clamp(3rem,8vw,7rem)]">
              The Best PPR Pipes &amp; Fittings
              <br />
              <span className="relative pb-4 inline-block text-red-600 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">Manufacturer</span> in the <span className="relative pb-4 inline-block text-yellow-400 after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-emerald-500 after:w-full after:rounded-br-[12px]">UAE</span>.
            </h1>
          </div>

          <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl mt-8 max-w-3xl w-full">
            <p className="gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
              With over <span className="text-emerald-500">50 Years</span> of combined expertise, we are the premier thermoplastic engineers in the <span className="text-red-600">UAE</span>, certified to <span className="text-yellow-400">ISO 9001:2015</span>.
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-14 hud-stagger-group flex flex-wrap gap-8 md:gap-16 justify-start max-w-4xl">
            {[
              { value: "5000", suffix: "+", label: "Products" },
              { value: "52", suffix: "+", label: "Countries" },
              { value: "7", suffix: "", label: "Production Units" },
              { value: "30", suffix: "+", label: "Years" },
            ].map((s) => (
              <div key={s.label} className="hud-stagger-item min-w-[120px]">
                <span
                  className="hud-counter block font-sans font-black text-neutral-950 tabular-nums tracking-tighter leading-none
                    text-[clamp(2.2rem,5vw,4rem)]"
                  data-target={s.value}
                  data-suffix={s.suffix}
                >
                  {s.value}{s.suffix}
                </span>
                <span className="block mt-2 text-xs text-neutral-950 uppercase tracking-widest font-bold">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 hud-blur-reveal">
            <PrimaryCTA href="/products">View Corporate Catalog</PrimaryCTA>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S2 — GERMAN ENGINEERING
            ══════════════════════════════════════════════════════ */}
        <section id="about-technology" className="max-w-3xl">

          <div className="hud-blur-reveal">
            <Badge
              icon={<Wrench className="w-4 h-4 text-emerald-600" />}
              label="DIN 8077 / 8078"
            />
          </div>

          <div className="hud-skew-heading">
            <h2 className="font-sans font-extrabold font-extrabold leading-[0.92] tracking-tighter text-neutral-950
              text-[clamp(2.2rem,5.5vw,5rem)]">
              Manufactured to
              <br />
              <span className="text-emerald-600">
                Strict <span className="text-red-600">German Standard</span>s.
              </span>
            </h2>
          </div>

          <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl mt-7 max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                For three decades, RAKPLUS has pioneered the extrusion of advanced polymers in the <span className="text-red-600">UAE</span>. Our manufacturing matrix is powered by next-generation <span className="text-red-600">KraussMaffei engineering</span>, guaranteeing <span className="text-emerald-600">zero-tolerance precision</span> across millions of meters of pipe.
              </p>
            </div>

          <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl mt-5 max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                As an <span className="text-yellow-400">ISO 9001:2015</span> &amp; 14001:2015 certified manufacturer, our
            in-house laboratories subject every batch to rigorous hydrostatic
            pressure testing — ensuring absolute safety, hygiene, and
            non-toxicity for potable water.
              </p>
            </div>

          <div className="mt-8 hud-stagger-group flex flex-wrap gap-3">
            {["DIN 8077/8078", "DVS 2207", "EN ISO 15874-2", "ISO 9001:2015", "ISO 14001:2015"].map(
              (s) => <SpecPill key={s} label={s} />
            )}
          </div>

          <div className="mt-10 hud-blur-reveal">
            <LiquidButton isPrimary={false} href="/innovation">Explore Our Innovation</LiquidButton>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S3 — QUALITY CONTROL (right-anchored on desktop)
            ══════════════════════════════════════════════════════ */}
        <section id="about-quality" className="max-w-3xl self-end text-right">

          <div className="hud-blur-reveal flex justify-end">
            <Badge
              icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
              label="Independent Lab Certified"
            />
          </div>

          <div className="hud-skew-heading">
            <h2 className="font-sans font-extrabold font-extrabold leading-[0.92] tracking-tighter text-neutral-950
              text-[clamp(2.2rem,5.5vw,5rem)]">
              Uncompromising
              <br />
              <span className="text-emerald-600">
                Quality Control.
              </span>
            </h2>
          </div>

          <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl mt-7 ml-auto max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Every RAKPLUS pipeline is backed by strict in-house quality control.
            Tests are carried out through independent laboratories of
            international repute to certify the absolute safety and reliability
            of our potable water systems.
              </p>
            </div>

          <div className="mt-10 flex justify-end hud-blur-reveal">
            <LiquidButton isPrimary={false} href="/sustainability">View Certifications</LiquidButton>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S4 — 50-YEAR GUARANTEE
            ══════════════════════════════════════════════════════ */}
        <section id="about-guarantee" className="text-center mx-auto w-full max-w-5xl">

          <div className="hud-blur-reveal">
            <Badge
              icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
              label="Guaranteed for 50 Years"
            />
          </div>

          <div className="hud-skew-heading">
            <h2 className="font-sans font-extrabold font-extrabold leading-[0.92] tracking-tighter text-neutral-950
              text-[clamp(2.2rem,5.5vw,5rem)]">
              Zero Corrosion.
              <br />
              <span className="text-emerald-600">
                Zero Scaling. 50 Years.
              </span>
            </h2>
          </div>

          <div className="mt-14 hud-stagger-group grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto text-left">
            {[
              {
                icon: <Droplets className="w-6 h-6 text-emerald-600" />,
                title: "Hot & Cold Potable Water",
                body: "100% pure virgin material ensuring hygienic, non-toxic drinking water transmission for residential and commercial buildings.",
              },
              {
                icon: <Wrench className="w-6 h-6 text-emerald-600" />,
                title: "Industrial & HVAC Systems",
                body: "Exceptional chemical resistance for aggressive fluids, compressed air, and chilled water networks in industrial and HVAC applications.",
              },
              {
                icon: <Award className="w-6 h-6 text-emerald-600" />,
                title: "Thermal Efficiency",
                body: "Industry-leading thermal conductivity (0.24 W/mK) drastically reduces energy loss in hot water applications — cutting operating costs.",
              },
            ].map((item) => (
              <div key={item.title} className="hud-stagger-item flex flex-col gap-4">
                {item.icon}
                <h3 className="text-xl font-extrabold text-neutral-950 leading-tight">
                  {item.title}
                </h3>
                <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                {item.body}
              </p>
            </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S5 — CTA HUB
            ══════════════════════════════════════════════════════ */}
        <section id="about-cta" className="text-center max-w-4xl mx-auto">

          <div className="hud-skew-heading">
            <h2 className="font-sans font-extrabold font-extrabold leading-[0.92] tracking-tighter text-neutral-950
              text-[clamp(2.2rem,5.5vw,5rem)]">
              Partner with the UAE&apos;s
              <br />
              <span className="text-emerald-600">
                Leading Piping Manufacturer.
              </span>
            </h2>
          </div>

          <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl mt-7 max-w-3xl w-full mx-auto">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Trusted by engineers, architects, and contractors across 52+
            countries. Certified. Zero-compromise. <span className="text-emerald-500">50-year</span> guaranteed.
              </p>
            </div>

          <div className="mt-12 hud-stagger-group flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <PrimaryCTA href="/contact">Get a Corporate Quote</PrimaryCTA>
            <LiquidButton isPrimary={false} href="/products">Download Technical Catalog</LiquidButton>
            <LiquidButton isPrimary={false} href="/sustainability">View Our Approvals</LiquidButton>
          </div>
        </section>

      </div>

      {/* ═══════════════════════════════════════════════════════════
          CINEMATIC CURTAIN — "German Precision in the GCC"
          ═══════════════════════════════════════════════════════════ */}
      <CinematicCurtain id="about-curtain">
        <article className="w-full px-[10vw] max-w-[1920px] mx-auto py-24 md:py-32 lg:py-40">

          {/* ─── Overline ─── */}
          <div className="mb-16 md:mb-24 reveal-curtain-child">
            <div className="w-20 h-[3px] bg-gradient-to-r from-emerald-500 to-transparent rounded-full mb-6" />
            <span className="text-emerald-600 text-[10px] md:text-xs font-black uppercase tracking-[0.35em]">
              German Precision in the GCC
            </span>
          </div>

          {/* ─── Asymmetrical Grid: Copy Left + Asset Right ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 xl:gap-32">

            {/* LEFT: Typography block */}
            <div className="lg:col-span-7 flex flex-col gap-8">

              <div className="overflow-hidden gsap-heading">
                <div className="gsap-heading-inner">
                  <h2 className="font-sans font-extrabold font-extrabold leading-[0.92] tracking-tighter text-neutral-950
                    text-[clamp(2.8rem,5.5vw,5.5rem)]">
                    ISO Certified<span className="text-red-600">.</span>
                    <br />
                    DIN Compliant<span className="text-red-600">.</span>
                    <br />
                    <span className="text-neutral-950 font-bold
                      text-[clamp(1.2rem,2.5vw,2.5rem)] tracking-normal leading-normal mt-3 block">
                      Our Guiding Principles.
                    </span>
                  </h2>
                </div>
              </div>

              {/* Staggered paragraphs */}
              <div className="gsap-stagger-group flex flex-col gap-6 mb-12 md:mb-16 max-w-2xl">
                <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                At RAKPLUS, engineering is not just a process; it is an
                  obsession. We believe that true quality is binary—there is
                  no room for compromise when it comes to the safety and
                  reliability of infrastructure.
              </p>
            </div>
                <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                RAKPLUS pipes and fittings are manufactured in strict adherence to{" "}
                  <strong className="text-neutral-950"><span className="text-red-600">German standards</span> <span className="text-emerald-600">DIN 8077/8078</span></strong>
                  , the global benchmark for polypropylene piping dimensions and
                  pressure ratings. Every production run is monitored against these
                  exacting specifications — ensuring dimensional accuracy, wall
                  thickness consistency, and pressure class integrity from PN10
                  through <span className="text-red-600">PN25</span>.
              </p>
            </div>
                <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl max-w-3xl w-full">
              <p className="text-black font-bold leading-relaxed gsap-liquid-body text-xl md:text-2xl font-bold leading-relaxed text-neutral-950">
                Our welding and fusion processes conform to{" "}
                  <strong className="text-neutral-950"><span className="text-yellow-400">DVS 2207</span></strong>{" "}
                  regulations, enabling a{" "}
                  <strong className="text-neutral-950">seamless molecular bond</strong>{" "}
                  between pipe and fitting. This creates monolithic, leak-proof
                  networks that completely eliminate joint failure.
              </p>
            </div>
              </div>

              {/* Certification Mosaic */}
              <div className="gsap-stagger-group grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {[
                  { cert: "ISO 9001:2015", desc: "Quality Management" },
                  { cert: "ISO 14001:2015", desc: "Environmental" },
                  { cert: "DIN 8077/8078", desc: "Pipe Dimensions" },
                  { cert: "DVS 2207", desc: "Welding Standards" },
                  { cert: "EN ISO 15874-2", desc: "PP-R for Hot Water" },
                  { cert: "WRAS", desc: "Water Approved" },
                ].map((item) => (
                  <div
                    key={item.cert}
                    className="gsap-stagger-item p-4 border border-neutral-950 rounded-xl bg-white hover:border-emerald-500 transition-colors duration-300"
                  >
                    <span className="block text-sm font-extrabold text-neutral-950">
                      {item.cert}
                    </span>
                    <span className="block text-xs text-neutral-950 mt-1 font-bold">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <PrimaryCTA href="/contact">Contact Engineering Team</PrimaryCTA>
                <LiquidButton isPrimary={false} href="/products">Download Technical Catalog</LiquidButton>
              </div>
            </div>

            {/* RIGHT: Factory image with wipe reveal */}
            <div className="lg:col-span-5 gsap-img-wipe overflow-hidden rounded-3xl">
              <div className="gsap-parallax h-full">
                <Image
                  src="/images/curtain-about-factory.png"
                  alt="RAKPLUS PP-R pipe on high-tech laser inspection table inside industrial manufacturing facility"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-2xl scale-[1.1]"
                  priority={false}
                />
              </div>
              <p className="mt-4 text-[10px] text-neutral-950 font-bold uppercase tracking-wider text-center">
                The Factory Matrix — Precision Quality Inspection
              </p>
            </div>
          </div>

          {/* ─── Stats Strip ─── */}
          <div className="mt-24 md:mt-32 pt-12 border-t border-neutral-200 reveal-curtain-child">
            <div className="gsap-stagger-group grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "5000", suffix: "+", label: "Products" },
                { value: "52", suffix: "+", label: "Countries" },
                { value: "7", suffix: "", label: "Production Units" },
                { value: "30", suffix: "+", label: "Years" },
              ].map((stat) => (
                <div key={stat.label} className="gsap-stagger-item text-center">
                  <span className="block font-sans font-black text-neutral-950 tabular-nums tracking-tighter leading-none
                    text-[clamp(2rem,4vw,3.5rem)]">
                    {stat.value}{stat.suffix}
                  </span>
                  <span className="block mt-2 text-xs text-neutral-950 font-bold uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </article>
      </CinematicCurtain>
    </main>
  );
}

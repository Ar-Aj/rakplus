"use client";

/**
 * RAKPLUS About Us — Phase 14.0 Cinematic Curtain Architecture
 *
 * 182 frames. Tri-viewport: 16:9, 3:4, 9:16.
 * Layout: HUD floating sections → CinematicCurtain obsidian reveal.
 * SEO Focus: German DIN 8077/8078, DVS 2207, ISO certifications.
 */

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import CanvasSequence from "@/components/CanvasSequence";
import CinematicCurtain from "@/components/CinematicCurtain";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, ShieldCheck, Award, Wrench, Droplets } from "lucide-react";

// ─── CTA Buttons ─── (no glass backgrounds — transparent borders only)

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

// ─── Curtain CTA variants ───
function CurtainPrimaryCTA({ href, children }: { href: string; children: React.ReactNode }) {
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

function CurtainGhostCTA({ href, children }: { href: string; children: React.ReactNode }) {
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

// ─── Pill Badge (transparent — just border + text, no bg) ───

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

// ─── Section Divider (invisible structure — no background) ───

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`w-full reveal-section ${className}`}
    >
      {children}
    </section>
  );
}

// ─── Page ───

export default function AboutPageClient() {
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

      {/* ─── Canvas (scrollTriggerRef = early-finish, binds to content div) ─── */}
      <CanvasSequence
        desktopPath="/about-desktop/"
        tabletPath="/about-tablet/"
        mobilePath="/about-mobile/"
        frameCount={182}
        scrollTriggerRef={contentRef}
      />

      {/* ─── HUD Content — pure document flow, zero backgrounds ─── */}
      <div ref={contentRef} className="relative z-10 w-full flex flex-col gap-40 pt-32 pb-40 px-6 md:px-16 lg:px-24">

        {/* ═══════════════════════════════════════════════════
            S1 — AUTHORITY HOOK (Centered)
            ═══════════════════════════════════════════════════ */}
        <Section id="about-hero" className="text-center max-w-5xl mx-auto">
          <Badge
            icon={<Award className="w-4 h-4 text-red-400" />}
            label="UAE's #1 PPR Manufacturer"
          />

          <h1 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9]">
            The Best PPR Pipes &amp; Fittings
            <br />
            <span className="text-red-500 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
              Manufacturer in the UAE.
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] font-bold max-w-3xl mx-auto leading-relaxed">
            Aquasmart Plastic Industries L.L.C, through its flagship brand{" "}
            <span className="text-red-400 drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">RAKPLUS®</span>,
            has established itself as the undisputed leader in thermoplastic
            engineering across the GCC — the premier manufacturer of high-grade
            PP-R piping systems for residential, commercial, and heavy industrial
            water transmission networks.
          </p>

          {/* Stats row — floating numerals, no boxes */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { value: "5000+", label: "Products" },
              { value: "52+", label: "Countries" },
              { value: "7", label: "Production Units" },
              { value: "30+", label: "Years" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-5xl sm:text-6xl font-extrabold font-display text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] leading-none">
                  {s.value}
                </span>
                <span className="block mt-2 text-xs text-white/80 uppercase tracking-widest font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <PrimaryCTA href="/products">View Corporate Catalog</PrimaryCTA>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════
            S2 — GERMAN ENGINEERING (Left-anchored)
            ═══════════════════════════════════════════════════ */}
        <Section id="about-technology" className="max-w-3xl">
          <Badge
            icon={<Wrench className="w-4 h-4 text-red-400" />}
            label="DIN 8077 / 8078"
          />

          <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
            Manufactured to
            <br />
            <span className="text-red-500 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
              Strict German Standards.
            </span>
          </h2>

          <p className="mt-7 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] font-bold leading-relaxed max-w-2xl">
            Our state-of-the-art extrusion technology ensures every pipe and
            fitting guarantees maximum thermal stability and flawless structural
            integrity. RAKPLUS systems are engineered for zero-compromise
            performance in the harshest Middle Eastern climates.
          </p>

          <p className="mt-5 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] font-bold leading-relaxed max-w-2xl">
            As an ISO 9001:2015 &amp; 14001:2015 certified manufacturer, our
            in-house laboratories subject every batch to rigorous hydrostatic
            pressure testing — ensuring absolute safety, hygiene, and
            non-toxicity for potable water.
          </p>

          {/* Standards badges — no background */}
          <div className="mt-8 flex flex-wrap gap-3">
            {["DIN 8077/8078", "DVS 2207", "EN ISO 15874-2", "ISO 9001:2015", "ISO 14001:2015"].map(
              (s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 text-xs font-extrabold text-white/90 border border-white/30 rounded-full uppercase tracking-wide drop-shadow-[0_3px_3px_rgba(0,0,0,1)]"
                >
                  {s}
                </span>
              )
            )}
          </div>

          <div className="mt-10">
            <GlassCTA href="/innovation">Explore Our Innovation</GlassCTA>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════
            S3 — QUALITY CONTROL (Right-anchored on desktop)
            ═══════════════════════════════════════════════════ */}
        <Section id="about-quality" className="max-w-3xl self-end text-right">
          <Badge
            icon={<ShieldCheck className="w-4 h-4 text-red-400" />}
            label="Independent Lab Certified"
          />

          <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
            Uncompromising
            <br />
            <span className="text-red-500 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
              Quality Control.
            </span>
          </h2>

          <p className="mt-7 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] font-bold leading-relaxed ml-auto max-w-2xl">
            Every RAKPLUS pipeline is backed by strict in-house quality control.
            Tests are carried out through independent laboratories of
            international repute to certify the absolute safety and reliability
            of our potable water systems.
          </p>

          <div className="mt-10 flex justify-end">
            <GlassCTA href="/sustainability">View Certifications</GlassCTA>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════
            S4 — 50-YEAR GUARANTEE (Centered, 3-col floats)
            ═══════════════════════════════════════════════════ */}
        <Section id="about-guarantee" className="text-center mx-auto w-full">
          <Badge
            icon={<ShieldCheck className="w-4 h-4 text-red-400" />}
            label="Guaranteed for 50 Years"
          />

          <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
            Zero Corrosion.
            <br />
            <span className="text-red-500 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
              Zero Scaling. 50 Years.
            </span>
          </h2>

          {/* 3 floating application columns — no boxes */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto text-left">
            {[
              {
                icon: <Droplets className="w-6 h-6 text-red-400 drop-shadow-[0_3px_3px_rgba(0,0,0,1)]" />,
                title: "Hot & Cold Potable Water",
                body: "100% pure virgin material ensuring hygienic, non-toxic drinking water transmission for residential and commercial buildings.",
              },
              {
                icon: <Wrench className="w-6 h-6 text-red-400 drop-shadow-[0_3px_3px_rgba(0,0,0,1)]" />,
                title: "Industrial & HVAC Systems",
                body: "Exceptional chemical resistance for aggressive fluids, compressed air, and chilled water networks in industrial and HVAC applications.",
              },
              {
                icon: <Award className="w-6 h-6 text-red-400 drop-shadow-[0_3px_3px_rgba(0,0,0,1)]" />,
                title: "Thermal Efficiency",
                body: "Industry-leading thermal conductivity (0.24 W/mK) drastically reduces energy loss in hot water applications — cutting operating costs.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-4">
                {item.icon}
                <h3 className="text-xl font-extrabold text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] leading-tight">
                  {item.title}
                </h3>
                <p className="text-base text-white/95 font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,1)] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════
            S5 — MASSIVE CTA HUB (Centered)
            ═══════════════════════════════════════════════════ */}
        <Section id="about-cta" className="text-center max-w-4xl mx-auto">
          <h2 className="font-display tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
            Partner with the UAE&apos;s
            <br />
            <span className="text-red-500 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
              Leading Piping Manufacturer.
            </span>
          </h2>

          <p className="mt-7 text-lg md:text-xl text-white/95 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] font-bold max-w-2xl mx-auto leading-relaxed">
            Trusted by engineers, architects, and contractors across 52+
            countries. Certified. Zero-compromise. 50-year guaranteed.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <PrimaryCTA href="/contact">Get a Corporate Quote</PrimaryCTA>
            <GlassCTA href="/products">Download Technical Catalog</GlassCTA>
            <GlassCTA href="/sustainability">View Our Approvals</GlassCTA>
          </div>
        </Section>

      </div>

      {/* ═══════════════════════════════════════════════════════════
          CINEMATIC CURTAIN — "German Precision in the GCC"
          Obsidian block slides up after video HUD sections.
          Asymmetrical reversed stagger: Asset Left, Copy Right.
          ═══════════════════════════════════════════════════════════ */}
      <CinematicCurtain id="about-curtain">
        <article className="w-full px-6 md:px-12 lg:px-20 xl:px-28 py-28 sm:py-36 lg:py-44">

          {/* ─── Top hook line ─── */}
          <div className="max-w-screen-xl mx-auto mb-20 reveal-curtain-child">
            <div className="curtain-accent-line mb-6" />
            <span className="text-red-600 text-xs font-extrabold uppercase tracking-[0.3em]">
              German Precision in the GCC
            </span>
          </div>

          {/* ─── Asymmetrical Stagger Grid: Asset Left + Copy Right ─── */}
          <div className="max-w-screen-xl mx-auto stagger-grid stagger-grid--reverse">

            {/* LEFT (reordered to RIGHT on desktop): Massive Typography + SEO Copy */}
            <div className="flex flex-col gap-8">
              <h2 className="curtain-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold reveal-curtain-child">
                ISO Certified<span className="text-red-600">.</span>
                <br />
                DIN Compliant<span className="text-red-600">.</span>
                <br />
                <span className="text-curtain-muted text-[0.65em]">
                  Undisputed Leadership.
                </span>
              </h2>

              <p className="curtain-body text-lg md:text-xl max-w-xl reveal-curtain-child reveal-delay-1">
                RAKPLUS pipes and fittings are manufactured in strict adherence to{" "}
                <span className="text-white font-bold">
                  German standards DIN 8077/8078
                </span>
                , the global benchmark for polypropylene piping dimensions and
                pressure ratings. Every production run is monitored against these
                exacting specifications — ensuring dimensional accuracy, wall
                thickness consistency, and pressure class integrity from PN10
                through PN25.
              </p>

              <p className="curtain-body text-lg md:text-xl max-w-xl reveal-curtain-child reveal-delay-2">
                Our welding and fusion processes conform to{" "}
                <span className="text-white font-bold">DVS 2207</span>{" "}
                regulations, enabling a{" "}
                <span className="text-white font-bold">
                  seamless molecular bond
                </span>{" "}
                between pipe and fitting. This creates monolithic, leak-proof
                networks that completely eliminate joint failure — the leading
                cause of water damage in traditional metal and PVC systems.
              </p>

              {/* Certification Mosaic */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 reveal-curtain-child reveal-delay-3">
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
                    className="p-4 border border-obsidian-border rounded-xl bg-white/[0.02] hover:border-red-600/40 transition-colors duration-300"
                  >
                    <span className="block text-sm font-extrabold text-white">
                      {item.cert}
                    </span>
                    <span className="block text-xs text-curtain-muted mt-1 font-bold">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Hub */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 reveal-curtain-child reveal-delay-4">
                <CurtainPrimaryCTA href="/contact">
                  Contact Engineering Team
                </CurtainPrimaryCTA>
                <CurtainGhostCTA href="/products">
                  Download Technical Catalog
                </CurtainGhostCTA>
              </div>
            </div>

            {/* RIGHT (reordered to LEFT on desktop): 3D Factory Matrix Asset */}
            <div className="reveal-curtain-child reveal-delay-2">
              <div className="curtain-asset-float">
                <Image
                  src="/images/curtain-about-factory.png"
                  alt="RAKPLUS PP-R pipe on high-tech laser inspection table inside industrial manufacturing facility"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-2xl"
                  priority={false}
                />
              </div>
              <p className="mt-4 text-xs text-curtain-muted font-bold uppercase tracking-wider text-center">
                The Factory Matrix — Precision Quality Inspection
              </p>
            </div>
          </div>

          {/* ─── Bottom Authority Strip ─── */}
          <div className="max-w-screen-xl mx-auto mt-20 pt-10 border-t border-obsidian-border reveal-curtain-child reveal-delay-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "5000+", label: "Products" },
                { value: "52+", label: "Countries" },
                { value: "7", label: "Production Units" },
                { value: "30+", label: "Years" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="curtain-stat block text-3xl sm:text-4xl font-extrabold text-white">
                    {stat.value}
                  </span>
                  <span className="block mt-1 text-xs text-curtain-muted font-bold uppercase tracking-wider">
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

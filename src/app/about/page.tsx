/**
 * About — RAKPLUS by Aquasmart Plastic Industries L.L.C
 *
 * Content extracted from the RAKPLUS catalog and technical submittal:
 * company identity, manufacturing heritage, ISO certifications,
 * and German DIN standards compliance.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Globe, Award, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About — RAKPLUS by Aquasmart Plastic Industries",
  description:
    "RAKPLUS is manufactured by Aquasmart Plastic Industries L.L.C — an ISO 9001:2015 certified facility producing PP-R and PEX piping systems to German DIN 8077/8078 standards. Made in UAE.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-cream">
      {/* ─── Hero ─── */}
      <section className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal via-brand-charcoal/95 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-brand-green uppercase tracking-[0.3em] mb-6">
            About RAKPLUS
          </p>
          <h1 className="font-display tracking-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95]">
            Built on German
            <br />
            <span className="text-brand-green">Precision.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Aquasmart Plastic Industries L.L.C — engineering piping systems
            that meet the highest international standards, right here in the UAE.
          </p>
        </div>
      </section>

      {/* ─── Company Story ─── */}
      <article className="py-20 lg:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Narrative */}
            <div>
              <section className="mb-12">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-charcoal tracking-tight mb-6">
                  Who We Are
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  RAKPLUS is the flagship product line of Aquasmart Plastic
                  Industries L.L.C, a UAE-based manufacturer specializing in
                  polypropylene random copolymer (PP-R) and cross-linked
                  polyethylene (PEX) piping systems for hot and cold water
                  transmission networks.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Every RAKPLUS product is manufactured to strict German DIN
                  8077/8078 standards, ensuring dimensional accuracy, pressure
                  integrity, and a guaranteed service life of 50 years under
                  continuous operational stress. Our manufacturing processes
                  comply with DVS 2207 welding regulations for plastic pipes.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Distributed through our valued partner Al Haseeb Trading Co
                  L.L.C from Sharjah, UAE, RAKPLUS products serve residential,
                  commercial, and industrial projects across the Gulf region
                  and international markets.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-brand-charcoal tracking-tight mb-6">
                  Our Commitment
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We believe that piping infrastructure should be invisible —
                  installed once, performing flawlessly for decades. Our PP-R
                  pipes are environment-friendly, requiring less energy to
                  manufacture than metal alternatives. They are hygienic,
                  non-toxic, and resistant to corrosion, chemical attack, and
                  scaling.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Every product carries a 10-year comprehensive warranty
                  covering material and manufacturing defects, backed by our
                  ISO 9001:2015 certified quality management system.
                </p>
              </section>
            </div>

            {/* Right: Stats & Certifications */}
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <Building2 className="w-8 h-8 text-brand-green mb-4" />
                <h3 className="font-display text-xl font-bold text-brand-charcoal tracking-tight mb-2">
                  Aquasmart Plastic Industries
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  A dedicated manufacturing facility producing PP-R and PEX
                  piping systems with German-standard tooling and quality
                  control processes.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <Globe className="w-8 h-8 text-brand-green mb-4" />
                <h3 className="font-display text-xl font-bold text-brand-charcoal tracking-tight mb-2">
                  Made in UAE
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Proudly manufactured in the United Arab Emirates with raw
                  materials and engineering processes that meet German DIN and
                  European EN ISO standards.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <Award className="w-8 h-8 text-brand-yellow mb-4" />
                <h3 className="font-display text-xl font-bold text-brand-charcoal tracking-tight mb-2">
                  50-Year Guarantee
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  RAKPLUS pipes deliver a guaranteed service life of 50 years
                  under continuous operational stress — far exceeding
                  industry norms for PP-R piping systems.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <Shield className="w-8 h-8 text-brand-red mb-4" />
                <h3 className="font-display text-xl font-bold text-brand-charcoal tracking-tight mb-2">
                  Certified Quality
                </h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    "ISO 9001:2015",
                    "DIN 8077/8078",
                    "DIN 8076",
                    "DVS 2207",
                    "EN ISO 15874-2",
                  ].map((cert) => (
                    <span
                      key={cert}
                      className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-charcoal bg-gray-100 rounded-md"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ─── CTA ─── */}
      <section className="py-20 px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-charcoal tracking-tight">
            Partner with RAKPLUS
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed max-w-lg mx-auto">
            From specification to delivery — our team is ready to support your
            next project with German-standard piping solutions.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green/90 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-green/25 hover:-translate-y-0.5"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

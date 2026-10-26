/**
 * Terms of Service — /terms
 *
 * Footer-linked on EVERY page. Without this route the footer link 404s.
 * Kept deliberately conservative: it describes supply of goods and
 * technical documentation only, and stays inside the four verified brand
 * claims (100% Polymer, 100% Brass, WRAS approved material, 50-year
 * guaranteed service life) plus DIN 8077/8078 / DVS 2207 standards.
 */

import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service — RakPlus® Rohrsysteme UAE",
  description:
    "RakPlus® Rohrsysteme UAE terms of service for the supply of WRAS approved PPR pipes and 100% Brass insert fittings manufactured to German DIN 8077/8078. 50-year guaranteed service life, UAE & GCC supply.",
  keywords: [
    "RakPlus terms of service",
    "rakplusuae terms",
    "PPR pipe supply terms UAE",
    "ppr pipes uae",
  ],
  alternates: {
    canonical: `${SITE.url}/terms/`,
  },
  openGraph: {
    title: "Terms of Service — RakPlus® Rohrsysteme UAE",
    description:
      "Terms governing the supply of WRAS approved PPR pipes and 100% Brass insert fittings manufactured to German DIN 8077/8078.",
    url: `${SITE.url}/terms/`,
    siteName: SITE.name,
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — RakPlus® Rohrsysteme UAE",
    description:
      "Terms governing the supply of WRAS approved PPR pipes and 100% Brass insert fittings.",
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="pt-32 pb-24 px-6 lg:px-8 bg-white">
      <article className="max-w-3xl mx-auto">
        <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-neutral-600">
          RakPlus® Rohrsysteme UAE · {SITE.address.locality}, United Arab
          Emirates · Last updated 22 October 2026
        </p>

        <section className="mt-10 space-y-8 text-neutral-800 leading-relaxed">
          <div>
            <h2 className="font-sans text-2xl font-bold text-neutral-950">
              1. Scope
            </h2>
            <p className="mt-3">
              These terms govern enquiries, quotations and supply of RakPlus®
              WRAS approved PPR pipes and 100% Brass insert fittings
              manufactured by RakPlus® Rohrsysteme UAE to German Standard
              DIN 8077/8078 and welded to DVS 2207 parameters.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-neutral-950">
              2. Technical documentation
            </h2>
            <p className="mt-3">
              Dimensional tables, WRAS certification dossiers, factory test
              reports and material safety data sheets supplied with each
              quotation form part of the agreed technical specification.
              Pressure classes are designated PN10, PN16, PN20 and PN25
              (SDR 11, SDR 7.4, SDR 6 and SDR 5) across 20 mm to 160 mm
              diameters.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-neutral-950">
              3. Installation
            </h2>
            <p className="mt-3">
              Fusion welding of PP-R pipe and brass-insert fittings must be
              carried out in accordance with DVS 2207 using qualified tooling
              and certified welders. Installation outside these parameters
              voids the service life guarantee.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-neutral-950">
              4. Guarantee
            </h2>
            <p className="mt-3">
              RakPlus® products carry a 50-year guaranteed service life on the
              100% Polymer pipe matrix and 100% Brass insert fittings, subject
              to correct installation, water quality within WRAS approved
              limits, and operation within the published pressure and
              temperature envelope (0–70 °C continuous, 100 °C peak).
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-neutral-950">
              5. Liability
            </h2>
            <p className="mt-3">
              Liability is limited to replacement of defective product supplied
              by RakPlus® Rohrsysteme UAE. Nothing in these terms limits
              liability that cannot lawfully be limited under the applicable
              laws of the United Arab Emirates.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-neutral-950">
              6. Governing law
            </h2>
            <p className="mt-3">
              These terms are governed by the laws of the United Arab Emirates.
              Disputes are subject to the exclusive jurisdiction of the UAE
              courts.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
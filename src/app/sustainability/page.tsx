/**
 * RAKPLUS Sustainability Page — Server Component (Phase 3 SEO Hydration)
 *
 * Renders crawlable static HTML (H1, JSON-LD, SEOContentFallback) and
 * mounts the <SustainabilityPageClient /> shell for the cinematic
 * interactive experience.
 */

import type { Metadata } from "next";
import {
  buildBreadcrumbJsonLd,
  buildOgImages,
  absoluteUrl,
  OG_COVER,
  SITE,
} from "@/lib/seo";
import SEOContentFallback from "@/components/SEOContentFallback";
import SustainabilityPageClient from "./SustainabilityPageClient";

const jsonLdBreadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", url: `${SITE.url}/` },
  { name: "Sustainability", url: `${SITE.url}/sustainability/` },
]);

export const metadata: Metadata = {
  title:
    "WRAS Approved Non-Toxic PPR Piping Systems — Guaranteed for a 50-Year Service Life",
  description:
    "RakPlus WRAS approved, non-toxic PPR piping systems. 100% Polymer, 100% Brass, fully recyclable, zero scaling, zero corrosion, 50-year guaranteed service life. DIN 8077/8078 certified.",
  keywords: [
    "WRAS approved PPR",
    "non-toxic PPR piping",
    "50-year PPR guarantee",
    "recyclable PPR pipes UAE",
    "PPR sustainability",
    "potable water PPR",
    "DIN 8077 8078 certified",
    "ppr pipes uae",
    "ppr pipe manufacturer in gcc",
    "ppr pipes and fittings supplier in dubai",
  ],
  alternates: {
    canonical: `${SITE.url}/sustainability/`,
  },
  openGraph: {
    title:
      "WRAS Approved Non-Toxic PPR Piping Systems — 50-Year Guarantee",
    description:
      "RakPlus WRAS approved, non-toxic PPR piping systems. 100% Polymer, 100% Brass, fully recyclable, zero scaling, zero corrosion, 50-year guaranteed service life. DIN 8077/8078, DVS 2207 certified.",
    url: `${SITE.url}/sustainability/`,
    siteName: SITE.name,
    locale: "en_AE",
    type: "website",
    images: buildOgImages(
      "RakPlus WRAS approved non-toxic PPR piping systems — 100% Polymer, 100% Brass, 50-year guaranteed service life"
    ),
  },
  twitter: {
    card: "summary_large_image",
    title: "WRAS Approved Non-Toxic PPR Piping Systems — 50-Year Guarantee",
    description:
      "RakPlus WRAS approved, non-toxic PPR systems. 100% Polymer, 100% Brass, fully recyclable, 50-year guarantee.",
    images: [absoluteUrl(OG_COVER)],
  },
};

const SUSTAINABILITY_SEO_SECTIONS = [
  {
    heading: "WRAS Approved for Potable Drinking Water",
    body: "Every RakPlus PP-R pipe and brass-insert fitting carries WRAS (Water Regulations Advisory Scheme) approval — the international benchmark for materials in contact with drinking water. WRAS certification is independently tested and is the standard required by specifying engineers and municipalities across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.",
    keyword: "WRAS approved non-toxic PPR",
  },
  {
    heading: "50-Year Guaranteed Service Life",
    body: "RakPlus PP-R systems carry a 50-year manufacturer service life guarantee — the longest published warranty offered by any PPR pipe manufacturer in the UAE. The 50-year guarantee derives from the 100% polymer pipe matrix, 100% brass insert fittings, WRAS approved material, and German Standard DIN 8077/8078 dimensional control.",
    keyword: "50-year PPR guarantee",
  },
  {
    heading: "100% Polymer, 100% Brass",
    body: "Every pipe is extruded from 100% virgin Polypropylene Random Copolymer (PP-R Type 3). Every transition fitting is machined from 100% brass — never plated, never hybrid. The dual-purity construction preserves mechanical integrity at 70°C continuous operating temperatures and 100°C short-term peaks.",
    keyword: "100% polymer 100% brass PPR",
  },
  {
    heading: "Fully Recyclable Thermoplastic",
    body: "Polypropylene Random Copolymer is a fully recyclable thermoplastic. End-of-life RakPlus pipes can be reprocessed into new PP-R products, reducing landfill burden and supporting circular economy principles. PP-R extrusion also requires less energy than copper or steel pipe manufacturing.",
    keyword: "recyclable PPR pipes UAE",
  },
  {
    heading: "Zero Scaling, Zero Corrosion",
    body: "PP-R is chemically inert to water, chlorine, desalinated water, and common building chemicals. There is zero mineral scaling, no galvanic corrosion, and no biofilm formation — delivering consistent flow rates and clean water throughout the entire 50-year service life.",
    keyword: "zero scaling zero corrosion PPR",
  },
];

export default function SustainabilityPage() {
  return (
    <main>
      {/* ── Crawlable commercial keyword heading.
          The single canonical <h1> for this route is the visible hero
          headline ("100% Safe. Hygienic. Non-Toxic.") — this line is a
          semantic <h2> so the compiled DOM carries exactly one H1. */}
      <h2 className="sr-only">
        WRAS Approved Non-Toxic PPR Piping Systems — Guaranteed for a 50-Year Service Life
      </h2>

      {/* ── SEO Content Fallback (real, crawlable HTML) ── */}
      <SEOContentFallback
        pageTopic="Sustainability — WRAS Approved Non-Toxic PPR Piping Systems"
        sections={SUSTAINABILITY_SEO_SECTIONS}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <SustainabilityPageClient />
    </main>
  );
}

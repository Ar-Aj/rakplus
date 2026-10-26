/**
 * RAKPLUS Home Page — Server Component (Phase 3 SEO Hydration)
 *
 * Renders crawlable static HTML (H1, semantic headings, JSON-LD,
 * SEOContentFallback) and mounts the <HomePageClient /> shell for
 * the interactive GSAP / Canvas experience.
 *
 * Critical: This file MUST remain a Server Component (no
 * "use client" directive). The H1 below is the single canonical
 * commercial-intent H1 for the home route.
 */

import type { Metadata } from "next";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildOgImages,
  absoluteUrl,
  OG_COVER,
  SITE,
} from "@/lib/seo";
import { AEO_QA_ITEMS } from "@/components/AeoTargetBlock";
import SEOContentFallback from "@/components/SEOContentFallback";
import HomePageClient from "./HomePageClient";

const HOME_FAQ = AEO_QA_ITEMS;

// ── Static Metadata (Commercial-Intent B2B SEO) ─────────────────
export const metadata: Metadata = {
  title:
    "WRAS Approved PPR Pipes & 100% Brass Fittings Manufacturer in the UAE",
  description:
    "RakPlus manufactures WRAS approved PPR pipes and 100% brass fittings in the UAE. Engineered to German DIN 8077/8078, PN10 to PN25, 50-year guarantee. Supplying Dubai, Abu Dhabi, Sharjah, and the wider GCC.",
  keywords: [
    "PPR pipes UAE",
    "PPR fittings UAE",
    "PPR pipe manufacturer UAE",
    "WRAS approved PPR pipes",
    "100% brass PPR fittings",
    "DIN 8077 PPR pipes",
    "PPR pipes Dubai",
    "PPR pipes Abu Dhabi",
    "PPR pipes Sharjah",
    "Umm Al Quwain PPR manufacturer",
    "ppr pipes and fittings supplier in dubai",
    "ppr pipe manufacturer in gcc",
    "RakPlus Rohrsysteme UAE",
  ],
  alternates: {
    canonical: `${SITE.url}/`,
  },
  openGraph: {
    title:
      "WRAS Approved PPR Pipes & 100% Brass Fittings Manufacturer in the UAE",
    description:
      "RakPlus manufactures WRAS approved PPR pipes and 100% brass fittings in the UAE. Engineered to German DIN 8077/8078, DVS 2207, ISO 9001:2015. PN10 to PN25, 20–160 mm, 0–70°C continuous, 100°C peak. 50-year guarantee.",
    url: `${SITE.url}/`,
    siteName: SITE.name,
    locale: "en_AE",
    type: "website",
    images: buildOgImages(
      "RakPlus® Rohrsysteme UAE — WRAS approved PP-R pipes and 100% brass insert fittings manufactured in Umm Al Quwain, UAE"
    ),
  },
  twitter: {
    card: "summary_large_image",
    title:
      "WRAS Approved PPR Pipes & 100% Brass Fittings Manufacturer in the UAE",
    description:
      "RakPlus PPR pipes and 100% brass fittings — WRAS approved, DIN 8077/8078, 50-year guarantee. Manufactured in the UAE.",
    images: [absoluteUrl(OG_COVER)],
  },
};

// ── Crawlable SEO Fallback Sections (visible to bots/AI) ─────────
const HOME_SEO_SECTIONS = [
  {
    heading: "PPR Pipes & Fittings Manufactured in the UAE",
    body: "RakPlus® Rohrsysteme UAE is a UAE-based manufacturer of WRAS approved PPR pipes and 100% brass insert PPR fittings. Production is centered at the Umm Al Quwain facility and supplies distributors, contractors, and specifying engineers across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, and the wider GCC. As a PPR pipe manufacturer in the GCC, RakPlus supplies both Dubai-based trade counters and GCC-wide project specifications.",
    keyword: "ppr pipe manufacturer uae",
  },
  {
    heading: "100% Polymer Pipes · 100% Brass Fittings",
    body: "Every RakPlus PPR pipe is extruded from 100% virgin Polypropylene Random Copolymer (PP-R Type 3). Every transition fitting is machined from 100% brass — never plated, never hybrid. The dual-purity construction delivers mechanical integrity up to 95°C continuous and 100°C short-term peaks.",
    keyword: "100% brass ppr fittings uae",
  },
  {
    heading: "WRAS Approved Material",
    body: "RakPlus PPR pipes and brass-insert fittings are WRAS approved for contact with potable drinking water. WRAS (Water Regulations Advisory Scheme) is the international benchmark required by consultants and municipalities across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.",
    keyword: "wras approved ppr pipes",
  },
  {
    heading: "50 Years Guaranteed Service Life",
    body: "Every RakPlus commercial quotation carries a 50-year manufacturer service life guarantee. The 50-year warranty is the longest published guarantee offered by any PPR pipe manufacturer in the UAE and is a direct consequence of the 100% polymer pipe matrix, 100% brass insert fittings, and WRAS approved material specification.",
    keyword: "50 years ppr guarantee uae",
  },
  {
    heading: "Pressure Classes PN10, PN16, PN20, PN25",
    body: "RakPlus manufactures PPR pipes in four standard pressure classes — PN10 (SDR 11), PN16 (SDR 7.4), PN20 (SDR 6), and PN25 (SDR 5) — covering every UAE plumbing pressure class from residential cold-water distribution to industrial high-pressure risers. Diameters stocked from 20 mm to 160 mm.",
    keyword: "ppr pipes uae pn20 pn25",
  },
];

// ── JSON-LD cluster for the home route ──────────────────────────
// NOTE: Organization is emitted ONCE globally via `src/app/layout.tsx`.
// Re-emitting it here would produce a duplicate `/#organization` @id on
// out/index.html, which Google treats as a conflicting entity claim.
function buildHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "Home", url: `${SITE.url}/` },
      ]),
      buildFaqJsonLd(HOME_FAQ),
    ],
  };
}

export default function HomePage() {
  const jsonLdHome = buildHomeJsonLd();

  return (
    <main>
{/* ── Secondary heading (was a duplicate H1) ──
          The single canonical <h1> for this route lives in the visible
          above-the-fold hero. This crawlable commercial keyword line is a
          semantic <h2> so the compiled DOM carries exactly one H1. */}
      <h2 className="sr-only">
        WRAS Approved PPR Pipes &amp; 100% Brass Fittings Manufacturer in the UAE
      </h2>

      {/* ── SEO Content Fallback (real, crawlable HTML) ── */}
      <SEOContentFallback
        pageTopic="Home — PPR Pipes & Fittings Manufacturer in the UAE"
        sections={HOME_SEO_SECTIONS}
      />

      {/* ── JSON-LD cluster (Organization + Breadcrumb + FAQ) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHome) }}
      />

      {/* ── Interactive Client Shell ── */}
      <HomePageClient />
    </main>
  );
}

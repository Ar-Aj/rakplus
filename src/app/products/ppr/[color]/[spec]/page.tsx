/**
 * PPR Product Detail Page — /products/ppr/[color]/[spec]
 *
 * Server Component handling:
 *   - generateStaticParams() → 8 pages (4 specs × 2 colors)
 *   - generateMetadata() → Gulf-region targeted SEO
 *   - JSON-LD Product Schema → Google Rich Snippets
 *
 * Both green and yellow color params resolve to identical data/layout.
 * Data sourced from:
 *   - data/rakplus_ppr_content.json
 *   - data/rakplus_engineering_tables.json
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllSpecSlugs,
  getSpecData,
  VALID_COLORS,
  isValidColor,
} from "@/config/pprData";
import PPRProductClient from "./PPRProductClient";

// ─── Static Params ───

/**
 * Generates 8 static param combinations:
 *   green/pn10-sdr11, green/pn16-sdr74, green/pn20-sdr6, green/pn25-sdr5
 *   yellow/pn10-sdr11, yellow/pn16-sdr74, yellow/pn20-sdr6, yellow/pn25-sdr5
 */
export function generateStaticParams() {
  const specs = getAllSpecSlugs();
  const params: { color: string; spec: string }[] = [];

  for (const color of VALID_COLORS) {
    for (const spec of specs) {
      params.push({ color, spec });
    }
  }

  return params;
}

// ─── Dynamic Metadata (Gulf-Region SEO) ───

interface PageProps {
  params: { color: string; spec: string };
}

/**
 * Hyper-targeted metadata for Gulf-region SEO dominance.
 * Targets: "Best PPR pipes provider in Dubai", "Top PPR fittings manufacturer UAE"
 */
export function generateMetadata({ params }: PageProps): Metadata {
  const specData = getSpecData(params.spec);

  if (!specData || !isValidColor(params.color)) {
    return {
      title: "Product Not Found — RAKPLUS Pipes / Fittings",
    };
  }

  // Extract spec label from title for meta (e.g., "SDR11 / PN10")
  const specLabel = specData.title.replace("RAKPLUS® PP-R Pipes — ", "");

  return {
    title: `Best PPR Pipes / Fittings Provider in Dubai | RAKPLUS® ${specLabel} German Standard`,
    description: `${specData.shortDescription} RAKPLUS® is the top PPR fittings manufacturer in UAE — ${specData.overviewParagraph.slice(0, 160)}`,
    keywords: [
      "Best PPR pipes provider Dubai",
      "Top PPR fittings manufacturer UAE",
      "RAKPLUS PP-R pipes",
      specLabel,
      "DIN 8077/78",
      "German standard pipes UAE",
      "PPR pipes Dubai",
      "PP-R piping systems",
      "hot cold water pipes UAE",
      "Aquasmart Plastic Industries",
      "Pipes / Fittings",
    ],
    openGraph: {
      title: `RAKPLUS® ${specLabel} — Best PPR Pipes / Fittings in Dubai & UAE`,
      description: specData.shortDescription,
      type: "website",
      locale: "en_AE",
    },
  };
}

// ─── JSON-LD Product Schema ───

function generateJsonLd(specData: NonNullable<ReturnType<typeof getSpecData>>, color: string) {
  const specLabel = specData.title.replace("RAKPLUS® PP-R Pipes — ", "");

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: specData.title,
    description: specData.overviewParagraph,
    brand: {
      "@type": "Brand",
      name: "RAKPLUS",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Aquasmart Plastic Industries L.L.C",
      address: {
        "@type": "PostalAddress",
        addressCountry: "AE",
        addressRegion: "Ras Al Khaimah",
      },
    },
    category: "PP-R Pipes / Fittings",
    material: "Polypropylene Random Copolymer (PP-R)",
    color: color.charAt(0).toUpperCase() + color.slice(1),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Specification",
        value: specLabel,
      },
      {
        "@type": "PropertyValue",
        name: "Standard",
        value: "DIN 8077/78",
      },
      {
        "@type": "PropertyValue",
        name: "Service Life",
        value: "50 years",
      },
      {
        "@type": "PropertyValue",
        name: "Available Sizes",
        value: `${specData.engineeringTable.length} sizes (OD ${specData.engineeringTable[0]?.od_mm ?? "20"}mm – ${specData.engineeringTable[specData.engineeringTable.length - 1]?.od_mm ?? "110"}mm)`,
      },
    ],
    areaServed: [
      {
        "@type": "Place",
        name: "Dubai, UAE",
      },
      {
        "@type": "Place",
        name: "United Arab Emirates",
      },
      {
        "@type": "Place",
        name: "Gulf Cooperation Council (GCC)",
      },
    ],
    award: "ISO 9001:2015 Certified",
  };
}

// ─── Page Component ───

export default function PPRProductPage({ params }: PageProps) {
  const specData = getSpecData(params.spec);

  if (!specData || !isValidColor(params.color)) {
    notFound();
  }

  const jsonLd = generateJsonLd(specData, params.color);

  return (
    <>
      {/* JSON-LD Product Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Client Component: Curtain Reveal Architecture */}
      <PPRProductClient specData={specData} color={params.color} />
    </>
  );
}

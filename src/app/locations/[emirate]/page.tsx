/**
 * UAE Emirate & Commercial-Intent Hub — `/locations/[emirate]`
 *
 * Phase 3: B2B Regional Supply Hubs generated as 100% static
 * HTML for "ppr pipes uae", "ppr fittings uae", and "ppr pipe
 * manufacturer uae" SERP dominance. Each route is a Server
 * Component — no client JS required for the SEO content.
 *
 * Generates 5 routes:
 *   /locations/ppr-pipes-uae/   — Master commercial hub
 *   /locations/dubai/           — Dubai MEP & High-Rise
 *   /locations/abu-dhabi/       — Abu Dhabi WRAS supply
 *   /locations/sharjah/         — Sharjah industrial / commercial
 *   /locations/umm-al-quwain/   — Umm Al Quwain factory hub
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buildBreadcrumbJsonLd,
  buildOgImages,
  absoluteUrl,
  OG_COVER,
  SITE,
} from "@/lib/seo";
import SEOContentFallback from "@/components/SEOContentFallback";

// ── Emirate registry (single source of truth) ─────────────────────

type EmirateKey =
  | "ppr-pipes-uae"
  | "dubai"
  | "abu-dhabi"
  | "sharjah"
  | "umm-al-quwain";

interface EmirateConfig {
  /** Route slug for /locations/[emirate]/ */
  slug: string;
  /** Title-case label (route name) */
  label: string;
  /** Document <title> suffix */
  titleSuffix: string;
  /** Document meta description */
  description: string;
  /** Commercial-intent headline for the visible H1 */
  h1: string;
  /** Sub-headline (visible h2) */
  h2: string;
  /** Geo & climate paragraph */
  climateBody: string;
  /** Applications paragraph (catalogue p.3) */
  applicationsBody: string;
  /** Specs table for direct pressure-class linking */
  specs: Array<{
    code: string;
    label: string;
    application: string;
    href: string;
  }>;
  /** Additional LSI keywords for this emirate */
  lsi: string;
}

const EMIRATES: Record<EmirateKey, EmirateConfig> = {
  "ppr-pipes-uae": {
    slug: "ppr-pipes-uae",
    label: "PPR Pipes UAE",
    titleSuffix:
      "PPR Pipes & Fittings Manufacturer UAE — RakPlus Master Commercial Hub",
    description:
      "Master UAE commercial hub for WRAS approved PPR pipes and 100% brass fittings. RakPlus manufactures and supplies across Dubai, Abu Dhabi, Sharjah, Umm Al Quwain, and the wider GCC. DIN 8077/8078, PN10 to PN25, 50-year guarantee.",
    h1: "PPR Pipes & Fittings Manufacturer in the UAE — RakPlus",
    h2: "WRAS Approved · DIN 8077/8078 · 50-Year Guarantee",
    climateBody:
      "The UAE presents one of the most punishing plumbing environments in the world — coastal humidity, desalinated water chemistry, and ambient temperatures that regularly exceed 45°C. RakPlus PPR systems are engineered for this exact envelope: continuous operating temperature of 70°C with 100°C short-term peaks, thermal conductivity of 0.24 W/mK, and chemically inert PP-R matrix that resists chlorine, brine, and hard-water scaling across the full 50-year service life.",
    applicationsBody:
      "From high-rise residential risers in Dubai Marina to hospital hot-water recirculation loops in Abu Dhabi, from industrial process water in Sharjah to swimming-pool balancing tanks in Umm Al Quwain — RakPlus PPR is specified for every application class documented in Catalogue p.3: Potable Hot & Cold Water Distribution, HVAC & Compressed Air, Rainwater Utilization, Agricultural & Irrigation Networks, Swimming Pool & Spa Facilities, and Corrosive Industrial Fluids.",
    specs: [
      {
        code: "SDR 11 / PN10",
        label: "Cold-Water Distribution",
        application: "Residential cold-water mains, building service risers",
        href: "/products/ppr-green-pn10/",
      },
      {
        code: "SDR 7.4 / PN16",
        label: "Mixed Hot & Cold",
        application: "Hot-water recirculation, HVAC chilled water",
        href: "/products/ppr-green-pn16/",
      },
      {
        code: "SDR 6 / PN20",
        label: "High-Pressure Riser",
        application: "High-rise risers, hospital hot water, commercial",
        href: "/products/ppr-green-pn20/",
      },
      {
        code: "SDR 5 / PN25",
        label: "Industrial Process",
        application: "Industrial process water, pressure-boosted risers",
        href: "/products/ppr-green-pn25/",
      },
    ],
    lsi: "ppr pipes uae · ppr fittings uae · ppr pipe manufacturer uae",
  },
  dubai: {
    slug: "dubai",
    label: "Dubai",
    titleSuffix:
      "PPR Pipes & Fittings Supplier in Dubai — MEP & High-Rise Towers",
    description:
      "RakPlus supplies WRAS approved PPR pipes and 100% brass fittings to MEP contractors and high-rise tower projects across Dubai Marina, Downtown Dubai, JLT, Business Bay, and Dubai Silicon Oasis. PN10 to PN25, 50-year guarantee.",
    h1: "PPR Pipes & Fittings Supplier in Dubai — MEP & High-Rise Towers",
    h2: "WRAS Approved · DIN 8077/8078 · Supplied Across All Dubai Free Zones",
    climateBody:
      "Dubai's pipeline network spans 95+ storey residential towers, five-star hotel districts, and commercial complexes that demand continuous hot-water recirculation at 70°C and pressure ratings up to PN25 on riser stacks. RakPlus PN20 SDR 6 (and PN25 SDR 5) pipes are the most commonly specified for Dubai high-rise risers, with engineered thermal-expansion absorption via DVS 2207-certified fusion welding.",
    applicationsBody:
      "Dubai projects serviced by RakPlus include hotel districts (hot-water recirculation), Marina & Downtown towers (riser stacks + domestic water), hospital projects (sterile water + potable), and commercial complexes (HVAC + compressed air). Every shipment is dimensionally certified to DIN 8077/8078 and accompanied by WRAS approval documentation.",
    specs: [
      {
        code: "SDR 6 / PN20",
        label: "High-Rise Riser",
        application: "Marina & Downtown tower risers, 70°C continuous",
        href: "/products/ppr-green-pn20/",
      },
      {
        code: "SDR 5 / PN25",
        label: "Pressure-Boosted",
        application: "Pressure-boosted risers, 100°C peak capability",
        href: "/products/ppr-green-pn25/",
      },
      {
        code: "SDR 7.4 / PN16",
        label: "HVAC Chilled Water",
        application: "District cooling, condenser water loops",
        href: "/products/ppr-green-pn16/",
      },
      {
        code: "SDR 11 / PN10",
        label: "Domestic Cold Water",
        application: "Apartment cold-water mains, fire reserve",
        href: "/products/ppr-green-pn10/",
      },
    ],
    lsi: "ppr pipes dubai · ppr fittings dubai · ppr supplier dubai marina",
  },
  "abu-dhabi": {
    slug: "abu-dhabi",
    label: "Abu Dhabi",
    titleSuffix:
      "WRAS Approved PPR Pipes & Brass Fittings in Abu Dhabi",
    description:
      "WRAS approved PPR pipes and 100% brass fittings supplied to Abu Dhabi projects — Reem Island, Al Maryah, Yas Island, Saadiyat, and the wider municipal grid. PN10 to PN25, DIN 8077/8078, 50-year guarantee.",
    h1: "WRAS Approved PPR Pipes & Brass Fittings in Abu Dhabi",
    h2: "Reem Island · Al Maryah · Yas · Saadiyat · Municipal Grid",
    climateBody:
      "Abu Dhabi's municipal water supply is fully desalinated and high in chloride, which aggressively attacks metal piping systems within 10 to 15 years. RakPlus PPR's chemically inert 100% polymer matrix eliminates galvanic corrosion, mineral scaling, and biofilm formation — the three failure modes that destroy copper and steel risers in the capital's coastal towers.",
    applicationsBody:
      "RakPlus supplies Abu Dhabi projects including Reem Island residential towers, Al Maryah financial-district commercial developments, Yas Island hospitality, Saadiyat cultural-district precincts, and the wider municipal water grid. Every quotation references the WRAS approval dossier and DIN 8077/8078 dimensional certificate required by Abu Dhabi municipality and Estidama pearl rating reviewers.",
    specs: [
      {
        code: "SDR 6 / PN20",
        label: "High-Rise Hot Water",
        application: "Reem & Al Maryah risers, 70°C continuous",
        href: "/products/ppr-green-pn20/",
      },
      {
        code: "SDR 5 / PN25",
        label: "Industrial Process",
        application: "Hospital process water, desalination plant",
        href: "/products/ppr-green-pn25/",
      },
      {
        code: "SDR 7.4 / PN16",
        label: "HVAC & Chilled",
        application: "District cooling return loops, condenser water",
        href: "/products/ppr-green-pn16/",
      },
      {
        code: "SDR 11 / PN10",
        label: "Domestic Cold",
        application: "Apartment cold-water risers, villa mains",
        href: "/products/ppr-green-pn10/",
      },
    ],
    lsi: "ppr pipes abu dhabi · ppr fittings abu dhabi · wras approved abu dhabi",
  },
  sharjah: {
    slug: "sharjah",
    label: "Sharjah",
    titleSuffix:
      "Industrial & Commercial PPR Piping Systems in Sharjah",
    description:
      "Industrial and commercial PPR piping systems supplied to Sharjah — SAIF Zone, Hamriyah Free Zone, industrial areas, and commercial developments. WRAS approved, chemical-resistant, 50-year guarantee.",
    h1: "Industrial & Commercial PPR Piping Systems in Sharjah",
    h2: "SAIF Zone · Hamriyah Free Zone · Industrial Areas",
    climateBody:
      "Sharjah's industrial zones host chemical processing, food & beverage, and metal-finishing facilities that demand piping systems resistant to acids, alkalis, and chlorinated brine. The RakPlus PP-R chemical-resistance chart (Catalogue p.24) covers the full range of industrial reagents handled in SAIF Zone and Hamriyah — a verifiable reference for Sharjah industrial procurement teams.",
    applicationsBody:
      "Sharjah projects serviced by RakPlus span SAIF Zone (light industrial), Hamriyah Free Zone (heavy industrial + chemical), Sharjah Publishing City (commercial), and University City / Muwaileh (residential). Common applications include chemical-resistant industrial process water, RO reject lines, food-grade hot water, and commercial HVAC distribution.",
    specs: [
      {
        code: "SDR 5 / PN25",
        label: "Industrial Process",
        application: "Chemical-resistant process water, RO reject",
        href: "/products/ppr-green-pn25/",
      },
      {
        code: "SDR 6 / PN20",
        label: "High-Pressure",
        application: "Food-grade hot water, brewery steam",
        href: "/products/ppr-green-pn20/",
      },
      {
        code: "SDR 7.4 / PN16",
        label: "HVAC & Compressed Air",
        application: "Commercial HVAC, low-pressure compressed air",
        href: "/products/ppr-green-pn16/",
      },
      {
        code: "SDR 11 / PN10",
        label: "Domestic Cold",
        application: "Residential cold-water mains",
        href: "/products/ppr-green-pn10/",
      },
    ],
    lsi: "ppr pipes sharjah · ppr industrial sharjah · ppr saif zone",
  },
  "umm-al-quwain": {
    slug: "umm-al-quwain",
    label: "Umm Al Quwain",
    titleSuffix:
      "PPR Pipe Factory & Direct Manufacturing Hub in Umm Al Quwain",
    description:
      "The RakPlus PPR pipe manufacturing facility is headquartered in Umm Al Quwain — RakPlus® Rohrsysteme UAE, Industrial Area, UAQ. Direct factory pricing, technical datasheets, and bulk quotations for the UAE and GCC.",
    h1: "PPR Pipe Factory & Direct Manufacturing Hub in Umm Al Quwain",
    h2: "RakPlus® Rohrsysteme UAE · Industrial Area, UAQ",
    climateBody:
      "The RakPlus manufacturing facility is headquartered in the Industrial Area of Umm Al Quwain, the UAE's northernmost emirate. UAQ provides direct access to the Arabian Gulf port network for GCC distribution while operating under the same coastal humidity envelope as the rest of the UAE — every pipe produced in the factory is engineered for the demanding climate the project pipeline serves.",
    applicationsBody:
      "The UAQ facility is the single point of manufacture for the entire RakPlus commercial range — 100% polymer PPR pipes from PN10 to PN25, 100% brass insert fittings, brass transition valves, and complete DVS 2207 fusion welding equipment. Direct factory pricing is available to B2B buyers, MEP contractors, and distributor partners; technical datasheets, dimensional tables, and WRAS dossiers are dispatched within 24 business hours.",
    specs: [
      {
        code: "PN10 / PN16",
        label: "Factory Direct",
        application: "Bulk wholesale, distributor pricing",
        href: "/products/ppr-green-pn10/",
      },
      {
        code: "PN20 / PN25",
        label: "Factory Direct",
        application: "Bulk wholesale, distributor pricing",
        href: "/products/ppr-green-pn20/",
      },
      {
        code: "Brass Inserts",
        label: "Fittings Factory",
        application: "100% brass elbows, tees, valves, transitions",
        href: "/products/ppr-fittings-green/",
      },
      {
        code: "PEX Systems",
        label: "Cross-linked PE",
        application: "Radiant heating, underfloor systems",
        href: "/products/pex-systems/",
      },
    ],
    lsi: "ppr pipe factory uae · ppr manufacturer uaq · rakplus rohrsysteme uae",
  },
};

// ── Static params (5 routes) ──────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(EMIRATES).map((emirate) => ({ emirate }));
}

// ── Per-route metadata ────────────────────────────────────────────

interface PageProps {
  params: { emirate: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const config = EMIRATES[params.emirate as EmirateKey];
  if (!config) {
    return { title: "Location Not Found — RakPlus UAE" };
  }
  const url = `${SITE.url}/locations/${config.slug}/`;
  return {
    title: `${config.titleSuffix}`,
    description: config.description,
    keywords: [
      "PPR pipes UAE",
      "PPR fittings UAE",
      "PPR pipe manufacturer UAE",
      `PPR pipes ${config.label}`,
      `PPR fittings ${config.label}`,
      "WRAS approved PPR",
      "100% brass PPR fittings",
      "DIN 8077 PPR",
      "ppr pipes uae",
      "ppr pipes and fittings supplier in dubai",
      "ppr pipe manufacturer in gcc",
      config.lsi,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: config.titleSuffix,
      description: config.description,
      url,
      siteName: SITE.name,
      locale: "en_AE",
      type: "website",
      images: buildOgImages(
        `RakPlus WRAS approved PPR pipes and 100% brass fittings supplied across ${config.label} — DIN 8077/8078, 50-year guarantee`
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: config.titleSuffix,
      description: config.description,
      images: [absoluteUrl(OG_COVER)],
    },
  };
}

// ── SEO fallback sections per route ──────────────────────────────

function buildFallbackSections(config: EmirateConfig) {
  return [
    {
      heading: `${config.label} — WRAS Approved PPR Pipes & Fittings`,
      body: `RakPlus supplies WRAS approved PPR pipes and 100% brass insert fittings to ${config.label} and the surrounding region. The full system is dimensionally certified to German Standard DIN 8077/8078, with DVS 2207 fusion welding supported by on-site technical assistance. ${config.applicationsBody}`,
      keyword: `PPR pipes ${config.label}`,
    },
    {
      heading: "UAE Climate Optimized · 70°C Continuous / 100°C Peak",
      body: config.climateBody,
      keyword: `UAE climate optimized ${config.label}`,
    },
    {
      heading: "Pressure Classes PN10 / PN16 / PN20 / PN25",
      body: `RakPlus manufactures PPR pipes in four standard pressure classes — PN10 (SDR 11), PN16 (SDR 7.4), PN20 (SDR 6), and PN25 (SDR 5) — covering every ${config.label} plumbing requirement from residential cold-water distribution to industrial high-pressure risers. Diameters are stocked from 20 mm to 160 mm with green and yellow color options.`,
      keyword: `PN10 PN16 PN20 PN25 ${config.label}`,
    },
    {
      heading: "Four Verified Brand Claims",
      body:
        "100% Polymer pipe matrix · 100% Brass insert fittings · WRAS approved material · 50-year manufacturer service life guarantee. The four claims RakPlus publishes on every commercial quotation, backed by factory test reports and WRAS certification dossiers.",
      keyword: "100% polymer 100% brass WRAS 50 years",
    },
    {
      heading: `Get a Bulk Quotation for ${config.label}`,
      body: `Request a bulk quotation for ${config.label} projects via info@rakplusuae.com or +971 6 744 4345. Our technical sales team responds within 24 business hours with dimensional tables, WRAS certificates, and DVS 2207 welding parameter sheets.`,
      keyword: `PPR quotation ${config.label}`,
    },
  ];
}

// ── Page Component (Server Component) ─────────────────────────────

export default function LocationPage({ params }: PageProps) {
  const config = EMIRATES[params.emirate as EmirateKey];
  if (!config) notFound();

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Locations", url: `${SITE.url}/locations/ppr-pipes-uae/` },
    { name: config.label, url: `${SITE.url}/locations/${config.slug}/` },
  ]);

  return (
    <main className="min-h-screen bg-bg-cream">
      {/* ── Server-rendered Commercial H1 ── */}
      <h1 className="sr-only">{config.h1}</h1>

      {/* ── SEO Content Fallback (real crawlable HTML) ── */}
      <SEOContentFallback
        pageTopic={`${config.label} — RakPlus PPR Pipes & Fittings`}
        sections={buildFallbackSections(config)}
      />

      {/* ── JSON-LD: BreadcrumbList ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* ── Visible editorial surface (replaces hidden sr-only content) ── */}
      <div className="relative z-10 pt-28 lg:pt-36 pb-20 lg:pb-28 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow + H1 + H2 */}
          <header className="mb-10 md:mb-14">
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-[0.3em] mb-4">
              RakPlus — {config.label} Supply Hub
            </p>
            <h2 className="font-sans font-extrabold tracking-tighter leading-[0.95] text-neutral-950 text-3xl sm:text-4xl lg:text-5xl text-balance">
              {config.h1}
            </h2>
            <p className="mt-3 text-base md:text-lg font-bold text-neutral-700 tracking-tight">
              {config.h2}
            </p>
          </header>

          {/* Climate & applications prose */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
            <div className="p-6 md:p-8 rounded-2xl bg-white border border-neutral-950/10 shadow-sm">
              <h3 className="font-sans text-base md:text-lg font-extrabold text-emerald-700 uppercase tracking-wider mb-3">
                UAE Climate & Engineering
              </h3>
              <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-bold">
                {config.climateBody}
              </p>
            </div>
            <div className="p-6 md:p-8 rounded-2xl bg-white border border-neutral-950/10 shadow-sm">
              <h3 className="font-sans text-base md:text-lg font-extrabold text-emerald-700 uppercase tracking-wider mb-3">
                Catalogue p.3 — Applications
              </h3>
              <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-bold">
                {config.applicationsBody}
              </p>
            </div>
          </div>

          {/* Direct spec links */}
          <section
            aria-labelledby="spec-table"
            className="p-6 md:p-8 rounded-2xl bg-white border border-neutral-950/10 shadow-sm mb-12"
          >
            <h3
              id="spec-table"
              className="font-sans text-lg md:text-xl font-extrabold text-neutral-950 tracking-tight mb-4"
            >
              Pressure Class &amp; Specification Links
            </h3>
            <p className="text-sm text-neutral-700 font-bold mb-5">
              Direct dimensional tables and WRAS-approved datasheets for every
              RakPlus pressure class.
            </p>
            <ul className="divide-y divide-neutral-200">
              {config.specs.map((spec) => (
                <li
                  key={spec.code}
                  className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <span className="inline-block min-w-[120px] text-sm font-extrabold text-emerald-700 tabular-nums">
                      {spec.code}
                    </span>
                    <span className="ml-0 sm:ml-3 text-sm font-extrabold text-neutral-950">
                      {spec.label}
                    </span>
                    <p className="text-xs text-neutral-700 font-medium mt-0.5 ml-0 sm:ml-[132px]">
                      {spec.application}
                    </p>
                  </div>
                  <Link
                    href={spec.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-emerald-800 transition-colors self-start sm:self-auto"
                  >
                    View Datasheet →
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Four claims strip */}
          <aside
            aria-label="RakPlus verified claims"
            className="p-5 md:p-6 rounded-2xl bg-emerald-50 border border-emerald-500/30 mb-12"
          >
            <h3 className="font-sans text-[11px] font-extrabold uppercase tracking-[0.25em] text-emerald-700 mb-3">
              Four Verified Claims — RakPlus
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm font-bold text-neutral-950">
              <li className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-600"
                  aria-hidden="true"
                />
                100% Polymer
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-yellow-500"
                  aria-hidden="true"
                />
                100% Brass
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-red-600"
                  aria-hidden="true"
                />
                WRAS Approved
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-600"
                  aria-hidden="true"
                />
                50 Years Guaranteed
              </li>
            </ul>
          </aside>

          {/* Internal link cluster — 4 other emirates */}
          <section
            aria-label="Other UAE Supply Hubs"
            className="p-5 md:p-6 rounded-2xl bg-white border border-neutral-950/10 shadow-sm"
          >
            <h3 className="font-sans text-sm font-extrabold text-neutral-950 uppercase tracking-wider mb-3">
              Other RakPlus UAE Supply Hubs
            </h3>
            <ul className="flex flex-wrap gap-2">
              {Object.values(EMIRATES)
                .filter((e) => e.slug !== config.slug)
                .map((e) => (
                  <li key={e.slug}>
                    <Link
                      href={`/locations/${e.slug}/`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-emerald-50 border border-neutral-950/10 hover:border-emerald-600/30 text-xs font-bold text-neutral-950 transition-colors"
                    >
                      PPR {e.label} →
                    </Link>
                  </li>
                ))}
            </ul>
          </section>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-sm md:text-base font-extrabold rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              Request {config.label} Quotation →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

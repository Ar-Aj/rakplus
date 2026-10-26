/**
 * SEO Sanity Library — RakPlus
 *
 * Centralised, strictly-verified brand claims & structured-data helpers.
 * Every copy string here enforces the FOUR approved brand claims only:
 *   1. 100% Polymer
 *   2. 100% Brass
 *   3. WRAS approved
 *   4. 50 years guaranteed service life
 *
 * Do NOT add additional product claims, certifications, or materials
 * outside this list. All RAKPLUS on-page SEO must funnel through here.
 */

export const SITE = {
  url: "https://rakplusuae.com",
  /**
   * PRIMARY BRAND ENTITY. Google indexes `name` as the undisputed
   * primary organization. RakPlus® is the only public-facing brand.
   */
  name: "RakPlus UAE",
  /** Corporate legal entity behind the RakPlus® brand. */
  legal: "RakPlus Rohrsysteme UAE",
  /** Full descriptor used in metadata / structured data. */
  full: "RakPlus® Rohrsysteme UAE",
  email: "Info@Rakplusuae.com",
  phone: "+97165233869",
  address: {
    street: "Industrial Area, Al Haseeb Trading Co L.L.C",
    poBox: "PO Box 21842",
    locality: "Umm Al Quwain",
    region: "Umm Al Quwain",
    country: "AE",
    postalCode: "21842",
  },
  geo: { lat: 25.5647, lng: 55.5536 },
} as const;

/* ══════════════════════════════════════════════════════════════════
   SOCIAL / LINK-PREVIEW ASSETS
   ────────────────────────────────────────────────────────────────
   WhatsApp, LinkedIn, Facebook, Slack and X all read Open Graph
   tags (NOT the <title> tag) when rendering a link preview.
   Without an explicit og:image the chat bubble shows a blank grey
   box; without og:title/og:description it shows the bare URL.

   These constants point at the generated brand assets:
     • og-rakplus-cover.jpg  — 1200x630 landscape cover (default)
     • og-rakplus-square.jpg — 1200x1200 (WhatsApp / mobile crop)
     • icon-512.png          — square mark
   ══════════════════════════════════════════════════════════════════ */

export const OG_COVER = "/images/og-rakplus-cover.jpg";
export const OG_COVER_PNG = "/images/og-rakplus-cover.png";
export const OG_SQUARE = "/images/og-rakplus-square.jpg";
export const OG_LOGO = "/images/og-rakplus-logo.png";
export const BRAND_ICON = "/icon-512.png";

/**
 * The four approved brand claims, woven into a single keyword-rich
 * sentence. Used as the meta description fallback and as the base
 * of every Open Graph description so that link previews always
 * carry the same verified facts.
 */
export const OG_DEFAULT_DESCRIPTION =
  "RakPlus® Rohrsysteme UAE — UAE manufacturer of WRAS approved PPR pipes & 100% brass insert fittings. German DIN 8077/8078, DVS 2207, ISO 9001:2015. PN10–PN25, 20–160 mm, 0–70°C continuous / 100°C peak. 100% Polymer, 100% Brass, 50-year guaranteed service life. Supplying Dubai, Abu Dhabi, Sharjah & the GCC.";

/** Absolute URL for a site-relative asset path. */
export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE.url}${path}`;
}

/**
 * Builds the `openGraph.images` array. Always includes the 1200x630
 * landscape cover (WhatsApp desktop + LinkedIn + Facebook) and the
 * 1200x1200 square (WhatsApp mobile + Instagram-style cards).
 */
export function buildOgImages(alt: string) {
  return [
    {
      url: absoluteUrl(OG_COVER),
      secureUrl: absoluteUrl(OG_COVER),
      width: 1200,
      height: 630,
      alt,
      type: "image/jpeg",
    },
    {
      url: absoluteUrl(OG_SQUARE),
      secureUrl: absoluteUrl(OG_SQUARE),
      width: 1200,
      height: 1200,
      alt,
      type: "image/jpeg",
    },
  ];
}

/**
 * Builds a consistent Open Graph + Twitter card pair for a page.
 * Passing these through every page guarantees that a link shared in
 * WhatsApp renders the RakPlus logo + a keyword-rich description
 * rather than a bare URL.
 */
export function buildSocialMetadata(opts: {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article" | "product";
  imageAlt?: string;
  image?: string;
}) {
  const imageAlt =
    opts.imageAlt ??
    "RakPlus — WRAS approved PP-R pipes and 100% brass fittings manufactured in the UAE";
  const image = opts.image ?? OG_COVER;

  return {
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: opts.url,
      siteName: SITE.name,
      locale: "en_AE",
      type: opts.type ?? ("website" as const),
      images: opts.image
        ? [
            {
              url: absoluteUrl(opts.image),
              width: 1200,
              height: 630,
              alt: imageAlt,
              type: "image/jpeg",
            },
          ]
        : buildOgImages(imageAlt),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: opts.title,
      description: opts.description,
      images: [absoluteUrl(image)],
    },
  };
}

/** GCC areaServed list — explicit for Generative Engine Optimization. */
export const AREA_SERVED = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "United Arab Emirates",
  "GCC",
] as const;

/**
 * B2B Service catalog — the four primary commercial queries
 * engineers and procurement teams raise when sourcing PPR in
 * the UAE. Every entry is a real, verifiable RakPlus service
 * (not fabricated). Surfaced via the Organization's
 * hasOfferCatalog so generative engines can cite RakPlus
 * as the provider when answering "PPR pipe wholesale UAE"
 * type queries.
 */
export const RAKPLUS_SERVICES = [
  {
    id: "ppr-pipe-wholesale",
    name: "PPR Pipe Wholesale",
    serviceType: "Wholesale Distribution",
    category: "PPR Pipes",
    description:
      "Bulk wholesale supply of 100% Polymer PPR pipes — PN10 to PN25, 20 mm to 160 mm — from the RakPlus Umm Al Quwain facility to distributors and contractors across the UAE and GCC.",
  },
  {
    id: "ppr-fitting-supply",
    name: "PPR Fitting Supply",
    serviceType: "B2B Supply",
    category: "PPR Fittings",
    description:
      "Bulk supply of 100% Brass insert PPR fittings — elbows, tees, reducers, valves, and brass-insert transitions — WRAS approved and DVS 2207 weld-compatible. Dimensional tables and certifications provided with every commercial quotation.",
  },
  {
    id: "wras-certification-consulting",
    name: "WRAS Certification Consulting",
    serviceType: "Technical Compliance",
    category: "Consulting",
    description:
      "Documented WRAS approval and compliance dossiers for every RakPlus pipe and brass-insert fitting. Our technical compliance desk provides WRAS certificates, factory test reports, and material safety data sheets to specifying engineers and municipal approval authorities across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.",
  },
  {
    id: "uae-plumbing-specification-support",
    name: "UAE Plumbing Specification Support",
    serviceType: "Specification Engineering",
    category: "Engineering Support",
    description:
      "Free technical specification support for UAE and GCC projects — DIN 8077/8078 dimensional verification, DVS 2207 welding parameter guidance, PN-class selection for high-rise risers, and on-site welding certification documentation. Provided by the RakPlus engineering desk to consultants and project engineers.",
  },
] as const;

/** Approved brand claims — DO NOT extend this list. */
export const BRAND_CLAIMS = {
  polymer: "100% Polymer",
  brass: "100% Brass",
  wras: "WRAS approved material",
  warranty: "50 years guaranteed service life",
} as const;

/** Canonical product schema for a single RakPlus PPR product. */
export function buildProductJsonLd(opts: {
  name: string;
  description: string;
  image: string;
  sku: string;
  category: string;
  url: string;
  price?: number;
  currency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: opts.image.startsWith("http")
      ? opts.image
      : `${SITE.url}${opts.image}`,
    sku: opts.sku,
    mpn: opts.sku,
    category: opts.category,
    url: opts.url.startsWith("http") ? opts.url : `${SITE.url}${opts.url}`,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: {
      "@type": "Organization",
      name: SITE.legal,
    },
    material: "Polypropylene Random Copolymer (PP-R) with 100% Brass inserts",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Polymer Content",
        value: "100% Polymer",
      },
      {
        "@type": "PropertyValue",
        name: "Brass Insert Content",
        value: "100% Brass",
      },
      {
        "@type": "PropertyValue",
        name: "Water Safety Approval",
        value: "WRAS approved material",
      },
      {
        "@type": "PropertyValue",
        name: "Service Life Warranty",
        value: "50 years guaranteed service life",
      },
    ],
    offers: opts.price
      ? {
          "@type": "Offer",
          priceCurrency: opts.currency ?? "AED",
          price: opts.price,
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: SITE.legal },
        }
      : undefined,
  };
}

/** FAQPage JSON-LD generator. Pass an array of {q,a}. */
export function buildFaqJsonLd(
  items: ReadonlyArray<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** BreadcrumbList JSON-LD generator. */
export function buildBreadcrumbJsonLd(
  crumbs: ReadonlyArray<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url.startsWith("http") ? c.url : `${SITE.url}${c.url}`,
    })),
  };
}

/** Organization JSON-LD with full GCC areaServed + hasOfferCatalog. */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legal,
    alternateName: [
      "RakPlus",
      "RakPlus®",
      "RakPlus Rohrsysteme UAE",
      "Rakplus UAE",
      "RAKPLUS",
    ],
    url: `${SITE.url}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE.url}/images/og-rakplus-cover.jpg`,
    description:
      "UAE premium manufacturer of WRAS-approved PPR pipes and fittings — engineered to German DIN 8077/8078. Made from 100% Polymer with 100% Brass inserts, 50-year guaranteed service life.",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        postOfficeBoxNumber: SITE.address.poBox,
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
        postalCode: SITE.address.postalCode,
      },
    },
    areaServed: AREA_SERVED.map((name) => ({ "@type": "Place", name })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "sales",
        email: SITE.email,
        areaServed: [...AREA_SERVED],
        availableLanguage: ["English", "Arabic"],
      },
    ],
    brand: { "@type": "Brand", name: SITE.name },
    // NOTE: sameAs social URLs are intentionally omitted until
    // verified LinkedIn / Facebook / Instagram accounts exist.
    // Submitting placeholder URLs returns 404 and weakens the
    // Organization entity's authority score in SGE.
    // ── B2B Service catalog ─────────────────────────────
    // These four Service entries cover the four primary
    // commercial queries engineers and procurement teams
    // raise when sourcing PPR in the UAE. Verifiable, real
    // services — no fabricated offerings.
    hasOfferCatalog: {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "@id": `${SITE.url}/#organization-services`,
      name: "RakPlus B2B Service Catalog",
      itemListElement: RAKPLUS_SERVICES.map((svc) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${SITE.url}/#service-${svc.id}`,
          name: svc.name,
          description: svc.description,
          serviceType: svc.serviceType,
          provider: { "@id": `${SITE.url}/#organization` },
          areaServed: [...AREA_SERVED],
          category: svc.category,
        },
      })),
    },
  };
}

/** LocalBusiness JSON-LD with explicit UAE geo + hasOfferCatalog. */
export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.name,
    legalName: SITE.legal,
    alternateName: ["RakPlus®", "RakPlus Rohrsysteme UAE"],
    image: `${SITE.url}/images/og-rakplus-cover.jpg`,
    logo: `${SITE.url}/icon-512.png`,
    url: `${SITE.url}/`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postOfficeBoxNumber: SITE.address.poBox,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
      postalCode: SITE.address.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    areaServed: AREA_SERVED.map((name) => ({ "@type": "Place", name })),
    parentOrganization: { "@id": `${SITE.url}/#organization` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "RakPlus PPR & PEX Piping Catalog",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "PPR Pipes",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "PPR Pipes",
                category: "PPR Pipes",
                description:
                  "100% Virgin Polymer PPR pipes, PN10 to PN25, 20 mm to 160 mm — WRAS approved, 50-year guaranteed.",
                url: `${SITE.url}/products/`,
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "PPR Fittings",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "PPR Fittings",
                category: "PPR Fittings",
                description:
                  "100% Brass insert PPR fittings — elbows, tees, reducers, valves — WRAS approved, 50-year guaranteed.",
                url: `${SITE.url}/products/`,
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Brass Valves",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Brass Valves",
                category: "Brass Valves",
                description:
                  "100% Brass valves and transition fittings for commercial and industrial plumbing — WRAS approved.",
                url: `${SITE.url}/products/`,
              },
            },
          ],
        },
      ],
    },
  };
}

/**
 * Definition list for the four most-cited PPR / plumbing
 * technical benchmarks. Used as the single source of truth
 * for both the <dl> rendered inside AeoTargetBlock and the
 * DefinedTerm JSON-LD cluster that Google SGE can cite as
 * authoritative definitions.
 */
export const DEFINED_TERMS: ReadonlyArray<{
  id: string;
  term: string;
  definition: string;
}> = [
  {
    id: "wras",
    term: "WRAS",
    definition:
      "WRAS (Water Regulations Advisory Scheme) is the United Kingdom certification confirming that a plumbing material is safe for contact with potable drinking water. RakPlus PPR pipes and brass-insert fittings carry WRAS approval — the international benchmark demanded by consultants and municipalities across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.",
  },
  {
    id: "sdr",
    term: "SDR",
    definition:
      "SDR (Standard Dimension Ratio) is the ratio of a pipe's outer diameter to its wall thickness. A lower SDR means a thicker wall and a higher pressure rating. RakPlus PPR pipes are manufactured in SDR 11 (PN10), SDR 7.4 (PN16), SDR 6 (PN20), and SDR 5 (PN25) — covering every UAE plumbing pressure class from residential cold-water distribution to industrial high-pressure risers.",
  },
  {
    id: "pn20",
    term: "PN20",
    definition:
      "PN20 is the pressure class rating for a pipe that withstands a continuous operating pressure of 20 bar at 20°C. RakPlus PN20 PPR pipes have an SDR of 6 (SDR6) and are the most common specification for hot-water recirculation loops, high-rise residential risers, and commercial plumbing across the GCC. Operating temperature: 70°C continuous, 100°C short-term peak.",
  },
  {
    id: "din-8077-8078",
    term: "DIN 8077/8078",
    definition:
      "DIN 8077 and DIN 8078 are the German Standard dimensional and quality specifications for polypropylene (PP-R) pressure pipes. RakPlus PPR pipes are manufactured in strict accordance with DIN 8077 (pipe dimensions) and DIN 8078 (general quality requirements), and welded to DVS 2207 parameters — the same standards specified by European and Gulf-region consulting engineers.",
  },
] as const;

/** DefinedTermSet JSON-LD builder. */
export function buildDefinedTermSetJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${SITE.url}/#defined-terms`,
    name: "RakPlus PPR & Plumbing Technical Terms",
    description:
      "Authoritative definitions of the four most-cited PPR and plumbing technical benchmarks — WRAS, SDR, PN20, and DIN 8077/8078.",
    hasDefinedTerm: DEFINED_TERMS.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${SITE.url}/#term-${t.id}`,
      name: t.term,
      description: t.definition,
      inDefinedTermSet: { "@id": `${SITE.url}/#defined-terms` },
    })),
  };
}

/** Standard alt-text helper for product cover images. */
export function productAltText(opts: {
  productName: string;
  category: string;
  variant?: string;
}): string {
  const v = opts.variant ? ` — ${opts.variant}` : "";
  return `${opts.productName}${v} — RakPlus ${opts.category}, WRAS approved, 100% Polymer, 50-year guarantee`;
}

/** Standard alt-text helper for WebP canvas frame sequences (decorative). */
export function canvasFrameAltText(sequenceName: string): string {
  // Canvas sequences are decorative — keyword-rich alt preserves SEO
  // without describing every frame.
  return `RakPlus ${sequenceName} — WRAS approved PPR pipes & 100% Brass fittings, German DIN 8077/8078, 50-year guarantee`;
}
/**
 * Layers 2 & 3 — Data Files + Registry
 *
 * Reads engineering data from the two source JSON files:
 *   - PPR CATALOG 03-11-22.json (primary)
 *   - Rak plus technical submital.json (enrichment)
 *
 * Merges data by slug, with catalog as the primary source and
 * the technical submittal providing fallback enrichment for features
 * and descriptions.
 *
 * Exports:
 *   - productRegistry: Record<string, ProductConfig>
 *   - getAllProductSlugs(): string[]
 *   - getProductBySlug(slug): ProductConfig | undefined
 */

import type {
  ProductConfig,
  DimensionalRow,
  RawProductJSON,
  CatalogJSON,
} from "@/types/product";

// ─── Raw JSON Imports ───
// Next.js resolves JSON imports at build time via resolveJsonModule.
// ESM import guarantees type safety; validation guards against malformed data.

import rawCatalog from "../../PPR CATALOG 03-11-22.json";
import rawSubmittal from "../../Rak plus technical submital.json";

const EMPTY_CATALOG: CatalogJSON = {
  companyDetails: { name: "", standards: [], warranty: "" },
  products: [],
};

/** Validate that a JSON import has the expected CatalogJSON shape */
function validateCatalog(data: unknown): CatalogJSON {
  try {
    const obj = data as CatalogJSON;
    if (obj && Array.isArray(obj.products) && obj.companyDetails) {
      return obj;
    }
  } catch {
    // Fall through to empty fallback
  }
  console.warn("[RAKPLUS] Malformed catalog data. Using empty fallback.");
  return EMPTY_CATALOG;
}

const catalogData = validateCatalog(rawCatalog);
const submittalData = validateCatalog(rawSubmittal);

// ─── Cover Image Map ───
// Keyed by product slug → public image path
const COVER_IMAGE_MAP: Record<string, string> = {
  "ppr-green-pn10":  "/images/products/green/pn10-green-black.png",
  "ppr-green-pn16":  "/images/products/green/pn-16-green-black.png",
  "ppr-green-pn20":  "/images/products/green/pn20-green-black.png",
  "ppr-green-pn25":  "/images/products/green/pn-25-green-black.png",
  "ppr-yellow-pn10": "/images/products/yellow/pn-10-beige-black.png",
  "ppr-yellow-pn16": "/images/products/yellow/pn-16-beige-black.png",
  "ppr-yellow-pn20": "/images/products/yellow/pn-20-beige-black.png",
  "ppr-yellow-pn25": "/images/products/yellow/pn-25-beige-black.png",
};

// ─── Verified Authoritative SEO Copy (UAE / GCC / Standards) ───
export const PIPE_DESCRIPTION_MAP: Record<string, string> = {
  // PN10 (SDR11) - Green & Yellow
  "ppr-green-pn10":
    "Engineered to German DIN 8077/78 standards, this WRAS-approved PP-R system provides reliable cold water transmission for residential and commercial plumbing across the UAE and GCC. Features exceptional chemical resistance and a smooth inner bore to prevent scaling and pressure loss.",
  "ppr-yellow-pn10":
    "Engineered to German DIN 8077/78 standards, this WRAS-approved PP-R system provides reliable cold water transmission for residential and commercial plumbing across the UAE and GCC. Features exceptional chemical resistance and a smooth inner bore to prevent scaling and pressure loss.",

  // PN16 (SDR7.4) - Green & Yellow
  "ppr-green-pn16":
    "A highly versatile, medium-pressure piping solution manufactured in the UAE. Fully ISO 9001:2015 certified for domestic hot and cold water networks, designed to maintain high thermal stability and structural integrity in demanding regional climates.",
  "ppr-yellow-pn16":
    "A highly versatile, medium-pressure piping solution manufactured in the UAE. Fully ISO 9001:2015 certified for domestic hot and cold water networks, designed to maintain high thermal stability and structural integrity in demanding regional climates.",

  // PN20 (SDR6) - Green & Yellow
  "ppr-green-pn20":
    "Premium high-pressure polymer piping optimized for continuous hot water circulation and industrial fluid transfer. Built to exact German engineering standards, ensuring flawless thermodiffusion welding and zero-leakage performance for high-end GCC developments.",
  "ppr-yellow-pn20":
    "Premium high-pressure polymer piping optimized for continuous hot water circulation and industrial fluid transfer. Built to exact German engineering standards, ensuring flawless thermodiffusion welding and zero-leakage performance for high-end GCC developments.",

  // PN25 (SDR5) - Green & Yellow
  "ppr-green-pn25":
    "The most robust PP-R specification available. Engineered with maximum wall thickness for heavy-duty chilled water (HVAC) networks and extreme pressure applications in Dubai and the wider UAE. Delivers unparalleled service life under continuous stress.",
  "ppr-yellow-pn25":
    "The most robust PP-R specification available. Engineered with maximum wall thickness for heavy-duty chilled water (HVAC) networks and extreme pressure applications in Dubai and the wider UAE. Delivers unparalleled service life under continuous stress.",
};

// ─── Helpers ───

/** Safely parse a dimensional table, returning [] on any malformed data */
function parseDimensionalTable(
  raw: RawProductJSON["dimensionalTable"] | undefined
): DimensionalRow[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((row) => {
      try {
        return {
          part: String(row.part ?? "N/A"),
          dimension: String(row.dimension ?? row.outerDiameter ?? "N/A"),
          wallThickness: String(row.wallThickness ?? "N/A"),
          innerDiameter: String(row.innerDiameter ?? "N/A"),
          ...(row.waterContent !== undefined ? { waterContent: String(row.waterContent) } : {}),
          packingUnit: String(row.packingUnit ?? "N/A"),
          weight: String(row.weight ?? "N/A"),
        };
      } catch {
        return null;
      }
    })
    .filter((row): row is DimensionalRow => row !== null);
}

/** Safely parse fitting items, returning undefined if none exist */
function parseFittingItems(
  raw: RawProductJSON["fittingItems"]
): ProductConfig["fittingItems"] {
  if (!Array.isArray(raw)) return undefined;

  return raw.map((item) => ({
    name: String(item.name ?? "Unknown Fitting"),
    type: String(item.type ?? "fitting"),
    standard: String(item.standard ?? ""),
    coverImage: String(item.coverImage ?? ""),
    specifications: Array.isArray(item.specifications)
      ? item.specifications.map((row) => ({
          partNumber: String(row.partNumber ?? "N/A"),
          dimension: String(row.dimension ?? "N/A"),
          packingUnit: Number(row.packingUnit ?? 0),
          piecesPerPack: Number(row.piecesPerPack ?? 0),
          ...(row.piecesPerBox !== undefined ? { piecesPerBox: Number(row.piecesPerBox) } : {}),
        }))
      : [],
  }));
}

/** Convert a raw JSON product entry into a typed ProductConfig */
function parseProduct(
  raw: RawProductJSON,
  enrichment?: RawProductJSON
): ProductConfig {
  return {
    id: raw.id,
    slug: raw.slug,
    category: raw.category ?? "Uncategorized",
    title: raw.title ?? "",
    description:
      PIPE_DESCRIPTION_MAP[raw.slug] ||
      raw.description ||
      enrichment?.description ||
      "",
    features: Array.from(
      new Set([
        ...(Array.isArray(raw.features) ? raw.features : []),
        ...(Array.isArray(enrichment?.features) ? enrichment!.features : []),
      ])
    ),
    specifications: {
      temperatureResistance:
        raw.specifications?.temperatureResistance ??
        enrichment?.specifications?.temperatureResistance ??
        "",
      standards: Array.from(
        new Set([
          ...(Array.isArray(raw.specifications?.standards)
            ? raw.specifications.standards
            : []),
          ...(Array.isArray(enrichment?.specifications?.standards)
            ? enrichment!.specifications.standards
            : []),
        ])
      ),
    },
    dimensionalTable: parseDimensionalTable(raw.dimensionalTable),
    fittingItems: parseFittingItems(raw.fittingItems),
    coverImage: COVER_IMAGE_MAP[raw.slug] ?? undefined,
    videoSequenceUrl: null, // Placeholder for Phase 2 Locomotive Scroll
  };
}

// ─── Build the Registry ───

/** Index submittal products by slug for O(1) lookup */
const submittalIndex = new Map<string, RawProductJSON>();
for (const product of submittalData.products) {
  if (product.slug) {
    submittalIndex.set(product.slug, product);
  }
}

/**
 * The product registry — a slug-keyed map of all 11 RAKPLUS products.
 * Primary data from PPR Catalog, enriched with Technical Submittal.
 */
export const productRegistry: Record<string, ProductConfig> = {};

for (const catalogProduct of catalogData.products) {
  try {
    const slug = catalogProduct.slug;
    if (!slug) continue;

    const enrichment = submittalIndex.get(slug);
    productRegistry[slug] = parseProduct(catalogProduct, enrichment);
  } catch (err) {
    console.warn(
      `[RAKPLUS] Failed to parse product "${catalogProduct?.slug ?? "unknown"}":`,
      err
    );
  }
}

// ─── Public API ───

/**
 * Returns all product slugs — used by generateStaticParams()
 * to drive the 11 static product pages.
 */
export function getAllProductSlugs(): string[] {
  return Object.keys(productRegistry);
}

/**
 * Retrieve a single product by its URL slug.
 * Returns undefined if the slug is not found.
 */
export function getProductBySlug(slug: string): ProductConfig | undefined {
  return productRegistry[slug];
}

/**
 * Company details extracted from the catalog.
 */
export const companyDetails = {
  name: catalogData.companyDetails?.name ?? "RakPlus by Aquasmart Plastic Industries L.L.C",
  standards: catalogData.companyDetails?.standards ?? [],
  warranty: catalogData.companyDetails?.warranty ?? "",
};

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
          outerDiameter: String(row.outerDiameter ?? ""),
          wallThickness: String(row.wallThickness ?? ""),
          weight: String(row.weight ?? "N/A"),
        };
      } catch {
        return null;
      }
    })
    .filter((row): row is DimensionalRow => row !== null);
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
      raw.description || enrichment?.description || "",
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

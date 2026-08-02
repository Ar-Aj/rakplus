/**
 * Layers 2 & 3 — PPR Data Files + Registry
 *
 * Reads PPR-specific data from:
 *   - data/rakplus_ppr_content.json     (features, applications, spec descriptions)
 *   - data/rakplus_engineering_tables.json (dimensional engineering tables)
 *
 * Merges both sources into PprSpecConfig objects keyed by spec slug.
 *
 * Exports:
 *   - getSpecData(specSlug)   → PprSpecConfig | undefined
 *   - getAllSpecSlugs()       → string[]
 *   - VALID_COLORS            → readonly ['green', 'yellow']
 *   - isValidColor(color)     → boolean
 */

import type {
  PprContentJSON,
  PprEngineeringJSON,
  PprEngineeringRow,
  PprSpecConfig,
} from "@/types/pprTypes";

// ─── Raw JSON Imports ───
// Next.js resolves JSON imports at build time via resolveJsonModule.

import rawContent from "../../data/rakplus_ppr_content.json";
import rawEngineering from "../../data/rakplus_engineering_tables.json";

const contentData = rawContent as PprContentJSON;
const engineeringData = rawEngineering as PprEngineeringJSON;

// ─── Spec Mapping ───
// Maps URL-safe slugs to JSON data keys in both files.

interface SpecMapping {
  specSlug: string;
  dataKey: string;
  /** Human-readable label for navigation */
  label: string;
}

const SPEC_MAPPINGS: SpecMapping[] = [
  { specSlug: "pn10-sdr11", dataKey: "pn10_sdr11", label: "PN10 / SDR11" },
  { specSlug: "pn16-sdr74", dataKey: "pn16_sdr74", label: "PN16 / SDR7.4" },
  { specSlug: "pn20-sdr6",  dataKey: "pn20_sdr6",  label: "PN20 / SDR6" },
  { specSlug: "pn25-sdr5",  dataKey: "pn25_sdr5",  label: "PN25 / SDR5" },
];

/** Valid color parameters — both resolve to the same data */
export const VALID_COLORS = ["green", "yellow"] as const;
export type ValidColor = (typeof VALID_COLORS)[number];

/** Type guard for color parameter */
export function isValidColor(color: string): color is ValidColor {
  return (VALID_COLORS as readonly string[]).includes(color);
}

// ─── Registry Build ───

const specRegistry = new Map<string, PprSpecConfig>();

for (const mapping of SPEC_MAPPINGS) {
  const unique = contentData.unique_content[mapping.dataKey];
  const shared = contentData.shared_content;
  const rows: PprEngineeringRow[] = engineeringData[mapping.dataKey] ?? [];

  if (!unique) {
    console.warn(
      `[RAKPLUS/PPR] Missing content data for key "${mapping.dataKey}". Skipping.`
    );
    continue;
  }

  const hasWaterContent = rows.some(
    (row) => row.water_l_mtr !== undefined && row.water_l_mtr !== ""
  );

  specRegistry.set(mapping.specSlug, {
    dataKey: mapping.dataKey,
    specSlug: mapping.specSlug,
    title: unique.title,
    shortDescription: unique.shortDescription,
    overviewParagraph: unique.overviewParagraph,
    featuresGrid: shared.featuresGrid,
    applicationsList: shared.applicationsList,
    engineeringTable: rows,
    hasWaterContent,
  });
}

// ─── Public API ───

/**
 * Returns all 4 PPR spec slugs — used by generateStaticParams()
 * to produce 8 static pages (4 specs × 2 colors).
 */
export function getAllSpecSlugs(): string[] {
  return SPEC_MAPPINGS.map((m) => m.specSlug);
}

/**
 * Retrieve a single PPR spec by its URL slug.
 * Returns undefined if the slug is not found.
 */
export function getSpecData(specSlug: string): PprSpecConfig | undefined {
  return specRegistry.get(specSlug);
}

/**
 * Get all spec mappings for navigation (prev/next).
 */
export function getSpecMappings(): SpecMapping[] {
  return SPEC_MAPPINGS;
}

/**
 * Get adjacent specs for prev/next navigation.
 */
export function getAdjacentSpecs(
  currentSlug: string
): { prev: PprSpecConfig | null; next: PprSpecConfig | null } {
  const slugs = getAllSpecSlugs();
  const idx = slugs.indexOf(currentSlug);

  return {
    prev: idx > 0 ? getSpecData(slugs[idx - 1]) ?? null : null,
    next: idx < slugs.length - 1 ? getSpecData(slugs[idx + 1]) ?? null : null,
  };
}

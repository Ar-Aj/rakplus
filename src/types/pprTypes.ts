/**
 * Layer 1 — PPR Type Contracts
 *
 * Defines the shape of PPR-specific data flowing from:
 *   - data/rakplus_ppr_content.json   (marketing + features)
 *   - data/rakplus_engineering_tables.json (dimensional specs)
 *
 * These types are consumed by src/config/pprData.ts (Layer 2/3).
 */

// ─── Content JSON Shape ───

/** A single PPR specification's unique marketing content */
export interface PprUniqueContent {
  /** Full product title, e.g. "RAKPLUS® PP-R Pipes — SDR11 / PN10 (DIN 8077/78)" */
  title: string;
  /** One-line description for meta tags and hero subheading */
  shortDescription: string;
  /** Full marketing paragraph for the overview section */
  overviewParagraph: string;
}

/** Shape of the shared_content block */
export interface PprSharedContent {
  /** Engineering feature bullet points */
  featuresGrid: string[];
  /** Application/use-case bullet points */
  applicationsList: string[];
}

/** Root shape of rakplus_ppr_content.json */
export interface PprContentJSON {
  shared_content: PprSharedContent;
  unique_content: Record<string, PprUniqueContent>;
}

// ─── Engineering Table JSON Shape ───

/** A single row in the engineering specification table */
export interface PprEngineeringRow {
  /** RAKPLUS part number, e.g. "RP1020" */
  part: string;
  /** Outer diameter in mm */
  od_mm: string;
  /** Wall thickness in mm */
  wall_mm: string;
  /** Inner diameter in mm */
  id_mm: string;
  /** Packaging unit, e.g. "100 Mtrs" */
  pack: string;
  /** Weight in Kg per meter */
  kg_mtr: string;
  /** Water content in litres per meter (PN25 only) */
  water_l_mtr?: string;
}

/** Root shape of rakplus_engineering_tables.json */
export type PprEngineeringJSON = Record<string, PprEngineeringRow[]>;

// ─── Resolved Config (merged content + engineering) ───

/** Fully resolved PPR spec — content + engineering data merged for UI consumption */
export interface PprSpecConfig {
  /** Internal key, e.g. "pn10_sdr11" */
  dataKey: string;
  /** URL-safe spec slug, e.g. "pn10-sdr11" */
  specSlug: string;
  /** Full product title from content JSON */
  title: string;
  /** Short description for meta/hero */
  shortDescription: string;
  /** Full overview paragraph */
  overviewParagraph: string;
  /** Shared feature bullets */
  featuresGrid: string[];
  /** Shared application bullets */
  applicationsList: string[];
  /** Engineering specification rows */
  engineeringTable: PprEngineeringRow[];
  /** Whether this spec includes water_l_mtr column */
  hasWaterContent: boolean;
}

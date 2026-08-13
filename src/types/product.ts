/**
 * Layer 1 — Type Contracts
 * Defines the shape of all product data flowing through the RAKPLUS registry.
 * All fields sourced directly from PPR CATALOG 03-11-22.json and
 * Rak plus technical submital.json.
 */

/** A single row in a dimensional/specification table */
export interface DimensionalRow {
  part: string;
  dimension: string;
  wallThickness: string;
  innerDiameter: string;
  waterContent?: string;
  packingUnit: string;
  weight: string;
}

/** Technical specifications for a product */
export interface ProductSpecifications {
  /** Temperature range (e.g. "Continuous 0°C to 70°C, short-term peak up to 100°C") */
  temperatureResistance: string;
  /** Applicable standards (e.g. ["DIN 8077/8078", "DVS 2207"]) */
  standards: string[];
}

/** Complete product configuration — the core data contract */
export interface ProductConfig {
  /** Unique numeric ID (1–11) */
  id: number;
  /** URL-safe slug (e.g. "ppr-green-pn10") — drives static routing */
  slug: string;
  /** Product category (e.g. "PPR Green", "PPR Yellow", "PEX Systems") */
  category: string;
  /** Full product title from catalog */
  title: string;
  /** Product description from catalog */
  description: string;
  /** Feature bullet points */
  features: string[];
  /** Engineering specifications */
  specifications: ProductSpecifications;
  /** Dimensional/spec table rows */
  dimensionalTable: DimensionalRow[];
  /** Placeholder for Locomotive Scroll video sequence URL (Phase 2) */
  videoSequenceUrl: string | null;
}

/** The shape of each product entry in the source JSON files */
export interface RawProductJSON {
  id: number;
  slug: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  specifications: {
    temperatureResistance: string;
    standards: string[];
  };
  dimensionalTable: Array<{
    part?: string;
    dimension?: number | string;
    outerDiameter?: string;
    wallThickness?: number | string;
    innerDiameter?: number | string;
    waterContent?: number | string;
    packingUnit?: string;
    weight?: number | string;
  }>;
}

/** The shape of the source JSON files */
export interface CatalogJSON {
  companyDetails: {
    name: string;
    standards: string[];
    warranty: string;
  };
  products: RawProductJSON[];
}

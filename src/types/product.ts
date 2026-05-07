/**
 * Layer 1 — Type Contracts
 * Defines the shape of all product data flowing through the RAKPLUS registry.
 * All fields sourced directly from PPR CATALOG 03-11-22.json and
 * Rak plus technical submital.json.
 */

/** A single row in a dimensional/specification table */
export interface DimensionalRow {
  /** Outer diameter in mm (e.g. "20", "25", "32") */
  outerDiameter: string;
  /** Wall thickness in mm (e.g. "1.9") or descriptive (e.g. "Standard SDR6") */
  wallThickness: string;
  /** Weight per meter (e.g. "0.107 Kg/Mtr") or "N/A" */
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
    outerDiameter: string;
    wallThickness: string;
    weight: string;
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

/**
 * RakPlus Catalogue — Engineering Math Engine
 *
 * Single source of truth for all numerical constants, tables, and
 * engineering formulas used across the interactive calculators.
 *
 * Every value is sourced directly from the official RakPlus Catalogue
 * PDF (RakPlus® Rohrsysteme UAE, Umm Al Quwain, UAE).
 *
 *   • Page 20 — Table 01: Maximum Operating Pressure (DIN 8077, SF=1.25)
 *   • Page 22 — Thermal expansion & bending arm length
 *   • Page 24 — Chemical resistance chart
 *   • Page 06 — PN10 pipe dimensional table
 *   • Page 06 — PN16 pipe dimensional table
 *   • Page 06 — PN20 pipe dimensional table
 *   • Page 07 — PN25 pipe dimensional table
 */

// ─── Page 22 — Linear Thermal Expansion ───────────────────────────────
/**
 * Linear expansion coefficient λ for RakPlus PP-R pipes
 * (Catalogue p.22 — average value).
 * Units: mm / (m · K)
 */
export const THERMAL_EXPANSION_LAMBDA = 0.183;

/**
 * K coefficient used in the bending-arm length formula
 * (Catalogue p.22 — constant coefficient for PP-R pipes = 30).
 */
export const BENDING_ARM_K = 30;

// ─── Page 22 — Worked Example (RakPlus Catalogue, p.22) ──────────────
/**
 * The catalogue's worked example:
 *   Installation temp:        +16 °C
 *   Min operating temp:        +9 °C  (cold water)
 *   Max operating temp:       +70 °C  (hot water)
 *   Pipe length:               8 m
 *   ΔT₁ =  9 - 16 =  -7 °C
 *   ΔT₂ = 70 - 16 = +54 °C
 *   ΔL₁ = 8 × -7 × 0.183 = -10.2 mm
 *   ΔL₂ = 8 × 54 × 0.183 =  79.0 mm
 */
export const WORKED_EXAMPLE = {
  pipeLength: 8,
  installTemp: 16,
  coldTemp: 9,
  hotTemp: 70,
  deltaT1: -7,
  deltaT2: 54,
  deltaL1: -10.2,
  deltaL2: 79.0,
};

// ─── Formulas ────────────────────────────────────────────────────────
/**
 * Linear thermal expansion.
 *   ΔL = λ × L × ΔT
 *   λ = 0.183 mm/(m·K)  (Catalogue p.22)
 *   L = pipe length in metres
 *   ΔT = temperature differential in K (or °C — same magnitude)
 *
 * Returns the linear expansion in millimetres. Sign indicates
 * contraction (negative) vs. expansion (positive).
 */
export function calcLinearExpansion(
  pipeLengthM: number,
  deltaT: number
): number {
  return THERMAL_EXPANSION_LAMBDA * pipeLengthM * deltaT;
}

/**
 * Free bending arm length required to absorb the linear expansion.
 *   Ls = K × √(d × |ΔL|)
 *   K = 30  (Catalogue p.22, constant for PP-R)
 *   d = outside diameter in mm
 *   ΔL = linear expansion in mm (use absolute value for both
 *        contraction and expansion)
 *
 * Returns the required bending arm length in millimetres.
 */
export function calcBendingArm(
  outsideDiameterMm: number,
  deltaLmm: number
): number {
  return BENDING_ARM_K * Math.sqrt(outsideDiameterMm * Math.abs(deltaLmm));
}

// ─── Standard Pipe Diameters (RakPlus Catalogue, pp.06–07) ───────────
export const STANDARD_PIPE_DIAMETERS = [20, 25, 32, 40, 50, 63, 75, 90, 110] as const;
export type StandardPipeDiameter = (typeof STANDARD_PIPE_DIAMETERS)[number];

// ─── Page 20 — Table 01: Maximum Operating Pressure (DIN 8077, SF=1.25) ─
//
// Encoded from Catalogue Page 20 — Table 01.
// Pressure units: bar
// Y-axis:  Operating Temperature (°C)
// X-axis:  Service Life (years)
// Values:  [PN10/SDR11, PN16/SDR7.4, PN20/SDR6, PN25/SDR5] in bar
//
// "Data inside the brackets apply by verification at longer testing
//  periods than 1 year at the 110 °C-test." (Catalogue p.20)

export const TEMP_BANDS = [10, 20, 30, 40, 50, 60, 70, 80, 95] as const;
export type OperatingTempC = (typeof TEMP_BANDS)[number];

export const SERVICE_LIFE_YEARS = [1, 5, 10, 25, 50, 100] as const;
export type ServiceLifeYears = (typeof SERVICE_LIFE_YEARS)[number];

export const PRESSURE_CLASSES = ["PN10", "PN16", "PN20", "PN25"] as const;
export type PressureClass = (typeof PRESSURE_CLASSES)[number];

/**
 * Maximum Operating Pressure matrix indexed by:
 *   [tempC][years] → [PN10, PN16, PN20, PN25] in bar
 *
 * Values transcribed from Catalogue p.20, Table 01.
 * For temperature bands not listed in the original table (e.g. 30, 40,
 * 50, 60 °C at 100 years), the closest lower-band value is used
 * (conservative engineering interpolation).
 *
 * 95 °C row is the SHORT-TERM PEAK row from the catalogue.
 */
export const MOP_TABLE_BAR: Record<
  OperatingTempC,
  Record<ServiceLifeYears, [number, number, number, number]>
> = {
  // 10 °C — extrapolated conservatively from the 20 °C row
  10: {
    1:   [21.01, 33.4, 42.1, 53.0],
    5:   [19.81, 31.5, 39.7, 49.9],
    10:  [18.07, 30.7, 38.6, 48.7],
    25:  [18.02, 28.9, 35.9, 45.2],
    50:  [17.08, 28.2, 35.5, 44.7],
    100: [16.09, 26.8, 33.7, 42.5],
  },
  // 20 °C
  20: {
    1:   [18.00, 28.5, 36.4, 47.0],
    5:   [16.04, 26.1, 32.8, 41.4],
    10:  [15.09, 25.2, 31.7, 39.9],
    25:  [15.04, 24.5, 30.9, 38.9],
    50:  [15.00, 23.9, 30.2, 37.8],
    100: [15.03, 24.2, 30.5, 38.5],
  },
  // 30 °C
  30: {
    1:   [15.00, 24.2, 30.5, 38.5],
    5:   [14.03, 22.7, 28.6, 36.0],
    10:  [13.09, 22.1, 27.8, 35.0],
    25:  [13.04, 21.3, 26.8, 33.8],
    50:  [13.00, 20.7, 26.1, 32.9],
    100: [12.07, 20.1, 25.4, 31.9],
  },
  // 40 °C
  40: {
    1:   [13.00, 20.6, 25.9, 32.6],
    5:   [12.01, 19.2, 24.2, 30.5],
    10:  [11.08, 18.7, 23.5, 29.6],
    25:  [11.03, 18.0, 22.6, 28.5],
    50:  [11.00, 17.4, 21.9, 27.7],
    100: [10.07, 16.9, 21.4, 26.9],
  },
  // 50 °C
  50: {
    1:   [11.00, 17.4, 21.9, 27.6],
    5:   [10.02, 16.2, 20.4, 25.7],
    10:  [9.09, 15.7, 19.8, 25.0],
    25:  [9.05, 15.1, 19.0, 24.0],
    50:  [9.02, 14.7, 18.5, 23.3],
    100: [9.00, 14.4, 18.1, 22.6],
  },
  // 60 °C
  60: {
    1:   [9.02, 14.4, 18.1, 22.6],
    5:   [8.06, 13.6, 17.2, 21.6],
    10:  [8.03, 13.2, 16.6, 21.0],
    25:  [8.00, 12.7, 16.0, 20.1],
    50:  [7.07, 12.3, 15.5, 19.5],
    100: [7.08, 12.3, 15.5, 19.6],
  },
  // 70 °C — continuous operating temperature (the catalogue's hot-water design point)
  70: {
    1:   [7.02, 12.3, 15.5, 19.6],
    5:   [7.00, 11.4, 14.5, 18.1],
    10:  [6.00, 11.1, 14.2, 17.5],
    25:  [5.01, 10.3, 12.8, 16.4],
    50:  [6.05,  9.6, 11.5, 14.5],
    100: [4.06,  9.2, 11.6, 16.4], // conservative extrapolation
  },
  // 80 °C — excursion band
  80: {
    1:   [3.01,  8.1,  9.7,  7.8],
    5:   [4.06,  9.1, 11.5, 14.5],
    10:  [3.09,  7.7,  9.2, 12.2],
    25:  [4.08,  6.2,  7.8,  9.8],
    50:  [5.07,  7.3,  9.7, 12.2],
    100: [3.01,  4.9,  6.2,  7.8],
  },
  // 95 °C — short-term peak (the catalogue's 100 °C-test equivalent)
  95: {
    1:   [(2.06), 8.1, 11.6, 11.6],
    5:   [3.01,   7.8,  9.8, 12.2],
    10:  [4.06,   6.2,  7.8,  9.8],
    25:  [(2.06), 4.9,  6.2,  7.8],
    50:  [3.01,   4.9,  6.2,  7.8],
    100: [(4.1),  4.1,  5.2,  6.6],
  },
};

// ─── Page 24 — Chemical Resistance Chart ─────────────────────────────
//
// Encoded from Catalogue p.24 — selected common industrial reagents
// for the public-facing interactive search. Codes:
//   G = Good / Resistant
//   S = Satisfactory / Limited resistance
//   NS = Not Suitable
//
// Each row: [reagent, 20°C, 60°C, 100°C]  using catalogue codes.
// (100°C = "100°C" temperature column; short-term exposure only.)

export type ChemicalCode = "G" | "S" | "NS" | "-";

export interface ChemicalEntry {
  reagent: string;
  concentration?: string;
  values: Record<20 | 60 | 100, ChemicalCode>;
  category:
    | "Acid"
    | "Base"
    | "Solvent"
    | "Salt"
    | "Hydrocarbon"
    | "Oxidiser"
    | "Other";
}

export const CHEMICAL_RESISTANCE: ChemicalEntry[] = [
  // ACIDS
  { reagent: "Acetic acid",                values: { 20: "G", 60: "G", 100: "-" }, category: "Acid" },
  { reagent: "Acetic anhydride",           values: { 20: "G", 60: "G", 100: "-" }, category: "Acid" },
  { reagent: "Citric acid",                values: { 20: "G", 60: "G", 100: "G"  }, category: "Acid" },
  { reagent: "Chromic acid",               values: { 20: "G", 60: "S", 100: "NS" }, category: "Oxidiser" },
  { reagent: "Hydrochloric acid",          values: { 20: "G", 60: "G", 100: "S"  }, category: "Acid" },
  { reagent: "Nitric acid",                values: { 20: "G", 60: "S", 100: "NS" }, category: "Oxidiser" },
  { reagent: "Sulphuric acid",             values: { 20: "G", 60: "G", 100: "S"  }, category: "Acid" },

  // BASES
  { reagent: "Ammonia (gas)",              values: { 20: "G", 60: "G", 100: "G"  }, category: "Base" },
  { reagent: "Ammonia (saturated aq.)",    values: { 20: "G", 60: "G", 100: "G"  }, category: "Base" },
  { reagent: "Ammonium hydroxide",         values: { 20: "G", 60: "G", 100: "G"  }, category: "Base" },
  { reagent: "Calcium hydroxide",          values: { 20: "G", 60: "G", 100: "G"  }, category: "Base" },
  { reagent: "Potassium hydroxide",        values: { 20: "G", 60: "G", 100: "G"  }, category: "Base" },
  { reagent: "Sodium hydroxide",           values: { 20: "G", 60: "G", 100: "G"  }, category: "Base" },

  // SALTS
  { reagent: "Ammonium chloride",          values: { 20: "G", 60: "G", 100: "G"  }, category: "Salt" },
  { reagent: "Ammonium nitrate",           values: { 20: "G", 60: "G", 100: "G"  }, category: "Salt" },
  { reagent: "Ammonium sulphate",          values: { 20: "G", 60: "G", 100: "G"  }, category: "Salt" },
  { reagent: "Barium carbonate",           values: { 20: "G", 60: "G", 100: "G"  }, category: "Salt" },
  { reagent: "Calcium carbonate",          values: { 20: "G", 60: "G", 100: "G"  }, category: "Salt" },
  { reagent: "Calcium chloride",           values: { 20: "G", 60: "G", 100: "G"  }, category: "Salt" },
  { reagent: "Calcium nitrate",            values: { 20: "G", 60: "G", 100: "G"  }, category: "Salt" },
  { reagent: "Cupric chloride",            values: { 20: "G", 60: "G", 100: "G"  }, category: "Salt" },
  { reagent: "Cupric nitrate",             values: { 20: "G", 60: "G", 100: "G"  }, category: "Salt" },
  { reagent: "Cupric sulphate",            values: { 20: "G", 60: "G", 100: "G"  }, category: "Salt" },
  { reagent: "Sodium chloride (brine)",    values: { 20: "G", 60: "G", 100: "G"  }, category: "Salt" },
  { reagent: "Sodium bicarbonate",         values: { 20: "G", 60: "G", 100: "G"  }, category: "Salt" },

  // SOLVENTS
  { reagent: "Acetone",                    values: { 20: "G", 60: "G", 100: "-"  }, category: "Solvent" },
  { reagent: "Aniline",                    values: { 20: "G", 60: "S", 100: "-"  }, category: "Solvent" },
  { reagent: "Benzyl alcohol",             values: { 20: "G", 60: "G", 100: "-"  }, category: "Solvent" },
  { reagent: "Butanol",                    values: { 20: "G", 60: "G", 100: "-"  }, category: "Solvent" },
  { reagent: "Carbon tetrachloride",       values: { 20: "G", 60: "NS",100: "NS" }, category: "Solvent" },
  { reagent: "Cyclohexane",                values: { 20: "G", 60: "G", 100: "-"  }, category: "Solvent" },
  { reagent: "Diethyl ether",              values: { 20: "G", 60: "G", 100: "-"  }, category: "Solvent" },
  { reagent: "Ethanol (ethyl alcohol)",    values: { 20: "G", 60: "G", 100: "-"  }, category: "Solvent" },
  { reagent: "Ethylene glycol",            values: { 20: "G", 60: "G", 100: "G"  }, category: "Solvent" },
  { reagent: "Formaldehyde",               values: { 20: "G", 60: "G", 100: "-"  }, category: "Solvent" },
  { reagent: "Methanol",                   values: { 20: "G", 60: "G", 100: "-"  }, category: "Solvent" },
  { reagent: "Phenol",                     values: { 20: "G", 60: "G", 100: "-"  }, category: "Solvent" },
  { reagent: "Toluene",                    values: { 20: "S", 60: "NS",100: "NS" }, category: "Solvent" },

  // HYDROCARBONS / OILS
  { reagent: "Almond oil",                 values: { 20: "G", 60: "G", 100: "-"  }, category: "Hydrocarbon" },
  { reagent: "Castor oil",                 values: { 20: "G", 60: "G", 100: "-"  }, category: "Hydrocarbon" },
  { reagent: "Coconut oil",                values: { 20: "G", 60: "G", 100: "-"  }, category: "Hydrocarbon" },
  { reagent: "Corn oil",                   values: { 20: "G", 60: "G", 100: "-"  }, category: "Hydrocarbon" },
  { reagent: "Cottonseed oil",             values: { 20: "G", 60: "G", 100: "-"  }, category: "Hydrocarbon" },
  { reagent: "Diesel fuel",                values: { 20: "S", 60: "NS",100: "NS" }, category: "Hydrocarbon" },
  { reagent: "Engine oil (mineral)",       values: { 20: "G", 60: "S", 100: "NS" }, category: "Hydrocarbon" },
  { reagent: "Kerosene",                   values: { 20: "S", 60: "NS",100: "NS" }, category: "Hydrocarbon" },

  // OTHER
  { reagent: "Apple juice",                values: { 20: "G", 60: "G", 100: "G"  }, category: "Other" },
  { reagent: "Borax (sodium borate)",      values: { 20: "G", 60: "G", 100: "G"  }, category: "Other" },
  { reagent: "Boric acid",                 values: { 20: "G", 60: "G", 100: "G"  }, category: "Other" },
  { reagent: "Dextrose (glucose)",         values: { 20: "G", 60: "G", 100: "G"  }, category: "Other" },
  { reagent: "Formalin (10% aq.)",         values: { 20: "G", 60: "G", 100: "-"  }, category: "Other" },
  { reagent: "Glycerine",                  values: { 20: "G", 60: "G", 100: "G"  }, category: "Other" },
  { reagent: "Hydrogen peroxide (30%)",   values: { 20: "G", 60: "S", 100: "NS" }, category: "Oxidiser" },
  { reagent: "Sea water",                  values: { 20: "G", 60: "G", 100: "G"  }, category: "Other" },
  { reagent: "Urea",                       values: { 20: "G", 60: "G", 100: "G"  }, category: "Other" },
];

// ─── Page 06 — PN10 Pipe Dimensional Table (RakPlus Catalogue) ───────
export interface PipeDimensionRow {
  partNo: string;
  diameterMm: number;
  wallMm: number;
  innerMm: number;
  /**
   * Water content in litres per metre.
   *
   * ONLY the SDR5/PN25 "Series 2" table on Catalogue p.07 publishes this
   * column. The SDR11/PN10, SDR7.4/PN16 and SDR6/PN20 tables on p.06 carry
   * PART / DIMENSIONS / WALL THICKNESS / INNER DIAMETER / PACKING UNIT /
   * Kg.Mtr. and NO water-content column, so those rows are `null`.
   */
  waterContentLPerM: number | null;
  weightKgPerM: number;
  packingMtrs: number;
}

export const PN10_PIPE_TABLE: PipeDimensionRow[] = [
  { partNo: "RP1020",  diameterMm:  20, wallMm: 1.9, innerMm: 16.0, waterContentLPerM: null, weightKgPerM: 0.107, packingMtrs: 100 },
  { partNo: "RP1025",  diameterMm:  25, wallMm: 2.3, innerMm: 20.4, waterContentLPerM: null, weightKgPerM: 0.164, packingMtrs: 100 },
  { partNo: "RP1032",  diameterMm:  32, wallMm: 2.9, innerMm: 26.2, waterContentLPerM: null, weightKgPerM: 0.261, packingMtrs: 40  },
  { partNo: "RP1040",  diameterMm:  40, wallMm: 3.7, innerMm: 32.6, waterContentLPerM: null, weightKgPerM: 0.412, packingMtrs: 40  },
  { partNo: "RP1050",  diameterMm:  50, wallMm: 4.6, innerMm: 40.8, waterContentLPerM: null, weightKgPerM: 0.638, packingMtrs: 20  },
  { partNo: "RP1063",  diameterMm:  63, wallMm: 5.8, innerMm: 51.4, waterContentLPerM: null, weightKgPerM: 1.010, packingMtrs: 20  },
  { partNo: "RP1075",  diameterMm:  75, wallMm: 6.8, innerMm: 61.4, waterContentLPerM: null, weightKgPerM: 1.410, packingMtrs: 16  },
  { partNo: "RP1090",  diameterMm:  90, wallMm: 8.2, innerMm: 73.6, waterContentLPerM: null, weightKgPerM: 2.030, packingMtrs: 12  },
  { partNo: "RP10110", diameterMm: 110, wallMm: 10.0,innerMm: 90.0, waterContentLPerM: null, weightKgPerM: 3.010, packingMtrs:  8  },
];

// ─── Page 06 — PN16 Pipe Dimensional Table ──────────────────────────
export const PN16_PIPE_TABLE: PipeDimensionRow[] = [
  { partNo: "RP1620",  diameterMm:  20, wallMm: 2.8, innerMm: 14.4, waterContentLPerM: null, weightKgPerM: 0.147, packingMtrs: 100 },
  { partNo: "RP1625",  diameterMm:  25, wallMm: 3.5, innerMm: 18.0, waterContentLPerM: null, weightKgPerM: 0.229, packingMtrs: 100 },
  { partNo: "RP1632",  diameterMm:  32, wallMm: 4.4, innerMm: 23.2, waterContentLPerM: null, weightKgPerM: 0.370, packingMtrs: 40  },
  { partNo: "RP1640",  diameterMm:  40, wallMm: 5.5, innerMm: 29.0, waterContentLPerM: null, weightKgPerM: 0.578, packingMtrs: 40  },
  { partNo: "RP1650",  diameterMm:  50, wallMm: 6.9, innerMm: 36.2, waterContentLPerM: null, weightKgPerM: 0.906, packingMtrs: 20  },
  { partNo: "RP1663",  diameterMm:  63, wallMm: 8.6, innerMm: 45.8, waterContentLPerM: null, weightKgPerM: 1.426, packingMtrs: 20  },
  { partNo: "RP1675",  diameterMm:  75, wallMm: 10.3,innerMm: 54.4, waterContentLPerM: null, weightKgPerM: 2.031, packingMtrs: 16  },
  { partNo: "RP1690",  diameterMm:  90, wallMm: 12.3,innerMm: 65.4, waterContentLPerM: null, weightKgPerM: 2.880, packingMtrs: 12  },
  { partNo: "RP16110", diameterMm: 110, wallMm: 15.1,innerMm: 79.8, waterContentLPerM: null, weightKgPerM: 4.295, packingMtrs:  8  },
];

// ─── Page 06 — PN20 Pipe Dimensional Table ──────────────────────────
export const PN20_PIPE_TABLE: PipeDimensionRow[] = [
  { partNo: "RP2020",  diameterMm:  20, wallMm: 3.4, innerMm: 13.2, waterContentLPerM: null, weightKgPerM: 0.172, packingMtrs: 100 },
  { partNo: "RP2025",  diameterMm:  25, wallMm: 4.2, innerMm: 16.6, waterContentLPerM: null, weightKgPerM: 0.266, packingMtrs: 100 },
  { partNo: "RP2032",  diameterMm:  32, wallMm: 5.4, innerMm: 21.2, waterContentLPerM: null, weightKgPerM: 0.432, packingMtrs: 40  },
  { partNo: "RP2040",  diameterMm:  40, wallMm: 6.7, innerMm: 26.6, waterContentLPerM: null, weightKgPerM: 0.670, packingMtrs: 40  },
  { partNo: "RP2050",  diameterMm:  50, wallMm: 8.3, innerMm: 33.4, waterContentLPerM: null, weightKgPerM: 1.040, packingMtrs: 20  },
  { partNo: "RP2063",  diameterMm:  63, wallMm: 10.5,innerMm: 42.0, waterContentLPerM: null, weightKgPerM: 1.645, packingMtrs: 20  },
  { partNo: "RP2075",  diameterMm:  75, wallMm: 12.5,innerMm: 50.0, waterContentLPerM: null, weightKgPerM: 2.340, packingMtrs: 16  },
  { partNo: "RP2090",  diameterMm:  90, wallMm: 15.0,innerMm: 60.0, waterContentLPerM: null, weightKgPerM: 3.360, packingMtrs: 12  },
  { partNo: "RP20110", diameterMm: 110, wallMm: 18.3,innerMm: 73.4, waterContentLPerM: null, weightKgPerM: 5.008, packingMtrs:  8  },
];

// ─── Page 07 — PN25 Pipe Dimensional Table (Series 2) ───────────────
export const PN25_PIPE_TABLE: PipeDimensionRow[] = [
  { partNo: "RP2520",  diameterMm:  20, wallMm: 4.1, innerMm: 11.8, waterContentLPerM: 0.111, weightKgPerM: 0.198, packingMtrs: 100 },
  { partNo: "RP2525",  diameterMm:  25, wallMm: 5.1, innerMm: 14.8, waterContentLPerM: 0.178, weightKgPerM: 0.307, packingMtrs: 100 },
  { partNo: "RP2532",  diameterMm:  32, wallMm: 6.5, innerMm: 19.0, waterContentLPerM: 0.291, weightKgPerM: 0.498, packingMtrs: 40  },
  { partNo: "RP2540",  diameterMm:  40, wallMm: 8.1, innerMm: 23.8, waterContentLPerM: 0.461, weightKgPerM: 0.775, packingMtrs: 40  },
  { partNo: "RP2550",  diameterMm:  50, wallMm: 10.1,innerMm: 29.8, waterContentLPerM: 0.703, weightKgPerM: 1.210, packingMtrs: 20  },
  { partNo: "RP2563",  diameterMm:  63, wallMm: 12.7,innerMm: 37.6, waterContentLPerM: 1.137, weightKgPerM: 1.910, packingMtrs: 20  },
  { partNo: "RP2575",  diameterMm:  75, wallMm: 15.1,innerMm: 44.8, waterContentLPerM: 1.619, weightKgPerM: 2.701, packingMtrs: 16  },
  { partNo: "RP2590",  diameterMm:  90, wallMm: 18.1,innerMm: 53.8, waterContentLPerM: 2.336, weightKgPerM: 3.880, packingMtrs: 12  },
  { partNo: "RP25110", diameterMm: 110, wallMm: 22.1,innerMm: 65.8, waterContentLPerM: 2.742, weightKgPerM: 5.780, packingMtrs:  8  },
];

// Map pressure class → dimensional table (RakPlus Catalogue pp.06–07)
export const PIPE_TABLES_BY_CLASS = {
  PN10: PN10_PIPE_TABLE,
  PN16: PN16_PIPE_TABLE,
  PN20: PN20_PIPE_TABLE,
  PN25: PN25_PIPE_TABLE,
} as const;

// SDR labels per pressure class
export const SDR_BY_CLASS: Record<keyof typeof PIPE_TABLES_BY_CLASS, string> = {
  PN10: "SDR 11",
  PN16: "SDR 7.4",
  PN20: "SDR 6",
  PN25: "SDR 5",
};

// ─── Pipe Series Metadata (drives the B2B pipe finder UI) ─────────────
//
// `sdrFolder` is the EXACT folder token used by the shipped GLB assets at
// /3D Models/RAKPLUS {COLOR} PIPES/{sdrFolder}/{sdr}-{size}-{COLOR}.glb
// (verified: all 8 folders ship all 9 sizes = 72 models).
export type PipeColorLine = "green" | "yellow";

export interface PipeSeriesMeta {
  slug: string;
  /** e.g. "SDR6" — used verbatim in the GLB folder + file names */
  sdrFolder: string;
  /** e.g. "SDR 6" — human / catalogue typography */
  sdrLabel: string;
  pn: keyof typeof PIPE_TABLES_BY_CLASS;
  colorLine: PipeColorLine;
  /** Canonical product title (matches productRegistry) */
  title: string;
  /** Short colour-line display token — "Green" | "Yellow" */
  shortColor: string;
}

const SDR_FOLDER: Record<keyof typeof PIPE_TABLES_BY_CLASS, string> = {
  PN10: "SDR11",
  PN16: "SDR7.4",
  PN20: "SDR6",
  PN25: "SDR5",
};

/** Builds the fully-resolved, URL-encoded GLB path for one exact pipe size. */
export function buildPipeModelPath(
  meta: Pick<PipeSeriesMeta, "sdrFolder" | "colorLine">,
  sizeMm: number
): string {
  const color = meta.colorLine === "yellow" ? "YELLOW" : "GREEN";
  const folder = `/3D Models/RAKPLUS ${color} PIPES/${meta.sdrFolder} ${color}`;
  const file = `${meta.sdrFolder}-${sizeMm}-${color}.glb`;
  return encodeURI(`${folder}/${file}`);
}

/** All 8 real pipe series (4 pressure classes × 2 colour lines). */
export const PIPE_SERIES: PipeSeriesMeta[] = (
  ["PN10", "PN16", "PN20", "PN25"] as const
).flatMap((pn) =>
  (["green", "yellow"] as const).map((colorLine) => ({
    slug: `ppr-${colorLine}-${pn.toLowerCase()}`,
    sdrFolder: SDR_FOLDER[pn],
    sdrLabel: SDR_BY_CLASS[pn],
    pn,
    colorLine,
    title: `RAKPLUS PP-R ${colorLine === "green" ? "Green" : "Yellow"} Pipe ${SDR_BY_CLASS[pn]}/${pn}`,
    shortColor: colorLine === "green" ? "Green" : "Yellow",
  }))
);

/**
 * Every size-specific 3D model for one series, shaped exactly like the
 * `PipeSize[]` the ProductViewerModal / TableRowViewer pair expects.
 */
export function pipeSizesFor(series: PipeSeriesMeta) {
  return PIPE_TABLES_BY_CLASS[series.pn].map((r) => ({
    label: `${r.diameterMm}mm`,
    modelPath: buildPipeModelPath(series, r.diameterMm),
  }));
}

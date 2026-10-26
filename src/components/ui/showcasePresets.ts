/**
 * showcasePresets — Drop-in props for the 10 light-theme FuturisticProductShowcaseCards.
 *
 * Each preset mirrors a section of the v4 IMAGE_GENERATION_MANIFEST.md:
 * the SAME badges / leader lines / info-card content that the AI image
 * generation will paint INTO the rendered image are also rendered LIVE
 * by the UI as native HTML/CSS glassmorphic overlays.
 *
 * So even if the images haven't been re-generated yet, the futuristic
 * informative engineering story is already told in the UI itself.
 *
 * To use: spread the preset onto <FuturisticProductShowcaseCard />, e.g.
 *   import { SHOWCASE_PRESETS } from "@/components/ui/showcasePresets";
 *   <FuturisticProductShowcaseCard {...SHOWCASE_PRESETS.homeHero} />
 *
 * NOTE: The image files at public/images/*.png referenced in each
 * preset are placeholders until the AI image generation agent renders
 * the v4 manifest. They are safe to ship now — the overlay layer is the
 * primary source of truth, the image is the secondary product hero.
 */

import type {
  FuturisticProductShowcaseCardProps,
  ShowcaseBadge,
} from "./FuturisticProductShowcaseCard";

/* ─── 1. HOME HERO ──────────────────────────────────────────────────── */
export const SHOWCASE_PRESETS = {
  homeHero: {
    src: "/images/home-hero-pipe-system.png",
    alt:
      "RakPlus 63x10,5mm SDR6 / PN20 horizontal green PP-R pipe on a futuristic white architectural telemetry display with floating glassmorphic DIN/PN20/WRAS spec cards.",
    width: 2048,
    height: 2048,
    variant: "hero" as const,
    kicker: "Hero · WRAS Approved PP-R · UAE",
    title: "Premium Pipes. Unbreakable Foundations.",
    caption:
      "RakPlus® — German Standard DIN 8077/8078 · 50-Year Manufacturer Guarantee",
    badges: [
      {
        label: "DIN 8077/78",
        value: "✓",
        position: "top-left",
        accent: "emerald" as const,
      },
      {
        label: "Pressure Class",
        value: "PN20",
        unit: "bar",
        position: "top-right",
        accent: "emerald" as const,
      },
      {
        label: "WRAS",
        value: "✓",
        position: "bottom-left",
        accent: "sapphire" as const,
      },
      {
        label: "Service Life",
        value: "50",
        unit: "years",
        position: "bottom-right",
        accent: "brass" as const,
      },
    ] satisfies ShowcaseBadge[],
    leaders: [
      {
        anchor: { x: 50, y: 50 },
        endpoint: { x: 50, y: 8 },
        accent: "emerald",
      },
      {
        anchor: { x: 50, y: 50 },
        endpoint: { x: 50, y: 92 },
        accent: "brass",
      },
    ],
    infoCard: {
      position: "top-bar",
      overline: "63 × 10,5 mm · SDR6 / PN20",
      headline: "WRAS Approved PP-R Pipe System",
      body: "German Standard DIN 8077/78 · ISO 9001:2015 · 50-Year Guarantee",
      accent: "emerald",
    },
  } satisfies FuturisticProductShowcaseCardProps,

  /* ─── 2. HOME BENTO — 100% BRASS TRANSITION ──────────────────────── */
  homeBentoBrass: {
    src: "/images/home-bento-brass-transition.png",
    alt:
      "RakPlus Ø32x1\" PP-R TYP3 green transition female elbow with golden hex brass insert on a white architectural drafting surface with silver isometric CAD grid and golden 100% BRASS callout card.",
    width: 2048,
    height: 2048,
    variant: "bento" as const,
    kicker: "100% Brass · DIN 8076",
    title: "100% Brass Insert Transitions",
    caption:
      "Solid Brass · Zero-Leak Torque Seal · Never Plated · Never Hybrid",
    badges: [
      {
        label: "Brass Grade",
        value: "SOLID",
        position: "top-left",
        accent: "brass" as const,
      },
      {
        label: "Thread",
        value: "Ø32×1\"",
        position: "top-right",
        accent: "emerald" as const,
      },
      {
        label: "DIN 8076",
        value: "✓",
        position: "bottom-left",
        accent: "emerald" as const,
      },
      {
        label: "Plating",
        value: "NONE",
        position: "bottom-right",
        accent: "brass" as const,
      },
    ] satisfies ShowcaseBadge[],
    leaders: [
      {
        anchor: { x: 35, y: 45 },
        endpoint: { x: 12, y: 18 },
        accent: "brass",
      },
    ],
    infoCard: {
      position: "bottom-bar",
      overline: "100% SOLID BRASS INSERT",
      headline: "Zero-Leak Torque Seal",
      body: "Precision-machined solid brass insert — never plated, never hybrid. Engineered for thermal-cycling durability and zero-galvanic compatibility with PP-R.",
      accent: "brass",
    },
  } satisfies FuturisticProductShowcaseCardProps,

  /* ─── 3. INNOVATION S1 — DIN PRECISION SOCKETS ──────────────────── */
  innovationDinPrecision: {
    src: "/images/innovation-din-precision-sockets.png",
    alt:
      "RakPlus green socket pair on a bright white optical-grade ceramic inspection stage with emerald laser measurement rings and dimensional tolerance telemetry card.",
    width: 2048,
    height: 2048,
    variant: "bento" as const,
    kicker: "Innovation · DIN 8077/8078",
    title: "Melt-Flow Precision · Optical Metrology",
    caption:
      "SDR11 → SDR5 · 20mm → 110mm · ISO 1183 Density 905 kg/m³",
    badges: [
      {
        label: "Density (ISO 1183)",
        value: "905",
        unit: "kg/m³",
        position: "top-left",
        accent: "emerald" as const,
      },
      {
        label: "Melt Flow (ISO 1133)",
        value: "≤0.3",
        unit: "g/10min",
        position: "top-right",
        accent: "emerald" as const,
      },
      {
        label: "Diameter",
        value: "Ø32",
        unit: "mm",
        position: "bottom-left",
        accent: "sapphire" as const,
      },
      {
        label: "Series",
        value: "SDR6",
        position: "bottom-right",
        accent: "emerald" as const,
      },
    ] satisfies ShowcaseBadge[],
    leaders: [
      {
        anchor: { x: 28, y: 50 },
        endpoint: { x: 12, y: 22 },
        accent: "emerald",
      },
      {
        anchor: { x: 72, y: 50 },
        endpoint: { x: 88, y: 22 },
        accent: "emerald",
      },
    ],
    infoCard: {
      position: "top-bar",
      overline: "OPTICAL LASER METROLOGY",
      headline: "Micron-Level DIN Dimensional Tolerance",
      body: "Each socket is verified against German DIN 8077/78 wall-thickness tolerance on an optical-grade ceramic inspection stage with fine emerald laser measurement rings.",
      accent: "emerald",
    },
  } satisfies FuturisticProductShowcaseCardProps,

  /* ─── 4. INNOVATION S2 — THERMAL RESILIENCE ────────────────────── */
  innovationThermal: {
    src: "/images/innovation-thermal-resilience.png",
    alt:
      "RakPlus horizontal green PP-R pipe in a bright white climate test chamber with icy-blue and warm amber isotherm glassmorphic spec cards above the pipe.",
    width: 2048,
    height: 2048,
    variant: "hero" as const,
    kicker: "Innovation · Thermal Stability",
    title: "0°C to 100°C · 0.24 W/m·K Insulation",
    caption:
      "Continuous 70°C · Peak 100°C · DIN 52612 Thermal Conductivity",
    badges: [
      {
        label: "Cold Limit",
        value: "0",
        unit: "°C",
        position: "top-left",
        accent: "sapphire" as const,
      },
      {
        label: "Continuous",
        value: "70",
        unit: "°C",
        position: "top-right",
        accent: "amber" as const,
      },
      {
        label: "Peak",
        value: "100",
        unit: "°C",
        position: "bottom-left",
        accent: "amber" as const,
      },
      {
        label: "Thermal Cond.",
        value: "0.24",
        unit: "W/m·K",
        position: "bottom-right",
        accent: "emerald" as const,
      },
    ] satisfies ShowcaseBadge[],
    leaders: [
      {
        anchor: { x: 28, y: 50 },
        endpoint: { x: 28, y: 12 },
        accent: "sapphire",
      },
      {
        anchor: { x: 72, y: 50 },
        endpoint: { x: 72, y: 12 },
        accent: "amber",
      },
    ],
    infoCard: {
      position: "bottom-bar",
      overline: "DUAL-ZONE THERMAL GRADIENT",
      headline: "Engineered for the GCC Climate",
      body: "0.24 W/m·K insulation coefficient — the polymer does not frost, does not melt, does not scale across the entire thermal operating envelope.",
      accent: "emerald",
    },
  } satisfies FuturisticProductShowcaseCardProps,

  /* ─── 5. INNOVATION S3 — DVS 2207 ELBOW ───────────────────────── */
  innovationDvsElbow: {
    src: "/images/innovation-dvs2207-elbow-joint.png",
    alt:
      "RakPlus all-green 90° elbow on a bright alabaster architectural pedestal with cyan fluid-dynamics flow arrows and a DVS 2207 fusion zone spec card.",
    width: 2048,
    height: 2048,
    variant: "bento" as const,
    kicker: "Innovation · DVS 2207",
    title: "Homogeneous Socket Fusion",
    caption:
      "260°C ± 10°C · Charpy No Break · Indestructible Molecular Bond",
    badges: [
      {
        label: "Weld Temp",
        value: "260",
        unit: "°C ±10",
        position: "top-left",
        accent: "emerald" as const,
      },
      {
        label: "Charpy (ISO 179/1eU)",
        value: "NB",
        position: "top-right",
        accent: "emerald" as const,
      },
      {
        label: "DVS 2207",
        value: "✓",
        position: "bottom-left",
        accent: "emerald" as const,
      },
      {
        label: "Bend Angle",
        value: "90",
        unit: "°",
        position: "bottom-right",
        accent: "sapphire" as const,
      },
    ] satisfies ShowcaseBadge[],
    leaders: [
      {
        anchor: { x: 50, y: 65 },
        endpoint: { x: 88, y: 80 },
        accent: "emerald",
      },
    ],
    infoCard: {
      position: "top-bar",
      overline: "DVS 2207 FUSION ZONE",
      headline: "Homogeneous Molecular Bond",
      body: "DVS 2207 socket fusion parameters are calibrated at 260°C (±10°C), producing a seamless molecular bond that eliminates joint failure in high-pressure PN20 service.",
      accent: "emerald",
    },
  } satisfies FuturisticProductShowcaseCardProps,

  /* ─── 6. SUSTAINABILITY S1 — WRAS WATER PURITY ───────────────── */
  sustainabilityWras: {
    src: "/images/sustainability-wras-water-purity.png",
    alt:
      "Two green RakPlus sockets on a bright sunlit white water-testing laboratory surface with crystal-clear turquoise-tinted pure water ripples and a WRAS Approved Material shield badge.",
    width: 2048,
    height: 2048,
    variant: "bento" as const,
    kicker: "Sustainability · WRAS Approved",
    title: "100% Hygienic Potable Water",
    caption:
      "Non-Toxic · Odour-Free · Zero Heavy Metals · UK WRAS Certified",
    badges: [
      {
        label: "WRAS",
        value: "✓",
        position: "top-left",
        accent: "sapphire" as const,
      },
      {
        label: "Heavy Metals",
        value: "0",
        unit: "ppm",
        position: "top-right",
        accent: "emerald" as const,
      },
      {
        label: "Potable",
        value: "100",
        unit: "%",
        position: "bottom-left",
        accent: "emerald" as const,
      },
      {
        label: "Toxicity",
        value: "ZERO",
        position: "bottom-right",
        accent: "emerald" as const,
      },
    ] satisfies ShowcaseBadge[],
    leaders: [
      {
        anchor: { x: 50, y: 78 },
        endpoint: { x: 50, y: 96 },
        accent: "sapphire",
      },
    ],
    infoCard: {
      position: "top-bar",
      overline: "MOLECULAR HYGIENE",
      headline: "WRAS Approved Potable Water",
      body: "Independent UK Water Regulations Advisory Scheme approval for every RakPlus pipe and brass-insert fitting. Zero heavy-metal leaching. Zero biofilm. Zero odour.",
      accent: "sapphire",
    },
  } satisfies FuturisticProductShowcaseCardProps,

  /* ─── 7. SUSTAINABILITY S2 — 50YR CORROSION-FREE ─────────────── */
  sustainabilityFiftyYear: {
    src: "/images/sustainability-50yr-corrosion-free.png",
    alt:
      "RakPlus green End Cap and Reducer Socket on a clean white marble and brushed-steel laboratory platform with a frosted-glass 50-year zero-corrosion data dashboard.",
    width: 2048,
    height: 2048,
    variant: "bento" as const,
    kicker: "Sustainability · 50-Year Life",
    title: "Zero Corrosion · 50 Years Guaranteed",
    caption:
      "20°C–100°C Resistant · pH Stable · UAE Coastal & Industrial",
    badges: [
      {
        label: "Service Life",
        value: "50",
        unit: "years",
        position: "top-left",
        accent: "brass" as const,
      },
      {
        label: "Corrosion",
        value: "0",
        unit: "%",
        position: "top-right",
        accent: "emerald" as const,
      },
      {
        label: "vs. Metal",
        value: "—",
        position: "bottom-left",
        accent: "brass" as const,
      },
      {
        label: "pH Range",
        value: "1–14",
        position: "bottom-right",
        accent: "emerald" as const,
      },
    ] satisfies ShowcaseBadge[],
    leaders: [
      {
        anchor: { x: 35, y: 55 },
        endpoint: { x: 12, y: 78 },
        accent: "emerald",
      },
      {
        anchor: { x: 65, y: 55 },
        endpoint: { x: 88, y: 78 },
        accent: "emerald",
      },
    ],
    infoCard: {
      position: "bottom-bar",
      overline: "CHEMICAL RESISTANCE MATRIX",
      headline: "PP-R vs. Metal — The 50-Year Verdict",
      body: "PP-R delivers 0% corrosion across 50 years. Metal delivers oxidation, scaling, and biofilm. Same operating envelope — opposite outcome.",
      accent: "emerald",
    },
  } satisfies FuturisticProductShowcaseCardProps,

  /* ─── 8. SUSTAINABILITY S3 — ACOUSTIC CLAMP ──────────────────── */
  sustainabilityAcoustic: {
    src: "/images/sustainability-acoustic-clamp-system.png",
    alt:
      "RakPlus Ø32/34 green pipe bracket clamp on a bright white architectural acoustic-ribbed panel with emerald sound-wave frequency bars flattening into silence on a glass HUD card.",
    width: 2048,
    height: 2048,
    variant: "bento" as const,
    kicker: "Sustainability · Acoustic Damping",
    title: "Vibration Absorption · High-Rise Silence",
    caption:
      "Catalogue p.04 · Sound & Vibration Damped · Silent Riser Systems",
    badges: [
      {
        label: "Clamp Size",
        value: "Ø32/34",
        position: "top-left",
        accent: "emerald" as const,
      },
      {
        label: "Noise Floor",
        value: "≤25",
        unit: "dB",
        position: "top-right",
        accent: "emerald" as const,
      },
      {
        label: "Damping",
        value: "ELASTIC",
        position: "bottom-left",
        accent: "emerald" as const,
      },
      {
        label: "Use Case",
        value: "RISER",
        position: "bottom-right",
        accent: "brass" as const,
      },
    ] satisfies ShowcaseBadge[],
    leaders: [
      {
        anchor: { x: 50, y: 60 },
        endpoint: { x: 88, y: 22 },
        accent: "emerald",
      },
    ],
    infoCard: {
      position: "top-bar",
      overline: "ACOUSTIC & VIBRATION DAMPING",
      headline: "High-Rise Riser Silence",
      body: "Damped vibrations and sounds are absorbed, resulting in noise reduction — the catalogue-verified performance of the RPBT pipe clamp system.",
      accent: "emerald",
    },
  } satisfies FuturisticProductShowcaseCardProps,

  /* ─── 9. ABOUT — RAKPLUS UAE MANUFACTURING ───────────────── */
  aboutRakplusUae: {
    src: "/images/about-aquasmart-uae-manufacturing.png",
    alt:
      "Horizontal green RakPlus PP-R pipe on a brushed silver CNC inspection cradle in a bright spotless white German-standard QA/QC laboratory with floating ISO 9001/14001 certification cards.",
    width: 2048,
    height: 2048,
    variant: "hero" as const,
    kicker: "About · Made in UAE",
    title: "RakPlus® Rohrsysteme UAE",
    caption:
      "Umm Al Quwain · ISO 9001:2015 · ISO 14001:2015 · In-House QA/QC",
    badges: [
      {
        label: "ISO 9001:2015",
        value: "✓",
        position: "top-left",
        accent: "emerald" as const,
      },
      {
        label: "ISO 14001:2015",
        value: "✓",
        position: "top-right",
        accent: "emerald" as const,
      },
      {
        label: "Made In",
        value: "UAE",
        position: "bottom-left",
        accent: "brass" as const,
      },
      {
        label: "Plant",
        value: "UAQ",
        position: "bottom-right",
        accent: "brass" as const,
      },
    ] satisfies ShowcaseBadge[],
    leaders: [
      {
        anchor: { x: 50, y: 50 },
        endpoint: { x: 50, y: 10 },
        accent: "emerald",
      },
      {
        anchor: { x: 50, y: 50 },
        endpoint: { x: 50, y: 90 },
        accent: "brass",
      },
    ],
    infoCard: {
      position: "bottom-bar",
      overline: "RAKPLUS® UAE · UM AL QUWAIN",
      headline: "In-House QA/QC Laboratory",
      body: "Brushed-silver CNC inspection cradle in a spotless white German-standard QA/QC laboratory — every pipe measured, every fitting tested before it leaves the plant.",
      accent: "emerald",
    },
  } satisfies FuturisticProductShowcaseCardProps,

  /* ─── 10. PRODUCTS — COMPLETE SYSTEM SHOWCASE ──────────────── */
  productsSystemShowcase: {
    src: "/images/products-complete-system-showcase.png",
    alt:
      "RakPlus brass transition elbow, all-green 90° elbow, reducer socket, and pipe clamp on a bright white architectural engineering board with grey millimeter grid lines and CAD callout labels for each fitting family.",
    width: 2048,
    height: 2048,
    variant: "knolling" as const,
    kicker: "Products · 29-Family System",
    title: "Complete DIN 8077/8078 Pipe & Fitting System",
    caption:
      "SDR11 – SDR5 · Ø20mm – Ø110mm · RPFSH · RPE90 · RPRS · RPBT",
    badges: [
      {
        label: "Pressure Range",
        value: "PN10–PN25",
        position: "top-left",
        accent: "emerald" as const,
      },
      {
        label: "Diameters",
        value: "20–110",
        unit: "mm",
        position: "top-right",
        accent: "emerald" as const,
      },
      {
        label: "Families",
        value: "29",
        position: "bottom-left",
        accent: "brass" as const,
      },
      {
        label: "System",
        value: "DIN",
        position: "bottom-right",
        accent: "emerald" as const,
      },
    ] satisfies ShowcaseBadge[],
    leaders: [
      {
        anchor: { x: 20, y: 55 },
        endpoint: { x: 20, y: 20 },
        accent: "brass",
      },
      {
        anchor: { x: 40, y: 55 },
        endpoint: { x: 40, y: 20 },
        accent: "emerald",
      },
      {
        anchor: { x: 60, y: 55 },
        endpoint: { x: 60, y: 20 },
        accent: "emerald",
      },
      {
        anchor: { x: 80, y: 55 },
        endpoint: { x: 80, y: 20 },
        accent: "brass",
      },
    ],
    infoCard: {
      position: "top-bar",
      overline: "RPFSH · RPE90 · RPRS · RPBT",
      headline: "The Complete 29-Family System",
      body: "Unified polymer and brass piping system for residential towers, villas, and industrial plants. SDR11 → SDR5. Ø20mm → Ø110mm.",
      accent: "emerald",
    },
  } satisfies FuturisticProductShowcaseCardProps,
} as const;

export type ShowcasePresetKey = keyof typeof SHOWCASE_PRESETS;

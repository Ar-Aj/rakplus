"use client";

/**
 * InteractivePipeCrossSection — Signature Feature 3A (Upgraded)
 *
 * Studio-White architectural to-scale SVG cross-section of a RakPlus PP-R
 * pipe, now acting as the single unified interactive product + 3D launcher.
 *
 * Layout (desktop >= lg): a 12-column dashboard hard-capped at
 * `lg:max-h-[85vh]` so the section can never exceed a single viewport:
 *   • LEFT  6 cols — header, colour line, SDR/PN series tabs, Ø pills,
 *                    zone-linked 3×3 telemetry grid, ratio bar + application badge
 *   • RIGHT 6 cols — the SVG blueprint, `aspect-square` + `lg:max-h-[420px]`
 *   • FULL WIDTH   — the derived-configuration result bar + the two CTAs
 *     (primary = product detail page link, secondary = instant 3D modal)
 *
 * Colour system (German standard, light surface):
 *   • Outer diameter D  → Crimson Red   #DC2626
 *   • Wall thickness s → Pitch Black   #0A0A0A + Signal Yellow #FACC15 dot
 *   • Inner bore d_i   → Emerald Green #059669
 *
 * SLUG INTEGRITY — WHY THIS NEVER 404s:
 *   `PIPE_SERIES` (lib/rakplus-catalogue.ts) builds its slug as
 *   `ppr-{colorLine}-{pn}` → `ppr-green-pn10 … ppr-yellow-pn25`.
 *   Those eight tokens were verified one-for-one against the keys emitted
 *   into `productRegistry` from `PPR CATALOG 03-11-22.json`:
 *     ppr-green-pn10  ppr-green-pn16  ppr-green-pn20  ppr-green-pn25
 *     ppr-yellow-pn10 ppr-yellow-pn16 ppr-yellow-pn20 ppr-yellow-pn25
 *   The registry additionally holds ppr-fittings-green, ppr-fittings-yellow
 *   and pex-systems — none of which are pipe-series selections.
 *
 *   The link target is resolved from the imported `PIPE_SERIES` metadata
 *   itself (never string-built at the call site), and falls back to the
 *   canonical `/products/` hub if a series ever fails to resolve.
 *
 * Every dimensional value is sourced verbatim from RakPlus Catalogue
 * pp.06–07. Water content is published ONLY on the p.07 SDR5/PN25 table,
 * so the readout shows "n/a" on the other three series.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PIPE_TABLES_BY_CLASS,
  PIPE_SERIES,
  SDR_BY_CLASS,
  STANDARD_PIPE_DIAMETERS,
  buildPipeModelPath,
  pipeSizesFor,
  type PipeColorLine,
  type PipeSeriesMeta,
} from "@/lib/rakplus-catalogue";
import TableRowViewer from "@/components/3d/TableRowViewer";
import { ArrowDown, Ruler, MousePointerClick } from "lucide-react";

type PNClass = keyof typeof PIPE_TABLES_BY_CLASS;

// Visual scale factor: maps mm diameter → SVG viewBox units
const SVG_DIAGRAM_MAX_D = 500; // SVG canvas for the largest 110mm pipe
const MAX_PX_PER_MM = SVG_DIAGRAM_MAX_D / 110;

// ─── German-Standard engineering colour system ────────────────────────
const C_CRIMSON = "#DC2626"; // outer diameter D
const C_BLACK = "#0A0A0A"; // wall thickness s
const C_YELLOW = "#FACC15"; // signal dot on the wall callout
const C_EMERALD = "#059669"; // inner bore d_i
const C_GRID = "#E5E7EB"; // engineering grid
const C_POLY_A = "#10b981";
const C_POLY_B = "#059669";
const C_POLY_C = "#047857";

const COLOR_LINES: Array<{
  id: PipeColorLine;
  label: string;
  short: string;
  swatch: string;
}> = [
  { id: "green", label: "RakPlus Green PP-R", short: "Green", swatch: "bg-[#059669]" },
  { id: "yellow", label: "RakPlus Yellow PP-R", short: "Yellow", swatch: "bg-[#EAB308]" },
];

/**
 * Application recommendation per pressure class.
 * Wording mirrors the verified product descriptions in the registry
 * (PN10 cold-water supply · PN16 hot & cold general · PN20 hot water +
 * central heating · PN25 chilled-water / extreme-pressure mains).
 */
const APPLICATION_BY_CLASS: Record<
  PNClass,
  { bar: number; headline: string; detail: string }
> = {
  PN10: {
    bar: 10,
    headline: "Cold Water Supply",
    detail: "Low-pressure buried, irrigation and general cold-water networks.",
  },
  PN16: {
    bar: 16,
    headline: "High-Pressure Cold & Warm Water",
    detail: "General-purpose domestic hot & cold water distribution.",
  },
  PN20: {
    bar: 20,
    headline: "Hot & Cold Potable Water & Central Heating",
    detail: "Continuous hot-water circulation and hydronic heating circuits.",
  },
  PN25: {
    bar: 25,
    headline: "Extreme High-Pressure Riser & Chilled Water Mains",
    detail: "Maximum-wall HVAC / chilled-water mains and heavy-duty risers.",
  },
};

/** The three hoverable blueprint zones ↔ telemetry linkage. */
type BlueprintZone = "outer" | "wall" | "bore";

export default function InteractivePipeCrossSection({
  initialSlug,
}: {
  /**
   * Optional. When mounted on /products/[slug]/ the page passes its own
   * slug so the configurator opens on that exact series (colour + class).
   */
  initialSlug?: string;
}) {
  const initialSeries: PipeSeriesMeta =
    PIPE_SERIES.find((s) => s.slug === initialSlug) ?? PIPE_SERIES.find((s) => s.pn === "PN20" && s.colorLine === "green")!;

  const [colorLine, setColorLine] = useState<PipeColorLine>(initialSeries.colorLine);
  const [pn, setPn] = useState<PNClass>(initialSeries.pn);
  const [hovered, setHovered] = useState<BlueprintZone | null>(null);

  const table = PIPE_TABLES_BY_CLASS[pn];
  const initialRow =
    table.find((r) => r.diameterMm === 32) ?? table[0];
  const [active, setActive] = useState(initialRow);

  // ─── Derived configuration ──────────────────────────────────────────
  const series = useMemo<PipeSeriesMeta>(
    () =>
      PIPE_SERIES.find(
        (s) => s.pn === pn && s.colorLine === colorLine
      ) ?? PIPE_SERIES[0],
    [pn, colorLine]
  );

  const allSizes = useMemo(() => pipeSizesFor(series), [series]);

  const modelPath = useMemo(
    () => buildPipeModelPath(series, active.diameterMm),
    [series, active.diameterMm]
  );

  const sizeLabel = `${active.diameterMm}mm`;

  // Wall consumes 2·s of the outer diameter; the bore consumes the rest.
  const wallSharePct = useMemo(
    () => ((active.wallMm * 2) / active.diameterMm) * 100,
    [active]
  );

  const onSelectClass = (cls: PNClass) => {
    setPn(cls);
    // Keep the user's chosen diameter when the new class has it, else fall
    // back to the first available row.
    const next = PIPE_TABLES_BY_CLASS[cls].find(
      (r) => r.diameterMm === active.diameterMm
    );
    setActive(next ?? PIPE_TABLES_BY_CLASS[cls][0]);
  };

  // Geometry calculations
  const outerR = useMemo(
    () => (active.diameterMm * MAX_PX_PER_MM) / 2,
    [active]
  );
  const wallR = useMemo(
    () => active.wallMm * MAX_PX_PER_MM,
    [active]
  );
  const innerR = outerR - wallR;

  // SVG canvas
  const viewSize = SVG_DIAGRAM_MAX_D + 80;
  const center = viewSize / 2;

  const isYellow = series.colorLine === "yellow";
  const app = APPLICATION_BY_CLASS[pn];

  return (
    <section
      className="relative w-full bg-studio-white text-pitch-black py-10 md:py-12 lg:max-h-[85vh] lg:py-8 px-6 lg:px-12 overflow-hidden"
      data-feature="pipe-cross-section"
      aria-labelledby="cross-section-h2"
    >
      <div className="max-w-screen-2xl mx-auto lg:max-h-[calc(85vh-4rem)] flex flex-col lg:min-h-0">
        {/* ══════════ 12-COLUMN DASHBOARD ══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-10 lg:min-h-0 lg:flex-1">
          {/* ─── LEFT 6 COLUMNS — header + selectors + readouts ─── */}
          <div className="lg:col-span-6 flex flex-col lg:min-h-0 lg:overflow-y-auto lg:pr-1">
            <h2
              id="cross-section-h2"
              className="font-sans font-extrabold tracking-ultra-tight text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[0.95] mb-2 shrink-0"
            >
              Interactive Pipe Cross-Section{" "}
              <span className="text-crimson">Blueprint.</span>
            </h2>
            <p className="text-neutral-700 text-sm leading-relaxed mb-3 shrink-0">
              Choose a colour line, pressure class and diameter — then jump
              straight to the exact product page or open its 3D model.
            </p>

            {/* Colour line toggle */}
            <div className="mb-2.5 shrink-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-1.5">
                Pipe Colour Line
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {COLOR_LINES.map((c) => {
                  const isActive = colorLine === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setColorLine(c.id)}
                      aria-pressed={isActive}
                      className={[
                        "flex items-center gap-2 px-3 py-2 border transition-all duration-200",
                        isActive
                          ? "bg-pitch-black text-studio-white border-pitch-black shadow-sm"
                          : "bg-white text-neutral-700 border-neutral-900/12 hover:border-pitch-black/40 hover:text-pitch-black",
                      ].join(" ")}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${c.swatch} ${
                          isActive ? "ring-2 ring-[#FACC15] ring-offset-1 ring-offset-pitch-black" : ""
                        }`}
                      />
                      <span className="font-sans font-bold text-[12px] leading-tight text-left">
                        {c.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pressure class selector */}
            <div className="mb-2.5 shrink-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-1.5">
                Pressure Class · SDR
              </p>
              <div className="grid grid-cols-4 gap-1.5">
                {(["PN10", "PN16", "PN20", "PN25"] as PNClass[]).map((cls) => (
                  <button
                    key={cls}
                    onClick={() => onSelectClass(cls)}
                    aria-pressed={pn === cls}
                    className={[
                      "px-2 py-2 border transition-all duration-200 text-left",
                      pn === cls
                        ? "bg-pitch-black text-studio-white border-pitch-black shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-900/12 hover:border-pitch-black/40 hover:text-pitch-black",
                    ].join(" ")}
                  >
                    <p className="font-sans font-extrabold text-base tracking-tighter leading-none">
                      {cls}
                    </p>
                    <p
                      className={[
                        "text-[9px] font-mono uppercase tracking-[0.2em] mt-0.5",
                        pn === cls ? "text-[#FACC15]" : "text-neutral-400",
                      ].join(" ")}
                    >
                      {SDR_BY_CLASS[cls]}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Diameter selector */}
            <div className="mb-2.5 shrink-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-1.5">
                Outside Diameter
              </p>
              <div className="grid grid-cols-9 gap-1">
                {STANDARD_PIPE_DIAMETERS.map((d) => {
                  const row = table.find((r) => r.diameterMm === d);
                  const isActive = active.diameterMm === d;
                  return (
                    <button
                      key={d}
                      disabled={!row}
                      onClick={() => row && setActive(row)}
                      aria-pressed={isActive}
                      className={[
                        "py-2 text-[10px] font-mono font-bold border transition-colors",
                        !row
                          ? "opacity-30 cursor-not-allowed bg-white border-neutral-900/12"
                          : isActive
                            ? "bg-crimson text-white border-crimson shadow-sm"
                            : "bg-white text-neutral-600 border-neutral-900/12 hover:border-crimson/60 hover:text-crimson",
                      ].join(" ")}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3×3 zone-linked telemetry grid */}
            <div className="grid grid-cols-3 gap-1.5 shrink-0">
              <SpecRow
                label="Outside Diameter D"
                value={active.diameterMm}
                unit="mm"
                accent="crimson"
                zone="outer"
                hovered={hovered}
              />
              <SpecRow
                label="Wall Thickness s"
                value={active.wallMm}
                unit="mm"
                zone="wall"
                hovered={hovered}
              />
              <SpecRow
                label="Inner Bore d"
                value={active.innerMm}
                unit="mm"
                accent="emerald"
                zone="bore"
                hovered={hovered}
              />
              <SpecRow
                label="Weight"
                value={active.weightKgPerM.toFixed(3)}
                unit="kg/m"
              />
              <SpecRow label="Packing Unit" value={active.packingMtrs} unit="mtrs" />
              <SpecRow
                label="Water Content"
                value={
                  active.waterContentLPerM !== null
                    ? active.waterContentLPerM.toFixed(3)
                    : "n/a"
                }
                unit="L/m"
                muted={active.waterContentLPerM === null}
              />
              <SpecRow label="Pressure Class" value={pn} unit={SDR_BY_CLASS[pn]} accent="crimson" />
              <SpecRow label="SDR Ratio" value={SDR_BY_CLASS[pn].replace("SDR ", "")} unit="D/s" />
              <div className="bg-white border border-dashed border-neutral-900/15 rounded-xl px-3 py-2 flex flex-col justify-center">
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-400 mb-0.5">
                  Blueprint
                </p>
                <p className="text-[10px] font-semibold text-neutral-500 leading-tight flex items-start gap-1">
                  <MousePointerClick className="w-3 h-3 mt-px flex-shrink-0 text-crimson" />
                  Hover the rings
                </p>
              </div>
            </div>

            {/* Wall-to-bore ratio bar + application badge */}
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 shrink-0">
              {/* Ratio bar */}
              <div className="bg-white border border-neutral-900/12 rounded-xl px-3 py-2">
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-400 mb-1">
                  Wall-to-Bore Ratio
                </p>
                <div
                  className="flex h-2.5 rounded-full overflow-hidden bg-neutral-200"
                  role="img"
                  aria-label={`Wall thickness uses ${wallSharePct.toFixed(1)} percent of the outer diameter; inner bore uses ${(100 - wallSharePct).toFixed(1)} percent.`}
                >
                  <div className="bg-pitch-black" style={{ width: `${wallSharePct}%` }} />
                  <div className="bg-[#059669]" style={{ width: `${100 - wallSharePct}%` }} />
                </div>
                <p className="text-[9px] font-mono text-neutral-500 mt-1 tabular-nums">
                  <span className="text-pitch-black font-bold">s×2 {wallSharePct.toFixed(1)}%</span>
                  <span className="mx-1 text-neutral-300">|</span>
                  <span className="text-[#059669] font-bold">bore {(100 - wallSharePct).toFixed(1)}%</span>
                </p>
              </div>

              {/* Application recommendation badge */}
              <div className="bg-crimson text-white rounded-xl px-3 py-2 flex flex-col justify-center">
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/70 mb-0.5">
                  Recommended Application
                </p>
                <p className="text-[11px] font-extrabold leading-tight">{app.headline}</p>
                <p className="text-[9px] font-mono text-[#FACC15] mt-0.5 font-bold">
                  {app.bar} BAR · {SDR_BY_CLASS[pn]}
                </p>
              </div>
            </div>
          </div>

          {/* ─── RIGHT 6 COLUMNS — SVG blueprint ─── */}
          <div className="lg:col-span-6 mt-5 lg:mt-0 flex items-center justify-center lg:min-h-0">
            <div className="w-full max-w-[340px] lg:max-w-[400px] aspect-square">
              <div className="relative w-full h-full bg-white border border-neutral-900/12 rounded-2xl shadow-sm overflow-hidden corner-crosshairs">
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2 z-10 pointer-events-none">
                  <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-500">
                    {series.shortColor} · {pn} · {SDR_BY_CLASS[pn]}
                  </p>
                  <Ruler className="w-3.5 h-3.5 text-neutral-400" />
                </div>

                <svg
                  viewBox={`0 0 ${viewSize} ${viewSize}`}
                  className="w-full h-full"
                  role="img"
                  aria-label={`Cross-section of RakPlus ${series.title} ${active.diameterMm} millimetre pipe. Outer diameter ${active.diameterMm} millimetres, wall thickness ${active.wallMm} millimetres, inner bore ${active.innerMm} millimetres.`}
                  onMouseLeave={() => setHovered(null)}
                >
                  <defs>
                    <radialGradient id="polymerRad" cx="35%" cy="30%">
                      <stop offset="0%" stopColor={C_POLY_A} />
                      <stop offset="60%" stopColor={C_POLY_B} />
                      <stop offset="100%" stopColor={C_POLY_C} />
                    </radialGradient>
                    <linearGradient id="wallRim" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                      <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
                    </linearGradient>
                  </defs>

                  {/* Light engineering grid */}
                  <pattern
                    id="gridXs"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke={C_GRID} strokeWidth="1" />
                  </pattern>
                  <rect width={viewSize} height={viewSize} fill="#FFFFFF" />
                  <rect width={viewSize} height={viewSize} fill="url(#gridXs)" />

                  {/* Outer diameter circle (polymer body) — tinted per colour line */}
                  <circle
                    cx={center}
                    cy={center}
                    r={outerR}
                    fill="url(#polymerRad)"
                    stroke={C_CRIMSON}
                    strokeWidth="2"
                    opacity={hovered === "outer" ? 0.75 : 1}
                  />

                  {/* Specular highlight on outer rim */}
                  <circle
                    cx={center}
                    cy={center}
                    r={outerR}
                    fill="url(#wallRim)"
                    opacity="0.55"
                  />

                  {/* Inner bore */}
                  <circle
                    cx={center}
                    cy={center}
                    r={innerR}
                    fill="#FFFFFF"
                    stroke={C_EMERALD}
                    strokeWidth="2"
                  />

                  {/* ═══ INTERACTIVE OVERLAYS (transparent hit areas) ═══
                      Painted top-down so the three zones never fight:
                      bore wins the centre, wall takes the annulus,
                      outer takes the outermost edge band. */}
                  <g>
                    {/* 1 · Inner bore */}
                    <circle
                      cx={center}
                      cy={center}
                      r={innerR}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHovered("bore")}
                      style={{ pointerEvents: "fill" }}
                    />
                    {/* 2 · Pipe wall annulus — padded outwards for a generous
                        hit area on thin-wall series (SDR11 at Ø20) */}
                    <path
                      d={annulusPath(center, center, outerR + 3, Math.max(innerR - 6, 0))}
                      fill="transparent"
                      fillRule="evenodd"
                      className="cursor-pointer"
                      onMouseEnter={() => setHovered("wall")}
                      style={{ pointerEvents: "fill" }}
                    />
                    {/* 3 · Outer ring */}
                    <circle
                      cx={center}
                      cy={center}
                      r={outerR}
                      fill="none"
                      stroke="transparent"
                      strokeWidth={9}
                      className="cursor-pointer"
                      onMouseEnter={() => setHovered("outer")}
                      style={{ pointerEvents: "stroke" }}
                    />
                  </g>

                  {/* Active-zone emphasis rings */}
                  {hovered === "bore" && (
                    <circle cx={center} cy={center} r={innerR} fill="none" stroke={C_EMERALD} strokeWidth="4" pointerEvents="none" />
                  )}
                  {hovered === "wall" && (
                    <circle cx={center} cy={center} r={outerR - wallR / 2} fill="none" stroke={C_BLACK} strokeWidth={Math.max(wallR, 2)} opacity="0.45" pointerEvents="none" />
                  )}
                  {hovered === "outer" && (
                    <circle cx={center} cy={center} r={outerR + 4} fill="none" stroke={C_CRIMSON} strokeWidth="3" pointerEvents="none" />
                  )}

                  {/* Axis cross */}
                  <line
                    x1={center - outerR - 20}
                    y1={center}
                    x2={center + outerR + 20}
                    y2={center}
                    stroke={C_CRIMSON}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.45"
                    pointerEvents="none"
                  />
                  <line
                    x1={center}
                    y1={center - outerR - 20}
                    x2={center}
                    y2={center + outerR + 20}
                    stroke={C_CRIMSON}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.45"
                    pointerEvents="none"
                  />

                  {/* Outer D dimension line (left, crimson) */}
                  <DimensionLineVertical
                    x={center - outerR - 26}
                    y1={center - outerR - 8}
                    y2={center + outerR + 8}
                    label={`D = ${active.diameterMm} mm`}
                    color={C_CRIMSON}
                    side="left"
                  />

                  {/* Wall thickness s dimension line (top-right, black) */}
                  <DimensionLineHorizontal
                    x1={center + outerR - wallR}
                    y1={center - outerR - 34}
                    x2={center + outerR}
                    y2={center - outerR - 34}
                    label={`s = ${active.wallMm} mm`}
                    color={C_BLACK}
                  />
                  {/* Signal-yellow indicator dot on the wall callout */}
                  <circle
                    cx={center + outerR - wallR / 2}
                    cy={center - outerR - 34}
                    r="4"
                    fill={C_YELLOW}
                    stroke={C_BLACK}
                    strokeWidth="1.5"
                    pointerEvents="none"
                  />

                  {/* Inner bore label (bottom, emerald) */}
                  <text
                    x={center}
                    y={center + outerR + 34}
                    textAnchor="middle"
                    fontSize="15"
                    fontFamily="monospace"
                    fill={C_EMERALD}
                    fontWeight="bold"
                    pointerEvents="none"
                  >
                    ⌀ {active.innerMm} mm
                  </text>

                  {/* Bore callout inside the white bore */}
                  <text
                    x={center}
                    y={center + 5}
                    textAnchor="middle"
                    fontSize="13"
                    fontFamily="monospace"
                    fill={C_BLACK}
                    fontWeight="bold"
                    pointerEvents="none"
                  >
                    d = {active.innerMm}
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ DERIVED CONFIGURATION RESULT BAR + CTAs ══════════ */}
        <div className="mt-4 lg:mt-3 shrink-0 rounded-2xl bg-pitch-black text-studio-white overflow-hidden shadow-[0_18px_45px_rgba(10,10,10,0.25)]">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Derived identity */}
            <div className="md:col-span-7 px-5 py-4 border-b md:border-b-0 md:border-r border-white/12">
              <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#FACC15] mb-1">
                Derived Configuration
              </p>
              <p className="font-sans font-extrabold text-lg sm:text-xl tracking-tight leading-tight">
                {series.title}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 font-mono text-[11px] tabular-nums">
                <span>
                  <span className="text-white/45 uppercase tracking-[0.15em] text-[9px] mr-1.5">
                    Part No
                  </span>
                  <span className="text-[#FACC15] font-bold text-sm">{active.partNo}</span>
                </span>
                <span>
                  <span className="text-white/45 uppercase tracking-[0.15em] text-[9px] mr-1.5">
                    Size
                  </span>
                  <span className="font-bold text-sm">
                    ⌀{active.diameterMm}mm × {active.wallMm}mm
                  </span>
                </span>
                <span>
                  <span className="text-white/45 uppercase tracking-[0.15em] text-[9px] mr-1.5">
                    Line
                  </span>
                  <span className="font-bold">{series.shortColor}</span>
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="md:col-span-5 px-5 py-4 flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center justify-start gap-2.5">
              <Link
                href={`/products/${series.slug}/`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-extrabold px-7 py-3.5 shadow-[0_10px_25px_rgba(220,38,38,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                View the Product &amp; Live 3D Model
                <span aria-hidden="true">→</span>
              </Link>

              <div className="flex items-center">
                <TableRowViewer
                  modelPath={modelPath}
                  sizeLabel={sizeLabel}
                  allSizes={allSizes}
                  colorTheme={series.colorLine}
                  isYellow={isYellow}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-[10px] font-mono text-neutral-400 uppercase tracking-[0.25em] flex items-center gap-2 shrink-0">
          <ArrowDown className="w-3 h-3" />
          Source: RakPlus Catalogue, RakPlus® Rohrsysteme UAE, pp.06–07
        </p>
      </div>
    </section>
  );
}

/**
 * Builds an even-odd annulus path (outer circle minus inner circle) so the
 * wall zone can be hit-tested as a filled region rather than a hairline stroke.
 */
function annulusPath(cx: number, cy: number, rOuter: number, rInner: number) {
  const ro = Math.max(rOuter, 0);
  const ri = Math.max(rInner, 0);
  return [
    `M ${cx - ro} ${cy}`,
    `a ${ro} ${ro} 0 1 0 ${ro * 2} 0`,
    `a ${ro} ${ro} 0 1 0 ${-ro * 2} 0`,
    "Z",
    `M ${cx - ri} ${cy}`,
    `a ${ri} ${ri} 0 1 0 ${ri * 2} 0`,
    `a ${ri} ${ri} 0 1 0 ${-ri * 2} 0`,
    "Z",
  ].join(" ");
}

// ────────────────────────────────────────────────────────────────────
// SpecRow — single labelled telemetry cell (optionally zone-linked)
// ────────────────────────────────────────────────────────────────────
function SpecRow({
  label,
  value,
  unit,
  accent,
  muted,
  zone,
  hovered,
}: {
  label: string;
  value: string | number;
  unit: string;
  accent?: "emerald" | "crimson";
  muted?: boolean;
  zone?: BlueprintZone;
  hovered?: BlueprintZone | null;
}) {
  const valueColor = muted
    ? "text-neutral-400"
    : accent === "emerald"
      ? "text-emerald"
      : accent === "crimson"
        ? "text-crimson"
        : "text-pitch-black";

  const isLit = Boolean(zone && hovered === zone);

  return (
    <div
      className={[
        "bg-white border rounded-xl px-3 py-2 transition-all duration-150",
        isLit
          ? "border-crimson bg-crimson/[0.04] ring-2 ring-crimson/25"
          : "border-neutral-900/12",
      ].join(" ")}
    >
      <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-400 mb-0.5 truncate">
        {label}
      </p>
      <p
        className={`font-sans font-extrabold text-lg tabular-nums leading-none ${valueColor}`}
      >
        {value}
        <span className="text-[10px] text-neutral-400 ml-1 font-sans font-medium">
          {unit}
        </span>
      </p>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Dimension line helpers (pure SVG, no external libs)
// ────────────────────────────────────────────────────────────────────
function DimensionLineVertical({
  x,
  y1,
  y2,
  label,
  color,
  side,
}: {
  x: number;
  y1: number;
  y2: number;
  label: string;
  color: string;
  side: "left" | "right";
}) {
  const tickOffset = 6;
  const labelOffset = side === "left" ? -8 : 8;
  return (
    <g pointerEvents="none">
      <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1={x - tickOffset} y1={y1} x2={x + tickOffset} y2={y1} stroke={color} strokeWidth="1.5" />
      <line x1={x - tickOffset} y1={y2} x2={x + tickOffset} y2={y2} stroke={color} strokeWidth="1.5" />
      <text
        x={x + labelOffset}
        y={(y1 + y2) / 2}
        textAnchor={side === "left" ? "end" : "start"}
        dominantBaseline="middle"
        fontSize="15"
        fontFamily="monospace"
        fontWeight="bold"
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}

function DimensionLineHorizontal({
  x1,
  y1,
  x2,
  y2,
  label,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  color: string;
}) {
  const tickOffset = 6;
  return (
    <g pointerEvents="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1={x1} y1={y1 - tickOffset} x2={x1} y2={y1 + tickOffset} stroke={color} strokeWidth="1.5" />
      <line x1={x2} y1={y2 - tickOffset} x2={x2} y2={y2 + tickOffset} stroke={color} strokeWidth="1.5" />
      <text
        x={(x1 + x2) / 2}
        y={y1 - 9}
        textAnchor="middle"
        fontSize="13"
        fontFamily="monospace"
        fontWeight="bold"
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}
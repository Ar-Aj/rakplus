"use client";

/**
 * ThermalExpansionCalculator — Signature Feature 1
 *
 * Interactive MEP engineering calculator for the Thermal Expansion &
 * Bending Arm Length formulas from the RakPlus Catalogue, Page 22.
 *
 * Formulas (Catalogue p.22):
 *   ΔL = λ × L × ΔT
 *      where λ = 0.183 mm/(m·K)   (PP-R average coefficient)
 *            L = pipe length (m)
 *            ΔT = temperature differential (K)
 *
 *   Ls = K × √(d × |ΔL|)
 *      where K = 30 (constant for PP-R pipes)
 *            d = outside diameter (mm)
 *            ΔL = linear expansion (mm)
 *
 * UI/UX:
 *   • Three tactile range sliders (length, ΔT, diameter)
 *   • Live SVG schematic blueprint that draws the pipe + the expansion
 *     loop with the bending arm at the exact calculated length.
 *   • Live telemetry readouts in Clash Display + monospace units.
 *   • Worked example chip (Catalogue p.22) re-renders the official
 *     example on click.
 */

import { useMemo, useState } from "react";
import {
  THERMAL_EXPANSION_LAMBDA,
  BENDING_ARM_K,
  STANDARD_PIPE_DIAMETERS,
  calcLinearExpansion,
  calcBendingArm,
  WORKED_EXAMPLE,
} from "@/lib/rakplus-catalogue";
import { RotateCcw, Beaker, Ruler } from "lucide-react";

const PRESETS = [
  {
    name: "Catalogue Worked Example",
    description: "Catalogue p.22: 8 m pipe, install 16 °C, hot 70 °C",
    pipeLength: WORKED_EXAMPLE.pipeLength,
    installTemp: WORKED_EXAMPLE.installTemp,
    hotTemp: WORKED_EXAMPLE.hotTemp,
    diameter: 32,
  },
  {
    name: "UAE Residential Riser",
    description: "12 m hot water riser, 25 mm PN20, install 28 °C, hot 70 °C",
    pipeLength: 12,
    installTemp: 28,
    hotTemp: 70,
    diameter: 25,
  },
  {
    name: "Cooling Tower Return",
    description: "30 m chilled water main, 110 mm PN25, install 32 °C, cold 9 °C",
    pipeLength: 30,
    installTemp: 32,
    hotTemp: 9,
    diameter: 110,
  },
];

export default function ThermalExpansionCalculator() {
  const [pipeLength, setPipeLength] = useState<number>(8);
  const [installTemp, setInstallTemp] = useState<number>(16);
  const [hotTemp, setHotTemp] = useState<number>(70);
  const [diameter, setDiameter] = useState<number>(32);

  const deltaT = hotTemp - installTemp;
  const deltaLmm = calcLinearExpansion(pipeLength, deltaT);
  const bendingArmMm = calcBendingArm(diameter, deltaLmm);

  const isContraction = deltaT < 0;
  const isWorkedExample =
    pipeLength === WORKED_EXAMPLE.pipeLength &&
    installTemp === WORKED_EXAMPLE.installTemp &&
    hotTemp === WORKED_EXAMPLE.hotTemp;

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setPipeLength(preset.pipeLength);
    setInstallTemp(preset.installTemp);
    setHotTemp(preset.hotTemp);
    setDiameter(preset.diameter);
  };

  const reset = () => {
    setPipeLength(8);
    setInstallTemp(16);
    setHotTemp(70);
    setDiameter(32);
  };

  // Visual scaling for SVG schematic
  const visualArm = useMemo(() => {
    // Cap the visual arm so the SVG stays readable for extreme values
    const max = 1200; // mm cap
    return Math.min(bendingArmMm, max);
  }, [bendingArmMm]);

  return (
    <section
      className="relative w-full bg-obsidian text-studio-white py-20 md:py-28 px-6 lg:px-12 overflow-hidden"
      data-feature="thermal-expansion"
      aria-labelledby="thermal-h2"
    >
      {/* Corner crosshairs accent */}
      <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-brass/60" />
      <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-brass/60" />
      <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-brass/60" />
      <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-brass/60" />

      <div className="relative max-w-screen-2xl mx-auto">
        {/* Eyebrow + Heading */}
        <p className="text-emerald text-[10px] md:text-[11px] font-mono uppercase tracking-[0.35em] mb-4">
          // Signature Feature 01 — RakPlus Catalogue p.22
        </p>
        <h2
          id="thermal-h2"
          className="font-sans font-extrabold tracking-ultra-tight text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.95] mb-4 max-w-4xl"
        >
          Thermal Expansion <span className="text-emerald">&amp;</span> Bending Arm Calculator.
        </h2>
        <p className="text-studio-white/60 text-base md:text-lg leading-relaxed max-w-3xl mb-12">
          Engineers compute the exact thermal expansion ΔL and required
          free bending arm length Ls for any RakPlus PP-R pipe run —
          powered by the formulae on page 22 of the official catalogue
          (RakPlus® Rohrsysteme UAE, UAE).
        </p>

        {/* Worked example banner */}
        <div className="mb-8 md:mb-12 grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className={[
                "group text-left p-5 border transition-all duration-300",
                isWorkedExample && preset.name === PRESETS[0].name
                  ? "bg-emerald/10 border-emerald"
                  : "bg-pitch-black border-white/10 hover:border-brass/60",
              ].join(" ")}
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-brass mb-2">
                Preset
              </p>
              <p className="text-sm font-bold text-studio-white mb-1 leading-tight">
                {preset.name}
              </p>
              <p className="text-[11px] text-studio-white/50 leading-snug">
                {preset.description}
              </p>
            </button>
          ))}
        </div>

        {/* Main calculator grid: 12-col asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ─── LEFT — Sliders (5 cols) ─── */}
          <div className="lg:col-span-5 bg-pitch-black border border-white/10 p-6 md:p-8 corner-crosshairs">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-sans font-extrabold text-2xl text-studio-white tracking-tighter">
                Input Parameters
              </h3>
              <button
                onClick={reset}
                className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-studio-white/40 hover:text-emerald transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            <SliderField
              label="Pipe Length (L)"
              value={pipeLength}
              unit="m"
              min={1}
              max={50}
              step={1}
              onChange={setPipeLength}
              note="Catalogue p.22: 1 m – 50 m"
            />

            <SliderField
              label="Installation Temperature"
              value={installTemp}
              unit="°C"
              min={-10}
              max={50}
              step={1}
              onChange={setInstallTemp}
              note="Ambient temperature at the moment of jointing"
            />

            <SliderField
              label="Operating Temperature"
              value={hotTemp}
              unit="°C"
              min={-10}
              max={95}
              step={1}
              onChange={setHotTemp}
              note="Maximum operating temperature (Catalogue p.04: 0-70 °C continuous, 100 °C peak)"
            />

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-studio-white/50">
                  Outside Diameter (d)
                </label>
                <span className="text-2xl font-sans font-extrabold text-studio-white tabular-nums">
                  {diameter} <span className="text-sm text-studio-white/40">mm</span>
                </span>
              </div>
              <div className="grid grid-cols-9 gap-1">
                {STANDARD_PIPE_DIAMETERS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDiameter(d)}
                    className={[
                      "py-2 text-[10px] font-mono font-bold uppercase tracking-wider border transition-colors",
                      diameter === d
                        ? "bg-emerald text-pitch-black border-emerald"
                        : "bg-transparent text-studio-white/50 border-white/10 hover:border-emerald/60 hover:text-emerald",
                    ].join(" ")}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Inline formula reference */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-2 text-[11px] font-mono text-studio-white/40 leading-relaxed">
              <p>
                <span className="text-emerald">FORMULA · ΔL</span> = λ × L × ΔT
              </p>
              <p>
                <span className="text-emerald">FORMULA · Ls</span> = K × √(d × |ΔL|)
              </p>
              <p>
                <span className="text-brass">λ</span> = {THERMAL_EXPANSION_LAMBDA} mm/(m·K){" "}
                <span className="ml-3 text-brass">K</span> = {BENDING_ARM_K}
              </p>
            </div>
          </div>

          {/* ─── RIGHT — Live SVG schematic + telemetry (7 cols) ─── */}
          <div className="lg:col-span-7 space-y-6">
            {/* SVG schematic */}
            <div className="bg-pitch-black border border-white/10 p-4 md:p-6 corner-crosshairs">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-sapphire-dim">
                  Live Schematic · ΔL &amp; Bending Arm Ls
                </p>
                <Ruler className="w-4 h-4 text-studio-white/40" />
              </div>

              <SchematicSVG
                pipeLength={pipeLength}
                diameter={diameter}
                deltaLmm={deltaLmm}
                bendingArmMm={bendingArmMm}
                visualArm={visualArm}
                isContraction={isContraction}
              />
            </div>

            {/* Telemetry readouts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TelemetryCard
                label="ΔL · Linear Expansion"
                value={Math.abs(deltaLmm).toFixed(1)}
                unit="mm"
                sign={deltaLmm === 0 ? "" : deltaLmm > 0 ? "+" : "−"}
                color={isContraction ? "sapphire" : "emerald"}
                footer={
                  isContraction ? "CONTRACTION" : "EXPANSION"
                }
              />
              <TelemetryCard
                label="Ls · Bending Arm"
                value={Math.round(bendingArmMm)}
                unit="mm"
                color="brass"
                footer="FREE LENGTH REQUIRED"
              />
              <TelemetryCard
                label="ΔT · Temp Differential"
                value={deltaT}
                unit="K"
                sign={deltaT > 0 ? "+" : "−"}
                color="crimson"
                footer={`${installTemp}°C → ${hotTemp}°C`}
              />
              <TelemetryCard
                label="Catalogue Worked Example"
                value={isWorkedExample ? "MATCH" : "—"}
                unit="ΔL₂"
                color="studio"
                footer={
                  isWorkedExample
                    ? "ΔL₂ = 79.0 mm (p.22)"
                    : "Reset to apply p.22 example"
                }
                small
              />
            </div>
          </div>
        </div>

        {/* Catalogue citation footer */}
        <p className="mt-10 text-[10px] font-mono text-studio-white/30 uppercase tracking-[0.25em] flex items-center gap-2">
          <Beaker className="w-3 h-3" />
          Source: RakPlus Catalogue, RakPlus® Rohrsysteme UAE, p.22 ·
          λ = 0.183 mm/(m·K) · K = 30 (PP-R pipes)
        </p>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// Sub-component: SliderField
// ────────────────────────────────────────────────────────────────────
function SliderField({
  label,
  value,
  unit,
  min,
  max,
  step,
  onChange,
  note,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  note?: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-studio-white/50">
          {label}
        </label>
        <span className="text-xl md:text-2xl font-sans font-extrabold text-studio-white tabular-nums">
          {value} <span className="text-sm text-studio-white/40">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-white/10 appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-emerald
          [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(5,150,105,0.6)]
          [&::-webkit-slider-thumb]:cursor-grab
          [&::-webkit-slider-thumb]:active:cursor-grabbing
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-emerald
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:cursor-grab"
      />
      {note && (
        <p className="mt-1.5 text-[10px] font-mono text-studio-white/30 leading-snug">
          {note}
        </p>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Sub-component: TelemetryCard
// ────────────────────────────────────────────────────────────────────
function TelemetryCard({
  label,
  value,
  unit,
  sign,
  color,
  footer,
  small,
}: {
  label: string;
  value: string | number;
  unit: string;
  sign?: string;
  color: "emerald" | "brass" | "crimson" | "sapphire" | "studio";
  footer: string;
  small?: boolean;
}) {
  const colorClass: Record<typeof color, string> = {
    emerald: "text-emerald",
    brass: "text-brass",
    crimson: "text-crimson",
    sapphire: "text-sapphire-dim",
    studio: "text-studio-white",
  };
  return (
    <div className="bg-pitch-black border border-white/10 p-5 corner-crosshairs">
      <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-studio-white/40 mb-2">
        {label}
      </p>
      <p
        className={[
          "font-sans font-extrabold tabular-nums leading-none",
          small ? "text-xl" : "text-3xl md:text-4xl",
          colorClass[color],
        ].join(" ")}
      >
        {sign && <span className="text-studio-white/40 mr-1">{sign}</span>}
        {value}
        {unit && (
          <span className="text-sm md:text-base text-studio-white/40 ml-1.5 font-sans font-medium">
            {unit}
          </span>
        )}
      </p>
      <p className="mt-2 text-[9px] font-mono uppercase tracking-[0.25em] text-studio-white/30">
        {footer}
      </p>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Sub-component: SchematicSVG
// ────────────────────────────────────────────────────────────────────
function SchematicSVG({
  pipeLength,
  diameter,
  deltaLmm,
  bendingArmMm,
  visualArm,
  isContraction,
}: {
  pipeLength: number;
  diameter: number;
  deltaLmm: number;
  bendingArmMm: number;
  visualArm: number;
  isContraction: boolean;
}) {
  // Pipe-body horizontal length in SVG units (cap to 800)
  const pipeBodyLen = Math.min(800, pipeLength * 8);
  // Bending-arm length visualised as upward U-loop
  const armLen = Math.min(200, visualArm / 2);

  // Centered viewBox 1000 × 500
  const startX = 50;
  const endX = startX + pipeBodyLen;
  const baseY = 250;
  const loopTopY = baseY - armLen;

  return (
    <svg
      viewBox="0 0 1000 500"
      className="w-full h-auto"
      role="img"
      aria-label="Live thermal expansion schematic"
    >
      {/* Background grid */}
      <defs>
        <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        </pattern>
        <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#008751" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <rect width="1000" height="500" fill="url(#grid)" />

      {/* Pipe body (horizontal) */}
      <rect
        x={startX}
        y={baseY - 18}
        width={pipeBodyLen}
        height={36}
        fill="url(#pipeGradient)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />
      {/* Pipe inner bore (hollow) */}
      <rect
        x={startX + 8}
        y={baseY - 12}
        width={pipeBodyLen - 16}
        height={24}
        fill="rgba(10,10,10,0.4)"
      />

      {/* Brass couplings at each end */}
      <rect
        x={startX - 4}
        y={baseY - 22}
        width={20}
        height={44}
        fill="#D4AF37"
        stroke="#C59B27"
        strokeWidth="1"
      />
      <rect
        x={endX - 16}
        y={baseY - 22}
        width={20}
        height={44}
        fill="#D4AF37"
        stroke="#C59B27"
        strokeWidth="1"
      />

      {/* Expansion loop (U-bend on the right) */}
      {armLen > 10 && (
        <g>
          <path
            d={`M ${endX} ${baseY - 18}
                L ${endX + 30} ${baseY - 18}
                L ${endX + 30} ${loopTopY}
                L ${endX - 30} ${loopTopY}
                L ${endX - 30} ${baseY - 18}
                L ${endX} ${baseY - 18}`}
            fill="none"
            stroke="url(#pipeGradient)"
            strokeWidth="22"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
          <path
            d={`M ${endX} ${baseY - 18}
                L ${endX + 30} ${baseY - 18}
                L ${endX + 30} ${loopTopY}
                L ${endX - 30} ${loopTopY}
                L ${endX - 30} ${baseY - 18}
                L ${endX} ${baseY - 18}`}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* Dimension line for pipe length */}
      <g stroke="rgba(212,175,55,0.6)" strokeWidth="1" fill="none">
        <line x1={startX} y1={baseY + 60} x2={endX} y2={baseY + 60} />
        <line x1={startX} y1={baseY + 55} x2={startX} y2={baseY + 65} />
        <line x1={endX} y1={baseY + 55} x2={endX} y2={baseY + 65} />
      </g>
      <text
        x={(startX + endX) / 2}
        y={baseY + 80}
        fill="#D4AF37"
        fontSize="16"
        fontFamily="monospace"
        textAnchor="middle"
      >
        L = {pipeLength} m
      </text>

      {/* Dimension line for bending arm Ls */}
      {armLen > 10 && (
        <g>
          <line
            x1={endX - 30}
            y1={baseY - 18}
            x2={endX - 30}
            y2={loopTopY}
            stroke="rgba(14,165,233,0.7)"
            strokeWidth="1"
          />
          <line
            x1={endX - 35}
            y1={baseY - 18}
            x2={endX - 25}
            y2={baseY - 18}
            stroke="rgba(14,165,233,0.7)"
            strokeWidth="1"
          />
          <line
            x1={endX - 35}
            y1={loopTopY}
            x2={endX - 25}
            y2={loopTopY}
            stroke="rgba(14,165,233,0.7)"
            strokeWidth="1"
          />
          <text
            x={endX - 50}
            y={(baseY - 18 + loopTopY) / 2}
            fill="#0EA5E9"
            fontSize="14"
            fontFamily="monospace"
            textAnchor="end"
            dominantBaseline="middle"
          >
            Ls={Math.round(bendingArmMm)}mm
          </text>
        </g>
      )}

      {/* Annotation for ΔL direction */}
      <g
        transform={`translate(${endX + 60}, ${baseY - 18})`}
        fill={isContraction ? "#0EA5E9" : "#059669"}
      >
        <text fontSize="11" fontFamily="monospace" fontWeight="bold">
          ΔL
        </text>
        <text y="14" fontSize="13" fontFamily="monospace" fontWeight="bold">
          {isContraction ? "−" : "+"}
          {Math.abs(deltaLmm).toFixed(1)} mm
        </text>
        <text y="28" fontSize="9" fontFamily="monospace" opacity="0.7">
          {isContraction ? "CONTRACTION" : "EXPANSION"}
        </text>
      </g>

      {/* Diameter label on the left coupling */}
      <g transform={`translate(${startX - 8}, ${baseY + 110})`} fill="#FAFAFA">
        <text fontSize="10" fontFamily="monospace" opacity="0.5" textAnchor="middle">
          d = {diameter} mm
        </text>
      </g>

      {/* Crosshair markers at corners */}
      {[
        [20, 20],
        [980, 20],
        [20, 480],
        [980, 480],
      ].map(([cx, cy]) => (
        <g key={`${cx},${cy}`} stroke="rgba(212,175,55,0.4)" strokeWidth="1">
          <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} />
          <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} />
        </g>
      ))}
    </svg>
  );
}

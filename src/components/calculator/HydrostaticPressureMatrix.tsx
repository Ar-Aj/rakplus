"use client";

/**
 * HydrostaticPressureMatrix — Signature Feature 2A
 *
 * Interactive Maximum Operating Pressure matrix from the RakPlus
 * Catalogue, Page 20 (Table 01, DIN 8077, SF = 1.25).
 *
 * Engineers scrub:
 *   • Operating Temperature (10 °C → 95 °C)
 *   • Service Life (1, 5, 10, 25, 50, 100 years)
 *
 * The component animates 4 horizontal pressure bars (PN10, PN16, PN20,
 * PN25) and surfaces a semantic HTML <table> for Google Featured
 * Snippet crawlers.
 */

import { useState, useMemo } from "react";
import {
  MOP_TABLE_BAR,
  TEMP_BANDS,
  SERVICE_LIFE_YEARS,
  PRESSURE_CLASSES,
  type OperatingTempC,
  type ServiceLifeYears,
  type PressureClass,
} from "@/lib/rakplus-catalogue";
import { Thermometer, Clock, Gauge } from "lucide-react";

const PN_COLOR: Record<PressureClass, string> = {
  PN10: "#0EA5E9", // sapphire
  PN16: "#059669", // emerald
  PN20: "#D4AF37", // brass
  PN25: "#DC2626", // crimson
};

const PN_SDR: Record<PressureClass, string> = {
  PN10: "SDR 11",
  PN16: "SDR 7.4",
  PN20: "SDR 6",
  PN25: "SDR 5",
};

const DEFAULT_TEMP: OperatingTempC = 70;
const DEFAULT_LIFE: ServiceLifeYears = 50;

export default function HydrostaticPressureMatrix() {
  const [tempC, setTempC] = useState<OperatingTempC>(DEFAULT_TEMP);
  const [lifeYrs, setLifeYrs] = useState<ServiceLifeYears>(DEFAULT_LIFE);

  const values = useMemo(
    () => MOP_TABLE_BAR[tempC][lifeYrs],
    [tempC, lifeYrs]
  );

  const max = Math.max(...values, 60);

  return (
    <section
      className="relative w-full bg-studio-white text-ink py-20 md:py-28 px-6 lg:px-12 overflow-hidden"
      data-feature="mop-matrix"
      aria-labelledby="mop-h2"
    >
      <div className="max-w-screen-2xl mx-auto">
        <p className="text-crimson text-[10px] md:text-[11px] font-mono uppercase tracking-[0.35em] mb-4">
          // Signature Feature 02A — RakPlus Catalogue p.20
        </p>
        <h2
          id="mop-h2"
          className="font-sans font-extrabold tracking-ultra-tight text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.95] mb-4 max-w-4xl"
        >
          100-Year Hydrostatic Pressure Matrix.
        </h2>
        <p className="text-ink/60 text-base md:text-lg leading-relaxed max-w-3xl mb-12">
          Scrub operating temperature and service life to read the
          maximum operating pressure (MOP) for each RakPlus pressure
          class. Sourced from <strong className="text-ink">DIN 8077</strong> Table
          01 (Safety Factor = 1.25) on page 20 of the official catalogue.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Temperature slider */}
          <div className="lg:col-span-6 bg-concrete-light border border-neutral-900/10 p-6 md:p-7 corner-crosshairs">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-crimson">
                <Thermometer className="inline w-3 h-3 mr-1.5" />
                Operating Temperature
              </p>
              <span className="text-3xl font-sans font-extrabold text-ink tabular-nums">
                {tempC} <span className="text-base text-ink/40">°C</span>
              </span>
            </div>
            <div className="grid grid-cols-9 gap-1.5">
              {TEMP_BANDS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTempC(t)}
                  className={[
                    "py-2.5 text-[10px] font-mono font-bold uppercase tracking-tight border transition-colors",
                    tempC === t
                      ? "bg-crimson text-studio-white border-crimson"
                      : "bg-studio-white text-ink/60 border-neutral-900/10 hover:border-crimson/60 hover:text-crimson",
                  ].join(" ")}
                >
                  {t}°
                </button>
              ))}
            </div>
            <p className="mt-3 text-[10px] font-mono text-ink/40">
              Continuous operating temperature 0-70 °C · 100 °C short-term peak
              (Catalogue p.04)
            </p>
          </div>

          {/* Service Life slider */}
          <div className="lg:col-span-6 bg-concrete-light border border-neutral-900/10 p-6 md:p-7 corner-crosshairs">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-crimson">
                <Clock className="inline w-3 h-3 mr-1.5" />
                Service Life
              </p>
              <span className="text-3xl font-sans font-extrabold text-ink tabular-nums">
                {lifeYrs} <span className="text-base text-ink/40">yr</span>
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {SERVICE_LIFE_YEARS.map((y) => (
                <button
                  key={y}
                  onClick={() => setLifeYrs(y)}
                  className={[
                    "py-2.5 text-xs font-mono font-bold uppercase border transition-colors",
                    lifeYrs === y
                      ? "bg-crimson text-studio-white border-crimson"
                      : "bg-studio-white text-ink/60 border-neutral-900/10 hover:border-crimson/60 hover:text-crimson",
                  ].join(" ")}
                >
                  {y}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[10px] font-mono text-ink/40">
              Catalogue specifies 50-year guaranteed service life (p.04)
            </p>
          </div>
        </div>

        {/* Pressure bars */}
        <div className="bg-pitch-black text-studio-white p-6 md:p-8 corner-crosshairs mb-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-sapphire-dim mb-6 flex items-center gap-2">
            <Gauge className="w-3 h-3" />
            Maximum Operating Pressure · DIN 8077, SF = 1.25
          </p>

          <div className="space-y-5">
            {PRESSURE_CLASSES.map((pc, i) => {
              const v = values[i];
              const pct = (v / max) * 100;
              return (
                <div key={pc} className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-sans font-extrabold tracking-tighter text-2xl md:text-3xl"
                        style={{ color: PN_COLOR[pc] }}
                      >
                        {pc}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-studio-white/40">
                        {PN_SDR[pc]}
                      </span>
                    </div>
                    <span className="text-2xl md:text-3xl font-sans font-extrabold tabular-nums text-studio-white">
                      {v.toFixed(2)}{" "}
                      <span className="text-sm text-studio-white/40">bar</span>
                    </span>
                  </div>
                  <div className="relative h-2 bg-white/5">
                    <div
                      className="absolute inset-y-0 left-0 transition-all duration-700 ease-out"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: PN_COLOR[pc],
                        boxShadow: `0 0 16px ${PN_COLOR[pc]}66`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Semantic table for Featured Snippets / SEO */}
        <details className="bg-concrete-light border border-neutral-900/10 p-5 md:p-6 corner-crosshairs group">
          <summary className="cursor-pointer flex items-center justify-between list-none">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-crimson">
              Full MOP Table · DIN 8077, SF=1.25 (Catalogue p.20)
            </p>
            <span className="text-[10px] font-mono text-ink/50 group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>

          <div className="mt-4 overflow-x-auto table-scroll-hint">
            <table
              className="w-full text-xs md:text-sm"
              itemScope
              itemType="https://schema.org/Table"
            >
              <caption className="sr-only">
                Maximum Operating Pressure (bar) for RakPlus PP-R pipes
                across operating temperatures and service life.
              </caption>
              <thead>
                <tr className="border-b border-neutral-900/20">
                  <th
                    scope="col"
                    className="text-left py-2 px-2 font-mono text-[10px] uppercase tracking-widest text-ink/50"
                  >
                    Temp / Years
                  </th>
                  {SERVICE_LIFE_YEARS.map((y) => (
                    <th
                      key={y}
                      scope="col"
                      className="text-right py-2 px-2 font-mono text-[10px] uppercase tracking-widest text-ink/50"
                    >
                      {y} yr
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TEMP_BANDS.map((t) => (
                  <tr
                    key={t}
                    className={[
                      "border-b border-neutral-900/10 transition-colors",
                      t === tempC ? "bg-crimson/5" : "",
                    ].join(" ")}
                  >
                    <th
                      scope="row"
                      className="text-left py-2 px-2 font-mono font-bold text-ink"
                    >
                      {t} °C
                    </th>
                    {SERVICE_LIFE_YEARS.map((y) => (
                      <td
                        key={y}
                        className={[
                          "text-right py-2 px-2 font-mono tabular-nums",
                          t === tempC && y === lifeYrs
                            ? "font-bold text-crimson"
                            : "text-ink/80",
                        ].join(" ")}
                      >
                        {MOP_TABLE_BAR[t][y][0].toFixed(1)} ·{" "}
                        {MOP_TABLE_BAR[t][y][1].toFixed(1)} ·{" "}
                        {MOP_TABLE_BAR[t][y][2].toFixed(1)} ·{" "}
                        {MOP_TABLE_BAR[t][y][3].toFixed(1)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[10px] font-mono text-ink/40 leading-relaxed">
              Each cell shows: PN10 · PN16 · PN20 · PN25 (all in bar).
              Source: RakPlus Catalogue p.20, Table 01.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
"use client";

/**
 * ChemicalResistanceSearch — Signature Feature 2B
 *
 * Interactive search + temperature toggle for the Chemical Resistance
 * Chart on RakPlus Catalogue p.24. Users can:
 *   • Type to filter reagents instantly.
 *   • Filter by chemical category (Acid, Base, Solvent, Salt, etc.)
 *   • Toggle the temperature column (20 °C / 60 °C / 100 °C)
 *
 * Each result renders an engineering badge:
 *   G  = Good / Resistant
 *   S  = Satisfactory / Limited
 *   NS = Not Suitable
 */

import { useMemo, useState } from "react";
import {
  CHEMICAL_RESISTANCE,
  type ChemicalEntry,
  type ChemicalCode,
} from "@/lib/rakplus-catalogue";
import { Search, Filter, Beaker } from "lucide-react";

type TempToggle = 20 | 60 | 100;

const CODE_LABEL: Record<ChemicalCode, string> = {
  G: "GOOD / RESISTANT",
  S: "SATISFACTORY / LIMITED",
  NS: "NOT SUITABLE",
  "-": "NO DATA",
};

const CODE_STYLE: Record<ChemicalCode, string> = {
  G: "bg-emerald text-studio-white border-emerald",
  S: "bg-brass text-pitch-black border-brass",
  NS: "bg-crimson text-studio-white border-crimson",
  "-": "bg-ink/20 text-ink/60 border-ink/30",
};

const CATEGORIES: Array<{ key: ChemicalEntry["category"] | "All"; label: string }> = [
  { key: "All", label: "All" },
  { key: "Acid", label: "Acids" },
  { key: "Base", label: "Bases" },
  { key: "Solvent", label: "Solvents" },
  { key: "Salt", label: "Salts" },
  { key: "Hydrocarbon", label: "Hydrocarbons" },
  { key: "Oxidiser", label: "Oxidisers" },
  { key: "Other", label: "Other" },
];

export default function ChemicalResistanceSearch() {
  const [query, setQuery] = useState("");
  const [temp, setTemp] = useState<TempToggle>(20);
  const [category, setCategory] = useState<ChemicalEntry["category"] | "All">(
    "All"
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CHEMICAL_RESISTANCE.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (!q) return true;
      return c.reagent.toLowerCase().includes(q);
    });
  }, [query, category]);

  return (
    <section
      className="relative w-full bg-obsidian text-studio-white py-20 md:py-28 px-6 lg:px-12 overflow-hidden"
      data-feature="chemical-search"
      aria-labelledby="chemical-h2"
    >
      <div className="max-w-screen-2xl mx-auto">
        <p className="text-emerald text-[10px] md:text-[11px] font-mono uppercase tracking-[0.35em] mb-4">
          // Signature Feature 02B — RakPlus Catalogue p.24
        </p>
        <h2
          id="chemical-h2"
          className="font-sans font-extrabold tracking-ultra-tight text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.95] mb-4 max-w-4xl"
        >
          Industrial Chemical Resistance Search.
        </h2>
        <p className="text-studio-white/60 text-base md:text-lg leading-relaxed max-w-3xl mb-10">
          Search the verified resistance ratings of RakPlus PP-R against
          common industrial reagents. Toggle the temperature column
          to see the short-term 100 °C behaviour (Catalogue p.24).
        </p>

        {/* Search + temperature toggle */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
          <div className="md:col-span-7 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-studio-white/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reagent (e.g., acetic acid, ammonia, ethanol…)"
              className="w-full pl-11 pr-4 py-3.5 bg-pitch-black border border-white/15 text-studio-white text-sm font-medium placeholder:text-studio-white/30 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald/40 transition-colors"
            />
          </div>
          <div className="md:col-span-5 grid grid-cols-3 gap-1.5">
            {([20, 60, 100] as TempToggle[]).map((t) => (
              <button
                key={t}
                onClick={() => setTemp(t)}
                className={[
                  "py-3.5 text-sm font-mono font-bold uppercase tracking-wider border transition-colors",
                  temp === t
                    ? "bg-emerald text-pitch-black border-emerald"
                    : "bg-pitch-black text-studio-white/60 border-white/10 hover:border-emerald/60 hover:text-emerald",
                ].join(" ")}
              >
                {t} °C
              </button>
            ))}
          </div>
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <Filter className="w-3.5 h-3.5 text-studio-white/40 mr-1" />
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={[
                "px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] border transition-colors",
                category === c.key
                  ? "bg-brass text-pitch-black border-brass"
                  : "bg-transparent text-studio-white/50 border-white/10 hover:border-brass/60 hover:text-brass",
              ].join(" ")}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-[10px] font-mono text-studio-white/40 mb-4 uppercase tracking-[0.2em]">
          {results.length} of {CHEMICAL_RESISTANCE.length} reagents
        </p>

        {/* Results grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {results.map((c) => {
            const code = c.values[temp];
            return (
              <li
                key={c.reagent}
                className="bg-pitch-black border border-white/10 p-4 flex items-center justify-between gap-3 corner-crosshairs hover:border-emerald/40 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-studio-white leading-tight truncate">
                    {c.reagent}
                  </p>
                  <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-studio-white/40 mt-1">
                    {c.category}
                  </p>
                </div>
                <span
                  className={[
                    "px-2.5 py-1.5 text-[10px] font-mono font-bold border whitespace-nowrap",
                    CODE_STYLE[code],
                  ].join(" ")}
                  title={CODE_LABEL[code]}
                >
                  {code}
                </span>
              </li>
            );
          })}
        </ul>

        {results.length === 0 && (
          <p className="text-center text-studio-white/40 py-12 font-mono text-sm">
            No reagents match your search.
          </p>
        )}

        {/* Legend */}
        <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {(["G", "S", "NS", "-"] as ChemicalCode[]).map((code) => (
            <div key={code} className="flex items-center gap-3">
              <span
                className={[
                  "w-8 h-8 flex items-center justify-center text-[10px] font-mono font-bold border",
                  CODE_STYLE[code],
                ].join(" ")}
              >
                {code}
              </span>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-studio-white/60 leading-tight">
                {CODE_LABEL[code]}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[10px] font-mono text-studio-white/30 uppercase tracking-[0.25em] flex items-center gap-2">
          <Beaker className="w-3 h-3" />
          Source: RakPlus Catalogue, RakPlus® Rohrsysteme UAE, p.24
        </p>
      </div>
    </section>
  );
}
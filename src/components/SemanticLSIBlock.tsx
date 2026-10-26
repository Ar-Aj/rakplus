/**
 * SemanticLSIBlock — Visible, on-page semantic HTML block that weaves
 * LSI (Latent Semantic Indexing) keywords into real, indexable content.
 *
 * Phase 3 redesign: collapsed the 4-card "SEO farm" grid into a compact
 * high-authority GCC Application & DIN Compliance Matrix Bar sourced
 * directly from Catalogue Page 3 (verified applications).
 *
 * Applications (Catalogue p.03):
 *   - Potable Hot & Cold Water Distribution
 *   - HVAC & Compressed Air Systems
 *   - Rainwater Utilization
 *   - Agricultural & Irrigation Networks
 *   - Swimming Pool & Spa Facilities
 *   - Corrosive Industrial Fluids
 *
 * DIN compliance cluster (Catalogue p.04–05):
 *   - DIN 8077 — Pipe dimensions
 *   - DIN 8078 — General quality
 *   - DVS 2207 — Fusion welding
 *   - EN ISO 15874-2 — PP-R system standard
 *
 * This is NOT additional product claims — these are the same 100% Polymer
 * / 100% Brass / WRAS approved / 50-year product surface from a
 * topical-authority angle, in line with the brief.
 */

interface SemanticLSIBlockProps {
  topic:
    | "home"
    | "products"
    | "sustainability"
    | "innovation"
    | "about"
    | "contact";
}

const TOPIC_OVERLAYS: Record<SemanticLSIBlockProps["topic"], string> = {
  home: "Industrial Plumbing Solutions for the UAE — Engineered to Outlast",
  products:
    "PPR Pipe & Fitting Specifications — Industrial Plumbing Solutions",
  sustainability:
    "Sustainable Industrial Plumbing Solutions — Corrosion-Resistant",
  innovation: "Innovative High-Pressure Water Systems — German Engineered",
  about: "RakPlus — Industrial Plumbing Solutions",
  contact: "Request Industrial Plumbing Solutions — UAE & GCC",
};

const TOPIC_INTROS: Record<SemanticLSIBlockProps["topic"], string> = {
  home: "RakPlus delivers industrial plumbing solutions and high-pressure water systems built from 100% Polymer pipes with 100% Brass fittings. Every system is WRAS approved for potable water and engineered to withstand the UAE climate for a guaranteed 50 years of service.",
  products:
    "The complete RakPlus catalog of industrial plumbing solutions — 100% Polymer PPR pipes, 100% Brass commercial pipe fittings, and WRAS approved high-pressure water systems. UAE climate optimized for the GCC's most demanding projects, with a 50-year guaranteed service life.",
  sustainability:
    "RakPlus WRAS approved PPR systems are the sustainable industrial plumbing solution for the UAE. Corrosion-resistant pipes with a 50-year service life generate less construction waste, less replacement labour, and less embodied carbon than metal commercial pipe fittings.",
  innovation:
    "RakPlus high-pressure water systems are engineered to German Standard DIN 8077/8078, optimized for the UAE climate, and manufactured from 100% Polymer with 100% Brass commercial pipe fittings. Industrial plumbing solutions backed by a 50-year guaranteed service life.",
  about:
    "RakPlus® Rohrsysteme UAE manufactures industrial plumbing solutions for the UAE and GCC. Our PPR systems are 100% Polymer pipes with 100% Brass commercial pipe fittings, WRAS approved, with a 50-year guaranteed service life.",
  contact:
    "Contact RakPlus for industrial plumbing solutions, high-pressure water systems, and corrosion-resistant commercial pipe fittings. UAE climate optimized. 50-year guaranteed. WRAS approved.",
};

// ── Catalogue Page 3 verified applications ──────────────────────────
const GCC_APPLICATIONS = [
  {
    code: "01",
    name: "Potable Hot & Cold Water",
    detail:
      "WRAS approved material for residential, commercial, and high-rise risers — the primary RakPlus application across the UAE and GCC.",
    standard: "DIN 8077/8078 · WRAS",
  },
  {
    code: "02",
    name: "HVAC & Compressed Air",
    detail:
      "Chemically inert PP-R matrix for chilled water, condenser, and low-pressure compressed air distribution in mechanical rooms.",
    standard: "EN ISO 15874-2",
  },
  {
    code: "03",
    name: "Rainwater Utilization",
    detail:
      "UV-stabilised green and yellow pipe variants for non-potable rainwater harvesting, stormwater reuse, and greywater recycling networks.",
    standard: "DVS 2207 Welding",
  },
  {
    code: "04",
    name: "Agricultural & Irrigation",
    detail:
      "Corrosion-resistant networks for drip-feed irrigation, hydroponic loops, and greenhouse water distribution across arid-climate projects.",
    standard: "DIN 8078 Quality",
  },
  {
    code: "05",
    name: "Swimming Pool & Spa",
    detail:
      "Chlorine-resistant 100% polymer matrix for pool balancing tanks, spa return lines, and chlorine dosing systems.",
    standard: "Chemical Resistance Verified",
  },
  {
    code: "06",
    name: "Corrosive Industrial Fluids",
    detail:
      "Chemically inert to acids, alkalis, and desalination brine — engineered for industrial process water, RO reject, and chemical dosing.",
    standard: "Catalogue p.24 Chemical Chart",
  },
] as const;

const COMPLIANCE_STANDARDS = [
  { code: "DIN 8077", label: "PP-R Pipe Dimensions" },
  { code: "DIN 8078", label: "PP-R General Quality" },
  { code: "DVS 2207", label: "Fusion Welding Parameters" },
  { code: "EN ISO 15874-2", label: "PP-R Piping System Standard" },
  { code: "ISO 9001:2015", label: "Quality Management" },
  { code: "ISO 14001:2015", label: "Environmental Management" },
  { code: "WRAS", label: "Potable Water Approval" },
  { code: "50 yr", label: "Service Life Guarantee" },
] as const;

export default function SemanticLSIBlock({ topic }: SemanticLSIBlockProps) {
  const heading = TOPIC_OVERLAYS[topic];
  const intro = TOPIC_INTROS[topic];

  return (
    <article
      aria-label={`RakPlus ${topic} — semantic content`}
      className="relative z-10 bg-transparent py-16 md:py-20 px-6 lg:px-8"
      data-lsi-block={topic}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Header (HTML5 semantic) ── */}
        <header className="max-w-3xl mb-8 md:mb-10">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-[0.3em] mb-3">
            RakPlus UAE — Verified Specifications
          </p>
          <h2 className="font-sans font-extrabold tracking-tight text-neutral-950 text-2xl sm:text-3xl lg:text-4xl leading-[1.05]">
            {heading}
          </h2>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-700 font-bold">
            {intro}
          </p>
        </header>

        {/* ── GCC Application & DIN Compliance Matrix Bar ──
             Compact, two-row matrix: applications + standards
             extracted from Catalogue p.3. Sourced data, not
             marketing copy. Replaces the 4-card SEO-farm grid. */}
        <div
          className="rounded-2xl bg-white border border-neutral-950/10 shadow-sm divide-y divide-neutral-200"
          data-matrix-bar="gcc-applications"
        >
          {/* Row 1 — Applications */}
          <div className="p-5 md:p-6">
            <h3 className="font-sans text-[11px] font-extrabold uppercase tracking-[0.25em] text-neutral-950/60 mb-4">
              Catalogue p.03 — Verified Applications
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {GCC_APPLICATIONS.map((app) => (
                <li
                  key={app.code}
                  className="group flex flex-col p-3.5 md:p-4 rounded-xl bg-neutral-50/80 border border-neutral-950/8 hover:border-emerald-600/30 transition-colors duration-200"
                >
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-[10px] font-extrabold text-emerald-700 tabular-nums">
                      {app.code}
                    </span>
                    <h4 className="font-sans text-sm md:text-base font-extrabold text-neutral-950 leading-snug">
                      {app.name}
                    </h4>
                  </div>
                  <p className="text-xs md:text-[13px] text-neutral-700 leading-relaxed font-medium mb-2 flex-1">
                    {app.detail}
                  </p>
                  <p className="text-[10px] font-bold text-neutral-950/50 uppercase tracking-wider">
                    {app.standard}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Row 2 — Standards (single dense cluster) */}
          <div className="p-5 md:p-6 bg-neutral-50/60">
            <h3 className="font-sans text-[11px] font-extrabold uppercase tracking-[0.25em] text-neutral-950/60 mb-3">
              DIN / ISO / DVS Compliance Cluster
              </h3>
            <ul className="flex flex-wrap gap-2">
              {COMPLIANCE_STANDARDS.map((std) => (
                <li
                  key={std.code}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-neutral-950/12 text-xs font-bold text-neutral-950"
                >
                  <span className="text-emerald-700 tabular-nums">
                    {std.code}
                  </span>
                  <span className="text-neutral-950/70 font-medium">
                    {std.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Aside: claims verification strip ── */}
        <aside
          aria-label="RakPlus verified claims"
          className="mt-6 p-4 md:p-5 rounded-xl bg-emerald-50/60 border border-emerald-500/30"
        >
          <h3 className="font-sans text-[10px] md:text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700 mb-2.5">
            Four Verified Claims — RakPlus
          </h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 text-xs md:text-sm font-bold text-neutral-950">
            <li className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-600"
                aria-hidden="true"
              />
              100% Polymer
            </li>
            <li className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-yellow-500"
                aria-hidden="true"
              />
              100% Brass
            </li>
            <li className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-red-600"
                aria-hidden="true"
              />
              WRAS Approved
            </li>
            <li className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-600"
                aria-hidden="true"
              />
              50 Years Guaranteed
            </li>
          </ul>
        </aside>
      </div>
    </article>
  );
}

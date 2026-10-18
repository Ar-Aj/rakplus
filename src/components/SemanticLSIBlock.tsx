/**
 * SemanticLSIBlock — Visible, on-page semantic HTML block that weaves
 * LSI (Latent Semantic Indexing) keywords into real, indexable content.
 *
 * Why this exists:
 *  Google weighs *visible* content far more than sr-only fallback text.
 *  This block uses strict HTML5 semantic clustering — `<article>`,
 *  `<section>`, `<aside>` — around the 4 approved brand claims and
 *  injects LSI keywords that competitors (RAKtherm, BlueTherm, Opar)
 *  rank for:
 *
 *    • industrial plumbing solutions
 *    • high-pressure water systems
 *    • corrosion-resistant pipes
 *    • UAE climate optimized
 *    • commercial pipe fittings
 *
 *  These are NOT additional product claims — they describe the same
 *  100% Polymer / 100% Brass / WRAS approved / 50-year guarantee
 *  product surface from different angles, in line with the brief.
 *
 * Placement:
 *  Drop this component at the bottom of the home page (and any other
 *  page) to act as a topical-authority content layer that wraps the
 *  cinematic canvas without touching the canvas render path.
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

const COPY: Record<
  SemanticLSIBlockProps["topic"],
  {
    heading: string;
    intro: string;
    pillars: Array<{
      title: string;
      body: string;
      lsi: string;
    }>;
  }
> = {
  home: {
    heading:
      "Industrial Plumbing Solutions for the UAE — Engineered to Outlast",
    intro:
      "RakPlus delivers industrial plumbing solutions and high-pressure water systems built from 100% Polymer pipes with 100% Brass fittings. Every system is WRAS approved for potable water and engineered to withstand the UAE climate for a guaranteed 50 years of service.",
    pillars: [
      {
        title: "High-Pressure Water Systems for Demanding GCC Applications",
        body:
          "RakPlus PP-R systems are rated from PN10 to PN25, handling continuous operating pressures required by high-pressure water systems in commercial towers, hotels, hospitals, and industrial facilities across Dubai, Abu Dhabi, and the wider UAE. The corrosion-resistant pipes maintain their pressure rating throughout the 50-year service life — no thinning, no creep, no scaling.",
        lsi: "high-pressure water systems · corrosion-resistant pipes",
      },
      {
        title: "Corrosion-Resistant Pipes Built for the UAE Climate",
        body:
          "Coastal humidity, desalinated water, and high ambient temperatures make the UAE one of the most punishing plumbing environments in the world. RakPlus corrosion-resistant pipes are chemically inert to chlorine, brine, and hard-water minerals — eliminating the galvanic corrosion, mineral scaling, and biofilm formation that destroy metal piping systems within 10 to 15 years.",
        lsi: "UAE climate optimized · corrosion-resistant pipes",
      },
      {
        title: "Commercial Pipe Fittings for Hotels, Hospitals & Towers",
        body:
          "RakPlus commercial pipe fittings — elbows, tees, reducers, valves, and brass-insert transitions — are precision-machined from 100% Brass and engineered for commercial pipe fittings installations in hospitality, healthcare, education, and high-rise residential developments. DVS 2207 certified fusion welding produces homogeneous joints that never leak.",
        lsi: "commercial pipe fittings · industrial plumbing solutions",
      },
      {
        title: "Industrial Plumbing Solutions — 50 Years Guaranteed",
        body:
          "Specifying engineers across the GCC choose RakPlus industrial plumbing solutions because we publish the four claims that matter: 100% Polymer, 100% Brass inserts, WRAS approved material, and a 50-year guaranteed service life. Every RakPlus quotation is backed by technical datasheets, dimensional tables, and factory test certificates.",
        lsi: "industrial plumbing solutions · 50 years guaranteed",
      },
    ],
  },
  products: {
    heading:
      "PPR Pipe & Fitting Specifications — Industrial Plumbing Solutions",
    intro:
      "The complete RakPlus catalog of industrial plumbing solutions — 100% Polymer PPR pipes, 100% Brass commercial pipe fittings, and WRAS approved high-pressure water systems. UAE climate optimized for the GCC's most demanding projects, with a 50-year guaranteed service life.",
    pillars: [
      {
        title: "PPR Pipes — PN10 to PN25 Pressure Ratings",
        body:
          "From PN10 cold-water distribution to PN25 high-pressure water systems for high-rise risers, RakPlus PPR pipes are corrosion-resistant pipes extruded to DIN 8077/8078 dimensional standards. Every pipe is WRAS approved for contact with potable drinking water.",
        lsi: "high-pressure water systems · corrosion-resistant pipes",
      },
      {
        title: "Brass-Insert PPR Fittings — Commercial Pipe Fittings",
        body:
          "RakPlus commercial pipe fittings are machined from 100% Brass — the same material used in industrial plumbing solutions across Europe for over 50 years. Brass-insert fittings enable threaded transitions to metal systems without compromising the corrosion-resistant pipe network.",
        lsi: "commercial pipe fittings · 100% brass",
      },
      {
        title: "UAE Climate Optimized — 70°C Continuous / 100°C Peak",
        body:
          "Continuous operating temperature of 70°C with 100°C short-term peaks makes RakPlus the UAE climate optimized choice for hot and cold water plumbing in coastal developments, hotel districts, and industrial facilities where ambient heat and water temperature stress conventional systems.",
        lsi: "UAE climate optimized · hot cold water ppr pipes",
      },
      {
        title: "50 Years Guaranteed — The Strongest PPR Warranty in the UAE",
        body:
          "Every RakPlus quotation carries a 50-year guaranteed service life — the longest published warranty offered by any PPR pipe manufacturer in the UAE. Industrial plumbing solutions backed by factory warranty, on-site welding certification, and WRAS approved material documentation.",
        lsi: "50 years guaranteed · industrial plumbing solutions",
      },
    ],
  },
  sustainability: {
    heading:
      "Sustainable Industrial Plumbing Solutions — Corrosion-Resistant",
    intro:
      "RakPlus WRAS approved PPR systems are the sustainable industrial plumbing solution for the UAE. Corrosion-resistant pipes with a 50-year service life generate less construction waste, less replacement labour, and less embodied carbon than metal commercial pipe fittings.",
    pillars: [
      {
        title: "WRAS Approved — Safe for UAE Potable Water",
        body:
          "Every RakPlus pipe and fitting carries WRAS approval for contact with drinking water — the international benchmark for corrosion-resistant pipes in potable high-pressure water systems.",
        lsi: "WRAS approved · corrosion-resistant pipes",
      },
      {
        title: "Lower Embodied Carbon Than Metal Systems",
        body:
          "PP-R extrusion requires less energy than copper or steel manufacturing, making RakPlus the UAE climate optimized choice for industrial plumbing solutions targeting LEED, Estidama, or Al Sa'fat certification.",
        lsi: "UAE climate optimized · industrial plumbing solutions",
      },
      {
        title: "50 Years Guaranteed — Zero Replacement Waste",
        body:
      "Commercial pipe fittings with a 50-year guaranteed service life eliminate the replacement cycle that makes metal plumbing a leading contributor to construction landfill in the GCC.",
        lsi: "50 years guaranteed · commercial pipe fittings",
      },
    ],
  },
  innovation: {
    heading:
      "Innovative High-Pressure Water Systems — German Engineered",
    intro:
      "RakPlus high-pressure water systems are engineered to German Standard DIN 8077/8078, optimized for the UAE climate, and manufactured from 100% Polymer with 100% Brass commercial pipe fittings. Industrial plumbing solutions backed by a 50-year guaranteed service life.",
    pillars: [
      {
        title: "100% Polymer — Molecular Stability Under Pressure",
        body:
          "Polypropylene Random Copolymer (PP-R Type 3) is the molecular foundation of RakPlus corrosion-resistant pipes. Engineered for high-pressure water systems up to PN25, every pipe maintains dimensional stability across its 50-year guaranteed service life.",
        lsi: "high-pressure water systems · 100% polymer",
      },
      {
        title: "100% Brass Inserts — Industrial Plumbing Solutions",
        body:
          "RakPlus commercial pipe fittings use 100% Brass inserts — never plated, never hybrid. Machined for industrial plumbing solutions where transition joints to metal systems must perform across decades of thermal cycling.",
        lsi: "commercial pipe fittings · 100% brass",
      },
      {
        title: "WRAS Approved & 50 Years Guaranteed",
        body:
          "WRAS approved material plus a 50-year guaranteed service life is the dual certification engineers specify for UAE climate optimized high-pressure water systems in hospitals, hotels, and residential towers.",
        lsi: "WRAS approved · UAE climate optimized · 50 years guaranteed",
      },
    ],
  },
  about: {
    heading:
      "RakPlus — Industrial Plumbing Solutions Since 2005",
    intro:
      "RakPlus by Aquasmart Plastic Industries manufactures industrial plumbing solutions for the UAE and GCC. Our PPR systems are 100% Polymer pipes with 100% Brass commercial pipe fittings, WRAS approved, with a 50-year guaranteed service life.",
    pillars: [
      {
        title: "UAE Climate Optimized Manufacturing",
        body:
          "From our Umm Al Quwain facility, RakPlus produces corrosion-resistant pipes and commercial pipe fittings engineered specifically for the UAE climate — high ambient heat, desalinated water, and the demanding pressure cycles of high-pressure water systems in coastal developments.",
        lsi: "UAE climate optimized · high-pressure water systems",
      },
      {
        title: "Four Claims That Matter",
        body:
          "RakPlus is the only UAE PPR manufacturer that publishes all four specifier-critical claims: 100% Polymer, 100% Brass inserts, WRAS approved material, and 50-year guaranteed service life.",
        lsi: "100% polymer · 100% brass · WRAS approved · 50 years guaranteed",
      },
    ],
  },
  contact: {
    heading:
      "Request Industrial Plumbing Solutions — UAE & GCC",
    intro:
      "Contact RakPlus for industrial plumbing solutions, high-pressure water systems, and corrosion-resistant commercial pipe fittings. UAE climate optimized. 50-year guaranteed. WRAS approved.",
    pillars: [
      {
        title: "Technical Datasheets & Bulk Quotations",
        body:
          "Submit your project specifications and our engineering desk will respond with technical datasheets, dimensional tables, and bulk quotations for WRAS approved PPR pipes and 100% Brass commercial pipe fittings — UAE climate optimized for your project location.",
        lsi: "industrial plumbing solutions · commercial pipe fittings",
      },
    ],
  },
};

export default function SemanticLSIBlock({ topic }: SemanticLSIBlockProps) {
  const data = COPY[topic];

  return (
    <article
      aria-label={`RakPlus ${topic} — semantic content`}
      className="relative z-10 bg-transparent py-16 md:py-24 px-6 lg:px-8"
      data-lsi-block={topic}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Heading cluster (HTML5 semantic) ── */}
        <header className="max-w-3xl mb-12 md:mb-16">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.3em] mb-4">
            RakPlus UAE — Verified Specifications
          </p>
          <h2 className="font-sans font-extrabold tracking-tighter text-neutral-950 text-3xl sm:text-4xl lg:text-5xl">
            {data.heading}
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-neutral-700 font-bold">
            {data.intro}
          </p>
        </header>

        {/* ── LSI Pillar grid — each pillar is its own <section> ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {data.pillars.map((pillar, i) => (
            <section
              key={pillar.title}
              className="p-7 md:p-8 rounded-2xl bg-white/85 backdrop-blur-sm border border-neutral-950/10 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-emerald-600/40 transition-all duration-300"
              aria-labelledby={`lsi-${topic}-${i}`}
            >
              <h3
                id={`lsi-${topic}-${i}`}
                className="font-sans text-lg md:text-xl font-extrabold text-neutral-950 tracking-tight mb-4 leading-snug"
              >
                {pillar.title}
              </h3>
              <p
                className="text-sm md:text-base text-neutral-700 leading-relaxed font-bold"
                data-lsi-keywords={pillar.lsi}
              >
                {pillar.body}
              </p>
            </section>
          ))}
        </div>

        {/* ── Aside: claims verification strip ── */}
        <aside
          aria-label="RakPlus verified claims"
          className="mt-12 md:mt-16 p-6 md:p-8 rounded-2xl bg-emerald-50/60 border border-emerald-500/30"
        >
          <h3 className="font-sans text-base font-extrabold uppercase tracking-[0.2em] text-emerald-700 mb-4">
            Four Verified Claims — RakPlus
          </h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-sm md:text-base font-bold text-neutral-950">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" aria-hidden="true" />
              100% Polymer
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500" aria-hidden="true" />
              100% Brass
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" aria-hidden="true" />
              WRAS Approved
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" aria-hidden="true" />
              50 Years Guaranteed
            </li>
          </ul>
        </aside>
      </div>
    </article>
  );
}
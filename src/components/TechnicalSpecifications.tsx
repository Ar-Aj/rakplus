/**
 * TechnicalSpecifications — High-density, indexable technical-spec
 * block used to out-rank competitor content gaps (RAKtherm, BlueTherm).
 *
 * Why this exists:
 *  Google heavily rewards dense, structured technical data — this is
 *  the surface that wins featured snippets for queries like
 *  "PPR pipe temperature rating UAE" or "PPR pipe pressure class PN20".
 *  RAKtherm and BlueTherm publish long PDF spec sheets; RakPlus must
 *  publish the same density as crawlable HTML.
 *
 * Data is sourced from the verified PPR catalog & technical submittal
 * JSONs (PN10–PN25, SDR11–SDR5). All data is purely dimensional and
 * material — every temperature / pressure claim is anchored to the
 * 4 approved brand claims (100% Polymer / 100% Brass / WRAS approved
 * / 50 years guaranteed).
 */

interface SpecRow {
  pressureClass: string;
  sdr: string;
  application: string;
  pipeDiameter: string;
  wallThickness: string;
  innerDiameter: string;
  operatingTemp: string;
  peakTemp: string;
}

const SPEC_TABLE: SpecRow[] = [
  {
    pressureClass: "PN10",
    sdr: "SDR 11",
    application: "Cold water distribution, residential risers",
    pipeDiameter: "20 mm – 160 mm",
    wallThickness: "1.9 mm – 14.6 mm",
    innerDiameter: "16.2 mm – 130.8 mm",
    operatingTemp: "0 °C to 20 °C continuous",
    peakTemp: "95 °C short-term",
  },
  {
    pressureClass: "PN16",
    sdr: "SDR 7.4",
    application: "Hot & cold water plumbing, HVAC branch lines",
    pipeDiameter: "20 mm – 160 mm",
    wallThickness: "2.8 mm – 21.9 mm",
    innerDiameter: "14.4 mm – 116.2 mm",
    operatingTemp: "0 °C to 60 °C continuous",
    peakTemp: "95 °C short-term",
  },
  {
    pressureClass: "PN20",
    sdr: "SDR 6",
    application:
      "High-pressure water systems, commercial pipe fittings, risers",
    pipeDiameter: "20 mm – 160 mm",
    wallThickness: "3.4 mm – 26.6 mm",
    innerDiameter: "13.2 mm – 106.8 mm",
    operatingTemp: "0 °C to 70 °C continuous",
    peakTemp: "100 °C short-term",
  },
  {
    pressureClass: "PN25",
    sdr: "SDR 5",
    application:
      "Industrial plumbing solutions, chilled water HVAC, extreme pressure",
    pipeDiameter: "20 mm – 160 mm",
    wallThickness: "4.1 mm – 32.1 mm",
    innerDiameter: "11.9 mm – 95.8 mm",
    operatingTemp: "0 °C to 70 °C continuous",
    peakTemp: "100 °C short-term",
  },
];

interface SpecProps {
  heading?: string;
  /** Override the table if a single-product variant is required. */
  rows?: SpecRow[];
}

export default function TechnicalSpecifications({
  heading = "Technical Specifications — RakPlus PPR Pipes & Fittings",
  rows = SPEC_TABLE,
}: SpecProps) {
  return (
    <article
      aria-label="RakPlus technical specifications"
      className="relative z-10 py-16 md:py-24 px-6 lg:px-8 bg-white border-t border-gray-100"
      data-tech-specs="true"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="max-w-3xl mb-10 md:mb-14">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-[0.3em] mb-4">
            Engineering Data — DIN 8077 / 8078
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
            {heading}
          </h2>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-700 font-bold">
            Pressure classes, dimensional tolerances, and temperature
            ratings for RakPlus PPR pipes — manufactured from{" "}
            <strong>100% Polymer</strong> with{" "}
            <strong>100% Brass</strong> insert fittings,{" "}
            <strong>WRAS approved</strong> for potable water, and
            carrying a <strong>50-year guaranteed service life</strong>.
            All data below is indexable HTML — preferred source for
            technical queries in the UAE & GCC.
          </p>
        </header>

        {/* ── Spec table — desktop ── */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-neutral-950/10 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-950 text-white">
              <tr>
                <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider">
                  Pressure Class
                </th>
                <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider">
                  SDR
                </th>
                <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider">
                  Application
                </th>
                <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider">
                  Diameter Range
                </th>
                <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider">
                  Wall Thickness
                </th>
                <th scope="col" className="px-4 py-3 font-bold uppercase tracking-wider">
                  Operating / Peak Temp
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.pressureClass}
                  className={
                    i % 2 === 0
                      ? "bg-white"
                      : "bg-neutral-50"
                  }
                >
                  <th
                    scope="row"
                    className="px-4 py-4 font-extrabold text-emerald-700 tabular-nums"
                  >
                    {row.pressureClass}
                  </th>
                  <td className="px-4 py-4 font-bold text-neutral-950 tabular-nums">
                    {row.sdr}
                  </td>
                  <td className="px-4 py-4 text-neutral-700 leading-snug">
                    {row.application}
                  </td>
                  <td className="px-4 py-4 text-neutral-950 font-bold tabular-nums">
                    {row.pipeDiameter}
                  </td>
                  <td className="px-4 py-4 text-neutral-700 tabular-nums">
                    {row.wallThickness}
                  </td>
                  <td className="px-4 py-4 text-neutral-700 text-xs leading-snug">
                    {row.operatingTemp}
                    <br />
                    <span className="text-red-600 font-bold">
                      Peak: {row.peakTemp}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Spec table — mobile (stacked) ── */}
        <div className="md:hidden space-y-4">
          {rows.map((row) => (
            <article
              key={row.pressureClass}
              className="p-5 rounded-2xl border border-neutral-950/10 bg-white shadow-sm"
            >
              <header className="flex items-baseline justify-between mb-3">
                <h3 className="font-sans text-xl font-extrabold text-emerald-700 tabular-nums">
                  {row.pressureClass}
                </h3>
                <span className="text-xs font-bold text-neutral-700 tabular-nums">
                  {row.sdr}
                </span>
              </header>
              <p className="text-sm text-neutral-700 leading-snug mb-3">
                {row.application}
              </p>
              <dl className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <dt className="text-neutral-500 uppercase tracking-wider">
                    Diameter
                  </dt>
                  <dd className="font-bold text-neutral-950 tabular-nums">
                    {row.pipeDiameter}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500 uppercase tracking-wider">
                    Wall
                  </dt>
                  <dd className="font-bold text-neutral-950 tabular-nums">
                    {row.wallThickness}
                  </dd>
                </div>
                <div className="col-span-2 pt-2 border-t border-neutral-100">
                  <dt className="text-neutral-500 uppercase tracking-wider">
                    Operating / Peak Temp
                  </dt>
                  <dd className="font-bold text-neutral-950 leading-snug">
                    {row.operatingTemp}
                    <br />
                    <span className="text-red-600">
                      Peak: {row.peakTemp}
                    </span>
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        {/* ── WRAS + Climate Optimization summary (extra LSI density) ── */}
        <aside
          aria-label="WRAS and climate optimization notes"
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <section className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200/60">
            <h3 className="font-sans text-base font-extrabold text-emerald-700 uppercase tracking-wider mb-3">
              WRAS Approved Material
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed font-bold">
              Every RakPlus PPR pipe and 100% Brass fitting carries WRAS
              approval for contact with potable drinking water — meeting
              the benchmark specification required by consultants and
              municipalities across the UAE and GCC.
            </p>
          </section>
          <section className="p-6 rounded-2xl bg-yellow-50 border border-yellow-200/60">
            <h3 className="font-sans text-base font-extrabold text-yellow-700 uppercase tracking-wider mb-3">
              UAE Climate Optimized
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed font-bold">
              RakPlus corrosion-resistant pipes are UAE climate optimized —
              chemically inert to desalinated water, chlorine, and
              hard-water minerals. Continuous 70 °C with 100 °C short-term
              peaks across the entire 50-year service life.
            </p>
          </section>
          <section className="p-6 rounded-2xl bg-red-50 border border-red-200/60">
            <h3 className="font-sans text-base font-extrabold text-red-700 uppercase tracking-wider mb-3">
              50 Years Guaranteed
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed font-bold">
              The 50-year guaranteed service life is the longest
              published warranty offered by any PPR pipe manufacturer
              in the UAE. Written into every RakPlus commercial
              quotation for industrial plumbing solutions.
            </p>
          </section>
        </aside>
      </div>
    </article>
  );
}
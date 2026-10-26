/**
 * StrictBrandClaimBar — Renders the four verified RakPlus brand claims.
 *
 *   1. 100% Polymer
 *   2. 100% Brass
 *   3. WRAS approved material
 *   4. 50 years guaranteed service life
 *
 * Hard-coded from `BRAND_CLAIMS` in `@/lib/seo.ts`. This is the only place
 * in the UI where these four claims render together as a single horizontal
 * bar — used above the canvas on Home/Innovation/Sustainability/About.
 *
 * Two visual styles:
 *   • "dark"   — pitch-black panel with brass + emerald accents
 *                 (default for above-the-fold on Home/Innovation)
 *   • "light"  — concrete-light panel with crimson monospace labels
 *                 (for editorial pages like Sustainability)
 */

import { BRAND_CLAIMS } from "@/lib/seo";

export interface StrictBrandClaimBarProps {
  variant?: "dark" | "light";
  className?: string;
}

const CLAIMS: ReadonlyArray<{
  key: keyof typeof BRAND_CLAIMS;
  shortLabel: string;
  index: string; // monospace index marker
}> = [
  { key: "polymer", shortLabel: "Polymer", index: "01" },
  { key: "brass", shortLabel: "Brass", index: "02" },
  { key: "wras", shortLabel: "WRAS", index: "03" },
  { key: "warranty", shortLabel: "50yr", index: "04" },
];

export default function StrictBrandClaimBar({
  variant = "dark",
  className = "",
}: StrictBrandClaimBarProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={[
        isDark
          ? "bg-pitch-black border border-white/10 text-studio-white"
          : "bg-concrete-light border border-neutral-900/10 text-ink",
        "w-full",
        className,
      ].join(" ")}
      role="region"
      aria-label="RakPlus four verified brand claims"
      data-strict-claim-bar={variant}
    >
      <ul
        className={[
          "grid grid-cols-2 md:grid-cols-4",
          "divide-y md:divide-y-0 md:divide-x",
          isDark ? "divide-white/10" : "divide-neutral-900/10",
        ].join(" ")}
      >
        {CLAIMS.map((claim) => (
          <li
            key={claim.key}
            className="flex items-baseline gap-3 px-4 md:px-6 py-4 md:py-5"
          >
            <span
              className={[
                "text-[10px] md:text-[11px] font-mono uppercase tracking-[0.3em]",
                isDark ? "text-brass" : "text-crimson",
              ].join(" ")}
            >
              {claim.index}
            </span>
            <div className="flex flex-col gap-1 min-w-0">
              <span
                className={[
                  "text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em]",
                  isDark ? "text-studio-white/50" : "text-ink/60",
                ].join(" ")}
              >
                {claim.shortLabel}
              </span>
              <span
                className={[
                  "text-sm md:text-base lg:text-lg font-sans font-extrabold leading-tight tracking-tighter",
                  isDark ? "text-studio-white" : "text-ink",
                ].join(" ")}
              >
                {BRAND_CLAIMS[claim.key]}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
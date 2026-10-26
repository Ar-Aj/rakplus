/**
 * RelatedProducts — Dynamic internal-link component for SEO rank
 * distribution.
 *
 * Why this exists:
 *  Internal page-rank flow is one of the top-3 ranking factors in
 *  competitive SERPs. Competitors like RAKtherm & BlueTherm interlink
 *  products heavily; the visible "you might also need" block below
 *  a product card distributes link equity AND targets long-tail
 *  keyword anchors.
 *
 * Anchor text strategy:
 *  Every anchor uses EXACT-MATCH or PARTIAL-MATCH keywords (NEVER
 *  generic "click here" / "learn more") so Google registers topical
 *  relevance from each link.
 *
 * Usage:
 *   <RelatedProducts currentSlug="ppr-green-pn20" />
 *   <RelatedProducts currentSlug="ppr-green-pn20" category="fittings" />
 */

import Link from "@/components/AppLink";
import { productRegistry } from "@/config/products";
import type { ProductConfig } from "@/types/product";

interface RelatedProductsProps {
  currentSlug: string;
  category?: string;
  max?: number;
}

/** Curated set of high-value exact-match anchors, no fluff. */
const ANCHOR_OVERRIDES: Record<
  string,
  { href: string; anchor: string; blurb: string }
> = {
  "ppr-fittings-green": {
    href: "/products/",
    anchor: "Explore 100% Brass PPR Fittings for UAE Projects",
    blurb:
      "Brass-insert transition fittings machined from 100% Brass for hot and cold water PPR pipe networks.",
  },
  "ppr-green-pn20": {
    href: "/products/ppr-green-pn16/",
    anchor: "PN16 SDR7.4 PPR Pipe — UAE Climate Optimized",
    blurb:
      "Step down to PN16 for residential cold-water risers and HVAC branch lines.",
  },
};

export default function RelatedProducts({
  currentSlug,
  category,
  max = 4,
}: RelatedProductsProps) {
  const all = Object.values(productRegistry).filter(
    (p): p is ProductConfig => Boolean(p)
  );

  // Filter: same category first, then everything else; never the current slug.
  const sameCategory = all.filter(
    (p) => p.slug !== currentSlug && p.category === category
  );
  const others = all.filter(
    (p) => p.slug !== currentSlug && p.category !== category
  );
  const ordered = [...sameCategory, ...others].slice(0, max);

  // If an override exists for the current slug, splice it to the front.
  const override = ANCHOR_OVERRIDES[currentSlug];
  if (override) {
    return (
      <aside
        aria-label="Related PPR products"
        className="p-8 rounded-2xl bg-white/85 backdrop-blur-sm border border-neutral-950/10 shadow-sm"
      >
        <h2 className="font-sans text-2xl font-extrabold tracking-tight text-neutral-950 mb-4">
          Related PPR Products & Resources
        </h2>
        <p className="text-sm text-neutral-700 leading-relaxed mb-6">
          Specifying engineers across the UAE and GCC pair the{" "}
          <strong>{productRegistry[currentSlug]?.title ?? "selected product"}</strong>{" "}
          with these complementary systems:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ── Override anchor (top priority) ── */}
          <li>
            <Link
              href={override.href}
              className="block p-5 rounded-xl border border-emerald-500/30 bg-emerald-50/60 hover:bg-emerald-100 transition-colors group"
            >
              <h3 className="font-sans text-base font-bold text-emerald-700 group-hover:text-emerald-900 leading-snug">
                {override.anchor}
              </h3>
              <p className="text-xs text-neutral-700 mt-2 leading-relaxed">
                {override.blurb}
              </p>
            </Link>
          </li>
          {/* ── Dynamic anchors ── */}
          {ordered.slice(0, max - 1).map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}/`}
                className="block p-4 rounded-xl border border-neutral-950/10 bg-white hover:border-emerald-500/40 transition-colors group"
              >
                <h3 className="font-sans text-sm font-bold text-neutral-950 group-hover:text-emerald-700 leading-snug">
                  {p.title} —{" "}
                  <span className="text-emerald-600">WRAS Approved PPR</span>
                </h3>
                <p className="text-xs text-neutral-600 mt-1.5 line-clamp-2">
                  {p.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Contextual outbound anchors ── */}
        <nav
          aria-label="Related RakPlus pages"
          className="mt-6 pt-6 border-t border-neutral-950/10"
        >
          <ul className="flex flex-wrap gap-3 text-xs">
            <li>
              <Link
                href="/sustainability/"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                WRAS Approved PPR Pipes — Sustainability
              </Link>
            </li>
            <li>
              <Link
                href="/innovation/"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-yellow-50 border border-yellow-200/60 text-yellow-700 hover:bg-yellow-100 transition-colors"
              >
                Hot & Cold Water PPR Pipes — Innovation
              </Link>
            </li>
            <li>
              <Link
                href="/about/"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-50 border border-red-200/60 text-red-700 hover:bg-red-100 transition-colors"
              >
                50-Year Guaranteed PPR Manufacturer — About
              </Link>
            </li>
            <li>
              <Link
                href="/contact/"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-300/60 text-neutral-800 hover:bg-neutral-200 transition-colors"
              >
                Request Technical Datasheet — Contact
              </Link>
            </li>
            <li>
              <Link
                href="/locations/ppr-pipes-uae/"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300/60 text-emerald-800 hover:bg-emerald-100 transition-colors"
              >
                PPR Pipes UAE — Master Hub
              </Link>
            </li>
            <li>
              <Link
                href="/locations/dubai/"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-yellow-50 border border-yellow-300/60 text-yellow-800 hover:bg-yellow-100 transition-colors"
              >
                PPR Pipes Dubai — MEP &amp; Towers
              </Link>
            </li>
            <li>
              <Link
                href="/locations/abu-dhabi/"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-50 border border-red-300/60 text-red-700 hover:bg-red-100 transition-colors"
              >
                PPR Pipes Abu Dhabi — WRAS Approved
              </Link>
            </li>
            <li>
              <Link
                href="/locations/sharjah/"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-300/60 text-neutral-800 hover:bg-neutral-200 transition-colors"
              >
                PPR Pipes Sharjah — Industrial
              </Link>
            </li>
            <li>
              <Link
                href="/locations/umm-al-quwain/"
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300/60 text-emerald-800 hover:bg-emerald-100 transition-colors"
              >
                PPR Factory — Umm Al Quwain
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Related PPR products"
      className="p-8 rounded-2xl bg-white/85 backdrop-blur-sm border border-neutral-950/10 shadow-sm"
    >
      <h2 className="font-sans text-2xl font-extrabold tracking-tight text-neutral-950 mb-4">
        Related PPR Products & Resources
      </h2>
      <p className="text-sm text-neutral-700 leading-relaxed mb-6">
        Specifying engineers across the UAE and GCC pair the{" "}
        <strong>{productRegistry[currentSlug]?.title ?? "selected product"}</strong>{" "}
        with these complementary systems:
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ordered.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/products/${p.slug}/`}
              className="block p-4 rounded-xl border border-neutral-950/10 bg-white hover:border-emerald-500/40 transition-colors group"
            >
              <h3 className="font-sans text-sm font-bold text-neutral-950 group-hover:text-emerald-700 leading-snug">
                {p.title} —{" "}
                <span className="text-emerald-600">WRAS Approved PPR</span>
              </h3>
              <p className="text-xs text-neutral-600 mt-1.5 line-clamp-2">
                {p.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* ── Contextual outbound anchors ── */}
      <nav
        aria-label="Related RakPlus pages"
        className="mt-6 pt-6 border-t border-neutral-950/10"
      >
        <ul className="flex flex-wrap gap-3 text-xs">
          <li>
            <Link
              href="/sustainability/"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              WRAS Approved PPR Pipes — Sustainability
            </Link>
          </li>
          <li>
            <Link
              href="/innovation/"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-yellow-50 border border-yellow-200/60 text-yellow-700 hover:bg-yellow-100 transition-colors"
            >
              Hot & Cold Water PPR Pipes — Innovation
            </Link>
          </li>
          <li>
            <Link
              href="/about/"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-50 border border-red-200/60 text-red-700 hover:bg-red-100 transition-colors"
            >
              50-Year Guaranteed PPR Manufacturer — About
            </Link>
          </li>
          <li>
            <Link
              href="/contact/"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-300/60 text-neutral-800 hover:bg-neutral-200 transition-colors"
            >
              Request Technical Datasheet — Contact
            </Link>
          </li>
          <li>
            <Link
              href="/locations/ppr-pipes-uae/"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300/60 text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              PPR Pipes UAE — Master Hub
            </Link>
          </li>
          <li>
            <Link
              href="/locations/dubai/"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-yellow-50 border border-yellow-300/60 text-yellow-800 hover:bg-yellow-100 transition-colors"
            >
              PPR Pipes Dubai — MEP &amp; Towers
            </Link>
          </li>
          <li>
            <Link
              href="/locations/abu-dhabi/"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-50 border border-red-300/60 text-red-700 hover:bg-red-100 transition-colors"
            >
              PPR Pipes Abu Dhabi — WRAS Approved
            </Link>
          </li>
          <li>
            <Link
              href="/locations/sharjah/"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-300/60 text-neutral-800 hover:bg-neutral-200 transition-colors"
            >
              PPR Pipes Sharjah — Industrial
            </Link>
          </li>
          <li>
            <Link
              href="/locations/umm-al-quwain/"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300/60 text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              PPR Factory — Umm Al Quwain
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
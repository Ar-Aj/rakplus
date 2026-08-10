/**
 * Master Products Hub — /products
 *
 * Groups all 11 RAKPLUS products into 4 strict categories and renders
 * a high-end grid layout with dark, sleek product cards. Each card links
 * to the dynamic /products/[slug] detail page.
 *
 * Categories:
 *   1. PP-R Green Pipes (4 products)
 *   2. PP-R Yellow Pipes (4 products)
 *   3. PP-R Fittings (2 products)
 *   4. PEX Systems (1 product)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productRegistry } from "@/config/products";
import type { ProductConfig } from "@/types/product";

export const metadata: Metadata = {
  title: "Products — RAKPLUS PP-R & PEX Piping Systems",
  description:
    "Explore the complete RAKPLUS product range: PP-R Green and Yellow pipes (PN10–PN25), precision fittings, and PEX systems. DIN 8077/8078 certified. 50-year guarantee.",
};

// ─── Category Definitions ───

interface CategoryGroup {
  name: string;
  description: string;
  accentColor: string;
  borderColor: string;
  badgeClass: string;
  slugPrefixes: string[];
}

const CATEGORIES: CategoryGroup[] = [
  {
    name: "PP-R Green Pipes",
    description:
      "Standard green polypropylene random copolymer pipes for hot and cold water plumbing — PN10 through PN25.",
    accentColor: "text-brand-green",
    borderColor: "border-t-brand-green",
    badgeClass: "bg-brand-green/15 text-brand-green",
    slugPrefixes: [
      "ppr-green-pn10",
      "ppr-green-pn16",
      "ppr-green-pn20",
      "ppr-green-pn25",
    ],
  },
  {
    name: "PP-R Yellow Pipes",
    description:
      "Custom-colour yellow PP-R pipes for colour-coded installation systems — available in PN10 through PN25.",
    accentColor: "text-brand-yellow",
    borderColor: "border-t-brand-yellow",
    badgeClass: "bg-brand-yellow/15 text-brand-yellow",
    slugPrefixes: [
      "ppr-yellow-pn10",
      "ppr-yellow-pn16",
      "ppr-yellow-pn20",
      "ppr-yellow-pn25",
    ],
  },
  {
    name: "PP-R Fittings",
    description:
      "Precision-engineered fittings with DVS 2207 welding compliance — designed for seamless integration with RAKPLUS pipe systems.",
    accentColor: "text-brand-green",
    borderColor: "border-t-brand-green",
    badgeClass: "bg-brand-green/15 text-brand-green",
    slugPrefixes: ["ppr-fittings-green", "ppr-fittings-yellow"],
  },
  {
    name: "PEX Systems",
    description:
      "Cross-linked polyethylene systems for high-temperature, high-pressure applications with extreme flexibility.",
    accentColor: "text-brand-red",
    borderColor: "border-t-brand-red",
    badgeClass: "bg-brand-red/15 text-brand-red",
    slugPrefixes: ["pex-systems"],
  },
];

/** Get products for a category group, ordered by slug */
function getProductsForCategory(group: CategoryGroup): ProductConfig[] {
  return group.slugPrefixes
    .map((slug) => productRegistry[slug])
    .filter((p): p is ProductConfig => p !== undefined);
}

// ─── Page Component ───

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-bg-cream">
      {/* ─── Hero Header ─── */}
      <section className="relative pt-28 lg:pt-40 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-brand-green uppercase tracking-[0.3em] mb-4">
              Product Catalog
            </p>
            <h1 className="font-sans tracking-tight text-brand-charcoal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95]">
              The RAKPLUS
              <br />
              <span className="text-brand-green">Arsenal.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-neutral-950 leading-relaxed max-w-xl">
              11 precision-engineered piping products — manufactured by
              Aquasmart Plastic Industries L.L.C to DIN 8077/8078 and DVS 2207
              German standards. Every product backed by a 50-year guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Category Sections ─── */}
      {CATEGORIES.map((category) => {
        const products = getProductsForCategory(category);
        if (products.length === 0) return null;

        return (
          <section
            key={category.name}
            className="py-12 lg:py-16 px-6 lg:px-8 border-t border-gray-100"
            aria-label={category.name}
          >
            <div className="max-w-7xl mx-auto">
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-12">
                <div>
                  <h2
                    className={`font-sans text-2xl sm:text-3xl font-bold tracking-tight text-brand-charcoal`}
                  >
                    {category.name}
                  </h2>
                  <p className="mt-2 text-sm text-neutral-950 leading-relaxed max-w-lg">
                    {category.description}
                  </p>
                </div>
                <span className="text-xs text-neutral-950 font-medium uppercase tracking-widest flex-shrink-0">
                  {products.length} product{products.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-brand-charcoal border-t-[3px] ${category.borderColor} transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1`}
                  >
                    {/* Product ID */}
                    <div className="mb-8">
                      <span className="text-[10px] font-mono text-white uppercase tracking-widest">
                        #{String(product.id).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Product Info */}
                    <div>
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-md ${category.badgeClass} mb-3`}
                      >
                        {product.category}
                      </span>
                      <h3 className="font-sans text-base lg:text-lg font-semibold text-white tracking-tight leading-snug mb-2 group-hover:text-white transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-xs text-white leading-relaxed line-clamp-2 mb-6">
                        {product.description}
                      </p>

                      {/* Specs peek */}
                      {product.dimensionalTable.length > 0 && (
                        <p className="text-[10px] text-white font-medium uppercase tracking-widest mb-4">
                          {product.dimensionalTable.length} size
                          {product.dimensionalTable.length !== 1
                            ? "s"
                            : ""}{" "}
                          available
                        </p>
                      )}

                      {/* CTA row */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-xs font-medium text-white group-hover:text-white transition-colors">
                          View details
                        </span>
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── Bottom CTA ─── */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-brand-charcoal tracking-tight">
            Need a Custom Solution?
          </h2>
          <p className="mt-4 text-base text-neutral-950 leading-relaxed max-w-lg mx-auto">
            Our engineering team at Aquasmart Plastic Industries can help
            specify the exact pipe and fitting configuration for your project.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green hover:bg-brand-green/90 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-green/25 hover:-translate-y-0.5"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 text-brand-charcoal text-sm font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

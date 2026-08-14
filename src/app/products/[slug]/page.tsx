/**
 * Dynamic Product Page — [slug]
 *
 * Generates 11 static product pages from the RAKPLUS registry.
 * Uses generateStaticParams() for Next.js static export and
 * generateMetadata() for dynamic SEO.
 *
 * Data pipeline:
 *   src/config/products.ts → getProductBySlug(slug) → ProductConfig → UI
 *
 * Accessibility:
 *   - <article> wrapper for semantic structure
 *   - <th scope="col"> on dimensional table headers
 *   - tabular-nums on data cells for column alignment
 *   - Graceful hide when dimensionalTable is empty
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Check,
  Thermometer,
  Shield,
  ArrowLeft,
  ArrowRight,
  Ruler,
  Award,
} from "lucide-react";
import {
  getAllProductSlugs,
  getProductBySlug,
} from "@/config/products";
import dynamic from "next/dynamic";
import FittingGallery from "@/components/products/FittingGallery";

const ProductViewerTrigger = dynamic(
  () => import("@/components/3d/ProductViewerTrigger"),
  { ssr: false }
);

const LiveCoverCanvas = dynamic(
  () => import("@/components/3d/LiveCoverCanvas"),
  { ssr: false }
);

// ─── SDR Model Dictionary ─────────────────────────────────────────────────────
// Maps product title substrings to their exact GLB asset path.
// Returns null when no model exists — the 3D block is hidden in that case.
function getModelPath(productTitle: string): string | null {
  if (productTitle.includes("SDR11"))  return "/3D Models/rakplusSDR11.glb";
  if (productTitle.includes("SDR7.4")) return "/3D Models/rakplusSDR7.4.glb";
  if (productTitle.includes("SDR6"))   return "/3D Models/rakplusSD6.glb";   // Exact filename per spec
  if (productTitle.includes("SDR5"))   return "/3D Models/rakplusSDR5.glb";
  return null;
}

// ─── Static Params ───

/**
 * Tell Next.js exactly which 11 slugs to pre-render.
 * Drives the static export for all product pages.
 */
export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic Metadata ───

interface PageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Product Not Found — RAKPLUS",
    };
  }

  return {
    title: `${product.title} — RAKPLUS Piping Systems`,
    description: `${product.description} ${product.specifications.temperatureResistance}. ${product.specifications.standards.join(", ")} certified.`,
    keywords: [
      product.title,
      product.category,
      "RAKPLUS",
      "PPR pipes",
      ...product.specifications.standards,
    ],
  };
}

// ─── Helper: Get adjacent products for navigation ───

function getAdjacentProducts(currentSlug: string) {
  const slugs = getAllProductSlugs();
  const currentIndex = slugs.indexOf(currentSlug);
  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : null;
  const nextSlug =
    currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null;

  return {
    prev: prevSlug ? getProductBySlug(prevSlug) : null,
    next: nextSlug ? getProductBySlug(nextSlug) : null,
  };
}

// ─── Helper: Category accent color ───

function getCategoryAccent(category: string): {
  text: string;
  bg: string;
  border: string;
  badge: string;
} {
  if (category.includes("Yellow")) {
    return {
      text: "text-brand-yellow",
      bg: "bg-brand-yellow/10",
      border: "border-brand-yellow/30",
      badge: "bg-brand-yellow/15 text-brand-yellow border-brand-yellow/25",
    };
  }
  if (category.includes("PEX")) {
    return {
      text: "text-brand-red",
      bg: "bg-brand-red/10",
      border: "border-brand-red/30",
      badge: "bg-brand-red/15 text-brand-red border-brand-red/25",
    };
  }
  // Default: Green
  return {
    text: "text-brand-green",
    bg: "bg-brand-green/10",
    border: "border-brand-green/30",
    badge: "bg-brand-green/15 text-brand-green border-brand-green/25",
  };
}

// ─── Page Component ───

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const accent = getCategoryAccent(product.category);
  const { prev, next } = getAdjacentProducts(params.slug);
  const hasDimensionalTable =
    product.dimensionalTable && product.dimensionalTable.length > 0;
  
  const hasFittingItems =
    product.fittingItems && product.fittingItems.length > 0;

  const hasWaterContent = hasDimensionalTable && product.dimensionalTable.some(row => row.waterContent !== undefined && row.waterContent !== "N/A");

  return (
    <article className="min-h-screen bg-bg-cream">
      {/* ─── Hero Section ─── */}
      <section
        className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 px-6 lg:px-8"
        aria-label="Product overview"
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm text-neutral-950 mb-8"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-brand-charcoal transition-colors"
            >
              Home
            </Link>
            <span className="text-neutral-950">/</span>
            <Link
              href="/products"
              className="hover:text-brand-charcoal transition-colors"
            >
              Products
            </Link>
            <span className="text-neutral-950">/</span>
            <span className="text-brand-charcoal font-medium truncate max-w-[200px]">
              {product.title}
            </span>
          </nav>

          {/* Split Layout: Desktop 2-column, Mobile stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* ─── Left Column: Product Visual ─── */}
            <div className="relative">
              {(() => {
                const modelPath = getModelPath(product.title);
                return modelPath ? (
                  <div className="aspect-[4/3] lg:aspect-auto lg:h-[50vh] min-h-[400px] lg:min-h-[500px] rounded-3xl bg-neutral-950 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 z-0 opacity-80 mix-blend-lighten">
                      <LiveCoverCanvas modelPath={modelPath} />
                    </div>
                    <ProductViewerTrigger modelPath={modelPath} />
                  </div>
                ) : (
                  <div className="aspect-[4/3] lg:aspect-auto lg:h-[50vh] min-h-[400px] lg:min-h-[500px] rounded-3xl bg-neutral-950 relative overflow-hidden flex items-center justify-center">
                    <p className="text-white/40 text-xs font-mono uppercase tracking-widest">3D Model Unavailable</p>
                  </div>
                );
              })()}

              {/* Product ID badge */}
              <div className="absolute top-6 right-6 z-10 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-xs font-mono text-white">
                  ID #{String(product.id).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* ─── Right Column: Product Info ─── */}
            <div className="lg:py-4">
              {/* Category pill */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${accent.badge} mb-4`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-sans tracking-tight text-brand-charcoal text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6">
                {product.title}
              </h1>

              {/* Description */}
              <p className="text-neutral-950 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
                {product.description}
              </p>

              {/* Key Specs Quick View */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {/* Temperature */}
                {product.specifications.temperatureResistance && (
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                      <Thermometer className="w-5 h-5 text-brand-red" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-950 uppercase tracking-wider mb-1">
                        Temperature
                      </p>
                      <p className="text-sm text-brand-charcoal font-medium leading-snug">
                        {product.specifications.temperatureResistance}
                      </p>
                    </div>
                  </div>
                )}

                {/* Standards */}
                {product.specifications.standards.length > 0 && (
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-brand-yellow" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-950 uppercase tracking-wider mb-1">
                        Certifications
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.specifications.standards.map((std) => (
                          <span
                            key={std}
                            className="inline-block px-2 py-0.5 text-[11px] font-semibold text-brand-charcoal bg-gray-100 rounded-md"
                          >
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green hover:bg-brand-green/90 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-green/25 hover:-translate-y-0.5"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 text-brand-charcoal text-sm font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:bg-gray-50"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      {product.features.length > 0 && (
        <section
          className="py-16 lg:py-24 px-6 lg:px-8 bg-white border-y border-gray-100"
          aria-label="Product features"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Section Header */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}
                  >
                    <Award className={`w-5 h-5 ${accent.text}`} />
                  </div>
                  <h2 className="font-sans text-2xl font-bold text-brand-charcoal tracking-tight">
                    Key Features
                  </h2>
                </div>
                <p className="text-neutral-950 text-sm leading-relaxed">
                  Engineering advantages of the {product.title}.
                </p>
              </div>

              {/* Features List */}
              <div className="lg:col-span-2">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-bg-cream/50 border border-gray-100 hover:border-gray-200 transition-colors duration-200"
                    >
                      <div
                        className={`w-6 h-6 rounded-lg ${accent.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                      >
                        <Check className={`w-3.5 h-3.5 ${accent.text}`} />
                      </div>
                      <span className="text-sm text-brand-charcoal leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Technical Specifications Section ─── */}
      <section
        className="py-16 lg:py-24 px-6 lg:px-8"
        aria-label="Technical specifications"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Section Header */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-charcoal/10 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-brand-charcoal" />
                </div>
                <h2 className="font-sans text-2xl font-bold text-brand-charcoal tracking-tight">
                  Specifications
                </h2>
              </div>
              <p className="text-neutral-950 text-sm leading-relaxed">
                Technical data for the {product.category} range, sourced from
                the RAKPLUS catalog.
              </p>

              {/* Standards badges */}
              {product.specifications.standards.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.specifications.standards.map((std) => (
                    <span
                      key={std}
                      className="inline-block px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-red border border-brand-red/20 rounded-lg bg-brand-red/5"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              )}

              {/* Temperature card */}
              {product.specifications.temperatureResistance && (
                <div className="mt-6 p-4 rounded-2xl bg-white border border-brand-yellow/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-4 h-4 text-brand-yellow" />
                    <span className="text-xs font-semibold text-neutral-950 uppercase tracking-wider">
                      Operating Temperature
                    </span>
                  </div>
                  <p className="text-sm text-brand-charcoal font-medium leading-relaxed">
                    {product.specifications.temperatureResistance}
                  </p>
                </div>
              )}
            </div>

            {/* Dimensional Table or Fitting Gallery */}
            <div className="lg:col-span-2">
              {hasFittingItems ? (
                <FittingGallery fittingItems={product.fittingItems!} accent={accent} />
              ) : hasDimensionalTable ? (
                <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      {/* Dark header row */}
                      <thead>
                        <tr className="bg-brand-charcoal text-white">
                          <th
                            scope="col"
                            className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap"
                          >
                            PART
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap"
                          >
                            DIMENSIONS (mm)
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap"
                          >
                            WALL THICKNESS (mm)
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap"
                          >
                            INNER DIAMETER (mm)
                          </th>
                          {hasWaterContent && (
                            <th
                              scope="col"
                              className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap"
                            >
                              WATER CONTENT (l/mtr)
                            </th>
                          )}
                          <th
                            scope="col"
                            className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap"
                          >
                            PACKING UNIT
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap"
                          >
                            Kg/Mtr.
                          </th>
                        </tr>
                      </thead>

                      {/* Data rows with alternating colors + tabular-nums */}
                      <tbody className="tabular-nums">
                        {product.dimensionalTable.map((row, index) => (
                          <tr
                            key={index}
                            className={`border-b border-gray-100 last:border-b-0 transition-colors duration-150 hover:bg-brand-green/5 ${
                              index % 2 === 0 ? "bg-white" : "bg-bg-cream/50"
                            }`}
                          >
                            <td className="px-6 py-4 text-sm font-medium text-brand-charcoal whitespace-nowrap">
                              {row.part}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-brand-charcoal whitespace-nowrap">
                              <span className={`font-semibold ${accent.text}`}>
                                ⌀
                              </span>{" "}
                              {row.dimension}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-950 whitespace-nowrap">
                              {row.wallThickness}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-950 whitespace-nowrap">
                              {row.innerDiameter}
                            </td>
                            {hasWaterContent && (
                              <td className="px-6 py-4 text-sm text-neutral-950 whitespace-nowrap">
                                {row.waterContent}
                              </td>
                            )}
                            <td className="px-6 py-4 text-sm text-neutral-950 whitespace-nowrap">
                              {row.packingUnit}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-950 whitespace-nowrap">
                              {row.weight}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Table footer */}
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <p className="text-[11px] text-neutral-950 tracking-wide">
                      {product.dimensionalTable.length} size
                      {product.dimensionalTable.length !== 1 ? "s" : ""}{" "}
                      available · Data sourced from RAKPLUS product catalog
                    </p>
                  </div>
                </div>
              ) : (
                /* Graceful fallback when no dimensional table or fittings exist */
                <div className="flex flex-col items-center justify-center py-16 rounded-2xl bg-white border border-dashed border-gray-200">
                  <Ruler className="w-8 h-8 text-neutral-950 mb-3" />
                  <p className="text-sm text-neutral-950 font-medium">
                    Technical data not available for this product.
                  </p>
                  <p className="text-xs text-neutral-950 mt-1">
                    Contact us for detailed specifications.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Product Navigation ─── */}
      <section
        className="py-12 px-6 lg:px-8 border-t border-gray-100"
        aria-label="Product navigation"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {prev ? (
            <Link
              href={`/products/${prev.slug}`}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-950 group-hover:text-brand-green transition-colors group-hover:-translate-x-1 duration-200" />
              <div className="text-right">
                <p className="text-[10px] text-neutral-950 uppercase tracking-widest font-medium">
                  Previous
                </p>
                <p className="text-sm text-brand-charcoal font-medium group-hover:text-brand-green transition-colors">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/products"
            className="text-xs text-neutral-950 uppercase tracking-[0.2em] font-medium hover:text-brand-charcoal transition-colors"
          >
            All Products
          </Link>

          {next ? (
            <Link
              href={`/products/${next.slug}`}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-200"
            >
              <div>
                <p className="text-[10px] text-neutral-950 uppercase tracking-widest font-medium">
                  Next
                </p>
                <p className="text-sm text-brand-charcoal font-medium group-hover:text-brand-green transition-colors">
                  {next.title}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:text-brand-green transition-colors group-hover:translate-x-1 duration-200" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </article>
  );
}

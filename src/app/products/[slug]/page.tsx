/**
 * Dynamic Product Page — [slug]
 *
 * Generates 11 static product pages from the RAKPLUS registry.
 * Uses generateStaticParams() for Next.js static export and
 * generateMetadata() for dynamic SEO.
 *
 * Architecture (Phase 22.0):
 *   - Full-width dimensional table (no 2-col split for specs+table)
 *   - Specs block (DIN tags, Temperature) lives BELOW the table
 *   - Typography bumped +20% throughout (sm→base, base→lg, etc.)
 *   - "View 3D" first column opens ProductViewerModal pre-seeded to that row's
 *     exact size GLB and exposes a size-swap dropdown inside the modal
 *
 * 3D Model path structure:
 *   /3D Models/RAKPLUS {COLOR} PIPES/{SDR} {COLOR}/{SDR}-{size}-{COLOR}.glb
 *   e.g. /3D Models/RAKPLUS GREEN PIPES/SDR6 GREEN/SDR6-20-GREEN.glb
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
import type { PipeSize } from "@/components/3d/ProductViewerModal";

const ProductViewerTrigger = dynamic(
  () => import("@/components/3d/ProductViewerTrigger"),
  { ssr: false }
);

const LiveCoverCanvas = dynamic(
  () => import("@/components/3d/LiveCoverCanvas"),
  { ssr: false }
);

const ProductTable = dynamic(
  () => import("@/components/ProductTable"),
  { ssr: false }
);

// ─── SDR Folder Resolver ──────────────────────────────────────────────────────
// Maps title keywords → SDR label and color string used in folder/file names.
// File pattern: /3D Models/RAKPLUS {COLOR} PIPES/{SDR} {COLOR}/{SDR}-{size}-{COLOR}.glb

type ColorKey = "GREEN" | "YELLOW";

function getSdrInfo(title: string, category?: string): {
  sdr: string;
  color: ColorKey;
} | null {
  const isYellow =
    title.toLowerCase().includes("yellow") ||
    category?.toLowerCase().includes("yellow");
  const color: ColorKey = isYellow ? "YELLOW" : "GREEN";

  if (title.includes("SDR11")) return { sdr: "SDR11", color };
  if (title.includes("SDR7.4")) return { sdr: "SDR7.4", color };
  if (title.includes("SDR6")) return { sdr: "SDR6", color };
  if (title.includes("SDR5")) return { sdr: "SDR5", color };
  return null;
}

function buildModelPath(sdr: string, color: ColorKey, sizeMm: string): string {
  // sizeMm from the table is like "20", "25", "32" — files use that directly
  const folder = `/3D Models/RAKPLUS ${color} PIPES/${sdr} ${color}`;
  const file = `${sdr}-${sizeMm}-${color}.glb`;
  return encodeURI(`${folder}/${file}`);
}

/** Hero-level model path: uses 32mm as the representative size (matches old logic) */
function getHeroModelPath(title: string, category?: string): string | null {
  const info = getSdrInfo(title, category);
  if (!info) return null;
  return buildModelPath(info.sdr, info.color, "32");
}

/** All sizes for the current product's PN class — used to populate modal dropdown */
function getAllSizes(
  title: string,
  category: string | undefined,
  dimensionalTable: Array<{ dimension: string }>
): PipeSize[] {
  const info = getSdrInfo(title, category);
  if (!info || !dimensionalTable?.length) return [];
  return dimensionalTable.map((row) => ({
    label: `${row.dimension}mm`,
    modelPath: buildModelPath(info.sdr, info.color, row.dimension),
  }));
}

// ─── Static Params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────
interface PageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found — RAKPLUS" };
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

// ─── Adjacent navigation ───────────────────────────────────────────────────────
function getAdjacentProducts(currentSlug: string) {
  const slugs = getAllProductSlugs();
  const idx = slugs.indexOf(currentSlug);
  return {
    prev: idx > 0 ? getProductBySlug(slugs[idx - 1]) : null,
    next: idx < slugs.length - 1 ? getProductBySlug(slugs[idx + 1]) : null,
  };
}

// ─── Accent palette ───────────────────────────────────────────────────────────
function getCategoryAccent(category: string, slug?: string) {
  const isYellow =
    category.toLowerCase().includes("yellow") ||
    slug?.toLowerCase().includes("yellow");
  if (isYellow)
    return {
      text: "text-yellow-600",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      badge: "bg-yellow-500/15 text-yellow-700 border-yellow-500/25",
    };
  if (category.includes("PEX"))
    return {
      text: "text-brand-red",
      bg: "bg-brand-red/10",
      border: "border-brand-red/30",
      badge: "bg-brand-red/15 text-brand-red border-brand-red/25",
    };
  return {
    text: "text-[#008c4a]",
    bg: "bg-[#008c4a]/10",
    border: "border-[#008c4a]/30",
    badge: "bg-[#008c4a]/15 text-[#008c4a] border-[#008c4a]/25",
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const isYellow =
    product.category.toLowerCase().includes("yellow") ||
    product.slug.toLowerCase().includes("yellow") ||
    product.title.toLowerCase().includes("yellow");
  const colorTheme: "green" | "yellow" = isYellow ? "yellow" : "green";

  const accent = getCategoryAccent(product.category, product.slug);
  const { prev, next } = getAdjacentProducts(params.slug);
  const hasDimensionalTable = product.dimensionalTable?.length > 0;
  const hasFittingItems = (product.fittingItems?.length ?? 0) > 0;

  const heroModelPath = getHeroModelPath(product.title, product.category);
  const allSizes = hasDimensionalTable
    ? getAllSizes(product.title, product.category, product.dimensionalTable)
    : [];
  const hasSizeModels = allSizes.length > 0;

  // Primary CTA class — used for "Request a Quote"
  const ctaClass = isYellow
    ? "bg-yellow-500 hover:bg-yellow-600 text-black hover:shadow-lg hover:shadow-yellow-400/40"
    : "bg-[#008c4a] hover:bg-[#006e3a] text-white hover:shadow-lg hover:shadow-[#008c4a]/25";

  return (
    <article className="min-h-screen bg-bg-cream">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — Visual + Product Info (stacked, no 2-col specs split)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative pt-20 sm:pt-24 lg:pt-32 pb-10 lg:pb-20 px-4 sm:px-6 lg:px-[15vw]"
        aria-label="Product overview"
      >
        <div className="w-full">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-base text-neutral-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-charcoal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand-charcoal transition-colors">Products</Link>
            <span>/</span>
            <span className="text-brand-charcoal font-medium truncate max-w-[200px]">{product.title}</span>
          </nav>

          {/* 2-col on lg+: visual left, text right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

            {/* ── Visual column ── */}
            <div className="relative">
              {heroModelPath ? (
                <div className="aspect-[4/3] lg:aspect-auto lg:h-[55vh] min-h-[260px] sm:min-h-[360px] lg:min-h-[500px] rounded-2xl lg:rounded-3xl bg-neutral-950 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 z-0 opacity-80 mix-blend-lighten">
                    <LiveCoverCanvas modelPath={heroModelPath} />
                  </div>
                  <ProductViewerTrigger
                    modelPath={heroModelPath}
                    sizes={hasSizeModels ? allSizes : undefined}
                    initialSize={hasSizeModels ? allSizes[0].label : undefined}
                    isYellow={isYellow}
                    colorTheme={colorTheme}
                  />
                </div>
              ) : product.coverImage ? (
                <div className="aspect-video lg:aspect-auto lg:h-[55vh] min-h-[200px] sm:min-h-[320px] lg:min-h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] lg:aspect-auto lg:h-[55vh] min-h-[260px] sm:min-h-[340px] lg:min-h-[500px] rounded-2xl lg:rounded-3xl bg-neutral-950 relative overflow-hidden flex items-center justify-center">
                  <p className="text-white/40 text-sm font-mono uppercase tracking-widest">3D Model Unavailable</p>
                </div>
              )}

              {/* Product ID badge */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-xs font-mono text-white">ID #{String(product.id).padStart(2, "0")}</span>
              </div>
            </div>

            {/* ── Text column ── */}
            <div className="lg:py-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${accent.badge} mb-4`}>
                <span className="text-sm font-semibold uppercase tracking-[0.15em]">{product.category}</span>
              </div>

              <h1 className="font-sans tracking-tight text-brand-charcoal text-2xl sm:text-3xl lg:text-5xl font-bold leading-[1.1] mb-4 sm:mb-6">
                {product.title}
              </h1>

              <p className="text-neutral-700 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
                {product.description}
              </p>

              {/* Quick-spec cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {product.specifications.temperatureResistance && (
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                      <Thermometer className="w-5 h-5 text-brand-red" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Temperature</p>
                      <p className="text-base text-brand-charcoal font-medium leading-snug">{product.specifications.temperatureResistance}</p>
                    </div>
                  </div>
                )}
                {product.specifications.standards.length > 0 && (
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-brand-yellow" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Certifications</p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.specifications.standards.map((std) => (
                          <span key={std} className="inline-block px-2 py-0.5 text-xs font-semibold text-brand-charcoal bg-gray-100 rounded-md">{std}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 ${ctaClass}`}
                >
                  Request a Quote
                </Link>
                <Link
                  href="/products"
                  className={`inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-xl border border-gray-200 transition-all duration-200 hover:bg-gray-50 ${
                    isYellow
                      ? "text-brand-charcoal hover:border-yellow-500 hover:text-yellow-600"
                      : "text-brand-charcoal hover:border-[#008c4a] hover:text-[#008c4a]"
                  }`}
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURES SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      {product.features.length > 0 && (
        <section className="py-14 lg:py-20 px-4 sm:px-6 lg:px-[15vw] bg-white border-y border-gray-100" aria-label="Product features">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                <Award className={`w-5 h-5 ${accent.text}`} />
              </div>
              <h2 className="font-sans text-2xl lg:text-3xl font-bold text-brand-charcoal tracking-tight">Key Features</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-bg-cream/50 border border-gray-100 hover:border-gray-200 transition-colors duration-200"
                >
                  <div className={`w-6 h-6 rounded-lg ${accent.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Check className={`w-3.5 h-3.5 ${accent.text}`} />
                  </div>
                  <span className="text-base text-brand-charcoal leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          DIMENSIONAL TABLE — FULL WIDTH with "View 3D" first column
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 px-4 sm:px-6 lg:px-[15vw]" aria-label="Technical specifications">
        <div className="w-full">

          {/* Section header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-brand-charcoal/10 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-brand-charcoal" />
            </div>
            <h2 className="font-sans text-2xl lg:text-3xl font-bold text-brand-charcoal tracking-tight">
              {hasFittingItems ? "Fittings Catalogue" : "Dimensional Specifications"}
            </h2>
          </div>

          {/* Full-width table or fitting gallery */}
          {hasFittingItems ? (
            <FittingGallery fittingItems={product.fittingItems!} accent={accent} />
          ) : hasDimensionalTable ? (
            <ProductTable
              dimensionalTable={product.dimensionalTable}
              colorTheme={colorTheme}
              isYellow={isYellow}
              hasSizeModels={hasSizeModels}
              allSizes={allSizes}
              accent={accent}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 rounded-2xl bg-white border border-dashed border-gray-200">
              <Ruler className="w-8 h-8 text-neutral-300 mb-3" />
              <p className="text-base text-neutral-500 font-medium">Technical data not available for this product.</p>
              <p className="text-sm text-neutral-400 mt-1">Contact us for detailed specifications.</p>
            </div>
          )}

          {/* ── Specs block BELOW the table ── */}
          {(product.specifications.standards.length > 0 || product.specifications.temperatureResistance) && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.specifications.standards.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-brand-red" />
                    <span className="text-sm font-bold uppercase tracking-wider text-neutral-500">Standards</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.specifications.standards.map((std) => (
                      <span key={std} className="inline-block px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-red border border-brand-red/20 rounded-lg bg-brand-red/5">
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.specifications.temperatureResistance && (
                <div className="p-5 rounded-2xl bg-white border border-brand-yellow/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Thermometer className="w-4 h-4 text-brand-yellow" />
                    <span className="text-sm font-bold uppercase tracking-wider text-neutral-500">Operating Temperature</span>
                  </div>
                  <p className="text-base text-brand-charcoal font-medium leading-relaxed">{product.specifications.temperatureResistance}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRODUCT NAVIGATION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 sm:px-6 lg:px-[15vw] border-t border-gray-100" aria-label="Product navigation">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
          {prev ? (
            <Link
              href={`/products/${prev.slug}`}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-200"
            >
              <ArrowLeft
                className={`w-4 h-4 text-neutral-400 transition-colors group-hover:-translate-x-1 duration-200 ${
                  isYellow ? "group-hover:text-yellow-600" : "group-hover:text-[#008c4a]"
                }`}
              />
              <div className="text-right">
                <p className="text-xs text-neutral-400 uppercase tracking-widest font-medium">Previous</p>
                <p
                  className={`text-base text-brand-charcoal font-medium transition-colors ${
                    isYellow ? "group-hover:text-yellow-600" : "group-hover:text-[#008c4a]"
                  }`}
                >
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : <div />}

          <Link
            href="/products"
            className={`text-sm text-neutral-400 uppercase tracking-[0.2em] font-medium transition-colors ${
              isYellow ? "hover:text-yellow-600" : "hover:text-brand-charcoal"
            }`}
          >
            All Products
          </Link>

          {next ? (
            <Link
              href={`/products/${next.slug}`}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-200"
            >
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-widest font-medium">Next</p>
                <p
                  className={`text-base text-brand-charcoal font-medium transition-colors ${
                    isYellow ? "group-hover:text-yellow-600" : "group-hover:text-[#008c4a]"
                  }`}
                >
                  {next.title}
                </p>
              </div>
              <ArrowRight
                className={`w-4 h-4 text-neutral-400 transition-colors group-hover:translate-x-1 duration-200 ${
                  isYellow ? "group-hover:text-yellow-600" : "group-hover:text-[#008c4a]"
                }`}
              />
            </Link>
          ) : <div />}
        </div>
      </section>
    </article>
  );
}

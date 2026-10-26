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
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productRegistry } from "@/config/products";
import type { ProductConfig } from "@/types/product";
import ProductHeroVideo from "@/components/products/ProductHeroVideo";
import SemanticLSIBlock from "@/components/SemanticLSIBlock";
import TechnicalSpecifications from "@/components/TechnicalSpecifications";
import RelatedProducts from "@/components/RelatedProducts";
import {
  buildProductJsonLd,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd,
  buildOgImages,
  absoluteUrl,
  OG_COVER,
  SITE,
} from "@/lib/seo";

// Below-the-fold blueprint calculator. Loaded on demand so its module
// (and its React/SVG dependency graph) stays out of the initial route
// bundle instead of being shared eagerly with /products/[slug]/.
const InteractivePipeCrossSection = dynamic(
  () =>
    import("@/components/calculator/InteractivePipeCrossSection").then(
      (m) => m.default
    ),
  { ssr: false }
);

export const metadata: Metadata = {
  title:
    "100% Brass PPR Fittings UAE — Full Pipe & Fitting Catalog",
  description:
    "Browse the full RakPlus catalog of PPR pipes & 100% Brass fittings in the UAE. WRAS approved, German DIN 8077/8078, 50-year guarantee. PN10–PN25, green & yellow pipes. Premium PP-R supplier for Dubai & the GCC.",
  keywords: [
    "100% brass ppr fittings uae",
    "PPR pipes UAE",
    "PPR fittings UAE",
    "WRAS Approved PP-R Fittings Dubai",
    "PPR pipe manufacturer UAE",
    "DIN 8077 PP-R pipes",
    "PN20 SDR6 PP-R pipe",
    "RakPlus PPR",
    "RakPlus Rohrsysteme UAE",
    "ppr pipes and fittings supplier in dubai",
    "polypropylene pipe systems GCC",
    "brass insert PPR fittings",
  ],
  alternates: {
    canonical: "https://rakplusuae.com/products/",
  },
  openGraph: {
    title:
      "100% Brass PPR Fittings UAE — Full Pipe & Fitting Catalog",
    description:
      "RakPlus full PPR catalog — 100% Polymer pipes, 100% Brass fittings. WRAS approved, German DIN 8077/8078, DVS 2207, ISO 9001:2015. PN10–PN25, 20–160 mm, 0–70°C continuous / 100°C peak. 50-year guarantee.",
    type: "website",
    locale: "en_AE",
    url: "https://rakplusuae.com/products/",
    images: buildOgImages(
      "RakPlus PP-R pipes and 100% brass insert fittings catalog — PN10 to PN25, 20 mm to 160 mm, WRAS approved"
    ),
  },
  twitter: {
    card: "summary_large_image",
    title: "100% Brass PPR Fittings UAE — Full Pipe & Fitting Catalog",
    description:
      "RakPlus full PPR catalog — 100% Polymer pipes, 100% Brass fittings. WRAS approved, DIN 8077/8078, 50-year guarantee.",
    images: [absoluteUrl(OG_COVER)],
  },
};

// ─── JSON-LD Structured Data (delegated to lib/seo.ts builders) ───
//
// Schema graph (linked by @id anchors):
//   /#organization ←── owned by ─── /#localbusiness
//                              ←── hasOfferCatalog (Organization + LocalBusiness)
//   /products/#breadcrumb → / → /products/
//   /products/#collection → ItemList of 11 real Product @ids
//   /products/#faq → 5 verified Q&A pairs
//
// All schema data is sourced from the single source of truth in
// `src/lib/seo.ts` — no inline conflicting declarations.
// NOTE: LocalBusiness / Organization are emitted globally via
// `src/app/layout.tsx` to avoid duplicate @id conflicts. The
// @id references here use the global `parentOrganization` link.

// BreadcrumbList — Home → Products
const jsonLdBreadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", url: `${SITE.url}/` },
  { name: "Products", url: `${SITE.url}/products/` },
]);

// Real ItemList of 11 RakPlus products. Each item references a Product
// schema with its own @id so the entity graph links this collection
// page to every product detail page (boosts their crawl priority).
const productListItems = Object.values(productRegistry)
  .filter((p): p is ProductConfig => Boolean(p))
  .map((p) => {
    const productSchema = buildProductJsonLd({
      name: p.title,
      description:
        p.description ||
        "RAKPLUS PP-R pipe system — 100% Polymer, 100% Brass inserts, WRAS approved, 50-year guarantee.",
      image: p.coverImage || "/images/logo.png",
      sku: String(p.id),
      category: p.category,
      url: `/products/${p.slug}/`,
    });
    return {
      "@type": "ListItem",
      position: 0, // filled below
      item: {
        ...productSchema,
        "@id": `${SITE.url}/products/${p.slug}/#product`,
        url: `${SITE.url}/products/${p.slug}/`,
      },
    };
  })
  .map((item, i) => ({ ...item, position: i + 1 }));

const jsonLdProductCollection = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE.url}/products/#collection`,
  name: "RakPlus PP-R Pipes & Fittings — Full Catalog",
  description:
    "Complete RakPlus PP-R pipe and fitting catalog — 100% Polymer pipes, 100% Brass fittings, WRAS approved, 50-year guaranteed service life. PN10 to PN25, 20 mm to 160 mm.",
  url: `${SITE.url}/products/`,
  numberOfItems: productListItems.length,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: productListItems,
};

// ─── FAQ Data (verified facts only) ───

const FAQ_ITEMS = [
  {
    question: "What does SDR6 / PN20 mean for PP-R pipes?",
    answer:
      "SDR (Standard Dimension Ratio) is the ratio of the pipe's outer diameter to its wall thickness. SDR6 indicates a thicker wall, yielding a PN20 pressure rating — meaning the pipe can withstand a continuous operating pressure of 20 bar at 20°C. This makes SDR6/PN20 pipes ideal for high-pressure hot and cold water systems in commercial and residential buildings across Dubai and the GCC.",
  },
  {
    question: "What is WRAS Approval and why does it matter in the UAE?",
    answer:
      "WRAS (Water Regulations Advisory Scheme) Approval certifies that a pipe or fitting material is safe for contact with drinking water. RAKPLUS PP-R pipes carry WRAS Approval, ensuring they meet rigorous hygiene and non-toxicity standards — a critical requirement for potable water systems in hotels, hospitals, and residential towers throughout the UAE.",
  },
  {
    question:
      "What German standards do RAKPLUS pipes conform to?",
    answer:
      "All RAKPLUS PP-R pipes are engineered to DIN 8077/78 (dimensions and pressure ratings for polypropylene pipes), DIN 8076 (fittings), and DVS 2207 (welding procedures). The manufacturing facility holds ISO 9001:2015 quality management and ISO 14001:2015 environmental management certifications.",
  },
  {
    question:
      "Are PP-R pipes suitable for the GCC climate?",
    answer:
      "Yes. PP-R (Polypropylene Random Copolymer) pipes are rated for continuous operation from 0°C to 70°C with short-term peaks up to 100°C. Their high impact strength, flexibility, and corrosion resistance make them an ideal choice for the demanding temperature cycles experienced in the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.",
  },
  {
    question: "What guarantee does RAKPLUS offer?",
    answer:
      "RAKPLUS pipes carry a 50-year guaranteed service life when installed according to DIN 8077/78 specifications. This guarantee covers the full range of PP-R Green and Yellow pipes from PN10 through PN25.",
  },
];

const jsonLdFaq = {
  ...buildFaqJsonLd(FAQ_ITEMS),
  "@id": `${SITE.url}/products/#faq`,
  url: `${SITE.url}/products/`,
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
      {/* ─── JSON-LD Structured Data ─── */}
      {/* LocalBusiness + Organization are emitted globally via
          `src/app/layout.tsx` — DO NOT re-emit here. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdProductCollection),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFaq),
        }}
      />
      {/* ─── JSON-LD: BreadcrumbList ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdBreadcrumb),
        }}
      />

      {/* ─── Hero Header ─── */}
      {/*
        LAYOUT STRATEGY:
        ─ Mobile (< md): Normal document flow. Text on top, square 1:1
          video rendered below it in the same section — no background.
        ─ Tablet (md – lg): Video is a full-bleed background with a dark
          gradient overlay. Text is layered on top at z-10.
        ─ Desktop (≥ lg): Two-column grid. Text left, square video right.
      */}
      <section
        id="products-hero"
        className="
          relative overflow-hidden
          pt-28 lg:pt-40
          pb-16 lg:pb-24
          px-6 lg:px-8
          md:min-h-[80vh] lg:min-h-0
        "
      >
        {/* ── Full-bleed background video — TABLET ONLY (md to lg) ── */}
        {/*
          hidden  → off on mobile (< md): mobile uses inline video below text.
          md:block → on for tablet.
          lg:hidden → off for desktop: desktop uses the grid column video.
        */}
        <div
          aria-hidden="true"
          className="hidden md:block lg:hidden absolute inset-0 w-full h-full z-0"
        >
          <video
            src="/videos/products hero/Rakplus Products Page 1-1.mp4"
            autoPlay
            muted
            loop
            playsInline
            // Decorative background layer — never the LCP element. Metadata-only
            // preload keeps the hero text and card grid at the front of the queue.
            preload="metadata"
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay — ensures WCAG AA contrast for text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* ── Content wrapper ── */}
        <div className="relative z-10 max-w-7xl mx-auto">

          {/*
            Desktop: 2-col grid (text | square video).
            Mobile/Tablet: single column — text flows normally over the
            background video defined above.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* ── Left column: Text content ── */}
            <div>
              {/*
                Overline colour:
                  mobile  → solid brand-green (light bg, no overlay)
                  tablet  → white/80 (over dark video overlay)
                  desktop → solid brand-green (light bg, no overlay)
              */}
              <p className="text-xs font-semibold text-brand-green md:text-white/80 lg:text-brand-green uppercase tracking-[0.3em] mb-4">
                Product Catalog
              </p>
              <h1
                className="
                  font-sans tracking-tight
                  text-brand-charcoal md:text-white lg:text-brand-charcoal
                  text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                  font-bold leading-[0.95]
                "
                style={{ textWrap: "balance" }}
              >
                Premium PP-R Pipes / Fittings in UAE
                <br />
                <span className="text-brand-green">Rakplus</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-neutral-950 md:text-white/90 lg:text-neutral-950 leading-relaxed max-w-2xl">
                Engineered to German STD DIN 8077/78, Rakplus delivers
                high-quality, WRAS-approved PP-R pipe systems designed for
                extreme durability in the GCC climate. Manufactured by
                RakPlus® Rohrsysteme UAE with ISO 9001:2015 and
                ISO 14001:2015 certifications — every product is backed by
                a 50-year guaranteed service life.
              </p>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "WRAS Approved",
                  "ISO 9001:2015",
                  "DIN 8077/78",
                  "DVS 2207",
                  "50-Year Guarantee",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="
                      inline-flex items-center px-3 py-1.5 rounded-lg
                      bg-brand-green/10 md:bg-white/20 lg:bg-brand-green/10
                      text-brand-green md:text-white lg:text-brand-green
                      text-xs font-semibold tracking-wide
                      md:backdrop-blur-sm lg:backdrop-blur-none
                    "
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Mobile-only interactive video — below text, hidden on md+ ── */}
            {/*
              No background video on mobile; video renders here in normal
              flow. ProductHeroVideo starts muted (autoplay policy) and
              exposes the pipe-styled mute toggle at bottom-left.
            */}
            <ProductHeroVideo wrapperClassName="block md:hidden w-full" />

            {/* ── Desktop right-column interactive video — hidden below lg ── */}
            {/*
              aspect-square + shadow + ring identical to the mobile block.
              ProductHeroVideo starts muted; pipe button at bottom-left.
            */}
            <ProductHeroVideo wrapperClassName="hidden lg:block w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto" />

          </div>
        </div>
      </section>

      {/* ─── Section 02 · Complete German-Standard Piping Ecosystem ───
          Layout follows the Home page language:
            • Desktop (lg): 12-col grid — text in col-span-7 (left), a strict
              1:1 square image in col-span-5 (right, pushed flush with ml-auto).
            • Tablet/mobile: stacked, unchanged order, 1:1 square frame so the
              2048×2048 showcase plate is never vertically cropped. */}
      <section className="py-12 lg:py-16 px-6 lg:px-8 bg-studio-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-center gap-8 lg:gap-12">

            {/* ── LEFT COLUMN (text · 7-col on desktop) ── */}
            <div className="lg:col-span-7">
              <p className="text-[11px] font-semibold text-pitch-black/70 uppercase tracking-[0.22em] mb-3 font-mono">
                // 02 · Complete German-Standard Piping Ecosystem
                <span className="text-crimson">
                  {" "}
                  (SDR11 – SDR5 · Ø20mm – Ø110mm)
                </span>
              </p>

              <h2
                className="font-sans font-extrabold tracking-tighter text-[clamp(2rem,4.4vw,3.25rem)] leading-[0.95] mb-5"
                style={{ textWrap: "balance" }}
              >
                <span className="block text-[#0A0A0A]">Complete PP-R Pipes.</span>
                <span className="block text-[#DC2626]">
                  100% Brass Fittings<span className="text-[#0A0A0A]">.</span>
                </span>
                <span className="block text-[#FACC15]">
                  Engineered to Connect<span className="text-[#0A0A0A]">.</span>
                </span>
              </h2>

              <div className="space-y-4 max-w-2xl">
                <p className="text-[15px] md:text-base text-neutral-800 leading-relaxed">
                  RakPlus® manufactures a fully integrated{" "}
                  <strong className="text-pitch-black font-bold">
                    PP-R pipe and fitting system
                  </strong>{" "}
                  in the UAE across all four pressure classes —{" "}
                  <strong className="text-crimson">SDR11 / PN10</strong>,{" "}
                  <strong className="text-crimson">SDR7.4 / PN16</strong>,{" "}
                  <strong className="text-crimson">SDR6 / PN20</strong> and{" "}
                  <strong className="text-crimson">SDR5 / PN25</strong> —
                  spanning outer diameters from{" "}
                  <strong className="text-pitch-black font-bold">
                    Ø20mm to Ø110mm
                  </strong>
                  . Engineered in strict compliance with{" "}
                  <strong className="text-pitch-black font-bold">
                    German Standard DIN 8077/8078
                  </strong>{" "}
                  and{" "}
                  <strong className="text-pitch-black font-bold">
                    DVS 2207
                  </strong>{" "}
                  homogeneous socket fusion guidelines, every pipe and fitting
                  is <strong className="text-pitch-black font-bold">WRAS approved</strong>{" "}
                  for hygienic hot and cold potable water transmission in
                  residential villas, high-rise towers and industrial plants
                  across Dubai, Abu Dhabi, Sharjah and the wider GCC.
                </p>

                <p className="text-[15px] md:text-base text-neutral-800 leading-relaxed">
                  From heavy-duty{" "}
                  <strong className="text-pitch-black font-bold">
                    RPFSH Hexagonal 100% Brass Transition Series
                  </strong>{" "}
                  (DIN 8076) that guarantee leak-free metal-to-polymer thread
                  connections, to precision-molded{" "}
                  <strong className="text-pitch-black font-bold">RPE90 90° Elbows</strong>,{" "}
                  <strong className="text-pitch-black font-bold">RPRS Step Reducers</strong>,{" "}
                  <strong className="text-pitch-black font-bold">RPS Equal Sockets</strong>{" "}
                  and acoustic-damping{" "}
                  <strong className="text-pitch-black font-bold">
                    RPBT Pipe Clamp Brackets
                  </strong>
                  , every component is injection-molded from 100% virgin PP-R
                  Type 3 polymer and backed by a guaranteed{" "}
                  <strong className="text-crimson">50-year service life</strong>.
                </p>
              </div>

              {/* Scannable spec pills */}
              <ul className="mt-6 flex flex-wrap gap-2">
                {[
                  "DIN 8077/8078",
                  "DVS 2207",
                  "DIN 8076",
                  "WRAS Approved",
                  "100% Polymer",
                  "100% Brass",
                  "50-Year Guarantee",
                ].map((pill) => (
                  <li
                    key={pill}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border border-pitch-black/12 bg-white text-[11px] font-semibold tracking-wide text-pitch-black"
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── RIGHT COLUMN (1:1 square image · 5-col on desktop) ── */}
            <div className="lg:col-span-5">
              <figure className="group">
                <div className="relative aspect-square w-full max-w-[520px] ml-auto rounded-2xl overflow-hidden shadow-xl border border-neutral-900/10 bg-concrete-light">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/products-complete-system-showcase.png"
                    alt="RakPlus brass transition elbow, all-green 90° elbow, reducer socket, and pipe clamp on a bright white architectural engineering board with grey millimetre grid lines and CAD callout labels for each fitting family."
                    width={2048}
                    height={2048}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full aspect-square object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-pitch-black/10 rounded-2xl" />
                </div>
                <figcaption className="mt-3 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 lg:text-right">
                  Complete 29-family system · Catalogue pp.06–19
                </figcaption>
              </figure>
            </div>
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
            <div className="max-w-6xl mx-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-12">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className={`group relative flex flex-col rounded-2xl bg-brand-charcoal border-t-[3px] ${category.borderColor} transition-all duration-300 hover:shadow-2xl hover:shadow-black/25 hover:-translate-y-1.5 overflow-hidden`}
                  >
                    {/* 16:9 Cover Image Area */}
                    <div className="aspect-video w-full overflow-hidden bg-neutral-950">
                      {product.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.coverImage}
                          alt={product.title}
                          width={1672}
                          height={941}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl text-neutral-600 select-none">⬡</span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col flex-1 p-7 sm:p-8 lg:p-9">
                      {/* Top content (Badge + Title + Description) */}
                      <div>
                        {/* Product Header / Tag */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] rounded-md ${category.badgeClass}`}
                          >
                            {product.category}
                          </span>
                          <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                            #{String(product.id).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-sans text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-emerald-400 transition-colors mb-3">
                          {product.title}
                        </h3>

                        {/* Description */}
                        <p className="text-base sm:text-lg leading-relaxed text-gray-300">
                          {product.description}
                        </p>
                      </div>

                      {/* Bottom content (Specs peek + CTA row) pinned to bottom */}
                      <div className="mt-auto pt-6 space-y-4">
                        {product.dimensionalTable.length > 0 && (
                          <p className="text-xs text-white/80 font-bold uppercase tracking-widest">
                            {product.dimensionalTable.length} size
                            {product.dimensionalTable.length !== 1 ? "s" : ""}{" "}
                            available
                          </p>
                        )}

                        {/* CTA row */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/15">
                          <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                            View details
                          </span>
                          <ArrowRight className="w-5 h-5 text-white group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── SIGNATURE FEATURE 3A: Interactive Pipe Cross-Section Blueprint ───
          Sourced from RakPlus Catalogue pp.06–07. Renders before the
          legacy TechnicalSpecifications block for visual impact. */}
      <InteractivePipeCrossSection />

      {/* ─── Technical FAQ Section ─── */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-white border-t border-gray-100" aria-label="Frequently Asked Questions">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold text-brand-green uppercase tracking-[0.3em] mb-4">
              Technical Knowledge
            </p>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-brand-charcoal tracking-tight" style={{ textWrap: "balance" }}>
              Frequently Asked Questions About PP-R Pipes / Fittings
            </h2>
            <p className="mt-4 text-sm text-neutral-950 leading-relaxed">
              Understanding the standards and certifications behind
              commercial plumbing systems in Dubai and the GCC.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FAQ_ITEMS.map((item, index) => (
              <article
                key={index}
                className="p-6 rounded-2xl bg-bg-cream border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <h3 className="font-sans text-base font-semibold text-brand-charcoal tracking-tight mb-3 leading-snug">
                  {item.question}
                </h3>
                <p className="text-sm text-neutral-950 leading-relaxed">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Technical Specifications — high-density indexable data ─── */}
      <TechnicalSpecifications />

      {/* ─── Related Products — internal link graph ─── */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-bg-cream border-t border-gray-100" aria-label="Related PPR products and resources">
        <div className="max-w-7xl mx-auto">
          <RelatedProducts currentSlug="ppr-green-pn20" />
        </div>
      </section>

      {/* ─── LSI Semantic Block — topical authority ─── */}
      <SemanticLSIBlock topic="products" />

      {/* ─── Bottom CTA ─── */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-brand-charcoal tracking-tight">
            Need a Custom Solution?
          </h2>
          <p className="mt-4 text-base text-neutral-950 leading-relaxed max-w-lg mx-auto">
            Our engineering team at RakPlus® Rohrsysteme UAE can help
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

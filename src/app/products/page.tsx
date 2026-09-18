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
  title:
    "Premium PP-R Pipes / Fittings in UAE | WRAS Approved | Rakplus by Aquasmart",
  description:
    "Explore the complete RAKPLUS range of PP-R Green and Yellow pipes (PN10–PN25), WRAS-approved fittings, and PEX systems. Engineered to German STD DIN 8077/78 and ISO 9001:2015 certified. Top PP-R pipe supplier in Dubai, UAE, and the GCC.",
  keywords: [
    "Premium PP-R Pipes UAE",
    "WRAS Approved PP-R Fittings Dubai",
    "Top PP-R Pipe Supplier GCC",
    "PP-R pipes Dubai",
    "PPR pipe manufacturer UAE",
    "DIN 8077 PP-R pipes",
    "PN20 SDR6 PP-R pipe",
    "Rakplus PP-R",
    "Aquasmart Plastic Industries",
    "polypropylene pipe systems GCC",
  ],
  openGraph: {
    title:
      "Premium PP-R Pipes / Fittings in UAE | WRAS Approved | Rakplus",
    description:
      "11 precision-engineered PP-R and PEX piping products — manufactured to DIN 8077/78 German standards. ISO 9001:2015 certified. 50-year guarantee.",
    type: "website",
    locale: "en_AE",
  },
};

// ─── JSON-LD Structured Data ───

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "RakPlus by Aquasmart Plastic Industries L.L.C",
  description:
    "Manufacturer of premium PP-R pipe systems engineered to German STD DIN 8077/78. ISO 9001:2015 and ISO 14001:2015 certified. WRAS Approved materials.",
  url: "https://rakplus.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AE",
    addressRegion: "Ras Al Khaimah",
  },
  areaServed: ["AE", "SA", "QA", "KW", "BH", "OM"],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "RAKPLUS PP-R Pipes / Fittings Catalog",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "PP-R Green Pipes",
        description: "PP-R Green Pipes PN10–PN25, SDR11 to SDR5",
      },
      {
        "@type": "OfferCatalog",
        name: "PP-R Yellow Pipes",
        description: "PP-R Yellow Pipes PN10–PN25, SDR11 to SDR5",
      },
      {
        "@type": "OfferCatalog",
        name: "PP-R Fittings",
        description:
          "WRAS Approved PP-R fittings with DVS 2207 welding compliance",
      },
      {
        "@type": "OfferCatalog",
        name: "PEX Systems",
        description: "Cross-linked polyethylene piping systems",
      },
    ],
  },
};

const jsonLdProductCollection = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "RAKPLUS PP-R Pipe Systems",
  description:
    "Complete range of PP-R polypropylene random copolymer pipes and fittings. Engineered to DIN 8077/78 German standards. WRAS Approved. ISO 9001:2015 certified.",
  brand: {
    "@type": "Brand",
    name: "Rakplus",
  },
  manufacturer: {
    "@type": "Organization",
    name: "Aquasmart Plastic Industries L.L.C",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
    },
  },
  category: "Plumbing Pipes / Fittings",
  material: "Polypropylene Random Copolymer (PP-R)",
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Certification",
      value: "ISO 9001:2015, ISO 14001:2015",
    },
    {
      "@type": "PropertyValue",
      name: "Standards",
      value: "DIN 8077/78, DIN 8076, DVS 2207, EN ISO 15874-2",
    },
    {
      "@type": "PropertyValue",
      name: "Approval",
      value: "WRAS Approved",
    },
    {
      "@type": "PropertyValue",
      name: "Warranty",
      value: "50 years guaranteed service life",
    },
  ],
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
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdLocalBusiness),
        }}
      />
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

      {/* ─── Hero Header ─── */}
      {/*
        LAYOUT STRATEGY:
        ─ Mobile / Tablet (< lg): Video is a full-bleed background.
          A dark gradient overlay sits above it; text content is layered
          on top at z-10. The section has a fixed min-height so the video
          fills the frame.
        ─ Desktop (≥ lg): Normal document flow with overflow:visible.
          Inner div switches to a 2-column grid. Text occupies the left
          column; the square video is a standalone right-column element
          that maintains its native 1:1 aspect ratio.
      */}
      <section
        id="products-hero"
        className="
          relative overflow-hidden
          pt-28 lg:pt-40
          pb-16 lg:pb-24
          px-6 lg:px-8
          min-h-[80vh] lg:min-h-0
        "
      >
        {/* ── Full-bleed background video — visible on mobile/tablet only ── */}
        {/*
          Hidden on lg+ (hidden lg:hidden would show on desktop — we want
          the opposite: show on mobile/tablet, hide on desktop).
          We use lg:hidden to suppress it at desktop breakpoint.
        */}
        <div
          aria-hidden="true"
          className="lg:hidden absolute inset-0 w-full h-full z-0"
        >
          <video
            src="/videos/products hero/Rakplus Products Page 1-1.mp4"
            autoPlay
            muted
            loop
            playsInline
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left column: Text content ── */}
            <div>
              <p className="text-xs font-semibold text-brand-green lg:text-brand-green text-white/80 uppercase tracking-[0.3em] mb-4">
                Product Catalog
              </p>
              <h1
                className="
                  font-sans tracking-tight
                  text-white lg:text-brand-charcoal
                  text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                  font-bold leading-[0.95]
                "
                style={{ textWrap: "balance" }}
              >
                Premium PP-R Pipes / Fittings in UAE
                <br />
                <span className="text-brand-green">Rakplus</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-white/90 lg:text-neutral-950 leading-relaxed max-w-2xl">
                Engineered to German STD DIN 8077/78, Rakplus delivers
                high-quality, WRAS-approved PP-R pipe systems designed for
                extreme durability in the GCC climate. Manufactured by
                Aquasmart Plastic Industries L.L.C with ISO 9001:2015 and
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
                      bg-white/20 lg:bg-brand-green/10
                      text-white lg:text-brand-green
                      text-xs font-semibold tracking-wide
                      backdrop-blur-sm lg:backdrop-blur-none
                    "
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right column: Square standalone video — desktop only ── */}
            {/*
              aspect-square enforces the native 1:1 ratio.
              Hidden on mobile/tablet since the video is already the
              full-bleed background on those breakpoints.
            */}
            <div
              aria-hidden="true"
              className="hidden lg:block w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
                <video
                  src="/videos/products hero/Rakplus Products Page 1-1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className={`group relative flex flex-col rounded-2xl bg-brand-charcoal border-t-[3px] ${category.borderColor} transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 overflow-hidden`}
                  >
                    {/* 16:9 Cover Image Area */}
                    <div className="aspect-video w-full overflow-hidden bg-neutral-950">
                      {product.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.coverImage}
                          alt={product.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl text-neutral-600 select-none">⬡</span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col justify-between flex-1 p-6">
                    {/* Product ID */}
                    <div className="mb-4">
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
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

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

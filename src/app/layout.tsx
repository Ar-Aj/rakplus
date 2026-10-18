import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import {
  buildOrganizationJsonLd,
  buildLocalBusinessJsonLd,
  buildFaqJsonLd,
} from "@/lib/seo";
import { AEO_QA_ITEMS } from "@/components/AeoTargetBlock";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ─── SEO-SAFE DOMAIN ───────────────────────────────────────────────
// RAKPLUS canonical domain — used across all metadata + JSON-LD.
export const SITE_URL = "https://rakplusuae.com";
export const SITE_NAME = "RakPlus";
export const SITE_NAME_FULL =
  "RakPlus by Aquasmart Plastic Industries L.L.C";

/**
 * ROOT METADATA — Overrides the parent layout for ALL pages.
 *
 * Strategy:
 *  • title.template — child pages only need to set their short title; the
 *    brand suffix is appended automatically → zero title duplication.
 *  • description — strictly references the 4 approved brand claims
 *    (100% Polymer, 100% Brass, WRAS approved, 50-year guarantee).
 *  • openGraph/twitter — social cards use rakplusuae.com canonical.
 *  • robots — explicitly allows index/follow + Googlebot image snippets.
 *  • canonical + alternates — prevents URL-fragment cannibalisation.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ── Title template: "<page> | RakPlus — PP-R & PEX Piping | UAE"
  title: {
    default:
      "RakPlus — WRAS Approved PPR Pipes & Fittings in UAE | 50-Year Guarantee",
    template: "%s | RakPlus UAE",
  },

  description:
    "RakPlus manufactures premium PPR pipes and fittings engineered to German DIN 8077/8078. Made from 100% Polymer with 100% Brass inserts, WRAS approved for potable water, with a 50-year guaranteed service life. UAE's premium PP-R supplier for Dubai, Abu Dhabi & the GCC.",

  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: [
    "ppr pipes uae",
    "ppr fittings uae",
    "premium ppr pipe manufacturers uae",
    "wras approved ppr pipes dubai",
    "100% brass ppr fittings uae",
    "hot and cold water ppr pipes uae",
    "50 years guaranteed ppr plumbing uae",
    "RakPlus",
    "PP-R pipes",
    "Aquasmart Plastic Industries",
  ],
  authors: [{ name: SITE_NAME_FULL, url: SITE_URL }],
  creator: SITE_NAME_FULL,
  publisher: SITE_NAME_FULL,
  category: "Industrial Manufacturing",
  classification: "Building Materials / Plumbing Systems",

  // ── Robots — explicitly clear: index, follow, all snippets allowed.
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ── Canonical & language alternates (en only for UAE market).
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      "en-AE": `${SITE_URL}/`,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_AE",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title:
      "RakPlus — WRAS Approved PPR Pipes & Fittings in UAE | 50-Year Guarantee",
    description:
      "Premium PPR pipes & fittings engineered to German DIN 8077/8078. 100% Polymer, 100% Brass inserts, WRAS approved, 50-year guarantee. UAE's trusted PP-R manufacturer.",
    images: [
      {
        url: "/images/og-rakplus-cover.jpg",
        width: 1200,
        height: 630,
        alt: "RakPlus WRAS-approved PPR pipes and fittings — 50-year guaranteed service life",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "RakPlus — WRAS Approved PPR Pipes & Fittings in UAE | 50-Year Guarantee",
    description:
      "Premium PPR pipes & fittings engineered to German DIN 8077/8078. 100% Polymer, 100% Brass inserts, WRAS approved, 50-year guarantee.",
    images: ["/images/og-rakplus-cover.jpg"],
    creator: "@rakplusuae",
    site: "@rakplusuae",
  },

  // ── Verification (Google Search Console + Bing) — paste IDs here.
  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
    yandex: ["yandex-verification-code"],
    yahoo: ["yahoo-verification-code"],
  },

  // ── Icons / manifest.
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },

  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#008c4a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── JSON-LD builders (delegated to lib/seo.ts) ────────────────────
const jsonLdOrganization = buildOrganizationJsonLd();
const jsonLdLocalBusiness = buildLocalBusinessJsonLd();
const jsonLdFaqPage = buildFaqJsonLd(AEO_QA_ITEMS);

// ─── JSON-LD: WebSite + SearchAction (sitelinks search box) ─────────
const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: "en-AE",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AE" className={inter.variable}>
      <head>
        {/* Clash Display — display/hero font loaded via Fontshare CDN */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />

        {/* ── Preconnect to Google Fonts for self-host perf ── */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ── JSON-LD: Organization (global) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        {/* ── JSON-LD: LocalBusiness (UAE) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
        {/* ── JSON-LD: WebSite + Sitelinks Search ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        {/* ── JSON-LD: FAQPage (AEO) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqPage) }}
        />
      </head>
      <body className="bg-studio-white text-ink font-sans antialiased">
        <Preloader />
        <ScrollToTop />
        <SmoothScroll>
          {/* Fixed navigation — z-50 above everything */}
          <Navbar />

          {/* Page content — individual pages own their <main> tags */}
          <div id="main-content" className="relative">
            {children}
          </div>

          {/* Corporate footer */}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
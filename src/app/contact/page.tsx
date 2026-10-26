/**
 * RAKPLUS Contact Page — Server Component (Phase 3 SEO Hydration)
 *
 * Renders crawlable static HTML (H1, JSON-LD, SEOContentFallback) and
 * mounts the <ContactPageClient /> shell for the interactive form.
 */

import type { Metadata } from "next";
import {
  buildBreadcrumbJsonLd,
  buildOgImages,
  absoluteUrl,
  OG_COVER,
  SITE,
} from "@/lib/seo";
import SEOContentFallback from "@/components/SEOContentFallback";
import ContactPageClient from "./ContactPageClient";

const jsonLdContactPage = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE.url}/contact/#contactpage`,
  name: "Contact RakPlus",
  description:
    "Request technical datasheets and bulk quotations for WRAS-approved PP-R pipe systems in the UAE and GCC.",
  url: `${SITE.url}/contact/`,
  inLanguage: "en-AE",
  about: { "@id": `${SITE.url}/#organization` },
  mainEntity: { "@id": `${SITE.url}/#localbusiness` },
};

const jsonLdBreadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", url: `${SITE.url}/` },
  { name: "Contact", url: `${SITE.url}/contact/` },
]);

export const metadata: Metadata = {
  title:
    "Contact RakPlus UAE — Request a PPR Pipe Quotation & WRAS Dossier",
  description:
    "Contact RakPlus® Rohrsysteme UAE for WRAS-approved PPR pipe quotations, technical datasheets, and DIN 8077/8078 specification support across the UAE and GCC.",
  keywords: [
    "RakPlus contact UAE",
    "PPR pipe quotation UAE",
    "WRAS dossier UAE",
    "ppr pipes and fittings supplier in dubai",
    "PPR specification support",
    "PPR pipes Dubai contact",
  ],
  alternates: {
    canonical: `${SITE.url}/contact/`,
  },
  openGraph: {
    title:
      "Contact RakPlus UAE — Request a PPR Pipe Quotation & WRAS Dossier",
    description:
      "Contact RakPlus® Rohrsysteme UAE for WRAS-approved PPR pipe quotations across the UAE and GCC. DIN 8077/8078, ISO 9001:2015, 100% Polymer, 100% Brass, 50-year guarantee. Umm Al Quwain, UAE.",
    url: `${SITE.url}/contact/`,
    siteName: SITE.name,
    locale: "en_AE",
    type: "website",
    images: buildOgImages(
      "Contact RakPlus UAE for WRAS approved PPR pipe quotations, technical datasheets and DIN 8077/8078 specification support"
    ),
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact RakPlus UAE — PPR Pipe Quotation & WRAS Dossier",
    description:
      "RakPlus® Rohrsysteme UAE — WRAS approved PPR pipes, DIN 8077/8078, 50-year guarantee.",
    images: [absoluteUrl(OG_COVER)],
  },
};

const CONTACT_SEO_SECTIONS = [
  {
    heading: "RakPlus® Rohrsysteme UAE — Factory & Headquarters",
    body: "RakPlus® is manufactured by RakPlus® Rohrsysteme UAE at our factory in the Industrial Area of Umm Al Quwain, United Arab Emirates. The facility operates under ISO 9001:2015 quality management and ISO 14001:2015 environmental management systems.",
    keyword: "RakPlus Rohrsysteme UAE contact",
  },
  {
    heading: "Catalogue Direct Phone Lines",
    body: "Call our catalogue direct line at +971 6 744 4345 (Catalogue p.27) or the secondary line at +971 6 523 3869. Our technical sales team responds to engineering and procurement inquiries within 24 business hours.",
    keyword: "PPR manufacturer phone UAE",
  },
  {
    heading: "B2B & Engineering Email",
    body: "Send bulk quotation requests, technical datasheet requirements, and DIN 8077/8078 specification support requests to info@rakplusuae.com. The RakPlus engineering desk supports specifying engineers, MEP consultants, and project procurement teams across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.",
    keyword: "PPR engineering email UAE",
  },
  {
    heading: "Distribution Across the UAE & GCC",
    body: "RakPlus supplies distributors, contractors, and MEP consultants across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain, Fujairah, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Bulk quotation requests receive dimensional tables, WRAS certification dossiers, and DVS 2207 welding parameter sheets.",
    keyword: "PPR distribution UAE GCC",
  },
  {
    heading: "Submit a Verified RFQ",
    body: "Fill in the inquiry form with your project requirements — product class (PN10 to PN25), diameter (20 mm to 160 mm), volume, and timeline. Our team will respond with a bulk quotation, technical datasheet, and WRAS certificate within one business day.",
    keyword: "RFQ PPR pipes UAE",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* ── Crawlable commercial keyword heading.
          The single canonical <h1> for this route is the visible above-
          the-fold hero headline ("Connect.") — this line is a semantic
          <h2> so the compiled DOM carries exactly one H1. */}
      <h2 className="sr-only">
        Contact RakPlus UAE — Request a PPR Pipe Quotation &amp; WRAS Dossier
      </h2>

      {/* ── SEO Content Fallback (real, crawlable HTML) ── */}
      <SEOContentFallback
        pageTopic="Contact — RakPlus® Rohrsysteme UAE, RakPlus UAE"
        sections={CONTACT_SEO_SECTIONS}
      />

      {/* ── JSON-LD: ContactPage + BreadcrumbList ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContactPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <ContactPageClient />
    </main>
  );
}

import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import {
  buildBreadcrumbJsonLd,
  buildOgImages,
  absoluteUrl,
  OG_COVER,
  SITE,
} from "@/lib/seo";
import SEOContentFallback from "@/components/SEOContentFallback";

const jsonLdBreadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", url: `${SITE.url}/` },
  { name: "About", url: `${SITE.url}/about/` },
]);

export const metadata: Metadata = {
  title:
    "Aquasmart Plastic Industries: ISO 9001 & DIN 8077/8078 PPR Pipe Manufacturing in the UAE",
  description:
    "Aquasmart Plastic Industries L.L.C — the UAE facility behind RakPlus. ISO 9001:2015 certified PPR pipe manufacturing, DIN 8077/8078 dimensional standards, 100% polymer, 100% brass, WRAS approved, 50-year guarantee.",
  keywords: [
    "Aquasmart Plastic Industries UAE",
    "RakPlus about",
    "PPR pipe manufacturer UAE",
    "ISO 9001 PPR manufacturer",
    "DIN 8077 8078 PPR UAE",
    "Umm Al Quwain PPR factory",
    "UAE PPR manufacturer 50 years",
    "ppr pipe manufacturer in gcc",
    "ppr pipes and fittings supplier in dubai",
    "ppr pipes uae",
  ],
  alternates: {
    canonical: `${SITE.url}/about/`,
  },
  openGraph: {
    title:
      "Aquasmart Plastic Industries — DIN 8077/8078 PPR Pipe Manufacturing in the UAE",
    description:
      "RakPlus by Aquasmart Plastic Industries — ISO 9001:2015, DIN 8077/8078, WRAS approved, 100% polymer, 100% brass, 50-year guarantee.",
    url: `${SITE.url}/about/`,
    siteName: SITE.name,
    locale: "en_AE",
    type: "website",
    images: buildOgImages(
      "Aquasmart Plastic Industries L.L.C — the UAE facility behind RakPlus, manufacturing WRAS approved PPR pipes to DIN 8077/8078"
    ),
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Aquasmart Plastic Industries — DIN 8077/8078 PPR Manufacturing in the UAE",
    description:
      "ISO 9001:2015, WRAS approved, 100% polymer PPR pipes with 100% brass fittings, 50-year guarantee.",
    images: [absoluteUrl(OG_COVER)],
  },
};

const ABOUT_SEO_SECTIONS = [
  {
    heading: "Aquasmart Plastic Industries L.L.C — UAE Facility",
    body: "RakPlus is manufactured by Aquasmart Plastic Industries L.L.C at our Umm Al Quwain production facility in the United Arab Emirates. The company operates under ISO 9001:2015 quality management and ISO 14001:2015 environmental management systems, with every pipe and fitting dimensionally certified to German Standard DIN 8077/8078.",
    keyword: "Aquasmart Plastic Industries UAE",
  },
  {
    heading: "PPR Pipe Manufacturing to DIN 8077/8078",
    body: "RakPlus PPR pipes are extruded to German Standard DIN 8077 (pipe dimensions) and DIN 8078 (general quality requirements) and welded to DVS 2207 parameters. The same standard chain is used by European consulting engineers when specifying PPR for high-rise risers, hot-water recirculation loops, and commercial plumbing across the GCC.",
    keyword: "DIN 8077 8078 PPR UAE",
  },
  {
    heading: "Four Verified Brand Claims",
    body: "Aquasmart publishes the four specifier-critical claims for every RakPlus quotation: 100% Polymer pipe matrix, 100% Brass insert fittings, WRAS approved material, and a 50-year manufacturer service life guarantee. The claims are backed by factory test reports and WRAS certification dossiers supplied with every commercial inquiry.",
    keyword: "100% polymer 100% brass WRAS 50 years",
  },
  {
    heading: "Supplying the GCC Since Inception",
    body: "From the Umm Al Quwain facility, RakPlus supplies distributors, contractors, and specifying engineers across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. The company's commercial desk responds to technical datasheet, dimensional table, and bulk quotation requests within one business day.",
    keyword: "PPR manufacturer GCC supply",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Crawlable commercial keyword heading.
          The single canonical <h1> for this route is the visible hero
          headline ("The Best PPR Pipes & Fittings Manufacturer in the UAE.")
          rendered by AboutPageClient — this line is a semantic <h2> so the
          compiled DOM carries exactly one H1. */}
      <h2 className="sr-only">
        Aquasmart Plastic Industries: ISO 9001 &amp; DIN 8077/8078 PPR Pipe Manufacturing in the UAE
      </h2>

      {/* ── SEO Content Fallback (real, crawlable HTML) ── */}
      <SEOContentFallback
        pageTopic="About — Aquasmart Plastic Industries, UAE PPR Manufacturer"
        sections={ABOUT_SEO_SECTIONS}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <AboutPageClient />
    </>
  );
}

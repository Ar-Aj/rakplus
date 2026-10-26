import type { Metadata } from "next";
import InnovationPageClient from "./InnovationPageClient";
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
  { name: "Innovation", url: `${SITE.url}/innovation/` },
]);

export const metadata: Metadata = {
  title:
    "German Standard DIN 8077/8078 Polymer Extrusion & 100% Brass Transition Engineering",
  description:
    "RakPlus engineering — DIN 8077/8078 PP-R extrusion, DVS 2207 fusion welding, 100% brass transition engineering. PN10 to PN25, 20 mm to 160 mm, 70°C continuous, 100°C peak, 50-year guarantee.",
  keywords: [
    "DIN 8077 8078 polymer extrusion",
    "100% brass transition engineering",
    "DVS 2207 fusion welding",
    "PPR pipe engineering UAE",
    "polymer extrusion GCC",
    "RakPlus innovation",
    "PP-R pipe engineering",
    "ppr pipes uae",
    "ppr pipe manufacturer in gcc",
    "ppr pipes and fittings supplier in dubai",
  ],
  alternates: {
    canonical: `${SITE.url}/innovation/`,
  },
  openGraph: {
    title:
      "DIN 8077/8078 Polymer Extrusion & 100% Brass Transition Engineering",
    description:
      "German Standard PP-R extrusion, DVS 2207 fusion welding, 100% brass transition engineering. PN10 to PN25, 20–160 mm, 0–70°C continuous, 100°C peak. 50-year guarantee.",
    url: `${SITE.url}/innovation/`,
    siteName: SITE.name,
    locale: "en_AE",
    type: "website",
    images: buildOgImages(
      "RakPlus engineering — DIN 8077/8078 PP-R polymer extrusion, DVS 2207 fusion welding and 100% brass transition fittings"
    ),
  },
  twitter: {
    card: "summary_large_image",
    title:
      "DIN 8077/8078 Polymer Extrusion & 100% Brass Transition Engineering",
    description:
      "RakPlus engineering — German Standard PP-R extrusion, 100% brass transition fittings, 50-year guarantee.",
    images: [absoluteUrl(OG_COVER)],
  },
};

const INNOVATION_SEO_SECTIONS = [
  {
    heading: "DIN 8077/8078 PP-R Extrusion",
    body: "RakPlus PP-R pipes are extruded to German Standard DIN 8077 (dimensional specifications) and DIN 8078 (general quality requirements). The extrusion line maintains SDR tolerances from SDR 11 (PN10) to SDR 5 (PN25) across diameters 20 mm to 160 mm. Every production batch is dimensionally inspected against DIN 8077/8078 reference tables before release.",
    keyword: "DIN 8077 8078 polymer extrusion",
  },
  {
    heading: "100% Brass Transition Engineering",
    body: "Brass-insert transition fittings are machined from 100% brass bar stock — never plated, never hybrid. The brass insert geometry is engineered to lock into the PP-R socket under DVS 2207 fusion welding, producing a homogeneous molecular joint between the polymer pipe and the brass metal transition. This is the 100% brass transition engineering standard demanded by consulting engineers across the GCC.",
    keyword: "100% brass transition engineering",
  },
  {
    heading: "DVS 2207 Fusion Welding",
    body: "DVS 2207 is the German welding council standard for thermoplastic fusion. RakPlus socket fusion equipment is calibrated to DVS 2207 temperature, time, and pressure parameters. Field technicians are DVS 2207 certified, and every commercial quotation references the DVS 2207 welding protocol to be used on site.",
    keyword: "DVS 2207 fusion welding",
  },
  {
    heading: "Thermal Expansion Engineering",
    body: "PP-R's linear thermal expansion coefficient is 0.15 mm/m·K. For a 10 m hot-water run at 50°C ΔT the linear expansion is 75 mm — absorbed by engineered bending arms and expansion loops per DVS 2207. The RakPlus thermal expansion calculator on this page uses the catalogue's published coefficients to size every expansion loop precisely.",
    keyword: "thermal expansion PPR",
  },
  {
    heading: "50-Year Engineered Service Life",
    body: "The 50-year manufacturer service life is engineered, not assumed. It derives from the 100% polymer pipe matrix, 100% brass transition fittings, WRAS approved material specification, and DIN 8077/8078 dimensional control. Every RakPlus commercial quotation is backed by technical datasheets and factory test certificates.",
    keyword: "50 years ppr engineered",
  },
];

export default function InnovationPage() {
  return (
    <>
      {/* ── Crawlable commercial keyword heading.
          The single canonical <h1> for this route is the visible hero
          headline ("Engineering the Best PP-R Pipes in the Multi-Layer
          Technology.") — this line is a semantic <h2> so the compiled
          DOM carries exactly one H1. */}
      <h2 className="sr-only">
        German Standard DIN 8077/8078 Polymer Extrusion &amp; 100% Brass Transition Engineering
      </h2>

      {/* ── SEO Content Fallback (real, crawlable HTML) ── */}
      <SEOContentFallback
        pageTopic="Innovation — DIN 8077/8078 PP-R Engineering & 100% Brass Transition"
        sections={INNOVATION_SEO_SECTIONS}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <InnovationPageClient />
    </>
  );
}

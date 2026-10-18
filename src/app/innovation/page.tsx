import type { Metadata } from "next";
import InnovationPageClient from "./InnovationPageClient";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

const jsonLdBreadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://rakplusuae.com/" },
  { name: "Innovation", url: "https://rakplusuae.com/innovation/" },
]);

export const metadata: Metadata = {
  title: "Innovation | RAKPLUS — Advanced PP-R Pipe Engineering in the UAE",
  description:
    "Discover RAKPLUS® multi-layer co-extrusion technology — DIN 8077/8078 & DVS 2207 certified PP-R piping systems engineered for the GCC's most demanding residential, HVAC, and industrial applications.",
};

export default function InnovationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <InnovationPageClient />
    </>
  );
}

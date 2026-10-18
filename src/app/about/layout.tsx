import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

/**
 * ABOUT — Brand authority page.
 *
 * Targets: "premium ppr pipe manufacturers uae" (SECONDARY #3) +
 * "50 years guaranteed ppr plumbing uae" (SECONDARY #7).
 *
 * Brand story + 50-year guarantee emphasis.
 */
export const metadata: Metadata = {
  title:
    "About RakPlus | 50-Year Guaranteed PPR Plumbing Manufacturer UAE",
  description:
    "RakPlus by Aquasmart Plastic Industries — premium PPR pipe manufacturer in the UAE. German DIN 8077/8078 engineered, WRAS approved, 100% Polymer, 100% Brass inserts, 50-year guaranteed service life.",
  keywords: [
    "premium ppr pipe manufacturers uae",
    "50 years guaranteed ppr plumbing uae",
    "RakPlus about",
    "Aquasmart Plastic Industries",
    "UAE PPR manufacturer",
    "German standard PPR",
  ],
  alternates: {
    canonical: "https://rakplusuae.com/about/",
  },
  openGraph: {
    title:
      "About RakPlus | 50-Year Guaranteed PPR Plumbing Manufacturer UAE",
    description:
      "Premium UAE manufacturer of WRAS-approved PPR pipes & fittings. 100% Polymer, 100% Brass inserts, 50-year guarantee. German DIN 8077/8078.",
    url: "https://rakplusuae.com/about",
    type: "website",
    locale: "en_AE",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
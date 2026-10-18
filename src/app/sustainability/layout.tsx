import type { Metadata } from "next";

/**
 * SUSTAINABILITY — Long-Tail keyword: "wras approved ppr pipes dubai" +
 * Potable water safety angle. Secondary keyword emphasis.
 *
 * Targets: "WRAS approved ppr pipes dubai" (SECONDARY #4).
 * Lean angle: safety, hygiene, sustainability of WRAS-approved material.
 */
export const metadata: Metadata = {
  title:
    "WRAS Approved PPR Pipes Dubai — Hygienic & Safe for Potable Water",
  description:
    "RakPlus WRAS approved PPR pipes for Dubai projects. Engineered to German DIN 8077/8078 for potable water safety. 100% Polymer, 50-year guarantee. Trusted by engineers across the UAE & GCC.",
  keywords: [
    "wras approved ppr pipes dubai",
    "WRAS approved PPR UAE",
    "potable water ppr pipes",
    "hygienic ppr piping",
    "drinking water pipes Dubai",
    "RakPlus sustainability",
  ],
  alternates: {
    canonical: "https://rakplusuae.com/sustainability/",
  },
  openGraph: {
    title:
      "WRAS Approved PPR Pipes Dubai — Hygienic & Safe for Potable Water",
    description:
      "RakPlus WRAS approved PPR pipes — hygienic, non-toxic, 50-year guarantee. DIN 8077/8078 certified for potable water across the UAE & GCC.",
    url: "https://rakplusuae.com/sustainability",
    type: "website",
    locale: "en_AE",
  },
};

export default function SustainabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
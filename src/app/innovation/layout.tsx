import type { Metadata } from "next";
import InnovationPageClient from "./InnovationPageClient";

/**
 * INNOVATION — Long-Tail keyword: "hot and cold water ppr pipes uae" +
 * Innovation / engineering differentiation. Secondary keyword emphasis.
 *
 * Targets: "hot and cold water ppr pipes uae" (SECONDARY #6).
 */
export const metadata: Metadata = {
  title:
    "Hot & Cold Water PPR Pipes UAE — German Engineering | RakPlus",
  description:
    "RakPlus hot & cold water PPR pipes for UAE projects. 100% Polymer, 70°C continuous / 100°C peak rating, German DIN 8077/8078 engineered. 50-year guarantee. Premium PP-R innovation for residential & commercial.",
  keywords: [
    "hot and cold water ppr pipes uae",
    "hot cold ppr pipes Dubai",
    "PP-R innovation UAE",
    "polypropylene random copolymer",
    "RakPlus innovation",
    "German engineering PPR",
  ],
  alternates: {
    canonical: "https://rakplusuae.com/innovation/",
  },
  openGraph: {
    title:
      "Hot & Cold Water PPR Pipes UAE — German Engineering | RakPlus",
    description:
      "RakPlus hot & cold water PPR pipes engineered to German DIN 8077/8078. 100% Polymer, 50-year guarantee, 70°C continuous rating. UAE & GCC innovation.",
    url: "https://rakplusuae.com/innovation",
    type: "website",
    locale: "en_AE",
  },
};

export default function InnovationPage() {
  return <InnovationPageClient />;
}
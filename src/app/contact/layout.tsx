import type { Metadata } from "next";

/**
 * CONTACT — Conversion-focused contact page.
 *
 * Targets long-tail B2B intent queries (RFQ, distributor inquiry).
 * Does NOT target a primary product keyword (avoid cannibalisation).
 */
export const metadata: Metadata = {
  title:
    "Contact RakPlus — Premium PPR Pipes & Fittings Supplier UAE",
  description:
    "Contact RakPlus for WRAS-approved PPR pipes & fittings in the UAE. Request datasheets, bulk quotations & project specifications. German DIN 8077/8078, 50-year guarantee. 100% Polymer, 100% Brass inserts.",
  keywords: [
    "Contact RakPlus",
    "PPR pipe supplier UAE",
    "WRAS approved pipes Dubai",
    "PPR fittings quote GCC",
    "DIN 8077 pipe manufacturer",
    "Aquasmart Plastic Industries",
  ],
  alternates: {
    canonical: "https://rakplusuae.com/contact/",
  },
  openGraph: {
    title:
      "Contact RakPlus — Premium PPR Pipes & Fittings Supplier UAE",
    description:
      "Get in touch with RakPlus for WRAS-approved PPR pipes & fittings in the UAE. Request datasheets, bulk quotations & project specifications.",
    url: "https://rakplusuae.com/contact",
    type: "website",
    locale: "en_AE",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
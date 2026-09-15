import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Rakplus | Premium PP-R Pipes / Fittings Supplier UAE",
  description:
    "Get in touch with Rakplus technical sales for WRAS-approved, German standard DIN 8077/78 PP-R pipes / fittings in Dubai, UAE, and across the GCC. Request datasheets, bulk quotations, and project specifications.",
  keywords: [
    "Contact Rakplus",
    "PP-R pipe supplier UAE",
    "WRAS approved pipes Dubai",
    "PP-R fittings quote GCC",
    "DIN 8077 pipe manufacturer",
    "Aquasmart Plastic Industries",
  ],
  openGraph: {
    title: "Contact Rakplus | Premium PP-R Pipes / Fittings Supplier UAE",
    description:
      "Request technical datasheets and bulk quotations for WRAS-approved PP-R pipe systems engineered to German STD DIN 8077/78.",
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

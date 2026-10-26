/**
 * Privacy Policy — /privacy
 *
 * Footer-linked on EVERY page. Without this route the footer link 404s,
 * which is both a broken-link signal for crawlers and a trust liability
 * for a B2B site collecting RFQs.
 *
 * Locked scope: UI/metadata only. No visible marketing copy elsewhere is
 * touched. Statements stay strictly inside the four verified brand claims
 * (100% Polymer, 100% Brass, WRAS approved material, 50-year guarantee).
 */

import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy — RakPlus® Rohrsysteme UAE",
  description:
    "RakPlus® Rohrsysteme UAE privacy policy. How we collect, use and protect enquiry data submitted through rakplusuae.com. WRAS approved PPR pipes and 100% Brass fittings, DIN 8077/8078, 50-year guaranteed service life.",
  keywords: [
    "RakPlus privacy policy",
    "rakplusuae privacy",
    "PPR pipe manufacturer UAE privacy",
    "ppr pipes uae",
  ],
  alternates: {
    canonical: `${SITE.url}/privacy/`,
  },
  openGraph: {
    title: "Privacy Policy — RakPlus® Rohrsysteme UAE",
    description:
      "How RakPlus® Rohrsysteme UAE collects, uses and protects enquiry data submitted through rakplusuae.com.",
    url: `${SITE.url}/privacy/`,
    siteName: SITE.name,
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — RakPlus® Rohrsysteme UAE",
    description:
      "How RakPlus® Rohrsysteme UAE collects, uses and protects enquiry data.",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-24 px-6 lg:px-8 bg-white">
      <article className="max-w-3xl mx-auto">
        <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-neutral-600">
          RakPlus® Rohrsysteme UAE · {SITE.address.locality}, United Arab
          Emirates · Last updated 22 October 2026
        </p>

        <section className="mt-10 space-y-8 text-neutral-800 leading-relaxed">
          <div>
            <h2 className="font-sans text-2xl font-bold text-neutral-950">
              1. Who we are
            </h2>
            <p className="mt-3">
              RakPlus® is a brand of RakPlus® Rohrsysteme UAE, a manufacturer of
              WRAS approved PPR pipes and 100% Brass insert fittings produced to
              German Standard DIN 8077/8078 at our facility in the Industrial
              Area of Umm Al Quwain, United Arab Emirates. This policy applies
              to rakplusuae.com.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-neutral-950">
              2. Information we collect
            </h2>
            <p className="mt-3">
              We collect only the information you voluntarily provide through
              our enquiry form: your name, company, email address, telephone
              number, and the technical requirements of your project (product
              class, diameter, volume and timeline). We do not collect payment
              card details through this website.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-neutral-950">
              3. How we use your information
            </h2>
            <p className="mt-3">
              Enquiry data is used solely to prepare technical datasheets,
              dimensional tables, WRAS certification dossiers and commercial
              quotations, and to respond to your request. We do not sell or
              share your details with third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-neutral-950">
              4. Cookies and analytics
            </h2>
            <p className="mt-3">
              rakplusuae.com is a static export and does not set advertising
              or tracking cookies. No third-party behavioural profiling is
              performed on this site.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-neutral-950">
              5. Data retention
            </h2>
            <p className="mt-3">
              Enquiry records are retained for the duration of the commercial
              relationship and for the period required by UAE commercial record
              keeping obligations, after which they are securely deleted.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-2xl font-bold text-neutral-950">
              6. Contact
            </h2>
            <p className="mt-3">
              For any privacy question, or to request deletion of your data,
              contact our technical desk at{" "}
              <a href={`mailto:${SITE.email}`} className="underline">
                {SITE.email}
              </a>{" "}
              or{" "}
              <a href={`tel:${SITE.phone}`} className="underline">
                {SITE.phone}
              </a>
              .
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
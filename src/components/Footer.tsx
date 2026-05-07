/**
 * Footer — Corporate footer with real contact data from the RAKPLUS submittal.
 *
 * Uses bg-brand-charcoal with white text for an authoritative, heavy feel.
 * Contact data extracted directly from the technical submittal JSON:
 * Al Haseeb Trading Co L.L.C, PO Box 21842, Sharjah - U.A.E
 */

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const PRODUCT_LINKS = [
  { label: "PPR Green PN10", href: "/products/ppr-green-pn10" },
  { label: "PPR Green PN16", href: "/products/ppr-green-pn16" },
  { label: "PPR Green PN20", href: "/products/ppr-green-pn20" },
  { label: "PPR Green PN25", href: "/products/ppr-green-pn25" },
  { label: "PPR Yellow PN10", href: "/products/ppr-yellow-pn10" },
  { label: "PPR Yellow PN16", href: "/products/ppr-yellow-pn16" },
  { label: "PPR Yellow PN20", href: "/products/ppr-yellow-pn20" },
  { label: "PPR Yellow PN25", href: "/products/ppr-yellow-pn25" },
  { label: "Green Fittings", href: "/products/ppr-fittings-green" },
  { label: "Yellow Fittings", href: "/products/ppr-fittings-yellow" },
  { label: "PEX Systems", href: "/products/pex-systems" },
] as const;

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Innovation", href: "/innovation" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Contact", href: "/contact" },
] as const;

const CERTIFICATIONS = [
  "ISO 9001:2015",
  "ISO 14001:2015",
  "DIN 8077/8078",
  "DIN 8076",
  "DVS 2207",
  "EN ISO 15874-2",
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-black/50 backdrop-blur-lg text-white border-t border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
      aria-label="Site footer"
    >
      {/* ─── Top accent bar ─── */}
      <div className="h-1 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-red" />

      {/* ─── Main footer content ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand + Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 group">
              <span className="font-display text-2xl font-bold tracking-tight text-white transition-opacity group-hover:opacity-80">
                RAK<span className="text-brand-green">PLUS</span>
              </span>
              <span className="block text-[10px] text-white/40 uppercase tracking-[0.25em] mt-0.5">
                Rohrsysteme
              </span>
            </Link>

            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              Reliable PP-R &amp; PEX piping systems for hot &amp; cold water
              transmission. Made in UAE to German DIN standards.
            </p>

            {/* Contact Info — extracted from submittal */}
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                <span>
                  Al Haseeb Trading Co L.L.C
                  <br />
                  PO Box 21842
                  <br />
                  Sharjah — U.A.E
                </span>
              </div>
              <a
                href="tel:+97165612877"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-brand-green transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-green flex-shrink-0" />
                +971 6 5612877
              </a>
              <a
                href="mailto:info@rakplus.com"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-brand-green transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-green flex-shrink-0" />
                info@rakplus.com
              </a>
            </address>
          </div>

          {/* Column 2: Products (split into 2 sub-columns) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
              Products
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {PRODUCT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-brand-green transition-colors duration-200 py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Company + Certifications */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
              Company
            </h3>
            <ul className="space-y-2 mb-8">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-brand-green transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">
              Certifications
            </h3>
            <div className="flex flex-wrap gap-2">
              {CERTIFICATIONS.map((cert) => (
                <span
                  key={cert}
                  className="inline-block px-2.5 py-1 text-[10px] font-medium text-white/50 border border-white/10 rounded-md uppercase tracking-wider"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom bar ─── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {currentYear} RakPlus by Aquasmart Plastic Industries L.L.C.
            All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/20 uppercase tracking-widest">
              Made in UAE
            </span>
            {/* German flag colors micro-accent */}
            <div className="flex gap-0.5">
              <div className="w-3 h-1.5 bg-brand-charcoal border border-white/20 rounded-sm" />
              <div className="w-3 h-1.5 bg-brand-red rounded-sm" />
              <div className="w-3 h-1.5 bg-brand-yellow rounded-sm" />
            </div>
            <span className="text-[10px] text-white/20 uppercase tracking-widest">
              German Standard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

/**
 * Navbar — Fixed glassmorphism navigation bar.
 *
 * Sits at z-50 above all content including the canvas sequence.
 * Uses backdrop-blur + semi-transparent background for readability
 * over the changing video canvas. Mobile hamburger triggers a
 * full-screen overlay nav.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Innovation", href: "/innovation" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to intensify the glass effect after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/15 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5"
            : "bg-white/5 backdrop-blur-sm border-b border-white/10"
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20"
          aria-label="Primary navigation"
        >
          {/* ─── Logo ─── */}
          <Link
            href="/"
            className="relative z-10 flex items-center gap-2 group"
            aria-label="RAKPLUS Home"
          >
            <span className="font-display text-xl lg:text-2xl font-bold text-white tracking-tight transition-opacity group-hover:opacity-80">
              RAK
              <span className="text-brand-green">PLUS</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium border-l border-white/20 pl-2 ml-1">
              Rohrsysteme
            </span>
          </Link>

          {/* ─── Desktop Links ─── */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10 flex items-center gap-1 group"
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80 transition-transform duration-200 group-hover:translate-y-0.5" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* ─── Desktop CTA ─── */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-brand-green hover:bg-brand-green/90 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-green/25 hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>
          </div>

          {/* ─── Mobile Hamburger ─── */}
          <button
            className="lg:hidden relative z-10 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </header>

      {/* ─── Mobile Full-Screen Overlay ─── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-brand-charcoal/95 backdrop-blur-2xl"
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Nav Links */}
        <nav className="relative z-10 flex flex-col items-center justify-center h-full px-8">
          <ul className="flex flex-col items-center gap-2 w-full max-w-sm">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.href}
                className="w-full"
                style={{
                  transitionDelay: isMobileOpen ? `${index * 80}ms` : "0ms",
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block w-full text-center py-4 text-2xl font-display font-semibold text-white hover:text-brand-green transition-all duration-300 rounded-xl hover:bg-white/5 ${
                    isMobileOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMobileOpen
                      ? `${150 + index * 80}ms`
                      : "0ms",
                  }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown className="inline-block w-5 h-5 ml-1 text-white/50" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div
            className={`mt-8 w-full max-w-sm transition-all duration-500 ${
              isMobileOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: isMobileOpen
                ? `${150 + NAV_LINKS.length * 80}ms`
                : "0ms",
            }}
          >
            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="block w-full text-center py-4 bg-brand-green hover:bg-brand-green/90 text-white text-lg font-semibold rounded-xl transition-all duration-200"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile brand badge */}
          <p
            className={`mt-12 text-xs text-white/30 uppercase tracking-[0.3em] transition-all duration-500 ${
              isMobileOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: isMobileOpen ? "600ms" : "0ms" }}
          >
            German Standard Engineering
          </p>
        </nav>
      </div>
    </>
  );
}

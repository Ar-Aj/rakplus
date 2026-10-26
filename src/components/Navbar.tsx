"use client";

/**
 * Navbar — Phase 20.2 Clean White Navigation
 *
 * Minimal, premium navbar designed for white backgrounds.
 * Pitch-black typography, emerald hover accents, clean borders.
 * Hides on scroll-down, reappears on scroll-up.
 * Mobile + Tablet (<1024px): Full-screen white overlay with staggered
 *   link reveals.
 *
 * IMPORTANT — overlay + Lenis + scroll-down-header-hide interact badly
 * on tablet:
 *   1. Lenis keeps running even when the overlay is open, so the
 *      scroll-down handler keeps firing and the header (with the close
 *      button) slides off-screen with no way back.
 *   2. The body-overflow lock in CSS is silently fought by Lenis.
 * Fixes below:
 *   • Use `useLenis()` to call `lenis.stop()` when the overlay opens
 *     and `lenis.start()` when it closes. Zero effect on
 *     CanvasSequence — only the Lenis runtime RAF + wheel handler are
 *     paused, the GSAP ticker / ScrollTrigger wiring is untouched.
 *   • While the overlay is open, force `isVisible=true` and ignore
 *     scroll direction.
 *   • Close the overlay on Escape, on resize-past-`lg`, and on route
 *     change — covers the iPad-Safari landscape/portrait rotation
 *     and back-navigation edge cases.
 */

import { useState, useEffect } from "react";
import Link from "@/components/AppLink";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
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
  const [isVisible, setIsVisible] = useState(true);

  // `useLenis()` returns the Lenis instance provided by `<ReactLenis>`
  // in SmoothScroll.tsx. Stopping it pauses wheel + touch + RAF without
  // touching GSAP's ticker or ScrollTrigger (those rules are locked per
  // .cursor/rules/no-touching-to-scroll-behavior.mdc).
  // `useLenis()` is null until after hydration on the client; we treat
  // null as "no Lenis in this environment" (e.g. SSR / no-JS previews).
  const lenis = useLenis();
  const pathname = usePathname();

  // Track scroll position for styling and direction for hide/show.
  // While the mobile/tablet overlay is open we FREEZE the visibility
  // state and ignore scroll direction — otherwise the header (with
  // the close button) slides off-screen under iPad/tablet viewports
  // because Lenis keeps firing wheel events behind the overlay.
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      // Suppress auto-hide when the menu overlay is open
      if (isMobileOpen) return;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }
      lastScrollY = currentScrollY;
    };

    const onScroll = () => {
      // Throttle to one update per animation frame so a Lenis-driven
      // smooth-scroll doesn't spam setState (was fine before, but now
      // we gate isMobileOpen inside the handler so we want minimal work).
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobileOpen]);

  // Lock body scroll + Lenis while the overlay is open. We do BOTH:
  //   • document.body.style.overflow = "hidden" — kills native scrollbar
  //     and prevents rubber-band scrolling on iOS Safari.
  //   • lenis.stop() / lenis.start() — kills Lenis's RAF/wheel handler,
  //     which is what was leaking past the body-overflow lock.
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isMobileOpen, lenis]);

  // Close overlay on Escape — universal a11y expectation.
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileOpen]);

  // Close overlay on route change (Link click already does this for
  // most cases, but this also covers back/forward navigation and any
  // programmatic route swap). Cheap because pathname only changes on
  // navigation.
  useEffect(() => {
    if (isMobileOpen) setIsMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close overlay if viewport grows past `lg` (1024px) — the desktop
  // bar appears, the overlay becomes orphaned whitespace.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024 && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-white/80 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <nav
          className="w-full px-6 md:px-12 flex items-center justify-between h-16 lg:h-20"
          aria-label="Primary navigation"
        >
          {/* ─── Logo ─── */}
          <Link
            href="/"
            className="relative z-10 flex items-center gap-2 group"
            aria-label="RAKPLUS Home"
          >
            <Image
              src="/images/logo.png"
              alt="RAKPLUS Logo"
              width={300}
              height={80}
              className="h-12 lg:h-16 w-auto object-contain transition-opacity group-hover: py-1"
              priority
            />
          </Link>

          {/* ─── Desktop Links ─── */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-ink/80 hover:text-emerald transition-colors duration-200 rounded-lg hover:bg-surface flex items-center gap-1 group"
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-ink/40 group-hover:text-emerald transition-transform duration-200 group-hover:translate-y-0.5" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* ─── Desktop CTA ─── */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-pitch-black hover:bg-emerald text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald/25 hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>
          </div>

          {/* ─── Mobile Hamburger ─── */}
          <button
            className="lg:hidden relative z-10 p-2 text-ink hover:bg-surface rounded-lg transition-colors"
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
          className="absolute inset-0 bg-white/98 backdrop-blur-2xl"
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
                  className={`block w-full text-center py-4 text-2xl font-sans font-semibold text-ink hover:text-emerald transition-all duration-300 rounded-xl hover:bg-surface ${
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
                    <ChevronDown className="inline-block w-5 h-5 ml-1 text-ink/40" />
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
              className="block w-full text-center py-4 bg-pitch-black hover:bg-emerald text-white text-lg font-semibold rounded-xl transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile brand badge */}
          <p
            className={`mt-12 text-xs text-slate uppercase tracking-[0.3em] transition-all duration-500 ${
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

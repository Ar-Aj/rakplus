import type { Config } from "tailwindcss";

/**
 * RakPlus Design System — Phase 1
 *
 * "Wet Brutalist Industrial Luxury"
 *
 * Inspired by the RakPlus Green Pipe in Wet Industrial Setting reference:
 *   • Dark wet-concrete backgrounds (obsidian / pitch-black)
 *   • Sapphire rim-lighting accents
 *   • Emerald PP-R polymer accents (the authentic RakPlus green)
 *   • Brass / gold highlights for 100% Brass insert callouts
 *   • Crimson for German DIN/DVS engineering markers
 *   • Concrete-light for clean technical specification surfaces
 *
 * ALL legacy tokens (brand-green, brand-red, brand-yellow, brand-charcoal)
 * have been PURGED. This file is now the single source of truth.
 */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ─── Surface tokens ─── */
        obsidian: "#070707",
        "pitch-black": "#0A0A0A",
        ink: "#171717",
        slate: "#64748B",

        "studio-white": "#FAFAFA",
        "concrete-light": "#F2F4F3",
        "concrete-mid": "#E5E7EB",
        surface: "#F5F5F5",

        /* ─── Brand accent tokens ─── */
        emerald: "#059669",
        "emerald-dark": "#047857",
        "emerald-polymer": "#008751", // Authentic RakPlus PP-R green
        brass: "#D4AF37",
        "brass-dark": "#C59B27",
        crimson: "#DC2626",
        "crimson-dark": "#B91C1C",

        /* ─── Legacy alias tokens (Phase 1 migration) ───
           These are kept as backwards-compatible aliases for
           pre-Phase-1 components (products page, contact page, etc.)
           that still reference `brand-*` / `bg-cream` classes.
           They map to the new design system colors. */
        "brand-green":   "#008751",  // → emerald-polymer
        "brand-red":     "#DC2626",  // → crimson
        "brand-yellow":  "#D4AF37",  // → brass
        "brand-charcoal":"#0A0A0A",  // → pitch-black
        cream:           "#F2F4F3",  // → concrete-light
        "bg-cream":      "#F2F4F3",  // → concrete-light

        /* ─── Architectural rim-lighting tokens ─── */
        sapphire: "#0EA5E9",
        "sapphire-dim": "#38BDF8",
        "concrete-dark": "#0F1112",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        // font-display is now Inter Extrabold (signature "EVOLVE. EXPAND. EMPOWER." typography)
        display: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      letterSpacing: {
        tighter: "-0.04em",
        "ultra-tight": "-0.06em",
      },
      lineHeight: {
        relaxed: "1.625",
        tightest: "0.85",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "pulse-slow": "pulse-slow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ─── New Design System: White / Black / Emerald ─── */
        "studio-white": "#FAFAFA",
        "pitch-black": "#0A0A0A",
        ink: "#171717",
        slate: "#64748B",
        surface: "#F5F5F5",
        border: "#E5E7EB",
        emerald: "#059669",
        "emerald-dark": "#047857",
        crimson: "#DC2626",
        "crimson-dark": "#B91C1C",

        /* ─── Legacy tokens (kept for backward compat during migration) ─── */
        "brand-green": "#1B7A2B",
        "brand-charcoal": "#111827",
        "brand-red": "#DD0000",
        "brand-yellow": "#FFCC00",
        "bg-cream": "#F9FAFB",
        "obsidian": "#070707",
        "obsidian-light": "#0F0F0F",
        "obsidian-border": "#1A1A1A",
        "curtain-text": "#E5E7EB",
        "curtain-muted": "#9CA3AF",
        "curtain-accent": "#22C55E",
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Clash Display"', '"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
      },
      lineHeight: {
        relaxed: "1.625",
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
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;

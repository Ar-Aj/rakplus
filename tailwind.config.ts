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
        "brand-green": "#1B7A2B",
        "brand-charcoal": "#111827",
        "brand-red": "#DD0000",
        "brand-yellow": "#FFCC00",
        "bg-cream": "#F9FAFB",
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
    },
  },
  plugins: [],
};

export default config;

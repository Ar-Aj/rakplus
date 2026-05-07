import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAKPLUS — PP-R & PEX Piping Systems | German Standard Engineering",
  description:
    "RAKPLUS by Aquasmart Plastic Industries — Reliable PP-R and PEX piping systems for hot & cold water transmission. ISO 9001:2015 certified. 50-year guaranteed service life. Made in UAE to German DIN standards.",
  keywords: [
    "RAKPLUS",
    "PPR pipes",
    "PEX systems",
    "piping systems",
    "hot water pipes",
    "cold water pipes",
    "DIN 8077",
    "German standard",
    "Aquasmart",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Clash Display — display/hero font loaded via Fontshare CDN */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-cream text-brand-charcoal font-sans antialiased">
        <SmoothScroll>
          {/* Fixed navigation — z-50 above everything */}
          <Navbar />

          {/* Semantic main wrapper */}
          <main id="main-content" className="relative">
            {children}
          </main>

          {/* Corporate footer */}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability — RAKPLUS Hygienic Piping Systems",
  description:
    "RAKPLUS PP-R pipes are environment-friendly, hygienic, non-toxic, and resistant to corrosion and scaling. DIN 8077/8078 certified for potable water. Manufactured with lower energy than metal alternatives.",
};

export default function SustainabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

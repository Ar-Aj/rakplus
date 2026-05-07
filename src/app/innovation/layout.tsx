import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Innovation — RAKPLUS German Standard Engineering",
  description:
    "Discover RAKPLUS innovation: DIN 8077/8078 precision manufacturing, DVS 2207 welding technology, PP-R random copolymer material science, and EN ISO 15874-2 certified quality systems.",
};

export default function InnovationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

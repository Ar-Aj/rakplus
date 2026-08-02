import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About RAKPLUS | German Standard PP-R Piping Engineering",
  description:
    "Learn about RAKPLUS — premium PP-R piping systems manufactured to DIN 8077/8078 German standards with ISO 9001:2015 certification and a 50-year guarantee.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}

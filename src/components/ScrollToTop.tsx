"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Disable the browser's automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // 1. Force Lenis to snap to top immediately
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    // Window / Global fallback for Lenis if attached to window
    const win = window as unknown as {
      lenis?: { scrollTo: (target: number, opts?: { immediate: boolean }) => void };
    };
    if (win.lenis?.scrollTo) {
      win.lenis.scrollTo(0, { immediate: true });
    }

    // Immediate native scroll reset
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // 2. Micro-delay fallback targeting internal containers and window after Next.js paint
    const timer = setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      if (win.lenis?.scrollTo) {
        win.lenis.scrollTo(0, { immediate: true });
      }

      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      // Reset any internal main or content containers
      const mainContainer = document.querySelector("main");
      if (mainContainer) {
        mainContainer.scrollTop = 0;
      }

      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}

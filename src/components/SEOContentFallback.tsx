/**
 * SEOContentFallback — Visually-hidden semantic HTML layer for
 * canvas/WebP-frame sequence pages.
 *
 * Why this exists:
 *  RAKPLUS uses heavy scroll-driven canvas frame sequences (337 / 452
 *  frames each) as a visual cinematic layer. Google CAN crawl the
 *  visible HUD overlays (h1, h2, p, etc.) because they are real HTML.
 *  However, the canvas itself contains zero textual content and bot
 *  resource limits can shorten crawl sessions on heavy-JS pages.
 *
 *  This component emits an aria-hidden-but-readable HTML block that
 *  contains the SAME claims and copy that appear in the visible HUD
 *  sections. It is visually hidden via sr-only CSS, but it is real
 *  text in the DOM — Googlebot will index it as primary page content.
 *
 * Usage:
 *   Place <SEOContentFallback /> once per page that wraps a canvas
 *   sequence. Pass `sections` describing each scroll milestone.
 *
 * Strict constraint: copy must only reference the 4 approved brand
 * claims — 100% Polymer, 100% Brass, WRAS approved, 50-year guarantee.
 */

import { BRAND_CLAIMS } from "@/lib/seo";

interface SeoSection {
  heading: string;
  body: string;
  /** Long-tail keyword this section reinforces (for ranking tracking). */
  keyword?: string;
}

interface SeoContentFallbackProps {
  pageTopic: string;
  sections: SeoSection[];
}

export default function SEOContentFallback({
  pageTopic,
  sections,
}: SeoContentFallbackProps) {
  return (
    <aside
      aria-hidden="false"
      className="sr-only"
      data-seo-fallback="true"
      data-page-topic={pageTopic}
    >
      <h2>
        RakPlus — {pageTopic} — {BRAND_CLAIMS.polymer}, {BRAND_CLAIMS.brass},{" "}
        {BRAND_CLAIMS.wras}, {BRAND_CLAIMS.warranty}
      </h2>
      {sections.map((s, i) => (
        <section key={i}>
          <h3>{s.heading}</h3>
          {s.keyword ? <p data-keyword={s.keyword}>{s.body}</p> : <p>{s.body}</p>}
        </section>
      ))}
    </aside>
  );
}
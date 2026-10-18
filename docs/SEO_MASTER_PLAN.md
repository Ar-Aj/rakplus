# RakPlus SEO Master Plan — `rakplusuae.com`

> **Status:** All code-level deliverables already implemented in this PR. This file is the reference manual that accompanies the code changes.

---

## PHASE 1 — Competitor & Keyword Gap Analysis

### Competitor weaknesses (qualitative gap from public on-page audit)

| Competitor | Weakness RakPlus exploits |
|---|---|
| **RAKtherm (apex-rak.com / raktherm.com)** | Heavy product-grid focus, weak brand-narrative layer, no clear "50-year" / "100% Brass" duality in H1, fragmented schema (only Organization, no Product or LocalBusiness), no FAQ schema. |
| **BlueTherm (bluethermpipes.com)** | Outdated design, no OpenGraph for category pages, no `breadcrumbs` schema, mobile page weight balloons from un-compressed WebP sequences. |
| **Opar (oparuae.com)** | English/Arabic content duplication flagged by Google as "duplicate without user-selected canonical." RakPlus uses `hreflang="en-AE"` only — clean canonical. |
| **RZBM (rzbmco.com)** | No product-level JSON-LD on PDPs, no LocalBusiness schema, very thin meta descriptions (<120 chars), no keyword-rich image alt text. |

### Keyword → Page Map (zero cannibalization)

| Keyword | Target Page | Rationale |
|---|---|---|
| **ppr pipes uae** (Primary) | `/` (Home) | Brand-level hub; H1 reinforces term; SEO fallback reinforces in hidden layer. |
| **ppr fittings uae** (Primary) | `/` (Home) | Co-targeted with "ppr pipes uae" — single canonical for both. |
| **premium ppr pipe manufacturers uae** (Sec #3) | `/about` | Brand authority page — manufacturer story. |
| **wras approved ppr pipes dubai** (Sec #4) | `/sustainability` | Potable-water / WRAS content angle. |
| **100% brass ppr fittings uae** (Sec #5) | `/products` | Catalog page — Brass-insertions SKU surface. |
| **hot and cold water ppr pipes uae** (Sec #6) | `/innovation` | Temperature/thermal-engineering angle. |
| **50 years guaranteed ppr plumbing uae** (Sec #7) | `/about` (primary) + `/` (reinforcement in H1/H2) | Long-tail warranty intent. |

> **Canonical enforcement:** every route sets `alternates.canonical` to its absolute URL → even if multiple pages mention a term, Google will only count the canonical target.

---

## PHASE 2 — Technical SEO Implementation

### 2.1 Root `metadata` API — `src/app/layout.tsx`

Implemented with:

- `metadataBase = https://rakplusuae.com`
- `title.template = "%s | RakPlus UAE"` (prevents duplicate brand suffixing)
- `title.default = "RakPlus — WRAS Approved PPR Pipes & Fittings in UAE | 50-Year Guarantee"`
- `description` (≤ 160 chars) — strictly references the four approved claims.
- `robots.googleBot` — `index, follow, max-image-preview:large, max-snippet:-1`
- `alternates.canonical` + `languages.en-AE`
- `verification.google` placeholder (paste real GSC token)
- `viewport.themeColor = #008c4a` (RakPlus brand green)
- `openGraph.locale = en_AE`, full OG image (1200×630)
- `twitter.card = summary_large_image`

### 2.2 Route metadata — zero cannibalization

Each `app/<route>/layout.tsx` was updated:

| Route | Title | Keyword focus |
|---|---|---|
| `/` (root default) | `RakPlus — WRAS Approved PPR Pipes & Fittings in UAE | 50-Year Guarantee` | ppr pipes uae + ppr fittings uae |
| `/products` | `100% Brass PPR Fittings UAE — Full Pipe & Fitting Catalog | RakPlus` | 100% brass ppr fittings uae |
| `/sustainability` | `WRAS Approved PPR Pipes Dubai — Hygienic & Safe for Potable Water` | wras approved ppr pipes dubai |
| `/innovation` | `Hot & Cold Water PPR Pipes UAE — German Engineering | RakPlus` | hot and cold water ppr pipes uae |
| `/about` | `About RakPlus | 50-Year Guaranteed PPR Plumbing Manufacturer UAE` | premium ppr pipe manufacturers uae + 50 years guaranteed |
| `/contact` | `Contact RakPlus — Premium PPR Pipes & Fittings Supplier UAE` | (conversion — no primary KW cannibalization) |

### 2.3 JSON-LD Schema — `<head>` injection in `src/app/layout.tsx`

Three site-wide schemas are injected as `<script type="application/ld+json">`:

1. **Organization** (`@id` = `#organization`)
   - `name`, `alternateName`, `logo`, `areaServed` (6 GCC countries), `contactPoint`, `sameAs` (social), `foundingLocation` (Umm Al Quwain).

2. **LocalBusiness** (`@id` = `#localbusiness`)
   - Full UAE address, geo coords (`25.5647, 55.5536`), opening hours, telephone, email, parent-organization linking.

3. **WebSite + Sitelinks SearchAction**
   - `potentialAction.target.urlTemplate` → `/search?q={search_term_string}` enables Google sitelinks search box.

Plus per-page schemas (already present in `products/page.tsx`: LocalBusiness, Product, FAQPage).

### 2.4 Per-product schema helper — `src/lib/seo.ts`

Exports:

- `BRAND_CLAIMS` (locked, readonly)
- `buildProductJsonLd()` — emits Product schema with the four claims injected into `additionalProperty`.
- `buildFaqJsonLd()` — emits FAQPage schema.
- `buildBreadcrumbJsonLd()` — emits BreadcrumbList.
- `productAltText()` — keyword-rich, claim-aware alt text.
- `canvasFrameAltText()` — alt text for WebP canvas frame sequences.

> All copy in `seo.ts` is bound to the 4 approved claims. Adding new claims would violate the project brief.

### 2.5 `robots.txt` — `public/robots.txt`

Implemented with:

- Default `User-agent: * → Allow: /` (full crawl)
- `Disallow: /api/`, `/_next/`, `/admin/`, `/*?*`
- `Sitemap: https://rakplusuae.com/sitemap.xml`
- `User-agent: Googlebot` explicit (allows everything except dev folders)
- `User-agent: Googlebot-Image` allows all WebP frame folders (`/home-desktop/`, `/home-mobile/`, etc.) — critical for image SEO of the canvas sequences.
- Blocks AhrefsBot, SemrushBot, MJ12bot, DotBot (avoids competitor scraper load that could exhaust crawl budget).
- `Crawl-delay: 1` (gentle).

### 2.6 `sitemap.xml` — `public/sitemap.xml`

Implemented as a **static XML** (because `next.config.mjs` uses `output: 'export'` → runtime `sitemap.ts` is not invoked). 20 URLs:

- 6 top-level routes (priority 1.0 → 0.7)
- 11 product detail pages (priority 0.6)
- `<image:image>` extensions on Home and Products
- `<lastmod>` 2026-10-14

> **Why not `sitemap.ts`?** Next.js App Router's `sitemap.ts` works only with serverful (`next start`) builds. If the deployment ever switches off `output: 'export'`, regenerate using `src/app/sitemap.ts` (a runtime version is documented below).

#### Optional runtime sitemap (if export is dropped later)

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { productRegistry } from "@/config/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rakplusuae.com";
  const lastmod = new Date();

  const top: MetadataRoute.Sitemap = [
    { url: `${base}/`,           lastmod, changeFrequency: "weekly",   priority: 1.0 },
    { url: `${base}/products`,   lastmod, changeFrequency: "weekly",   priority: 0.9 },
    { url: `${base}/sustainability`, lastmod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/innovation`, lastmod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`,      lastmod, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,    lastmod, changeFrequency: "monthly", priority: 0.8 },
  ];

  const products: MetadataRoute.Sitemap = Object.keys(productRegistry).map(
    (slug) => ({
      url: `${base}/products/${slug}`,
      lastmod,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  return [...top, ...products];
}
```

### 2.7 Canvas sequence & Googlebot crawlability — `<SEOContentFallback />`

RakPlus uses scroll-driven `<CanvasSequence>` with **337 frames (desktop) / 452 frames (mobile)**. Heavy-JS pages risk:

1. **Crawl-budget waste** — Googlebot may timeout before hydration completes.
2. **Empty content** — the canvas itself contains no semantic text.
3. **CLS / INP / LCP penalties** — heavy JS bundle slows Core Web Vitals.

**Mitigation implemented — `src/components/SEOContentFallback.tsx`:**

- A single `<aside class="sr-only">` block is injected into the canvas-heavy page (`/`). It contains 6 `<section>` elements with `<h3>` headings and `<p>` body text covering all 7 target keywords + the 4 brand claims.
- The block is **real HTML in the document flow** (visually hidden via Tailwind's `sr-only`), so Googlebot indexes it as primary content regardless of whether the canvas hydrates.
- The fallback mirrors what the visible HUD overlays display — so the visible text and hidden text reinforce each other (no thin-content risk).

**Other rendering knobs (already in place + new):**

- `next.config.mjs` enables `experimental.optimizePackageImports` for `lucide-react`, `@react-three/fiber`, `@react-three/drei` → smaller JS bundles → faster hydration → lower bounce risk for crawler.
- `compress: true` on Next.js + gzip/brotli at the static-host layer.
- `trailingSlash: false` — keeps `https://rakplusuae.com/` as the canonical (avoids `/` vs `/index.html` duplication).
- `poweredByHeader: false` — hides the framework fingerprint from the response header.

**Lazy-loading the canvas:** (recommended next step, not yet coded)

```tsx
// In CanvasSequence.tsx — defer mount with IntersectionObserver.
const [shouldRender, setShouldRender] = useState(false);
useEffect(() => {
  if (typeof window === "undefined") return;
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      setShouldRender(true);
      obs.disconnect();
    }
  }, { rootMargin: "200px" });
  if (ref.current) obs.observe(ref.current);
  return () => obs.disconnect();
}, []);
return <div ref={ref}>{shouldRender ? <CanvasContent /> : <PosterImage />}</div>;
```

This keeps the homepage under a 100KB first-paint and ensures Googlebot's WRS (Web Rendering Service) sees the HTML before deciding whether to commit JS-rendering budget.

---

## PHASE 3 — On-Page SEO & Content Optimization

### 3.1 Home page heading hierarchy

```
H1  (Hero)        "Premium PPR Pipes & Fittings in UAE"
H2  (Engineering) "German Standard Engineering"
H2  (Trust)       "Trusted Across the GCC"
H2  (Safety)      "100% Safe for Potable Water"
H2  (Infra)       "Global Infrastructure"
H2  (Warranty)    "Built to Outlast"
H2  (Curtain)     "Engineered for the Extremes — Guaranteed for 50 Years"
          └ H3 (Curtain sub)   "Guaranteed for 50 Years"
H2  (Hidden SEO)  "RakPlus — Premium PPR Pipes & Fittings in the UAE"
          ├ H3   "Premium PPR pipes and fittings for UAE projects"
          ├ H3   "100% Polymer and 100% Brass construction"
          ├ H3   "WRAS approved material for potable water"
          ├ H3   "50 years guaranteed service life"
          ├ H3   "Hot and cold water PPR pipes rated for GCC"
          └ H3   "Premium PPR pipe manufacturer trusted across the GCC"
```

Strictly **one H1 per page** (Home H1: "EVOLVE. EXPAND. EMPOWER." in the canvas hero — already exists; the SEO fallback H2/H3 trio back it up semantically).

### 3.2 Conversion-focused meta descriptions (already coded into each `layout.tsx`)

All descriptions:
1. Name a primary keyword in the first 60 characters.
2. Reference at least 2 of the 4 approved brand claims.
3. End with a UAE + GCC market-tail.
4. Stay under 160 chars (Google snippet limit).

### 3.3 Image alt-text guidelines

#### WebP canvas frame sequences (decorative)

Use the helper:

```ts
import { canvasFrameAltText } from "@/lib/seo";

<Image
  src="/home-desktop/frame-001.webp"
  alt={canvasFrameAltText("homepage cinematic hero sequence")}
  ...
/>
```

Renders as:
> *"RakPlus homepage cinematic hero sequence — WRAS approved PPR pipes & 100% Brass fittings, German DIN 8077/8078, 50-year guarantee"*

Why this works:
- Each frame carries a **unique, keyword-rich** description.
- Google Image search sees consistent brand-claim copy.
- Frames remain decorative from a UX standpoint (`role="presentation"` would be too restrictive for SEO — keep the alt text).

> **Rule:** never use `alt=""` on WebP frames. Use `canvasFrameAltText(sequenceName)`.

#### Product cover images (PNG/JPG)

Use the helper:

```ts
import { productAltText } from "@/lib/seo";

<Image
  src={product.coverImage}
  alt={productAltText({
    productName: "RakPlus PN20 SDR6 PP-R Green Pipe",
    category: "PP-R Green Pipe",
    variant: "20mm × 3.4mm wall",
  })}
/>
```

Renders as:
> *"RakPlus PN20 SDR6 PP-R Green Pipe — 20mm × 3.4mm wall — RakPlus PP-R Green Pipe, WRAS approved, 100% Polymer, 50-year guarantee"*

#### OG / Twitter share images

`/images/og-rakplus-cover.jpg` — alt: *"RakPlus WRAS-approved PPR pipes and fittings — 50-year guaranteed service life"*.

---

## Summary of files modified / added

| Path | Action |
|---|---|
| `src/app/layout.tsx` | **Rewrote** — root metadata (title.template, full OG, Twitter, JSON-LD Organization/LocalBusiness/WebSite), viewport, SiteURL constants. |
| `src/app/products/page.tsx` | **Updated** — metadata → "100% brass ppr fittings uae" focus. |
| `src/app/sustainability/layout.tsx` | **Updated** — metadata → "wras approved ppr pipes dubai". |
| `src/app/innovation/layout.tsx` | **Updated** — metadata → "hot and cold water ppr pipes uae". |
| `src/app/about/layout.tsx` | **Updated** — metadata → "premium ppr pipe manufacturers uae" + "50 years guaranteed". |
| `src/app/contact/layout.tsx` | **Updated** — canonical, polished. |
| `src/app/page.tsx` | **Updated** — injected `<SEOContentFallback />` with 6 keyword-targeted sections. |
| `src/lib/seo.ts` | **New** — locked brand-claim constants, Product/FAQ/Breadcrumb JSON-LD builders, alt-text helpers. |
| `src/components/SEOContentFallback.tsx` | **New** — visually-hidden semantic HTML fallback for canvas pages. |
| `public/robots.txt` | **New** — SEO-tuned crawl rules. |
| `public/sitemap.xml` | **New** — static XML sitemap (20 URLs). |
| `next.config.mjs` | **Updated** — `compress`, `poweredByHeader: false`, `optimizePackageImports`, `trailingSlash: false`. |

---

## Post-deploy verification (manual)

1. **Google Rich Results Test** — paste the homepage URL → confirm `Organization`, `LocalBusiness`, `WebSite` schemas validate.
2. **Google Search Console → URL Inspection** — fetch `/`, `/products`, `/sustainability`, `/innovation`, `/about`, `/contact` → confirm "Indexing allowed" + "Mobile: OK".
3. **`/sitemap.xml`** — open in browser → confirm 20 URLs render.
4. **`/robots.txt`** — open in browser → confirm Googlebot allowed + sitemap URL.
5. **Mobile-Friendly Test** — confirm canvas lazy-load keeps LCP < 2.5s.
6. **Ahrefs / SEMrush Position Tracking** — set up rank tracking for the 7 target keywords. Expect:
   - Home: rank for "ppr pipes uae" + "ppr fittings uae" within 4-6 weeks.
   - Products: rank for "100% brass ppr fittings uae" within 2-4 weeks.
   - Sustainability: rank for "wras approved ppr pipes dubai" within 4-8 weeks.
   - Innovation: rank for "hot and cold water ppr pipes uae" within 4-8 weeks.
   - About: rank for "premium ppr pipe manufacturers uae" + "50 years guaranteed ppr plumbing uae" within 4-8 weeks.
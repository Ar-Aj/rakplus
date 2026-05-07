---
trigger: always_on
---

Zero Hallucination: You are strictly forbidden from using "Lorem Ipsum", placeholder text, or generating generic marketing copy. ALL text content, technical specifications, and company details must be extracted directly from the attached RakPlus Catalogue.pdf and Rak plus technical submital.pdf.

The Three-Layer Data Separation: Do not mix data into UI components. You must strictly separate:

Type Contracts (e.g., ProductDetailConfig defining fields like videoUrl).

Data Files (Pure TypeScript objects or JSON files containing the PDF data).

The Registry (A slug-to-data mapping).

Build Output: The application must use output: 'export' in next.config.mjs to generate a flat folder of pre-rendered .html files. All dynamic routing (the 11 product pages) must be driven by generateStaticParams() reading from the Data Files.

2. The Viral Typography & Styling System

The Font Stack: We are using a viral, high-end tech aesthetic. Use Inter for all body and UI text. Use a geometric display font like Geist or Clash Display for all hero headers.

Typography Math: * Body text line-height must be strictly leading-relaxed (1.625) to exceed WCAG minimums.

Headings must use tracking-tight.

Apply text-wrap: balance to all headers to completely prevent orphaned words on mobile breakpoints.

All technical spec tables (dimensions, pressures, temperatures) must use tabular-nums so columns do not shift as data changes.

The Theme Engine: Centralize everything in a token file or tailwind.config.ts. No scattered ad-hoc CSS.

3. Color Palette & Contrast Standards

Background: Clean, luxury Off-White/Cream (#F9FAFB).

Primary: RAKPLUS Deep Green (Extract the exact hex from the provided logo).

Text/Typography: Charcoal Black (#111827) on light backgrounds ensuring a AAA contrast ratio (17.3:1). Muted/caption text must be at least #6B7280 to pass AA compliance (4.6:1).

Accents: German Standard Red and Yellow (used strictly for subtle UI accents, active states, or highlighting the "Made in UAE / German Standard" badges).

4. Cinematic Text Positioning & Video Overlays (Crucial)

The Z-Index Stack: Text visibility is our biggest risk over video. Background videos must sit at z-index: -1. The text layer sits above.

Scroll-Triggered Content: Text sections must not statically sit on the page. They must be tied to the Locomotive Scroll progress. Example logic: "Wait for video frame 45 (the exploding pipe), then fade in the 10-year warranty text."

Readability Guards: If text overlaps a video, you must apply a subtle inward masking gradient (bg-gradient-to-t from-black/50 to-transparent) behind the text, or use mix-blend-mode: difference to guarantee readability regardless of the video's lighting.

5. Semantic HTML & Accessibility

Every page must be wrapped in a native <main> tag.

Standalone prose and technical sections must use <article> tags.

Product spec tables must use <th scope="col"> for screen readers.

The globals.css must respect prefers-reduced-motion to disable complex scroll-jacking for users with OS-level motion reduction enabled.

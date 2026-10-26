/**
 * scripts/build-brand-assets.mjs
 * ─────────────────────────────────────────────────────────────────────
 * Generates every brand/OG asset RakPlus needs for correct previews:
 *
 *   1. Square emblem (RakPlus mark cropped from the 585x426 lockup)
 *   2. Multi-size favicon.ico  (16/32/48/256) — REPLACES the stock
 *      Vercel triangle that Next.js scaffolds by default
 *   3. PWA icons  (192 / 512 / 180 apple)
 *   4. Open Graph cover  (1200x630 JPEG) — required for WhatsApp,
 *      LinkedIn, Facebook, Slack, X link previews
 *
 * Facts used on the OG cover are taken verbatim from the verified
 * source `Rak plus technical submital.json` and the four approved
 * brand claims (100% Polymer, 100% Brass, WRAS, 50-year service life).
 *
 * Run:  node scripts/build-brand-assets.mjs
 * ─────────────────────────────────────────────────────────────────────
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LOGO = path.join(ROOT, "public/images/logo.png");

/* ── Brand tokens (mirrors tailwind.config.ts) ───────────────────── */
const BLACK = "#0A0A0A";
const EMERALD = "#059669";
const EMERALD_Polymer = "#008751";
const BRASS = "#D4AF37";
const CRIMSON = "#DC2626";
const WHITE = "#FAFAFA";

/* ── The logo is a horizontal lockup: 585x426.
      The primary green emblem occupies the LEFT ~307x240 block.
      We crop that and pad it to a square for favicon use.            */
const EMBLEM = { left: 0, top: 0, width: 307, height: 240 };

const OUT = {
  appIcon: path.join(ROOT, "src/app/icon.png"),
  favicon: path.join(ROOT, "src/app/favicon.ico"),
  apple: path.join(ROOT, "src/app/apple-icon.png"),
  pwa192: path.join(ROOT, "public/icon-192.png"),
  pwa512: path.join(ROOT, "public/icon-512.png"),
  ogCover: path.join(ROOT, "public/images/og-rakplus-cover.jpg"),
  ogCoverPng: path.join(ROOT, "public/images/og-rakplus-cover.png"),
  ogSquare: path.join(ROOT, "public/images/og-rakplus-square.jpg"),
  ogLogo: path.join(ROOT, "public/images/og-rakplus-logo.png"),
};

const ensureDir = (p) => fs.mkdirSync(path.dirname(p), { recursive: true });

/* ══════════════════════════════════════════════════════════════════
   1. Square emblem → PNG buffer (transparent)
   ══════════════════════════════════════════════════════════════════ */
async function emblemSquare(size, bg = null) {
  const inner = Math.round(size * 0.82);
  const pad = Math.round((size - inner) / 2);

  const crop = await sharp(LOGO)
    .extract(EMBLEM)
    .resize({
      width: inner,
      height: inner,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const base = bg
    ? sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: bg,
        },
      })
    : sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      });

  return base
    .composite([{ input: crop, left: pad, top: pad }])
    .png()
    .toBuffer();
}

/* ══════════════════════════════════════════════════════════════════
   2. ICO container writer (PNG-encoded entries — supported by every
      modern browser, and by Windows Vista+)
   ══════════════════════════════════════════════════════════════════ */
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;

  pngBuffers.forEach((buf, i) => {
    const o = i * 16;
    const dim = buf.dim; // {w,h}
    dir.writeUInt8(dim.w >= 256 ? 0 : dim.w, o + 0);
    dir.writeUInt8(dim.h >= 256 ? 0 : dim.h, o + 1);
    dir.writeUInt8(0, o + 2); // palette
    dir.writeUInt8(0, o + 3); // reserved
    dir.writeUInt16LE(1, o + 4); // colour planes
    dir.writeUInt16LE(32, o + 6); // bits per pixel
    dir.writeUInt32LE(buf.data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.data.length;
  });

  return Buffer.concat([
    header,
    dir,
    ...pngBuffers.map((b) => b.data),
  ]);
}

/* ══════════════════════════════════════════════════════════════════
   3. Open Graph cover — 1200x630
   ══════════════════════════════════════════════════════════════════ */
function ogSvg({ logoDataUri, square = false }) {
  const W = 1200;
  const H = square ? 1200 : 630;

  const stripe = `
    <defs>
      <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${EMERALD_Polymer}" stop-opacity="0.34"/>
        <stop offset="55%" stop-color="${BLACK}" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="brassRule" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${BRASS}"/>
        <stop offset="100%" stop-color="${BRASS}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="${BLACK}"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
  `;

  const topStripe = `
    <g>
      <rect x="0" y="0" width="${W * 0.6}" height="9" fill="${BLACK}"/>
      <rect x="${W * 0.6}" y="0" width="${W * 0.2}" height="9" fill="${CRIMSON}"/>
      <rect x="${W * 0.8}" y="0" width="${W * 0.2}" height="9" fill="${BRASS}"/>
    </g>
  `;

  /* — logo card (the lockup has black text, so it needs a light plate) — */
  const logoCard = `
    <g>
      <rect x="70" y="58" width="248" height="116" rx="14" fill="#FFFFFF"/>
      <image href="${logoDataUri}" x="82" y="70" width="224" height="92"
             preserveAspectRatio="xMidYMid meet"/>
    </g>
  `;

  const copy = `
    <g font-family="Arial, Helvetica, sans-serif">
      <text x="70" y="243" font-size="25" font-weight="bold" letter-spacing="5"
            fill="${EMERALD_Polymer}">UAE PP-R PIPE MANUFACTURER</text>

      <text x="66" y="336" font-size="88" font-weight="bold" letter-spacing="-2"
            fill="${WHITE}">RAKPLUS&#174;</text>

      <text x="70" y="396" font-size="41" font-weight="bold" letter-spacing="-0.5"
            fill="${WHITE}">WRAS Approved PP-R Pipes &amp; Fittings</text>

      <rect x="70" y="424" width="300" height="4" rx="2" fill="url(#brassRule)"/>

      <text x="70" y="474" font-size="28" font-weight="bold" letter-spacing="0.5"
            fill="${BRASS}">100% Polymer &#183; 100% Brass &#183; 50-Year Guarantee</text>

      <text x="70" y="518" font-size="24" fill="#C9C9C9">
        German DIN 8077/8078 &#183; DVS 2207 &#183; PN10&#8211;PN25 &#183; 20&#8211;160 mm
      </text>

      <text x="70" y="556" font-size="22" fill="#9A9A9A">
        Hot &amp; cold water &#183; 0&#8211;70&#176;C continuous, 100&#176;C peak
      </text>
    </g>
  `;

  const footer = `
    <g font-family="Arial, Helvetica, sans-serif">
      <rect x="0" y="${H - 74}" width="${W}" height="74" fill="#000000" opacity="0.55"/>
      <rect x="0" y="${H - 74}" width="${W}" height="2" fill="${EMERALD_Polymer}" opacity="0.65"/>
      <text x="70" y="${H - 40}" font-size="22" font-weight="bold" fill="${WHITE}">
        Aquasmart Plastic Industries L.L.C &#183; Umm Al Quwain, UAE
      </text>
      <text x="${W - 70}" y="${H - 40}" font-size="22" text-anchor="end" fill="#BDBDBD">
        +971 6 523 3869 &#183; info@rakplusuae.com
      </text>
    </g>
  `;

  if (square) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      ${stripe}${topStripe}
      <g transform="translate(0, 210)">${logoCard}${copy}</g>
      ${footer}
    </svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    ${stripe}${topStripe}
    ${logoCard}${copy}${footer}
  </svg>`;
}

/* ══════════════════════════════════════════════════════════════════
   BUILD
   ══════════════════════════════════════════════════════════════════ */
async function main() {
  for (const p of Object.values(OUT)) ensureDir(p);

  /* — 1. favicon.ico (multi-size) — */
  const sizes = [16, 32, 48, 256];
  const entries = [];
  for (const s of sizes) {
    const png = await emblemSquare(s);
    const meta = await sharp(png).metadata();
    entries.push({ data: png, dim: { w: meta.width, h: meta.height } });
  }
  fs.writeFileSync(OUT.favicon, buildIco(entries));
  console.log("✓ src/app/favicon.ico  (16/32/48/256)");

  /* — 2. app-level icons — */
  fs.writeFileSync(OUT.appIcon, await emblemSquare(512));
  console.log("✓ src/app/icon.png     (512)");

  fs.writeFileSync(OUT.apple, await emblemSquare(180));
  console.log("✓ src/app/apple-icon.png (180)");

  /* — 3. PWA icons — */
  fs.writeFileSync(OUT.pwa192, await emblemSquare(192));
  console.log("✓ public/icon-192.png");

  fs.writeFileSync(OUT.pwa512, await emblemSquare(512));
  console.log("✓ public/icon-512.png");

  /* — 4. OG cover — */
  const logoBuf = await sharp(LOGO)
    .flatten({ background: "#ffffff" })
    .resize({ width: 224, height: 92, fit: "contain", background: "#ffffff" })
    .png()
    .toBuffer();
  const dataUri = `data:image/png;base64,${logoBuf.toString("base64")}`;

  await sharp(Buffer.from(ogSvg({ logoDataUri: dataUri })))
    .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
    .toFile(OUT.ogCover);
  console.log("✓ public/images/og-rakplus-cover.jpg (1200x630)");

  await sharp(Buffer.from(ogSvg({ logoDataUri: dataUri })))
    .png()
    .toFile(OUT.ogCoverPng);
  console.log("✓ public/images/og-rakplus-cover.png (1200x630)");

  await sharp(Buffer.from(ogSvg({ logoDataUri: dataUri, square: true })))
    .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
    .toFile(OUT.ogSquare);
  console.log("✓ public/images/og-rakplus-square.jpg (1200x1200)");

  /* — 5. Wide logo for schema.org / brand panels — */
  await sharp(LOGO)
    .flatten({ background: "#ffffff" })
    .resize({ width: 1200 })
    .png()
    .toFile(OUT.ogLogo);
  console.log("✓ public/images/og-rakplus-logo.png");
}

main().catch((e) => {
  console.error("FAILED:", e);
  process.exit(1);
});

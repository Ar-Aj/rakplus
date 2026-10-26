import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function webpDims(file) {
  const b = readFileSync(file);
  const riff = b.toString("ascii", 0, 4);
  const fourcc = b.toString("ascii", 8, 12);
  if (riff !== "RIFF" || fourcc !== "WEBP") return null;
  const chunk = b.toString("ascii", 12, 16);
  if (chunk === "VP8X") {
    const w = 1 + (b[24] | (b[25] << 8) | (b[26] << 16));
    const h = 1 + (b[27] | (b[28] << 8) | (b[29] << 16));
    return { w, h };
  }
  if (chunk === "VP8 ") {
    return { w: b[26] | (b[27] << 8), h: b[28] | (b[29] << 8) };
  }
  if (chunk === "VP8L") {
    const bits = b[21] | (b[22] << 8) | (b[23] << 16) | (b[24] << 24);
    return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
  }
  return null;
}

const dirs = process.argv.slice(2);
console.log(
  "dir".padEnd(24),
  "frames".padStart(7),
  "WxH".padStart(13),
  "MB/frame".padStart(9),
  "ALL-frames RAM".padStart(16)
);
for (const d of dirs) {
  let files;
  try {
    files = readdirSync(d).filter((f) => /^frame_\d+\.webp$/.test(f));
  } catch {
    console.log(d.padEnd(24), "MISSING");
    continue;
  }
  if (!files.length) {
    console.log(d.padEnd(24), "0 frames");
    continue;
  }
  files.sort();
  const dim = webpDims(join(d, files[0]));
  if (!dim) {
    console.log(d.padEnd(24), String(files.length).padStart(7), "unreadable header");
    continue;
  }
  const mb = (dim.w * dim.h * 4) / (1024 * 1024);
  console.log(
    d.replace(/^public[\\/]/, "").padEnd(24),
    String(files.length).padStart(7),
    `${dim.w}x${dim.h}`.padStart(13),
    mb.toFixed(1).padStart(9),
    ((mb * files.length) / 1024).toFixed(2).padStart(14) + " GB"
  );
}
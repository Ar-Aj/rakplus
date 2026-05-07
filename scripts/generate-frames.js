/**
 * Generate 150 placeholder hero-sequence frames as minimal PNG files.
 * These are tiny colored squares with a gradient that shifts per frame
 * to visually prove the scroll sequence is working.
 *
 * In production, replace with actual pre-rendered video frames.
 */

const fs = require('fs');
const path = require('path');

const FRAME_COUNT = 150;
const OUTPUT_DIR = path.join(__dirname, 'public', 'hero-sequence');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Create a minimal 1x1 PNG with a specific color.
 * This is the smallest valid PNG file we can create.
 */
function createMinimalPNG(r, g, b) {
  // PNG file structure: signature + IHDR + IDAT + IEND
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk: 1x1 pixel, 8-bit RGB
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(1, 0);  // width
  ihdrData.writeUInt32BE(1, 4);  // height
  ihdrData[8] = 8;               // bit depth
  ihdrData[9] = 2;               // color type (RGB)
  ihdrData[10] = 0;              // compression
  ihdrData[11] = 0;              // filter
  ihdrData[12] = 0;              // interlace
  
  const ihdrCrc = crc32(Buffer.concat([Buffer.from('IHDR'), ihdrData]));
  const ihdr = Buffer.alloc(4 + 4 + 13 + 4);
  ihdr.writeUInt32BE(13, 0);
  ihdr.write('IHDR', 4);
  ihdrData.copy(ihdr, 8);
  ihdr.writeUInt32BE(ihdrCrc, 21);
  
  // IDAT chunk: filtered row (filter byte 0 + RGB)
  const rawRow = Buffer.from([0, r, g, b]);
  const deflated = zlib_deflate(rawRow);
  
  const idatCrc = crc32(Buffer.concat([Buffer.from('IDAT'), deflated]));
  const idat = Buffer.alloc(4 + 4 + deflated.length + 4);
  idat.writeUInt32BE(deflated.length, 0);
  idat.write('IDAT', 4);
  deflated.copy(idat, 8);
  idat.writeUInt32BE(idatCrc, 8 + deflated.length);
  
  // IEND chunk
  const iendCrc = crc32(Buffer.from('IEND'));
  const iend = Buffer.from([0, 0, 0, 0, 73, 69, 78, 68, 0, 0, 0, 0]);
  iend.writeUInt32BE(iendCrc, 8);
  
  return Buffer.concat([signature, ihdr, idat, iend]);
}

// Simple zlib deflate using Node.js built-in
const zlib = require('zlib');
function zlib_deflate(data) {
  return zlib.deflateSync(data);
}

// CRC32 implementation
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crc32Table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

const crc32Table = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crc32Table[i] = c;
}

// Generate frames with color gradient from brand-green to brand-charcoal
console.log(`Generating ${FRAME_COUNT} placeholder frames...`);

for (let i = 1; i <= FRAME_COUNT; i++) {
  const t = (i - 1) / (FRAME_COUNT - 1); // 0.0 to 1.0
  
  // Gradient: brand-green (#1B7A2B) → dark (#111827)
  const r = Math.round(0x1B + (0x11 - 0x1B) * t);
  const g = Math.round(0x7A + (0x18 - 0x7A) * t);
  const b = Math.round(0x2B + (0x27 - 0x2B) * t);
  
  const padded = String(i).padStart(4, '0');
  const filename = `frame_${padded}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);
  
  const png = createMinimalPNG(r, g, b);
  fs.writeFileSync(filepath, png);
}

console.log(`✓ Generated ${FRAME_COUNT} frames in ${OUTPUT_DIR}`);
console.log('Note: These are 1x1 pixel PNGs. Replace with actual video frames for production.');

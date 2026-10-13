const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

/**
 * Frame Optimization Script — Idempotent + Atomic Write
 *
 * ── Safety guarantees ──
 * 1. Idempotency:  Re-running is safe. Files already at the target width
 *                   are skipped (no double-compression to 50% of the target).
 * 2. Atomic write: Each frame is written to `<file>.tmp` first, then renamed
 *                   over the original. A crash mid-write leaves the original
 *                   file intact.
 * 3. Cleanup:      On error, any leftover `.tmp` file is removed so the next
 *                   pass can retry cleanly.
 * 4. Per-folder target: Desktop → 1920px (retina desktop), Mobile → 1080px
 *                        (vertical mobile HD). Aspect ratio is preserved.
 */
const directories = [
  {
    path: 'public/home-desktop',
    startFrame: 1,
    endFrame: 337,        // All 337 desktop frames (246–337 are still 4K)
    targetWidth: 1920,   // Retina desktop target
    label: 'desktop'
  },
  {
    path: 'public/home-mobile',
    startFrame: 1,
    endFrame: 452,        // All 452 mobile frames (373–452 were missed by first pass)
    targetWidth: 1080,   // Vertical mobile HD target
    label: 'mobile'
  }
];

/**
 * Process a single frame with idempotency + atomic write.
 * @returns 'resized' | 'skipped' | 'failed'
 */
async function processFrame(filePath, frameNumber, targetWidth) {
  const tmpPath = filePath + '.tmp';
  try {
    const buffer = await fs.readFile(filePath);
    const metadata = await sharp(buffer).metadata();

    // ── IDEMPOTENCY GUARD ──
    // Skip if the frame is already at the target width.
    // This is the critical fix that prevents the second-pass double-compression
    // bug present in the previous version of this script.
    if (metadata.width === targetWidth) {
      console.log(
        `[${frameNumber}] ⏭️  Skipped (already ${targetWidth}px): ${path.basename(filePath)}`
      );
      return 'skipped';
    }

    // ── Compute new height preserving aspect ratio ──
    const aspectRatio = metadata.height / metadata.width;
    const newWidth = targetWidth;
    const newHeight = Math.round(targetWidth * aspectRatio);

    // ── ATOMIC WRITE ──
    // Write to .tmp first, then atomically rename to the real path.
    // If we crash mid-write, the original file is untouched.
    await sharp(buffer)
      .resize({ width: newWidth })
      .toFile(tmpPath);

    await fs.rename(tmpPath, filePath);

    const savedBytes = ((metadata.width * metadata.height) - (newWidth * newHeight))
                        / (metadata.width * metadata.height) * 100;
    console.log(
      `[${frameNumber}] ✅ Resized ${path.basename(filePath)}: ` +
      `${metadata.width}×${metadata.height} → ${newWidth}×${newHeight} (↓${savedBytes.toFixed(1)}% px)`
    );
    return 'resized';
  } catch (error) {
    // ── CLEANUP: remove any leftover .tmp file from a failed pass ──
    try {
      await fs.unlink(tmpPath);
    } catch {
      // tmp didn't exist — that's fine
    }
    console.error(
      `[${frameNumber}] ❌ Error processing ${path.basename(filePath)}:`,
      error.message
    );
    return 'failed';
  }
}

async function processDirectory(dirConfig) {
  const { path: dirPath, startFrame, endFrame, targetWidth, label } = dirConfig;
  const absolutePath = path.resolve(dirPath);

  console.log(`\n📁 Processing [${label}]: ${dirPath}`);
  console.log(`   Frames: ${String(startFrame).padStart(4, '0')} → ${String(endFrame).padStart(4, '0')}`);
  console.log(`   Target width: ${targetWidth}px`);
  console.log('─'.repeat(60));

  let resized = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = startFrame; i <= endFrame; i++) {
    const frameName = `frame_${String(i).padStart(4, '0')}.webp`;
    const filePath = path.join(absolutePath, frameName);

    try {
      await fs.access(filePath);
      const result = await processFrame(filePath, i, targetWidth);
      if (result === 'resized') resized++;
      else if (result === 'skipped') skipped++;
      else failed++;
    } catch {
      console.log(`[${i}] ⚠️  File not found: ${frameName}`);
      failed++;
    }
  }

  console.log('─'.repeat(60));
  console.log(
    `📊 [${label}] ${resized} resized · ${skipped} skipped · ${failed} failed\n`
  );

  return { resized, skipped, failed };
}

async function main() {
  console.log('🎬 Frame Optimization Script — Idempotent + Atomic');
  console.log('═'.repeat(60));

  const totals = { resized: 0, skipped: 0, failed: 0 };

  for (const dirConfig of directories) {
    const result = await processDirectory(dirConfig);
    totals.resized += result.resized;
    totals.skipped += result.skipped;
    totals.failed  += result.failed;
  }

  console.log('═'.repeat(60));
  console.log(
    `🏁 DONE — Total: ${totals.resized} resized · ${totals.skipped} skipped · ${totals.failed} failed`
  );

  if (totals.failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('💥 Fatal:', err);
  process.exit(1);
});

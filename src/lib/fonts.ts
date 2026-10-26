/**
 * Self-hosted Font Loader — RakPlus
 *
 * Inter:         Self-hosted via `next/font/google` in layout.tsx (no FOUT,
 *                no third-party round-trip, no render-blocking cross-origin
 *                request).
 * Clash Display: REMOVED as a third-party dependency (production hotfix).
 *
 * ── WHY THE FONT SHARE CSS WAS REMOVED ─────────────────────────────
 * The previous build loaded
 * `https://api.fontshare.com/v2/css?f[]=clash-display@…` as a
 * render-blocking <link rel="stylesheet"> in the root layout's <head>.
 * That is a cross-origin request on the CRITICAL CSS path. On UAE
 * mobile networks (and behind any DNS/SSL interception) it can:
 *
 *   • stall first paint until the fontshare handshake resolves, or
 *   • hang indefinitely, in which case the browser blocks rendering
 *     of the whole document — including our own stylesheet.
 *
 * That is a direct contributor to the "raw unstyled HTML" failure on
 * rakplusuae.com. Typography is now 100 % self-hosted via Inter, and
 * `--font-clash-display` in globals.css falls back to Inter, so every
 * heading renders instantly with zero third-party dependency.
 *
 * The `clashDisplay` export is retained as a no-op so that any import
 * of it stays type-safe and does not break the build.
 */

/**
 * Retained for backwards compatibility only.
 *
 * This value is NO LONGER used to inject a stylesheet — it is inert
 * and exported purely so existing imports keep resolving. Do not
 * render it into a <link> tag: reintroducing a third-party font
 * stylesheet would undo the production hotfix.
 */
export const CLASH_DISPLAY_IMPORT = "";

/**
 * CSS font-feature-settings preset — applied via `.font-feature-num` class.
 * Activates tabular numerals (tnum), slashed-zero (zero), and stylistic
 * alternates for industrial monospace readouts.
 */
export const MONOSPACE_FEATURES = '"tnum" 1, "zero" 1, "ss01" 1';

/**
 * No-op export so `import { clashDisplay } from "@/lib/fonts"` keeps
 * working. The class it contributes is inert; the real
 * `--font-clash-display` variable is declared in globals.css and
 * resolves to Inter.
 */
export const clashDisplay = {
  variable: "__font_clash_display_removed_in_favour_of_self_hosted_inter__",
};

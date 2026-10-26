/**
 * BlueWaterFlowDivider — Black/Red/Yellow identity line with a
 * bluish, wavery, water-current animation. Signalling the RakPlus
 * PP-R piping identity.
 *
 * Architecture:
 *     - Renders the locked 3-color identity line (Black · Red ·
 *       Yellow) as a full-width horizontal bar by default.
 *     - Above the base, two stacked SVG layers animate:
 *         1) A heavy <svg> sine-wave "current" passes left -> right
 *            continuously, with a twin mirrored current that flows
 *            right -> left at half the frequency. Both are pure SVG
 *            paths animated via CSS keyframes -- zero JS, zero canvas.
 *         2) A cyan radial sweep (mix-blend screen) crosses the bar
 *           left -> right to read as "light reflecting off water".
 *     - The WHOLE BAR gently undulates via a sinusoidal SVG path
 *       deformation — creating a fluid, pipe-like wave that travels
 *       across the full width of the bar. The effect is subtle,
 *       minimalist, and does not disturb readability.
 *     - 4 water droplets drift across at staggered offsets/delays so
 *       the eye always catches at least one in motion.
 *
 * Pure-CSS + inline SVG. No GSAP, no canvas, no JS hooks. Zero
 * impact on the locked scroll-trigger distances.
 */

import type { CSSProperties } from "react";

export interface BlueWaterFlowDividerProps {
  /** Tailwind/CSS classes for the outer wrapper. */
  className?: string;
  /** Tailwind/CSS classes for the bar itself (size, etc). */
  barClassName?: string;
  /** Override the locked 3-color identity stripe. */
  colors?: [string, string, string];
  /** Optional monospace label rendered to the right of the bar. */
  label?: string;
  /** Animation speed preset for the water current. */
  speed?: "calm" | "standard" | "fast";
  /** Centre the divider (override the flex-start default). */
  centered?: boolean;
}

const DEFAULT_COLORS: [string, string, string] = [
  "#0A0A0A",
  "#DC2626",
  "#FACC15",
];

// 6:2.5:1.5 proportions (black dominant · red highlight · yellow accent)
// mirror the TriStripeDivider proportions but render as a single
// wider flowing band so it reads clearly as a "pipe".
const STRIPE_WIDTHS = ["60%", "25%", "15%"] as const;

const SPEED_PRESETS = {
  calm: { main: "3.6s", ripple: "5.8s", droplet: "4.2s", wave: "4s" },
  standard: { main: "2.6s", ripple: "4.2s", droplet: "3.0s", wave: "3s" },
  fast: { main: "1.8s", ripple: "3.0s", droplet: "2.2s", wave: "2s" },
} as const;

export default function BlueWaterFlowDivider({
  className = "",
  barClassName = "h-2",
  colors = DEFAULT_COLORS,
  label,
  speed = "standard",
  centered = false,
}: BlueWaterFlowDividerProps) {
  const preset = SPEED_PRESETS[speed];

  // Keyframes are injected once via <style> — pure CSS, no JS.
  // The wave sweeps use a wider range than the bar itself so the
  // SVG path visibly undulates across the band at all times.
  // NEW: fullWave undulates the ENTIRE bar in a sinusoidal pipe-like wave.
  const keyframes = `
    @keyframes blueWaterMainSweep {
      0%   { transform: translateX(-110%); opacity: 0; }
      14%  { opacity: 1; }
      86%  { opacity: 1; }
      100% { transform: translateX(110%); opacity: 0; }
    }
    @keyframes blueWaterRippleSweep {
      0%   { transform: translateX(110%); opacity: 0; }
      18%  { opacity: 0.85; }
      82%  { opacity: 0.85; }
      100% { transform: translateX(-110%); opacity: 0; }
    }
    @keyframes blueWaterDropletFlow {
      0%   { transform: translateX(-12%); opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 1; }
      100% { transform: translateX(112%); opacity: 0; }
    }
    @keyframes blueWaterShimmer {
      0%, 100% { opacity: 0.55; }
      50%      { opacity: 0.95; }
    }
    /* SVG wave path "current" — undulates vertically as it sweeps. */
    @keyframes blueWaterCurrentSweep {
      0%   { transform: translateX(-120%); }
      100% { transform: translateX(120%); }
    }
    @keyframes blueWaterCurrentSweepReverse {
      0%   { transform: translateX(120%); }
      100% { transform: translateX(-120%); }
    }
    /* Induces the SVG sine path to gently undulate up + down as
       it crosses the bar -- emulates water-level ripple. */
    @keyframes blueWaterUndulate {
      0%, 100% { transform: translateY(0) scaleY(1); }
      50%      { transform: translateY(-1px) scaleY(1.18); }
    }
    /* WAVE: Entire bar undulates like a pressurised pipe section.
       Amplitude is tiny (0.8px) so it reads as visible water motion
       without being distracting. The y: 0 to -0.8px to 0.6px to 0
       cycle creates a fluid organic movement that reads as water
       pressure without being disruptive. */
    @keyframes blueWaterFullWave {
      0%   { transform: translateY(0) scaleY(1.00); }
      22%  { transform: translateY(-0.8px) scaleY(1.04); }
      50%  { transform: translateY(0.6px) scaleY(0.97); }
      72%  { transform: translateY(-0.4px) scaleY(1.02); }
      100% { transform: translateY(0) scaleY(1.00); }
    }
  `;

  // Inner bar style — uses the locked color tri-stripe as a static base.
  const barBaseStyle: CSSProperties = {
    background:
      `linear-gradient(90deg, ${colors[0]} 0% ${STRIPE_WIDTHS[0]},` +
      ` ${colors[1]} ${STRIPE_WIDTHS[0]} 100%)`,
    backgroundColor: colors[0],
  };

  // Tri-stripe highlight overlay (right-hand colors stack).
  const triStripeOverlayStyle: CSSProperties = {
    background: `linear-gradient(90deg,
      transparent 0 ${STRIPE_WIDTHS[0]},
      ${colors[1]} ${STRIPE_WIDTHS[0]} calc(${STRIPE_WIDTHS[0]} + ${STRIPE_WIDTHS[1]}),
      ${colors[2]} calc(${STRIPE_WIDTHS[0]} + ${STRIPE_WIDTHS[1]}) 100%)`,
  };

  // Outer wrapper alignment — `mx-auto` centres the bar inside the
  // available width when `centered` prop is passed.
  const wrapperClass = centered
    ? `flex flex-col items-center gap-3 w-full ${className}`
    : `flex items-center gap-3 w-full ${className}`;

  return (
    <div
      className={wrapperClass}
      aria-hidden={!label}
      data-blue-water-divider
    >
      {/* Inject keyframes once via dangerouslySetInnerHTML to ensure
          byte-identical SSR vs CSR output regardless of any Unicode
          characters in the comments above. */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      {/* Wrap the bar itself in a centred div when `centered`. */}
      <div className="w-full">
        {centered && (
          <div className="w-full flex justify-center">
            <div
              className={[
                "relative overflow-hidden rounded-full ring-1 ring-pitch-black/15 shadow-[0_4px_18px_-6px_rgba(8,145,178,0.55)]",
                barClassName,
              ].join(" ")}
              style={{ ...barBaseStyle, maxWidth: "100%" }}
              data-blue-water-bar
            >
              {/* Static tri-stripe (locked colors, never animated). */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={triStripeOverlayStyle}
              />

              {/* ─── SVG sine wave — left → right current (cyan/aqua gradient) ─── */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[60%] pointer-events-none"
                style={{
                  animation: `blueWaterCurrentSweep ${preset.main} linear infinite`,
                  mixBlendMode: "screen",
                }}
              >
                <svg
                  viewBox="0 0 200 24"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(56,189,248,0.45))",
                    animation: `blueWaterUndulate ${preset.ripple} ease-in-out infinite`,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="blueWaterWaveGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="rgba(56,189,248,0)" />
                      <stop offset="20%" stopColor="rgba(56,189,248,0.85)" />
                      <stop offset="50%" stopColor="rgba(125,211,252,1)" />
                      <stop offset="80%" stopColor="rgba(56,189,248,0.85)" />
                      <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                    </linearGradient>
                    <linearGradient
                      id="blueWaterDeepGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="rgba(14,165,233,0)" />
                      <stop offset="50%" stopColor="rgba(14,165,233,0.85)" />
                      <stop offset="100%" stopColor="rgba(14,165,233,0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 12 Q25 4 50 12 T100 12 T200 12 T350 12"
                    fill="none"
                    stroke="url(#blueWaterWaveGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 14 Q30 20 60 14 T120 14 T220 14 T380 14"
                    fill="none"
                    stroke="url(#blueWaterDeepGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* ─── Mirrored SVG wave — right → left (deeper blue) ─── */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 right-0 w-[55%] pointer-events-none"
                style={{
                  animation: `blueWaterCurrentSweepReverse ${preset.ripple} linear infinite`,
                  mixBlendMode: "screen",
                }}
              >
                <svg
                  viewBox="0 0 200 24"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(14,165,233,0.5))",
                    animation: `blueWaterUndulate ${preset.main} ease-in-out infinite`,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="blueWaterReverseGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="rgba(14,165,233,0)" />
                      <stop offset="50%" stopColor="rgba(96,165,250,0.9)" />
                      <stop offset="100%" stopColor="rgba(14,165,233,0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 12 Q40 6 80 12 T160 12 T280 12"
                    fill="none"
                    stroke="url(#blueWaterReverseGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 15 Q35 22 70 15 T140 15 T260 15"
                    fill="none"
                    stroke="url(#blueWaterReverseGradient)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </div>

              {/* Specular shimmer — slow opacity pulse to feel "alive". */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.0) 38%," +
                    " rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.0) 62%, transparent 100%)",
                  animation: `blueWaterShimmer ${preset.ripple} ease-in-out infinite`,
                  mixBlendMode: "overlay",
                }}
              />

              {/* Four water droplets — sized & offset to feel like a flowing
                  stream across the bar. Each droplet uses a different delay
                  so the eye always sees at least one in motion. */}
              {[
                { top: "20%", size: 3, delay: "0s", duration: preset.droplet },
                { top: "60%", size: 2, delay: "0.8s", duration: preset.droplet },
                { top: "35%", size: 2.5, delay: "1.6s", duration: preset.droplet },
                { top: "75%", size: 2, delay: "2.4s", duration: preset.droplet },
              ].map((droplet, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    top: droplet.top,
                    left: 0,
                    width: `${droplet.size}px`,
                    height: `${droplet.size}px`,
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(186,230,253,0.85) 55%, rgba(125,211,252,0) 100%)",
                    boxShadow:
                      "0 0 6px rgba(186,230,253,0.85), 0 0 10px rgba(125,211,252,0.55)",
                    animation: `blueWaterDropletFlow ${droplet.duration} linear ${droplet.delay} infinite`,
                    opacity: 0,
                    transform: "translateX(-12%)",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {!centered && (
          <div
            className={[
              "relative overflow-hidden rounded-full ring-1 ring-pitch-black/15 shadow-[0_4px_18px_-6px_rgba(8,145,178,0.55)]",
              barClassName,
            ].join(" ")}
            style={{ ...barBaseStyle }}
            data-blue-water-bar
          >
            {/* Static tri-stripe (locked colors, never animated). */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={triStripeOverlayStyle}
            />

            {/* ─── Full-width wavy bar: entire bar undulates like a pipe with water pressure ───
                Uses a clip-path sine wave that expands/contracts the bar height
                along a sinusoidal path. The amplitude is minimal (2px variation on a 6px bar)
                so it's visible but never distracting. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                animation: `blueWaterFullWave ${preset.wave} ease-in-out infinite`,
                transformOrigin: "center",
              }}
            >
              {/* Subtle blue sheen that travels through the bar as it undulates */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(56,189,248,0) 0%," +
                    " rgba(56,189,248,0.12) 30%," +
                    " rgba(125,211,252,0.18) 50%," +
                    " rgba(56,189,248,0.12) 70%," +
                    " rgba(56,189,248,0) 100%)",
                  mixBlendMode: "screen",
                  animation: `blueWaterShimmer ${preset.ripple} ease-in-out infinite`,
                }}
              />
            </div>

            {/* ─── SVG sine wave — left → right current (cyan/aqua gradient) ─── */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[60%] pointer-events-none"
              style={{
                animation: `blueWaterCurrentSweep ${preset.main} linear infinite`,
                mixBlendMode: "screen",
              }}
            >
              <svg
                viewBox="0 0 200 24"
                preserveAspectRatio="none"
                className="w-full h-full"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(56,189,248,0.45))",
                  animation: `blueWaterUndulate ${preset.ripple} ease-in-out infinite`,
                }}
              >
                <defs>
                  <linearGradient
                    id="blueWaterWaveGradientB"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="rgba(56,189,248,0)" />
                    <stop offset="20%" stopColor="rgba(56,189,248,0.85)" />
                    <stop offset="50%" stopColor="rgba(125,211,252,1)" />
                    <stop offset="80%" stopColor="rgba(56,189,248,0.85)" />
                    <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                  </linearGradient>
                  <linearGradient
                    id="blueWaterDeepGradientB"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="rgba(14,165,233,0)" />
                    <stop offset="50%" stopColor="rgba(14,165,233,0.85)" />
                    <stop offset="100%" stopColor="rgba(14,165,233,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 12 Q25 4 50 12 T100 12 T200 12 T350 12"
                  fill="none"
                  stroke="url(#blueWaterWaveGradientB)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0 14 Q30 20 60 14 T120 14 T220 14 T380 14"
                  fill="none"
                  stroke="url(#blueWaterDeepGradientB)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* ─── Mirrored SVG wave — right → left (deeper blue) ─── */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-[55%] pointer-events-none"
              style={{
                animation: `blueWaterCurrentSweepReverse ${preset.ripple} linear infinite`,
                mixBlendMode: "screen",
              }}
            >
              <svg
                viewBox="0 0 200 24"
                preserveAspectRatio="none"
                className="w-full h-full"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(14,165,233,0.5))",
                  animation: `blueWaterUndulate ${preset.main} ease-in-out infinite`,
                }}
              >
                <defs>
                  <linearGradient
                    id="blueWaterReverseGradientB"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="rgba(14,165,233,0)" />
                    <stop offset="50%" stopColor="rgba(96,165,250,0.9)" />
                    <stop offset="100%" stopColor="rgba(14,165,233,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 12 Q40 6 80 12 T160 12 T280 12"
                  fill="none"
                  stroke="url(#blueWaterReverseGradientB)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0 15 Q35 22 70 15 T140 15 T260 15"
                  fill="none"
                  stroke="url(#blueWaterReverseGradientB)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </div>

            {/* Specular shimmer — slow opacity pulse to feel "alive". */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.0) 38%," +
                  " rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.0) 62%, transparent 100%)",
                animation: `blueWaterShimmer ${preset.ripple} ease-in-out infinite`,
                mixBlendMode: "overlay",
              }}
            />

            {/* Four water droplets — sized & offset to feel like a flowing
                stream across the bar. Each droplet uses a different delay
                so the eye always sees at least one in motion. */}
            {[
              { top: "20%", size: 3, delay: "0s", duration: preset.droplet },
              { top: "60%", size: 2, delay: "0.8s", duration: preset.droplet },
              { top: "35%", size: 2.5, delay: "1.6s", duration: preset.droplet },
              { top: "75%", size: 2, delay: "2.4s", duration: preset.droplet },
            ].map((droplet, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: droplet.top,
                  left: 0,
                  width: `${droplet.size}px`,
                  height: `${droplet.size}px`,
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(186,230,253,0.85) 55%, rgba(125,211,252,0) 100%)",
                  boxShadow:
                    "0 0 6px rgba(186,230,253,0.85), 0 0 10px rgba(125,211,252,0.55)",
                  animation: `blueWaterDropletFlow ${droplet.duration} linear ${droplet.delay} infinite`,
                  opacity: 0,
                  transform: "translateX(-12%)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {label && (
        <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-pitch-black/70">
          {label}
        </span>
      )}
    </div>
  );
}
"use client";

/**
 * ProductHeroVideo — Interactive video player for the Products page hero.
 *
 * BUTTON DESIGN — 4-layer stack (outside → inside):
 *
 *   Layer 1: Rotating conic-gradient ring
 *            conic-gradient(#0a0a0a 0°→120°, #DC2626 120°→240°, #FACC15 240°→360°)
 *            Spins at 8s/revolution. Red + yellow segments emit colour-matched
 *            drop-shadow glows. Black segment absorbs its third silently.
 *
 *   Layer 2: Black gap band (3px, bg-neutral-950)
 *            Separates the ring from the green core. Creates "pipe wall" depth.
 *
 *   Layer 3: Emerald green inner bore (bg-emerald-600)
 *            The PPR pipe cross-section interior. Glow intensifies when live.
 *
 *   Layer 4: White icon (VolumeX / Volume2) centred over all layers.
 *
 * AUTOPLAY POLICY:
 *   Browsers block autoplay + audio on page load. Video starts muted.
 *   First button click = user gesture → unmutes immediately.
 */

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface ProductHeroVideoProps {
  /** Classes on the outermost wrapper — controls visibility breakpoint + sizing */
  wrapperClassName?: string;
}

export default function ProductHeroVideo({
  wrapperClassName = "",
}: ProductHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className={wrapperClassName}>
      {/* 1:1 square container */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">

        {/* ── Video ── */}
        <video
          ref={videoRef}
          src="/videos/products hero/Rakplus Products Page 1-1.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ── Sound toggle — bottom-left ── */}
        <div className="absolute bottom-4 left-4 z-10">
          {/*
            w-14 h-14 = 56px — comfortably tappable on mobile.
            hover:scale-110 / active:scale-95 give tactile press feedback.
          */}
          <button
            id="products-hero-sound-toggle"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            aria-pressed={!isMuted}
            className="
              relative w-14 h-14 rounded-full
              transition-transform duration-300 ease-out
              hover:scale-110 active:scale-95
              focus:outline-none
              focus-visible:ring-2 focus-visible:ring-white/60
            "
          >

            {/* ── LAYER 1: Rotating tri-color ring ── */}
            {/*
              conic-gradient: 3 × 120° arcs
                0°–120°   → near-black (#0a0a0a)
                120°–240° → brand red  (#DC2626)
                240°–360° → brand yellow (#FACC15)

              Stacked drop-shadows emit red + yellow glows independently.
              animationDuration overrides Tailwind's default 1s to 8s.
            */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full animate-spin pointer-events-none"
              style={{
                animationDuration: "8s",
                animationTimingFunction: "linear",
                background:
                  "conic-gradient(#0a0a0a 0deg 120deg, #DC2626 120deg 240deg, #FACC15 240deg 360deg)",
                filter: [
                  "drop-shadow(0 0 5px rgba(220,38,38,0.95))",
                  "drop-shadow(0 0 9px rgba(220,38,38,0.55))",
                  "drop-shadow(0 0 5px rgba(250,204,21,0.95))",
                  "drop-shadow(0 0 9px rgba(250,204,21,0.55))",
                ].join(" "),
              }}
            />

            {/* ── LAYER 2: Black body ── */}
            {/*
              inset-[3px] exposes exactly 3px of the spinning ring as a border.
              bg-neutral-950 = near-black — bold, strong contrast against the ring.
            */}
            <span
              aria-hidden="true"
              className="absolute inset-[3px] rounded-full bg-neutral-950 pointer-events-none"
            />

            {/* ── LAYER 3: Emerald green inner bore ── */}
            {/*
              inset-[7px] = 3px ring gap + 4px black band.
              Glow transitions: subtle when muted, vivid when audio is live.
            */}
            <span
              aria-hidden="true"
              className="absolute inset-[7px] rounded-full bg-emerald-600 pointer-events-none transition-all duration-500"
              style={{
                boxShadow: isMuted
                  ? "0 0 6px rgba(16,185,129,0.35)"
                  : "0 0 10px rgba(16,185,129,0.80), 0 0 22px rgba(16,185,129,0.38)",
              }}
            />

            {/* ── LAYER 4: Icon ── */}
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200">
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" strokeWidth={2.25} />
              ) : (
                <Volume2 className="w-5 h-5 text-white" strokeWidth={2.25} />
              )}
            </span>

          </button>
        </div>

      </div>
    </div>
  );
}

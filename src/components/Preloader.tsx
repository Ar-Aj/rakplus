"use client";

import { useState, useEffect, useRef } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // SVG coordinates & circumference for the glowing energy ring
  // Wrapper is 256x256 (w-64 h-64), center is (128, 128)
  // Inner round video is inset-4 (radius 112px), ring radius is 120px
  const RADIUS = 120;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  // 1. 5-second progress ticker: 50ms * 100 steps = 5000ms
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // 2. On 100%: wait 500ms, then trigger CSS opacity fade-out; unmount after transition
  useEffect(() => {
    if (progress < 100) return;

    // Wait 500ms before triggering fade-out (total 5.5s active)
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    // After 700ms CSS fade transition completes, unmount from DOM
    const unmountTimer = setTimeout(() => {
      setIsRendered(false);
    }, 1200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [progress]);

  // 3. Lock body scrolling while preloader overlay is active
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  // 4. Autoplay video safeguard for mobile & modern browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback (video has muted and playsInline)
      });
    }
  }, []);

  // Unmount completely from DOM once faded out
  if (!isRendered) {
    return null;
  }

  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out select-none ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Circular Preloader Wrapper */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />

        {/* Centered Circular Mask for Video */}
        <div className="absolute inset-4 rounded-full overflow-hidden bg-black flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]">
          <video
            ref={videoRef}
            src="/videos/Loader/Logo%20Animation.mp4"
            autoPlay
            muted
            playsInline
            loop
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Glowing Bluish Energy Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-[0_0_20px_rgba(56,189,248,0.8)] overflow-visible"
          viewBox="0 0 256 256"
        >
          <defs>
            <linearGradient id="bluishEnergyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>
          </defs>

          {/* Energy Track Line */}
          <circle
            cx="128"
            cy="128"
            r={RADIUS}
            stroke="rgba(56, 189, 248, 0.15)"
            strokeWidth="3"
            fill="none"
          />

          {/* Active Energy Progress Stroke */}
          <circle
            cx="128"
            cy="128"
            r={RADIUS}
            stroke="url(#bluishEnergyGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            className="transition-[stroke-dashoffset] duration-75 ease-linear"
          />
        </svg>
      </div>

      {/* Tech-Styled Monospace Percentage Counter */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-sky-400 font-semibold uppercase drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] tabular-nums">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
          <span>LOADING {progress}%</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

interface LiquidButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isPrimary?: boolean;
}

export default function LiquidButton({ href, children, className = "", isPrimary = true }: LiquidButtonProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const greenLayerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleMouseEnter = () => {
    if (tlRef.current) tlRef.current.kill();
    
    tlRef.current = gsap.timeline();
    
    // Reset position if coming from a hard stop
    gsap.set(greenLayerRef.current, { clipPath: "circle(0% at -10% 50%)" });

    // The Magnetic Emerald Sweep
    tlRef.current
      .to(greenLayerRef.current, {
        clipPath: "circle(150% at 50% 50%)",
        duration: 0.85,
        ease: "power4.inOut",
      }, 0)
      // Text physically reacts to the liquid momentum
      .to(textRef.current, {
        y: -4,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      }, 0.2)
      .to(textRef.current, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut",
      }, 0.5);
  };

  const handleMouseLeave = () => {
    if (tlRef.current) tlRef.current.kill();
    
    tlRef.current = gsap.timeline();
    
    // Smoothly recede back
    tlRef.current
      .to(greenLayerRef.current, {
        clipPath: "circle(0% at 110% 50%)", // exits to the right for a continuous flow illusion
        duration: 0.6,
        ease: "power3.inOut",
      }, 0)
      .to(textRef.current, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.inOut",
      }, 0);
  };

  if (!isPrimary) {
    // Secondary/Ghost CTA
    return (
      <Link href={href} className={`gsap-cta inline-flex items-center gap-3 px-7 py-3.5 md:px-9 md:py-4 text-sm md:text-base font-bold rounded-full transition-colors duration-200 group bg-neutral-950/10 backdrop-blur-sm text-neutral-950 border border-neutral-950/20 hover:bg-neutral-950 hover:text-white ${className}`}>
        {children}
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    );
  }

  // AWWWARDS-LEVEL "MAGNETIC EMERALD" BUTTON
  return (
    <Link
      ref={containerRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden inline-flex items-center gap-3 px-7 py-3.5 md:px-9 md:py-4 bg-red-600 text-white text-sm md:text-base font-bold rounded-full shadow-[0_8px_30px_rgba(220,38,38,0.35)] group ${className}`}
    >
      {/* Layer 1 (The Magnetic Emerald Wake) */}
      <div 
        ref={greenLayerRef}
        className="absolute inset-0 bg-emerald-600 z-10"
        style={{ clipPath: "circle(0% at -10% 50%)" }}
      />

      {/* Content (Z-20 absolute top so it remains visible above the green) */}
      <span 
        ref={textRef}
        className="relative z-20 inline-flex items-center gap-3 origin-center"
      >
        {children}
        <ArrowRight className="w-4 h-4 transition-transform duration-200" />
      </span>
    </Link>
  );
}

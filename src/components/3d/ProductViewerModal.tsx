"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, Bounds, Center } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import PipeModel from "./PipeModel";

interface ProductViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelPath: string;
}

export default function ProductViewerModal({ isOpen, onClose, modelPath }: ProductViewerModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#E5E7EB]">
      {/* Premium close button */}
      <button
        onClick={onClose}
        className="absolute top-12 right-12 z-50 text-white text-sm font-sans font-bold tracking-widest uppercase hover:text-emerald-500 transition-colors flex items-center gap-2 cursor-pointer"
      >
        <span>CLOSE</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="w-full h-full">
        <Canvas camera={{ fov: 45 }} dpr={[1, 2]} gl={{ alpha: true }}>
          {/* 1. Global Ambient - Lifts pitch-black shadows */}
          <ambientLight intensity={1.5} />

          {/* 2. Top-Down Key Light - Creates the main top highlight */}
          <directionalLight position={[5, 10, 5]} intensity={3.5} castShadow />

          {/* 3. Bottom Bounce Fill - Illuminates the underside of the pipe */}
          <directionalLight position={[0, -5, 5]} intensity={1.5} color="#e0e0e0" />

          {/* 4. Back Rim Light - Separates the dark pipe from the dark background */}
          <spotLight position={[-10, 5, -5]} intensity={5} angle={0.3} penumbra={1} color="#ffffff" />

          {/* 5. HDRI Environment - Provides realistic room reflections */}
          <Environment preset="city" environmentIntensity={0.85} />

          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.2}>
              <Center rotation={[0, -Math.PI / 5, 0]}>
                <PipeModel modelPath={modelPath} />
              </Center>
            </Bounds>
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.6}
              scale={10}
              blur={2}
              far={4}
            />
          </Suspense>

          {/* makeDefault required for Bounds to hijack camera on fit */}
          <OrbitControls
            makeDefault
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
    </div>
  );
}

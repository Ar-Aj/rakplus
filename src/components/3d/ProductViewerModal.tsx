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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-neutral-950">
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
          {/* Studio Lighting Rig */}
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />
          <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#ffffff" />
          <Environment preset="city" environmentIntensity={0.4} />

          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.2}>
              <Center rotation={[0, Math.PI / 4.5, Math.PI / 20]}>
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

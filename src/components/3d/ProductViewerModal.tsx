"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Environment } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import * as THREE from "three";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <button
        onClick={onClose}
        className="absolute top-12 right-12 z-50 text-neutral-950 text-sm font-sans font-bold tracking-widest uppercase hover:text-emerald-600 transition-colors flex items-center gap-2 cursor-pointer"
      >
        <span>CLOSE</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="w-full h-full">
        <Canvas camera={{ fov: 45, near: 0.01, far: 100, position: [0, 0, 4.5] }} dpr={[1, 2]} gl={{ toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 0.85 }}>
          <color attach="background" args={["#ffffff"]} />

          <Suspense fallback={null}>
            <Environment files={encodeURI("/3D Models/studio_small_08_4k.hdr")} background={false} environmentIntensity={0.6} />
            {/* Front-facing directional — blasts the front face, natural edge shadow */}
            <directionalLight position={[0, 0, 5]} intensity={1.2} />
            {/* Ambient fill — low enough to allow edge shadows to form */}
            <ambientLight intensity={0.8} />
            <Center rotation={[0, -Math.PI / 5, 0]}>
              <PipeModel modelPath={modelPath} />
            </Center>
          </Suspense>

          <OrbitControls
            makeDefault
            target={[0, 0, 0]}
            enablePan={false}
            enableZoom={true}
            enableDamping={true}
            dampingFactor={0.05}
            autoRotate={false}
            minDistance={4}
            maxDistance={10}
            minPolarAngle={THREE.MathUtils.degToRad(55)}
            maxPolarAngle={THREE.MathUtils.degToRad(125)}
            zoomSpeed={0.7}
          />
        </Canvas>
      </div>
    </div>
  );
}

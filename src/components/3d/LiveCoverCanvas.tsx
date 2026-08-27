"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Bounds, Center } from "@react-three/drei";
import { Suspense } from "react";
import PipeModel from "./PipeModel";

interface LiveCoverCanvasProps {
  modelPath: string;
}

export default function LiveCoverCanvas({ modelPath }: LiveCoverCanvasProps) {
  return (
    <Canvas camera={{ fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
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
        {/* margin={0.6} — tight macro close-up crop for the card teaser */}
        <Bounds fit clip observe margin={0.6}>
          <Center>
            <PipeModel modelPath={modelPath} />
          </Center>
        </Bounds>
      </Suspense>

      {/* Non-interactive — only the CTA button triggers the modal */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}

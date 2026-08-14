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
      {/* Studio Lighting Rig */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#ffffff" />
      <Environment preset="city" environmentIntensity={0.4} />

      <Suspense fallback={null}>
        {/* margin={0.6} — tight macro close-up crop for the card teaser */}
        <Bounds fit clip observe margin={0.6}>
          <Center rotation={[0, Math.PI / 4.5, Math.PI / 20]}>
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

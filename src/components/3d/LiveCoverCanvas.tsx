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
    <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      {/* Studio Lighting Rig */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 8, 3]} intensity={2.5} castShadow />
      <spotLight position={[-5, 3, 4]} intensity={3} angle={0.4} penumbra={1} />
      <Environment preset="city" />

      <Suspense fallback={null}>
        {/* margin={0.6} — tight macro close-up crop for the card teaser */}
        <Bounds fit clip observe margin={0.6}>
          {/* -45° Y rotation — barrel-angle perspective without breaking camera math */}
          <Center rotation={[0, -Math.PI / 4, 0]}>
            <PipeModel modelPath={modelPath} />
          </Center>
        </Bounds>
      </Suspense>

      {/* Non-interactive — only the CTA button triggers the modal */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.0}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}

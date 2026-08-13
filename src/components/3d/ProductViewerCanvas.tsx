"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import PipeModel from "./PipeModel";

export default function ProductViewerCanvas({ modelPath }: { modelPath: string }) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <PipeModel modelPath={modelPath} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.5}
          maxPolarAngle={Math.PI / 2}
        />
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
        />
      </Canvas>
    </div>
  );
}

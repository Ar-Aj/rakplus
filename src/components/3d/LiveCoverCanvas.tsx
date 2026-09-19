"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Environment } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import PipeModel from "./PipeModel";

interface LiveCoverCanvasProps {
  modelPath: string;
}

export default function LiveCoverCanvas({ modelPath }: LiveCoverCanvasProps) {
  return (
    <Canvas
      flat
      gl={{ antialias: true, toneMappingExposure: 1 }}
      camera={{ fov: 45, near: 0.01, far: 100, position: [0, 0, 4] }}
      dpr={[1, 2]}
    >
      {/* Pure white background — HDR is lighting-only, not scene bg */}
      <color attach="background" args={["#ffffff"]} />

      {/* Custom HDR studio environment — reflections + lighting only */}
      <Environment files="/3D Models/studio_small_08_4k.hdr" background={false} />

      {/* Subtle ambient fill to prevent fully-dark shadow faces */}
      <ambientLight intensity={0.5} />

      <Suspense fallback={null}>
        <Center>
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
  );
}

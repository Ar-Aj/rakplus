"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
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
      camera={{ fov: 45, near: 0.01, far: 100, position: [0, 0, 4] }}
      dpr={[1, 2]}
      gl={{ antialias: true, toneMappingExposure: 1 }}
    >
      <color attach="background" args={["#ffffff"]} />

      {/* Flood ambient for uniform color, minimal direct for subtle depth */}
      <ambientLight intensity={2.5} />
      <directionalLight position={[0, 0, 5]} intensity={0.3} castShadow={false} />

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
        minDistance={3.5}
        maxDistance={10}
        minPolarAngle={THREE.MathUtils.degToRad(55)}
        maxPolarAngle={THREE.MathUtils.degToRad(125)}
        zoomSpeed={0.7}
      />
    </Canvas>
  );
}

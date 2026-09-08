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
    <Canvas camera={{ fov: 45, near: 0.01, far: 100, position: [0, 0, 3] }} dpr={[1, 2]} gl={{ antialias: true }}>
      {/* Pure white background environment test */}
      <color attach="background" args={['#FFFFFF']} />

      {/* Normalized 4-point lighting rig matching standard WebGL viewer */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[4, 6, 5]} intensity={2.0} castShadow />
      <directionalLight position={[-5, 2, 3]} intensity={1.0} />
      <directionalLight position={[0, 2, -6]} intensity={1.0} />


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
        minPolarAngle={THREE.MathUtils.degToRad(55)}
        maxPolarAngle={THREE.MathUtils.degToRad(125)}
        zoomSpeed={0.7}
      />
    </Canvas>
  );
}

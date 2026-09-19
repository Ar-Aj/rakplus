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
    <Canvas camera={{ fov: 45, near: 0.01, far: 100, position: [0, 0, 4] }} dpr={[1, 2]} gl={{ toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 0.85 }}>
      <color attach="background" args={["#ffffff"]} />

      <Suspense fallback={null}>
        <Environment files={encodeURI("/3D Models/studio_small_08_4k.hdr")} background={false} environmentIntensity={0.6} />
        {/* Front-facing directional — blasts the front face, natural edge shadow */}
        <directionalLight position={[0, 0, 5]} intensity={1.2} />
        {/* Ambient fill — low enough to allow edge shadows to form */}
        <ambientLight intensity={0.8} />
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

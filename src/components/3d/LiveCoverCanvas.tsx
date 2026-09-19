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
    <Canvas camera={{ fov: 45, near: 0.01, far: 100, position: [0, 0, 4] }} dpr={[1, 2]} gl={{ toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 0.8 }}>
      <color attach="background" args={["#ffffff"]} />

      <Suspense fallback={null}>
        <Environment files={encodeURI("/3D Models/studio_small_08_4k.hdr")} background={false} environmentIntensity={0.6} />
        {/* Perpendicular key light — hits cylinder face-on, misses rim/cavity */}
        <directionalLight position={[0, 5, 5]} intensity={1.0} castShadow={false} />
        {/* Ambient fill — low enough to let rim/mouth fall into shadow */}
        <ambientLight intensity={1.2} />
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

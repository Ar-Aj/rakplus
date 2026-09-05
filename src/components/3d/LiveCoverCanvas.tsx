"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, Center } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import PipeModel from "./PipeModel";

interface LiveCoverCanvasProps {
  modelPath: string;
}

export default function LiveCoverCanvas({ modelPath }: LiveCoverCanvasProps) {
  return (
    <Canvas camera={{ fov: 45 }} dpr={[1, 2]} gl={{ alpha: false, antialias: true }}>
      {/* Neutral dark grey background for raw texture evaluation */}
      <color attach="background" args={['#2E2E2E']} />
      {/* 1. Global Ambient - Lifts pitch-black shadows */}
      <ambientLight intensity={1.8} color="#ffffff" />

      {/* 2. Top-Down Key Light - Creates the main top highlight */}
      <directionalLight position={[5, 10, 5]} intensity={3.5} castShadow />

      {/* 3. Bottom Bounce Fill - Illuminates the underside of the pipe */}
      <directionalLight position={[0, -5, 5]} intensity={1.5} color="#e0e0e0" />

      {/* 4. Back Rim Light - Separates the dark pipe from the dark background */}
      <spotLight position={[-10, 5, -5]} intensity={5} angle={0.3} penumbra={1} color="#ffffff" />

      {/* 5. Rear Fill Light - Illuminates the back of the cylinder */}
      <directionalLight intensity={3} position={[0, 2, -6]} color="#ffffff" />


      <Suspense fallback={null}>
        {/* margin={0.6} — tight macro close-up crop for the card teaser */}
        <Bounds fit clip observe margin={0.6}>
          <Center>
            <PipeModel modelPath={modelPath} />
          </Center>
        </Bounds>
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

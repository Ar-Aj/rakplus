"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

const POOL_SIZES = [20, 25, 32, 40, 50, 63, 75, 90, 110];

interface PipeConfig {
  id: string;
  url: string;
  position: [number, number, number];
  scale: number;
  speed: number;
  initialRotationY: number;
}

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface RotatingPipeProps {
  url: string;
  position: [number, number, number];
  scale: number;
  speed: number;
  initialRotationY: number;
}

function RotatingPipe({
  url,
  position,
  scale,
  speed,
  initialRotationY,
}: RotatingPipeProps) {
  const ref = useRef<THREE.Group>(null!);
  const currentScale = useRef(0.01);
  const { scene } = useGLTF(url);

  // Clone scene so multiple instances don't fight for the same Object3D node in scene graph
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useFrame((_, delta) => {
    if (ref.current) {
      // Smooth entrance zoom-in when model finishes loading
      if (currentScale.current < scale) {
        currentScale.current = THREE.MathUtils.lerp(
          currentScale.current,
          scale,
          delta * 4
        );
        ref.current.scale.setScalar(currentScale.current);
      }

      // TASK 1: Restrict rotation strictly to Y-axis (sideways only)
      ref.current.rotation.y += delta * speed;
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation={[0, initialRotationY, 0]}
      scale={0.01}
    >
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

export default function ContactBackground3D() {
  const [pipes, setPipes] = useState<PipeConfig[]>([]);
  // TASK 3: Staggered loading state (reveals pipes 1-by-1)
  const [visibleCount, setVisibleCount] = useState(0);

  // Staggered reveal effect: 600ms delay between each pipe
  useEffect(() => {
    if (pipes.length > 0 && visibleCount < pipes.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, pipes.length]);

  useEffect(() => {
    // 1. Pick 3 random unique sizes for Green
    const greenSizes = shuffleArray(POOL_SIZES).slice(0, 3);

    // 2. Pick 3 random unique sizes for Yellow
    const yellowSizes = shuffleArray(POOL_SIZES).slice(0, 3);

    // 3. Create 6 model specs
    const greenPipes = greenSizes.map((size) => ({
      color: "green",
      size,
      url: encodeURI(`/3D Models/RAKPLUS GREEN PIPES/${size}mm.glb`),
    }));

    const yellowPipes = yellowSizes.map((size) => ({
      color: "yellow",
      size,
      url: encodeURI(`/3D Models/RAKPLUS YELLOW PIPES/${size}mm.glb`),
    }));

    // 4. Randomize colors and sizes
    const mixed = shuffleArray([...greenPipes, ...yellowPipes]);

    // 5. TASK 2: Organic slots pushing X to far left (-8.5 to -4.5) or far right (4.5 to 8.5)
    // leaving the center clear for the contact card & form
    const slots = [
      { x: randomInRange(-8.0, -5.0), y: randomInRange(2.2, 4.5) },   // Left Top
      { x: randomInRange(5.0, 8.0),   y: randomInRange(2.0, 4.5) },   // Right Top
      { x: randomInRange(-8.5, -4.8), y: randomInRange(-0.8, 1.2) },  // Left Mid
      { x: randomInRange(4.8, 8.5),   y: randomInRange(-0.8, 1.4) },  // Right Mid
      { x: randomInRange(-8.0, -4.8), y: randomInRange(-4.5, -2.0) }, // Left Bottom
      { x: randomInRange(4.8, 8.0),   y: randomInRange(-4.5, -2.0) }, // Right Bottom
    ];

    const shuffledSlots = shuffleArray(slots);

    const configs: PipeConfig[] = mixed.map((item, index) => {
      const slot = shuffledSlots[index];

      // TASK 2: Random scale multiplier between 0.55 and 1.45 (simulates zoom depth)
      const scaleMultiplier = randomInRange(0.55, 1.45);

      // Map scale to Z depth: smaller scale = deeper background, larger scale = foreground
      const z = THREE.MathUtils.lerp(-7.5, -3.2, (scaleMultiplier - 0.55) / 0.9);

      // Base scale proportional to pipe geometry
      const baseScale = item.size >= 75 ? 3.0 : item.size >= 40 ? 3.8 : 4.5;
      const finalScale = baseScale * scaleMultiplier;

      // Random speed and direction (positive or negative rotation)
      const dir = Math.random() > 0.5 ? 1 : -1;
      const speed = dir * randomInRange(0.65, 1.25);

      // Random initial horizontal angle
      const initialRotationY = Math.random() * Math.PI * 2;

      return {
        id: `${item.color}-${item.size}-${index}`,
        url: item.url,
        position: [slot.x, slot.y, z],
        scale: finalScale,
        speed,
        initialRotationY,
      };
    });

    setPipes(configs);
    // Start revealing immediately
    setVisibleCount(1);
  }, []);

  return (
    <div className="w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 11], fov: 45, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Solid white background */}
        <color attach="background" args={["#ffffff"]} />

        {/* Crisp lighting for high-contrast presentation */}
        <ambientLight intensity={1.4} />
        <directionalLight position={[10, 15, 10]} intensity={2.0} />
        <directionalLight position={[-10, -10, -5]} intensity={1.2} />
        <directionalLight position={[0, 5, 8]} intensity={1.5} />

        {/* TASK 3: Each pipe has its own Suspense boundary so previously loaded pipes don't unmount */}
        {pipes.slice(0, visibleCount).map((pipe) => (
          <Suspense key={pipe.id} fallback={null}>
            <RotatingPipe
              url={pipe.url}
              position={pipe.position}
              scale={pipe.scale}
              speed={pipe.speed}
              initialRotationY={pipe.initialRotationY}
            />
          </Suspense>
        ))}
      </Canvas>
    </div>
  );
}

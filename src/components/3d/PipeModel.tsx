"use client";

import { useGLTF, Center } from "@react-three/drei";

interface PipeModelProps {
  modelPath?: string;
  color?: string;
  category?: string;
}

// Real, on-disk asset paths (verified against /public/3D Models/…).
// The previous "/3D Models/sdr6-32g.glb" / "sdr6-32y.glb" files never
// existed, so both useGLTF.preload calls 404'd on every product page.
const GREEN_MODEL_PATH = encodeURI(
  "/3D Models/RAKPLUS GREEN PIPES/SDR6 GREEN/SDR6-32-GREEN.glb"
);
const YELLOW_MODEL_PATH = encodeURI(
  "/3D Models/RAKPLUS YELLOW PIPES/SDR6 YELLOW/SDR6-32-YELLOW.glb"
);

export default function PipeModel({ modelPath, color, category }: PipeModelProps) {
  const isYellow =
    color?.toLowerCase().includes("yellow") ||
    category?.toLowerCase().includes("yellow") ||
    modelPath?.toLowerCase().includes("32y") ||
    modelPath?.toLowerCase().includes("yellow");

  const resolvedModelPath =
    modelPath && !modelPath.includes("sdr6-25")
      ? modelPath
      : isYellow
      ? YELLOW_MODEL_PATH
      : GREEN_MODEL_PATH;

  const { scene } = useGLTF(resolvedModelPath);

  return (
    <Center>
      <primitive object={scene} rotation={[0, -Math.PI / 8, 0]} scale={8} />
    </Center>
  );
}

// Pre-warm both assets before any component mounts
useGLTF.preload(GREEN_MODEL_PATH);
useGLTF.preload(YELLOW_MODEL_PATH);

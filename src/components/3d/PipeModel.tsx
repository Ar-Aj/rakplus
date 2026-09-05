"use client";

import { useEffect } from "react";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

interface PipeModelProps {
  modelPath?: string;
}

const MODEL_PATH = encodeURI("/3D Models/sdr6-25.glb");

export default function PipeModel({ modelPath }: PipeModelProps) {
  const { scene } = useGLTF(modelPath ?? MODEL_PATH);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          const mat = mesh.material as any;
          const isGreenBody = mat && mat.name && mat.name.toLowerCase().includes("green");

          // 1. Identify text/logo by common Blender names, material names, or texture maps
          const isDecal =
            !isGreenBody &&
            (Boolean(mesh.name.toLowerCase().match(/text|logo|curve|bezier|plane|decal|black/i)) ||
              Boolean(mat && mat.name && mat.name.toLowerCase().includes("black")) ||
              Boolean(mat && mat.map !== null && mat.map !== undefined));

          if (isDecal) {
            // 2. Rescue the text: Force it to be visible and black
            if (mat) {
              mat.color = new THREE.Color("#050505");
              mat.roughness = 1.0;
              mat.needsUpdate = true;
            }
            return; // Stop processing this mesh
          }

          // 3. Apply the matte PP-R green ONLY to the remaining pipe body
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#0A5C33"),
            roughness: 0.65,
            metalness: 0.0,
            clearcoat: 0.0,
            envMapIntensity: 0.2,
          });
        }
      });
    }
  }, [scene]);

  return (
    // Drei Center guarantees a perfect geometric pivot — no Box3 drift
    <Center>
      <primitive object={scene} rotation={[0, -Math.PI / 8, 0]} />
    </Center>
  );
}

// Pre-warm the asset before any component mounts
useGLTF.preload(MODEL_PATH);

"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface PipeModelProps {
  modelPath: string;
}

export default function PipeModel({ modelPath }: PipeModelProps) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      // Preserve text/decal meshes from Blender
      const isDecal =
        mesh.name.toLowerCase().includes("text") ||
        mesh.name.toLowerCase().includes("logo") ||
        mesh.name.toLowerCase().includes("decal") ||
        mesh.name.toLowerCase().includes("label");

      if (isDecal) return;

      // Ensure MeshStandardMaterial
      if (!(mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
        mesh.material = new THREE.MeshStandardMaterial();
      }

      // Inject photorealistic deep-green PP-R polymer properties
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.color.set("#127b43");
      mat.roughness = 0.35;
      mat.metalness = 0.05;
      mat.envMapIntensity = 1.5;
      mat.needsUpdate = true;
    });
  }, [scene]);

  return <primitive object={scene} scale={1} />;
}

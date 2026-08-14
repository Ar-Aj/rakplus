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

      // Inject photorealistic deep-green PP-R polymer properties (Blender BSDF translation)
      mesh.material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0E6B3D'),
        roughness: 0.45,
        metalness: 0.0,
        ior: 1.46,
        clearcoat: 0.1,
        clearcoatRoughness: 0.4,
        envMapIntensity: 0.7
      });
      mesh.material.needsUpdate = true;
    });
  }, [scene]);

  return <primitive object={scene} scale={1} />;
}

"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface PipeModelProps {
  modelPath: string;
}

export default function PipeModel({ modelPath }: PipeModelProps) {
  const { scene } = useGLTF(modelPath);

  // ── Procedural Noise Bump Map (Blender Noise Texture → Bump node translation) ──
  const bumpMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    if (context) {
      for (let x = 0; x < 256; x++) {
        for (let y = 0; y < 256; y++) {
          const val = Math.floor(Math.random() * 255);
          context.fillStyle = `rgb(${val},${val},${val})`;
          context.fillRect(x, y, 1, 1);
        }
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  }, []);

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

      // Restored true Blender hex + procedural noise bump for matte plastic surface
      mesh.material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#074526"),
        roughness: 0.95,
        metalness: 0.0,
        ior: 1.46,
        bumpMap: bumpMap,
        bumpScale: 0.002,
        clearcoat: 0,
        clearcoatRoughness: 0.5,
        envMapIntensity: 0.0,
      });
      mesh.material.needsUpdate = true;
    });
  }, [scene, bumpMap]);

  return <primitive object={scene} scale={1} rotation={[0, -Math.PI / 6, 0]} />;
}

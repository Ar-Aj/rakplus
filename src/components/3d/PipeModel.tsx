"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface PipeModelProps {
  modelPath: string;
}

export default function PipeModel({ modelPath }: PipeModelProps) {
  const { scene } = useGLTF(modelPath);

  // ── Procedural 512×512 Noise Texture (Blender Noise Texture → Bump node) ──
  const noiseTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      for (let x = 0; x < 512; x++) {
        for (let y = 0; y < 512; y++) {
          const val = Math.floor(Math.random() * 255);
          ctx.fillStyle = `rgb(${val},${val},${val})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 8);
    return tex;
  }, []);

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      const name = mesh.name.toLowerCase();
      const mat = mesh.material as THREE.MeshStandardMaterial;

      // ── Decal / Text / Logo meshes ──
      // Detect by name OR by transparent material flag (how Blender exports decals)
      const isDecal =
        name.includes("text") ||
        name.includes("logo") ||
        name.includes("curve") ||
        name.includes("decal") ||
        name.includes("label") ||
        (mat && mat.transparent === true);

      if (isDecal) {
        // FIX A: More aggressive relative scale — closes the physical geometry gap
        mesh.scale.x *= 0.985;
        mesh.scale.z *= 0.985;

        // FIX B: Replace material with exact Blender node translation + alphaTest
        // alphaTest=0.5 discards transparent pixels so they stop catching white reflections
        if (mesh.material) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            map: mat?.map || null,
            color: mat?.color || new THREE.Color("#ffffff"),
            transparent: true,
            alphaTest: 0.5,
            roughness: 0.500,
            metalness: 0.000,
            ior: 1.500,
            depthWrite: false,
          });
          mesh.material.needsUpdate = true;
        }
      } else {
        // ── Main pipe body — exact Blender BSDF node values ──
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#0A5C33"),
          roughness: 0.450,
          metalness: 0.000,
          ior: 1.460,
          bumpMap: noiseTexture,
          bumpScale: 0.023,
          envMapIntensity: 0.4,
          clearcoat: 0.0,
        });
        mesh.material.needsUpdate = true;
      }
    });
  }, [scene, noiseTexture]);

  return <primitive object={scene} scale={1} rotation={[0, -Math.PI / 6, 0]} />;
}

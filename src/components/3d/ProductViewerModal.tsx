"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Environment } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { ChevronDown } from "lucide-react";
import PipeModel from "./PipeModel";

// ─── Size entry passed from the table row ─────────────────────────────────────
export interface PipeSize {
  /** Display label, e.g. "20mm" */
  label: string;
  /** Fully resolved encoded GLB path */
  modelPath: string;
}

// ─── Dynamic camera limits by pipe diameter ────────────────────────────────────
// Parses the numeric mm from labels like "20mm", "110mm", etc.
// minDistance rises aggressively with diameter to prevent camera clipping
// through thick pipe walls on larger sizes.
function getCameraLimits(label: string): {
  minDistance: number;
  maxDistance: number;
  cameraZ: number;
} {
  const mm = parseInt(label, 10);
  if (!isNaN(mm) && mm >= 110) return { minDistance: 13.5, maxDistance: 22, cameraZ: 15.0 }; // 110mm+ Massive
  if (!isNaN(mm) && mm >= 90)  return { minDistance: 11.0, maxDistance: 18, cameraZ: 12.0 }; // 90mm Extra Large
  if (!isNaN(mm) && mm >= 63)  return { minDistance:  8.5, maxDistance: 15, cameraZ:  9.5 }; // 63–75mm Large
  if (!isNaN(mm) && mm >= 40)  return { minDistance:  6.5, maxDistance: 12, cameraZ:  7.5 }; // 40–50mm Medium
  if (!isNaN(mm) && mm >= 32)  return { minDistance:  4.8, maxDistance: 10, cameraZ:  5.5 }; // 32mm Small
  // 20–25mm Extra Small (or unknown label) → tightest zoom-in allowed
  return                              { minDistance:  3.5, maxDistance:  8, cameraZ:  4.0 };
}

interface ProductViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** The model to show when no sizes array is given (legacy / hero trigger) */
  modelPath: string;
  /** All sizes available for this PN class (from the table rows) */
  sizes?: PipeSize[];
  /** Which size was clicked — becomes the active default */
  initialSize?: string;
}

export default function ProductViewerModal({
  isOpen,
  onClose,
  modelPath,
  sizes,
  initialSize,
}: ProductViewerModalProps) {
  // ── Active model state ─────────────────────────────────────────────────────
  const hasMultipleSizes = sizes && sizes.length > 0;

  const [activeModelPath, setActiveModelPath] = useState<string>(() => {
    if (hasMultipleSizes && initialSize) {
      const match = sizes!.find((s) => s.label === initialSize);
      return match ? match.modelPath : sizes![0].modelPath;
    }
    return modelPath;
  });

  const [activeLabel, setActiveLabel] = useState<string>(() => {
    if (hasMultipleSizes && initialSize) return initialSize;
    if (hasMultipleSizes && sizes!.length > 0) return sizes![0].label;
    return "";
  });

  const [selectorOpen, setSelectorOpen] = useState(false);

  // Reset active model when the modal opens fresh with a new initialSize
  useEffect(() => {
    if (!isOpen) return;
    if (hasMultipleSizes && initialSize) {
      const match = sizes!.find((s) => s.label === initialSize);
      if (match) {
        setActiveModelPath(match.modelPath);
        setActiveLabel(match.label);
      }
    } else {
      setActiveModelPath(modelPath);
    }
    setSelectorOpen(false);
  }, [isOpen, initialSize, modelPath]); // eslint-disable-line react-hooks/exhaustive-deps

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* ── Close button ── */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 sm:top-12 sm:right-12 z-50 text-neutral-950 text-sm font-sans font-bold tracking-widest uppercase hover:text-emerald-600 transition-colors flex items-center gap-2 cursor-pointer"
      >
        <span>CLOSE</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* ── Size Selector Panel — floating top-left ── */}
      {hasMultipleSizes && (
        <div className="absolute top-6 left-6 z-50 select-none">
          {/* Dropdown trigger */}
          <button
            onClick={() => setSelectorOpen((o) => !o)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-neutral-200/80 shadow-lg hover:border-neutral-300 transition-all duration-150"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              Size
            </span>
            <span className="text-sm font-bold text-neutral-950 tabular-nums min-w-[40px]">
              {activeLabel}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${selectorOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown list */}
          {selectorOpen && (
            <div className="mt-1.5 w-full min-w-[140px] rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200 shadow-2xl overflow-hidden">
              {sizes!.map((s) => (
                <button
                  key={s.label}
                  onClick={() => {
                    setActiveModelPath(s.modelPath);
                    setActiveLabel(s.label);
                    setSelectorOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors duration-100 tabular-nums
                    ${s.label === activeLabel
                      ? "bg-emerald-50 text-emerald-700 font-bold"
                      : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                >
                  <span>{s.label}</span>
                  {s.label === activeLabel && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Canvas ── */}
      <div className="w-full h-full">
        {/* Key Canvas on activeLabel so camera position resets when size changes */}
        <Canvas
          key={activeLabel}
          camera={{ fov: 45, near: 0.01, far: 100, position: [0, 0, getCameraLimits(activeLabel).cameraZ] }}
          dpr={[1, 2]}
          gl={{ toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 0.85 }}
        >
          <color attach="background" args={["#ffffff"]} />

          <Suspense fallback={null}>
            <Environment files={encodeURI("/3D Models/studio_small_08_4k.hdr")} background={false} environmentIntensity={0.6} />
            <directionalLight position={[0, 0, 5]} intensity={1.2} />
            <ambientLight intensity={0.8} />
            <Center rotation={[0, -Math.PI / 5, 0]}>
              {/* Key: forces R3F to unmount + remount PipeModel on path change,
                  which triggers a fresh useGLTF load for the new size GLB */}
              <PipeModel key={activeModelPath} modelPath={activeModelPath} />
            </Center>
          </Suspense>

          <OrbitControls
            makeDefault
            target={[0, 0, 0]}
            enablePan={false}
            enableZoom
            enableDamping
            dampingFactor={0.05}
            autoRotate={false}
            minDistance={getCameraLimits(activeLabel).minDistance}
            maxDistance={getCameraLimits(activeLabel).maxDistance}
            minPolarAngle={THREE.MathUtils.degToRad(55)}
            maxPolarAngle={THREE.MathUtils.degToRad(125)}
            zoomSpeed={0.7}
          />
        </Canvas>
      </div>
    </div>
  );
}

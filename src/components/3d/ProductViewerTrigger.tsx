"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Box } from "lucide-react";
import type { PipeSize } from "./ProductViewerModal";

const ProductViewerModal = dynamic(() => import("./ProductViewerModal"), {
  ssr: false,
});

interface ProductViewerTriggerProps {
  modelPath: string;
  /** All sizes for this PN class — passed through to the modal dropdown */
  sizes?: PipeSize[];
  /** The size to pre-select when opening from the hero */
  initialSize?: string;
  /** Drives button color — true for Yellow/Beige product series */
  isYellow?: boolean;
  /** Explicit colorTheme prop: 'green' | 'yellow' */
  colorTheme?: "green" | "yellow";
}

export default function ProductViewerTrigger({
  modelPath,
  sizes,
  initialSize,
  isYellow = false,
  colorTheme,
}: ProductViewerTriggerProps) {
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);

  const isYellowTheme = colorTheme === "yellow" || isYellow;
  const buttonTheme = isYellowTheme
    ? "border border-yellow-400/40 shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:bg-yellow-400/10"
    : "border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-500/10";

  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <button
          onClick={() => setIs3DModalOpen(true)}
          className={`group relative z-10 overflow-hidden bg-black/20 backdrop-blur-md text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 hover:scale-105 ${buttonTheme}`}
        >
          <Box className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          <span>OPEN 3D VIEWER</span>
        </button>
      </div>

      <ProductViewerModal
        isOpen={is3DModalOpen}
        onClose={() => setIs3DModalOpen(false)}
        modelPath={modelPath}
        sizes={sizes}
        initialSize={initialSize}
        colorTheme={isYellowTheme ? "yellow" : "green"}
        isYellow={isYellowTheme}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Box } from "lucide-react";
import type { PipeSize } from "./ProductViewerModal";

const ProductViewerModal = dynamic(() => import("./ProductViewerModal"), {
  ssr: false,
});

interface TableRowViewerProps {
  modelPath: string;
  sizeLabel: string;
  allSizes: PipeSize[];
  /** True for Yellow/Beige PP-R products — drives button color */
  isYellow?: boolean;
  /** Explicit colorTheme prop: 'green' | 'yellow' */
  colorTheme?: "green" | "yellow";
}

export default function TableRowViewer({
  modelPath,
  sizeLabel,
  allSizes,
  isYellow = false,
  colorTheme,
}: TableRowViewerProps) {
  const [open, setOpen] = useState(false);

  const isYellowTheme = colorTheme === "yellow" || isYellow;
  const btnClass = isYellowTheme
    ? "bg-yellow-500 hover:bg-yellow-600 text-black shadow-md shadow-yellow-200/60"
    : "bg-[#008c4a] hover:bg-[#006e3a] text-white shadow-md shadow-emerald-200/60";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title={`View 3D Model — ${sizeLabel}`}
        className={`
          inline-flex items-center justify-center gap-2
          px-4 py-2
          rounded-full
          text-sm font-bold tracking-wide
          whitespace-nowrap
          hover:scale-105 active:scale-95
          transition-all duration-150
          group
          ${btnClass}
        `}
      >
        <Box className="w-4 h-4 flex-shrink-0 group-hover:rotate-12 transition-transform duration-200" />
        <span>View 3D Model</span>
      </button>

      <ProductViewerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        modelPath={modelPath}
        sizes={allSizes}
        initialSize={sizeLabel}
        colorTheme={isYellowTheme ? "yellow" : "green"}
        isYellow={isYellowTheme}
      />
    </>
  );
}

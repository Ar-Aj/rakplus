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
}

export default function TableRowViewer({
  modelPath,
  sizeLabel,
  allSizes,
  isYellow = false,
}: TableRowViewerProps) {
  const [open, setOpen] = useState(false);

  const btnClass = isYellow
    ? // Yellow/Beige — bright amber-yellow, dark text
      "bg-amber-400 hover:bg-amber-500 text-neutral-900 border border-amber-500 shadow-md shadow-amber-200/60"
    : // Green — deep emerald, white text
      "bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-700 shadow-md shadow-emerald-200/60";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title={`View 3D Model — ${sizeLabel}`}
        className={`
          inline-flex items-center gap-2
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
      />
    </>
  );
}

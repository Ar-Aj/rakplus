"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Box } from "lucide-react";

const ProductViewerModal = dynamic(() => import("./ProductViewerModal"), {
  ssr: false,
});

interface ProductViewerTriggerProps {
  modelPath: string;
}

export default function ProductViewerTrigger({ modelPath }: ProductViewerTriggerProps) {
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);

  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <button
          onClick={() => setIs3DModalOpen(true)}
          className="group relative z-10 overflow-hidden inline-flex items-center gap-3 px-9 py-4 bg-emerald-600 text-white text-base font-bold rounded-full shadow-[0_8px_30px_rgba(5,150,105,0.35)] hover:scale-105 transition-transform duration-300"
        >
          <Box className="w-5 h-5" />
          <span>OPEN 3D VIEWER</span>
        </button>
      </div>

      <ProductViewerModal
        isOpen={is3DModalOpen}
        onClose={() => setIs3DModalOpen(false)}
        modelPath={modelPath}
      />
    </>
  );
}

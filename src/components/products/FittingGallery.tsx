"use client";

import { useState } from "react";
import Image from "next/image";
import { PackageOpen } from "lucide-react";
import type { FittingItem } from "@/types/product";
import FittingModal from "./FittingModal";
import { ArrowRight } from "lucide-react";

interface FittingGalleryProps {
  fittingItems: FittingItem[];
  accent: {
    text: string;
    bg: string;
    border: string;
    badge: string;
  };
}

export default function FittingGallery({ fittingItems, accent }: FittingGalleryProps) {
  const [selectedFitting, setSelectedFitting] = useState<FittingItem | null>(null);

  if (!fittingItems || fittingItems.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {fittingItems.map((fitting, index) => (
          <div 
            key={index}
            className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-brand-charcoal/5 hover:border-gray-300 transition-all duration-300 cursor-pointer flex-grow"
            onClick={() => setSelectedFitting(fitting)}
          >
            {/* Image Container */}
            <div className="relative aspect-square w-full bg-bg-cream overflow-hidden flex items-center justify-center">
              {fitting.coverImage && fitting.coverImage !== "null" ? (
                <Image 
                  src={fitting.coverImage} 
                  alt={fitting.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <PackageOpen className="w-16 h-16 text-gray-300 group-hover:scale-110 transition-transform duration-500 ease-out" strokeWidth={1.5} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex px-2 py-1 text-[10px] font-bold tracking-[0.15em] uppercase rounded-md border ${accent.badge}`}>
                  {fitting.standard}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-brand-charcoal tracking-tight font-sans mb-4 group-hover:text-brand-green transition-colors duration-200">
                {fitting.name}
              </h3>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-950">View Details</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 group-hover:${accent.bg} transition-colors duration-300`}>
                  <ArrowRight className={`w-4 h-4 text-neutral-950 group-hover:${accent.text} transition-colors duration-300 group-hover:translate-x-0.5`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FittingModal 
        isOpen={!!selectedFitting}
        onClose={() => setSelectedFitting(null)}
        fitting={selectedFitting}
      />
    </>
  );
}

"use client";

import { X, PackageOpen } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import type { FittingItem } from "@/types/product";

interface FittingModalProps {
  isOpen: boolean;
  onClose: () => void;
  fitting: FittingItem | null;
}

export default function FittingModal({ isOpen, onClose, fitting }: FittingModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !fitting) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      data-lenis-prevent="true"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col transform transition-all">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 sm:p-8 border-b border-gray-100 bg-bg-cream">
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center">
              {fitting.coverImage && fitting.coverImage !== "null" ? (
                <Image 
                  src={fitting.coverImage} 
                  alt={fitting.name} 
                  fill 
                  className="object-cover" 
                />
              ) : (
                <PackageOpen className="w-8 h-8 text-gray-300" strokeWidth={1.5} />
              )}
            </div>
            <div>
              <div className="inline-flex px-2 py-1 mb-2 text-[10px] font-bold tracking-[0.15em] text-brand-green bg-brand-green/10 uppercase rounded-md border border-brand-green/20">
                {fitting.standard}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-charcoal tracking-tight font-sans">
                {fitting.name}
              </h3>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-neutral-950 hover:bg-gray-50 hover:scale-105 transition-all duration-200 shadow-sm"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Specifications Table - Scrollable Body */}
        <div 
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-white p-6 sm:p-8"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-brand-charcoal text-white">
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap">
                      PART NO
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap">
                      DIMENSION
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap">
                      PACKING UNIT
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap">
                      PCS/PACKET
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap">
                      PCS/BOX
                    </th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {fitting.specifications.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-100 last:border-b-0 hover:bg-brand-green/5 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-bg-cream/50"}`}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-brand-charcoal whitespace-nowrap">
                        {row.partNumber}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-brand-charcoal whitespace-nowrap">
                        {row.dimension}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-950 whitespace-nowrap">
                        {row.packingUnit}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-950 whitespace-nowrap">
                        {row.piecesPerPack !== null && row.piecesPerPack !== undefined ? row.piecesPerPack : "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-950 whitespace-nowrap">
                        {row.piecesPerBox !== undefined ? row.piecesPerBox : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import TableRowViewer from "@/components/3d/TableRowViewer";
import type { DimensionalRow } from "@/types/product";
import type { PipeSize } from "@/components/3d/ProductViewerModal";

export interface ProductTableProps {
  dimensionalTable: DimensionalRow[];
  /** Color theme based on the product line: 'green' | 'yellow' */
  colorTheme?: "green" | "yellow";
  /** Fallback boolean for Yellow/Beige products */
  isYellow?: boolean;
  hasSizeModels?: boolean;
  allSizes?: PipeSize[];
  accent?: {
    text: string;
    bg?: string;
    border?: string;
    badge?: string;
  };
}

export default function ProductTable({
  dimensionalTable,
  colorTheme = "green",
  isYellow = false,
  hasSizeModels = false,
  allSizes = [],
  accent,
}: ProductTableProps) {
  const isYellowTheme = colorTheme === "yellow" || isYellow;
  const resolvedColorTheme: "green" | "yellow" = isYellowTheme ? "yellow" : "green";
  const hasWaterContent =
    dimensionalTable?.some(
      (r) => r.waterContent !== undefined && r.waterContent !== "N/A"
    ) ?? false;

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-center align-middle">
          <thead>
            <tr className="bg-brand-charcoal text-white">
              {/* View 3D column — only when size-specific models exist */}
              {hasSizeModels && (
                <th
                  scope="col"
                  className="px-5 py-5 text-sm font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap w-36 text-center align-middle"
                >
                  3D Model
                </th>
              )}
              <th
                scope="col"
                className="px-5 py-5 text-sm font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap text-center align-middle"
              >
                PART
              </th>
              <th
                scope="col"
                className="px-5 py-5 text-sm font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap text-center align-middle"
              >
                DIMENSIONS (mm)
              </th>
              <th
                scope="col"
                className="px-5 py-5 text-sm font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap text-center align-middle"
              >
                WALL THICKNESS (mm)
              </th>
              <th
                scope="col"
                className="px-5 py-5 text-sm font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap text-center align-middle"
              >
                INNER DIAMETER (mm)
              </th>
              {hasWaterContent && (
                <th
                  scope="col"
                  className="px-5 py-5 text-sm font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap text-center align-middle"
                >
                  WATER CONTENT (l/mtr)
                </th>
              )}
              <th
                scope="col"
                className="px-5 py-5 text-sm font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap text-center align-middle"
              >
                PACKING UNIT
              </th>
              <th
                scope="col"
                className="px-5 py-5 text-sm font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap text-center align-middle"
              >
                Kg/Mtr.
              </th>
            </tr>
          </thead>
          <tbody className="tabular-nums divide-y divide-gray-100">
            {dimensionalTable.map((row, index) => {
              const sizeLabel = `${row.dimension}mm`;
              const rowModelPath = hasSizeModels
                ? allSizes.find((s) => s.label === sizeLabel)?.modelPath
                : undefined;
              return (
                <tr
                  key={index}
                  className={`transition-colors duration-150 ${
                    isYellowTheme
                      ? "hover:bg-yellow-500/10"
                      : "hover:bg-brand-green/5"
                  } ${index % 2 === 0 ? "bg-white" : "bg-bg-cream/50"}`}
                >
                  {/* View 3D cell */}
                  {hasSizeModels && (
                    <td className="px-5 py-4 text-center align-middle">
                      {rowModelPath ? (
                        <div className="flex justify-center items-center">
                          <TableRowViewer
                            modelPath={rowModelPath}
                            sizeLabel={sizeLabel}
                            allSizes={allSizes}
                            colorTheme={resolvedColorTheme}
                            isYellow={isYellowTheme}
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-neutral-300">—</span>
                      )}
                    </td>
                  )}
                  <td className="px-5 py-4 text-base font-medium text-brand-charcoal whitespace-nowrap text-center align-middle">
                    {row.part}
                  </td>
                  <td className="px-5 py-4 text-base font-medium text-brand-charcoal whitespace-nowrap text-center align-middle">
                    <span
                      className={`font-semibold ${
                        accent?.text ||
                        (isYellowTheme ? "text-yellow-600" : "text-[#008c4a]")
                      }`}
                    >
                      ⌀
                    </span>{" "}
                    {row.dimension}
                  </td>
                  <td className="px-5 py-4 text-base text-neutral-700 whitespace-nowrap text-center align-middle">
                    {row.wallThickness}
                  </td>
                  <td className="px-5 py-4 text-base text-neutral-700 whitespace-nowrap text-center align-middle">
                    {row.innerDiameter}
                  </td>
                  {hasWaterContent && (
                    <td className="px-5 py-4 text-base text-neutral-700 whitespace-nowrap text-center align-middle">
                      {row.waterContent}
                    </td>
                  )}
                  <td className="px-5 py-4 text-base text-neutral-700 whitespace-nowrap text-center align-middle">
                    {row.packingUnit}
                  </td>
                  <td className="px-5 py-4 text-base text-neutral-700 whitespace-nowrap text-center align-middle">
                    {row.weight}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-neutral-400 tracking-wide text-center sm:text-left">
          {dimensionalTable.length} size{dimensionalTable.length !== 1 ? "s" : ""} available · Data sourced from RAKPLUS product catalog
        </p>
      </div>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { DOMESTIC_TICKERS, OVERSEAS_TICKERS } from "@/constants/stockTickers";
import { useRef, useMemo, useEffect } from "react";
import { StockData } from "@/types/stock";
import { motion } from "framer-motion";
import StockChart from "../stock/StockChart";
import { useStockData } from "@/hooks/useStockData";
import { useDraggable } from "@/hooks/useDraggable";

interface FinancialAssetHeaderProps {
  initialData: StockData[];
}

export default function FinancialAssetHeader({
  initialData,
}: FinancialAssetHeaderProps) {
  const searchParams = useSearchParams();
  const market = searchParams.get("market") || "all";
  const { stocks: stockData, isLoading, isError } = useStockData(initialData);
  const containerRef = useRef<HTMLDivElement>(null);

  // 드래그 로직을 커스텀 훅으로 분리
  const { isDragging, handleMouseDown, handleMouseUp, handleMouseMove } =
    useDraggable(containerRef);

  // 필터링 로직을 useMemo로 최적화
  const filteredStocks = useMemo(() => {
    if (!Array.isArray(stockData)) return [];

    return stockData.filter((stock): stock is StockData => {
      if (!stock || !Array.isArray(stock.results) || stock.status === "ERROR") {
        return false;
      }

      if (market === "overseas") {
        return OVERSEAS_TICKERS.includes(stock.ticker);
      }
      if (market === "domestic") {
        return DOMESTIC_TICKERS.includes(stock.ticker);
      }
      return true;
    });
  }, [stockData, market]);

  useEffect(() => {
    console.log("Stock Data:", stockData);
    console.log("Loading:", isLoading);
    console.log("Error:", isError);
  }, [stockData, isLoading, isError]);

  if (isError) {
    return (
      <div className="text-red-500 text-center py-4">
        데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-screen-xl mx-auto overflow-hidden px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={containerRef}
        className={`
          flex gap-4 overflow-x-auto scrollbar-hide
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
          transition-all duration-200
        `}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {isLoading
          ? // 로딩 스켈레톤 UI 추가
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="min-w-[calc(33.333% - 1rem)] h-48 bg-neutral-800 rounded-xl animate-pulse"
              />
            ))
          : filteredStocks.map((stock: StockData, index: number) => (
              <motion.div
                key={stock.ticker}
                className="min-w-[calc(33.333% - 1rem)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StockChart
                  stocks={[stock]}
                  isLoading={isLoading}
                  market={market}
                />
              </motion.div>
            ))}
      </div>
    </motion.div>
  );
}

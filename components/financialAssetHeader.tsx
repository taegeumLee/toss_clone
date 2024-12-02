"use client";

import { useSearchParams } from "next/navigation";
import { DOMESTIC_TICKERS, OVERSEAS_TICKERS } from "@/constants/stockTickers";
import { useEffect, useState, useRef } from "react";
import { StockData } from "@/types/stock";
import { motion } from "framer-motion";
import StockChart from "./StockChart";

export default function FinancialAssetHeader() {
  const searchParams = useSearchParams();
  const market = searchParams.get("market") || "all";
  const [stockData, setStockData] = useState<{
    overseas: StockData[];
    domestic: StockData[];
  }>({ overseas: [], domestic: [] });
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      try {
        const tickers =
          market === "overseas"
            ? OVERSEAS_TICKERS
            : market === "domestic"
            ? DOMESTIC_TICKERS
            : [...DOMESTIC_TICKERS, ...OVERSEAS_TICKERS];

        const response = await fetch(
          `/api/stock/getStocks?tickers=${tickers.join(",")}`
        );
        const data = await response.json();

        // 유효한 데이터만 필터링
        const validData = data.filter(
          (item: StockData) =>
            item &&
            item.results &&
            item.results.length > 0 &&
            item.status !== "ERROR"
        );

        setStockData({
          overseas: validData.slice(0, OVERSEAS_TICKERS.length),
          domestic: validData.slice(OVERSEAS_TICKERS.length),
        });
      } catch (error) {
        console.error("주식 데이터 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, [market]);

  const stocksToShow = (
    market === "overseas"
      ? stockData.overseas
      : market === "domestic"
      ? stockData.domestic
      : [...stockData.domestic, ...stockData.overseas]
  ).filter(
    (stock) =>
      stock &&
      stock.results &&
      stock.results.length > 0 &&
      stock.status !== "ERROR"
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (!containerRef.current) return;

    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <motion.div
      className="max-w-screen-xl mx-auto overflow-hidden px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {stocksToShow.map((stock, index) => (
          <motion.div
            key={`${stock.ticker}-${index}`}
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

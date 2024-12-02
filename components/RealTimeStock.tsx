"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RealTimeStockTable from "./RealTimeStockTable";
import { RealTimeStockData } from "@/types/stock";
import { DOMESTIC_TICKERS, OVERSEAS_TICKERS } from "@/constants/stockTickers";

const categories = [
  { id: "토스증권 거래대금", param: "toss_trading_amount" },
  { id: "토스증권 거래량", param: "toss_trading_volume" },
  { id: "거래량", param: "trading_volume" },
  { id: "급상승", param: "rapid_increase" },
  { id: "급하락", param: "rapid_decrease" },
  { id: "인기", param: "popular" },
];

export default function RealTimeStock() {
  const [time, setTime] = useState(new Date());
  const [stocks, setStocks] = useState<RealTimeStockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const market = searchParams.get("market") || "all";

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id
  );

  const router = useRouter();

  useEffect(() => {
    const fetchStocks = async () => {
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

        // 거래대금 기준으로 정렬하고 순위 추가
        if (data) {
          const sortedData = data
            .filter((stock: RealTimeStockData) => stock.status !== "ERROR")
            .map((stock: RealTimeStockData) => ({
              ...stock,
              tradingAmount:
                stock.results[stock.results.length - 1].v *
                stock.results[stock.results.length - 1].vw,
            }))
            .sort(
              (a: RealTimeStockData, b: RealTimeStockData) =>
                b.tradingAmount - a.tradingAmount
            )
            .map((stock: RealTimeStockData, index: number) => ({
              ...stock,
              rank: index + 1,
            }));

          setStocks(sortedData);
        }
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, [market, selectedCategory]);

  const handleCategoryClick = (category: string, param: string) => {
    setSelectedCategory(category);
    router.push(`?market=${market}&real_time_chart=${param}`);
  };

  return (
    <motion.div className="relative max-w-screen-xl mx-auto flex flex-col px-8 mt-12">
      <div className="flex gap-3 items-center">
        <span className="text-2xl font-bold text-neutral-200">실시간 주식</span>
        <span className="text-sm text-gray-500">
          {`${
            time.getMonth() + 1
          }월 ${time.getDate()}일 ${time.getHours()}:${time.getMinutes()} 기준`}
        </span>
      </div>
      <div className="w-full flex flex-row gap-5 *:text-lg *:cursor-pointer mt-5">
        {categories.map((category) => (
          <div key={category.id} className="relative">
            <span
              className={`${
                selectedCategory === category.id
                  ? "font-bold text-neutral-200"
                  : "text-white/50"
              }`}
              onClick={() => handleCategoryClick(category.id, category.param)}
            >
              {category.id}
            </span>
            {selectedCategory === category.id && (
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-neutral-200 rounded-full"
                layoutId="underline"
              />
            )}
          </div>
        ))}
      </div>
      <div className="absolute -bottom-1 left-8 right-8 h-[1px] bg-white/40" />
      <RealTimeStockTable stocks={stocks} isLoading={isLoading} />
    </motion.div>
  );
}

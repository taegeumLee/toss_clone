"use client";

import { useState } from "react";
import { StockData } from "@/types/stock";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { COMPANY_NAMES } from "@/constants/stockTickers";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface StockChartItemProps {
  stock: StockData;
  market: string;
}

export default function StockChartItem({ stock, market }: StockChartItemProps) {
  const router = useRouter();

  if (!stock?.results?.length) {
    return null;
  }

  const monthlyData = stock.results.slice(-30);
  const lastPrice = monthlyData[monthlyData.length - 1].c;
  const firstPrice = monthlyData[0].c;
  const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;
  const currentPrice = lastPrice.toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
  });

  const priceDisplay =
    market === "domestic" ? `${currentPrice}원` : `$${currentPrice}`;
  const companyName = COMPANY_NAMES[stock.ticker] || stock.ticker;

  const handleClick = () => {
    router.push(`/stock/${stock.ticker}`, { scroll: false });
  };

  return (
    <div
      className="bg-neutral-800 p-3 rounded-xl mt-6 cursor-pointer hover:bg-neutral-700 transition-colors"
      onClick={handleClick}
    >
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-white">{stock.ticker}</span>
            <span className="text-sm text-white/50">{companyName}</span>
            <span
              className={`text-sm ${
                priceChange >= 0 ? "text-red-500" : "text-blue-500"
              }`}
            >
              {priceChange >= 0 ? "+" : ""}
              {priceChange.toFixed(2)}%
            </span>
          </div>
          <span className="text-base">{priceDisplay}</span>
        </div>
        <div className="w-full h-24">
          <Chart
            options={{
              chart: {
                type: "line",
                toolbar: { show: false },
                sparkline: { enabled: true },
                background: "transparent",
                animations: { enabled: false },
              },
              stroke: {
                curve: "smooth",
                width: 2,
                colors: [priceChange >= 0 ? "#ef4444" : "#3b82f6"],
              },
              tooltip: { enabled: false },
              grid: {
                show: true,
                strokeDashArray: 4,
                xaxis: { lines: { show: false } },
                yaxis: { lines: { show: false } },
                padding: { bottom: 0 },
              },
              xaxis: { labels: { show: false } },
              yaxis: {
                labels: { show: false },
                min: Math.min(...monthlyData.map((d) => d.c)) * 0.999,
                max: Math.max(...monthlyData.map((d) => d.c)) * 1.001,
              },
              theme: { mode: "dark" },
            }}
            series={[
              {
                name: "Price",
                data: monthlyData.map((result) => result.c),
              },
            ]}
            type="line"
            height={96}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

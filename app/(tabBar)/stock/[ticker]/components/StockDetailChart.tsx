"use client";

import { StockData } from "@/types/stock";
import dynamic from "next/dynamic";
import { useState, useMemo, useCallback } from "react";
import debounce from "lodash";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-neutral-800 animate-pulse rounded" />
  ),
});

interface StockDetailChartProps {
  data: StockData;
}

export default function StockDetailChart({ data }: StockDetailChartProps) {
  const [timeframe, setTimeframe] = useState("1D");

  const chartData = useMemo(
    () =>
      data.results.map((result) => ({
        x: new Date(result.t),
        y: [result.o, result.h, result.l, result.c],
      })),
    [data.results]
  );

  const handleTimeframeChange = useCallback((newTimeframe: string) => {
    setTimeframe(newTimeframe);
  }, []);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "candlestick" as const,
        height: 500,
        background: "transparent",

        toolbar: { show: false },
        animations: {
          enabled: false,
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#3b82f6", // blue-500
            downward: "#ef4444", // red-500
          },
        },
      },
      stroke: {
        curve: "smooth" as const,
        width: 1,
      },
      xaxis: {
        type: "datetime" as const,
        labels: {
          style: {
            colors: "#9ca3af",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#9ca3af",
          },
        },
      },
      grid: {
        borderColor: "#374151",
      },
      theme: {
        mode: "dark" as const,
      },
    }),
    []
  );

  return (
    <div className="bg-neutral-900 p-4 rounded-lg">
      <div className="flex gap-2 mb-4">
        {["1D", "1W", "1M", "3M", "1Y"].map((tf) => (
          <button
            key={tf}
            className={`px-3 py-1 rounded ${
              timeframe === tf
                ? "bg-blue-600 text-white"
                : "bg-neutral-800 text-neutral-400"
            }`}
            onClick={() => handleTimeframeChange(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      <Chart
        options={chartOptions}
        series={[{ data: chartData }]}
        type="candlestick"
        height={500}
      />
    </div>
  );
}

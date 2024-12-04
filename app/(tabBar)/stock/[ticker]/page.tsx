"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StockData } from "@/types/stock";
import { COMPANY_NAMES } from "@/constants/stockTickers";
import StockDetailChart from "./components/StockDetailChart";
import StockInfo from "./components/StockInfo";
import StockOrderBook from "./components/StockOrderBook";
import LoadingSkeleton from "./components/LoadingSkeleton";

export default function StockDetailPage() {
  const { ticker } = useParams();
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`/api/stock/${ticker}`);
        if (!response.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다");
        }
        const data = await response.json();
        setStockData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했습니다");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, [ticker]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !stockData) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{ticker as string}</h1>
          <span className="text-neutral-500">
            {COMPANY_NAMES[ticker as string]}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StockDetailChart data={stockData} />
          </div>
          <div>
            <StockInfo data={stockData} />
            <StockOrderBook ticker={ticker as string} />
          </div>
        </div>
      </div>
    </div>
  );
}

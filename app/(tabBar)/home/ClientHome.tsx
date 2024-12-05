"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { StockData } from "@/types/stock";
import FinancialAssetHeader from "@/components/layout/financialAssetHeader";
import RealTimeStock from "@/components/stock/RealTimeStockTable/RealTimeStock";
import LoadingSkeleton from "./components/LoadingSkeleton";
import NewsList from "@/components/news/news";

interface ClientHomeProps {
  initialData: StockData[];
}

export default function ClientHome({ initialData }: ClientHomeProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }); // 최소 로딩 시간 설정

    return () => clearTimeout(timer);
  }, [initialData]);

  return (
    <div className="relative">
      {/* 스켈레톤 UI */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <LoadingSkeleton />
      </div>

      {/* 실제 컨텐츠 */}
      <div
        className={`relative transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Suspense fallback={<LoadingSkeleton />}>
          <FinancialAssetHeader initialData={initialData} />
          <NewsList />
          <RealTimeStock initialData={initialData} />
        </Suspense>
      </div>
    </div>
  );
}

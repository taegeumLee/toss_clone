"use client"; // 클라이언트 측에서 실행되는 컴포넌트임을 명시

import { motion } from "framer-motion"; // 애니메이션 효과를 위한 모듈
import { useState, useMemo } from "react"; // React 훅
import { useSearchParams } from "next/navigation"; // URL 검색 매개변수 사용을 위한 훅
import RealTimeStockTable from "./RealTimeStockTable"; // 주식 테이블 컴포넌트
import { RealTimeStockData, StockData } from "@/types/stock"; // 주식 데이터 타입
import { DOMESTIC_TICKERS, OVERSEAS_TICKERS } from "@/constants/stockTickers"; // 주식 티커 상수
import { useStockData } from "@/hooks/useStockData"; // 주식 데이터 로딩 훅
import ErrorMessage from "./ErrorMessage"; // 에러 메시지 컴포넌트

interface RealTimeStockProps {
  initialData: StockData[]; // 초기 주식 데이터
}

// 유효한 주식 데이터인지 확인하는 함수
const isValidStock = (stock: any): stock is RealTimeStockData => {
  return (
    stock &&
    typeof stock.ticker === "string" &&
    Array.isArray(stock.results) &&
    stock.results.length > 0
  );
};

// 시장에 따라 주식을 필터링하는 함수
const filterByMarket = (ticker: string, market: string): boolean => {
  switch (market) {
    case "domestic":
      return DOMESTIC_TICKERS.includes(ticker);
    case "overseas":
      return OVERSEAS_TICKERS.includes(ticker);
    default:
      return true;
  }
};

export default function RealTimeStock({ initialData }: RealTimeStockProps) {
  const date = new Date();
  const { stocks, isLoading, isError } = useStockData(initialData);
  const searchParams = useSearchParams();
  const market = searchParams.get("market") || "all";

  const filteredStocks = useMemo(() => {
    if (!Array.isArray(stocks)) return [];

    return stocks.filter((stock): stock is RealTimeStockData => {
      if (!isValidStock(stock)) return false;
      return filterByMarket(stock.ticker, market);
    });
  }, [stocks, market]);

  if (isError) {
    return <ErrorMessage message="데이터를 불러오는데 실패했습니다" />;
  }

  return (
    <motion.div className="max-w-screen-xl mx-auto mt-8 px-4">
      <span className="ml-5 text-neutral-200 text-xl font-bold gap-2 flex items-center">
        실시간 차트{" "}
        <span className="text-white/50 text-sm">
          {date.getMonth() + 1}/{date.getDate()} {date.getHours()}:
          {date.getMinutes()} 기준
        </span>
      </span>
      <RealTimeStockTable stocks={filteredStocks} isLoading={isLoading} />
    </motion.div>
  );
}

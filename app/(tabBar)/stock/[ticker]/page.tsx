"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StockData } from "@/types/stock";
import { COMPANY_NAMES } from "@/constants/stockTickers";
import StockDetailChart from "./components/StockDetailChart";
import StockInfo from "./components/StockInfo";
import StockOrderBook from "./components/StockOrderBook";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Community from "./components/community";
import { Helmet } from "react-helmet";
const TABS = ["차트 호가", "종목 정보", "뉴스 공시", "커뮤니티"];

export default function StockDetailPage() {
  const { ticker } = useParams();

  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  function handleTabClick(tab: string) {
    setSelectedTab(tab);
    router.push(`/stock/${ticker}?tab=${tab}`);
  }

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
      <Helmet>
        <title>{`${ticker} | 토스증권`}</title>
        <meta name="description" content={`${ticker} 종목 상세 페이지`} />
      </Helmet>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{ticker as string}</h1>
          <span className="text-neutral-500">
            {COMPANY_NAMES[ticker as string]}
          </span>
        </div>
        <div className="flex items-center gap-3 relative">
          {TABS.map((tab) => (
            <div key={tab} className="relative">
              <motion.span
                className={`rounded-lg px-3 py-1 inline-block cursor-pointer relative z-10 ${
                  selectedTab === tab
                    ? "text-neutral-200"
                    : "text-neutral-500 hover:text-neutral-400"
                }`}
                onClick={() => handleTabClick(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
                {selectedTab === tab && (
                  <motion.div
                    className="absolute inset-0 bg-neutral-800 rounded-lg -z-10"
                    layoutId="activeTab"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </motion.span>
            </div>
          ))}
        </div>
        {selectedTab === "차트 호가" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <StockDetailChart data={stockData} />
            </div>
            <div>
              <StockInfo data={stockData} />
              <StockOrderBook ticker={ticker as string} />
            </div>
          </div>
        )}
        {selectedTab === "종목 정보" && null}
        {selectedTab === "뉴스 공시" && null}
        {selectedTab === "커뮤니티" && <Community ticker={ticker as string} />}
      </div>
    </div>
  );
}

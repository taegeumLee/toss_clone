import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import FinancialAssetHeader from "@/components/financialAssetHeader";
import SubHeader from "@/components/subHeader";
import RealTimeStock from "@/components/RealTimeStock";
import { getStockData } from "@/lib/stock";
import { DOMESTIC_TICKERS, OVERSEAS_TICKERS } from "@/constants/stockTickers";

async function StockDataProvider() {
  const cachedStockData = await unstable_cache(
    async () => {
      const allTickers = [...DOMESTIC_TICKERS, ...OVERSEAS_TICKERS];
      return getStockData(allTickers);
    },
    ["stock-data"],
    {
      revalidate: 60, // 1분마다 갱신s
      tags: ["stock"],
    }
  )();

  return (
    <>
      <FinancialAssetHeader initialData={cachedStockData} />
      <RealTimeStock initialData={cachedStockData} />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SubHeader />
      <StockDataProvider />
    </Suspense>
  );
}

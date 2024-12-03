import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import SubHeader from "@/components/subHeader";
import { getStockData } from "@/lib/stock";
import { DOMESTIC_TICKERS, OVERSEAS_TICKERS } from "@/constants/stockTickers";
import ClientHome from "./ClientHome";
import { StockData } from "@/types/stock";

// 서버 컴포넌트
export default async function Home() {
  const initialStockData = await unstable_cache(
    async () => {
      const allTickers = [...DOMESTIC_TICKERS, ...OVERSEAS_TICKERS];
      return getStockData(allTickers);
    },
    ["stock-data"],
    {
      revalidate: 60,
      tags: ["stock"],
    }
  )();

  return (
    <>
      <SubHeader />
      <ClientHome initialData={initialStockData} />
    </>
  );
}

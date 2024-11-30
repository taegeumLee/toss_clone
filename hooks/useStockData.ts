import { useEffect, useState } from "react";
import { StockData } from "@/types/stock";
import { DOMESTIC_TICKERS, OVERSEAS_TICKERS } from "@/constants/stockTickers";

export const useStockData = (market: string) => {
  const [stockData, setStockData] = useState<{
    overseas: StockData[];
    domestic: StockData[];
  }>({ overseas: [], domestic: [] });
  const [isLoading, setIsLoading] = useState(true);

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

        setStockData({
          overseas: data.slice(0, OVERSEAS_TICKERS.length),
          domestic: data.slice(OVERSEAS_TICKERS.length),
        });
      } catch (error) {
        console.error("주식 데이터 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, [market]);

  return { stockData, isLoading };
};

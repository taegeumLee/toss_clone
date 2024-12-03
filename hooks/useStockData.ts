import useSWR from "swr";
import { StockData } from "@/types/stock";
import { DOMESTIC_TICKERS, OVERSEAS_TICKERS } from "@/constants/stockTickers";
import { useMemo } from "react";

const fetcher = async (url: string) => {
  const maxRetries = 3;
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  console.error("Fetcher error after retries:", lastError);
  return [];
};

export function useStockData(initialData: StockData[]) {
  const allTickers = useMemo(
    () => [...DOMESTIC_TICKERS, ...OVERSEAS_TICKERS].join(","),
    []
  );

  const { data, error } = useSWR<StockData[]>(
    `/api/stock/getStocks?tickers=${allTickers}`,
    fetcher,
    {
      fallbackData: initialData,
      refreshInterval: 60000,
      revalidateOnFocus: false,
      onError: (err) => console.error("SWR Error:", err),
      dedupingInterval: 60000,
    }
  );

  return {
    stocks: Array.isArray(data) ? data : [],
    isLoading: !error && !data,
    isError: error,
  };
}

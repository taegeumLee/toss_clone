import { StockData } from "@/types/stock";
import { unstable_cache } from "next/cache";

function createErrorStockData(tickers: string[]): StockData[] {
  return tickers.map((ticker) => ({
    ticker,
    results: [],
    status: "ERROR",
    adjusted: false,
    next_url: "",
    queryCount: 0,
    request_id: "",
    results_count: 0,
  }));
}

export async function getStockData(tickers: string[]) {
  const batchSize = 3;
  const results: StockData[] = [];

  for (let i = 0; i < tickers.length; i += batchSize) {
    const batchTickers = tickers.slice(i, i + batchSize);

    try {
      const data = await fetchStockBatch(batchTickers);
      results.push(...data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Rate limit 방지
    } catch (error) {
      console.error(`Batch error for tickers ${batchTickers}:`, error);
      results.push(...createErrorStockData(batchTickers));
    }
  }

  return results;
}

async function fetchStockBatch(tickers: string[]): Promise<StockData[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${tickers.join(
        ","
      )}/range/1/day/2023-01-01/2024-12-31?apiKey=${
        process.env.POLYGON_API_KEY
      }`,
      { next: { revalidate: 60 }, signal: controller.signal }
    );

    clearTimeout(timeoutId);
    const data = await response.json();

    return tickers.map((ticker) => ({
      ...data,
      ticker,
      results: data.results || [],
      status: data.status === "ERROR" ? "ERROR" : "OK",
    }));
  } catch (error) {
    throw error;
  }
}

// 캐시된 데이터 가져오기
export const getCachedStockData = unstable_cache(
  async (tickers: string[]) => getStockData(tickers),
  ["stock-data"],
  { revalidate: 60, tags: ["stock"] }
);

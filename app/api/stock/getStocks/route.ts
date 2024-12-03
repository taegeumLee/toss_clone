import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

const getStockData = unstable_cache(
  async (ticker: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 타임아웃

    try {
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-01/2024-12-31?apiKey=${POLYGON_API_KEY}`,
        {
          next: { revalidate: 300 },
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);
      return response.json();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("API 요청 시간 초과");
      }
      throw error;
    }
  },
  ["stock-data", "ticker"],
  { revalidate: 300, tags: ["stock"] }
);

const getStockDataWithRetry = async (ticker: string, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await getStockData(ticker);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};

const batchSize = 5;
const fetchStocksInBatches = async (tickers: string[]) => {
  const results = [];
  for (let i = 0; i < tickers.length; i += batchSize) {
    const batch = tickers.slice(i, i + batchSize);
    const batchPromises = batch.map((ticker) => getStockDataWithRetry(ticker));
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }
  return results;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tickersParam = searchParams.get("tickers");

  if (!tickersParam) {
    return NextResponse.json({ error: "티커가 필요합니다" }, { status: 400 });
  }

  // 티커를 개별적으로 분리
  const tickers = tickersParam.split(",");

  try {
    // 각 티커에 대해 개별적으로 API 호출
    const stockDataPromises = tickers.map(async (ticker) => {
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-01/2024-12-31?apiKey=${process.env.POLYGON_API_KEY}`,
        {
          next: { revalidate: 300 },
        }
      );
      const data = await response.json();
      return {
        ...data,
        ticker: ticker,
      };
    });

    const results = await Promise.all(stockDataPromises);
    return NextResponse.json(results);
  } catch (error) {
    console.error("API 에러:", error);
    return NextResponse.json(
      { error: "주식 데이터를 가져오는데 실패했습니다" },
      { status: 500 }
    );
  }
}

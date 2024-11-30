import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

const getStockData = unstable_cache(
  async (ticker: string) => {
    const response = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-01/2024-12-31?apiKey=${POLYGON_API_KEY}`
    );
    return response.json();
  },
  ["stock-data"],
  { revalidate: 300 } // 5분마다 캐시 갱신
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tickers = searchParams.get("tickers")?.split(",");

  if (!tickers) {
    return NextResponse.json({ error: "티커가 필요합니다" }, { status: 400 });
  }

  try {
    const stockDataPromises = tickers.map((ticker) => getStockData(ticker));
    const results = await Promise.all(stockDataPromises);

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "주식 데이터를 가져오는데 실패했습니다" },
      { status: 500 }
    );
  }
}

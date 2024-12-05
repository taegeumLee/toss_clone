import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

// Polygon API 키 환경변수에서 가져오기
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

// 주식 데이터를 가져오는 캐시된 함수
const getStockData = unstable_cache(
  async (ticker: string) => {
    // API 요청 타임아웃을 위한 AbortController 설정
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 타임아웃

    try {
      // Polygon API에서 주식 데이터 가져오기
      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-01/2024-12-31?apiKey=${POLYGON_API_KEY}`,
        {
          next: { revalidate: 300 }, // 5분마다 캐시 재검증
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

// 재시도 로직이 포함된 주식 데이터 조회 함수
const getStockDataWithRetry = async (ticker: string, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await getStockData(ticker);
    } catch (error) {
      if (i === retries - 1) throw error; // 최대 재시도 횟수 도달 시 에러 발생
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기 후 재시도
    }
  }
};

// 한 번에 처리할 요청 수
const batchSize = 5;
// 배치 단위로 주식 데이터 조회
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

// API 엔드포인트 핸들러
export async function GET(request: NextRequest) {
  // URL에서 티커 파라미터 추출
  const { searchParams } = new URL(request.url);
  const tickersParam = searchParams.get("tickers");

  if (!tickersParam) {
    return NextResponse.json({ error: "티커가 필요합니다" }, { status: 400 });
  }

  // 쉼표로 구분된 티커 문자열을 배열로 변환
  const tickers = tickersParam.split(",");

  try {
    // 각 티커에 대해 병렬로 API 요청 실행
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

    // 모든 API 요청 결과 수집
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

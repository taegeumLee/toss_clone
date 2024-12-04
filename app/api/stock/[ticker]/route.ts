import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { ticker: string } }
) {
  const ticker = params.ticker;
  const { searchParams } = new URL(request.url);
  const timeframe = searchParams.get("timeframe") || "1D";

  // 기간별 시작일 계산
  const getStartDate = () => {
    const now = new Date();
    switch (timeframe) {
      case "1D":
        return new Date(now.setDate(now.getDate() - 1));
      case "1W":
        return new Date(now.setDate(now.getDate() - 7));
      case "1M":
        return new Date(now.setMonth(now.getMonth() - 1));
      case "3M":
        return new Date(now.setMonth(now.getMonth() - 3));
      case "1Y":
        return new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return new Date(now.setDate(now.getDate() - 1));
    }
  };

  const startDate = getStartDate().toISOString().split("T")[0];
  const endDate = new Date().toISOString().split("T")[0];

  try {
    const response = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/minute/${startDate}/${endDate}?apiKey=${process.env.POLYGON_API_KEY}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error("데이터를 가져오는데 실패했습니다");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API 에러:", error);
    return NextResponse.json(
      { error: "주식 데이터를 가져오는데 실패했습니다" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

const getNaverNews = unstable_cache(
  async () => {
    const response = await fetch(
      "https://openapi.naver.com/v1/search/news.json?query=해외&display=10",
      {
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID!,
          "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error("네이버 뉴스 API 호출 실패");
    }

    return response.json();
  },
  ["naver-news"],
  { revalidate: 300, tags: ["news"] }
);

export const revalidate = 300; // 5분마다 재검증

export async function GET() {
  try {
    const data = await getNaverNews();
    return NextResponse.json(data);
  } catch (error) {
    console.error("뉴스 데이터 조회 중 오류:", error);
    return NextResponse.json(
      { error: "뉴스를 불러오는데 실패했습니다" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker");

  if (!ticker) {
    return NextResponse.json({ error: "티커가 필요합니다" }, { status: 400 });
  }

  try {
    const opinions = await prisma.opinion.findMany({
      where: {
        stock: {
          ticker: ticker,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            profileImage: true,
          },
        },
        comments: true,
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(opinions);
  } catch (error) {
    console.error("의견 조회 중 오류:", error);
    return NextResponse.json(
      { error: "의견을 불러오는데 실패했습니다" },
      { status: 500 }
    );
  }
}

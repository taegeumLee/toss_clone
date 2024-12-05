import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker");

  if (!ticker) {
    return NextResponse.json({ error: "티커가 필요합니다" }, { status: 400 });
  }

  const stock = await prisma.stock.findUnique({
    where: {
      ticker: ticker,
    },
  });
  if (!stock) {
    return NextResponse.json(
      { error: "존재하지 않는 종목입니다" },
      { status: 404 }
    );
  }

  const opinions = await prisma.opinion.findMany({
    where: {
      stockId: stock.id,
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
}

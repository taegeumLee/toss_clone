import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  console.log("newOpinion");
  const { searchParams } = new URL(req.url);
  const ticker = searchParams.get("ticker");

  const stock = await prisma.stock.findUnique({
    where: {
      ticker: ticker!,
    },
  });
  if (!stock) {
    return NextResponse.json({ error: "티커가 필요합니다" }, { status: 400 });
  }

  const body = await req.json();

  // app/api/stock/newOpinion/route.ts
  const newOpinion = await prisma.opinion.create({
    data: {
      content: body.opinion,
      userId: body.userId,
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
      likes: true, // likes 추가
    },
  });
  return NextResponse.json({ newOpinion }, { status: 200 });
}

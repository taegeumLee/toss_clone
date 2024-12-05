import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { opinionId, userId } = await req.json();

  const like = await prisma.like.create({
    data: {
      opinionId,
      userId,
    },
  });

  return NextResponse.json({ message: "Like added" });
}

export async function DELETE(req: NextRequest) {
  const { opinionId, userId, likeId } = await req.json();

  const like = await prisma.like.delete({
    where: {
      id: likeId,
      opinionId: opinionId!,
      userId: userId!,
    },
  });

  return NextResponse.json({ message: "Like deleted" });
}

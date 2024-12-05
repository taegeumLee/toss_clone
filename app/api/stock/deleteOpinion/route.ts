import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const opinionId = searchParams.get("opinionId");
  console.log(opinionId);
  const deletedOpinion = await prisma.opinion.delete({
    where: {
      id: opinionId!,
    },
  });
  return NextResponse.json(deletedOpinion);
}

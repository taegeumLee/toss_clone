import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, nickname } = await request.json();

    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return NextResponse.json(
          { error: "이미 사용 중인 이메일입니다." },
          { status: 400 }
        );
      }
    }

    if (nickname) {
      const existingNickname = await prisma.user.findFirst({
        where: { nickname },
      });

      if (existingNickname) {
        return NextResponse.json(
          { error: "이미 사용 중인 닉네임입니다." },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "중복 검사 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

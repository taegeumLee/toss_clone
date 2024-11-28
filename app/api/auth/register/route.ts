import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, name, birth, nickname } = await request.json();

    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "이미 존재하는 이메일입니다." },
        { status: 400 }
      );
    }

    // 닉네임 중복 확인 (닉네임이 제공된 경우)
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

    const user = await prisma.user.create({
      data: {
        email,
        name,
        birth,
        nickname,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "회원가입 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

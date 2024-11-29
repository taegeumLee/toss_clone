import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userToken = cookies().get("user-token");

    if (!userToken) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userToken.value,
      },
      select: {
        profileImage: true,
        name: true,
        nickname: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "사용자 정보를 가져오는데 실패했습니다" },
      { status: 500 }
    );
  }
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  cookies().delete("user-token");

  return NextResponse.json({ message: "로그아웃 성공", status: 200 });
}

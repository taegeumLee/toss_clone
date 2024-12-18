import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("user-token");
  const { pathname } = request.nextUrl;

  // 루트 경로(/)를 /home으로 리다이렉트
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 인증이 필요한 경로들
  const protectedPaths = [
    "/home",
    "/news",
    "/explore",
    "/myAccount",
    "/stock",
    "/settings",
  ];

  // 로그인하지 않은 사용자가 보호된 경로에 접근하려고 할 때
  if (!isLoggedIn && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 이미 로그인한 사용자가 로그인/회원가입 페이지에 접근하려고 할 때
  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  const response = NextResponse.next();

  // 캐시 제어 헤더 설정
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return response;
}

export const config = {
  matcher: [
    "/",
    "/home",
    "/login",
    "/register",
    "/news",
    "/explore",
    "/myAccount",
    "/stock/:path*",
    "/settings",
    "/api/:path*",
  ],
};

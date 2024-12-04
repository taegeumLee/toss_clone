"use client";

import Image from "next/image";
import logo from "@/public/image/logo/Toss_Symbol_Primary.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdSettings } from "react-icons/md";
import LogoutButton from "../common/LogoutButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { id: "home", name: "홈", path: "/home" },
  { id: "news", name: "뉴스", path: "/news" },
  { id: "selectStock", name: "주식 골라보기", path: "/explore" },
  { id: "myAccount", name: "내 계좌", path: "/myAccount" },
];

interface User {
  profileImage: string | null;
  name: string;
  nickname: string | null;
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("사용자 정보를 가져오는데 실패했습니다");
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-between relative items-center pt-3 f-full max-w-screen-xl mx-auto px-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.push("/home")}
        role="button"
      >
        <Image src={logo} alt="logo" width={30} height={30} />
        <span className="text-xl font-bold">토스 증권</span>
      </div>
      <div className="flex items-center gap-8">
        {categories.map(({ id, name, path }) => (
          <Link
            href={path}
            key={id}
            className={`${
              pathname === path
                ? "text-neutral-200 font-extrabold"
                : "text-white/50"
            } transition-colors duration-200 text-lg`}
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4 ">
        <details className="relative">
          <summary className="bg-gray-800 rounded-full p-1 cursor-pointer list-none">
            <Image
              src={user.profileImage || logo}
              alt="🔥"
              width={30}
              height={30}
              className="rounded-full"
            />
          </summary>

          <div className="absolute top-14 right-0 z-10 bg-gray-800 rounded-lg p-4 w-48 shadow-lg">
            <div className="mb-3 flex flex-col items-center">
              <Image
                src={user.profileImage || logo}
                alt="🔥"
                width={30}
                height={30}
                className="rounded-full mb-1"
              />
              <h1 className="text-md text-white">{user.name}님 안녕하세요</h1>
              <h3 className="text-xs text-gray-400">{user.nickname}</h3>
            </div>
            <div className="space-y-2">
              <Link
                href="/settings"
                className="text-sm text-white hover:bg-gray-700 p-2 rounded flex items-center gap-2"
              >
                <MdSettings size={15} /> 설정
              </Link>
              <LogoutButton />
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

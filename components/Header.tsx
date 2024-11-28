import Image from "next/image";
import logo from "@/public/image/logo/Toss_Symbol_Primary.png";
import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MdOutlineLogout, MdSettings } from "react-icons/md";
export default async function Header() {
  const userToken = cookies().get("user-token");
  if (!userToken) {
    return notFound();
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
    return notFound();
  }

  return (
    <div className="flex justify-between items-center p-4 f-full">
      <div className="flex items-center">
        <Image src={logo} alt="logo" width={30} height={30} />
        <span className="text-2xl font-bold">토스 증권</span>
      </div>
      <div className="flex items-center gap-10">
        <Link href="/home">홈</Link>
        <Link href="/news">뉴스</Link>
        <Link href="/selectStock">주식 골라보기</Link>
        <Link href="/myAccount">내 계좌</Link>
      </div>
      <div className="flex items-center gap-4 relative mr-2">
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
          <div className="absolute top-14 right-0 bg-gray-800 rounded-lg p-4 w-48 shadow-lg">
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
                className=" text-sm text-white hover:bg-gray-700 p-2 rounded flex items-center gap-2"
              >
                <MdSettings size={15} /> 설정
              </Link>
              <Link
                href="/logout"
                className=" text-sm text-white hover:bg-gray-700 p-2 rounded flex items-center gap-2"
              >
                <MdOutlineLogout size={15} /> 로그아웃
              </Link>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

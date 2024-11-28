import Image from "next/image";
import tossLogo from "@/public/image/logo/Toss_Symbol_Primary.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <div className="absolute top-4 left-10 flex items-center gap-2">
        <Image
          src={tossLogo}
          alt="toss"
          width={30}
          height={30}
          quality={100}
          placeholder="empty"
        />
        <span className="text-white text-lg font-extrabold">토스증권</span>
      </div>
    </div>
  );
}

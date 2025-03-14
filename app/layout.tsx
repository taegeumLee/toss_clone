import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: ` 토스증권`,
  description: "토스증권",
  icons: {
    icon: [
      {
        url: "/image/logo/Toss_Symbol_Primary.png",
        href: "/image/logo/Toss_Symbol_Primary.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-neutral-900">
        {children}
        {modal}
      </body>
    </html>
  );
}

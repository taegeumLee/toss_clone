"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const categories = [
  { id: "토스증권 거래대금", param: "toss_trading_amount" },
  { id: "토스증권 거래량", param: "toss_trading_volume" },
  { id: "거래량", param: "trading_volume" },
  { id: "급상승", param: "rapid_increase" },
  { id: "급하락", param: "rapid_decrease" },
  { id: "인기", param: "popular" },
];
export default function RealTimeStock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id
  );

  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const searchParams = new URLSearchParams(window.location.search);
    const market = searchParams.get("market") || "overseas";
    router.push(`?market=${market}&real_time_chart=${category}`);
  };

  return (
    <motion.div className="relative max-w-screen-xl mx-auto flex flex-col px-8 mt-12">
      <div className="flex gap-3 items-center">
        <span className="text-2xl font-bold">실시간 주식</span>
        <span className="text-sm text-gray-500">
          {`${
            time.getMonth() + 1
          }월 ${time.getDate()}일 ${time.getHours()}:${time.getMinutes()} 기준`}
        </span>
      </div>
      <div className="w-full flex flex-row gap-4 *:text-lg *:cursor-pointer mt-5">
        {categories.map((category) => (
          <div key={category.id} className="relative">
            <span
              className={`${
                selectedCategory === category.id
                  ? "font-bold text-white"
                  : "text-white/50"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.id}
            </span>
            {selectedCategory === category.id && (
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                layoutId="underline"
              />
            )}
          </div>
        ))}
      </div>
      <div className="absolute -bottom-1 left-8 right-8 h-0.5 bg-white/40" />
    </motion.div>
  );
}

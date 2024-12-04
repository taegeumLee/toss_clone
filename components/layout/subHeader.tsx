"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { id: "전체", param: "all", ping: false },
  { id: "국내", param: "domestic", ping: true },
  { id: "해외", param: "overseas", ping: true },
];
export default function SubHeader() {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().getHours().toString()
  );

  const checkOverseasMarketStatus = (hour: number) => {
    // 프리마켓 (한국시간 18:00 - 23:30)
    if (hour >= 18 && hour < 23.5) {
      return "프리마켓";
    }
    // 데이 마켓 (한국시간 23:30 - 06:00)
    else if (hour >= 10 || hour < 18) {
      return "데이 마켓";
    }
    // 애프터 마켓 (한국시간 06:00 - 10:00)
    else if (hour >= 6 && hour < 10) {
      return "애프터 마켓";
    }
    return "장 닫힘";
  };

  const [domesticPing, setDomesticPing] = useState<boolean>(false);
  const [overseasPing, setOverseasPing] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMarket = searchParams.get("market") || "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories.find((c) => c.param === currentMarket)?.id || "모두"
  );

  const handleCategoryClick = (category: string, param: string) => {
    setSelectedCategory(category);
    router.push(`?market=${param}`);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      setCurrentTime(currentHour.toString());

      // 국내 장 시간 (09:00 - 15:30)
      setDomesticPing(currentHour >= 9 && currentHour < 15.5);

      // 해외 장 상태
      const overseasStatus = checkOverseasMarketStatus(currentHour);
      setOverseasPing(overseasStatus !== "장 닫힘");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col px-8 pt-14">
      <motion.div
        className="w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-row items-center gap-6">
          {categories.map(({ id, param, ping }) => (
            <motion.div
              key={id}
              className="flex items-center flex-col gap-2"
              variants={itemVariants}
            >
              <div
                className="flex items-center cursor-pointer gap-2 relative"
                onClick={() => handleCategoryClick(id, param)}
              >
                <span
                  className={`text-2xl font-extrabold transition-colors duration-200 ${
                    selectedCategory === id
                      ? "text-neutral-200"
                      : "text-white/50"
                  }`}
                >
                  {id}
                </span>
                {ping && (
                  <div className="flex gap-2 items-center">
                    <span className="relative flex w-2">
                      <motion.span
                        className={`absolute inline-flex h-full w-full rounded-full ${
                          id === "국내"
                            ? domesticPing
                              ? "bg-green-400"
                              : "bg-gray-500"
                            : overseasPing
                            ? "bg-green-400"
                            : "bg-gray-500"
                        }`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${
                          id === "국내"
                            ? domesticPing
                              ? "bg-green-500"
                              : "bg-gray-500"
                            : overseasPing
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      />
                    </span>
                    <span className="text-sm text-white/50">
                      {id === "국내"
                        ? domesticPing
                          ? "정규장"
                          : "장 닫힘"
                        : checkOverseasMarketStatus(parseInt(currentTime))}
                    </span>
                  </div>
                )}
                {selectedCategory === id && (
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-neutral-200 rounded-full"
                    layoutId="underline"
                    transition={{ duration: 0.3 }}
                    style={{ width: "100%" }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

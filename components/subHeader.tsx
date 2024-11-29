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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getHours().toString());

      setDomesticPing(
        parseInt(currentTime) >= 9 && parseInt(currentTime) <= 15
      );
      setOverseasPing(
        parseInt(currentTime) >= 10 || parseInt(currentTime) <= 6
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
                          ? "장 열림"
                          : "장 닫힘"
                        : overseasPing
                        ? "장 열림"
                        : "장 닫힘"}
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

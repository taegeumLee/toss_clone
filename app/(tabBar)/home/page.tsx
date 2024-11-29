"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { id: "모두", param: "all", ping: false },
  { id: "국내", param: "domestic", ping: true },
  { id: "해외", param: "overseas", ping: true },
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().getHours().toString()
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getHours().toString());

      setDomesticPing(parseInt(currentTime) >= 9 && parseInt(currentTime) < 15);
      setOverseasPing(
        parseInt(currentTime) >= 15 && parseInt(currentTime) < 21
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

  return (
    <div className="max-w-screen-xl mx-auto bg-neutral-800 flex flex-col p-4">
      <motion.div
        className="w-full h-20 flex flex-col "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-row items-center gap-4">
          {categories.map(({ id, param, ping }) => (
            <div
              key={id}
              className="flex items-center cursor-pointer gap-2"
              onClick={() => handleCategoryClick(id, param)}
            >
              <span
                className={`text-2xl font-extrabold ${
                  selectedCategory === id ? "text-white" : "text-white/50"
                }`}
              >
                {id}
              </span>
              {ping && (
                <span className="relative flex w-2 ">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                      id === "국내"
                        ? domesticPing
                          ? "bg-green-400"
                          : null
                        : overseasPing
                        ? "bg-green-400"
                        : null
                    } opacity-75`}
                  ></span>
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
                  ></span>
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

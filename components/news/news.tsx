"use client";

import { useRef, useState, useEffect } from "react";
import NewsCard, { NewsCardProps } from "./newsCard";
import { useDraggable } from "@/hooks/useDraggable";
import { motion } from "framer-motion";

export default function NewsList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDragging, handleMouseDown, handleMouseUp, handleMouseMove } =
    useDraggable(containerRef);

  // 데이터 가져오기
  const [data, setData] = useState<{ items: NewsCardProps[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news?query=해외`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("뉴스 데이터를 불러오는데 실패했습니다");
        }
        const newsData = await response.json();
        setData(newsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했습니다");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto px-8 py-6">
        <h2 className="text-xl font-bold mb-4">실시간 뉴스</h2>
        <div className="flex gap-4 overflow-x-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[300px] h-48 bg-neutral-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-screen-xl mx-auto px-8 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4">실시간 뉴스</h2>
      <div
        ref={containerRef}
        className={`
          flex gap-4 overflow-x-auto scrollbar-hide
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
          transition-all duration-200
        `}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {data?.items?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NewsCard {...item} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

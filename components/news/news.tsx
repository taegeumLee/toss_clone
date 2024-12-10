"use client";

import { useRef } from "react";
import NewsCard from "./newsCard";
import { useDraggable } from "@/hooks/useDraggable";
import { useNews } from "@/hooks/useNews";
import { useMarket } from "@/hooks/useMarket";
import { motion } from "framer-motion";

export default function NewsList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { market } = useMarket();
  const { data, isLoading, error } = useNews(market);
  const { isDragging, ...dragHandlers } = useDraggable(containerRef);

  if (isLoading || error) return null;

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
        className={`flex gap-4 overflow-x-auto scrollbar-hide ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        {...dragHandlers}
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

"use client";

import NewsCard from "@/components/news/newsCard";
import { useNews } from "@/hooks/useNews";

export default function StockNews({ ticker }: { ticker: string }) {
  const { data, isLoading, error } = useNews(ticker);

  if (isLoading || error) return null;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col bg-neutral-800 p-4 rounded-lg w-3/4 gap-4">
        <span className="text-2xl font-medium">{ticker} 뉴스</span>
        <div className="flex flex-col gap-2">
          {data?.items.map((item) => (
            <NewsCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

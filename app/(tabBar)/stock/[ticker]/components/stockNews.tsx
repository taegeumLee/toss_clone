import NewsCard, { NewsCardProps } from "@/components/news/newsCard";
import { useEffect, useState } from "react";

export default function StockNews({ ticker }: { ticker: string }) {
  const [data, setData] = useState<{ items: NewsCardProps[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news?query=${ticker}`, {
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

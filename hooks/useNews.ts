"use client";

import { useState, useEffect } from "react";
import { NewsItem } from "@/types/news";

interface NewsResponse {
  items: NewsItem[];
}

export function useNews(query: string) {
  const [data, setData] = useState<NewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news?query=${query}`);
        if (!response.ok) throw new Error("Failed to fetch news");
        setData(await response.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [query]);

  return { data, isLoading, error };
}

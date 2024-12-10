"use client";

import { StockData } from "@/types/stock";
import { create } from "zustand";
import { fetchAPI } from "@/lib/api";

interface StockStore {
  stocks: StockData[];
  isLoading: boolean;
  error: string | null;
  fetchStocks: (tickers: string[]) => Promise<void>;
}

export const useStockStore = create<StockStore>((set) => ({
  stocks: [],
  isLoading: false,
  error: null,
  fetchStocks: async (tickers: string[]) => {
    set({ isLoading: true });
    try {
      const data = await fetchAPI("/api/stock/getStocks", {
        params: { tickers: tickers.join(",") },
      });
      set({ stocks: data, error: null });
    } catch {
      set({ error: "Failed to fetch stocks" });
    } finally {
      set({ isLoading: false });
    }
  },
}));

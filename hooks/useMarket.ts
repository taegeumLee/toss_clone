"use client";

import { useSearchParams } from "next/navigation";

export function useMarket() {
  const params = useSearchParams();
  const query = params.get("market") || "all";

  const market =
    query === "all" ? "증권" : query === "overseas" ? "해외 주식" : "국내 주식";

  return { market, query };
}

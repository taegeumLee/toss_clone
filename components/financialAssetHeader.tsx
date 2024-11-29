"use client";

import { useSearchParams } from "next/navigation";
import { DOMESTIC_TICKERS, OVERSEAS_TICKERS } from "@/constants/stockTickers";

export default function FinancialAssetHeader() {
  const searchParams = useSearchParams();
  const market = searchParams.get("market") || "all";

  const tickers =
    market === "all"
      ? [...DOMESTIC_TICKERS, ...OVERSEAS_TICKERS]
      : market === "domestic"
      ? DOMESTIC_TICKERS
      : OVERSEAS_TICKERS;

  return <div className="w-full"></div>;
}

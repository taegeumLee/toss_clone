import { RealTimeStockData } from "@/types/stock";

export function useStockInfo(stock: RealTimeStockData, market: string) {
  if (!stock?.results?.length) {
    return {
      priceChange: 0,
      priceDisplay: "-",
      companyName: "-",
    };
  }

  const lastResult = stock.results[stock.results.length - 1];
  const firstResult = stock.results[0];

  // 가격 변화율 계산
  const priceChange =
    firstResult && lastResult
      ? ((lastResult.c - firstResult.o) / firstResult.o) * 100
      : 0;

  // 현재가 표시
  const priceDisplay = lastResult?.c
    ? market === "domestic"
      ? `${lastResult.c.toLocaleString()}원`
      : `$${lastResult.c.toLocaleString()}`
    : "-";

  // 회사명 (임시로 티커로 대체)
  const companyName = stock.ticker;

  return {
    priceChange,
    priceDisplay,
    companyName,
  };
}

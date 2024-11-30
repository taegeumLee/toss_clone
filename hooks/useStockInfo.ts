import { StockData } from "@/types/stock";
import { COMPANY_NAMES } from "@/constants/stockTickers";

export function useStockInfo(stock: StockData, market: string) {
  if (!stock?.results?.length) {
    return {
      priceChange: 0,
      currentPrice: "0",
      priceDisplay: "0",
      companyName: "",
    };
  }

  const monthlyData = stock.results.slice(-30);
  const lastPrice = monthlyData[monthlyData.length - 1].c;
  const firstPrice = monthlyData[0].c;
  const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;
  const currentPrice = lastPrice.toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
  });

  const priceDisplay =
    market === "domestic" ? `${currentPrice}원` : `$${currentPrice}`;

  const companyName = COMPANY_NAMES[stock.ticker] || stock.ticker;

  return {
    priceChange,
    currentPrice,
    priceDisplay,
    companyName,
  };
}

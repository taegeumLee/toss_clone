import { useStockInfo } from "@/hooks/useStockInfo";
import { RealTimeStockData } from "@/types/stock";
import Image from "next/image";

interface StockRowProps {
  stock: RealTimeStockData;
  market: string;
}

export default function StockRow({ stock, market }: StockRowProps) {
  const { priceChange, priceDisplay, companyName } = useStockInfo(
    stock,
    market
  );
  const volume = stock.results[stock.results.length - 1].v;
  const tradingAmount =
    stock.results[stock.results.length - 1].v *
    stock.results[stock.results.length - 1].vw;

  return (
    <div className="flex items-center py-2 hover:bg-neutral-800/50 transition-colors cursor-pointer text-sm">
      <div className="w-12 text-center text-neutral-500">{stock.rank}</div>
      <div className="flex-1">
        <div className="font-medium text-neutral-200">{stock.ticker}</div>
        <div className="text-neutral-500 text-xs">{companyName}</div>
      </div>
      <div className="w-28 text-right">
        <div className="font-medium text-neutral-200">{priceDisplay}</div>
      </div>
      <div
        className={`w-24 text-right ${
          priceChange >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {priceChange >= 0 ? "+" : ""}
        {priceChange.toFixed(2)}%
      </div>
      <div className="w-32 text-right text-neutral-200">
        {(tradingAmount / 100000000).toFixed(0)}억
      </div>
      <div className="w-32 text-right text-neutral-200">
        {(volume / 1000).toFixed(0)}천주
      </div>
    </div>
  );
}

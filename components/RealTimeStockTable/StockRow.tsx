import { useStockInfo } from "@/hooks/useStockInfo";
import { RealTimeStockData } from "@/types/stock";
import { useRouter } from "next/navigation";

interface StockRowProps {
  stock: RealTimeStockData;
  market: string;
}

export default function StockRow({ stock, market }: StockRowProps) {
  const router = useRouter();
  const { priceChange, priceDisplay, companyName } = useStockInfo(
    stock,
    market
  );

  const handleClick = () => {
    router.push(`/stock/${stock.ticker}`);
  };

  if (!stock?.results?.length) {
    console.error("Invalid stock data:", stock);
    return null;
  }

  const lastResult = stock.results[stock.results.length - 1];

  if (!lastResult?.v || !lastResult?.vw) {
    console.error("Invalid result data:", lastResult);
    return null;
  }

  const volume = lastResult.v;
  const tradingAmount = lastResult.v * lastResult.vw;

  return (
    <div
      className="flex items-center py-2 hover:bg-neutral-800/50 transition-colors cursor-pointer text-sm"
      onClick={handleClick}
    >
      <div className="w-12 text-center text-neutral-500">
        {stock.rank || "-"}
      </div>
      <div className="flex-1">
        <div className="font-medium text-neutral-200">{stock.ticker}</div>
        <div className="text-neutral-500 text-xs">{companyName || "-"}</div>
      </div>
      <div className="w-28 text-right">
        <div className="font-medium text-neutral-200">
          {priceDisplay || "-"}
        </div>
      </div>
      <div
        className={`w-24 text-right ${
          priceChange >= 0 ? "text-red-500" : "text-blue-500"
        }`}
      >
        <span
          className={`${
            priceChange >= 0 ? "text-red-500" : "text-blue-500"
          } font-medium`}
        >
          {priceChange >= 0 ? "+" : ""}
          {priceChange.toFixed(2)}%
        </span>
      </div>
      <div className="w-32 text-right text-neutral-200">
        {tradingAmount ? `${(tradingAmount / 100000000).toFixed(0)}억` : "-"}
      </div>
      <div className="w-32 text-right text-neutral-200">
        {volume ? `${(volume / 1000).toFixed(0)}천주` : "-"}
      </div>
    </div>
  );
}

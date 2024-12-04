import { StockData } from "@/types/stock";
import StockChartItem from "./StockChartItem";

interface StockChartProps {
  stocks: StockData[];
  isLoading: boolean;
  market: string;
}

export default function StockChart({
  stocks,
  isLoading,
  market,
}: StockChartProps) {
  if (isLoading || !stocks?.length) {
    return null;
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 pb-4">
        {stocks.map((stock, index) => (
          <div key={`${stock.ticker}-${index}`} className="min-w-[240px]">
            <StockChartItem stock={stock} market={market} />
          </div>
        ))}
      </div>
    </div>
  );
}

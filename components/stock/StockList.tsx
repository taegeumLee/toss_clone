import { memo } from "react";
import { StockData } from "@/types/stock";

interface StockCardProps {
  stock: StockData;
  onClick: () => void;
}

const StockCard = ({ stock, onClick }: StockCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-neutral-800 p-4 rounded-lg cursor-pointer hover:bg-neutral-700"
    >
      <h3 className="font-bold">{stock.ticker}</h3>
      {/* 필요한 주식 정보 표시 */}
    </div>
  );
};

interface StockListProps {
  stocks: StockData[];
  onStockClick: (ticker: string) => void;
}

export const StockList = memo(function StockList({
  stocks,
  onStockClick,
}: StockListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stocks.map((stock) => (
        <StockCard
          key={stock.ticker}
          stock={stock}
          onClick={() => onStockClick(stock.ticker)}
        />
      ))}
    </div>
  );
});

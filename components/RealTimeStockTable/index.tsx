import { Suspense } from "react";
import { RealTimeStockData } from "@/types/stock";
import TableHeader from "./TableHeader";
import StockRow from "./StockRow";
import { useSearchParams } from "next/navigation";

interface RealTimeStockTableProps {
  stocks: RealTimeStockData[];
  isLoading?: boolean;
}

function RealTimeStockTableContent({
  stocks,
  isLoading = false,
}: RealTimeStockTableProps) {
  const searchParams = useSearchParams();
  const market = searchParams.get("market") || "all";

  if (isLoading) {
    return null;
  }

  return (
    <div className="mt-4 bg-neutral-900 rounded-lg p-4">
      <TableHeader />
      <div className="divide-y divide-neutral-800/50">
        {stocks.map((stock) => (
          <StockRow key={stock.ticker} stock={stock} market={market} />
        ))}
      </div>
    </div>
  );
}

export default function RealTimeStockTable(props: RealTimeStockTableProps) {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <RealTimeStockTableContent {...props} />
    </Suspense>
  );
}

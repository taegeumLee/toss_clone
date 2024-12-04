import { Suspense } from "react";
import { RealTimeStockData } from "@/types/stock";
import TableHeader from "./TableHeader";
import StockRow from "./StockRow";
import LoadingRow from "../../layout/LoadingRow";
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

  return (
    <div className="max-w-screen-xl mx-auto mt-2 bg-neutral-900 rounded-lg p-4">
      <TableHeader />
      <div className="divide-y divide-neutral-800/50">
        {isLoading ? (
          // 로딩 상태일 때 8개의 스켈레톤 로우 표시
          Array.from({ length: 8 }).map((_, index) => (
            <LoadingRow key={`loading-${index}`} />
          ))
        ) : (
          // 실제 데이터 표시
          <Suspense
            fallback={Array.from({ length: 8 }).map((_, index) => (
              <LoadingRow key={`fallback-${index}`} />
            ))}
          >
            {stocks.map((stock) => (
              <StockRow key={stock.ticker} stock={stock} market={market} />
            ))}
          </Suspense>
        )}
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

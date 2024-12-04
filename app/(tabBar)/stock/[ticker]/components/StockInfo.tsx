import { StockData } from "@/types/stock";
import { DOMESTIC_TICKERS } from "@/constants/stockTickers";
import { useSearchParams } from "next/navigation";

interface StockInfoProps {
  data: StockData;
}

export default function StockInfo({ data }: StockInfoProps) {
  const searchParams = useSearchParams();
  const market = DOMESTIC_TICKERS.includes(data.ticker)
    ? "domestic"
    : "overseas";

  if (!data?.results?.length) return null;

  const lastResult = data.results[data.results.length - 1];
  const prevResult = data.results[data.results.length - 2];

  const priceChange = prevResult
    ? ((lastResult.c - prevResult.c) / prevResult.c) * 100
    : 0;

  const currentPrice = lastResult.c.toLocaleString();
  const priceDisplay =
    market === "domestic" ? `${currentPrice}원` : `$${currentPrice}`;

  const infoItems = [
    { label: "시가", value: lastResult.o.toLocaleString() },
    { label: "고가", value: lastResult.h.toLocaleString() },
    { label: "저가", value: lastResult.l.toLocaleString() },
    { label: "거래량", value: `${(lastResult.v / 1000).toFixed(0)}천주` },
    {
      label: "거래대금",
      value: `${((lastResult.v * lastResult.vw) / 100000000).toFixed(0)}억`,
    },
  ];

  return (
    <div className="bg-neutral-900 p-4 rounded-lg mb-4">
      <div className="mb-4">
        <div className="text-2xl font-bold mb-1">{priceDisplay}</div>
        <div
          className={`text-sm ${
            priceChange >= 0 ? "text-red-500" : "text-blue-500"
          }`}
        >
          {priceChange >= 0 ? "+" : ""}
          {priceChange.toFixed(2)}%
        </div>
      </div>

      <div className="space-y-2">
        {infoItems.map((item) => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-neutral-400">{item.label}</span>
            <span className="text-neutral-200">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

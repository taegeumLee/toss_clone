import { StockData } from "@/types/stock";
import { useStockInfo } from "@/hooks/useStockInfo";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface StockHeaderProps {
  ticker: string;
  companyName: string;
  priceChange: number;
  priceDisplay: string;
}

function StockHeader({
  ticker,
  companyName,
  priceChange,
  priceDisplay,
}: StockHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg font-bold text-white">{ticker}</span>
        <span className="text-sm text-gray-300">{companyName}</span>
        <span
          className={`text-sm ${
            priceChange >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {priceChange >= 0 ? "+" : ""}
          {priceChange.toFixed(2)}%
        </span>
      </div>
      <span className="text-base">{priceDisplay}</span>
    </div>
  );
}

interface StockGraphProps {
  data: any[];
  priceChange: number;
}

function StockGraph({ data, priceChange }: StockGraphProps) {
  return (
    <div className="w-full h-24">
      <Chart
        options={{
          chart: {
            type: "line",
            toolbar: { show: false },
            sparkline: { enabled: true },
            background: "transparent",
            animations: { enabled: false },
          },
          stroke: {
            curve: "smooth",
            width: 2,
            colors: [priceChange >= 0 ? "#22c55e" : "#ef4444"],
          },
          tooltip: { enabled: false },
          grid: {
            show: true,
            strokeDashArray: 4,
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: false } },
            padding: { bottom: 0 },
          },
          xaxis: { labels: { show: false } },
          yaxis: {
            labels: { show: false },
            min: Math.min(...data.map((d) => d.c)) * 0.999,
            max: Math.max(...data.map((d) => d.c)) * 1.001,
          },
          theme: { mode: "dark" },
        }}
        series={[
          {
            name: "Price",
            data: data.map((result) => result.c),
          },
        ]}
        type="line"
        height={96}
        width="100%"
      />
    </div>
  );
}

export default function StockChartItem({
  stock,
  market,
}: {
  stock: StockData;
  market: string;
}) {
  const { priceChange, currentPrice, priceDisplay, companyName } = useStockInfo(
    stock,
    market
  );

  return (
    <div className="bg-neutral-800 p-3 rounded-xl mt-6">
      <div className="space-y-3">
        <StockHeader
          ticker={stock.ticker}
          companyName={companyName}
          priceChange={priceChange}
          priceDisplay={priceDisplay}
        />
        <StockGraph data={stock.results.slice(-30)} priceChange={priceChange} />
      </div>
    </div>
  );
}

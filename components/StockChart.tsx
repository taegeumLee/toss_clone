import { StockData } from "@/types/stock";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { COMPANY_NAMES } from "@/constants/stockTickers";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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

function StockChartItem({
  stock,
  market,
}: {
  stock: StockData;
  market: string;
}) {
  if (!stock?.results?.length) {
    return null;
  }

  const monthlyData = stock.results.slice(-30);
  const lastPrice = monthlyData[monthlyData.length - 1].c;
  const firstPrice = monthlyData[0].c;
  const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;
  const currentPrice = lastPrice.toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
  });

  const currencySymbol = market === "domestic" ? "원" : "$";
  const priceDisplay =
    market === "domestic" ? `${currentPrice}원` : `$${currentPrice}`;

  const companyName = COMPANY_NAMES[stock.ticker] || stock.ticker;

  return (
    <div className="bg-neutral-800 p-3 rounded-xl mt-6">
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-white">{stock.ticker}</span>
            <span className="text-sm text-white/50">{companyName}</span>
            <span
              className={`text-sm ${
                priceChange >= 0 ? "text-red-500" : "text-blue-500"
              }`}
            >
              {priceChange >= 0 ? "+" : ""}
              {priceChange.toFixed(2)}%
            </span>
          </div>
          <span className="text-base">{priceDisplay}</span>
        </div>

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
                colors: [priceChange >= 0 ? "#ef4444" : "#3b82f6"],
              },
              tooltip: { enabled: false },
              grid: {
                show: true,
                strokeDashArray: 4,
                xaxis: {
                  lines: { show: false },
                },
                yaxis: {
                  lines: { show: false },
                },
                padding: {
                  bottom: 0,
                },
              },
              xaxis: { labels: { show: false } },
              yaxis: {
                labels: { show: false },
                min: Math.min(...monthlyData.map((d) => d.c)) * 0.999,
                max: Math.max(...monthlyData.map((d) => d.c)) * 1.001,
              },
              theme: { mode: "dark" },
            }}
            series={[
              {
                name: "Price",
                data: monthlyData.map((result) => result.c),
              },
            ]}
            type="line"
            height={96}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

interface StockOrderBookProps {
  ticker: string;
}

interface OrderBookItem {
  price: number;
  volume: number;
  ratio: number;
}

export default function StockOrderBook({ ticker }: StockOrderBookProps) {
  // 실제로는 WebSocket이나 API를 통해 호가 데이터를 가져와야 합니다
  const mockOrderBook: {
    asks: OrderBookItem[];
    bids: OrderBookItem[];
  } = {
    asks: Array.from({ length: 5 }, (_, i) => ({
      price: 23100 + (i + 1) * 100,
      volume: Math.floor(Math.random() * 10000),
      ratio: Math.random() * 100,
    })).reverse(),
    bids: Array.from({ length: 5 }, (_, i) => ({
      price: 23000 - i * 100,
      volume: Math.floor(Math.random() * 10000),
      ratio: Math.random() * 100,
    })),
  };

  return (
    <div className="bg-neutral-900 p-4 rounded-lg">
      <h3 className="text-sm font-medium mb-3">호가</h3>
      <div className="space-y-1">
        {/* 매도 호가 */}
        {mockOrderBook.asks.map((item) => (
          <div key={item.price} className="flex justify-between text-xs">
            <span className="text-red-500">{item.price.toLocaleString()}</span>
            <span>{item.volume.toLocaleString()}</span>
            <span className="text-neutral-500">{item.ratio.toFixed(1)}%</span>
          </div>
        ))}

        {/* 현재가 구분선 */}
        <div className="border-t border-b border-neutral-800 my-2 py-1">
          <div className="flex justify-between text-xs font-medium">
            <span>현재가</span>
            <span>23,100</span>
          </div>
        </div>

        {/* 매수 호가 */}
        {mockOrderBook.bids.map((item) => (
          <div key={item.price} className="flex justify-between text-xs">
            <span className="text-blue-500">{item.price.toLocaleString()}</span>
            <span>{item.volume.toLocaleString()}</span>
            <span className="text-neutral-500">{item.ratio.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

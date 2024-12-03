export interface StockResult {
  c: number; // 종가
  h: number; // 고가
  l: number; // 저가
  o: number; // 시가
  t: number; // 타임스탬프
  v: number; // 거래량
  vw: number; // 거래대금
}

export interface StockData {
  ticker: string;
  results: StockResult[];
  status: "OK" | "ERROR";
  adjusted: boolean;
  next_url: string;
  queryCount: number;
  request_id: string;
  results_count: number;
}

export interface RealTimeStockData extends StockData {
  rank?: number;
  tradingAmount?: number;
}

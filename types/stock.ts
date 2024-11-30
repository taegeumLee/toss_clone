export interface DailyStockData {
  c: number; //close
  h: number; //high
  l: number; //low
  n: number; //number of transactions
  o: number; //open
  t: number; //timestamp
  v: number; //volume
  vw: number;
}

export interface StockData {
  adjusted: boolean;
  next_url: string;
  queryCount: number;
  request_id: string;

  results: DailyStockData[];

  results_count: number;
  status: string;
  ticker: string;
}

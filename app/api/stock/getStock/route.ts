import { NextResponse } from "next/server";

const COMPANY_NAMES: { [key: string]: string } = {
  // 국내 주식
  "005930": "삼성전자",
  "000660": "SK하이닉스",
  "035720": "카카오",
  "035420": "NAVER",
  "051910": "LG화학",
  "006400": "삼성SDI",
  // 해외 주식
  AAPL: "Apple Inc.",
  GOOGL: "Alphabet Inc.",
  MSFT: "Microsoft Corp.",
  AMZN: "Amazon.com Inc.",
  META: "Meta Platforms Inc.",
  TSLA: "Tesla Inc.",
  NVDA: "NVIDIA Corp.",
  ADBE: "Adobe Inc.",
  CSCO: "Cisco Systems Inc.",
  PEP: "PepsiCo Inc.",
  NFLX: "Netflix Inc.",
  NKE: "Nike Inc.",
};

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

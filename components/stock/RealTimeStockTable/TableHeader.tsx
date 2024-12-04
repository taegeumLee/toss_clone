export default function TableHeader() {
  return (
    <div className="flex items-center py-3 border-b border-neutral-800 text-xs text-neutral-500">
      <div className="w-12 text-center">순위</div>
      <div className="flex-1">종목</div>
      <div className="w-28 text-right">현재가</div>
      <div className="w-24 text-right">등락률</div>
      <div className="w-32 text-right">거래대금</div>
      <div className="w-32 text-right">거래량</div>
    </div>
  );
}

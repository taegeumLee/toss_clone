import { Suspense } from "react";
import FinancialAssetHeader from "@/components/financialAssetHeader";
import SubHeader from "@/components/subHeader";
import RealTimeStock from "@/components/RealTimeStock";

export default function Home() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SubHeader />
      <FinancialAssetHeader />
      <RealTimeStock />
    </Suspense>
  );
}

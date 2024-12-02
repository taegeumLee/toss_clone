import FinancialAssetHeader from "@/components/financialAssetHeader";
import SubHeader from "@/components/subHeader";
import RealTimeStock from "@/components/RealTimeStock";
export default function Home() {
  return (
    <>
      <SubHeader />
      <FinancialAssetHeader />
      <RealTimeStock />
    </>
  );
}

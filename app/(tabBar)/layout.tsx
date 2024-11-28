import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-900">
      <Header />
      {children}
    </div>
  );
}

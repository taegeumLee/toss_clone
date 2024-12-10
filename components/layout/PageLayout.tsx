// 공통 레이아웃 컴포넌트 생성
interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function PageLayout({
  children,
  title,
  className = "",
}: PageLayoutProps) {
  return (
    <div className={`max-w-screen-xl mx-auto px-8 py-6 ${className}`}>
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
}

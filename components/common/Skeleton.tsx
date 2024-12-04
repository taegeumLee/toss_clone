import { COMMON_STYLES } from "@/constants/styles";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  delay?: number;
}

export function Skeleton({ width, height, className, delay }: SkeletonProps) {
  return (
    <div
      className={`${COMMON_STYLES.skeletonBase} ${className}`}
      style={{
        width,
        height,
        animationDelay: delay ? `${delay}ms` : undefined,
      }}
    />
  );
}

interface SkeletonRowProps {
  count?: number;
  className?: string;
  delay?: number;
}

export function SkeletonRow({
  count = 4,
  className = "",
  delay = 0,
}: SkeletonRowProps) {
  return (
    <div
      className={`flex gap-4 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
  );
}

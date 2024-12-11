import { Skeleton } from "./Skeleton";

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export function NewsLoadingSkeleton({ count = 3 }: LoadingSkeletonProps) {
  return (
    <div className="max-w-screen-xl mx-auto px-8 py-6">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="flex gap-4 overflow-x-auto">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="min-w-[300px] flex-shrink-0 animate-pulse">
            <Skeleton className="h-48 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StockNewsLoadingSkeleton() {
  return (
    <div className="flex gap-4">
      <div className="flex-1 bg-neutral-800 p-4 rounded-lg">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StockListLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-neutral-800 p-4 rounded-lg">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      ))}
    </div>
  );
}

export function TableLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center py-3 border-b border-neutral-800">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-4 ${i === 0 ? "w-12" : i === 1 ? "flex-1" : "w-28"}`}
          />
        ))}
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center py-2">
          {Array.from({ length: 6 }).map((_, j) => (
            <Skeleton
              key={j}
              className={`h-4 ${
                j === 0 ? "w-12" : j === 1 ? "flex-1" : "w-28"
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

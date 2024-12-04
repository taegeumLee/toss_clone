"use client";

import LoadingRow from "@/components/layout/LoadingRow";

export default function LoadingSkeleton() {
  return (
    <div className="max-w-screen-xl mx-auto">
      {/* 헤더 스켈레톤 */}
      <div className="mt-4 bg-neutral-900 rounded-lg p-4">
        <div className="h-8 bg-neutral-800 rounded w-1/4 mb-4 animate-pulse" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 min-w-[240px] h-[200px] bg-neutral-800 rounded-xl animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>

      {/* 테이블 스켈레톤 */}
      <div className="mt-4 bg-neutral-900 rounded-lg p-4">
        <div className="h-8 bg-neutral-800 rounded w-full mb-4 animate-pulse" />
        <div className="divide-y divide-neutral-800/50">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ animationDelay: `${i * 50}ms` }}>
              <LoadingRow />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

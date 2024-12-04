export default function LoadingSkeleton() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* 헤더 스켈레톤 */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-24 bg-neutral-800 rounded animate-pulse" />
        <div className="h-6 w-32 bg-neutral-800 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 차트 스켈레톤 */}
        <div className="lg:col-span-2">
          <div className="bg-neutral-900 p-4 rounded-lg">
            <div className="flex gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-16 bg-neutral-800 rounded animate-pulse"
                />
              ))}
            </div>
            <div className="h-[500px] bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>

        {/* 우측 정보 스켈레톤 */}
        <div className="space-y-4">
          <div className="bg-neutral-900 p-4 rounded-lg">
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-4 w-20 bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-neutral-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-neutral-900 p-4 rounded-lg">
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-4 w-16 bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-neutral-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

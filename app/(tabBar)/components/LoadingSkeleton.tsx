export default function LoadingSkeleton() {
  return (
    <div className="bg-neutral-900 min-h-screen">
      {/* 상단 네비게이션 스켈레톤 */}
      <div className="py-3">
        <div className="flex justify-between items-center h-16 max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neutral-800 rounded-full animate-pulse" />
            <div className="w-24 h-6 bg-neutral-800 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-16 h-5 bg-neutral-800 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 서브헤더 스켈레톤 */}
      <div className="max-w-screen-xl mx-auto px-4 mt-4">
        <div className="flex gap-4 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-20 h-8 bg-neutral-800 rounded animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* 차트 영역 스켈레톤 */}
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[1.6/1] bg-neutral-800 rounded-xl animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>

      {/* 실시간 차트 헤더 스켈레톤 */}
      <div className="max-w-screen-xl mx-auto px-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-32 h-7 bg-neutral-800 rounded animate-pulse" />
          <div className="w-24 h-5 bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>

      {/* 테이블 스켈레톤 */}
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="bg-neutral-900 rounded-lg p-4">
          {/* 테이블 헤더 */}
          <div className="grid grid-cols-6 gap-4 mb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-6 bg-neutral-800 rounded animate-pulse"
              />
            ))}
          </div>
          {/* 테이블 로우 */}
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-6 gap-4"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {Array.from({ length: 6 }).map((_, j) => (
                  <div
                    key={j}
                    className="h-6 bg-neutral-800 rounded animate-pulse"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 사이드바 스켈레톤 */}
      <div className="fixed right-0 top-0 w-[70px] h-screen bg-neutral-900 border-l border-neutral-800">
        <div className="flex flex-col gap-6 p-3 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-full aspect-square bg-neutral-800 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

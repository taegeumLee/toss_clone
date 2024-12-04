export default function LoadingRow() {
  return (
    <div className="flex items-center py-2 animate-pulse">
      <div className="w-12 text-center">
        <div className="h-4 bg-neutral-800 rounded" />
      </div>
      <div className="flex-1 px-4">
        <div className="h-5 bg-neutral-800 rounded w-24 mb-1" />
        <div className="h-3 bg-neutral-800 rounded w-16" />
      </div>
      <div className="w-28 text-right">
        <div className="h-5 bg-neutral-800 rounded" />
      </div>
      <div className="w-24 text-right">
        <div className="h-5 bg-neutral-800 rounded" />
      </div>
      <div className="w-32 text-right">
        <div className="h-5 bg-neutral-800 rounded" />
      </div>
      <div className="w-32 text-right">
        <div className="h-5 bg-neutral-800 rounded" />
      </div>
    </div>
  );
}

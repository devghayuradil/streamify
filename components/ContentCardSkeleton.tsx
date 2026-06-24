export function ContentCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden border border-border bg-card shadow-sm animate-pulse">
      <div className="w-full aspect-[2/3] bg-muted"></div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="flex justify-between items-center mt-2">
          <div className="h-3 bg-muted rounded w-1/4"></div>
          <div className="h-3 bg-muted rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}

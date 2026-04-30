import { Skeleton } from '@/components/ui/Skeleton'

export function VendorCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      {/* Image placeholder */}
      <Skeleton className="aspect-[4/3] rounded-none" />

      {/* Info */}
      <div className="p-3 space-y-2">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
        <div className="flex items-center gap-2 pt-1">
          <Skeleton variant="text" className="w-16 h-3" />
          <Skeleton variant="text" className="w-8 h-3" />
        </div>
      </div>
    </div>
  )
}
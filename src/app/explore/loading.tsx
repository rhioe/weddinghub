import { Container } from '@/components/layout/Container'
import { Skeleton } from '@/components/ui/Skeleton'

export default function ExploreLoading() {
    return (
        <div className="pb-20 md:pb-0 animate-pulse">
            {/* Search skeleton */}
            <div className="sticky top-14 bg-white border-b border-neutral-100 px-4 py-3">
                <Skeleton className="w-full h-10 rounded-full" />
            </div>

            {/* Filters skeleton */}
            <div className="px-4 py-3 space-y-3">
                <div className="flex gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="w-20 h-8 rounded-full" />
                    ))}
                </div>
            </div>

            {/* Results skeleton */}
            <Container className="py-4">
                <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i}>
                            <Skeleton className="aspect-[4/3] rounded-lg mb-3" />
                            <Skeleton variant="text" className="w-3/4 h-4 mb-2" />
                            <Skeleton variant="text" className="w-1/2 h-3" />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
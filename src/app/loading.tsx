import { Container } from '@/components/layout/Container'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
    return (
        <div className="pb-20 md:pb-0 space-y-8 animate-pulse">
            {/* Hero skeleton */}
            <Container className="pt-4">
                <Skeleton className="w-full h-[280px] md:h-[320px] rounded-xl" />
            </Container>

            {/* Categories skeleton */}
            <Container>
                <Skeleton variant="text" className="w-24 h-5 mb-4" />
                <div className="flex gap-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                            <Skeleton variant="circular" className="w-14 h-14" />
                            <Skeleton variant="text" className="w-16 h-3" />
                        </div>
                    ))}
                </div>
            </Container>

            {/* Featured vendors skeleton */}
            <Container>
                <Skeleton variant="text" className="w-32 h-5 mb-4" />
                <div className="flex gap-3 overflow-hidden">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="shrink-0 w-[280px]">
                            <Skeleton className="aspect-[4/3] rounded-lg mb-3" />
                            <Skeleton variant="text" className="w-3/4 h-4 mb-2" />
                            <Skeleton variant="text" className="w-1/2 h-3" />
                        </div>
                    ))}
                </div>
            </Container>

            {/* New vendors skeleton */}
            <Container>
                <Skeleton variant="text" className="w-24 h-5 mb-4" />
                <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
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
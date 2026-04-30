import { cn } from '@/lib/utils/cn'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
}

export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton-shimmer',
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'rounded-sm h-4',
        variant === 'rectangular' && 'rounded-md',
        className
      )}
    />
  )
}
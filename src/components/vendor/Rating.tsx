import { cn } from '@/lib/utils/cn'

type RatingSize = 'sm' | 'md' | 'lg'

interface RatingProps {
  value: number
  max?: number
  size?: RatingSize
  showValue?: boolean
  className?: string
}

const sizeStyles: Record<RatingSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

export function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  className,
}: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => {
    const filled = i < Math.floor(value)
    const half = !filled && i < value

    if (half) {
      return (
        <span key={i} className="relative">
          <span className="text-neutral-200">★</span>
          <span className="absolute left-0 top-0 overflow-hidden w-1/2 text-accent-500">
            ★
          </span>
        </span>
      )
    }

    return (
      <span
        key={i}
        className={filled ? 'text-accent-500' : 'text-neutral-200'}
      >
        ★
      </span>
    )
  })

  return (
    <div className={cn('flex items-center gap-1', sizeStyles[size], className)}>
      <div className="flex">{stars}</div>
      {showValue && (
        <span className="text-neutral-600 font-semibold">
          {value > 0 ? value.toFixed(1) : 'Baru'}
        </span>
      )}
    </div>
  )
}
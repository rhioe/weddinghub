import { cn } from '@/lib/utils/cn'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?: string | null
  alt?: string
  size?: AvatarSize
  fallback?: string
  className?: string
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

export function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  className,
}: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          'rounded-full object-cover bg-neutral-100',
          sizeStyles[size],
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full bg-primary-100 text-primary-600 font-semibold flex items-center justify-center',
        sizeStyles[size],
        className
      )}
    >
      {fallback ? fallback.charAt(0).toUpperCase() : '?'}
    </div>
  )
}
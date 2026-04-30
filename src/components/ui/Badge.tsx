import { cn } from '@/lib/utils/cn'

type BadgeVariant = 'verified' | 'premium' | 'featured' | 'pending' | 'approved' | 'rejected' | 'deal' | 'new'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  verified: 'bg-green-50 text-green-700 border-green-200',
  premium: 'bg-accent-50 text-accent-700 border-accent-200',
  featured: 'bg-primary-50 text-primary-700 border-primary-200',
  pending: 'bg-warning-50 text-warning-700 border-warning-200',
  approved: 'bg-success-50 text-success-700 border-success-200',
  rejected: 'bg-error-50 text-error-700 border-error-200',
  deal: 'bg-purple-50 text-purple-700 border-purple-200',
  new: 'bg-blue-50 text-blue-700 border-blue-200',
}

export function Badge({ variant = 'pending', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
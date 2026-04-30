'use client'

import { cn } from '@/lib/utils/cn'

const SORT_OPTIONS = [
  { value: 'rating', label: 'Rating' },
  { value: 'newest', label: 'Terbaru' },
  { value: 'reviews', label: 'Review' },
]

interface SortBarProps {
  sort: string
  onSortChange: (sort: string) => void
  resultCount: number
}

export function SortBar({ sort, onSortChange, resultCount }: SortBarProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-neutral-500">
        {resultCount} vendor ditemukan
      </p>

      <div className="flex gap-1">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={cn(
              'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
              sort === option.value
                ? 'bg-primary-50 text-primary-600'
                : 'text-neutral-500 hover:text-neutral-700'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
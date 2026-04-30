'use client'

import { CATEGORIES } from '@/lib/constants'
import { cn } from '@/lib/utils/cn'

interface FilterChipsProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function FilterChips({
  selectedCategory,
  onSelectCategory,
}: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {/* All */}
      <button
        onClick={() => onSelectCategory('')}
        className={cn(
          'shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
          !selectedCategory
            ? 'bg-primary-500 text-white border-primary-500'
            : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary-300'
        )}
      >
        Semua
      </button>

      {/* Category chips */}
      {CATEGORIES.slice(0, 8).map((cat) => (
        <button
          key={cat.slug}
          onClick={() =>
            onSelectCategory(
              selectedCategory === cat.slug ? '' : cat.slug
            )
          }
          className={cn(
            'shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
            selectedCategory === cat.slug
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary-300'
          )}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  )
}
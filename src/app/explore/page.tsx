'use client'

import { useState } from 'react'
import { SearchBar } from './_components/SearchBar'
import { FilterChips } from './_components/FilterChips'
import { SortBar } from './_components/SortBar'
import { VendorCard } from '@/components/vendor/VendorCard'
import { VendorCardSkeleton } from '@/components/vendor/VendorCardSkeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { useVendors } from '@/lib/hooks/useVendors'
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll'

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [sort, setSort] = useState('rating')

  const { vendors, loading, hasMore, loadMore } = useVendors({
    search,
    category,
    city,
    sort,
  })

  const { sentinelRef } = useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: loadMore,
  })

  return (
    <main className="pb-20 md:pb-0">
      {/* Search */}
      <div className="sticky top-14 z-40 bg-white border-b border-neutral-100 px-4 py-3">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Filters */}
      <div className="px-4 py-3 space-y-3">
        <FilterChips
          selectedCategory={category}
          onSelectCategory={setCategory}
        />
        <SortBar
          sort={sort}
          onSortChange={setSort}
          resultCount={vendors.length}
        />
      </div>

      {/* Results */}
      <div className="px-4 py-4">
        {vendors.length === 0 && !loading ? (
          <EmptyState
            icon="🔍"
            title="Vendor tidak ditemukan"
            description="Coba ubah filter atau kata kunci pencarian"
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <VendorCardSkeleton key={i} />
              ))}
          </div>
        )}

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} className="h-4" />
      </div>
    </main>
  )
}
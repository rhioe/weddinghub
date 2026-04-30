'use client'

import { useState, useEffect, useCallback } from 'react'
import { getVendors } from '@/lib/actions/vendor'

interface VendorData {
  id: string
  business_name: string
  slug: string
  city: string
  category: string
  avg_rating: number
  total_reviews: number
  image_url?: string | null
  featured: boolean
  is_new: boolean
}

interface UseVendorsParams {
  search?: string
  category?: string
  city?: string
  sort?: string
  limit?: number
}

interface UseVendorsReturn {
  vendors: VendorData[]
  loading: boolean
  hasMore: boolean
  loadMore: () => void
  total: number
}

export function useVendors({
  search = '',
  category = '',
  city = '',
  sort = 'rating',
  limit = 10,
}: UseVendorsParams): UseVendorsReturn {
  const [vendors, setVendors] = useState<VendorData[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)

  const fetchVendors = useCallback(
    async (pageNum: number, reset = false) => {
      setLoading(true)

      const result = await getVendors({
        search,
        category,
        city,
        sort,
        page: pageNum,
        limit,
      })

      const mapped = (result.data || []).map((v: any) => ({
        ...v,
        category: v.category || '',
        image_url: v.image_url || null,
      }))

      if (reset) {
        setVendors(mapped)
      } else {
        setVendors((prev) => [...prev, ...mapped])
      }

      setTotal(result.count)
      setHasMore(pageNum * limit < result.count)
      setLoading(false)
    },
    [search, category, city, sort, limit]
  )

  // Reset when filters change
  useEffect(() => {
    setPage(1)
    fetchVendors(1, true)
  }, [fetchVendors])

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return
    const nextPage = page + 1
    setPage(nextPage)
    fetchVendors(nextPage, false)
  }, [loading, hasMore, page, fetchVendors])

  return {
    vendors,
    loading,
    hasMore,
    loadMore,
    total,
  }
}
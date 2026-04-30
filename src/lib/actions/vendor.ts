'use server'

import { createServerClient } from '@/lib/supabase/server'

interface GetVendorsParams {
  search?: string
  category?: string
  city?: string
  sort?: string
  page?: number
  limit?: number
}

export async function getVendors({
  search = '',
  category = '',
  city = '',
  sort = 'rating',
  page = 1,
  limit = 10,
}: GetVendorsParams) {
  const supabase = await createServerClient()

  let query = supabase
    .from('vendor_profiles')
    .select('*')
    .eq('is_active', true)

  // Search by business name
  if (search) {
    query = query.ilike('business_name', `%${search}%`)
  }

  // Filter by category
  if (category) {
    const { data: catData } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category)
      .single()

    if (catData) {
      query = query.eq('category_id', catData.id)
    }
  }

  // Filter by city
  if (city) {
    query = query.ilike('city', `%${city}%`)
  }

  // Sort
  switch (sort) {
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    case 'reviews':
      query = query.order('total_reviews', { ascending: false })
      break
    case 'rating':
    default:
      query = query.order('avg_rating', { ascending: false })
      break
  }

  // Pagination
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await query.range(from, to)

  if (error) {
    console.error('Error fetching vendors:', error)
    return { data: [], count: 0 }
  }

  return { data: data || [], count: count || 0 }
}

export async function getVendorBySlug(slug: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('vendor_profiles')
    .select(`
      *,
      portfolios(*),
      packages(*),
      reviews(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}
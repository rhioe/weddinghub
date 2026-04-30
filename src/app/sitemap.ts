import type { MetadataRoute } from 'next'
import { createServerClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/explore`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ]

    // Dynamic vendor routes
    const supabase = await createServerClient()
    const { data: vendors } = await supabase
        .from('vendor_profiles')
        .select('slug, updated_at')
        .eq('is_active', true)

    const vendorRoutes: MetadataRoute.Sitemap =
        vendors?.map((vendor) => ({
            url: `${baseUrl}/vendor/${vendor.slug}`,
            lastModified: new Date(vendor.updated_at),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        })) || []

    return [...staticRoutes, ...vendorRoutes]
}
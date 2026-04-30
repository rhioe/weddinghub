import { createServerClient } from '@/lib/supabase/server'
import { Container } from '@/components/layout/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default async function BannersPage() {
  const supabase = await createServerClient()

  const { data: banners } = await supabase
    .from('banners')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <Container className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-neutral-900">Banner</h1>
        <Button size="sm" disabled>
          + Tambah
        </Button>
      </div>

      {!banners || banners.length === 0 ? (
        <EmptyState
          icon="🎨"
          title="Belum ada banner"
          description="Banner akan tampil di homepage. Fitur tambah banner coming soon."
        />
      ) : (
        <div className="space-y-3">
          {banners.map((banner: any) => (
            <div
              key={banner.id}
              className="bg-white border border-neutral-200 rounded-lg overflow-hidden"
            >
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold text-neutral-900">
                  {banner.title}
                </h3>
                {banner.subtitle && (
                  <p className="text-sm text-neutral-500">{banner.subtitle}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    banner.is_active
                      ? 'bg-success-50 text-success-700'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    {banner.is_active ? 'Aktif' : 'Nonaktif'}
                  </span>
                  <span className="text-xs text-neutral-400">
                    Urutan: {banner.sort_order}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
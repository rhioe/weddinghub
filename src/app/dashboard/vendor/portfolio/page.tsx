import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { PRODUCT_STATUS } from '@/lib/constants'

export default async function PortfolioListPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: vendor } = await supabase
    .from('vendor_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!vendor) return null

  const { data: portfolios } = await supabase
    .from('portfolios')
    .select('*')
    .eq('vendor_id', vendor.id)
    .order('created_at', { ascending: false })

  return (
    <Container className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-neutral-900">Portofolio</h1>
        <Link href="/dashboard/vendor/portfolio/upload">
          <Button size="sm">+ Upload</Button>
        </Link>
      </div>

      {!portfolios || portfolios.length === 0 ? (
        <EmptyState
          icon="📸"
          title="Belum ada portofolio"
          description="Upload foto hasil kerja terbaik kamu"
          action={
            <Link href="/dashboard/vendor/portfolio/upload">
              <Button>Upload Sekarang</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {portfolios.map((item: any) => (
            <div
              key={item.id}
              className="relative group bg-neutral-100 rounded-lg overflow-hidden aspect-square"
            >
              <img
                src={item.image_url}
                alt={item.caption || 'Portofolio'}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={
                    item.status === 'approved'
                      ? 'approved'
                      : item.status === 'rejected'
                      ? 'rejected'
                      : 'pending'
                  }
                >
                  {PRODUCT_STATUS[item.status as keyof typeof PRODUCT_STATUS]}
                </Badge>
              </div>
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2">
                  {item.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
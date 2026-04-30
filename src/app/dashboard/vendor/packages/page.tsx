import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { PRODUCT_STATUS } from '@/lib/constants'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export default async function PackagesListPage() {
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

  const { data: packages } = await supabase
    .from('packages')
    .select('*')
    .eq('vendor_id', vendor.id)
    .order('created_at', { ascending: false })

  return (
    <Container className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-neutral-900">Paket</h1>
        <Link href="/dashboard/vendor/packages/create">
          <Button size="sm">+ Buat Paket</Button>
        </Link>
      </div>

      {!packages || packages.length === 0 ? (
        <EmptyState
          icon="📦"
          title="Belum ada paket"
          description="Buat paket layanan untuk customer"
          action={
            <Link href="/dashboard/vendor/packages/create">
              <Button>Buat Paket Sekarang</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {packages.map((pkg: any) => (
            <div
              key={pkg.id}
              className="bg-white border border-neutral-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">
                    {pkg.name}
                  </h3>
                  <p className="text-lg font-bold text-primary-600 mt-1">
                    {formatPrice(pkg.price)}
                  </p>
                  {pkg.description && (
                    <p className="text-sm text-neutral-500 mt-1">
                      {pkg.description}
                    </p>
                  )}
                </div>
                <Badge
                  variant={
                    pkg.status === 'approved'
                      ? 'approved'
                      : pkg.status === 'rejected'
                      ? 'rejected'
                      : 'pending'
                  }
                >
                  {PRODUCT_STATUS[pkg.status as keyof typeof PRODUCT_STATUS]}
                </Badge>
              </div>

              {pkg.rejection_reason && (
                <div className="mt-3 bg-error-50 text-error-700 text-xs p-2 rounded">
                  Ditolak: {pkg.rejection_reason}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
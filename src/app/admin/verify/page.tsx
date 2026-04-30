import { createServerClient } from '@/lib/supabase/server'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { AdminVerifyActions } from './_components/AdminVerifyActions'

export default async function VerifyProductsPage() {
  const supabase = await createServerClient()

  const { data: pendingPortfolios } = await supabase
    .from('portfolios')
    .select(`
      *,
      vendor:vendor_profiles(business_name)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  const { data: pendingPackages } = await supabase
    .from('packages')
    .select(`
      *,
      vendor:vendor_profiles(business_name)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  const totalPending = (pendingPortfolios?.length || 0) + (pendingPackages?.length || 0)

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        Verifikasi Produk
        {totalPending > 0 && (
          <span className="ml-2 text-sm font-normal text-warning-600">
            ({totalPending} pending)
          </span>
        )}
      </h1>

      {totalPending === 0 ? (
        <EmptyState
          icon="✅"
          title="Tidak ada yang pending"
          description="Semua produk sudah diverifikasi"
        />
      ) : (
        <div className="space-y-6">
          {/* Portfolios */}
          {pendingPortfolios && pendingPortfolios.length > 0 && (
            <div>
              <h2 className="font-semibold text-neutral-900 mb-3">
                📸 Portofolio ({pendingPortfolios.length})
              </h2>
              <div className="space-y-3">
                {pendingPortfolios.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-white border border-neutral-200 rounded-lg overflow-hidden"
                  >
                    <div className="flex gap-4 p-4">
                      <img
                        src={item.image_url}
                        alt="Portofolio"
                        className="w-24 h-24 object-cover rounded-md shrink-0"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-neutral-900">
                          {item.vendor?.business_name || 'Vendor'}
                        </p>
                        {item.caption && (
                          <p className="text-sm text-neutral-500 mt-1">
                            {item.caption}
                          </p>
                        )}
                        <p className="text-xs text-neutral-400 mt-1">
                          {new Date(item.created_at).toLocaleDateString('id-ID')}
                        </p>

                        <AdminVerifyActions
                          id={item.id}
                          type="portfolio"
                          vendorName={item.vendor?.business_name}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packages */}
          {pendingPackages && pendingPackages.length > 0 && (
            <div>
              <h2 className="font-semibold text-neutral-900 mb-3">
                📦 Paket ({pendingPackages.length})
              </h2>
              <div className="space-y-3">
                {pendingPackages.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-white border border-neutral-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-neutral-900">
                          {item.vendor?.business_name || 'Vendor'}
                        </p>
                        <p className="text-sm text-neutral-700 mt-1">
                          {item.name}
                        </p>
                        <p className="text-lg font-bold text-primary-600 mt-1">
                          Rp {item.price?.toLocaleString('id-ID')}
                        </p>
                        {item.description && (
                          <p className="text-sm text-neutral-500 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <AdminVerifyActions
                      id={item.id}
                      type="package"
                      vendorName={item.vendor?.business_name}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  )
}
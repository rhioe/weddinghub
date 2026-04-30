import { createServerClient } from '@/lib/supabase/server'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { COMMISSION_STATUS } from '@/lib/constants'

export default async function CommissionsPage() {
  const supabase = await createServerClient()

  const { data: commissions } = await supabase
    .from('commission_fees')
    .select(`
      *,
      vendor:vendor_profiles(business_name),
      inquiry:inquiries(
        customer:users(full_name)
      )
    `)
    .order('created_at', { ascending: false })

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        Tracking Komisi
      </h1>

      {!commissions || commissions.length === 0 ? (
        <EmptyState
          icon="💰"
          title="Belum ada data komisi"
          description="Komisi akan tercatat setelah ada deal"
        />
      ) : (
        <div className="space-y-3">
          {commissions.map((com: any) => (
            <div
              key={com.id}
              className="bg-white border border-neutral-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-neutral-900">
                    {com.vendor?.business_name || 'Vendor'}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Customer: {com.inquiry?.customer?.full_name || '-'}
                  </p>
                </div>
                <Badge
                  variant={
                    com.status === 'paid'
                      ? 'approved'
                      : com.status === 'waived'
                      ? 'pending'
                      : 'rejected'
                  }
                >
                  {COMMISSION_STATUS[com.status as keyof typeof COMMISSION_STATUS]}
                </Badge>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Jumlah Komisi</span>
                  <span className="text-lg font-bold text-primary-600">
                    Rp {com.amount?.toLocaleString('id-ID')}
                  </span>
                </div>
                {com.notes && (
                  <p className="text-xs text-neutral-400 mt-1">
                    📝 {com.notes}
                  </p>
                )}
                {com.paid_at && (
                  <p className="text-xs text-success-600 mt-1">
                    ✅ Dibayar: {new Date(com.paid_at).toLocaleDateString('id-ID')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
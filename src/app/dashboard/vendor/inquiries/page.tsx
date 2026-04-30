import { createServerClient } from '@/lib/supabase/server'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Divider } from '@/components/ui/Divider'
import { INQUIRY_STATUS } from '@/lib/constants'

export default async function VendorInquiriesPage() {
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

  const { data: inquiries } = await supabase
    .from('inquiries')
    .select(`
      *,
      customer:users!inquiries_customer_id_fkey(full_name, email, phone)
    `)
    .eq('vendor_id', vendor.id)
    .order('created_at', { ascending: false })

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        Inquiry Masuk
      </h1>

      {!inquiries || inquiries.length === 0 ? (
        <EmptyState
          icon="📨"
          title="Belum ada inquiry"
          description="Inquiry dari customer akan muncul di sini"
        />
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq: any) => (
            <div
              key={inq.id}
              className="bg-white border border-neutral-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    {inq.customer?.full_name || 'Customer'}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {inq.customer?.email || inq.customer?.phone || '-'}
                  </p>
                </div>
                <Badge
                  variant={
                    inq.status === 'deal' || inq.status === 'done'
                      ? 'approved'
                      : inq.status === 'cancelled'
                      ? 'rejected'
                      : inq.status === 'negotiation'
                      ? 'deal'
                      : 'pending'
                  }
                >
                  {INQUIRY_STATUS[inq.status as keyof typeof INQUIRY_STATUS]}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                {inq.wedding_date && (
                  <div>
                    <span className="text-neutral-400">📅 Tanggal:</span>{' '}
                    <span className="text-neutral-700">
                      {new Date(inq.wedding_date).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                )}
                {inq.budget && (
                  <div>
                    <span className="text-neutral-400">💰 Budget:</span>{' '}
                    <span className="text-neutral-700">
                      Rp {inq.budget.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}
                {inq.location && (
                  <div>
                    <span className="text-neutral-400">📍 Lokasi:</span>{' '}
                    <span className="text-neutral-700">{inq.location}</span>
                  </div>
                )}
              </div>

              {inq.message && (
                <p className="text-sm text-neutral-600 bg-neutral-50 p-2 rounded-md">
                  "{inq.message}"
                </p>
              )}

              <div className="text-xs text-neutral-400 mt-2">
                {new Date(inq.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
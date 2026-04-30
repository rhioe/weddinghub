import { createServerClient } from '@/lib/supabase/server'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { INQUIRY_STATUS } from '@/lib/constants'

export default async function AdminInquiriesPage() {
  const supabase = await createServerClient()

  const { data: inquiries } = await supabase
    .from('inquiries')
    .select(`
      *,
      customer:users!inquiries_customer_id_fkey(full_name, email),
      vendor:vendor_profiles(business_name)
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        Semua Inquiry
      </h1>

      {!inquiries || inquiries.length === 0 ? (
        <p className="text-sm text-neutral-500">Belum ada inquiry</p>
      ) : (
        <div className="space-y-2">
          {inquiries.map((inq: any) => (
            <div
              key={inq.id}
              className="bg-white border border-neutral-200 rounded-lg p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-900">
                      {inq.customer?.full_name || 'Customer'}
                    </span>
                    <span className="text-neutral-300">→</span>
                    <span className="text-sm font-semibold text-primary-600">
                      {inq.vendor?.business_name || 'Vendor'}
                    </span>
                  </div>
                  {inq.message && (
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                      "{inq.message}"
                    </p>
                  )}
                  <p className="text-xs text-neutral-400 mt-1">
                    {new Date(inq.created_at).toLocaleDateString('id-ID', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
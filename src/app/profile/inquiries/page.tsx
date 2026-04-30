import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Container } from '@/components/layout/Container'
import { Divider } from '@/components/ui/Divider'
import { INQUIRY_STATUS } from '@/lib/constants'

export default async function InquiriesPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: inquiries } = await supabase
    .from('inquiries')
    .select(`
      *,
      vendor:vendor_profiles(business_name, slug)
    `)
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        Inquiry Saya
      </h1>

      {!inquiries || inquiries.length === 0 ? (
        <EmptyState
          icon="📨"
          title="Belum ada inquiry"
          description="Kirim inquiry ke vendor yang kamu minati"
          action={
            <Link
              href="/explore"
              className="text-primary-500 font-semibold hover:text-primary-600"
            >
              Cari Vendor
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq: any) => (
            <Link
              key={inq.id}
              href={`/vendor/${inq.vendor?.slug}`}
              className="block bg-white border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">
                    {inq.vendor?.business_name || 'Vendor'}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    {new Date(inq.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  {inq.message && (
                    <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                      "{inq.message}"
                    </p>
                  )}
                </div>

                <Badge
                  variant={
                    inq.status === 'deal' || inq.status === 'done'
                      ? 'approved'
                      : inq.status === 'cancelled'
                      ? 'rejected'
                      : 'pending'
                  }
                >
                  {INQUIRY_STATUS[inq.status as keyof typeof INQUIRY_STATUS]}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  )
}
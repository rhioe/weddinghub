import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import { VendorCard } from '@/components/vendor/VendorCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { Container } from '@/components/layout/Container'

export default async function WishlistPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: wishlists } = await supabase
    .from('wishlists')
    .select(`
      vendor_id,
      vendor:vendor_profiles(*)
    `)
    .eq('customer_id', user.id)

  const vendors = wishlists?.map((w: any) => w.vendor).filter(Boolean) || []

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        Wishlist Saya
      </h1>

      {vendors.length === 0 ? (
        <EmptyState
          icon="❤️"
          title="Wishlist kosong"
          description="Simpan vendor favorit kamu dari halaman explore"
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
        <div className="grid grid-cols-2 gap-3">
          {vendors.map((vendor: any) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </Container>
  )
}
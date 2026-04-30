import Link from 'next/link'
import { VendorCard } from '@/components/vendor/VendorCard'

// Data dummy dulu, nanti ganti fetch dari Supabase
const FEATURED_VENDORS = [
  {
    id: '1',
    business_name: 'Amelia Wedding Organizer',
    slug: 'amelia-wo',
    city: 'Banjarmasin',
    category: 'Wedding Organizer',
    avg_rating: 4.8,
    total_reviews: 12,
    whatsapp: '081234567890',
    image_url: null,
  },
  {
    id: '2',
    business_name: 'Bunga Dekorasi',
    slug: 'bunga-dekorasi',
    city: 'Samarinda',
    category: 'Dekorasi',
    avg_rating: 4.5,
    total_reviews: 8,
    whatsapp: '081234567891',
    image_url: null,
  },
  {
    id: '3',
    business_name: 'Chef Catering',
    slug: 'chef-catering',
    city: 'Pontianak',
    category: 'Katering',
    avg_rating: 4.9,
    total_reviews: 20,
    whatsapp: '081234567892',
    image_url: null,
  },
]

export function FeaturedVendors() {
  if (FEATURED_VENDORS.length === 0) return null

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-neutral-900">
          Vendor Unggulan
        </h2>
        <Link
          href="/explore?sort=rating"
          className="text-sm text-primary-500 font-semibold hover:text-primary-600"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {FEATURED_VENDORS.map((vendor) => (
          <div key={vendor.id} className="shrink-0 w-[280px]">
            <VendorCard vendor={vendor} />
          </div>
        ))}
      </div>
    </section>
  )
}
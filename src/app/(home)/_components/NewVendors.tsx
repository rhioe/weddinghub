import Link from 'next/link'
import { VendorCard } from '@/components/vendor/VendorCard'

// Data dummy dulu
const NEW_VENDORS = [
  {
    id: '4',
    business_name: 'Dewi MUA',
    slug: 'dewi-mua',
    city: 'Balikpapan',
    category: 'MUA & Kecantikan',
    avg_rating: 0,
    total_reviews: 0,
    whatsapp: '081234567893',
    image_url: null,
    featured: false,
    is_new: true,
  },
  {
    id: '5',
    business_name: 'Elegant Venue',
    slug: 'elegant-venue',
    city: 'Palangkaraya',
    category: 'Venue',
    avg_rating: 0,
    total_reviews: 0,
    whatsapp: '081234567894',
    image_url: null,
    featured: false,
    is_new: true,
  },
]

export function NewVendors() {
  if (NEW_VENDORS.length === 0) return null

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-neutral-900">
          Vendor Baru
        </h2>
        <Link
          href="/explore?sort=newest"
          className="text-sm text-primary-500 font-semibold hover:text-primary-600"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {NEW_VENDORS.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  )
}
import { Rating } from '@/components/vendor/Rating'
import { Badge } from '@/components/ui/Badge'
import { ContactButton } from '@/components/vendor/ContactButton'

interface VendorInfoProps {
  vendor: {
    business_name: string
    city: string
    description?: string | null
    avg_rating: number
    total_reviews: number
    verified: boolean
    featured: boolean
    whatsapp: string
  }
}

export function VendorInfo({ vendor }: VendorInfoProps) {
  return (
    <section className="space-y-3">
      {/* Badges */}
      <div className="flex gap-2">
        {vendor.verified && (
          <Badge variant="verified">Terverifikasi</Badge>
        )}
        {vendor.featured && (
          <Badge variant="featured">Unggulan</Badge>
        )}
      </div>

      {/* Name & location */}
      <div>
        <h1 className="text-xl font-bold text-neutral-900 font-display">
          {vendor.business_name}
        </h1>
        <p className="text-sm text-neutral-500 mt-1">📍 {vendor.city}</p>
      </div>

      {/* Rating */}
      <Rating
        value={vendor.avg_rating}
        size="md"
        showValue
      />
      {vendor.total_reviews > 0 && (
        <p className="text-xs text-neutral-400 -mt-2">
          ({vendor.total_reviews} review)
        </p>
      )}

      {/* Description */}
      {vendor.description && (
        <p className="text-sm text-neutral-700 leading-relaxed">
          {vendor.description}
        </p>
      )}

      {/* Contact */}
      <ContactButton whatsapp={vendor.whatsapp} />
    </section>
  )
}
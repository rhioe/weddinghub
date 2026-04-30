import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { Rating } from '@/components/vendor/Rating'
import { Badge } from '@/components/ui/Badge'

interface VendorCardData {
  id: string
  business_name: string
  slug: string
  city: string
  category: string
  avg_rating: number
  total_reviews: number
  image_url?: string | null
  featured?: boolean
  is_new?: boolean
}

interface VendorCardProps {
  vendor: VendorCardData
  className?: string
}

export function VendorCard({ vendor, className }: VendorCardProps) {
  return (
    <Link
      href={`/vendor/${vendor.slug}`}
      className={cn(
        'block bg-white rounded-lg shadow-card overflow-hidden transition-all hover:shadow-float active:scale-[0.98]',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {vendor.image_url ? (
          <img
            src={vendor.image_url}
            alt={vendor.business_name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-primary-50 to-secondary-50">
            💍
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {vendor.featured && (
            <Badge variant="featured">Unggulan</Badge>
          )}
          {vendor.is_new && (
            <Badge variant="new">Baru</Badge>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-neutral-900 text-sm line-clamp-1">
          {vendor.business_name}
        </h3>

        <p className="text-xs text-neutral-500 mt-0.5">
          {vendor.category} • {vendor.city}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <Rating value={vendor.avg_rating} size="sm" />
          {vendor.total_reviews > 0 && (
            <span className="text-xs text-neutral-400">
              ({vendor.total_reviews})
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
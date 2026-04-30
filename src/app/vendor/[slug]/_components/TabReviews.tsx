import { Rating } from '@/components/vendor/Rating'
import { EmptyState } from '@/components/ui/EmptyState'
import { Divider } from '@/components/ui/Divider'
import { Avatar } from '@/components/ui/Avatar'

interface Review {
  id: string
  rating: number
  comment?: string | null
  vendor_reply?: string | null
  created_at: string
  customer?: {
    full_name?: string | null
    avatar_url?: string | null
  } | null
}

interface TabReviewsProps {
  reviews: Review[]
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function TabReviews({ reviews }: TabReviewsProps) {
  if (reviews.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-bold text-neutral-900 mb-3">Review</h2>
        <EmptyState
          icon="⭐"
          title="Belum ada review"
          description="Jadilah yang pertama memberikan review!"
        />
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-lg font-bold text-neutral-900 mb-3">
        Review ({reviews.length})
      </h2>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={review.id}>
            <div className="flex gap-3">
              <Avatar
                src={review.customer?.avatar_url}
                fallback={review.customer?.full_name || 'User'}
                size="md"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-neutral-900">
                    {review.customer?.full_name || 'Pengguna'}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {formatDate(review.created_at)}
                  </span>
                </div>

                <Rating value={review.rating} size="sm" className="mt-1" />

                {review.comment && (
                  <p className="text-sm text-neutral-700 mt-2">
                    {review.comment}
                  </p>
                )}

                {/* Vendor reply */}
                {review.vendor_reply && (
                  <div className="mt-2 ml-2 pl-3 border-l-2 border-primary-200">
                    <p className="text-xs font-semibold text-primary-600 mb-1">
                      Balasan Vendor:
                    </p>
                    <p className="text-sm text-neutral-600">
                      {review.vendor_reply}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {index < reviews.length - 1 && <Divider className="mt-4" />}
          </div>
        ))}
      </div>
    </section>
  )
}
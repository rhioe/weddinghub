'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Rating } from '@/components/vendor/Rating'
import { createReview } from '@/lib/actions/review'
import { cn } from '@/lib/utils/cn'

interface ReviewFormProps {
  isOpen: boolean
  onClose: () => void
  inquiryId: string
  vendorId: string
  vendorSlug: string
  vendorName: string
}

export function ReviewForm({
  isOpen,
  onClose,
  inquiryId,
  vendorId,
  vendorSlug,
  vendorName,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (rating === 0) {
      setError('Pilih rating dulu')
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.set('inquiry_id', inquiryId)
    formData.set('vendor_id', vendorId)
    formData.set('rating', rating.toString())
    formData.set('comment', comment)
    formData.set('vendor_slug', vendorSlug)

    const result = await createReview(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 2000)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Beri Review" bottomSheet>
      {success ? (
        <div className="text-center py-8">
          <span className="text-5xl mb-4 block">⭐</span>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Review Terkirim!
          </h3>
          <p className="text-sm text-neutral-500">
            Terima kasih sudah memberikan review untuk {vendorName}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-neutral-500">
            Bagaimana pengalaman kamu dengan{' '}
            <span className="font-semibold text-neutral-900">{vendorName}</span>?
          </p>

          {/* Stars */}
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className={cn(
                  'text-3xl transition-colors',
                  (hoverRating || rating) >= star
                    ? 'text-accent-500'
                    : 'text-neutral-200'
                )}
              >
                ★
              </button>
            ))}
          </div>

          {/* Comment */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-neutral-700">
              Komentar
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Ceritakan pengalaman kamu..."
              maxLength={500}
              className="w-full rounded-md border border-neutral-200 px-3 py-2.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500 resize-none"
            />
            <p className="text-xs text-neutral-400">
              {comment.length}/500 karakter
            </p>
          </div>

          {error && (
            <div className="bg-error-50 text-error-700 text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" fullWidth loading={loading}>
            Kirim Review ⭐
          </Button>
        </form>
      )}
    </Modal>
  )
}
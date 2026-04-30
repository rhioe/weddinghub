'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import { reviewSchema } from '@/lib/validations/review'

export async function createReview(formData: FormData) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Harus login dulu' }
  }

  const data = {
    inquiry_id: formData.get('inquiry_id') as string,
    vendor_id: formData.get('vendor_id') as string,
    rating: Number(formData.get('rating')),
    comment: (formData.get('comment') as string) || null,
  }

  const validated = reviewSchema.safeParse(data)
  if (!validated.success) {
    return { error: validated.error.errors[0].message }
  }

  // Cek apakah inquiry ini deal/done
  const { data: inquiry } = await supabase
    .from('inquiries')
    .select('status')
    .eq('id', data.inquiry_id)
    .single()

  if (!inquiry || !['deal', 'done'].includes(inquiry.status)) {
    return { error: 'Hanya bisa review setelah deal' }
  }

  // Cek apakah sudah pernah review
  const { data: existing } = await supabase
    .from('reviews')
    .select('id')
    .eq('inquiry_id', data.inquiry_id)
    .single()

  if (existing) {
    return { error: 'Kamu sudah memberikan review' }
  }

  const { error } = await supabase
    .from('reviews')
    .insert({
      ...data,
      customer_id: user.id,
    })

  if (error) {
    console.error('Error creating review:', error)
    return { error: 'Gagal menyimpan review' }
  }

  revalidatePath(`/vendor/${formData.get('vendor_slug')}`)
  return { success: true }
}

export async function replyReview(reviewId: string, reply: string, vendorSlug: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Harus login dulu' }
  }

  const { error } = await supabase
    .from('reviews')
    .update({ vendor_reply: reply })
    .eq('id', reviewId)

  if (error) {
    console.error('Error replying review:', error)
    return { error: 'Gagal membalas review' }
  }

  revalidatePath(`/vendor/${vendorSlug}`)
  return { success: true }
}
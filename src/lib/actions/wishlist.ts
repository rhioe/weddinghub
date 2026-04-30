'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

export async function toggleWishlist(vendorId: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Harus login dulu' }
  }

  // Cek apakah sudah ada
  const { data: existing } = await supabase
    .from('wishlists')
    .select('id')
    .eq('customer_id', user.id)
    .eq('vendor_id', vendorId)
    .single()

  if (existing) {
    // Hapus dari wishlist
    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('id', existing.id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/profile/wishlist')
    return { success: true, action: 'removed' }
  }

  // Tambah ke wishlist
  const { error } = await supabase
    .from('wishlists')
    .insert({
      customer_id: user.id,
      vendor_id: vendorId,
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/profile/wishlist')
  return { success: true, action: 'added' }
}
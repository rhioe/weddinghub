'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import { inquirySchema } from '@/lib/validations/inquiry'

export async function createInquiry(formData: FormData) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Harus login dulu' }
  }

  const data = {
    vendor_id: formData.get('vendor_id') as string,
    package_id: (formData.get('package_id') as string) || null,
    wedding_date: (formData.get('wedding_date') as string) || null,
    budget: formData.get('budget') ? Number(formData.get('budget')) : null,
    location: (formData.get('location') as string) || null,
    message: (formData.get('message') as string) || null,
  }

  // Validasi
  const validated = inquirySchema.safeParse(data)
  if (!validated.success) {
    return { error: validated.error.issues[0].message }
  }

  // Cek apakah sudah pernah inquiry ke vendor yang sama (yang masih aktif)
  const { data: existing } = await supabase
    .from('inquiries')
    .select('id')
    .eq('customer_id', user.id)
    .eq('vendor_id', data.vendor_id)
    .in('status', ['pending', 'responded', 'negotiation'])
    .single()

  if (existing) {
    return { error: 'Kamu sudah punya inquiry aktif dengan vendor ini' }
  }

  const { error } = await supabase
    .from('inquiries')
    .insert({
      customer_id: user.id,
      ...data,
    })

  if (error) {
    console.error('Error creating inquiry:', error)
    return { error: 'Gagal mengirim inquiry' }
  }

  revalidatePath('/profile/inquiries')
  return { success: true }
}

export async function updateInquiryStatus(inquiryId: string, status: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Harus login dulu' }
  }

  const { error } = await supabase
    .from('inquiries')
    .update({ status })
    .eq('id', inquiryId)

  if (error) {
    console.error('Error updating inquiry:', error)
    return { error: 'Gagal update status' }
  }

  revalidatePath('/dashboard/vendor/inquiries')
  revalidatePath('/profile/inquiries')
  return { success: true }
}
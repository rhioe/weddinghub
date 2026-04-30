'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

export async function getInvitationByCode(code: string) {
  const supabase = await createServerClient()

  const { data } = await supabase
    .from('vendor_invitations')
    .select('*')
    .eq('invite_code', code)
    .eq('claimed', false)
    .single()

  return data
}

export async function claimInvitation(
  code: string,
  email: string,
  password: string
) {
  const supabase = await createServerClient()

  // Cek undangan
  const { data: invitation } = await supabase
    .from('vendor_invitations')
    .select('*')
    .eq('invite_code', code)
    .eq('claimed', false)
    .single()

  if (!invitation) {
    return { error: 'Undangan tidak valid atau sudah diklaim' }
  }

  // Register user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: 'Gagal mendaftarkan user' }
  }

  // Update role ke vendor
  await supabase
    .from('users')
    .update({ role: 'vendor' })
    .eq('id', authData.user.id)

  // Buat vendor profile
  const slug = invitation.business_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  await supabase
    .from('vendor_profiles')
    .insert({
      user_id: authData.user.id,
      business_name: invitation.business_name,
      slug,
      category_id: invitation.category_id,
      city: invitation.city || 'Banjarmasin',
      whatsapp: invitation.whatsapp,
    })

  // Tandai undangan diklaim
  const { error: updateError } = await supabase
    .from('vendor_invitations')
    .update({
      claimed: true,
      claimed_by: authData.user.id,
      claimed_at: new Date().toISOString(),
    })
    .eq('id', invitation.id)

  if (updateError) {
    console.error('Error claiming invitation:', updateError)
  }

  revalidatePath('/claim')
  return { success: true }
}
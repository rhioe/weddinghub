'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// ============================================
// VERIFIKASI PRODUK
// ============================================

export async function approveProduct(id: string, type: 'portfolio' | 'package') {
  const supabase = await createServerClient()
  const table = type === 'portfolio' ? 'portfolios' : 'packages'

  const { error } = await supabase
    .from(table)
    .update({ status: 'approved' })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/verify')
  return { success: true }
}

export async function rejectProduct(id: string, type: 'portfolio' | 'package', reason: string) {
  const supabase = await createServerClient()
  const table = type === 'portfolio' ? 'portfolios' : 'packages'

  const { error } = await supabase
    .from(table)
    .update({
      status: 'rejected',
      rejection_reason: reason,
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/verify')
  return { success: true }
}

// ============================================
// UNDANGAN VENDOR
// ============================================

export async function createVendorInvitation(data: {
  business_name: string
  whatsapp: string
  category_id?: string
  city?: string
}) {
  const supabase = await createServerClient()
  const adminClient = createAdminClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Harus login' }
  }

  const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase()

  const { error } = await adminClient
    .from('vendor_invitations')
    .insert({
      business_name: data.business_name,
      whatsapp: data.whatsapp,
      category_id: data.category_id || null,
      city: data.city || null,
      invite_code: inviteCode,
      created_by: user.id,
    } as any)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/invite')
  return {
    success: true,
    inviteCode,
    link: `/claim?code=${inviteCode}`,
  }
}

export async function getInvitations() {
  const supabase = await createServerClient()

  const { data } = await supabase
    .from('vendor_invitations')
    .select('*')
    .order('created_at', { ascending: false })

  return data || []
}

// ============================================
// LOG ADMIN
// ============================================

export async function logAdminAction(
  action: string,
  targetType?: string,
  targetId?: string,
  details?: any
) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  await supabase
    .from('admin_logs')
    .insert({
      admin_id: user.id,
      action,
      target_type: targetType || null,
      target_id: targetId || null,
      details: details || null,
    })
}

// ============================================
// SUSPEND USER
// ============================================

export async function suspendUser(userId: string) {
  const supabase = await createServerClient()

  // Cek admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Harus login' }
  }

  const { data: adminData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (adminData?.role !== 'admin') {
    return { error: 'Hanya admin' }
  }

  // Suspend: set is_active = false di vendor_profiles
  const { error } = await supabase
    .from('vendor_profiles')
    .update({ is_active: false })
    .eq('user_id', userId)

  if (error) {
    return { error: error.message }
  }

  await logAdminAction('suspend_user', 'users', userId)
  revalidatePath('/admin/users')
  return { success: true }
}
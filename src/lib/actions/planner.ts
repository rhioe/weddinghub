'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

export async function updateWeddingDate(date: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Harus login dulu' }
  }

  // Update date di semua checklist user
  const { error } = await supabase
    .from('user_checklists')
    .update({ wedding_date: date })
    .eq('user_id', user.id)
    .is('wedding_date', null)

  if (error) {
    console.error('Error updating wedding date:', error)
    return { error: 'Gagal update tanggal' }
  }

  revalidatePath('/wedding-planner')
  return { success: true }
}

export async function addChecklistItem(title: string, weddingDate?: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Harus login dulu' }
  }

  const { error } = await supabase
    .from('user_checklists')
    .insert({
      user_id: user.id,
      title,
      wedding_date: weddingDate || null,
    })

  if (error) {
    console.error('Error adding checklist:', error)
    return { error: 'Gagal menambah checklist' }
  }

  revalidatePath('/wedding-planner')
  return { success: true }
}

export async function toggleChecklistItem(id: string, isCompleted: boolean) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Harus login dulu' }
  }

  const { error } = await supabase
    .from('user_checklists')
    .update({
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error toggling checklist:', error)
    return { error: 'Gagal update checklist' }
  }

  revalidatePath('/wedding-planner')
  return { success: true }
}

export async function deleteChecklistItem(id: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Harus login dulu' }
  }

  const { error } = await supabase
    .from('user_checklists')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting checklist:', error)
    return { error: 'Gagal menghapus checklist' }
  }

  revalidatePath('/wedding-planner')
  return { success: true }
}
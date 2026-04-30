'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { createClient } from '@/lib/supabase/client'

export default function EditProfilePage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase
          .from('users')
          .select('full_name, phone')
          .eq('id', user.id)
          .single()

        if (data) {
          setFullName(data.full_name || '')
          setPhone(data.phone || '')
        }
      }
    }

    loadProfile()
  }, [supabase])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError('Harus login')
      setLoading(false)
      return
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({
        full_name: fullName,
        phone: phone || null,
      })
      .eq('id', user.id)

    if (updateError) {
      setError(updateError.message)
    } else {
      setSuccess('Profil berhasil disimpan!')
      setTimeout(() => router.push('/profile'), 1500)
    }

    setLoading(false)
  }

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">Edit Profil</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nama Lengkap"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nama kamu"
          required
        />

        <Input
          label="Nomor HP"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="081234567890"
          hint="Opsional"
        />

        {error && (
          <div className="bg-error-50 text-error-700 text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-success-50 text-success-700 text-sm p-3 rounded-md">
            {success}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            fullWidth
          >
            Batal
          </Button>
          <Button type="submit" fullWidth loading={loading}>
            Simpan
          </Button>
        </div>
      </form>
    </Container>
  )
}
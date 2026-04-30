'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createClient } from '@/lib/supabase/client'

function ClaimPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const code = searchParams.get('code') || ''

  const [invitation, setInvitation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function loadInvitation() {
      if (!code) {
        setError('Kode undangan tidak ditemukan')
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('vendor_invitations')
        .select('*')
        .eq('invite_code', code)
        .eq('claimed', false)
        .single()

      if (!data) {
        setError('Undangan tidak valid atau sudah diklaim')
        setLoading(false)
        return
      }

      setInvitation(data)
      setLoading(false)
    }

    loadInvitation()
  }, [code, supabase])

  async function handleClaim(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    if (!email || !password) {
      setError('Email dan password wajib diisi')
      setSubmitting(false)
      return
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      setSubmitting(false)
      return
    }

    // Register user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setSubmitting(false)
      return
    }

    if (!authData.user) {
      setError('Gagal mendaftarkan user')
      setSubmitting(false)
      return
    }

    // Update role ke vendor
    await supabase
      .from('users')
      .update({ role: 'vendor' })
      .eq('id', authData.user.id)

    // Buat vendor profile
    await supabase
      .from('vendor_profiles')
      .insert({
        user_id: authData.user.id,
        business_name: invitation.business_name,
        slug: invitation.business_name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
        category_id: invitation.category_id,
        city: invitation.city || 'Banjarmasin',
        whatsapp: invitation.whatsapp,
      })

    // Tandai undangan sebagai diklaim
    await supabase
      .from('vendor_invitations')
      .update({
        claimed: true,
        claimed_by: authData.user.id,
        claimed_at: new Date().toISOString(),
      })
      .eq('id', invitation.id)

    router.push('/dashboard/vendor')
  }

  if (loading) {
    return (
      <Container className="py-12 text-center">
        <p className="text-neutral-500">Memeriksa undangan...</p>
      </Container>
    )
  }

  if (error && !invitation) {
    return (
      <Container className="py-12 text-center">
        <span className="text-5xl mb-4 block">❌</span>
        <h2 className="text-lg font-semibold text-neutral-900 mb-2">
          Undangan Tidak Valid
        </h2>
        <p className="text-sm text-neutral-500">{error}</p>
      </Container>
    )
  }

  return (
    <Container className="py-6">
      <div className="text-center mb-6">
        <span className="text-5xl mb-4 block">🎉</span>
        <h1 className="text-xl font-bold text-neutral-900">
          Klaim Akun Vendor
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Anda diundang sebagai vendor WeddingHub
        </p>
      </div>

      {/* Info undangan */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-primary-700">
          {invitation.business_name}
        </h3>
        <p className="text-sm text-primary-600">
          📱 {invitation.whatsapp}
        </p>
        {invitation.city && (
          <p className="text-sm text-primary-600">
            📍 {invitation.city}
          </p>
        )}
      </div>

      {/* Form klaim */}
      <form onSubmit={handleClaim} className="space-y-4">
        <p className="text-sm text-neutral-600">
          Lengkapi data berikut untuk mengklaim akun:
        </p>

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vendor@email.com"
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimal 6 karakter"
          required
        />

        {error && (
          <div className="bg-error-50 text-error-700 text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <Button type="submit" fullWidth loading={submitting}>
          Klaim Akun & Mulai
        </Button>
      </form>
    </Container>
  )
}

export default function ClaimPage() {
  return (
    <Suspense fallback={
      <Container className="py-12 text-center">
        <p className="text-neutral-500">Loading...</p>
      </Container>
    }>
      <ClaimPageContent />
    </Suspense>
  )
}
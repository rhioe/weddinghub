'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { CATEGORIES, CITIES } from '@/lib/constants'
import { createClient } from '@/lib/supabase/client'

export default function InviteVendorPage() {
  const supabase = createClient()

  const [businessName, setBusinessName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [inviteLink, setInviteLink] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setInviteLink('')

    if (!businessName.trim() || !whatsapp.trim()) {
      setError('Nama bisnis dan nomor WA wajib diisi')
      return
    }

    setLoading(true)

    // Generate invite code
    const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError('Harus login admin')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('vendor_invitations')
      .insert({
        business_name: businessName.trim(),
        whatsapp: whatsapp.trim(),
        category_id: category || null,
        city: city || null,
        invite_code: inviteCode,
        created_by: user.id,
      })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    const link = `${window.location.origin}/claim?code=${inviteCode}`
    setInviteLink(link)
    setSuccess('Undangan berhasil dibuat!')
    setBusinessName('')
    setWhatsapp('')
    setCategory('')
    setCity('')
    setLoading(false)
  }

  async function copyLink() {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        Undang Vendor
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-neutral-200 rounded-lg p-4">
        <Input
          label="Nama Bisnis"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Contoh: Amelia Wedding Organizer"
          required
        />

        <Input
          label="Nomor WhatsApp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="081234567890"
          required
        />

        {/* Category */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700">
            Kategori (opsional)
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-neutral-200 px-3 py-2.5 text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
          >
            <option value="">Pilih kategori</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700">
            Kota (opsional)
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-md border border-neutral-200 px-3 py-2.5 text-base text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
          >
            <option value="">Pilih kota</option>
            {CITIES.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

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

        <Button type="submit" fullWidth loading={loading}>
          Buat Link Undangan
        </Button>
      </form>

      {/* Invite link */}
      {inviteLink && (
        <div className="mt-6 bg-white border border-success-200 rounded-lg p-4">
          <h3 className="font-semibold text-success-700 mb-2">
            ✅ Link Undangan
          </h3>
          <p className="text-sm text-neutral-600 mb-3">
            Bagikan link ini ke vendor:
          </p>
          <div className="flex gap-2">
            <input
              readOnly
              value={inviteLink}
              className="flex-1 text-sm bg-neutral-50 border border-neutral-200 rounded-md px-3 py-2"
            />
            <Button onClick={copyLink} size="sm">
              {copied ? '✓' : 'Copy'}
            </Button>
          </div>
          <p className="text-xs text-neutral-400 mt-2">
            Vendor akan diminta mengisi email & password untuk klaim akun
          </p>
        </div>
      )}
    </Container>
  )
}
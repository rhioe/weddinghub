'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createClient } from '@/lib/supabase/client'

export default function CreatePackagePage() {
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Nama paket wajib diisi')
      return
    }

    const priceNum = Number(price.replace(/\D/g, ''))
    if (!priceNum || priceNum <= 0) {
      setError('Harga tidak valid')
      return
    }

    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError('Harus login')
      setLoading(false)
      return
    }

    const { data: vendor } = await supabase
      .from('vendor_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!vendor) {
      setError('Profil vendor tidak ditemukan')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('packages')
      .insert({
        vendor_id: vendor.id,
        name: name.trim(),
        price: priceNum,
        description: description || null,
        details: details || null,
      })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/vendor/packages')
    router.refresh()
  }

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        Buat Paket Baru
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nama Paket"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Paket Silver"
          required
        />

        <Input
          label="Harga (Rp)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Contoh: 5000000"
          hint="Masukkan angka"
          required
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700">
            Deskripsi
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Deskripsi singkat paket..."
            className="w-full rounded-md border border-neutral-200 px-3 py-2.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500 resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700">
            Detail Paket
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={5}
            placeholder="Rincian paket (satu baris per item)...&#10;- Item 1&#10;- Item 2"
            className="w-full rounded-md border border-neutral-200 px-3 py-2.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500 resize-none"
          />
          <p className="text-xs text-neutral-400">
            Gunakan baris baru untuk setiap item
          </p>
        </div>

        {error && (
          <div className="bg-error-50 text-error-700 text-sm p-3 rounded-md">
            {error}
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
            Simpan Paket
          </Button>
        </div>
      </form>
    </Container>
  )
}
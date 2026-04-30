'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createClient } from '@/lib/supabase/client'

export default function UploadPortfolioPage() {
  const router = useRouter()
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [files, setFiles] = useState<File[]>([])
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [previews, setPreviews] = useState<string[]>([])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    
    // Validasi tipe file
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    const invalid = selected.filter((f) => !allowed.includes(f.type))
    
    if (invalid.length > 0) {
      setError('Hanya file JPG, PNG, dan WebP yang diizinkan')
      return
    }

    // Validasi ukuran (max 5MB per file)
    const oversized = selected.filter((f) => f.size > 5 * 1024 * 1024)
    if (oversized.length > 0) {
      setError('Ukuran file maksimal 5MB')
      return
    }

    setFiles(selected)
    setError('')

    // Generate previews
    const urls = selected.map((f) => URL.createObjectURL(f))
    setPreviews(urls)
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Pilih file dulu')
      return
    }

    setUploading(true)
    setError('')

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError('Harus login')
        setUploading(false)
        return
      }

      // Dapatkan vendor_id
      const { data: vendor } = await supabase
        .from('vendor_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (!vendor) {
        setError('Profil vendor tidak ditemukan')
        setUploading(false)
        return
      }

      // Upload satu per satu
      for (const file of files) {
        const fileName = `${vendor.id}/${Date.now()}-${file.name}`
        
        const { error: uploadError } = await supabase.storage
          .from('portfolios')
          .upload(fileName, file)

        if (uploadError) {
          setError(`Gagal upload ${file.name}: ${uploadError.message}`)
          setUploading(false)
          return
        }

        // Dapatkan URL publik
        const { data: urlData } = supabase.storage
          .from('portfolios')
          .getPublicUrl(fileName)

        // Simpan ke database
        const { error: dbError } = await supabase
          .from('portfolios')
          .insert({
            vendor_id: vendor.id,
            image_url: urlData.publicUrl,
            caption: caption || null,
            file_size: file.size,
          })

        if (dbError) {
          setError(`Gagal menyimpan ${file.name}`)
          setUploading(false)
          return
        }
      }

      router.push('/dashboard/vendor/portfolio')
      router.refresh()
    } catch (err) {
      setError('Terjadi kesalahan')
      setUploading(false)
    }
  }

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        Upload Portofolio
      </h1>

      <div className="space-y-4">
        {/* File input */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-400 transition-colors"
        >
          <span className="text-4xl mb-2 block">📸</span>
          <p className="text-neutral-600">
            Klik untuk pilih foto
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            JPG, PNG, WebP • Maks 5MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Preview */}
        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {previews.map((url, index) => (
              <div key={index} className="aspect-square bg-neutral-100 rounded-md overflow-hidden">
                <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Caption */}
        <Input
          label="Caption (opsional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Deskripsi foto..."
        />

        {error && (
          <div className="bg-error-50 text-error-700 text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()} fullWidth>
            Batal
          </Button>
          <Button
            onClick={handleUpload}
            fullWidth
            loading={uploading}
            disabled={files.length === 0}
          >
            Upload {files.length > 0 ? `(${files.length} file)` : ''}
          </Button>
        </div>
      </div>
    </Container>
  )
}
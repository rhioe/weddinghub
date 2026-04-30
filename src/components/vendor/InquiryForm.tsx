'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createInquiry } from '@/lib/actions/inquiry'

interface InquiryFormProps {
  vendor: {
    id: string
    business_name: string
  }
  isOpen: boolean
  onClose: () => void
  packageId?: string
}

export function InquiryForm({
  vendor,
  isOpen,
  onClose,
  packageId,
}: InquiryFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.set('vendor_id', vendor.id)
    if (packageId) {
      formData.set('package_id', packageId)
    }

    const result = await createInquiry(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 2000)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Kirim Inquiry" bottomSheet>
      {success ? (
        <div className="text-center py-8">
          <span className="text-5xl mb-4 block">✅</span>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Inquiry Terkirim!
          </h3>
          <p className="text-sm text-neutral-500">
            Vendor akan merespon inquiry kamu segera
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="vendor_id" value={vendor.id} />

          <p className="text-sm text-neutral-500">
            Kirim inquiry ke{' '}
            <span className="font-semibold text-neutral-900">
              {vendor.business_name}
            </span>
          </p>

          <Input
            label="Tanggal Pernikahan"
            name="wedding_date"
            type="date"
            hint="Opsional"
          />

          <Input
            label="Budget (Rp)"
            name="budget"
            type="number"
            placeholder="Contoh: 50000000"
            hint="Opsional"
          />

          <Input
            label="Lokasi Acara"
            name="location"
            type="text"
            placeholder="Contoh: Gedung Serbaguna Banjarmasin"
            hint="Opsional"
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-neutral-700">
              Pesan
            </label>
            <textarea
              name="message"
              rows={3}
              placeholder="Ceritakan kebutuhan kamu..."
              maxLength={500}
              className="w-full rounded-md border border-neutral-200 px-3 py-2.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500 resize-none"
            />
            <p className="text-xs text-neutral-400">Maksimal 500 karakter</p>
          </div>

          {error && (
            <div className="bg-error-50 text-error-700 text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" fullWidth loading={loading}>
            Kirim Inquiry
          </Button>
        </form>
      )}
    </Modal>
  )
}
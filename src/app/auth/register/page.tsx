'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { register } from '@/lib/actions/auth'
import { registerSchema } from '@/lib/validations/auth'

export default function RegisterPage() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setServerError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    // Validasi Zod
    const result = registerSchema.safeParse(data)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      setLoading(false)
      return
    }

    // Submit
    const serverResult = await register(formData)

    if (serverResult?.error) {
      setServerError(serverResult.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">💍</span>
            <span className="text-2xl font-bold font-display text-primary-500">
              WeddingHub
            </span>
          </Link>
          <p className="text-neutral-500 mt-2">Buat akun gratis</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama Lengkap"
            name="full_name"
            type="text"
            placeholder="Calon Pengantin"
            error={errors.full_name}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="nama@email.com"
            error={errors.email}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Minimal 6 karakter"
            error={errors.password}
            required
          />

          <Input
            label="Konfirmasi Password"
            name="confirm_password"
            type="password"
            placeholder="Ulangi password"
            error={errors.confirm_password}
            required
          />

          {serverError && (
            <div className="bg-error-50 text-error-700 text-sm p-3 rounded-md">
              {serverError}
            </div>
          )}

          <Button type="submit" fullWidth loading={loading}>
            Daftar
          </Button>
        </form>

        {/* Login link */}
        <p className="text-center mt-6 text-sm text-neutral-500">
          Sudah punya akun?{' '}
          <Link
            href="/auth/login"
            className="text-primary-500 font-semibold hover:text-primary-600"
          >
            Masuk
          </Link>
        </p>
      </div>
    </div>
  )
}
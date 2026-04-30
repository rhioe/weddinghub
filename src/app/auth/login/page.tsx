'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { login } from '@/lib/actions/auth'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await login(formData)

    if (result?.error) {
      setError(result.error)
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
          <p className="text-neutral-500 mt-2">Masuk untuk lanjut</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="nama@email.com"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Minimal 6 karakter"
            required
          />

          {error && (
            <div className="bg-error-50 text-error-700 text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" fullWidth loading={loading}>
            Masuk
          </Button>
        </form>

        {/* Register link */}
        <p className="text-center mt-6 text-sm text-neutral-500">
          Belum punya akun?{' '}
          <Link
            href="/auth/register"
            className="text-primary-500 font-semibold hover:text-primary-600"
          >
            Daftar gratis
          </Link>
        </p>
      </div>
    </div>
  )
}
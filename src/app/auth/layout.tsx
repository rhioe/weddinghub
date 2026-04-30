import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Masuk / Daftar',
    template: '%s | WeddingHub',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {children}
    </div>
  )
}
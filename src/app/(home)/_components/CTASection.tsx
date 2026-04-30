import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl p-6 md:p-8 text-white text-center">
      <span className="text-4xl mb-3 block">🚀</span>
      <h2 className="text-xl md:text-2xl font-bold font-display mb-2">
        Punya Bisnis Wedding?
      </h2>
      <p className="text-white/80 text-sm md:text-base mb-6 max-w-md mx-auto">
        Dapatkan pelanggan baru dari WeddingHub. Gratis daftar, langsung jangkau calon pengantin di Kalimantan!
      </p>
      <Link href="/auth/register">
        <Button
          variant="secondary"
          size="lg"
          className="bg-white text-primary-600 hover:bg-neutral-100"
        >
          Jadi Vendor Sekarang
        </Button>
      </Link>
    </section>
  )
}
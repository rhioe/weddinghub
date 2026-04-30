import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
    return (
        <Container className="py-16 text-center">
            <span className="text-6xl mb-6 block">🔍</span>
            <h1 className="text-2xl font-bold text-neutral-900 mb-3">
                Halaman Tidak Ditemukan
            </h1>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
            </p>
            <div className="flex gap-3 justify-center">
                <Link href="/">
                    <Button>🏠 Kembali ke Beranda</Button>
                </Link>
                <Link href="/explore">
                    <Button variant="outline">🔍 Cari Vendor</Button>
                </Link>
            </div>
        </Container>
    )
}
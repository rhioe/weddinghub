'use client'

import { useEffect } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Unhandled error:', error)
    }, [error])

    return (
        <Container className="py-16 text-center">
            <span className="text-6xl mb-6 block">⚠️</span>
            <h1 className="text-2xl font-bold text-neutral-900 mb-3">
                Ups, Terjadi Kesalahan
            </h1>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                Maaf, ada masalah teknis. Coba refresh halaman atau kembali ke beranda.
            </p>
            <div className="flex gap-3 justify-center">
                <Button onClick={reset}>🔄 Coba Lagi</Button>
                <Button
                    variant="outline"
                    onClick={() => (window.location.href = '/')}
                >
                    🏠 Ke Beranda
                </Button>
            </div>
        </Container>
    )
}
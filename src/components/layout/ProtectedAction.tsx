'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

interface ProtectedActionProps {
  children: React.ReactNode
  isLoggedIn: boolean
  actionLabel?: string
}

export function ProtectedAction({
  children,
  isLoggedIn,
  actionLabel = 'akses fitur ini',
}: ProtectedActionProps) {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault()
      e.stopPropagation()
      setShowModal(true)
    }
  }

  return (
    <>
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="🔐 Login Dulu Yuk!"
        bottomSheet
      >
        <div className="text-center">
          <p className="text-neutral-600 mb-6">
            Kamu harus login untuk {actionLabel}. Login gratis kok, cuma butuh email!
          </p>

          <div className="flex flex-col gap-3">
            <Button
              fullWidth
              onClick={() => {
                setShowModal(false)
                router.push('/auth/login')
              }}
            >
              Masuk Sekarang
            </Button>

            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                setShowModal(false)
                router.push('/auth/register')
              }}
            >
              Belum Punya Akun? Daftar
            </Button>

            <button
              onClick={() => setShowModal(false)}
              className="text-sm text-neutral-400 hover:text-neutral-600 mt-2"
            >
              Nanti aja
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
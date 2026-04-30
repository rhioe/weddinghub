'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createClient } from '@/lib/supabase/client'

interface AdminVerifyActionsProps {
  id: string
  type: 'portfolio' | 'package'
  vendorName?: string
}

export function AdminVerifyActions({
  id,
  type,
  vendorName,
}: AdminVerifyActionsProps) {
  const router = useRouter()
  const supabase = createClient()

  const [rejecting, setRejecting] = useState(false)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const table = type === 'portfolio' ? 'portfolios' : 'packages'

  async function handleApprove() {
    setLoading(true)
    const { error } = await supabase
      .from(table)
      .update({ status: 'approved' })
      .eq('id', id)

    if (!error) {
      router.refresh()
    }
    setLoading(false)
  }

  async function handleReject() {
    if (!reason.trim()) return

    setLoading(true)
    const { error } = await supabase
      .from(table)
      .update({
        status: 'rejected',
        rejection_reason: reason.trim(),
      })
      .eq('id', id)

    if (!error) {
      router.refresh()
      setRejecting(false)
      setReason('')
    }
    setLoading(false)
  }

  return (
    <div className="mt-3">
      {rejecting ? (
        <div className="space-y-2">
          <Input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Alasan penolakan..."
          />
          <div className="flex gap-2">
            <Button onClick={handleReject} size="sm" loading={loading} disabled={!reason.trim()}>
              Tolak
            </Button>
            <Button
              onClick={() => setRejecting(false)}
              variant="ghost"
              size="sm"
            >
              Batal
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button onClick={handleApprove} size="sm" loading={loading}>
            ✅ Approve
          </Button>
          <Button
            onClick={() => setRejecting(true)}
            variant="outline"
            size="sm"
          >
            ❌ Tolak
          </Button>
        </div>
      )}
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface BudgetTrackerProps {
  userId: string
}

export function BudgetTracker({ userId }: BudgetTrackerProps) {
  const [totalBudget, setTotalBudget] = useState(50000000)
  const [spent, setSpent] = useState(15000000)
  const [editing, setEditing] = useState(false)
  const [newBudget, setNewBudget] = useState(totalBudget.toString())

  const remaining = totalBudget - spent
  const percentage = Math.round((spent / totalBudget) * 100)

  const handleSave = () => {
    const value = Number(newBudget.replace(/\D/g, ''))
    if (value > 0) {
      setTotalBudget(value)
      setEditing(false)
    }
  }

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num)

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-neutral-900">💰 Budget</h3>
        <button
          onClick={() => {
            setNewBudget(totalBudget.toString())
            setEditing(!editing)
          }}
          className="text-xs text-primary-500 hover:text-primary-600"
        >
          {editing ? 'Batal' : '✏️ Edit'}
        </button>
      </div>

      {editing ? (
        <div className="space-y-3">
          <Input
            label="Total Budget"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            placeholder="50000000"
            hint="Masukkan angka tanpa titik"
          />
          <Button onClick={handleSave} size="sm">
            Simpan Budget
          </Button>
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold text-primary-600">
            {formatRupiah(totalBudget)}
          </p>

          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-neutral-500">
                Terpakai: {formatRupiah(spent)}
              </span>
              <span className="text-neutral-500">
                Sisa: {formatRupiah(remaining)}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-neutral-400 mt-1">{percentage}% terpakai</p>
          </div>
        </>
      )}
    </div>
  )
}
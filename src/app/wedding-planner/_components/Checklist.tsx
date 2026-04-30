'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface ChecklistItem {
  id: string
  title: string
  is_completed: boolean
  completed_at: string | null
}

interface ChecklistProps {
  userId: string
  items: ChecklistItem[]
}

export function Checklist({ userId, items: initialItems }: ChecklistProps) {
  const [items, setItems] = useState(initialItems)
  const [newTitle, setNewTitle] = useState('')
  const [adding, setAdding] = useState(false)

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              is_completed: !item.is_completed,
              completed_at: !item.is_completed ? new Date().toISOString() : null,
            }
          : item
      )
    )
  }

  const addItem = () => {
    if (!newTitle.trim()) return

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      is_completed: false,
      completed_at: null,
    }

    setItems((prev) => [...prev, newItem])
    setNewTitle('')
    setAdding(false)
  }

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const completedCount = items.filter((i) => i.is_completed).length
  const progress =
    items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-neutral-900">✅ Checklist</h3>
        <button
          onClick={() => setAdding(!adding)}
          className="text-xs text-primary-500 hover:text-primary-600"
        >
          + Tambah
        </button>
      </div>

      {/* Progress */}
      {items.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-500">
              {completedCount}/{items.length} selesai
            </span>
            <span className="text-primary-600 font-medium">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-success-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Add form */}
      {adding && (
        <div className="flex gap-2 mb-3">
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Tambah checklist..."
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
          />
          <Button onClick={addItem} size="sm">
            ✓
          </Button>
        </div>
      )}

      {/* Items */}
      <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
        {items.length === 0 && !adding ? (
          <p className="text-sm text-neutral-400 text-center py-4">
            Belum ada checklist. Tambah sekarang!
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex items-center gap-3 px-2 py-2 rounded-md transition-colors hover:bg-neutral-50',
                item.is_completed && 'opacity-60'
              )}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                  item.is_completed
                    ? 'bg-success-500 border-success-500 text-white'
                    : 'border-neutral-300 hover:border-primary-400'
                )}
              >
                {item.is_completed && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>

              <span
                className={cn(
                  'flex-1 text-sm',
                  item.is_completed
                    ? 'line-through text-neutral-400'
                    : 'text-neutral-900'
                )}
              >
                {item.title}
              </span>

              <button
                onClick={() => deleteItem(item.id)}
                className="text-neutral-300 hover:text-error-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
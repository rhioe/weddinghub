'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface CountdownCardProps {
  weddingDate: string | null
}

export function CountdownCard({ weddingDate }: CountdownCardProps) {
  const [date, setDate] = useState(weddingDate)
  const [editing, setEditing] = useState(false)
  const [newDate, setNewDate] = useState(date || '')
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  useEffect(() => {
    if (!date) return

    const timer = setInterval(() => {
      const now = new Date()
      const wedding = new Date(date)
      const diff = wedding.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [date])

  const handleSave = async () => {
    // Update date di database (nanti di task 88)
    setDate(newDate)
    setEditing(false)
  }

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl p-6 text-white">
      {editing ? (
        <div className="space-y-3">
          <h3 className="font-semibold">Atur Tanggal Pernikahan</h3>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full rounded-md px-3 py-2 text-neutral-900"
            min={new Date().toISOString().split('T')[0]}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="bg-white text-primary-600 hover:bg-neutral-100"
              size="sm"
            >
              Simpan
            </Button>
            <Button
              onClick={() => setEditing(false)}
              variant="ghost"
              className="text-white hover:bg-white/10"
              size="sm"
            >
              Batal
            </Button>
          </div>
        </div>
      ) : date ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white/80">
              🎯 Menuju Hari Bahagia
            </h3>
            <button
              onClick={() => {
                setNewDate(date)
                setEditing(true)
              }}
              className="text-xs text-white/70 hover:text-white"
            >
              ✏️ Edit
            </button>
          </div>

          <p className="text-sm text-white/70 mb-3">
            {new Date(date).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {timeLeft && (
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Hari', value: timeLeft.days },
                { label: 'Jam', value: timeLeft.hours },
                { label: 'Menit', value: timeLeft.minutes },
                { label: 'Detik', value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/20 rounded-lg p-2 text-center"
                >
                  <span className="block text-2xl font-bold">
                    {item.value}
                  </span>
                  <span className="text-xs text-white/70">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h3 className="font-semibold mb-2">📅 Belum ada tanggal</h3>
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-white/80 hover:text-white underline"
          >
            Atur tanggal pernikahan
          </button>
        </div>
      )}
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { CITIES } from '@/lib/constants'
import { cn } from '@/lib/utils/cn'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  selectedCity: string
  onApply: (city: string) => void
}

export function FilterModal({
  isOpen,
  onClose,
  selectedCity,
  onApply,
}: FilterModalProps) {
  const [city, setCity] = useState(selectedCity)

  const handleApply = () => {
    onApply(city)
    onClose()
  }

  const handleReset = () => {
    setCity('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter" bottomSheet>
      <div className="space-y-5">
        {/* City filter */}
        <div>
          <h4 className="text-sm font-semibold text-neutral-900 mb-2">
            Kota
          </h4>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCity(city === c.slug ? '' : c.slug)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm border transition-colors',
                  city === c.slug
                    ? 'bg-primary-50 text-primary-600 border-primary-300'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary-300'
                )}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={handleReset} fullWidth>
            Reset
          </Button>
          <Button onClick={handleApply} fullWidth>
            Terapkan
          </Button>
        </div>
      </div>
    </Modal>
  )
}
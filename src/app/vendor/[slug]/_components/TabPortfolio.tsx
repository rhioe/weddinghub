'use client'

import { useState } from 'react'
import { EmptyState } from '@/components/ui/EmptyState'

interface PortfolioImage {
  id: string
  image_url: string
  caption?: string | null
}

interface TabPortfolioProps {
  portfolios: PortfolioImage[]
}

export function TabPortfolio({ portfolios }: TabPortfolioProps) {
  const [selected, setSelected] = useState<PortfolioImage | null>(null)

  if (portfolios.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-bold text-neutral-900 mb-3">Portofolio</h2>
        <EmptyState
          icon="📸"
          title="Belum ada portofolio"
          description="Vendor ini belum mengunggah foto portofolio"
        />
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-lg font-bold text-neutral-900 mb-3">
        Portofolio ({portfolios.length})
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {portfolios.map((img) => (
          <button
            key={img.id}
            onClick={() => setSelected(img)}
            className="aspect-square bg-neutral-100 rounded-md overflow-hidden hover:opacity-90 transition-opacity"
          >
            <img
              src={img.image_url}
              alt={img.caption || 'Portofolio'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-[var(--z-modal)] bg-black/80 flex items-center justify-center p-4"
        >
          <div className="max-w-2xl w-full">
            <img
              src={selected.image_url}
              alt={selected.caption || 'Portofolio'}
              className="w-full rounded-lg"
            />
            {selected.caption && (
              <p className="text-white text-center mt-3 text-sm">
                {selected.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
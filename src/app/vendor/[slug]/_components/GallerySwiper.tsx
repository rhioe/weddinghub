'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface GalleryImage {
  id: string
  image_url: string
  caption?: string | null
}

interface GallerySwiperProps {
  images: GalleryImage[]
}

export function GallerySwiper({ images }: GallerySwiperProps) {
  const [current, setCurrent] = useState(0)

  const goTo = (index: number) => {
    setCurrent(index)
  }

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center text-6xl">
        💍
      </div>
    )
  }

  return (
    <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current].image_url}
          alt={images[current].caption || `Foto ${current + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            ‹
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-all',
                index === current
                  ? 'bg-white w-4'
                  : 'bg-white/50'
              )}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
        {current + 1} / {images.length}
      </div>
    </div>
  )
}
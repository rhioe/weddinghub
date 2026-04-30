'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const SLIDES = [
  {
    id: 1,
    title: 'Wujudkan Pernikahan Impianmu',
    subtitle: 'Temukan vendor wedding terbaik di Kalimantan',
    cta: 'Jelajahi Vendor',
    href: '/explore',
    bg: 'from-primary-500 to-primary-700',
    emoji: '💒',
  },
  {
    id: 2,
    title: 'Vendor Wedding Terpercaya',
    subtitle: 'Venue, katering, MUA, dekorasi & banyak lagi',
    cta: 'Lihat Kategori',
    href: '/explore',
    bg: 'from-accent-500 to-accent-700',
    emoji: '🌸',
  },
  {
    id: 3,
    title: 'Punya Bisnis Wedding?',
    subtitle: 'Gabung jadi vendor dan dapatkan pelanggan baru',
    cta: 'Jadi Vendor',
    href: '/auth/register',
    bg: 'from-secondary-400 to-secondary-600',
    emoji: '🚀',
  },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className={`bg-gradient-to-r ${SLIDES[current].bg} p-6 md:p-10 min-h-[280px] md:min-h-[320px] flex items-center`}
        >
          <div className="flex-1 text-white">
            <span className="text-4xl md:text-5xl mb-4 block">
              {SLIDES[current].emoji}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-display mb-2">
              {SLIDES[current].title}
            </h2>
            <p className="text-white/80 text-sm md:text-base mb-6 max-w-md">
              {SLIDES[current].subtitle}
            </p>
            <Link href={SLIDES[current].href}>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-neutral-100"
              >
                {SLIDES[current].cta}
              </Button>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current
                ? 'bg-white w-6'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
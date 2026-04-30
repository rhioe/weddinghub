'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

export function Header() {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  const isTransparent = pathname === '/'

  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--z-header)] transition-colors duration-300',
        isTransparent
          ? 'bg-transparent absolute w-full'
          : 'bg-white shadow-sm border-b border-neutral-100'
      )}
    >
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">💍</span>
          <span
            className={cn(
              'text-lg font-bold font-display',
              isTransparent ? 'text-white' : 'text-primary-500'
            )}
          >
            WeddingHub
          </span>
        </Link>

        {/* Search bar - desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Cari vendor wedding..."
              className="w-full rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search button - mobile */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 rounded-full text-neutral-600 hover:bg-neutral-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          {/* Login button */}
          <Link
            href="/auth/login"
            className={cn(
              'px-4 py-2 rounded-full text-sm font-semibold transition-colors',
              isTransparent
                ? 'bg-white text-primary-500 hover:bg-neutral-100'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            )}
          >
            Masuk
          </Link>
        </div>
      </div>

      {/* Mobile search - expand */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 bg-white border-b border-neutral-100">
          <input
            type="text"
            placeholder="Cari vendor wedding..."
            autoFocus
            className="w-full rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
      )}
    </header>
  )
}
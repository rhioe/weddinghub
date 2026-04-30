'use client'

import { useState } from 'react'

interface ShareButtonProps {
  title: string
  slug: string
}

export function ShareButton({ title, slug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}/vendor/${slug}`

    // Coba native share (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Cek ${title} di WeddingHub!`,
          url,
        })
        return
      } catch {
        // User cancelled
      }
    }

    // Fallback: copy link
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard failed
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
    >
      {copied ? (
        <>
          <span className="text-success-500">✓</span>
          Link disalin!
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Bagikan
        </>
      )}
    </button>
  )
}
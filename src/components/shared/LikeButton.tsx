'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { toggleWishlist } from '@/lib/actions/wishlist'

interface LikeButtonProps {
    vendorId: string
    initialLiked?: boolean
    className?: string
}

export function LikeButton({
    vendorId,
    initialLiked = false,
    className,
}: LikeButtonProps) {
    const [liked, setLiked] = useState(initialLiked)
    const [animating, setAnimating] = useState(false)

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        setAnimating(true)
        setLiked(!liked)

        const result = await toggleWishlist(vendorId)
        if (result?.error) {
            setLiked(liked) // Revert
        }

        setTimeout(() => setAnimating(false), 300)
    }

    return (
        <button
            onClick={handleClick}
            className={cn(
                'relative flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors',
                className
            )}
        >
            <AnimatePresence>
                {liked ? (
                    <motion.span
                        key="liked"
                        initial={{ scale: 0 }}
                        animate={{ scale: animating ? [0, 1.3, 1] : 1 }}
                        exit={{ scale: 0 }}
                        className="text-lg"
                    >
                        ❤️
                    </motion.span>
                ) : (
                    <motion.span
                        key="unliked"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="text-lg"
                    >
                        🤍
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    )
}
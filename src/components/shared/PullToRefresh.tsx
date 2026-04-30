'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'

interface PullToRefreshProps {
    onRefresh: () => Promise<void>
    children: React.ReactNode
    className?: string
}

export function PullToRefresh({
    onRefresh,
    children,
    className,
}: PullToRefreshProps) {
    const [refreshing, setRefreshing] = useState(false)
    const [pullDistance, setPullDistance] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const startY = useRef(0)
    const isPulling = useRef(false)

    const handleTouchStart = useCallback((e: TouchEvent) => {
        if (window.scrollY === 0) {
            startY.current = e.touches[0].clientY
            isPulling.current = true
        }
    }, [])

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!isPulling.current) return

        const currentY = e.touches[0].clientY
        const diff = currentY - startY.current

        if (diff > 0 && diff < 100) {
            setPullDistance(diff * 0.5)
        }
    }, [])

    const handleTouchEnd = useCallback(async () => {
        if (!isPulling.current) return
        isPulling.current = false

        if (pullDistance > 40) {
            setRefreshing(true)
            setPullDistance(60)
            await onRefresh()
            setRefreshing(false)
        }
        setPullDistance(0)
    }, [pullDistance, onRefresh])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        container.addEventListener('touchstart', handleTouchStart, { passive: true })
        container.addEventListener('touchmove', handleTouchMove, { passive: true })
        container.addEventListener('touchend', handleTouchEnd)

        return () => {
            container.removeEventListener('touchstart', handleTouchStart)
            container.removeEventListener('touchmove', handleTouchMove)
            container.removeEventListener('touchend', handleTouchEnd)
        }
    }, [handleTouchStart, handleTouchMove, handleTouchEnd])

    return (
        <div ref={containerRef} className={cn('relative', className)}>
            {/* Pull indicator */}
            {pullDistance > 0 && (
                <div
                    className="flex items-center justify-center transition-all"
                    style={{ height: pullDistance }}
                >
                    <div
                        className={cn(
                            'w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full',
                            refreshing && 'animate-spin'
                        )}
                    />
                </div>
            )}

            {/* Content */}
            <div
                style={{
                    transform: `translateY(${pullDistance}px)`,
                    transition: pullDistance === 0 ? 'transform 0.3s ease' : 'none',
                }}
            >
                {children}
            </div>
        </div>
    )
}
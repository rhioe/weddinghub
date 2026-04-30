'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
    id: string
    type: ToastType
    message: string
}

interface ToastContextType {
    showToast: (type: ToastType, message: string) => void
}

const ToastContext = createContext<ToastContextType>({
    showToast: () => { },
})

export function useToast() {
    return useContext(ToastContext)
}

const iconMap: Record<ToastType, string> = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
}

const colorMap: Record<ToastType, string> = {
    success: 'bg-success-50 border-success-200 text-success-700',
    error: 'bg-error-50 border-error-200 text-error-700',
    warning: 'bg-warning-50 border-warning-200 text-warning-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((type: ToastType, message: string) => {
        const id = Math.random().toString(36).substring(7)
        setToasts((prev) => [...prev, { id, type, message }])

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3000)
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast container */}
            <div className="fixed top-4 right-4 z-[var(--z-toast)] space-y-2 max-w-sm">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className={cn(
                                'flex items-center gap-2 px-4 py-3 rounded-lg border shadow-card',
                                colorMap[toast.type]
                            )}
                        >
                            <span>{iconMap[toast.type]}</span>
                            <p className="text-sm">{toast.message}</p>
                            <button
                                onClick={() =>
                                    setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                                }
                                className="ml-auto text-current opacity-50 hover:opacity-100"
                            >
                                ✕
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}
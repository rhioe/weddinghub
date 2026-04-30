import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-md border bg-white px-3 py-2.5 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500',
              'disabled:bg-neutral-100 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error
                ? 'border-error-500 focus:ring-error-300 focus:border-error-500'
                : 'border-neutral-200 hover:border-neutral-300',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-error-500">{error}</p>
        )}

        {hint && !error && (
          <p className="mt-1 text-sm text-neutral-400">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
import * as React from 'react'
import formatString from 'format-string-by-pattern'
import { cn } from '~/utils/shadcn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, mask, onChange, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      onChange={(e) => {
        e.target.value = mask ? formatString(mask, e.target.value) : e.target.value
        onChange?.(e)
      }}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }

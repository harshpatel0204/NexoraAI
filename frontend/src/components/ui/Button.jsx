import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-gradient-to-r from-brand-blue to-brand-violet hover:from-blue-400 hover:to-violet-500 text-white shadow-lg shadow-brand-blue/25',
  secondary: 'bg-white/10 hover:bg-white/15 text-white border border-white/10',
  outline: 'border border-brand-blue/50 text-brand-blue hover:bg-brand-blue/10',
  ghost: 'text-gray-300 hover:text-white hover:bg-white/5',
  danger: 'bg-red-500/80 hover:bg-red-500 text-white',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

const Button = forwardRef(({ children, variant = 'primary', size = 'md', loading = false, disabled = false, className = '', ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button

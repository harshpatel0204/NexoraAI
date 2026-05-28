import { ArrowRight } from 'lucide-react'

const variants = {
  primary: 'bg-brand-500 hover:bg-brand-600 text-white shadow-btn hover:shadow-btn-lg hover:-translate-y-0.5',
  secondary: 'bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 hover:border-neutral-300 shadow-card',
  ghost: 'bg-transparent hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900',
  cta: 'bg-white text-brand-600 hover:bg-brand-50 hover:shadow-lg',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className = '',
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {arrow && <ArrowRight size={16} />}
    </button>
  )
}

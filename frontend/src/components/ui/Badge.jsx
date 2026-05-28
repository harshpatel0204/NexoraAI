const variantStyles = {
  default: 'bg-neutral-100 text-neutral-600 border-neutral-200',
  success: 'bg-accent-green/10 text-accent-green border-accent-green/20',
  brand: 'bg-brand-50 text-brand-700 border-brand-200',
  warning: 'bg-accent-orange/10 text-accent-orange border-accent-orange/20',
}

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-3 py-1',
}

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  )
}

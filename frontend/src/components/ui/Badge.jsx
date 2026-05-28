const variantStyles = {
  default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700',
  success: 'bg-accent-green/10 text-accent-green border-accent-green/20 dark:bg-accent-green/20 dark:text-accent-green',
  brand: 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800',
  warning: 'bg-accent-orange/10 text-accent-orange border-accent-orange/20 dark:bg-accent-orange/20 dark:text-accent-orange',
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

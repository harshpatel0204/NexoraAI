export default function Card({ children, className = '', hover = true, glow = false, ...props }) {
  return (
    <div
      className={`glass rounded-2xl p-6 ${hover ? 'hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1' : ''} ${glow ? 'neon-glow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

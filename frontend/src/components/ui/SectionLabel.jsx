export default function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 text-brand-600 text-xs font-bold tracking-widest uppercase">
      <span className="w-5 h-px bg-brand-400" />
      {children}
      <span className="w-5 h-px bg-brand-400" />
    </div>
  )
}

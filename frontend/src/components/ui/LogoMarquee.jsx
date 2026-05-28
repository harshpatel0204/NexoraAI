import { Brain, Code2, Cpu, Globe, Layers, MessageSquare, Sparkles, Zap } from 'lucide-react'

const ITEMS = [
  { icon: Code2, label: 'Python' },
  { icon: Layers, label: 'FastAPI' },
  { icon: Sparkles, label: 'React' },
  { icon: Brain, label: 'OpenAI' },
  { icon: Cpu, label: 'HuggingFace' },
  { icon: Globe, label: 'TailwindCSS' },
  { icon: Zap, label: 'Vercel' },
  { icon: MessageSquare, label: 'GPT-4o' },
  { icon: Layers, label: 'PyTorch' },
  { icon: Cpu, label: 'Transformers' },
]

export default function LogoMarquee({ items = ITEMS, speed = 30, className = '' }) {
  return (
    <div className={`marquee ${className}`}>
      {/* Two copies for seamless loop */}
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className="marquee-track"
          style={{ '--marquee-duration': `${speed}s` }}
          aria-hidden={copy === 1}
        >
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={`${copy}-${i}`}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-300 shrink-0 group cursor-default"
              >
                <Icon className="w-4.5 h-4.5 text-brand-blue/70 group-hover:text-brand-blue transition-colors" />
                <span className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

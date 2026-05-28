import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, FileText, Code2, Rocket } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import { useTheme } from '../../context/ThemeContext'

const iconMap = { Phone, FileText, Code2, Rocket }

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    time: 'Day 1–3',
    body: 'We map your business, your data, and your goals. A focused 60-minute session that defines the right AI solution — and what success looks like in numbers.',
    icon: 'Phone',
  },
  {
    num: '02',
    title: 'Architecture & Proposal',
    time: 'Day 4–7',
    body: 'You receive a detailed technical proposal: system diagram, tech stack, fixed-price quote, and timeline. No vague estimates. No surprise invoices.',
    icon: 'FileText',
  },
  {
    num: '03',
    title: 'Build & Iterate',
    time: 'Weeks 2–8',
    body: 'Two-week sprints with working demos at every milestone. Slack access to your engineer. Progress tracked in a shared workspace you can see any time.',
    icon: 'Code2',
  },
  {
    num: '04',
    title: 'Deploy & Grow',
    time: 'Ongoing',
    body: 'Production deployment, monitoring dashboards, and an optional retainer for continuous improvement. Your AI gets smarter as your business grows.',
    icon: 'Rocket',
  },
]

export default function HowItWorks() {
  const { isDark } = useTheme()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="process" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="font-display font-bold text-display-xl text-neutral-900 dark:text-white tracking-tight mt-4">
            From Idea to Production<br />in Weeks, Not Months.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-5 max-w-2xl mx-auto leading-relaxed">
            A proven four-step process refined over 120+ projects. No guesswork, no scope creep — just clear milestones and working software.
          </p>
        </motion.div>

        {/* Desktop: horizontal stepper */}
        <div className="hidden md:block">
          {/* Progress line container */}
          <div className="relative flex items-center justify-between mb-12">
            {/* Background line */}
            <div className="absolute top-5 left-[5%] right-[5%] h-px bg-neutral-200 dark:bg-neutral-700" />
            {/* Active line */}
            <motion.div
              className="absolute top-5 left-[5%] h-px bg-brand-500"
              animate={{ width: `${(active / (steps.length - 1)) * 90}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />

            {steps.map((step, i) => (
              <button
                key={step.num}
                onClick={() => setActive(i)}
                className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group"
                aria-label={`Step ${step.num}: ${step.title}`}
              >
                <motion.div
                  animate={{
                    borderColor: i <= active ? '#2B7FE8' : (isDark ? '#2D3748' : '#E4E8F0'),
                    color: i <= active ? '#2B7FE8' : (isDark ? '#4A5568' : '#9BA8BC'),
                    backgroundColor: i <= active 
                      ? (isDark ? 'rgba(43,127,232,0.15)' : '#F0F7FF') 
                      : (isDark ? '#1A202C' : '#FFFFFF'),
                  }}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold font-display bg-white transition-all"
                >
                  {step.num}
                </motion.div>
                <span className={`text-xs font-semibold transition-colors ${
                  i <= active ? 'text-brand-600 dark:text-brand-400' : 'text-neutral-400 dark:text-neutral-500'
                }`}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = iconMap[step.icon]
              return (
                <motion.div
                  key={step.num}
                  layout
                  animate={{
                    borderColor: i === active 
                      ? '#2B7FE8' 
                      : (isDark ? '#2D3748' : '#E4E8F0'),
                    boxShadow: i === active
                      ? '0 2px 8px rgba(0,0,0,0.07), 0 8px 32px rgba(0,0,0,0.05)'
                      : '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
                  }}
                  className="bg-white dark:bg-neutral-900 rounded-xl2 border border-neutral-200 dark:border-neutral-700 p-7 cursor-pointer"
                  onClick={() => setActive(i)}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${
                    i === active 
                      ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-500 dark:text-brand-400' 
                      : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500'
                  } transition-colors`}>
                    {Icon && <Icon size={18} />}
                  </div>
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{step.time}</span>
                  <h3 className="font-display font-semibold text-neutral-900 dark:text-white text-base mt-1.5">{step.title}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mt-2">{step.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: vertical stepper */}
        <div className="md:hidden space-y-4">
          {steps.map((step, i) => {
            const Icon = iconMap[step.icon]
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold font-display ${
                    i <= active
                      ? 'border-brand-500 text-brand-500 bg-brand-50 dark:bg-brand-900/30'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500 bg-white dark:bg-neutral-900'
                  }`}>
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px h-full bg-neutral-200 dark:bg-neutral-700 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{step.time}</span>
                  <h3 className="font-display font-semibold text-neutral-900 dark:text-white text-base mt-1">{step.title}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mt-1.5">{step.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

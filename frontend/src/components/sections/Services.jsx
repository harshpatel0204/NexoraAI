import { motion } from 'framer-motion'
import { ArrowRight, Check, Zap, MessageSquare, Eye, BarChart2, Brain, Compass } from 'lucide-react'
import { services } from '../../data/services'
import SectionLabel from '../ui/SectionLabel'

const iconMap = {
  Zap, MessageSquare, Eye, BarChart2, Brain, Compass,
}

const colorMap = {
  brand:  { bg: 'bg-brand-50 dark:bg-brand-900/20',  text: 'text-brand-500 dark:text-brand-400' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20',  text: 'text-purple-500 dark:text-purple-400' },
  teal:   { bg: 'bg-teal-50 dark:bg-teal-900/20',   text: 'text-accent-teal' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-900/20',  text: 'text-accent-orange' },
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-16 items-start">
          {/* Left: sticky header */}
          <div className="lg:sticky lg:top-28">
            <SectionLabel>What We Build</SectionLabel>
            <h2 className="font-display font-bold text-display-xl text-neutral-900 dark:text-white tracking-tight mt-4">
              Every AI Capability,<br />Under One Roof.
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-5 leading-relaxed">
              From quick-win automations to full AI infrastructure — we cover the complete spectrum so you work with one trusted team, not five different agencies.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-btn hover:shadow-btn-lg transition-all duration-200 hover:-translate-y-0.5 mt-8"
            >
              See All Services <ArrowRight size={16} />
            </a>
          </div>

          {/* Right: card grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {services.map((service) => {
              const IconComponent = iconMap[service.icon]
              const colors = colorMap[service.iconColor] || colorMap.brand

              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -2 }}
                  className="bg-white dark:bg-neutral-800 rounded-xl2 border border-neutral-200 dark:border-neutral-700 shadow-card hover:shadow-card-md hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300 p-7 group cursor-pointer"
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-5 ${colors.bg} ${colors.text}`}>
                    {IconComponent && <IconComponent size={20} />}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-neutral-900 dark:text-white text-lg">{service.title}</h3>

                  {/* Description */}
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mt-2">{service.description}</p>

                  {/* Highlights */}
                  <ul className="mt-5 space-y-1.5">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <Check size={12} className="text-accent-green flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <div className="mt-5 flex items-center gap-1 text-brand-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Learn more <ArrowRight size={14} />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

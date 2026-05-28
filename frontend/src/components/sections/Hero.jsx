import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
}

function DashboardMockup() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="bg-white dark:bg-neutral-800 rounded-xl3 shadow-card-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-neutral-400 dark:text-neutral-500 bg-white dark:bg-neutral-800 px-4 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 font-mono">
            app.neuroniq.ai/dashboard
          </span>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="p-5">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Automations Active', value: '24', color: 'text-brand-500' },
            { label: 'Tasks Saved', value: '8,430', color: 'text-accent-teal' },
            { label: 'Accuracy', value: '99.2%', color: 'text-accent-green' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 text-center">
              <p className={`font-display font-bold text-lg ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Chat interface */}
        <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-100 dark:border-neutral-700 p-4 space-y-3">
          {/* User message */}
          <div className="flex justify-end">
            <div className="bg-brand-500 text-white text-xs px-3 py-2 rounded-lg rounded-br-sm max-w-[75%]">
              Analyze last month's sales data and identify top trends
            </div>
          </div>
          {/* AI message */}
          <div className="flex justify-start">
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs px-3 py-2 rounded-lg rounded-bl-sm max-w-[75%]">
              I've analyzed 12,847 transactions. Key findings: Revenue up 23% MoM, mobile orders grew 41%, and the electronics category shows the highest growth at 67%.
            </div>
          </div>
          {/* Typing indicator */}
          <div className="flex justify-start">
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3 py-2 rounded-lg rounded-bl-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-400 dark:text-neutral-500">
            Ask your AI assistant anything...
          </div>
          <button className="bg-brand-500 text-white p-2 rounded-lg" aria-label="Send message">
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-neutral-50 dark:bg-neutral-900 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(43,127,232,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(43,127,232,0.15),transparent)]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-1.5 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                ✦ Rated #1 AI Services Partner — G2 Spring 2025
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display font-bold text-display-2xl text-neutral-900 dark:text-white tracking-tight mt-6"
            >
              The AI Partner That<br />
              <span className="text-brand-500">Delivers</span>, Not Just Promises.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-body text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg mt-6"
            >
              We build, deploy, and scale custom AI solutions — agents, automation, intelligent chatbots,
              and data systems — for businesses ready to move beyond the hype and see real ROI.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3 items-center">
              <a
                href="#contact"
                className="relative inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-7 py-3.5 rounded-lg shadow-btn-lg hover:shadow-btn-lg transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <span className="absolute inset-0 rounded-lg bg-brand-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDuration: '1.5s', animationIterationCount: '1' }} />
                <span className="relative z-10 flex items-center gap-2">
                  Start Your AI Project <ArrowRight size={16} />
                </span>
              </a>
              <a
                href="#results"
                className="inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium text-sm transition-colors"
              >
                See case studies <ArrowRight size={14} />
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-5 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  'from-brand-400 to-brand-600',
                  'from-accent-teal to-brand-400',
                  'from-accent-orange to-brand-500',
                ].map((gradient, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-white dark:border-neutral-900 flex items-center justify-center`}
                  >
                    <span className="text-white text-xs font-bold">
                      {['A', 'S', 'R'][i]}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                Join <span className="font-semibold text-neutral-700 dark:text-neutral-300">120+</span> companies already using AI with us
              </span>
            </motion.div>
          </motion.div>

          {/* Right column — dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.3 }}
            className="hidden lg:block"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

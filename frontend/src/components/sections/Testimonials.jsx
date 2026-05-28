import { motion } from 'framer-motion'
import { testimonials } from '../../data/testimonials'
import SectionLabel from '../ui/SectionLabel'

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" fill="#F59E0B" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-display font-bold text-display-xl text-neutral-900 dark:text-white tracking-tight mt-4">
            Don't Take Our Word For It.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-5 max-w-2xl mx-auto leading-relaxed">
            Hear from the teams we've helped transform with AI.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className="bg-white dark:bg-neutral-800 rounded-xl2 border border-neutral-200 dark:border-neutral-700 shadow-card hover:shadow-card-md p-7 flex flex-col transition-all duration-300"
            >
              {/* Top: Stars + Badge */}
              <div className="flex items-center justify-between mb-5">
                <Stars />
                <span className="bg-accent-green/10 text-accent-green text-xs font-semibold px-2 py-0.5 rounded-full">
                  Verified Client
                </span>
              </div>

              {/* Quote */}
              <div className="flex-1 relative">
                <span className="text-brand-200 dark:text-brand-800/40 font-display text-5xl leading-none absolute -top-2 -left-1">
                  &ldquo;
                </span>
                <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed italic pl-6 pr-2">
                  {t.quote}
                </p>
                <span className="text-brand-200 dark:text-brand-800/40 font-display text-5xl leading-none">
                  &rdquo;
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-700">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-neutral-900 dark:text-white text-sm">{t.name}</p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">{t.title}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

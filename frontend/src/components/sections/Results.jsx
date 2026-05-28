import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { caseStudies } from '../../data/results'
import SectionLabel from '../ui/SectionLabel'
import AnimatedCounter from '../ui/AnimatedCounter'

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

export default function Results() {
  return (
    <section id="results" className="py-24 md:py-32 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <SectionLabel>Case Studies</SectionLabel>
          <h2 className="font-display font-bold text-display-xl text-neutral-900 dark:text-white tracking-tight mt-4">
            Real Projects.<br />Measurable Results.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-5 max-w-2xl mx-auto leading-relaxed">
            Every project comes with clear metrics and documented business impact. Here are three recent wins.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className="bg-white dark:bg-neutral-800 rounded-xl3 border border-neutral-200 dark:border-neutral-700 shadow-card hover:shadow-card-md overflow-hidden flex flex-col transition-all duration-300"
            >
              {/* Industry tag */}
              <div className="px-8 py-3 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-700">
                <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                  {study.industry}
                </span>
              </div>

              {/* Body */}
              <div className="p-8 flex flex-col flex-1">
                {/* Challenge */}
                <div className="mb-5">
                  <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Challenge</span>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm mt-1.5 leading-relaxed">{study.challenge}</p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Solution</span>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm mt-1.5 leading-relaxed">{study.solution}</p>
                </div>

                {/* Metrics */}
                <div className="mt-auto grid grid-cols-3 gap-3 pt-6 border-t border-neutral-100 dark:border-neutral-700">
                  {study.metrics.map((m) => (
                    <div key={m.label}>
                      <AnimatedCounter
                        value={m.value}
                        className="font-display font-bold text-xl text-neutral-900 dark:text-white"
                      />
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {study.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded-md font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-brand-500 rounded-xl3 px-8 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display font-bold text-white text-xl md:text-2xl">
              Want results like these?
            </h3>
            <p className="text-brand-200 text-sm mt-1">
              Book a free discovery call and let's map out your AI opportunity.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white text-brand-600 hover:bg-brand-50 font-semibold text-sm px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex-shrink-0"
          >
            Book a Free Discovery Call <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

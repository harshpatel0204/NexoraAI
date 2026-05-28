import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { faqs } from '../../data/faqs'
import SectionLabel from '../ui/SectionLabel'

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full py-5 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-neutral-900 text-base group-hover:text-brand-600 transition-colors pr-4">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-neutral-400"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <p className="text-neutral-600 text-sm leading-relaxed pb-5">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">
          {/* Left: header */}
          <div className="lg:sticky lg:top-28">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display font-bold text-display-xl text-neutral-900 tracking-tight mt-4">
              Questions We Hear on Every Discovery Call.
            </h2>
            <p className="text-neutral-600 mt-5 leading-relaxed">
              Can't find your answer? Book a free 20-minute call — no commitment, just answers.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-sm px-6 py-3 rounded-lg border border-neutral-200 hover:border-neutral-300 shadow-card transition-all duration-200 mt-6"
            >
              Book a Call <ArrowRight size={16} />
            </a>
          </div>

          {/* Right: accordion */}
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.id} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

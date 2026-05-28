import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight } from 'lucide-react'
import { pricingTiers } from '../../data/pricing'
import SectionLabel from '../ui/SectionLabel'

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

function formatPrice(price) {
  if (!price) return null
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="font-display font-bold text-display-xl text-neutral-900 tracking-tight mt-4">
            Transparent Pricing.<br />No Hidden Fees.
          </h2>
          <p className="text-neutral-600 mt-5 max-w-2xl mx-auto leading-relaxed">
            Fixed-scope projects with clear deliverables. Pick the plan that fits your ambition.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-medium transition-colors ${!annual ? 'text-neutral-900' : 'text-neutral-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 bg-neutral-200 rounded-full transition-colors"
              style={{ backgroundColor: annual ? '#2B7FE8' : '#E4E8F0' }}
              aria-label="Toggle annual pricing"
            >
              <motion.div
                animate={{ x: annual ? 24 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${annual ? 'text-neutral-900' : 'text-neutral-400'}`}>
              Annual
            </span>
            {annual && (
              <span className="bg-accent-green/10 text-accent-green text-xs font-semibold px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {pricingTiers.map((tier) => {
            const price = tier.price
              ? formatPrice(annual ? tier.price.annual : tier.price.monthly)
              : null

            return (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                className={`bg-white rounded-xl3 border shadow-card p-8 flex flex-col relative ${
                  tier.popular
                    ? 'ring-2 ring-brand-500 border-brand-200 md:-mt-4 md:mb-[-16px]'
                    : 'border-neutral-200'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="font-display font-bold text-neutral-900 text-xl">{tier.name}</h3>
                  <p className="text-neutral-500 text-sm mt-1">{tier.description}</p>
                </div>

                <div className="mb-6">
                  {price ? (
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-bold text-4xl text-neutral-900">{price}</span>
                      <span className="text-neutral-400 text-sm">/project</span>
                    </div>
                  ) : (
                    <span className="font-display font-bold text-3xl text-neutral-900">Custom</span>
                  )}
                  <p className="text-xs text-neutral-400 mt-1">Timeline: {tier.timeline}</p>
                </div>

                <a
                  href="#contact"
                  className={`w-full text-center font-semibold text-sm py-3 rounded-lg transition-all duration-200 mb-6 block ${
                    tier.ctaVariant === 'primary'
                      ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-btn hover:shadow-btn-lg hover:-translate-y-0.5'
                      : 'bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 hover:border-neutral-300 shadow-card'
                  }`}
                >
                  {tier.cta} {tier.ctaVariant === 'primary' && '→'}
                </a>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-600">
                      <Check size={15} className="text-accent-green mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {tier.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-400 line-through">
                      <X size={15} className="text-neutral-300 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>

        <p className="text-sm text-neutral-400 text-center mt-8">
          All prices are fixed-scope, not hourly. What you see is what you pay.
        </p>
      </div>
    </section>
  )
}

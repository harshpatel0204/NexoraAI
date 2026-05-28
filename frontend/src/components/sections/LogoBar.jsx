import { motion } from 'framer-motion'

const companies = [
  'Notion', 'Vercel', 'Stripe', 'Figma', 'Linear', 'Supabase',
  'Resend', 'Raycast', 'Loom', 'Clerk', 'Planetscale', 'Fly.io',
]

export default function LogoBar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="py-16 md:py-20 bg-white dark:bg-neutral-900"
    >
      <p className="text-center text-sm text-neutral-400 dark:text-neutral-500 font-medium mb-8">
        Trusted by teams at world-class companies
      </p>

      <div className="relative overflow-hidden group">
        {/* Left fade */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-neutral-900 to-transparent z-10 pointer-events-none" />

        <div className="flex marquee-animation group-hover:animation-paused">
          {[...companies, ...companies].map((company, i) => (
            <span
              key={`${company}-${i}`}
              className="flex-shrink-0 px-8 font-display font-semibold text-neutral-300 dark:text-neutral-700 text-lg tracking-tight hover:text-neutral-500 dark:hover:text-neutral-500 transition-colors cursor-default select-none"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

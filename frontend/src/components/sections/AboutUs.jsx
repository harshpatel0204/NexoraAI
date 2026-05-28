import { motion } from 'framer-motion'
import { ArrowRight, Target, Users, Lightbulb, Shield, Rocket, Heart } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import AnimatedCounter from '../ui/AnimatedCounter'

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    desc: 'We measure everything. If it doesn\'t move your metrics, we don\'t ship it.',
    color: 'brand',
  },
  {
    icon: Lightbulb,
    title: 'Innovation-First',
    desc: 'We stay at the cutting edge — using the latest models, techniques, and research so you don\'t have to.',
    color: 'purple',
  },
  {
    icon: Shield,
    title: 'Production-Grade',
    desc: 'No throwaway prototypes. Every solution we build is designed to scale and run reliably in production.',
    color: 'teal',
  },
  {
    icon: Heart,
    title: 'Partnership Mindset',
    desc: 'We embed into your team. Your challenges become our challenges. Your wins become our wins.',
    color: 'orange',
  },
]

const colorMap = {
  brand:  { bg: 'bg-brand-50 dark:bg-brand-900/20', text: 'text-brand-500 dark:text-brand-400', border: 'border-brand-100 dark:border-brand-800/30' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-500 dark:text-purple-400', border: 'border-purple-100 dark:border-purple-800/30' },
  teal:   { bg: 'bg-teal-50 dark:bg-teal-900/20', text: 'text-accent-teal', border: 'border-teal-100 dark:border-teal-800/30' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-accent-orange', border: 'border-orange-100 dark:border-orange-800/30' },
}

const stats = [
  { value: '50+', label: 'AI Projects Delivered' },
  { value: '3x', label: 'Avg. ROI for Clients' },
  { value: '98%', label: 'Client Retention Rate' },
  { value: '24hr', label: 'Average Response Time' },
]

const milestones = [
  { year: '2021', title: 'Founded in Mumbai', desc: 'NeuroniqAI was born from a simple idea — make enterprise AI accessible to businesses of all sizes.' },
  { year: '2022', title: 'First 10 Clients', desc: 'Delivered our first production AI systems — chatbots, automation pipelines, and custom NLP solutions.' },
  { year: '2023', title: 'Scaled to 30+ Projects', desc: 'Expanded into computer vision, generative AI, and built our repeatable delivery framework.' },
  { year: '2024', title: 'Global Reach', desc: 'Partnered with companies across India, US, UK, and UAE. Grew the team to 12 AI engineers.' },
  { year: '2025', title: 'Pushing Boundaries', desc: 'Leading the charge in agentic AI, multi-modal systems, and AI infrastructure for high-growth startups.' },
]

const team = [
  { name: 'Harsh Patel', role: 'Founder & CEO', bio: 'AI engineer with a vision to make intelligent systems accessible. Building the bridge between cutting-edge research and real-world business value.', initials: 'HP', gradient: 'from-brand-500 to-brand-700' },
  { name: 'AI Engineering', role: 'Core Team', bio: 'A team of passionate ML engineers, data scientists, and full-stack developers who live and breathe AI.', initials: 'AI', gradient: 'from-purple-500 to-purple-700' },
  { name: 'Product & Design', role: 'UX Team', bio: 'Designers and product thinkers who ensure every AI solution we build is intuitive and delightful to use.', initials: 'PD', gradient: 'from-teal-500 to-teal-700' },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function AboutUs() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-20"
        >
          <SectionLabel>About Us</SectionLabel>
          <h2 className="font-display font-bold text-display-xl text-neutral-900 dark:text-white tracking-tight mt-4">
            We Build AI That<br />Actually Works.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-5 max-w-2xl mx-auto leading-relaxed text-lg">
            NeuroniqAI is a team of AI engineers, researchers, and product builders on a mission to help businesses harness the real power of artificial intelligence — not the hype, but the results.
          </p>
        </motion.div>

        {/* ── Stats Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center py-6 px-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl2 border border-neutral-200 dark:border-neutral-700"
            >
              <AnimatedCounter
                target={stat.value}
                className="font-display font-bold text-2xl md:text-3xl text-neutral-900 dark:text-white"
              />
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Our Story ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-brand-500 text-xs font-bold tracking-widest uppercase">Our Story</span>
            <h3 className="font-display font-bold text-display-md text-neutral-900 dark:text-white mt-3">
              From a passion project to a trusted AI partner.
            </h3>
            <div className="mt-6 space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <p>
                We started NeuroniqAI because we saw a gap: businesses wanted AI, but the path from idea to production was too complex, too expensive, and too risky.
              </p>
              <p>
                Most agencies deliver impressive demos that never make it to production. We took the opposite approach — <span className="font-semibold text-neutral-800 dark:text-neutral-200">every solution we build is production-ready from day one</span>.
              </p>
              <p>
                Today, we've delivered 50+ AI solutions for companies ranging from early-stage startups to enterprises, across industries like healthcare, fintech, e-commerce, and SaaS.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-btn hover:shadow-btn-lg transition-all duration-200 hover:-translate-y-0.5 mt-8"
            >
              Work with Us <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative pl-8"
          >
            {/* Vertical line */}
            <div className="absolute left-3 top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-700" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="absolute -left-8 top-1.5 w-[10px] h-[10px] rounded-full bg-brand-500 ring-4 ring-white dark:ring-neutral-900" />

                  <span className="text-brand-500 text-xs font-bold tracking-wider">{m.year}</span>
                  <h4 className="font-display font-semibold text-neutral-900 dark:text-white mt-1">{m.title}</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1 leading-relaxed">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Core Values ── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <SectionLabel>Our Values</SectionLabel>
            <h3 className="font-display font-bold text-display-lg text-neutral-900 dark:text-white tracking-tight mt-4">
              What We Stand For.
            </h3>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {values.map((v) => {
              const colors = colorMap[v.color] || colorMap.brand
              return (
                <motion.div
                  key={v.title}
                  variants={cardVariants}
                  whileHover={{ y: -3 }}
                  className="bg-white dark:bg-neutral-800 rounded-xl2 border border-neutral-200 dark:border-neutral-700 shadow-card hover:shadow-card-md transition-all duration-300 p-7 text-center group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 ${colors.bg} ${colors.text} transition-transform duration-300 group-hover:scale-110`}>
                    <v.icon size={22} />
                  </div>
                  <h4 className="font-display font-semibold text-neutral-900 dark:text-white">{v.title}</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mt-2">{v.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* ── Team ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <SectionLabel>The Team</SectionLabel>
            <h3 className="font-display font-bold text-display-lg text-neutral-900 dark:text-white tracking-tight mt-4">
              The People Behind the AI.
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 max-w-xl mx-auto leading-relaxed">
              A lean, focused team of AI specialists who care deeply about craft and outcomes.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={cardVariants}
                whileHover={{ y: -3 }}
                className="bg-white dark:bg-neutral-800 rounded-xl2 border border-neutral-200 dark:border-neutral-700 shadow-card hover:shadow-card-md transition-all duration-300 p-8 text-center group"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <span className="text-white text-lg font-bold">{member.initials}</span>
                </div>
                <h4 className="font-display font-semibold text-neutral-900 dark:text-white text-lg">{member.name}</h4>
                <p className="text-brand-500 text-sm font-medium mt-1">{member.role}</p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mt-3">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}

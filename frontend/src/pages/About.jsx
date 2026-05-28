import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Target, Rocket, Heart, Code2, Cpu } from 'lucide-react'
import Card from '../components/ui/Card'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import LogoMarquee from '../components/ui/LogoMarquee'
import { SKILLS, TIMELINE, STATS } from '../utils/constants'

const values = [
  { icon: Brain, title: 'AI-First Thinking', desc: 'Every solution starts with understanding how AI can create the most impact.', color: '#3B82F6' },
  { icon: Target, title: 'Problem-Focused', desc: 'Technology serves the problem — not the other way around. Real impact matters.', color: '#A855F7' },
  { icon: Rocket, title: 'Ship Fast, Iterate', desc: 'Rapid prototyping and continuous improvement to deliver results quickly.', color: '#00D4FF' },
  { icon: Heart, title: 'Passion-Driven', desc: 'Genuine curiosity and love for AI drives every project forward.', color: '#10B981' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

/* ─── Animated Skill Bar ─── */
function SkillBar({ name, level, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{name}</span>
        <motion.span
          className="text-xs font-bold text-brand-blue"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #3B82F6, #7C3AED, #00D4FF)',
            backgroundSize: '200% 100%',
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: 0.3 + index * 0.08, duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

/* ─── Timeline ─── */
function TimelineDot({ color, isInView }) {
  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-4 h-4 rounded-full ring-4 ring-brand-dark -ml-2"
        style={{ background: color }}
      />
      {isInView && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          className="absolute inset-0 w-4 h-4 rounded-full -ml-2"
          style={{ background: color }}
        />
      )}
    </div>
  )
}

function TimelineItem({ milestone }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="flex gap-6 pl-4"
    >
      <TimelineDot color={milestone.color} isInView={isInView} />
      <div className="pb-10">
        <span className="text-sm font-bold" style={{ color: milestone.color }}>{milestone.year}</span>
        <h3 className="text-white font-semibold mt-1">{milestone.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{milestone.desc}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* ══════ HERO / MISSION ══════ */}
        <section className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-violet/20 flex items-center justify-center border border-white/10 mx-auto">
                <Brain className="w-10 h-10 text-brand-blue" />
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="gradient-text">About NeuralNexus</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Passionate about pushing the boundaries of what's possible with AI. I build intelligent systems that don't just work — they <span className="text-white font-medium">transform how people interact with technology</span>.
            </p>
          </motion.div>
        </section>

        {/* ══════ STATS ══════ */}
        <section className="mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card hover={false} className="text-center group">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                      duration={2000}
                    />
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════ VALUES ══════ */}
        <section className="mb-24">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Core Philosophy</h2>
            <p className="text-gray-400">The principles that guide every project and decision.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full text-center group relative overflow-hidden">
                  {/* Hover glow */}
                  <div
                    className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: v.color }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                      style={{ background: `${v.color}15`, border: `1px solid ${v.color}25` }}
                    >
                      <v.icon className="w-7 h-7" style={{ color: v.color }} />
                    </div>
                    <h3 className="text-white font-semibold mb-2 group-hover:text-brand-blue transition-colors">{v.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════ SKILLS ══════ */}
        <section className="mb-24">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Skills & Expertise</h2>
            <p className="text-gray-400">A deep toolkit spanning the full AI/ML spectrum.</p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Card hover={false} className="space-y-5">
              {SKILLS.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </Card>
          </div>
        </section>

        {/* ══════ TECH STACK ══════ */}
        <section className="mb-24">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Technology Stack</h2>
            <p className="text-gray-400">Built with the best tools in the industry.</p>
          </motion.div>
          <div className="overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] py-6">
            <LogoMarquee speed={25} />
          </div>
        </section>

        {/* ══════ TIMELINE ══════ */}
        <section>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">My Journey</h2>
            <p className="text-gray-400">Key milestones in my AI adventure.</p>
          </motion.div>
          <div className="relative max-w-2xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
            <motion.div
              className="absolute left-4 top-0 w-px bg-gradient-to-b from-brand-blue via-brand-violet to-neon-blue"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              viewport={{ once: true }}
            />

            <div className="space-y-0">
              {TIMELINE.map((m) => (
                <TimelineItem key={m.year} milestone={m} />
              ))}
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  )
}

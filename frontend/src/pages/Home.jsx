import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Brain, MessageSquare, Eye, Sparkles, Layers, Zap,
  ArrowRight, ChevronRight, Code2, Cpu, Network, Workflow,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ParticleBackground from '../components/ui/ParticleBackground'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import TypewriterText from '../components/ui/TypewriterText'
import LogoMarquee from '../components/ui/LogoMarquee'
import { AI_CAPABILITIES, STATS } from '../utils/constants'

const iconMap = { Brain, Layers, MessageSquare, Eye, Sparkles, Zap }

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null)

  const handleMouse = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const tiltX = (y - 0.5) * -10
    const tiltY = (x - 0.5) * 10
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`
    card.style.transition = 'transform 0.15s ease-out'
  }

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
      ref.current.style.transition = 'transform 0.4s ease-out'
    }
  }

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={handleLeave} className={className}>
      {children}
    </div>
  )
}

/* ─── Floating Icon Grid ─── */
function FloatingIconGrid() {
  const icons = [Brain, Cpu, Network, Workflow, Code2, Sparkles]
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.04]"
          style={{
            left: `${15 + (i % 3) * 30}%`,
            top: `${10 + Math.floor(i / 3) * 40}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        >
          <Icon className="w-20 h-20 sm:w-28 sm:h-28 text-white" strokeWidth={0.5} />
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Interactive Neural Network Visualization ─── */
function NeuralNetworkViz() {
  const nodes = [
    // Input layer
    { x: 10, y: 20, layer: 0 }, { x: 10, y: 40, layer: 0 }, { x: 10, y: 60, layer: 0 }, { x: 10, y: 80, layer: 0 },
    // Hidden layer 1
    { x: 35, y: 15, layer: 1 }, { x: 35, y: 35, layer: 1 }, { x: 35, y: 55, layer: 1 }, { x: 35, y: 75, layer: 1 }, { x: 35, y: 90, layer: 1 },
    // Hidden layer 2
    { x: 60, y: 25, layer: 2 }, { x: 60, y: 45, layer: 2 }, { x: 60, y: 65, layer: 2 }, { x: 60, y: 85, layer: 2 },
    // Output layer
    { x: 85, y: 35, layer: 3 }, { x: 85, y: 55, layer: 3 }, { x: 85, y: 75, layer: 3 },
  ]

  // Generate connections between adjacent layers
  const connections = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[j].layer === nodes[i].layer + 1) {
        connections.push({ from: nodes[i], to: nodes[j], key: `${i}-${j}` })
      }
    }
  }

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Connections */}
        {connections.map((conn, i) => (
          <motion.line
            key={conn.key}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="url(#lineGradient)"
            strokeWidth="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.1, 0.3, 0.1] }}
            transition={{
              pathLength: { delay: i * 0.02, duration: 1.5 },
              opacity: { duration: 3, repeat: Infinity, delay: i * 0.05 },
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="1.8"
            fill="none"
            stroke={node.layer === 0 ? '#3B82F6' : node.layer === 3 ? '#00D4FF' : '#7C3AED'}
            strokeWidth="0.4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.05, duration: 0.5, type: 'spring' }}
          >
            <animate
              attributeName="r"
              values="1.8;2.2;1.8"
              dur={`${3 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </motion.circle>
        ))}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Pulsing data signals along connections */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-brand-blue"
          style={{
            left: '10%',
            top: `${30 + i * 20}%`,
            boxShadow: '0 0 6px rgba(59, 130, 246, 0.8)',
          }}
          animate={{
            left: ['10%', '35%', '60%', '85%'],
            top: [`${30 + i * 20}%`, `${20 + i * 15}%`, `${35 + i * 10}%`, `${40 + i * 15}%`],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Process Steps ─── */
const processSteps = [
  {
    num: '01',
    title: 'Explore',
    desc: 'Discover the perfect AI solution for your unique challenge — from concept to architecture.',
    icon: Sparkles,
    color: '#3B82F6',
  },
  {
    num: '02',
    title: 'Build',
    desc: 'Engineer robust ML models and AI systems using cutting-edge frameworks and best practices.',
    icon: Code2,
    color: '#A855F7',
  },
  {
    num: '03',
    title: 'Deploy',
    desc: 'Launch production-ready AI applications that scale effortlessly and deliver real impact.',
    icon: Zap,
    color: '#00D4FF',
  },
]

export default function Home() {
  const capRef = useRef(null)
  const capInView = useInView(capRef, { once: true, margin: '-100px' })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* ══════ HERO ══════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Particle background */}
        <div className="absolute inset-0 pointer-events-none">
          <ParticleBackground />
        </div>

        {/* Floating icons */}
        <FloatingIconGrid />

        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/15 rounded-full blur-[150px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-violet/15 rounded-full blur-[150px] animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-neon-blue/8 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-5s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-sm text-brand-blue mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI & Machine Learning
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6">
              <TypewriterText
                phrases={['Powering the Future', 'Building Intelligence', 'Transforming Ideas', 'Scaling Innovation']}
                className="gradient-text"
                typingSpeed={70}
                pauseDuration={2500}
              />
              <br />
              <span className="text-white">with AI & ML</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-xl mb-8 text-balance leading-relaxed">
              Crafting intelligent solutions that bridge the gap between cutting-edge AI research and real-world applications. From neural networks to production systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/about">
                <Button size="lg">
                  Explore My Work <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="lg">Get in Touch</Button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Neural Network Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Outer glow ring */}
              <div className="absolute inset-4 rounded-full border border-white/[0.03]" />
              <div className="absolute inset-12 rounded-full border border-brand-blue/10" />
              <div className="absolute inset-0">
                <NeuralNetworkViz />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-brand-blue rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ══════ STATS ══════ */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text">
                <AnimatedCounter
                  target={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals || 0}
                  duration={2200}
                />
              </div>
              <div className="text-sm text-gray-500 mt-1.5 group-hover:text-gray-400 transition-colors">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════ AI CAPABILITIES ══════ */}
      <section className="py-24" ref={capRef}>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What I Do</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Specialized in building intelligent systems across multiple domains of artificial intelligence.</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={capInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {AI_CAPABILITIES.map((cap, i) => {
              const Icon = iconMap[cap.icon] || Sparkles
              return (
                <motion.div key={cap.id} custom={i} variants={fadeUp}>
                  <TiltCard>
                    <Card className="h-full group relative overflow-hidden">
                      {/* Hover glow */}
                      <div
                        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{ background: cap.color }}
                      />

                      <div className="relative z-10">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{ background: `${cap.color}15`, border: `1px solid ${cap.color}25` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: cap.color }} />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-blue transition-colors">{cap.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{cap.desc}</p>
                        <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-blue/70 group-hover:text-brand-blue transition-colors">
                          Learn more <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </TiltCard>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════ HOW I WORK ══════ */}
      <section className="py-24 bg-brand-darker/50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How I Work</h2>
            <p className="text-gray-400 max-w-lg mx-auto">A streamlined approach to turning AI ideas into production-ready solutions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-brand-blue/30 via-brand-violet/30 to-neon-blue/30" />

            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative text-center group"
              >
                <div
                  className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}30`,
                    boxShadow: `0 0 0 0 ${step.color}00`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 30px ${step.color}20` }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 0 0 ${step.color}00` }}
                >
                  <step.icon className="w-7 h-7" style={{ color: step.color }} />
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-dark text-xs font-bold flex items-center justify-center"
                    style={{ border: `1px solid ${step.color}40`, color: step.color }}
                  >
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TECH MARQUEE ══════ */}
      <section className="py-10 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <LogoMarquee speed={35} />
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="glow-border rounded-2xl">
              <Card glow hover={false} className="text-center bg-gradient-to-br from-brand-blue/10 to-brand-violet/10 relative overflow-hidden">
                {/* Subtle background effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-blue/10 rounded-full blur-[80px]" />
                  <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-violet/10 rounded-full blur-[80px]" />
                </div>

                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-block mb-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-violet/20 flex items-center justify-center border border-white/10">
                      <Sparkles className="w-8 h-8 text-brand-blue" />
                    </div>
                  </motion.div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Build Something Amazing?</h2>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Let's explore how AI can transform your ideas into intelligent, impactful solutions.
                  </p>
                  <Link to="/contact">
                    <Button size="lg">
                      Let's Connect <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

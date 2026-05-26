import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, MessageSquare, Globe, Eye, Sparkles, FileText, ArrowRight, Mail, Star } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { STATS } from '../utils/constants'

const features = [
  { icon: Brain, title: 'NLP Processing', desc: 'Advanced natural language processing for text analysis, entity recognition, and more.' },
  { icon: Sparkles, title: 'Text Generation', desc: 'Generate creative and factual content with state-of-the-art language models.' },
  { icon: Eye, title: 'Computer Vision', desc: 'Image captioning, object detection, and visual understanding at scale.' },
  { icon: Globe, title: 'Translation', desc: 'Neural machine translation across 50+ languages with high accuracy.' },
  { icon: MessageSquare, title: 'AI Chatbot', desc: 'Conversational AI assistant powered by GPT for real-time interactions.' },
  { icon: FileText, title: 'Summarization', desc: 'Condense long documents into concise, informative summaries instantly.' },
]

const testimonials = [
  { quote: 'NeuralNexus transformed our customer support with their AI chatbot. Response times dropped by 80%.', name: 'Emily Zhang', role: 'CTO', company: 'TechFlow Inc.' },
  { quote: 'The text generation API is incredible. We produce 10x more content with better quality than before.', name: 'Marcus Rivera', role: 'Head of Content', company: 'MediaPulse' },
  { quote: 'Object detection accuracy exceeded our expectations. Integration was seamless with excellent docs.', name: 'Sarah O\'Brien', role: 'Lead Engineer', company: 'VisionCraft' },
]

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-violet/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-blue/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-5s' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
              <span className="gradient-text">Powering the Future</span>
              <br />
              <span className="text-white">with AI & ML</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 text-balance">
              Access 10+ production-ready AI services through a single, powerful API. From text generation to computer vision — build smarter applications today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services"><Button size="lg">Explore Services <ArrowRight className="w-4 h-4" /></Button></Link>
              <Link to="/demo"><Button variant="secondary" size="lg">Try Demo</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div key={s.label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
              <div className="text-3xl font-bold gradient-text">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What We Offer</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Enterprise-grade AI services designed for developers, by developers.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="h-full">
                  <f.icon className="w-10 h-10 text-brand-blue mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-brand-darker/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card hover={false} className="h-full">
                  <div className="flex gap-1 mb-3">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
                  <p className="text-gray-300 text-sm mb-4 italic">"{t.quote}"</p>
                  <div className="text-sm"><span className="text-white font-medium">{t.name}</span><span className="text-gray-500"> · {t.role}, {t.company}</span></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <Card glow hover={false} className="text-center bg-gradient-to-br from-brand-blue/10 to-brand-violet/10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Build with AI?</h2>
            <p className="text-gray-400 mb-6">Get started in minutes. No credit card required.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-blue/50" />
              <Button><Mail className="w-4 h-4" /> Subscribe</Button>
            </div>
          </Card>
        </div>
      </section>
    </motion.div>
  )
}

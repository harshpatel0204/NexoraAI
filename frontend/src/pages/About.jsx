import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import { TEAM_MEMBERS } from '../utils/constants'

const techStack = ['Python', 'FastAPI', 'React', 'HuggingFace', 'OpenAI', 'TailwindCSS', 'Vercel']
const milestones = [
  { year: '2021', title: 'Founded', desc: 'NeuralNexus AI was founded with a mission to democratize AI.' },
  { year: '2022', title: 'First API Launch', desc: 'Launched our first three AI services to the public.' },
  { year: '2023', title: '1M+ API Calls', desc: 'Crossed one million API calls with 99.9% uptime.' },
  { year: '2024', title: 'Enterprise Launch', desc: 'Launched enterprise plans and on-premise deployment options.' },
]

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }) }

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Mission */}
        <section className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6"><span className="gradient-text">Our Mission</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We believe AI should be accessible to everyone. NeuralNexus AI provides production-ready machine learning services through simple, powerful APIs — enabling developers and businesses to build intelligent applications without the complexity.
          </p>
        </section>

        {/* Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((m, i) => (
              <motion.div key={m.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="text-center h-full">
                  <div className="text-5xl mb-4">{m.avatar}</div>
                  <h3 className="text-white font-semibold mb-1">{m.name}</h3>
                  <p className="text-brand-blue text-sm mb-3">{m.role}</p>
                  <p className="text-gray-500 text-sm">{m.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((t, i) => (
              <motion.div key={t} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card hover className="px-6 py-4 text-center">
                  <span className="text-white font-medium">{t}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-3xl font-bold text-white text-center mb-10">Our Journey</h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div key={m.year} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-6 pl-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-brand-blue mt-1.5 -ml-1.5 ring-4 ring-brand-dark" />
                  </div>
                  <div>
                    <span className="text-brand-blue font-bold text-sm">{m.year}</span>
                    <h3 className="text-white font-semibold mt-1">{m.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  )
}

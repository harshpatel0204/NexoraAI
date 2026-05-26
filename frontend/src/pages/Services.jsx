import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Heart, FileText, Globe, MessageSquare, Image, ScanSearch } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { SERVICES } from '../utils/constants'

const iconMap = { Sparkles, Heart, FileText, Globe, MessageSquare, Image, ScanSearch }
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }) }

export default function Services() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4"><span className="gradient-text">Our AI Services</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Seven production-ready AI services, each powered by state-of-the-art machine learning models.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = iconMap[s.icon] || Sparkles
            return (
              <motion.div key={s.id} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-violet/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-blue" />
                    </div>
                    <Badge color={s.badgeColor}>{s.badge}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-400 flex-1 mb-4">{s.description}</p>
                  <Link to={`/demo?tab=${s.id}`}>
                    <Button variant="secondary" size="sm" className="w-full">Try It →</Button>
                  </Link>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

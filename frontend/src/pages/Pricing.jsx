import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

const plans = [
  {
    name: 'Free', monthly: 0, badge: null,
    features: [
      { text: '100 API calls/day', ok: true }, { text: '3 AI services', ok: true }, { text: 'Community support', ok: true },
      { text: 'Custom models', ok: false }, { text: 'API key access', ok: false }, { text: 'Priority support', ok: false },
      { text: 'On-premise deploy', ok: false }, { text: 'SLA guarantee', ok: false },
    ],
  },
  {
    name: 'Pro', monthly: 29, badge: 'Popular',
    features: [
      { text: '10,000 API calls/day', ok: true }, { text: 'All 7 AI services', ok: true }, { text: 'Priority support', ok: true },
      { text: 'Custom models', ok: true }, { text: 'API key access', ok: true }, { text: 'Advanced analytics', ok: true },
      { text: 'On-premise deploy', ok: false }, { text: 'SLA guarantee', ok: false },
    ],
  },
  {
    name: 'Enterprise', monthly: null, badge: null,
    features: [
      { text: 'Unlimited API calls', ok: true }, { text: 'All AI services', ok: true }, { text: 'Dedicated support', ok: true },
      { text: 'Custom models', ok: true }, { text: 'API key access', ok: true }, { text: 'Advanced analytics', ok: true },
      { text: 'On-premise deploy', ok: true }, { text: 'SLA guarantee', ok: true },
    ],
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4"><span className="gradient-text">Simple Pricing</span></h1>
          <p className="text-gray-400 text-lg mb-8">Choose the plan that fits your needs. Scale as you grow.</p>
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm ${!annual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-brand-blue' : 'bg-white/10'}`}>
              <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${annual ? 'left-8' : 'left-1'}`} />
            </button>
            <span className={`text-sm ${annual ? 'text-white' : 'text-gray-500'}`}>Annual</span>
            {annual && <Badge color="green">Save 20%</Badge>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const price = plan.monthly === null ? null : annual ? Math.round(plan.monthly * 0.8 * 100) / 100 : plan.monthly
            const isPro = plan.name === 'Pro'
            return (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <Card hover={false} glow={isPro} className={`h-full flex flex-col ${isPro ? 'border-brand-blue/30 bg-brand-blue/5' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    {plan.badge && <Badge color="blue">{plan.badge}</Badge>}
                  </div>
                  <div className="mb-6">
                    {price !== null ? (
                      <><span className="text-4xl font-bold text-white">${price}</span><span className="text-gray-500 text-sm">/month</span></>
                    ) : (
                      <span className="text-4xl font-bold text-white">Custom</span>
                    )}
                  </div>
                  <ul className="space-y-3 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-2 text-sm">
                        {f.ok ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <X className="w-4 h-4 text-gray-600 shrink-0" />}
                        <span className={f.ok ? 'text-gray-300' : 'text-gray-600'}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant={isPro ? 'primary' : 'secondary'} className="w-full">
                    {plan.monthly === null ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

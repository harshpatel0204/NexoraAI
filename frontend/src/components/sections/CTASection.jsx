import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, CheckCircle } from 'lucide-react'

export default function CTASection() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) setSubmitted(true)
      else setError('Something went wrong. Please email us directly.')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClasses = 'bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all'

  return (
    <section id="contact" className="bg-brand-600 py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="text-brand-200 text-sm font-semibold tracking-widest uppercase">
            Ready to start?
          </span>

          <h2 className="font-display font-bold text-white text-display-xl mt-4">
            Book a Free 30-Minute<br />Discovery Call.
          </h2>

          <p className="text-brand-200 text-lg mt-5 max-w-xl mx-auto">
            No sales pitch. No commitment. Just an honest conversation about what AI can realistically do for your business — and what it can't.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 bg-white/10 rounded-xl3 p-10 border border-white/20"
            >
              <CheckCircle size={48} className="text-white mx-auto mb-4" />
              <h3 className="font-display font-bold text-white text-xl">Thanks! We'll be in touch within 24 hours.</h3>
              <p className="text-brand-200 text-sm mt-2">Check your inbox for a confirmation email.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 max-w-lg mx-auto space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  name="name"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  aria-label="Your name"
                />
                <input
                  name="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClasses}
                  aria-label="Company name"
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Work email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full ${inputClasses}`}
                aria-label="Work email"
              />
              <textarea
                name="message"
                placeholder="What are you trying to solve? (optional)"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className={`w-full ${inputClasses} resize-none`}
                aria-label="Your message"
              />
              {error && (
                <p className="text-red-300 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-brand-600 hover:bg-brand-50 font-bold py-4 rounded-lg text-sm transition-all hover:shadow-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Sending...' : 'Book My Free Discovery Call →'}
              </button>
            </form>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-brand-200 text-sm">
            <span className="flex items-center gap-1.5"><Check size={14} />No commitment</span>
            <span className="flex items-center gap-1.5"><Check size={14} />Usually within 48 hours</span>
            <span className="flex items-center gap-1.5"><Check size={14} />Remote-first, global team</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

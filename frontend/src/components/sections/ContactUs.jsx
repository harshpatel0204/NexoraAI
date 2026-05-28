import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'hello@neuroniq.ai', href: 'mailto:hello@neuroniq.ai' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, label: 'Location', value: 'Mumbai, India (Remote-first)', href: null },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null },
]

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setError('Something went wrong. Please email us directly.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClasses =
    'w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 dark:focus:border-brand-500 transition-all duration-200'

  return (
    <section id="contact" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-800">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-16"
        >
          <SectionLabel>Contact Us</SectionLabel>
          <h2 className="font-display font-bold text-display-xl text-neutral-900 dark:text-white tracking-tight mt-4">
            Let's Start a<br />Conversation.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-5 max-w-2xl mx-auto leading-relaxed text-lg">
            Whether you have a specific AI project in mind or just want to explore possibilities — we'd love to hear from you. No sales pitch, just an honest conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-neutral-900 rounded-xl3 border border-neutral-200 dark:border-neutral-700 shadow-card p-8 md:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                      className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mb-6"
                    >
                      <CheckCircle size={32} className="text-accent-green" />
                    </motion.div>
                    <h3 className="font-display font-bold text-neutral-900 dark:text-white text-xl">Message Sent!</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-2 max-w-sm">
                      Thanks for reaching out. We'll review your message and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-brand-500 hover:text-brand-600 text-sm font-medium transition-colors"
                    >
                      Send another message →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="mb-2">
                      <h3 className="font-display font-semibold text-neutral-900 dark:text-white text-lg">Send us a message</h3>
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Fill out the form below and we'll get back to you shortly.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5" htmlFor="contact-name">
                          Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={inputClasses}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5" htmlFor="contact-email">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={inputClasses}
                          placeholder="you@company.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5" htmlFor="contact-subject">
                        Subject <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="What's this about?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5" htmlFor="contact-message">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`${inputClasses} resize-none`}
                        placeholder="Tell us about your project, challenge, or idea..."
                        required
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm font-medium">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-8 py-3.5 rounded-lg shadow-btn hover:shadow-btn-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-5"
          >
            {/* Contact info cards */}
            {contactDetails.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                className="bg-white dark:bg-neutral-900 rounded-xl2 border border-neutral-200 dark:border-neutral-700 shadow-card p-5 group hover:shadow-card-md hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-500 dark:text-brand-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-neutral-800 dark:text-neutral-200 text-sm font-medium hover:text-brand-500 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-neutral-800 dark:text-neutral-200 text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social / CTA card */}
            <div className="bg-brand-500 rounded-xl3 p-6 text-center">
              <h4 className="font-display font-semibold text-white text-lg">Prefer a call?</h4>
              <p className="text-brand-200 text-sm mt-2 leading-relaxed">
                Book a free 30-minute discovery call. No strings attached.
              </p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 bg-white text-brand-600 hover:bg-brand-50 font-semibold text-sm px-5 py-2.5 rounded-lg hover:shadow-lg transition-all duration-200 mt-4"
              >
                <Phone size={14} /> Call Us Now
              </a>
            </div>

            {/* Social links */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl2 border border-neutral-200 dark:border-neutral-700 shadow-card p-5">
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">Follow Us</p>
              <div className="flex gap-3">
                {/* Twitter/X */}
                <a href="#" className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-800 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200 hover:-translate-y-0.5" aria-label="Twitter">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-800 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200 hover:-translate-y-0.5" aria-label="LinkedIn">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>
                </a>
                {/* GitHub */}
                <a href="#" className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-800 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200 hover:-translate-y-0.5" aria-label="GitHub">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                </a>
                {/* Email */}
                <a href="mailto:hello@neuroniq.ai" className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-800 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200 hover:-translate-y-0.5" aria-label="Email">
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

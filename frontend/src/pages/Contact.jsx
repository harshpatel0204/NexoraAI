import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle, ExternalLink, MessageCircle, Link2, MessageSquare } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@nexora.ai', href: 'mailto:hello@nexora.ai', color: '#3B82F6' },
  { icon: MapPin, label: 'Location', value: 'Remote / Worldwide', href: null, color: '#A855F7' },
  { icon: MessageSquare, label: 'Response Time', value: 'Within 24 hours', href: null, color: '#00D4FF' },
]

const socials = [
  { icon: ExternalLink, label: 'GitHub', href: '#', color: '#ffffff' },
  { icon: MessageCircle, label: 'Twitter', href: '#', color: '#1DA1F2' },
  { icon: Link2, label: 'LinkedIn', href: '#', color: '#0A66C2' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) return
    setLoading(true)
    // Simulate sending (no backend needed)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    // Reset success state after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/10 transition-all duration-300'

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4"><span className="gradient-text">Get in Touch</span></h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have an AI project in mind? Want to collaborate? Or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card hover={false} className="relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-blue/5 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brand-violet/5 rounded-full blur-[60px] pointer-events-none" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative z-10 flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                      </div>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative z-10 space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5" htmlFor="contact-name">Name</label>
                        <input
                          id="contact-name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5" htmlFor="contact-email">Email</label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5" htmlFor="contact-subject">Subject</label>
                      <input
                        id="contact-subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5" htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell me about your project or idea..."
                        required
                      />
                    </div>
                    <Button type="submit" loading={loading} className="w-full sm:w-auto">
                      <Send className="w-4 h-4" /> Send Message
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact info cards */}
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Card className="group">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${info.color}15`, border: `1px solid ${info.color}25` }}
                    >
                      <info.icon className="w-5 h-5" style={{ color: info.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">{info.label}</h3>
                      {info.href ? (
                        <a href={info.href} className="text-gray-500 text-sm mt-1 hover:text-brand-blue transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-500 text-sm mt-1">{info.value}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card hover={false}>
                <h3 className="text-white font-medium text-sm mb-4">Connect With Me</h3>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                      aria-label={s.label}
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

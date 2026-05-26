import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import api from '../utils/api'
import { showSuccess, showError } from '../components/ui/Toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) { showError('Please fill all fields'); return }
    setLoading(true)
    try {
      await api.post('/api/contact', form)
      showSuccess('Message sent successfully!')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      showError(err.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4"><span className="gradient-text">Get in Touch</span></h1>
          <p className="text-gray-400 text-lg">Have a question or want to discuss enterprise solutions? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card hover={false}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Name</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-blue/50" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-blue/50" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-blue/50" placeholder="Project inquiry" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-blue/50 resize-none" placeholder="Tell us about your project..." />
                </div>
                <Button type="submit" loading={loading} className="w-full sm:w-auto"><Send className="w-4 h-4" /> Send Message</Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card hover={false}>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-blue mt-0.5" />
                <div><h3 className="text-white font-medium text-sm">Email</h3><p className="text-gray-500 text-sm mt-1">hello@neuralnexus.ai</p></div>
              </div>
            </Card>
            <Card hover={false}>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-blue mt-0.5" />
                <div><h3 className="text-white font-medium text-sm">Phone</h3><p className="text-gray-500 text-sm mt-1">+1 (555) 123-4567</p></div>
              </div>
            </Card>
            <Card hover={false}>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-blue mt-0.5" />
                <div><h3 className="text-white font-medium text-sm">Address</h3><p className="text-gray-500 text-sm mt-1">123 AI Boulevard<br />San Francisco, CA 94102</p></div>
              </div>
            </Card>
            <div className="rounded-2xl bg-white/5 border border-white/10 h-48 flex items-center justify-center">
              <div className="text-center text-gray-600"><MapPin className="w-8 h-8 mx-auto mb-2" /><span className="text-sm">Map View</span></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

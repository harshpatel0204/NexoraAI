import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User } from 'lucide-react'
import Card from '../ui/Card'
import Loader from '../ui/Loader'
import api from '../../utils/api'
import { showError } from '../ui/Toast'

export default function ChatbotWidget() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m NeuralNexus AI. Ask me anything about AI, machine learning, or deep learning!' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)
    try {
      const res = await api.post('/api/chatbot', { message: userMsg, history })
      const reply = res.data.reply
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
      setHistory(res.data.history)
    } catch (err) {
      showError(err.message || 'Failed to get response')
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card hover={false} className="flex flex-col" style={{ height: '500px' }}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <Bot className="w-5 h-5 text-brand-blue" />
        <h2 className="text-lg font-semibold text-white">AI Chatbot</h2>
        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">Online</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-brand-blue/20' : 'bg-white/10'}`}>
              {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-brand-blue" /> : <Bot className="w-3.5 h-3.5 text-gray-400" />}
            </div>
            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-brand-blue/20 text-white rounded-tr-md' : 'bg-white/5 text-gray-300 rounded-tl-md'}`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"><Bot className="w-3.5 h-3.5 text-gray-400" /></div>
            <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-md"><Loader size="sm" /></div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-blue/50 text-sm" />
        <button type="submit" disabled={!input.trim() || loading} className="p-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet text-white disabled:opacity-50 transition-opacity">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </Card>
  )
}

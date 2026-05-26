import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Minus, Sparkles } from 'lucide-react'
import api from '../../utils/api'

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi! 👋 I'm the NeuralNexus AI Assistant. Ask me anything about our AI services, pricing, or API usage!",
}

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [unread, setUnread] = useState(0)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, loading])

  // Focus input when opening
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen, isMinimized])

  const toggleOpen = useCallback(() => {
    if (!isOpen) {
      setUnread(0)
    }
    setIsOpen((v) => !v)
    setIsMinimized(false)
  }, [isOpen])

  const sendMessage = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setLoading(true)

    try {
      const res = await api.post('/api/chat-widget', { message: text, history })
      const reply = res.data.reply
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
      setHistory(res.data.history)
      if (!isOpen || isMinimized) setUnread((u) => u + 1)
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again in a moment.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chat-widget-trigger"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleOpen}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-shadow"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #7C3AED 50%, #00D4FF 100%)',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.4), 0 0 60px rgba(124, 58, 237, 0.2), 0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
            aria-label="Open chat assistant"
          >
            <MessageSquare className="w-6 h-6 text-white" />
            {unread > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center"
              >
                {unread}
              </motion.span>
            )}

            {/* Pulse ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #7C3AED)' }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-widget-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : undefined,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: 'min(400px, calc(100vw - 2rem))',
              height: isMinimized ? 'auto' : 'min(560px, calc(100vh - 6rem))',
              background: 'linear-gradient(180deg, rgba(15, 15, 26, 0.98) 0%, rgba(10, 10, 18, 0.99) 100%)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow:
                '0 0 30px rgba(59, 130, 246, 0.15), 0 0 60px rgba(124, 58, 237, 0.08), 0 25px 50px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {/* Bot avatar */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%)',
                  boxShadow: '0 0 12px rgba(59, 130, 246, 0.3)',
                }}
              >
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white leading-tight">NeuralNexus Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] text-emerald-400/80">Online</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized((v) => !v)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleOpen}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body — hidden when minimized */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i === messages.length - 1 ? 0.05 : 0 }}
                      className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          msg.role === 'user' ? '' : ''
                        }`}
                        style={
                          msg.role === 'user'
                            ? { background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.2)' }
                            : {
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(124, 58, 237, 0.2))',
                                border: '1px solid rgba(124, 58, 237, 0.2)',
                              }
                        }
                      >
                        {msg.role === 'user' ? (
                          <User className="w-3.5 h-3.5 text-brand-blue" />
                        ) : (
                          <Bot className="w-3.5 h-3.5 text-purple-400" />
                        )}
                      </div>

                      {/* Bubble */}
                      <div
                        className={`max-w-[78%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                          msg.role === 'user'
                            ? 'rounded-2xl rounded-tr-md text-white'
                            : 'rounded-2xl rounded-tl-md text-gray-200'
                        }`}
                        style={
                          msg.role === 'user'
                            ? {
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(59, 130, 246, 0.15))',
                                border: '1px solid rgba(59, 130, 246, 0.2)',
                              }
                            : {
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                              }
                        }
                      >
                        {/* Render markdown-like bold text */}
                        {msg.content.split('\n').map((line, li) => (
                          <p key={li} className={li > 0 ? 'mt-1.5' : ''}>
                            {line.split(/(\*\*[^*]+\*\*)/).map((seg, si) =>
                              seg.startsWith('**') && seg.endsWith('**') ? (
                                <strong key={si} className="font-semibold text-white">
                                  {seg.slice(2, -2)}
                                </strong>
                              ) : (
                                <span key={si}>{seg}</span>
                              )
                            )}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2.5"
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(124, 58, 237, 0.2))',
                          border: '1px solid rgba(124, 58, 237, 0.2)',
                        }}
                      >
                        <Bot className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                      <div
                        className="px-4 py-3 rounded-2xl rounded-tl-md flex items-center gap-1.5"
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input */}
                <form
                  onSubmit={sendMessage}
                  className="flex items-center gap-2 px-3 py-3 shrink-0"
                  style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
                >
                  <input
                    ref={inputRef}
                    id="chat-widget-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about our services..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)'
                      e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.08)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                      e.target.style.boxShadow = 'none'
                    }}
                    disabled={loading}
                    autoComplete="off"
                  />
                  <button
                    id="chat-widget-send"
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="p-2.5 rounded-xl text-white disabled:opacity-30 transition-all hover:shadow-lg"
                    style={{
                      background: !input.trim() || loading
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%)',
                      boxShadow: !input.trim() || loading
                        ? 'none'
                        : '0 0 12px rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Footer branding */}
                <div
                  className="text-center py-1.5 shrink-0"
                  style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)' }}
                >
                  <span className="text-[10px] text-gray-600">Powered by NeuralNexus AI</span>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

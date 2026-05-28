import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react'
import axios from 'axios'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm the NeuroniqAI Assistant. I can help you with questions about our AI services, pricing, and how we can help your business. What would you like to know?"
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history, isLoading])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const userMessage = message.trim()
    setMessage('')
    
    // Add user message to history
    const newHistory = [...history, { role: 'user', content: userMessage }]
    setHistory(newHistory)
    setIsLoading(true)

    try {
      // Map history to backend expected structure
      const backendHistory = history.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))

      const response = await axios.post('/api/chat-widget', {
        message: userMessage,
        history: backendHistory
      })

      if (response.data && response.data.success) {
        setHistory(response.data.data.history)
      } else {
        setHistory(prev => [
          ...prev,
          {
            role: 'assistant',
            content: "Sorry, I encountered an issue processing that. Please try again."
          }
        ])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setHistory(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I couldn't reach the server. Please check your connection and try again."
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const formatMessageContent = (content) => {
    // Simple bold text formatter: **text** -> <strong>text</strong>
    const parts = content.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-body">
      {/* Chat bubble button */}
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-btn hover:shadow-btn-lg transition-colors focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle chat widget"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
        
        {/* Unread badge */}
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-accent-orange rounded-full border-2 border-white dark:border-neutral-900"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] bg-white dark:bg-neutral-800 rounded-xl3 shadow-card-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-brand-500 to-[#8B5CF6] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/10 relative">
                  <Bot size={20} className="text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent-green rounded-full border-2 border-brand-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm tracking-wide">NeuroniqAI Assistant</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-brand-100 font-medium">AI Agent</span>
                    <Sparkles size={10} className="text-brand-200" />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-neutral-50 dark:bg-neutral-900 scrollbar">
              {history.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex gap-2 max-w-[80%] items-start">
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot size={12} className="text-brand-500 dark:text-brand-400" />
                      </div>
                    )}
                    <div
                      className={`px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-brand-500 text-white rounded-br-none shadow-sm'
                          : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {formatMessageContent(msg.content)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading/Typing State */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[80%] items-start">
                    <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0 mt-0.5 animate-pulse">
                      <Bot size={12} className="text-brand-500 dark:text-brand-400" />
                    </div>
                    <div className="bg-white dark:bg-neutral-800 px-4 py-3 rounded-xl rounded-bl-none border border-neutral-200/60 dark:border-neutral-700 shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 flex gap-2 items-center"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask NeuroniqAI assistant..."
                className="flex-1 px-4 py-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 dark:focus:border-brand-500 dark:text-white transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="p-2 bg-brand-500 hover:bg-brand-600 disabled:bg-neutral-200 dark:disabled:bg-neutral-700 disabled:text-neutral-400 text-white rounded-lg transition-colors focus:outline-none"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Loader from '../ui/Loader'
import { useApiMutation } from '../../hooks/useApi'
import { showError } from '../ui/Toast'

export default function SentimentForm() {
  const [text, setText] = useState('')
  const mutation = useApiMutation('/api/sentiment', { onError: (e) => showError(e.message) })

  const handleSubmit = (e) => { e.preventDefault(); if (text.trim()) mutation.mutate({ text }) }

  const result = mutation.data?.data
  const isPositive = result?.label === 'POSITIVE'

  return (
    <Card hover={false}>
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-5 h-5 text-brand-blue" />
        <h2 className="text-lg font-semibold text-white">Sentiment Analysis</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Text to Analyze</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Enter text to analyze sentiment..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-blue/50 resize-none" />
        </div>
        <Button type="submit" loading={mutation.isPending} disabled={!text.trim()}>Analyze Sentiment</Button>
      </form>

      {mutation.isPending && <Loader className="mt-6" />}

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <Badge color={isPositive ? 'green' : 'red'}>{result.label}</Badge>
            <span className="text-white font-semibold">{(result.score * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${result.score * 100}%` }} transition={{ duration: 0.8 }} className={`h-full rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-red-500'}`} />
          </div>
          <p className="text-gray-400 text-sm">{result.explanation}</p>
        </motion.div>
      )}
    </Card>
  )
}

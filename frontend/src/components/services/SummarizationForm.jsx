import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Loader from '../ui/Loader'
import { useApiMutation } from '../../hooks/useApi'
import { showError } from '../ui/Toast'

export default function SummarizationForm() {
  const [text, setText] = useState('')
  const [maxLength, setMaxLength] = useState(130)
  const [minLength, setMinLength] = useState(30)
  const mutation = useApiMutation('/api/summarize', { onError: (e) => showError(e.message) })

  const handleSubmit = (e) => { e.preventDefault(); if (text.trim().length >= 50) mutation.mutate({ text, max_length: maxLength, min_length: minLength }) }
  const result = mutation.data?.data

  return (
    <Card hover={false}>
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-brand-blue" />
        <h2 className="text-lg font-semibold text-white">Text Summarization</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Text to Summarize (min. 50 characters)</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} placeholder="Paste a long article or document here..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-blue/50 resize-none" />
          <p className="text-xs text-gray-600 mt-1">{text.length} characters</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Max Length: {maxLength}</label>
            <input type="range" min={20} max={500} value={maxLength} onChange={(e) => setMaxLength(Number(e.target.value))} className="w-full accent-brand-blue" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Min Length: {minLength}</label>
            <input type="range" min={10} max={200} value={minLength} onChange={(e) => setMinLength(Number(e.target.value))} className="w-full accent-brand-blue" />
          </div>
        </div>
        <Button type="submit" loading={mutation.isPending} disabled={text.trim().length < 50}>Summarize</Button>
      </form>

      {mutation.isPending && <Loader className="mt-6" />}

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
          <p className="text-gray-300 text-sm leading-relaxed">{result.summary}</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>Original: {result.original_length} words</span>
            <span>Summary: {result.summary_length} words</span>
            <span>Reduction: {Math.round((1 - result.summary_length / result.original_length) * 100)}%</span>
          </div>
        </motion.div>
      )}
    </Card>
  )
}

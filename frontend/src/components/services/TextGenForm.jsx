import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Loader from '../ui/Loader'
import { useApiMutation } from '../../hooks/useApi'
import { showError } from '../ui/Toast'

export default function TextGenForm() {
  const [prompt, setPrompt] = useState('')
  const [maxTokens, setMaxTokens] = useState(200)
  const mutation = useApiMutation('/api/text-generation', { onError: (e) => showError(e.message) })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    mutation.mutate({ prompt, max_tokens: maxTokens })
  }

  return (
    <Card hover={false}>
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-brand-blue" />
        <h2 className="text-lg font-semibold text-white">Text Generation</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Prompt</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} placeholder="Write a poem about artificial intelligence..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-blue/50 resize-none" />
        </div>
        <div className="max-w-xs">
          <label className="block text-sm text-gray-400 mb-1.5">Max Tokens: {maxTokens}</label>
          <input type="range" min={10} max={2000} value={maxTokens} onChange={(e) => setMaxTokens(Number(e.target.value))} className="w-full accent-brand-blue" />
        </div>
        <Button type="submit" loading={mutation.isPending} disabled={!prompt.trim()}>Generate Text</Button>
      </form>

      {mutation.isPending && <Loader className="mt-6" />}

      {mutation.data?.data && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Badge color="purple">{mutation.data.data.model_used}</Badge>
            <span className="text-xs text-gray-500">{mutation.data.data.tokens} tokens</span>
          </div>
          <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{mutation.data.data.generated_text}</p>
        </motion.div>
      )}
    </Card>
  )
}

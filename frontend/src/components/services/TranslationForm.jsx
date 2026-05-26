import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, ArrowLeftRight } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Loader from '../ui/Loader'
import { useApiMutation } from '../../hooks/useApi'
import { showError } from '../ui/Toast'
import { LANGUAGES } from '../../utils/constants'

export default function TranslationForm() {
  const [text, setText] = useState('')
  const [srcLang, setSrcLang] = useState('en')
  const [tgtLang, setTgtLang] = useState('es')
  const mutation = useApiMutation('/api/translate', { onError: (e) => showError(e.message) })

  const swap = () => { setSrcLang(tgtLang); setTgtLang(srcLang) }
  const handleSubmit = (e) => { e.preventDefault(); if (text.trim()) mutation.mutate({ text, source_lang: srcLang, target_lang: tgtLang }) }

  return (
    <Card hover={false}>
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-5 h-5 text-brand-blue" />
        <h2 className="text-lg font-semibold text-white">Language Translation</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <select value={srcLang} onChange={(e) => setSrcLang(e.target.value)} className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-blue/50">
            {LANGUAGES.map((l) => <option key={l.code} value={l.code} className="bg-brand-dark">{l.name}</option>)}
          </select>
          <button type="button" onClick={swap} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><ArrowLeftRight className="w-5 h-5" /></button>
          <select value={tgtLang} onChange={(e) => setTgtLang(e.target.value)} className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-blue/50">
            {LANGUAGES.map((l) => <option key={l.code} value={l.code} className="bg-brand-dark">{l.name}</option>)}
          </select>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Enter text to translate..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-blue/50 resize-none" />
        <Button type="submit" loading={mutation.isPending} disabled={!text.trim()}>Translate</Button>
      </form>

      {mutation.isPending && <Loader className="mt-6" />}

      {mutation.data?.data && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-gray-500 mb-2">{mutation.data.data.source_lang} → {mutation.data.data.target_lang}</p>
          <p className="text-gray-300 text-sm leading-relaxed">{mutation.data.data.translated_text}</p>
        </motion.div>
      )}
    </Card>
  )
}

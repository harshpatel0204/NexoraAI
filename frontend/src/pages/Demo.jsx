import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SERVICES } from '../utils/constants'
import TextGenForm from '../components/services/TextGenForm'
import SentimentForm from '../components/services/SentimentForm'
import SummarizationForm from '../components/services/SummarizationForm'
import TranslationForm from '../components/services/TranslationForm'
import ChatbotWidget from '../components/services/ChatbotWidget'
import ImageCaptionForm from '../components/services/ImageCaptionForm'
import ObjectDetectionForm from '../components/services/ObjectDetectionForm'

const formMap = {
  'text-generation': TextGenForm,
  'sentiment': SentimentForm,
  'summarization': SummarizationForm,
  'translation': TranslationForm,
  'chatbot': ChatbotWidget,
  'image-caption': ImageCaptionForm,
  'object-detection': ObjectDetectionForm,
}

export default function Demo() {
  const [params] = useSearchParams()
  const [active, setActive] = useState(params.get('tab') || 'text-generation')

  useEffect(() => {
    const tab = params.get('tab')
    if (tab && formMap[tab]) setActive(tab)
  }, [params])

  const ActiveForm = formMap[active] || TextGenForm

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">Interactive Demo</span></h1>
          <p className="text-gray-400">Try each AI service live. Select a tab below to get started.</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active === s.id
                  ? 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30'
                  : 'text-gray-400 hover:text-white bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <ActiveForm />
        </motion.div>
      </div>
    </motion.div>
  )
}

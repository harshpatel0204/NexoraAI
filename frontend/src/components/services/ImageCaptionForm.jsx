import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Image, Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Loader from '../ui/Loader'
import { useApiMutation } from '../../hooks/useApi'
import { showError } from '../ui/Toast'

export default function ImageCaptionForm() {
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const mutation = useApiMutation('/api/image-caption', { onError: (e) => showError(e.message) })

  const onDrop = useCallback((accepted) => {
    if (accepted.length > 0) {
      const f = accepted[0]
      setFile(f)
      setPreview(URL.createObjectURL(f))
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    mutation.mutate(fd)
  }

  return (
    <Card hover={false}>
      <div className="flex items-center gap-2 mb-6">
        <Image className="w-5 h-5 text-brand-blue" />
        <h2 className="text-lg font-semibold text-white">Image Captioning</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-brand-blue bg-brand-blue/5' : 'border-white/10 hover:border-white/20'}`}>
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Upload preview" className="max-h-64 mx-auto rounded-lg object-contain" />
          ) : (
            <div className="text-gray-500">
              <Upload className="w-10 h-10 mx-auto mb-3 text-gray-600" />
              <p className="text-sm">Drag & drop an image here, or click to select</p>
              <p className="text-xs mt-1 text-gray-600">JPEG, PNG, GIF, WebP (max 10MB)</p>
            </div>
          )}
        </div>
        <Button type="submit" loading={mutation.isPending} disabled={!file}>Generate Caption</Button>
      </form>

      {mutation.isPending && <Loader className="mt-6" />}

      {mutation.data?.data && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-300 text-sm mb-2">{mutation.data.data.caption}</p>
          <p className="text-xs text-gray-500">Confidence: {(mutation.data.data.confidence * 100).toFixed(1)}%</p>
        </motion.div>
      )}
    </Card>
  )
}

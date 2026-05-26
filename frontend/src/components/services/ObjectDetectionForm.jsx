import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ScanSearch, Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Loader from '../ui/Loader'
import { useApiMutation } from '../../hooks/useApi'
import { showError } from '../ui/Toast'

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316']

export default function ObjectDetectionForm() {
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const mutation = useApiMutation('/api/object-detection', { onError: (e) => showError(e.message) })

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

  const objects = mutation.data?.data?.objects || []

  useEffect(() => {
    if (!objects.length || !canvasRef.current || !imgRef.current) return
    const canvas = canvasRef.current
    const img = imgRef.current
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    canvas.style.width = `${img.width}px`
    canvas.style.height = `${img.height}px`
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    objects.forEach((obj, i) => {
      const color = COLORS[i % COLORS.length]
      const { xmin, ymin, xmax, ymax } = obj.box
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin)
      ctx.fillStyle = color
      const label = `${obj.label} ${(obj.score * 100).toFixed(0)}%`
      ctx.font = 'bold 14px Inter, sans-serif'
      const tw = ctx.measureText(label).width
      ctx.fillRect(xmin, ymin - 22, tw + 10, 22)
      ctx.fillStyle = '#fff'
      ctx.fillText(label, xmin + 5, ymin - 6)
    })
  }, [objects])

  return (
    <Card hover={false}>
      <div className="flex items-center gap-2 mb-6">
        <ScanSearch className="w-5 h-5 text-brand-blue" />
        <h2 className="text-lg font-semibold text-white">Object Detection</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-brand-blue bg-brand-blue/5' : 'border-white/10 hover:border-white/20'}`}>
          <input {...getInputProps()} />
          {preview ? (
            <div className="relative inline-block">
              <img ref={imgRef} src={preview} alt="Upload preview" className="max-h-64 rounded-lg object-contain" onLoad={() => { if (objects.length) { /* trigger redraw */ } }} />
              <canvas ref={canvasRef} className="absolute top-0 left-0 pointer-events-none" />
            </div>
          ) : (
            <div className="text-gray-500">
              <Upload className="w-10 h-10 mx-auto mb-3 text-gray-600" />
              <p className="text-sm">Drag & drop an image here, or click to select</p>
              <p className="text-xs mt-1 text-gray-600">JPEG, PNG, GIF, WebP (max 10MB)</p>
            </div>
          )}
        </div>
        <Button type="submit" loading={mutation.isPending} disabled={!file}>Detect Objects</Button>
      </form>

      {mutation.isPending && <Loader className="mt-6" />}

      {objects.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm text-gray-400 mb-3">{mutation.data.data.count} object(s) detected</p>
          <div className="flex flex-wrap gap-2">
            {objects.map((obj, i) => (
              <Badge key={i} color={i % 2 === 0 ? 'blue' : 'green'}>
                {obj.label} — {(obj.score * 100).toFixed(1)}%
              </Badge>
            ))}
          </div>
        </motion.div>
      )}
    </Card>
  )
}

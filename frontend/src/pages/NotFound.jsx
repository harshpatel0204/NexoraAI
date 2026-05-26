import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.8 }}>
          <h1 className="text-8xl sm:text-9xl font-black gradient-text mb-4">404</h1>
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved to a new location.</p>
        <Link to="/"><Button size="lg">Go Home</Button></Link>
      </div>
    </motion.div>
  )
}

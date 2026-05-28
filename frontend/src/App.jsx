import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import LogoBar from './components/sections/LogoBar'
import Services from './components/sections/Services'
import HowItWorks from './components/sections/HowItWorks'
import Results from './components/sections/Results'
import TechStack from './components/sections/TechStack'
import Testimonials from './components/sections/Testimonials'
import Pricing from './components/sections/Pricing'
import FAQ from './components/sections/FAQ'
import CTASection from './components/sections/CTASection'
import ChatWidget from './components/ui/ChatWidget'

const socialProofNames = [
  { name: 'Rajesh', city: 'Mumbai' },
  { name: 'Sarah', city: 'London' },
  { name: 'David', city: 'New York' },
  { name: 'Priya', city: 'Bangalore' },
  { name: 'Alex', city: 'San Francisco' },
  { name: 'Maria', city: 'Berlin' },
]

function SocialProofPopup() {
  const [visible, setVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let showTimeout
    let hideTimeout

    const cycle = () => {
      setVisible(true)
      hideTimeout = setTimeout(() => {
        setVisible(false)
      }, 8000)

      showTimeout = setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % socialProofNames.length)
        cycle()
      }, 45000)
    }

    const initialDelay = setTimeout(() => {
      cycle()
    }, 15000)

    return () => {
      clearTimeout(initialDelay)
      clearTimeout(showTimeout)
      clearTimeout(hideTimeout)
    }
  }, [])

  const person = socialProofNames[currentIndex]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -80, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -80, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 left-6 z-50 hidden md:flex items-center gap-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-card-md rounded-xl px-5 py-3.5 text-neutral-800 dark:text-neutral-200"
        >
          <span className="text-lg">🎉</span>
          <div>
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              {person.name} from {person.city} just booked a discovery call
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">A few moments ago</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ExitIntentModal() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('exitShown')) {
        sessionStorage.setItem('exitShown', 'true')
        setShow(true)
      }
    }
    document.addEventListener('mouseleave', handler)
    return () => document.removeEventListener('mouseleave', handler)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        onClick={() => setShow(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="bg-white dark:bg-neutral-800 rounded-xl3 shadow-card-lg p-10 max-w-md w-full relative border border-neutral-200 dark:border-neutral-700"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {submitted ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00875A" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-neutral-900 dark:text-white text-xl">Check your inbox!</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-2">We've sent the AI Readiness Checklist to your email.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1.5 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-semibold px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800 mb-4">
                  📋 Free Resource
                </span>
                <h3 className="font-display font-bold text-neutral-900 dark:text-white text-2xl">Before you go...</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-2 leading-relaxed">
                  Get our free <span className="font-semibold text-neutral-700 dark:text-neutral-300">AI Readiness Checklist</span> — 23 questions to evaluate if your business is ready for AI.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  required
                  className="w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 dark:focus:border-brand-500 transition-all"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm py-3 rounded-lg shadow-btn hover:shadow-btn-lg transition-all duration-200"
                >
                  Send Me the Checklist →
                </button>
              </form>
              <p className="text-xs text-neutral-400 dark:text-neutral-550 text-center mt-3">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-brand-500 z-[60]"
    />
  )
}

function MobileStickyBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = () => {
      setShow(window.scrollY > 600)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 p-4 z-50 md:hidden"
        >
          <a
            href="#contact"
            className="block w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm py-3.5 rounded-lg shadow-btn text-center transition-all"
          >
            Book a Free Call →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <div className="font-body bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 antialiased overflow-x-hidden transition-colors duration-300">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Services />
        <HowItWorks />
        <Results />
        <TechStack />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <MobileStickyBar />
      <SocialProofPopup />
      <ExitIntentModal />
      <ChatWidget />
    </div>
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { label: 'Solutions', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Case Studies', href: '#results' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="8" r="3" fill="#2B7FE8" />
        <circle cx="8" cy="22" r="3" fill="#2B7FE8" opacity="0.7" />
        <circle cx="24" cy="22" r="3" fill="#2B7FE8" opacity="0.7" />
        <line x1="16" y1="11" x2="8" y2="19" stroke="#2B7FE8" strokeWidth="1.5" opacity="0.5" />
        <line x1="16" y1="11" x2="24" y2="19" stroke="#2B7FE8" strokeWidth="1.5" opacity="0.5" />
        <line x1="11" y1="22" x2="21" y2="22" stroke="#2B7FE8" strokeWidth="1.5" opacity="0.5" />
        <circle cx="16" cy="8" r="5" fill="none" stroke="#2B7FE8" strokeWidth="0.5" opacity="0.3">
          <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
      <span className="font-display font-bold text-neutral-900 dark:text-white text-lg">NexoraAI</span>
    </a>
  )
}

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-[0_1px_0_0_#E4E8F0] dark:shadow-[0_1px_0_0_#2D3748]'
            : 'bg-white dark:bg-neutral-900'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-800 dark:hover:text-white transition-all duration-200"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="#"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors font-medium"
            >
              Sign in
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-sm px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 shadow-card transition-all duration-200"
            >
              Book a Call
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-btn hover:shadow-btn-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Started <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-neutral-700 dark:text-neutral-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white dark:bg-neutral-900 pt-20"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-display font-semibold text-neutral-800 dark:text-neutral-200 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  toggleTheme()
                  setMobileOpen(false)
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-850 transition-all"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <div className="flex flex-col gap-3 mt-4 w-64">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm py-3 rounded-lg shadow-btn transition-all"
                >
                  Get Started →
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-sm py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-all"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

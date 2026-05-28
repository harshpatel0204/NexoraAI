import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

const solutionLinks = [
  { label: 'AI Agents & Automation', href: '#services' },
  { label: 'Custom Chatbots', href: '#services' },
  { label: 'Computer Vision', href: '#services' },
  { label: 'Data Intelligence', href: '#services' },
  { label: 'LLM Fine-tuning', href: '#services' },
  { label: 'AI Strategy', href: '#services' },
]

const companyLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Case Studies', href: '#results' },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 lg:gap-8">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="8" r="3" fill="#5FA8F5" />
                <circle cx="8" cy="22" r="3" fill="#5FA8F5" opacity="0.7" />
                <circle cx="24" cy="22" r="3" fill="#5FA8F5" opacity="0.7" />
                <line x1="16" y1="11" x2="8" y2="19" stroke="#5FA8F5" strokeWidth="1.5" opacity="0.5" />
                <line x1="16" y1="11" x2="24" y2="19" stroke="#5FA8F5" strokeWidth="1.5" opacity="0.5" />
                <line x1="11" y1="22" x2="21" y2="22" stroke="#5FA8F5" strokeWidth="1.5" opacity="0.5" />
              </svg>
              <span className="font-display font-bold text-white text-lg">NexoraAI</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mb-6">
              We build, deploy, and scale custom AI solutions for businesses ready to move beyond the hype and see real ROI.
            </p>
            <div className="flex items-center gap-4">
              {/* Twitter/X */}
              <a href="#" className="text-neutral-500 hover:text-neutral-300 transition-colors" aria-label="Twitter">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-neutral-500 hover:text-neutral-300 transition-colors" aria-label="LinkedIn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" className="text-neutral-500 hover:text-neutral-300 transition-colors" aria-label="GitHub">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h4 className="text-neutral-200 text-sm font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2.5">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-neutral-400 text-sm hover:text-neutral-100 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-neutral-200 text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-neutral-400 text-sm hover:text-neutral-100 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-neutral-200 text-sm font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@nexora.ai" className="flex items-center gap-2.5 text-neutral-400 text-sm hover:text-neutral-100 transition-colors">
                  <Mail size={14} className="flex-shrink-0" />
                  hello@nexora.ai
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-2.5 text-neutral-400 text-sm hover:text-neutral-100 transition-colors">
                  <Phone size={14} className="flex-shrink-0" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2.5 text-neutral-400 text-sm">
                  <MapPin size={14} className="flex-shrink-0" />
                  Mumbai, India
                </span>
              </li>
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200 mt-5"
            >
              Book a Call <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-xs">
            Built with care in India 🇮🇳 · © 2025 NexoraAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-neutral-500 text-xs hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-neutral-500 text-xs hover:text-neutral-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-neutral-500 text-xs hover:text-neutral-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

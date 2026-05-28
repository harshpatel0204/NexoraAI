import { Link } from 'react-router-dom'
import { Zap, ExternalLink, MessageCircle, Link2, Mail } from 'lucide-react'

const footerLinks = {
  Navigation: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  Expertise: [
    { label: 'Machine Learning', to: '/about' },
    { label: 'Deep Learning', to: '/about' },
    { label: 'Computer Vision', to: '/about' },
    { label: 'NLP', to: '/about' },
  ],
  Connect: [
    { label: 'GitHub', to: '#', external: true },
    { label: 'LinkedIn', to: '#', external: true },
    { label: 'Twitter', to: '#', external: true },
    { label: 'Email', to: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-violet flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">NeuralNexus</span>
            </Link>
            <p className="text-sm text-gray-500 mb-4">Building the future with AI & Machine Learning.</p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110" aria-label="GitHub">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110" aria-label="Twitter">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                <Link2 className="w-4 h-4" />
              </a>
              <a href="mailto:hello@neuralnexus.ai" className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-3">{title}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a href={item.to} className="text-sm text-gray-500 hover:text-gray-300 transition-colors" target="_blank" rel="noopener noreferrer">{item.label}</a>
                    ) : (
                      <Link to={item.to} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} NeuralNexus AI. All rights reserved.</p>
          <p className="text-xs text-gray-600">Crafted with <span className="text-brand-blue">♥</span> and AI</p>
        </div>
      </div>
    </footer>
  )
}

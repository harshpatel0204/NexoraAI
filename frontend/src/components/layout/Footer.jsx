import { Link } from 'react-router-dom'
import { Zap, ExternalLink, MessageCircle, Link2 } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Services', to: '/services' },
    { label: 'Demo', to: '/demo' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'API Docs', to: '/demo' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Careers', to: '/about' },
    { label: 'Blog', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  Resources: [
    { label: 'Documentation', to: '/demo' },
    { label: 'Tutorials', to: '/demo' },
    { label: 'Community', to: '/about' },
    { label: 'Status', to: '/about' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/about' },
    { label: 'Terms of Service', to: '/about' },
    { label: 'Cookie Policy', to: '/about' },
    { label: 'GDPR', to: '/about' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-violet flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">NeuralNexus</span>
            </Link>
            <p className="text-sm text-gray-500 mb-4">Powering the future with AI & ML services.</p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-colors" aria-label="GitHub"><ExternalLink className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-colors" aria-label="Twitter"><MessageCircle className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-colors" aria-label="LinkedIn"><Link2 className="w-4 h-4" /></a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-3">{title}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} NeuralNexus AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

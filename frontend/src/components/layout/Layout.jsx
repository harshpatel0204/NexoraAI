import Navbar from './Navbar'
import Footer from './Footer'
import FloatingChatWidget from '../ui/FloatingChatWidget'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-dark">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingChatWidget />
    </div>
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'

const navItems = [
  {
    label: 'Services',
    dropdown: [
      { label: 'Hair & Color', href: '#services' },
      { label: 'Skin & Facials', href: '#services' },
      { label: 'Nails & Spa', href: '#services' },
      { label: 'Makeup & Bridal', href: '#services' },
    ],
  },
  {
    label: 'For Clients',
    dropdown: [
      { label: 'Brides', href: '#clients' },
      { label: 'Everyday Glam', href: '#clients' },
      { label: 'Corporate', href: '#clients' },
      { label: 'Events', href: '#clients' },
    ],
  },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  {
    label: 'About',
    dropdown: [
      { label: 'Our Story', href: '#about' },
      { label: 'Our Team', href: '#about' },
      { label: 'Gallery', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
            L
          </div>
          <span className="font-semibold text-lg tracking-tight text-charcoal">
            Lumière
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href || '#'}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-charcoal rounded-full hover:bg-gray-100 transition-colors"
              >
                {item.label}
                {item.dropdown && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </a>

              <AnimatePresence>
                {item.dropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                  >
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-charcoal hover:bg-pink-50 transition-colors"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 bg-charcoal text-white text-sm font-medium rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-md"
          >
            Book Now
            <span className="text-xs opacity-70">✦</span>
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href || '#'}
                className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#booking"
              className="block w-full text-center mt-3 px-5 py-3 bg-charcoal text-white text-sm font-medium rounded-full"
              onClick={() => setMobileOpen(false)}
            >
              Book Now ✦
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
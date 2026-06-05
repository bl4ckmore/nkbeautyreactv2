import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { T } from '../i18n/translations'
import nkLogo from '../assets/images/nk.png'

const scrollTo = (selector, closeMobile) => (e) => {
  if (!selector || selector === '#') return
  e.preventDefault()
  if (closeMobile) closeMobile()
  const el = document.querySelector(selector)
  if (!el) return
  if (window.lenis) {
    window.lenis.scrollTo(el, { offset: -80, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function Navbar({ onBook }) {
  const { lang, setLang } = useLang() 
  const t = T[lang] || T['en']

  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    {
      label: t.nav_home || (lang === 'ge' ? 'მთავარი' : 'Home'),
      href: '#',
    },
    {
      label: t.nav_services || (lang === 'ge' ? 'სერვისები' : 'Services'),
      dropdown: [
        { label: lang === 'ge' ? 'თმა და ფერი' : 'Hair & Color', href: '#services' },
        { label: lang === 'ge' ? 'კანი და ფეისიალი' : 'Skin & Facials', href: '#services' },
        { label: lang === 'ge' ? 'ფრჩხილები და სპა' : 'Nails & Spa', href: '#services' },
        { label: lang === 'ge' ? 'მაკიაჟი და სადღესასწაულო' : 'Makeup & Bridal', href: '#services' },
      ],
    },
    {
      label: lang === 'ge' ? 'კლიენტებისთვის' : 'For Clients',
      dropdown: [
        { label: lang === 'ge' ? 'პატარძლები' : 'Brides', href: '#clients' },
        { label: lang === 'ge' ? 'ყოველდღიური გლამური' : 'Everyday Glam', href: '#clients' },
        { label: lang === 'ge' ? 'კორპორატიული' : 'Corporate', href: '#clients' },
        { label: lang === 'ge' ? 'ღონისძიებები' : 'Events', href: '#clients' },
      ],
    },
    { label: lang === 'ge' ? 'ფასები' : 'Pricing', href: '#pricing' },
    { label: lang === 'ge' ? 'ბლოგი' : 'Blog', href: '#blog' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLangChange = (targetLang) => {
    if (setLang) {
      setLang(targetLang)
    }
  }

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
        
        {/* ── FIX: Tighter spacing and persistent English font ── */}
        <a href="#" className="flex items-center group relative h-10">
          <div className="relative h-full flex items-center">
            <img 
              src={nkLogo} 
              alt="NK Logo" 
              className="h-8 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
            />
          </div>
          {/* Added 'ml-1' for a tiny buffer so text doesn't touch the K */}
          <span className="font-semibold text-xl tracking-tight text-charcoal ml-1 keep-en">
            Beauty
          </span>
        </a>
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
                onClick={scrollTo(item.href)}
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
                        onClick={scrollTo(sub.href)}
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

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider select-none keep-en">
            <button
              onClick={() => handleLangChange('en')}
              className={`transition-colors py-1 px-1.5 rounded-md ${
                lang === 'en' ? 'text-charcoal bg-gray-50' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              EN
            </button>
            <span className="text-gray-300 font-light">|</span>
            <button
              onClick={() => handleLangChange('ge')}
              className={`transition-colors py-1 px-1.5 rounded-md ${
                lang === 'ge' ? 'text-charcoal bg-gray-50' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              KA
            </button>
          </div>

          <motion.button
            onClick={() => onBook()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 bg-charcoal text-white text-sm font-medium rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-md"
          >
            {t.nav_book || (lang === 'ge' ? 'დაჯავშნა' : 'Book Now')}
            <span className="text-xs opacity-70">✦</span>
          </motion.button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-bold tracking-wider select-none keep-en">
            <button
              onClick={() => handleLangChange('en')}
              className={`p-1.5 ${lang === 'en' ? 'text-charcoal' : 'text-gray-400'}`}
            >
              EN
            </button>
            <span className="text-gray-300 font-light">|</span>
            <button
              onClick={() => handleLangChange('ge')}
              className={`p-1.5 ${lang === 'ge' ? 'text-charcoal' : 'text-gray-400'}`}
            >
              KA
            </button>
          </div>

          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3"
          >
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href || '#'}
                  className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-50"
                  onClick={scrollTo(item.href, () => setMobileOpen(false))}
                >
                  {item.label}
                </a>
                {item.dropdown && (
                  <div className="pl-3 pb-1">
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="block text-xs text-gray-400 py-1.5 hover:text-gray-700 transition-colors"
                        onClick={scrollTo(sub.href, () => setMobileOpen(false))}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onBook() }}
              className="block w-full text-center mt-3 px-5 py-3 bg-charcoal text-white text-sm font-medium rounded-full"
            >
              {t.nav_book || (lang === 'ge' ? 'დაჯავშნა' : 'Book Now')} ✦
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
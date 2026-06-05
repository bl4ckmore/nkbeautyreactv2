import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'
import { useLang } from '../context/LanguageContext'
import { T } from '../i18n/translations'
import nkLogo from '../assets/images/nk.png'

const SPEED = 58

export default function Hero({ onBook }) {
  const { lang } = useLang()
  const t = T[lang] || T['en']
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const LA = `${t.hero_line1} ${t.hero_line2}`
  const LB = t.hero_line3

  const [lineA, setLineA] = useState('')
  const [lineB, setLineB] = useState('')
  const [phase, setPhase] = useState('lineA')
  const rafRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    setLineA('')
    setLineB('')
    setPhase('lineA')
  }, [lang])

  useEffect(() => {
    let timer
    if (phase === 'lineA') {
      if (lineA.length < LA.length) timer = setTimeout(() => setLineA(LA.slice(0, lineA.length + 1)), SPEED)
      else timer = setTimeout(() => setPhase('lineB'), 280)
    } else if (phase === 'lineB') {
      if (lineB.length < LB.length) timer = setTimeout(() => setLineB(LB.slice(0, lineB.length + 1)), SPEED)
      else setPhase('done')
    }
    return () => clearTimeout(timer)
  }, [lineA, lineB, phase, LA, LB])

  const springConfig = { damping: 45, stiffness: 120, mass: 2 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Use parallax ONLY if not mobile
  const parallax = (val, range) => isMobile ? 0 : useTransform(val, [-1, 1], range)

  const h1X = parallax(springX, ['10px', '-10px'])
  const h1Y = parallax(springY, ['8px', '-8px'])
  const bgX = parallax(springX, ['-25px', '25px'])
  const mid1X = parallax(springX, ['50px', '-50px'])
  const mid2X = parallax(springX, ['-80px', '80px'])
  const fgX = parallax(springX, ['120px', '-120px'])

  const handleMouseMove = (e) => {
    if (isMobile || rafRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    rafRef.current = requestAnimationFrame(() => {
      mouseX.set(nx)
      mouseY.set(ny)
      rafRef.current = null
    })
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-16" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden gpu-layer">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-[5%] left-[5%] w-[30rem] h-[30rem] bg-pink-200/40 blur-[100px]" />
        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 20, repeat: Infinity }} className="absolute bottom-[5%] right-[5%] w-[35rem] h-[35rem] bg-rose-300/30 blur-[120px]" />
      </div>

      <ParticleCanvas dark={false} />

      <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative z-20 text-center px-6 max-w-5xl mx-auto w-full gpu-layer">
        <motion.div style={{ x: h1X, y: h1Y }} className="inline-block bg-white/70 backdrop-blur-md px-5 py-2 rounded-full shadow-xl border border-pink-100 mb-8">
          <div className="flex items-center gap-2">
            <img src={nkLogo} alt="Logo" className="w-5 h-5 mix-blend-multiply" />
            <span className="text-sm font-semibold tracking-widest text-charcoal uppercase keep-en">Beauty</span>
          </div>
        </motion.div>

        <h1 className="font-bold tracking-tight text-charcoal mb-8 text-[clamp(2.5rem,6vw,5.5rem)]">
          <span className="block mb-2">{lineA}{phase === 'lineA' && <span className="animate-blink text-rose-400">|</span>}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500">{lineB}{phase === 'lineB' && <span className="animate-blink text-rose-400">|</span>}</span>
        </h1>

        <button onClick={onBook} className="relative px-8 py-4 bg-charcoal text-white text-sm font-semibold rounded-full shadow-xl hover:shadow-pink-400/40 transition-all">
          {t.hero_reserve}
        </button>
      </motion.div>
    </section>
  )
}
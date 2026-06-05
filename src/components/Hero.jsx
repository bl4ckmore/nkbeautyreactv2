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

  // ANTI-GRAVITY PHYSICS
  const springConfig = { damping: 45, stiffness: 120, mass: 2 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // -- PARALLAX DEPTHS --
  const h1X = useTransform(springX, [-1, 1], ['10px', '-10px'])
  const h1Y = useTransform(springY, [-1, 1], ['8px', '-8px'])
  const bgX = useTransform(springX, [-1, 1], ['-25px', '25px'])
  const bgY = useTransform(springY, [-1, 1], ['-25px', '25px'])
  const mid1X = useTransform(springX, [-1, 1], ['50px', '-50px'])
  const mid1Y = useTransform(springY, [-1, 1], ['50px', '-50px'])
  const mid2X = useTransform(springX, [-1, 1], ['-80px', '80px'])
  const mid2Y = useTransform(springY, [-1, 1], ['-80px', '80px'])
  const fgX = useTransform(springX, [-1, 1], ['120px', '-120px'])
  const fgY = useTransform(springY, [-1, 1], ['120px', '-120px'])

  const cardTiltX = useTransform(springY, [-1, 1], ['15deg', '-15deg'])
  const cardTiltY = useTransform(springX, [-1, 1], ['-15deg', '15deg'])

  const handleMouseMove = (e) => {
    if (rafRef.current) return
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
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-16"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── MORPHING AMBIENT BACKGROUND GLOW ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ 
            y: [0, -60, 0], 
            x: [0, 40, 0], 
            scale: [1, 1.3, 1], 
            borderRadius: ['50%', '60% 40% 30% 70%', '40% 60% 70% 30%', '50%'] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[5%] left-[5%] w-[30rem] h-[30rem] bg-pink-200/40 blur-[100px]"
        />
        <motion.div
          animate={{ 
            y: [0, 50, 0], 
            x: [0, -60, 0], 
            scale: [1, 1.4, 1],
            borderRadius: ['50%', '40% 60% 70% 30%', '60% 40% 30% 70%', '50%']
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[5%] right-[5%] w-[35rem] h-[35rem] bg-rose-300/30 blur-[120px]"
        />
      </div>

      <ParticleCanvas />

      {/* ── ANTI-GRAVITY SHAPES & ABSTRACT GLASS UI ── */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Abstract Fluid Aura Card (Right Side) */}
        <motion.div 
          style={{ x: mid1X, y: mid1Y, rotateX: cardTiltX, rotateY: cardTiltY }} 
          className="absolute top-[15%] -right-10 md:right-[8%] lg:right-[12%] w-40 h-56 md:w-56 md:h-80 p-2 bg-white/10 backdrop-blur-xl border border-white/40 shadow-2xl shadow-pink-200/20 rounded-t-full rounded-b-3xl overflow-hidden flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,#fbcfe8_0deg,#fda4af_120deg,#f472b6_240deg,#fbcfe8_360deg)] opacity-40 blur-2xl"
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-t-full rounded-b-[1.25rem] border border-white/60" />
          
          <motion.div 
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-20 h-32 md:w-24 md:h-40 border border-white/80 rounded-full flex items-center justify-center overflow-hidden shadow-inner"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-12 h-12 bg-white/80 rounded-full blur-md"
            />
            <div className="absolute inset-2 border-[0.5px] border-white/50 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Floating Pill Status Widget (Left Side) */}
        <motion.div 
          style={{ x: bgX, y: bgY, rotateX: cardTiltX, rotateY: cardTiltY }} 
          className="hidden md:flex items-center gap-3 absolute bottom-[25%] left-[5%] lg:left-[10%] px-5 py-3 bg-white/20 backdrop-blur-xl border border-white/50 shadow-2xl shadow-rose-200/20 rounded-full"
        >
          <motion.div 
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-2.5 h-2.5 bg-rose-400 rounded-full shadow-[0_0_10px_rgba(251,113,133,0.8)]"
          />
          <div className="flex flex-col gap-1">
            <div className="w-16 h-1.5 bg-white/60 rounded-full" />
            <div className="w-10 h-1.5 bg-white/40 rounded-full" />
          </div>
        </motion.div>

        {/* Abstract UI/Chart Card (Top Left) */}
        <motion.div 
          style={{ x: mid2X, y: mid2Y, rotateX: cardTiltX, rotateY: cardTiltY }} 
          className="hidden lg:flex items-center justify-center absolute top-[20%] left-[12%] w-28 h-28 bg-white/10 backdrop-blur-xl border border-white/40 shadow-2xl shadow-rose-200/20 rounded-full relative overflow-hidden"
        >
          <motion.div 
             animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.4, 0.8, 0.4] }}
             transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
             className="absolute w-12 h-12 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full blur-lg"
          />
          <div className="absolute inset-0 border-[6px] border-white/20 rounded-full" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-3 border-t-2 border-r-2 border-white/80 rounded-full"
          />
        </motion.div>

        {/* Giant Floating Ring */}
        <motion.div style={{ x: fgX, y: fgY }} className="absolute -bottom-20 -left-10 opacity-30 blur-[2px]">
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="w-96 h-96 border-[4px] border-pink-300/50 rounded-full"
          />
        </motion.div>

        {/* ── TINY PINK DETAILS ── */}
        <motion.div style={{ x: mid2X, y: mid2Y }} className="absolute top-[25%] left-[30%]">
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 4, repeat: Infinity }} className="w-2 h-2 bg-pink-400 rounded-full" />
        </motion.div>
        <motion.div style={{ x: bgX, y: bgY }} className="absolute bottom-[35%] right-[25%]">
          <motion.div animate={{ scale: [1, 2, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} className="w-3 h-3 bg-rose-300 rounded-full blur-[1px]" />
        </motion.div>

        {/* Hollow Mini Rings */}
        <motion.div style={{ x: fgX, y: fgY }} className="absolute bottom-[20%] left-[20%]">
          <motion.div animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="w-5 h-5 border border-pink-300 rounded-full" />
        </motion.div>

        {/* Floating Crosses (+) */}
        <motion.div style={{ x: mid1X, y: mid1Y }} className="absolute top-[55%] left-[12%]">
          <motion.div animate={{ rotate: [0, 90, 0], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 10, repeat: Infinity }} className="text-pink-400/60 text-xl font-light">+</motion.div>
        </motion.div>

        {/* Extra Micro Sparkles (✧) */}
        <motion.div style={{ x: fgX, y: fgY }} className="absolute top-[30%] left-[45%]">
          <motion.div animate={{ rotate: 180, opacity: [0.1, 0.8, 0.1], scale: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }} className="text-pink-300 text-lg">✧</motion.div>
        </motion.div>
        
        {/* Main Original Sparkles */}
        <motion.div style={{ x: fgX, y: fgY }} className="absolute top-[20%] left-[25%]">
          <motion.div 
            animate={{ rotate: 360, opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="text-pink-300 text-3xl blur-[1px]"
          >
            ✦
          </motion.div>
        </motion.div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div 
        animate={{ y: [-8, 8, -8] }} 
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-20 text-center px-6 max-w-5xl mx-auto w-full pointer-events-auto"
      >
        <motion.div style={{ x: h1X, y: h1Y }} className="inline-block relative">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 mb-8 bg-white/70 backdrop-blur-md px-5 py-2 rounded-full shadow-xl shadow-pink-200/30 border border-pink-100"
          >
            <img 
              src={nkLogo} 
              alt="NK Logo" 
              className="w-5 h-5 object-contain mix-blend-multiply"
            />
            {/* Added !font-sans for English brand text */}
            <span className="text-sm font-semibold tracking-widest text-charcoal uppercase !font-sans">
              Beauty
            </span>
          </motion.div>
        </motion.div>

        <motion.div style={{ x: h1X, y: h1Y }} className="relative w-full">
          <motion.div
            style={{ x: fgX, y: fgY }}
            animate={{ rotate: 360, scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-10 -left-6 md:-left-16 text-rose-400 text-3xl pointer-events-none drop-shadow-md"
          >
            ✦
          </motion.div>

          <motion.div
            style={{ x: mid2X, y: mid2Y }}
            animate={{ rotate: -360, scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-8 -right-4 md:-right-12 text-pink-300 text-4xl pointer-events-none drop-shadow-md"
          >
            ✦
          </motion.div>

          <h1 className="font-bold leading-[1.1] tracking-tight text-charcoal mb-8 text-[clamp(2.5rem,6vw,5.5rem)] relative z-20 mix-blend-darken">
            <span className="block mb-1 md:mb-2 md:whitespace-nowrap">
              {lineA}
              {phase === 'lineA' && <span className="animate-blink text-rose-400 font-thin">|</span>}
            </span>
            <span className="block md:whitespace-nowrap relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 drop-shadow-sm">
                {lineB}
              </span>
              {phase === 'lineB' && <span className="animate-blink text-rose-400 font-thin">|</span>}
            </span>
          </h1>
        </motion.div>

        <motion.div style={{ x: h1Y }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-500 mb-12 max-w-xl mx-auto font-light leading-relaxed drop-shadow-sm"
          >
            {t.hero_sub}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-5 relative z-30"
        >
          <div className="relative group">
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-pink-400 rounded-full blur-md"
            />
            <motion.button
              onClick={() => onBook()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-8 py-4 bg-charcoal text-white text-sm font-semibold rounded-full flex items-center gap-2 shadow-xl hover:shadow-pink-400/40 transition-all"
            >
              <span className="text-pink-300">✦</span>
              {t.hero_reserve}
            </motion.button>
          </div>
          
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-4 border border-pink-200 bg-white/80 backdrop-blur-sm text-sm font-semibold rounded-full text-charcoal hover:border-pink-300 hover:bg-pink-50 hover:text-rose-500 shadow-sm hover:shadow-md transition-all"
          >
            {t.hero_explore}
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-pink-200 bg-white/60 backdrop-blur-md rounded-full flex items-start justify-center pt-2 shadow-sm"
        >
          <div className="w-1.5 h-2 bg-rose-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
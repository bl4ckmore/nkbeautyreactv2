import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const LINE1 = 'Feel radiant with'
const LINE2 = 'next-level beauty'
const SPEED = 58

export default function Hero() {
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [phase, setPhase] = useState('line1')
  const rafRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    let t
    if (phase === 'line1') {
      if (line1.length < LINE1.length) t = setTimeout(() => setLine1(LINE1.slice(0, line1.length + 1)), SPEED)
      else t = setTimeout(() => setPhase('line2'), 280)
    } else if (phase === 'line2') {
      if (line2.length < LINE2.length) t = setTimeout(() => setLine2(LINE2.slice(0, line2.length + 1)), SPEED)
      else setPhase('done')
    }
    return () => clearTimeout(t)
  }, [line1, line2, phase])

  const springX = useSpring(mouseX, { damping: 30, stiffness: 180, mass: 0.6 })
  const springY = useSpring(mouseY, { damping: 30, stiffness: 180, mass: 0.6 })

  const badgeX = useTransform(springX, [-1, 1], ['-10px', '10px'])
  const badgeY = useTransform(springY, [-1, 1], ['-6px', '6px'])
  const h1X = useTransform(springX, [-1, 1], ['14px', '-14px'])
  const h1Y = useTransform(springY, [-1, 1], ['9px', '-9px'])
  const subtitleX = useTransform(springX, [-1, 1], ['-7px', '7px'])
  const subtitleY = useTransform(springY, [-1, 1], ['-4px', '4px'])

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ParticleCanvas />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div style={{ x: badgeX, y: badgeY }} className="inline-block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center text-white font-bold text-xs shadow">
              L
            </div>
            <span className="text-base font-medium tracking-wide text-gray-700">
              Lumière Beauty
            </span>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.div style={{ x: h1X, y: h1Y }}>
          <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight text-charcoal mb-8">
            <span className="block">
              {line1}
              {phase === 'line1' && (
                <span className="animate-blink text-rose-400 font-thin">|</span>
              )}
            </span>
            <span className="block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500">
                {line2}
              </span>
              {phase !== 'line1' && (
                <span className="animate-blink text-rose-400 font-thin">|</span>
              )}
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div style={{ x: subtitleX, y: subtitleY }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto font-light"
          >
            Premium hair, skin, nails & bridal services — crafted for every version of you.
          </motion.p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-4 bg-charcoal text-white text-sm font-semibold rounded-full flex items-center gap-2 shadow-xl hover:shadow-pink-200/50 hover:shadow-2xl transition-all"
          >
            <span>✦</span>
            Book Appointment
          </motion.a>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-4 border border-gray-300 text-sm font-semibold rounded-full text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            Explore Services
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-gray-300 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

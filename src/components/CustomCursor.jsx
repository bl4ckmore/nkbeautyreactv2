import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Dot follows tightly
  const dotX = useSpring(mx, { damping: 32, stiffness: 500, mass: 0.2 })
  const dotY = useSpring(my, { damping: 32, stiffness: 500, mass: 0.2 })

  // Ring lags behind — gives the trailing feel
  const ringX = useSpring(mx, { damping: 20, stiffness: 130, mass: 1 })
  const ringY = useSpring(my, { damping: 20, stiffness: 130, mass: 1 })

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }

    // Event delegation — works for dynamically rendered elements too
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovering(true)
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovering(false)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [mx, my, visible])

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ opacity: { duration: 0.15 }, scale: { type: 'spring', damping: 20, stiffness: 400 } }}
        className="fixed top-0 left-0 w-[5px] h-[5px] bg-charcoal rounded-full pointer-events-none z-[9999]"
      />

      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovering ? 52 : 28,
          height: hovering ? 52 : 28,
          backgroundColor: hovering ? 'rgba(26,26,26,0.06)' : 'transparent',
          borderColor: hovering ? 'rgba(26,26,26,0.25)' : 'rgba(26,26,26,0.35)',
        }}
        transition={{
          opacity: { duration: 0.15 },
          width: { type: 'spring', damping: 22, stiffness: 300 },
          height: { type: 'spring', damping: 22, stiffness: 300 },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 },
        }}
        className="fixed top-0 left-0 border rounded-full pointer-events-none z-[9998]"
      />
    </>
  )
}

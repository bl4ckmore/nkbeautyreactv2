import { useEffect, useRef } from 'react'

export default function ParticleCanvas({ dark = false }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    // 1. Detect if mobile (using standard 768px breakpoint)
    const isMobile = window.innerWidth < 768
    
    // 2. Reduce particle count drastically for mobile to prevent freezing
    const particleCount = isMobile ? 15 : 60

    let canvasRect = { left: 0, top: 0 }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      canvasRect = canvas.getBoundingClientRect()
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      // 3. Optional: Disable mouse tracking on mobile to save more CPU
      if (isMobile) return 
      mouseRef.current = { x: e.clientX - canvasRect.left, y: e.clientY - canvasRect.top }
    }
    window.addEventListener('mousemove', onMouseMove)

    const particles = []
    for (let i = 0; i < particleCount; i++) {
      const hue = dark ? 210 + Math.random() * 40 : 330 + Math.random() * 30
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        color: dark ? `hsl(${hue},70%,75%)` : `hsl(${hue},60%,65%)`,
      })
    }

    const REPEL_RADIUS = isMobile ? 40 : 80 // Smaller radius for mobile
    const REPEL_R2 = REPEL_RADIUS * REPEL_RADIUS
    const REPEL_STRENGTH = 0.5

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mx, y: my } = mouseRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (!isMobile) { // Only calculate physics if not on mobile
          const dx = p.x - mx
          const dy = p.y - my
          const d2 = dx * dx + dy * dy
          if (d2 < REPEL_R2 && d2 > 0) {
            const dist = Math.sqrt(d2)
            const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }

        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        const angle = Math.atan2(p.speedY, p.speedX)
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        ctx.setTransform(cos, sin, -sin, cos, p.x, p.y)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size * 1.5, -p.size * 0.4, p.size * 3, p.size * 0.8)
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [dark])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
import { useEffect, useRef } from 'react'

const DEFAULT_CONFIG = {
  particleCount: 70,
  particleColor: 'rgba(59, 130, 246, 0.5)',
  lineColor: 'rgba(59, 130, 246, 0.12)',
  particleRadius: 1.5,
  lineDistance: 140,
  speed: 0.4,
  mouseRadius: 120,
}

export default function ParticleBackground({ className = '', config = {} }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const cfg = { ...DEFAULT_CONFIG, ...config }
    let animId
    let mouse = { x: -9999, y: -9999 }
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const createParticles = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      particles = Array.from({ length: cfg.particleCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * cfg.speed,
        vy: (Math.random() - 0.5) * cfg.speed,
        r: Math.random() * cfg.particleRadius + 0.5,
      }))
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse interaction — gentle push
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < cfg.mouseRadius) {
          const force = (cfg.mouseRadius - dist) / cfg.mouseRadius * 0.02
          p.vx += dx * force
          p.vy += dy * force
        }

        // Dampen velocity
        p.vx *= 0.99
        p.vy *= 0.99

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = cfg.particleColor
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const ldx = p.x - q.x
          const ldy = p.y - q.y
          const ld = Math.sqrt(ldx * ldx + ldy * ldy)
          if (ld < cfg.lineDistance) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = cfg.lineColor.replace(/[\d.]+\)$/, `${(1 - ld / cfg.lineDistance) * 0.15})`)
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    createParticles()
    draw()

    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })
    canvas.addEventListener('mousemove', handleMouse)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouse)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [config])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ opacity: 0.6 }}
    />
  )
}

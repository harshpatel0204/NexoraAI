import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
  decimals = 0,
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const numTarget = parseFloat(target)
    if (isNaN(numTarget)) {
      setCount(target)
      return
    }

    const startTime = performance.now()

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * numTarget

      setCount(decimals > 0 ? current.toFixed(decimals) : Math.floor(current))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(decimals > 0 ? numTarget.toFixed(decimals) : numTarget)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}

import { useState, useEffect, useRef } from 'react'

export default function TypewriterText({
  phrases = [],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className = '',
}) {
  const [display, setDisplay] = useState('')
  const state = useRef({ phraseIdx: 0, charIdx: 0, isDeleting: false })

  useEffect(() => {
    if (phrases.length === 0) return

    let timeoutId

    const tick = () => {
      const s = state.current
      const phrase = phrases[s.phraseIdx]

      if (!s.isDeleting) {
        // Typing forward
        s.charIdx++
        setDisplay(phrase.slice(0, s.charIdx))

        if (s.charIdx >= phrase.length) {
          // Done typing — pause then start deleting
          s.isDeleting = true
          timeoutId = setTimeout(tick, pauseDuration)
        } else {
          timeoutId = setTimeout(tick, typingSpeed + Math.random() * 30)
        }
      } else {
        // Deleting backward
        s.charIdx--
        setDisplay(phrase.slice(0, s.charIdx))

        if (s.charIdx <= 0) {
          // Done deleting — move to next phrase
          s.isDeleting = false
          s.phraseIdx = (s.phraseIdx + 1) % phrases.length
          timeoutId = setTimeout(tick, typingSpeed + 200)
        } else {
          timeoutId = setTimeout(tick, deletingSpeed)
        }
      }
    }

    timeoutId = setTimeout(tick, typingSpeed + 500)

    return () => clearTimeout(timeoutId)
  }, [phrases, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {display}
      <span className="cursor-blink ml-0.5 text-brand-blue">|</span>
    </span>
  )
}

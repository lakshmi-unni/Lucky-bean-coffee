import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function TiltCard({ children, className, onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const rawX = useMotionValue(0.5)
  const rawY = useMotionValue(0.5)
  const x = useSpring(rawX, { stiffness: 220, damping: 22 })
  const y = useSpring(rawY, { stiffness: 220, damping: 22 })

  const rotateX = useTransform(y, [0, 1], [9, -9])
  const rotateY = useTransform(x, [0, 1], [-9, 9])
  const shadowX = useTransform(x, [0, 1], [-14, 14])
  const shadowY = useTransform(y, [0, 1], [-10, 18])
  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]) => `${sx}px ${sy}px 30px -10px rgba(26,16,10,0.35)`,
  )

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width)
    rawY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    rawX.set(0.5)
    rawY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 900,
        boxShadow: reduceMotion ? undefined : boxShadow,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

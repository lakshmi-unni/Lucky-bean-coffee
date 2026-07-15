import { motion } from 'framer-motion'

function Bean({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 52" className={className} fill="none">
      <ellipse cx="20" cy="26" rx="17" ry="24" fill="currentColor" />
      <path
        d="M20 8 Q14 26 20 44"
        stroke="#1a100a"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}

// Hand-tuned rather than Math.random() so beans don't clump or shift between renders.
// left position (%), size (px), duration (s), delay (s), drift (px), spin (deg)
const BEANS = [
  { left: 4, size: 20, duration: 11, delay: 0, drift: 18, spin: 220 },
  { left: 12, size: 14, duration: 9, delay: 2.4, drift: -14, spin: -180 },
  { left: 20, size: 24, duration: 13, delay: 0.8, drift: 22, spin: 260 },
  { left: 29, size: 16, duration: 10, delay: 4.2, drift: -10, spin: -200 },
  { left: 37, size: 12, duration: 8, delay: 1.6, drift: 12, spin: 160 },
  { left: 46, size: 22, duration: 12, delay: 3, drift: -20, spin: -240 },
  { left: 55, size: 15, duration: 9.5, delay: 5.4, drift: 16, spin: 200 },
  { left: 63, size: 26, duration: 14, delay: 0.2, drift: -24, spin: -260 },
  { left: 71, size: 13, duration: 8.5, delay: 2.8, drift: 10, spin: 180 },
  { left: 79, size: 19, duration: 11.5, delay: 4.6, drift: -18, spin: -220 },
  { left: 87, size: 16, duration: 10.5, delay: 1.2, drift: 20, spin: 240 },
  { left: 94, size: 21, duration: 12.5, delay: 3.6, drift: -14, spin: -200 },
]

export default function FallingBeans() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {BEANS.map((bean, i) => (
        <motion.div
          key={i}
          className="absolute top-0 text-coffee-500/35"
          style={{ left: `${bean.left}%`, width: bean.size }}
          animate={{
            y: [-40, 860],
            x: [0, bean.drift, 0],
            rotate: [0, bean.spin],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: bean.duration,
            delay: bean.delay,
            repeat: Infinity,
            ease: 'linear',
            opacity: { duration: bean.duration, delay: bean.delay, repeat: Infinity, times: [0, 0.08, 0.85, 1] },
          }}
        >
          <Bean className="h-auto w-full" />
        </motion.div>
      ))}
    </div>
  )
}

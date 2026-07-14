import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'
import MagneticButton from './MagneticButton'
import ResponsiveImage from './ResponsiveImage'

const HeroCanvas = lazy(() => import('../three/HeroCanvas'))

export default function Hero() {
  const canMount3D = useMediaQuery('(min-width: 768px)')
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const show3D = canMount3D && !reduceMotion

  return (
    <section
      id="home"
      className="bg-grain relative flex min-h-[760px] items-center overflow-hidden bg-coffee-950"
    >
      <ResponsiveImage
        src="/hero-coffee.jpg"
        alt=""
        aria-hidden="true"
        priority
        className="absolute inset-0 opacity-60 saturate-90"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-950 via-coffee-950/55 to-coffee-950/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-950/80 via-transparent to-coffee-950/90" />

      {/* 3D bean bleeds off the right edge — asymmetric, not centered */}
      <div className="pointer-events-none absolute inset-y-0 right-[-8%] left-[48%] z-0 md:left-[55%]">
        {show3D ? (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center opacity-70"
            aria-hidden="true"
          >
            <svg viewBox="0 0 200 260" className="h-2/3 max-h-80 w-auto animate-[float_6s_ease-in-out_infinite]">
              <ellipse cx="100" cy="140" rx="68" ry="100" fill="#4a2e1e" />
              <path
                d="M100 45 Q90 140 100 235"
                stroke="#1a100a"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-16 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md text-sm font-medium tracking-wide text-white/90 md:text-base"
        >
          Your morning&apos;s about to get lucky with
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-script text-8xl leading-none text-white md:text-[10rem]"
        >
          Coffee
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-white/80"
        >
          Lucky Bean isn&apos;t just a name &mdash; it&apos;s a promise.
          Tucked into Al Bateen, we roast small-batch Arabica and pour it
          with Abu Dhabi&apos;s warmest smiles. One sip and you&apos;ll see
          why the regulars call it their daily dose of luck.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagneticButton
            href="#menu"
            className="mt-8 inline-block rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold text-coffee-900 transition-colors hover:bg-gold-400"
          >
            Order Now
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

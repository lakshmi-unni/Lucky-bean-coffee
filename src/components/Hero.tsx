import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'
import MagneticButton from './MagneticButton'
import ResponsiveImage from './ResponsiveImage'

const HeroCanvas = lazy(() => import('../three/HeroCanvas'))

const BEAN_PATTERN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90'><g fill='%23c9a26b' opacity='0.5'><ellipse cx='18' cy='20' rx='9' ry='13' transform='rotate(-18 18 20)'/><ellipse cx='65' cy='55' rx='7' ry='10' transform='rotate(24 65 55)'/><ellipse cx='40' cy='78' rx='6' ry='9' transform='rotate(-8 40 78)'/></g></svg>\")"

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
      {/* Background layer: subtle scattered-bean texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{ backgroundImage: BEAN_PATTERN, backgroundSize: '90px 90px' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-950 via-coffee-950/55 to-coffee-950/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-950/80 via-transparent to-coffee-950/90" />

      {/* Midground: 3D bean bleeds off the right edge — asymmetric, not centered */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-y-0 right-[-8%] left-[48%] z-0 md:left-[55%]"
      >
        {show3D ? (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center opacity-70"
            aria-hidden="true"
          >
            <svg viewBox="0 0 200 220" className="h-2/3 max-h-80 w-auto animate-[float_6s_ease-in-out_infinite]">
              <path
                d="M100 20 C60 20 25 55 25 95 C25 145 65 175 100 205 C135 175 175 145 175 95 C175 55 140 20 100 20 Z"
                fill="#4a2e1e"
              />
              <path
                d="M100 55 Q92 100 100 150 Q108 175 100 200"
                stroke="#c9a26b"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        )}
      </motion.div>

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
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <MagneticButton
            href="#menu"
            className="mt-8 inline-block rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold text-coffee-900 transition-colors hover:bg-gold-400"
          >
            Order Now
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-white/60"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Scroll</span>
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

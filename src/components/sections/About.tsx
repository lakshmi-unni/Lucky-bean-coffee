import { forwardRef, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import ResponsiveImage from '../ui/ResponsiveImage'

gsap.registerPlugin(ScrollTrigger)

const Bean = forwardRef<SVGSVGElement, { className?: string }>(function Bean(
  { className },
  ref,
) {
  return (
    <svg ref={ref} viewBox="0 0 40 52" className={className} fill="none">
      <ellipse cx="20" cy="26" rx="17" ry="24" fill="currentColor" />
      <path
        d="M20 8 Q14 26 20 44"
        stroke="#1a100a"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
})

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const beanRefs = useRef<(SVGSVGElement | null)[]>([])
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      beanRefs.current.forEach((bean, i) => {
        if (!bean) return
        gsap.to(bean, {
          y: -120 - i * 40,
          x: i % 2 === 0 ? 30 : -30,
          rotate: i % 2 === 0 ? 70 : -70,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-cream-50">
      {/* Scroll-scrubbed bean trail drifting past the section */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Bean
          ref={(el) => {
            beanRefs.current[0] = el
          }}
          className="absolute top-1/3 left-[8%] h-10 w-8 text-coffee-400/25"
        />
        <Bean
          ref={(el) => {
            beanRefs.current[1] = el
          }}
          className="absolute top-1/2 left-[85%] h-14 w-11 text-gold-500/20"
        />
        <Bean
          ref={(el) => {
            beanRefs.current[2] = el
          }}
          className="absolute top-[70%] left-[20%] h-8 w-6 text-coffee-400/20"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 md:grid-cols-[0.9fr_1.1fr] md:px-10">
        <div className="order-2 md:order-1">
          <h2 className="font-heading text-4xl font-semibold text-coffee-700 md:text-5xl">
            The Story Behind Lucky Bean
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-body-text">
            It started with a single roast and a gut feeling. In 2019,
            Lakshmi swapped her office job for a one-room café on Al Bandar
            Street, betting everything on great coffee and Abu Dhabi&apos;s
            love for a good cup. Turns out, the gamble paid off. Today,
            Lucky Bean is where locals come for their daily dose of luck:
            freshly roasted Arabica, a team that remembers your order before
            you say it, and a little bit of magic in every mug.
          </p>
          <a
            href="#menu"
            className="mt-8 inline-block rounded-full border border-coffee-700 px-7 py-2.5 text-sm font-semibold text-coffee-700 transition hover:bg-coffee-700 hover:text-white"
          >
            Learn More
          </a>

          <div className="mt-10 max-w-sm -rotate-1 rounded-2xl bg-cream-200 p-5 shadow-sm">
            <p className="text-sm leading-relaxed text-coffee-700 italic">
              &ldquo;I named it Lucky Bean because opening this place was
              the best risk I ever took. Every cup we pour, I&apos;m
              hoping it&apos;s someone else&apos;s lucky break too.&rdquo;
            </p>
            <p className="mt-2 text-xs font-semibold text-coffee-700">
              Lakshmi &mdash; Founder &amp; Head Roaster
            </p>
          </div>
        </div>

        <div className="order-1 mx-auto md:order-2">
          <div className="relative w-full max-w-sm">
            <ResponsiveImage
  src="/owner-lakshmi.jpg"
  alt="Lakshmi, founder of Lucky Bean, roasting coffee beans at the Al Bateen café"
  className="aspect-[4/5] w-full rounded-2xl shadow-xl"
/>

            <ResponsiveImage
              src="/about-beans-heart.jpg"
              alt="Roasted coffee beans, close-up texture"
              className="absolute -bottom-8 -left-10 h-28 w-28 rotate-[-6deg] rounded-xl border-4 border-cream-50 shadow-lg md:h-32 md:w-32"
            />

            <div className="absolute -top-5 -right-5 flex h-20 w-20 rotate-6 items-center justify-center rounded-full bg-gold-500 text-center font-heading text-xs font-semibold leading-tight text-coffee-900 shadow-lg">
              Est.
              <br />
              2019
            </div>
          </div>
          <p className="mt-14 max-w-sm text-center text-xs text-body-text md:mt-4">
            Lakshmi at the roaster, Al Bateen café
          </p>
        </div>
      </div>
    </section>
  )
}

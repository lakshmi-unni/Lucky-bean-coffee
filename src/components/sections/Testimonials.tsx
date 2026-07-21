import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-gold-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill={i < count ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5Z" />
        </svg>
      ))}
    </div>
  )
}

const REVIEWS = [
  {
    name: 'Rashid Al Marzouqi',
    role: 'Regular Customer, Al Bateen',
    avatar: '/images/testimonial-avatar.jpg',
    rating: 5,
    quote:
      "They pull my order before I even ask. That's the good kind of predictable.",
  },
  {
    name: 'Priya Nair',
    role: 'WFH Regular',
    avatar: '/images/review-avatar-priya.jpg',
    rating: 5,
    quote:
      'Best flat white in Al Bateen, hands down. This place is basically my second office now.',
  },
  {
    name: 'Omar Haddad',
    role: 'Weekend Visitor',
    avatar: '/images/review-avatar-omar.jpg',
    rating: 4,
    quote:
      'Cardamom bun and an espresso is the move. Gets busy after 9am, worth the wait anyway.',
  },
  {
    name: 'Fatima Al Suwaidi',
    role: 'Marketing Manager',
    avatar: '/images/review-avatar-priya.jpg',
    rating: 5,
    quote:
      'Good wifi, better coffee, and nobody rushes you out after one cup. Rare combination in this city.',
  },
]

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [constraint, setConstraint] = useState(0)

  const measure = (el: HTMLDivElement | null) => {
    trackRef.current = el
    if (el) {
      setConstraint(-(el.scrollWidth - el.parentElement!.clientWidth))
    }
  }

  return (
    <section id="testimonials" className="overflow-hidden bg-cream-50">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <div className="text-center">
          <h2 className="font-heading text-4xl font-semibold text-coffee-700 md:text-5xl">
            Don&apos;t Just Take Our Word For It
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Stars count={5} />
            <p className="text-sm font-semibold text-coffee-700">
              4.8 out of 5
            </p>
            <p className="text-sm text-body-text">&middot; 312 Google reviews</p>
          </div>
          <p className="mt-2 text-xs text-body-text/70">
            Drag to see more &rarr;
          </p>
        </div>

        <motion.div
          ref={measure}
          drag="x"
          dragConstraints={{ left: constraint, right: 0 }}
          dragElastic={0.08}
          className="mt-10 flex w-max cursor-grab gap-6 active:cursor-grabbing"
        >
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="w-72 shrink-0 select-none rounded-2xl bg-cream-100 p-6 md:w-80"
            >
              <Stars count={review.rating} />
              <p className="mt-4 text-sm leading-relaxed text-body-text">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  draggable={false}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-coffee-700">
                    {review.name}
                  </p>
                  <p className="text-xs text-body-text">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

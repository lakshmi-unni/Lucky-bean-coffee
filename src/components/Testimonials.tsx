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
    avatar: '/testimonial-avatar.jpg',
    rating: 5,
    quote:
      "They pull my order before I even ask. That's the good kind of predictable.",
  },
  {
    name: 'Priya Nair',
    role: 'WFH Regular',
    avatar: '/review-avatar-priya.jpg',
    rating: 5,
    quote:
      'Best flat white in Al Bateen, hands down. This place is basically my second office now.',
  },
  {
    name: 'Omar Haddad',
    role: 'Weekend Visitor',
    avatar: '/review-avatar-omar.jpg',
    rating: 4,
    quote:
      'Cardamom bun and an espresso is the move. Gets busy after 9am, worth the wait anyway.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-cream-50">
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
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl bg-cream-100 p-6"
            >
              <Stars count={review.rating} />
              <p className="mt-4 text-sm leading-relaxed text-body-text">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
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
        </div>
      </div>
    </section>
  )
}

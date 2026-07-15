const HOURS = [
  { days: 'Saturday – Thursday', time: '7:00 AM – 10:00 PM' },
  { days: 'Friday', time: '2:00 PM – 11:00 PM (post-Jummah)' },
]

const DETAILS = [
  'Free WiFi, ask staff for the password',
  'Laptop-friendly after 2pm on weekdays',
  'Dog-friendly outdoor terrace',
]

export default function VisitUs() {
  return (
    <section id="contact" className="bg-cream-50">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-4xl font-semibold text-coffee-700 md:text-5xl">
            Find Us in Al Bateen
          </h2>
          <p className="mt-4 text-sm text-body-text">
            One street back from the Corniche, next to Al Bateen Park
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-coffee-700/10 shadow-sm">
            <iframe
              title="Lucky Bean location map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=54.3210%2C24.4530%2C54.3370%2C24.4640&layer=mapnik&marker=24.4585%2C54.3290"
              className="h-72 w-full md:h-full"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-heading text-lg font-semibold text-coffee-700">
                Opening Hours
              </h3>
              <dl className="mt-4 space-y-3">
                {HOURS.map((row) => (
                  <div key={row.days} className="flex items-baseline gap-3 text-sm">
                    <dt className="shrink-0 text-body-text">{row.days}</dt>
                    <div className="h-px flex-1 border-b border-dotted border-coffee-700/25" />
                    <dd className="shrink-0 font-heading text-base font-semibold text-coffee-700">
                      {row.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-coffee-700">
                Good to Know
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-body-text">
                {DETAILS.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="text-gold-500">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-coffee-700">
                Order For Delivery
              </h3>
              <p className="mt-3 text-sm text-body-text">
                Talabat &middot; Deliveroo &middot; Careem Now &mdash; or skip
                the app and message us directly.
              </p>
              <a
                href="https://wa.me/971504993644?text=Hi%20Lucky%20Bean%2C%20I%27d%20like%20to%20place%20an%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-coffee-900 transition hover:bg-gold-400"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.6 14.3c-.2.6-1.4 1.2-1.9 1.3-.5.1-1.1.2-3.5-.8-3-1.2-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5.3.7.9 2.2 1 2.4.1.2.1.4 0 .6-.2.3-.3.5-.5.7-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.4.2.6.1.8-.1.2-.2.9-1 1.1-1.4.2-.4.5-.3.8-.2.3.1 2 1 2.4 1.1.4.2.6.3.7.4.1.2.1 1-.1 1.5Z" />
                </svg>
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import ResponsiveImage from '../ui/ResponsiveImage'
import { DEFAULT_ORDER_MESSAGE, buildWhatsAppUrl } from '../../constants/contact'

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-coffee-900">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-10">
        <div>
          <h2 className="font-heading text-4xl font-semibold text-white md:text-5xl">
            Ready to Get Lucky?
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
            No four-leaf clovers required. Just walk into our Al Bateen café,
            order your favourite blend, and let Lucky Bean handle the rest.
          </p>
          <a
            href={buildWhatsAppUrl(DEFAULT_ORDER_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold text-coffee-900 transition hover:bg-gold-400"
          >
            Order on WhatsApp
          </a>
        </div>

        <div className="mx-auto">
          <ResponsiveImage
            src="/cta-coffee-cup.jpg"
            alt="Takeaway coffee cup surrounded by roasted coffee beans"
            className="h-72 w-72 rounded-full shadow-2xl md:h-80 md:w-80"
          />
        </div>
      </div>
    </section>
  )
}

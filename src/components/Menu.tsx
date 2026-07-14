const PRODUCTS = [
  {
    name: 'Cappuccino',
    blend: 'Our best-seller, three years running',
    price: 'AED 18',
    image: '/product-cappuccino.jpg',
    badge: 'Best Seller',
  },
  {
    name: 'Chai Latte',
    blend: 'Spiced, steamed, and dangerously moreish',
    price: 'AED 16',
    image: '/product-chai-latte.jpg',
  },
  {
    name: 'Macchiato',
    blend: 'Small cup, big personality',
    price: 'AED 17',
    image: '/product-macchiato.jpg',
  },
  {
    name: 'Espresso',
    blend: 'For when today needs a shot of courage',
    price: 'AED 14',
    image: '/product-espresso.jpg',
  },
]

const SPECIALS = [
  {
    name: 'Iced Spanish Latte',
    price: 'AED 20',
    note: 'Sweet, cold, and dangerously easy to order two of',
  },
  {
    name: 'Cardamom Bun',
    price: 'AED 12',
    note: 'Our top pastry, usually sold out by 11am',
  },
]

export default function Menu() {
  return (
    <section id="menu" className="bg-cream-50">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-4xl font-semibold text-coffee-700 md:text-5xl">
            Pick Your Lucky Cup
          </h2>
          <p className="mt-4 text-sm text-body-text">
            Four favourites, roasted in-house and pulled fresh all day.
            Regulars usually have a go-to &mdash; we dare you to find yours.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className="relative overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              {product.badge && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-coffee-900">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover md:h-48"
              />
              <div className="p-5 text-center">
                <h3 className="font-heading text-lg font-semibold text-coffee-700">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs text-body-text">{product.blend}</p>
                <p className="mt-2 text-sm font-semibold text-coffee-700">
                  {product.price}
                </p>
                <button
                  type="button"
                  className="mt-4 w-full rounded-full bg-gold-500 py-2 text-xs font-semibold text-coffee-900 transition hover:bg-gold-400"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-body-text">
          All prices include 5% VAT
        </p>

        <div className="mx-auto mt-16 max-w-2xl rounded-2xl bg-coffee-900 px-8 py-8 text-center">
          <p className="font-script text-3xl text-gold-400">
            Today&apos;s Specials
          </p>
          <div className="mt-5 space-y-4">
            {SPECIALS.map((special) => (
              <div
                key={special.name}
                className="flex items-baseline justify-between border-b border-white/10 pb-3 text-left last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-heading text-base font-semibold text-white">
                    {special.name}
                  </p>
                  <p className="text-xs text-white/60">{special.note}</p>
                </div>
                <p className="shrink-0 pl-4 text-sm font-semibold text-gold-400">
                  {special.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

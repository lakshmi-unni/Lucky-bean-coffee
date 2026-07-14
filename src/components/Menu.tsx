import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TiltCard from './TiltCard'
import ResponsiveImage from './ResponsiveImage'

type Category = 'All' | 'Hot' | 'Iced' | 'Bakery'

interface Product {
  name: string
  blend: string
  price: string
  category: Exclude<Category, 'All'>
  image?: string
  badge?: string
  size?: 'lg'
}

const PRODUCTS: Product[] = [
  {
    name: 'Cappuccino',
    blend: 'Our best-seller, three years running',
    price: 'AED 18',
    category: 'Hot',
    image: '/product-cappuccino.jpg',
    badge: 'Best Seller',
    size: 'lg',
  },
  {
    name: 'Chai Latte',
    blend: 'Spiced, steamed, and dangerously moreish',
    price: 'AED 16',
    category: 'Hot',
    image: '/product-chai-latte.jpg',
  },
  {
    name: 'Macchiato',
    blend: 'Small cup, big personality',
    price: 'AED 17',
    category: 'Hot',
    image: '/product-macchiato.jpg',
  },
  {
    name: 'Espresso',
    blend: 'For when today needs a shot of courage',
    price: 'AED 14',
    category: 'Hot',
    image: '/product-espresso.jpg',
  },
  {
    name: 'Iced Spanish Latte',
    blend: 'Sweet, cold, and dangerously easy to order two of',
    price: 'AED 20',
    category: 'Iced',
  },
  {
    name: 'Cardamom Bun',
    blend: 'Our top pastry, usually sold out by 11am',
    price: 'AED 12',
    category: 'Bakery',
  },
]

const CATEGORIES: Category[] = ['All', 'Hot', 'Iced', 'Bakery']

export default function Menu() {
  const [active, setActive] = useState<Category>('All')
  const filtered =
    active === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)

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

        <div className="mt-10 flex justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className="relative px-4 py-2 text-sm font-medium text-coffee-700"
            >
              {cat}
              {active === cat && (
                <motion.span
                  layoutId="menu-tab-underline"
                  className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gold-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:[grid-auto-rows:1fr]">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                className={product.size === 'lg' ? 'col-span-2 row-span-2' : ''}
              >
                <TiltCard className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                  {product.badge && (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-coffee-900">
                      {product.badge}
                    </span>
                  )}
                  {product.image ? (
                    <ResponsiveImage
                      src={product.image}
                      alt={product.name}
                      className={`w-full ${
                        product.size === 'lg' ? 'h-56 md:h-72' : 'h-40 md:h-48'
                      }`}
                    />
                  ) : (
                    <div className="bg-grain flex h-40 items-center justify-center bg-coffee-900 md:h-48">
                      <span className="font-script text-3xl text-gold-400">
                        {product.name}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5 text-center">
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
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <p className="mt-6 text-center text-xs text-body-text">
          All prices include 5% VAT
        </p>
      </div>
    </section>
  )
}

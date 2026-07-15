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
  image: string
  badge?: string
  size?: 'lg'
}

const PRODUCTS: Product[] = [
  // Hot
  {
    name: 'Cappuccino',
    blend: 'Our best-seller, three years running',
    price: 'AED 18',
    category: 'Hot',
    image: '/product-cappuccino.jpg',
    badge: 'Best Seller',
    size: 'lg',
  },
  { name: 'Chai Latte', blend: 'Spiced, steamed, and dangerously moreish', price: 'AED 16', category: 'Hot', image: '/product-chai-latte.jpg' },
  { name: 'Macchiato', blend: 'Small cup, big personality', price: 'AED 17', category: 'Hot', image: '/product-macchiato.jpg' },
  { name: 'Espresso', blend: 'For when today needs a shot of courage', price: 'AED 14', category: 'Hot', image: '/product-espresso.jpg' },
  { name: 'Flat White', blend: 'Silky microfoam, no fuss', price: 'AED 18', category: 'Hot', image: '/product-flat-white.jpg' },
  { name: 'Mocha', blend: "Coffee that moonlights as dessert", price: 'AED 19', category: 'Hot', image: '/product-mocha.jpg' },
  { name: 'Turkish Coffee', blend: 'Slow-brewed, unfiltered, unapologetic', price: 'AED 15', category: 'Hot', image: '/product-turkish-coffee.jpg' },

  // Iced
  { name: 'Iced Spanish Latte', blend: 'Sweet, cold, and dangerously easy to order two of', price: 'AED 20', category: 'Iced', image: '/product-iced-spanish-latte.jpg' },
  { name: 'Iced Latte', blend: 'The everyday hero, served cold', price: 'AED 19', category: 'Iced', image: '/product-iced-latte.jpg' },
  { name: 'Cold Brew', blend: 'Steeped 18 hours for a smoother kick', price: 'AED 18', category: 'Iced', image: '/product-cold-brew.jpg' },
  { name: 'Iced Americano', blend: 'Bold, black, and built for Abu Dhabi heat', price: 'AED 16', category: 'Iced', image: '/product-iced-americano.jpg' },
  { name: 'Iced Mocha', blend: "Chocolate's favourite coffee date", price: 'AED 21', category: 'Iced', image: '/product-iced-mocha.jpg' },
  { name: 'Affogato', blend: 'Espresso meets ice cream, no notes', price: 'AED 22', category: 'Iced', image: '/product-affogato.jpg' },
  { name: 'Iced Caramel Macchiato', blend: 'Layered, striped, Instagram-ready', price: 'AED 21', category: 'Iced', image: '/product-iced-caramel-macchiato.jpg' },

  // Bakery
  { name: 'Cardamom Bun', blend: 'Our top pastry, usually sold out by 11am', price: 'AED 12', category: 'Bakery', image: '/product-cardamom-bun.jpg' },
  { name: 'Pistachio Croissant', blend: 'Flaky layers, nutty finish', price: 'AED 14', category: 'Bakery', image: '/product-pistachio-croissant.jpg' },
  { name: 'Chocolate Chip Cookie', blend: 'Chewy centre, crisp edges', price: 'AED 10', category: 'Bakery', image: '/product-choc-chip-cookie.jpg' },
  { name: 'Basbousa', blend: 'A nod to the neighbourhood, syrup-soaked', price: 'AED 13', category: 'Bakery', image: '/product-basbousa.jpg' },
  { name: 'Lemon Cake', blend: 'Bright, buttery, built for afternoons', price: 'AED 15', category: 'Bakery', image: '/product-lemon-cake.jpg' },
  { name: 'Almond Biscotti', blend: 'Twice-baked, made for dunking', price: 'AED 9', category: 'Bakery', image: '/product-almond-biscotti.jpg' },
  { name: 'Cinnamon Roll', blend: 'Warm, gooey, gone in minutes', price: 'AED 12', category: 'Bakery', image: '/product-cinnamon-roll.jpg' },
]

const CATEGORIES: Category[] = ['All', 'Hot', 'Iced', 'Bakery']

function orderMessage(product: Product) {
  return `Hi Lucky Bean, I'd like to order: ${product.name} (${product.price})`
}

function whatsAppOrderUrl(product: Product) {
  return `https://wa.me/971504993644?text=${encodeURIComponent(orderMessage(product))}`
}

// wa.me links can't attach images, so share the product photo via the Web
// Share API first and fall back to the text-only WhatsApp link.
async function handleOrder(product: Product) {
  const message = orderMessage(product)

  if (navigator.share) {
    try {
      const response = await fetch(product.image)
      const blob = await response.blob()
      const file = new File([blob], `${product.name}.jpg`, { type: blob.type || 'image/jpeg' })

      if (!navigator.canShare || navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: product.name, text: message })
        return
      }
    } catch (err) {
      // User cancelled the share sheet, or share/fetch failed — fall through to WhatsApp link.
      if (err instanceof Error && err.name === 'AbortError') return
    }
  }

  window.open(whatsAppOrderUrl(product), '_blank', 'noopener,noreferrer')
}

export default function Menu() {
  const [active, setActive] = useState<Category>('All')
  const [selected, setSelected] = useState<string | null>(null)
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
            Hot, iced, or straight from the pastry case &mdash; every item
            below is roasted, brewed, or baked in-house.
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

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:[grid-auto-rows:1fr]">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => {
              const isSelected = selected === product.name
              return (
                <motion.div
                  key={product.name}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35 }}
                  className={product.size === 'lg' ? 'col-span-2 row-span-2' : ''}
                >
                  <TiltCard
                    onClick={() =>
                      setSelected(isSelected ? null : product.name)
                    }
                    className={`relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-2 transition-shadow ${
                      isSelected
                        ? 'ring-gold-500 shadow-lg'
                        : 'ring-transparent'
                    }`}
                  >
                    {product.badge && (
                      <span className="absolute left-3 top-3 z-10 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-coffee-900">
                        {product.badge}
                      </span>
                    )}
                    <ResponsiveImage
                      src={product.image}
                      alt={product.name}
                      className={`aspect-square w-full saturate-[1.05] contrast-[1.02] sepia-[0.05] ${
                        isSelected ? 'scale-[1.03]' : ''
                      } transition-transform duration-300`}
                    />
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
                        onClick={(e) => {
                          e.stopPropagation()
                          void handleOrder(product)
                        }}
                        className="mt-4 w-full rounded-full bg-gold-500 py-2 text-xs font-semibold text-coffee-900 transition hover:bg-gold-400"
                      >
                        Order Now
                      </button>
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <p className="mt-6 text-center text-xs text-body-text">
          All prices include 5% VAT
        </p>
      </div>
    </section>
  )
}

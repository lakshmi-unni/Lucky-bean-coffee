import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import ResponsiveImage from '../ui/ResponsiveImage'

interface GalleryImage {
  src: string
  alt: string
  mask?: boolean
}

const IMAGES: GalleryImage[] = [
  { src: '/gallery-interior.jpg', alt: 'Warm, low-lit interior of the Lucky Bean café' },
  { src: '/gallery-latte-art.jpg', alt: 'Close-up of latte art in a ceramic cup', mask: true },
  { src: '/gallery-pour.jpg', alt: 'Barista pouring coffee into a white ceramic cup' },
  { src: '/about-beans-heart.jpg', alt: 'Roasted coffee beans, close-up texture' },
  { src: '/gallery-bakery.jpg', alt: 'Fresh cardamom buns from the pastry case' },
  { src: '/hero-coffee.jpg', alt: 'Steaming cup surrounded by roasted coffee beans' },
]

function ParallaxTile({ image, index, onOpen }: { image: GalleryImage; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const speed = index % 3 === 0 ? 16 : index % 3 === 1 ? -12 : 8
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed])

  const heightClass = index % 3 === 0 ? 'h-64 md:h-80' : index % 3 === 1 ? 'h-48 md:h-56' : 'h-72 md:h-64'

  return (
    <div ref={ref} className={`mb-4 break-inside-avoid overflow-hidden rounded-2xl ${heightClass}`}>
      <motion.button
        type="button"
        onClick={onOpen}
        style={{ y }}
        className="block h-[130%] w-full cursor-zoom-in"
      >
        <ResponsiveImage
          src={image.src}
          alt={image.alt}
          style={
            image.mask
              ? {
                  clipPath:
                    'path("M100 10 C40 10 10 70 10 130 C10 210 60 260 100 260 C140 260 190 210 190 130 C190 70 160 10 100 10 Z")',
                }
              : undefined
          }
          className="h-full w-full transition duration-700 hover:scale-105"
        />
      </motion.button>
    </div>
  )
}

export default function Gallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <section id="gallery" className="bg-cream-100">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-4xl font-semibold text-coffee-700 md:text-5xl">
            Inside Lucky Bean
          </h2>
          <p className="mt-4 text-sm text-body-text">
            A few moments from the café floor &mdash; more where these came
            from on @luckybean.ae
          </p>
        </div>

        <div className="mt-14 columns-2 gap-4 md:columns-3">
          {IMAGES.map((image, i) => (
            <ParallaxTile key={image.src} image={image} index={i} onOpen={() => setSelected(image)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-coffee-950/90 p-6"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              src={selected.src}
              alt={selected.alt}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

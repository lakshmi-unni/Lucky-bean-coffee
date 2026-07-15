import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'
import manifest from '../data/image-manifest.json'

type Manifest = Record<string, { webp: string; lqip: string; width: number; height: number }>
const IMAGE_MANIFEST = manifest as Manifest

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  /** Above-the-fold / LCP-critical images: skip lazy-load and blur-up fade, fetch eagerly at high priority. */
  priority?: boolean
  /** CSS object-position for the object-cover crop, e.g. "20% center". Defaults to center. */
  objectPosition?: string
}

export default function ResponsiveImage({
  src,
  alt,
  className,
  style,
  priority = false,
  objectPosition,
  ...rest
}: ResponsiveImageProps) {
  const [loaded, setLoaded] = useState(priority)
  const entry = IMAGE_MANIFEST[src]

  if (!entry) {
    return <img src={src} alt={alt} className={className} style={style} {...rest} />
  }

  // Don't force "relative" if the caller already set a position class (e.g.
  // "absolute inset-0") — both at once is a Tailwind specificity conflict.
  const isPositioned = /\b(absolute|fixed|sticky)\b/.test(className ?? '')

  return (
    <div className={`${isPositioned ? '' : 'relative'} overflow-hidden ${className ?? ''}`} style={style}>
      {!priority && (
        <img
          src={entry.lqip}
          alt=""
          aria-hidden="true"
          style={objectPosition ? { objectPosition } : undefined}
          className={`absolute inset-0 h-full w-full scale-105 object-cover blur-xl transition-opacity duration-500 ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
      <picture>
        <source srcSet={entry.webp} type="image/webp" />
        <img
          src={src}
          alt={alt}
          width={entry.width}
          height={entry.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          {...(priority ? { fetchpriority: 'high' } : {})}
          onLoad={() => setLoaded(true)}
          style={objectPosition ? { objectPosition } : undefined}
          className={
            priority
              ? 'h-full w-full object-cover'
              : `h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 ${
                  loaded ? 'scale-100 opacity-100' : ''
                }`
          }
          {...rest}
        />
      </picture>
    </div>
  )
}

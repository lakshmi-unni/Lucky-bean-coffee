const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
]

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <a href="#home" className="font-script text-3xl text-white">
          Lucky Bean
        </a>

        <ul className="hidden items-center gap-10 text-sm font-medium text-white/90 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition hover:text-gold-400">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 text-sm font-medium text-white/90 md:flex">
          <a href="tel:+97125550148" className="transition hover:text-gold-400">
            +971 2 555 0148
          </a>
          <a
            href="https://wa.me/971505550148?text=Hi%20Lucky%20Bean%2C%20I%27d%20like%20to%20place%20an%20order"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold-500 px-6 py-2.5 text-coffee-900 transition hover:bg-gold-400"
          >
            Order Now
          </a>
        </div>
      </nav>
    </header>
  )
}

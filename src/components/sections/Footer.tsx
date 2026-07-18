import { PHONE_DISPLAY } from '../../constants/contact'

const ABOUT_LINKS = ['Menu', 'Our Story', 'News & Blogs', 'Help & Support']
const COMPANY_LINKS = ['How we work', 'Terms of service', 'Pricing', 'FAQ']

const SOCIALS = [
  {
    label: 'Facebook',
    path: 'M13 22v-8h2.7l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 3.9V11H7.5v3H9.8v8H13Z',
  },
  {
    label: 'Instagram',
    path: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.5A2.5 2.5 0 1 1 12 9.5a2.5 2.5 0 0 1 0 5ZM16.8 6.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM20 8.4c-.1-1-.3-1.8-.7-2.4a4.3 4.3 0 0 0-2.5-2.5c-.6-.4-1.4-.6-2.4-.7C13.4 2.7 12.6 2.7 12 2.7s-1.4 0-2.4.1c-1 .1-1.8.3-2.4.7a4.3 4.3 0 0 0-2.5 2.5c-.4.6-.6 1.4-.7 2.4C3.9 9.4 3.9 10.2 3.9 12s0 2.6.1 3.6c.1 1 .3 1.8.7 2.4a4.3 4.3 0 0 0 2.5 2.5c.6.4 1.4.6 2.4.7 1 .1 1.8.1 2.4.1s1.4 0 2.4-.1c1-.1 1.8-.3 2.4-.7a4.3 4.3 0 0 0 2.5-2.5c.4-.6.6-1.4.7-2.4.1-1 .1-1.8.1-3.6s0-2.6-.1-3.6ZM18.5 15.5c-.1.9-.3 1.4-.5 1.7-.3.6-.7 1-1.3 1.3-.3.2-.8.4-1.7.5-1 .1-1.3.1-3 .1s-2-.1-3-.1c-.9-.1-1.4-.3-1.7-.5-.6-.3-1-.7-1.3-1.3-.2-.3-.4-.8-.5-1.7-.1-1-.1-1.3-.1-3s0-2 .1-3c.1-.9.3-1.4.5-1.7.3-.6.7-1 1.3-1.3.3-.2.8-.4 1.7-.5 1-.1 1.3-.1 3-.1s2 0 3 .1c.9.1 1.4.3 1.7.5.6.3 1 .7 1.3 1.3.2.3.4.8.5 1.7.1 1 .1 1.3.1 3s0 2-.1 3Z',
  },
  {
    label: 'Twitter',
    path: 'M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.7 11.7 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.8A8.2 8.2 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z',
  },
  {
    label: 'YouTube',
    path: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.1 5 12 5 12 5s-6.1 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.9 19 12 19 12 19s6.1 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3-5.2 3Z',
  },
]

export default function Footer() {
  return (
    <footer className="bg-grain relative overflow-hidden bg-coffee-950">
      <svg
        viewBox="0 0 200 260"
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 h-72 w-56 text-white/[0.035] md:h-96 md:w-72"
      >
        <ellipse cx="100" cy="140" rx="68" ry="100" fill="currentColor" />
        <path
          d="M100 45 Q90 140 100 235"
          stroke="#1a100a"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-script text-3xl text-gold-400">Lucky Bean</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Abu Dhabi&apos;s luckiest coffee stop. Founded by Lakshmi in
              2019, we roast small batches and pour every cup like it&apos;s
              your lucky day &mdash; because it might be.
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gold-400">
              @luckybean.ae
            </p>
            <div className="mt-3 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-gold-500 hover:text-coffee-900"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-gold-400">
              About
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              {ABOUT_LINKS.map((link) => (
                <li key={link}>
                  <a href="#" className="transition hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-gold-400">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              {COMPANY_LINKS.map((link) => (
                <li key={link}>
                  <a href="#" className="transition hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-gold-400">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>Al Bandar Street, Al Bateen, Abu Dhabi, UAE</li>
              <li>{PHONE_DISPLAY}</li>
              <li>hello@luckybean.ae</li>
              <li>
                <a href="#contact" className="transition hover:text-white">
                  Hours &amp; map &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Lucky Bean. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

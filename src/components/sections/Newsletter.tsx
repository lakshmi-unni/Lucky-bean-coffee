export default function Newsletter() {
  return (
    <section id="newsletter" className="relative overflow-hidden bg-coffee-900">
      <img
        src="/images/hero-coffee.jpg"
        alt=""
        aria-hidden="true"
        className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full object-cover opacity-40 md:h-72 md:w-72"
      />
      <img
        src="/images/hero-coffee.jpg"
        alt=""
        aria-hidden="true"
        className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full object-cover opacity-40 md:h-72 md:w-72"
      />

      <div className="relative mx-auto max-w-2xl px-6 py-24 text-center md:px-10">
        <h2 className="font-heading text-4xl font-semibold text-white md:text-5xl">
          Never Miss a Lucky Drop
        </h2>
        <p className="mt-4 text-sm text-white/75">
          Be the first to hear about new blends, secret menu drops, and the
          occasional free-coffee giveaway. No spam &mdash; just good news
          (and better coffee).
        </p>

        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="Enter your mail"
            className="w-full flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm text-white placeholder:text-white/60 outline-none focus:border-gold-400"
          />
          <button
            type="submit"
            className="rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold text-coffee-900 transition hover:bg-gold-400"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

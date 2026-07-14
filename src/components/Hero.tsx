export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[720px] items-center overflow-hidden bg-coffee-950"
    >
      <img
        src="/hero-coffee.jpg"
        alt="Steaming coffee cup surrounded by roasted coffee beans on a wooden table"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-950 via-coffee-950/70 to-coffee-950/10" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-24 pb-16 md:px-10">
        <p className="max-w-md text-sm font-medium tracking-wide text-white/90 md:text-base">
          Your morning&apos;s about to get lucky with
        </p>
        <h1 className="font-script text-8xl leading-none text-white md:text-[10rem]">
          Coffee
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80">
          Lucky Bean isn&apos;t just a name &mdash; it&apos;s a promise.
          Tucked into Al Bateen, we roast small-batch Arabica and pour it
          with Abu Dhabi&apos;s warmest smiles. One sip and you&apos;ll see
          why the regulars call it their daily dose of luck.
        </p>
        <a
          href="#menu"
          className="mt-8 inline-block rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold text-coffee-900 transition hover:bg-gold-400"
        >
          Order Now
        </a>
      </div>
    </section>
  )
}
